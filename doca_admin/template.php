<?php

/**
 * @file
 * Contains the theme's functions to manipulate Drupal's default markup.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728096
 */

// Include the helper functions to make sharing between the main and admin themes easier.
require_once drupal_get_path('theme', 'doca_theme') . '/template.helpers.inc';

/**
 * Implements hook_form_alter().
 * Conditionally remove the Archived state from publishing options if the node
 * has a currently published revision.
 */
function doca_admin_form_node_form_alter(&$form, &$form_state, $form_id) {
  $node = $form['#node'];
  if (!empty($node->nid) && isset($node->workbench_moderation['published']->vid)) {
    unset($form['options']['workbench_moderation_state_new']['#options']['archive']);
  }
  if ($node->type == 'funding') {
    $options = &$form['field_consultation_date_status'][LANGUAGE_NONE]['#options'];
    $options['upcoming'] = str_replace('consultation', 'funding', $options['upcoming']);
    $options['current'] = str_replace('consultation', 'funding', $options['current']);
  }
}

function doca_admin_form_workbench_moderation_moderate_form_alter(&$form, &$form_state, $form_id) {
  if (!empty($form['node']['#value'])) {
    $node = $form['node']['#value'];
    if (!empty($node->nid) && isset($node->workbench_moderation['published']->vid)) {
      unset($form['state']['#options']['archive']);
    }
  }
}

/**
 * Implements hook_form_FORM_ID_alter().
 */
function doca_admin_form_consultation_node_form_alter(&$form, &$form_state) {
  // Get the node.
  $node = $form['#node'];

  // Get the value for whether the user should have access.
  $access = _doca_admin_return_user_has_role();
  // If the user has access.
  if ($access) {
    // Work out if this node can validly accept late submissions.
    $accept_late_submissions = _doca_admin_accept_late_submission($node);

    // If able to accept late submissions.
    if ($accept_late_submissions) {
      // Get the late submission URL.
      $url = _doca_admin_return_late_submission_url($node);
      // Create a message to let the admin know the URL.
      $args = array(
        '!url' => $url,
      );
      $message = t('Use the following URL for late submissions: !url', $args);
      // Finally output the message.
      drupal_set_message($message);
    }
  }
}

/**
 * Implements hook_form_FORM_ID_alter().
 */
function doca_admin_form_funding_node_form_alter(&$form, &$form_state) {
  // Add validation callback to handle auto clearing funding updates.
  $form['#validate'][] = 'doca_admin_clear_updates';
}

/**
 * Validation callback for funding node forms.
 */
function doca_admin_clear_updates($form, &$form_state) {
  // Don't validate on insert, only on changes.
  if (!isset($form['#node']->field_consultation_date) || empty($form['#node']->field_consultation_date)) {
    return;
  }

  // Grab current field value from node.
  $current_field = reset($form_state['node']->field_consultation_date[$form_state['node']->language]);

  // Check validity of form input.
  if (!isset($form_state['values']['field_consultation_date']) || empty($form_state['values']['field_consultation_date'])) {
    // Nothing to validate. Bail.
    return;
  }

  // Get new field value from form_state.
  $new_field = reset($form_state['values']['field_consultation_date'][$form_state['node']->language]);

  // Compare versions of the start dates.
  if ($current_field['value'] != $new_field['value']) {
    // The funding start date is being changed, remove updates!
    if (isset($form_state['values']['field_updates']) && !empty($form_state['values']['field_updates'])) {
      doca_base_paragraphs_deleteconfirm_hack($form, $form_state); 
    }      
  }

}

/**
 * Submit callback to remove an item from the field UI multiple wrapper.
 *
 * When a remove button is submitted, we need to find the item that it
 * referenced and delete it. Since field UI has the deltas as a straight
 * unbroken array key, we have to renumber everything down. Since we do this
 * we *also* need to move all the deltas around in the $form_state['values']
 * and $form_state['input'] so that user changed values follow. This is a bit
 * of a complicated process.
 */
function doca_base_paragraphs_deleteconfirm_hack($form, &$form_state) {
  // Loop over each 'updates' paragraph item widget in the form.
  foreach ($form['field_updates'][LANGUAGE_NONE] as $delta => $update) {
    if (!is_int($delta)) {
      // Only look at field values, not formAPI stuff.
      continue;
    }

    // Spoof the #array_parents value for transplanted paragraphs code below.
    $spoofed_array_parents = array('field_updates', 'und', $delta, 'actions', 'remove_button');
    
    // Code below this point is adapted from
    // function paragraphs_deleteconfirm_submit().

    // Where in the form we'll find the parent element.
    $address = array_slice($spoofed_array_parents, 0, -3);

    // Go one level up in the form, to the widgets container.
    $parent_element = drupal_array_get_nested_value($form, $address);
    $field_name = $parent_element['#field_name'];
    $langcode = $parent_element['#language'];
    $parents = $parent_element['#field_parents'];

    $field_state = field_form_get_state($parents, $field_name, $langcode, $form_state);

    if (isset($field_state['entity'][$delta])) {
      $field_state['entity'][$delta]->removed = 1;
      $field_state['entity'][$delta]->confirmed_removed = 1;
    }

    // Fix the weights. Field UI lets the weights be in a range of
    // (-1 * item_count) to (item_count). This means that when we remove one,
    // the range shrinks; weights outside of that range then get set to
    // the first item in the select by the browser, floating them to the top.
    // We use a brute force method because we lost weights on both ends
    // and if the user has moved things around, we have to cascade because
    // if I have items weight weights 3 and 4, and I change 4 to 3 but leave
    // the 3, the order of the two 3s now is undefined and may not match what
    // the user had selected.
    $input = drupal_array_get_nested_value($form_state['input'], $address);
    // Sort by weight,
    // but first remove garbage values to ensure proper '_weight' sorting
    unset($input['add_more']);
    uasort($input, '_field_sort_items_helper');

    // Reweight everything in the correct order.
    $weight = -1 * $field_state['items_count'] + 1;
    foreach ($input as $key => $item) {
      if ($item) {
        $input[$key]['_weight'] = $weight++;
      }
    }

    drupal_array_set_nested_value($form_state['input'], $address, $input);
    field_form_set_state($parents, $field_name, $langcode, $form_state, $field_state);
  } 

  // Alert the editor that we've made some automated changes to their new draft.
  drupal_set_message(t('The funding updates for this draft have been automatically cleared due to a change in the application deadline start date.'), 'warning');
}

