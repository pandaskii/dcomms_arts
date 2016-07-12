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

function _doca_theme_form_system_theme_settings_alter_validate(&$form, &$form_state) {
  for ($i = 1; $i < 5; $i++) {
    if (isset($form_state['values']['sub_theme_' . $i]) && $form_state['values']['sub_theme_' . $i] > 0) {
      $form_state['values']['sub_theme_' . $i . '_title'] = taxonomy_term_load($form_state['values']['sub_theme_' . $i])->name;
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
 * Implements hook form alter.
 *
 * @param array &$form
 *        The drupal form array
 * @param array &$form_state
 *        The drupal form_state array
 */
function doca_admin_form_file_entity_edit_alter(&$form, &$form_state) {
  if ($form['#bundle'] == 'image') {
    array_unshift($form['#validate'], '_doca_admin_form_file_entity_edit_validate');
    array_unshift($form['actions']['submit']['#validate'], '_doca_admin_form_file_entity_edit_validate');
  }
}

/**
 * Form validation function for image file entities.
 *
 * This function ensure that, if a title or description is entered there is a
 * valid artist
 *
 * @param array &$form
 *        The drupal form array
 * @param array &$form_state
 *        The drupal form_state array
 */
function _doca_admin_form_file_entity_edit_validate($form, &$form_state) {
  $invalid = ((!isset($form_state['values']['field_read_more_text'][LANGUAGE_NONE]) ||
        $form_state['values']['field_read_more_text'][LANGUAGE_NONE][0]['value'] != '') ||
      (!isset($form_state['values']['field_image_title'][LANGUAGE_NONE]) ||
          $form_state['values']['field_image_title'][LANGUAGE_NONE][0]['value'] != '')) &&
    (isset($form_state['values']['field_artist'][LANGUAGE_NONE]) &&
        $form_state['values']['field_artist'][LANGUAGE_NONE][0]['value'] == '');
  if ($invalid) {
    form_set_error('field_artist', t('If either a title or description is added, the Artist field cannot be blank.'));
  }
}
