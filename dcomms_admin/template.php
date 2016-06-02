<?php

/**
 * @file
 * Contains the theme's functions to manipulate Drupal's default markup.
 *
 * Complete documentation for this file is available online.
 * @see https://drupal.org/node/1728096
 */

// Include the helper functions to make sharing between the main and admin themes easier.
require_once drupal_get_path('theme', 'dcomms_theme') . '/template.helpers.inc';

/**
 * Implements hook_form_alter().
 * Conditionally remove the Archived state from publishing options if the node
 * has a currently published revision.
 */
function dcomms_admin_form_node_form_alter(&$form, &$form_state, $form_id) {
  $node = $form['#node'];
  if (!empty($node->nid) && isset($node->workbench_moderation['published']->vid)) {
    unset($form['options']['workbench_moderation_state_new']['#options']['archive']);
  }
}

function dcomms_admin_form_workbench_moderation_moderate_form_alter(&$form, &$form_state, $form_id) {
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
function dcomms_admin_form_consultation_node_form_alter(&$form, &$form_state) {
  // Get the node.
  $node = $form['#node'];

  // Get the value for whether the user should have access.
  $access = _dcomms_admin_return_user_has_role();
  // If the user has access.
  if ($access) {
    // Work out if this node can validly accept late submissions.
    $accept_late_submissions = _dcomms_admin_accept_late_submission($node);
  
    // If able to accept late submissions.
    if ($accept_late_submissions) {
      // Get the late submission URL.
      $url = _dcomms_admin_return_late_submission_url($node);
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
