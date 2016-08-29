<?php
/**
 * @file
 * Contains the theme's helper functions.
 */


/*
 * Helper function: Return the 'External source' field value.
 */
function _doca_admin_return_external_source($node, $wrapper = NULL) {
  // Set default external source value.
  $external_source = FALSE;

  // If the wrapper is NULL.
  if (is_null($wrapper)) {
    // Create a custom wrapper.
    $wrapper = entity_metadata_wrapper('node', $node);
  }

  if (isset($node->field_external_source)) {
    $external_source_field_value = $wrapper->field_external_source->value();
    // If the 'External source' field exists and is not blank.
    if (!empty($external_source_field_value)) {
      // Get the 'External source' field.
      $external_source = $wrapper->field_external_source->value();
    }
  }

  return $external_source;
}

/**
 * Helper function: Return whether an entity has an 'External source' filled in.
 */
function _doca_admin_return_node_has_external_source($node) {
  return (_doca_admin_return_external_source($node)) != FALSE ? TRUE : FALSE;
}

/**
 * Helper function: Return whether a node can validly accept late submissions.
 *
 * Check that the 'Enable late submissions' value is set.
 * Check that the date has passed.
 */
function _doca_admin_accept_late_submission($node) {
  // Set a default answer.
  $answer = FALSE;
  // Create an entity metadata wrapper.
  $wrapper = entity_metadata_wrapper('node', $node);

  // Check if the 'Enable late submissions' field exists and is TRUE.
  if (isset($node->field_enable_late_submissions) && $wrapper->field_enable_late_submissions->value() === TRUE) {
    // Get the consultation date end.
    $consultation_date_end = _doca_admin_return_end_consultation_date($node, $wrapper);
    // Get the current time.
    $time = time();
    // Check if the current date is greater than the end date (i.e. it's in the past).
    if ($time > $consultation_date_end) {
      // Update the answer.
      $answer = TRUE;
    }
  }

  // Return the answer.
  return $answer;
}

/**
 * Helper function: Return salted hash for a given node ID.
 */
function _doca_admin_return_salted_hash($nid) {
  return crc32($nid);
}

/**
 * Helper function: Return formatted late submission URL.
 */
function _doca_admin_return_late_submission_url($node) {
  global $base_url;

  // Get the salted hash for this nid.
  $salted_hash = _doca_admin_return_salted_hash($node->nid);

  // Get the node path.
  $uri = entity_uri('node', $node);
  // Update the options with the query.
  $uri['options']['query']['fso'] = $salted_hash;
  // Output the URL.
  $url = $base_url . url($uri['path'], $uri['options']);

  // Return the URL.
  return $url;
}

/**
 * Helper function: Return whether a user has a given role.
 */
function _doca_admin_return_user_has_role($roles = array()) {
  global $user;

  // Set default access value.
  $access = FALSE;

  // If no roles are provided.
  if (empty($roles)) {
    // Set some default roles.
    $roles = array(
      'publisher',
      'site builder',
      'site editor',
      'administrator',
    );
  }

  // Loop through the user roles.
  foreach ($user->roles as $role) {
    // If this role is one we are looking for.
    if (in_array(strtolower($role), $roles)) {
      // Update the access value.
      $access = TRUE;
      // There is no need to check the other roles; so we can safely end the loop.
      break;
    }
  }

  // Return the access value.
  return $access;
}

/**
 * Helper function: Return end consultation date.
 */
function _doca_admin_return_end_consultation_date($node, $wrapper) {
  // Set default consultation date end value.
  $consultation_date_end = '';

  // If the 'Consultation date' field exists and is not blank.
  $consultation_date_value = $wrapper->field_consultation_date->value();
  if (isset($node->field_consultation_date) && !empty($consultation_date_value)) {
    // Get the 'Consultation date' field.
    $consultation_date = $consultation_date_value;
    // Get the end date.
    $consultation_date_end = $consultation_date['value2'];
  }

  return $consultation_date_end;
}

/**
 * Render webform.
 */
function _doca_theme_webform_render($nid = NULL) {
  $wnode = node_load($nid);
  $form = drupal_get_form('webform_client_form_' . $nid, $wnode, array());

  return render($form);
}
