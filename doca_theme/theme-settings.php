<?php

/**
 * @file
 * Theme settings.
 */

/**
 * Implements hook_form_system_theme_settings_alter().
 */
function doca_theme_form_system_theme_settings_alter(&$form, $form_state) {
  // Horizontal tabs container
  $form['group_tabs'] = array(
    '#weight' => -99,
    '#type' => 'vertical_tabs',
    '#attached' => array(
      'library' => array(
        array(
          'field_group',
          'horizontal-tabs',
          'vertical-tabs',
        ),
      ),
    ),
  );

  // Default tab.
  $form['group_tab_default'] = array(
    '#type' => 'fieldset',
    '#title' => t('Theme settings'),
    '#group' => 'group_tabs',
  );
  // Page top announcements
  $form['page_top_announcement'] = array(
    '#type' => 'fieldset',
    '#title' => t('Announcements to appear at the top of selected pages'),
  );
  $form['page_top_announcement']['page_top_announcement_messages'] = array(
    '#type' => 'textarea',
    '#title' => t('Message to display'),
    '#default_value' => theme_get_setting('page_top_announcement_messages'),
    '#description' => t('Message to display in the announcement area.'),
  );
  $form['page_top_announcement']['page_top_announcement_paths'] = array(
    '#type' => 'textarea',
    '#title' => t('Pages the announcements are displayed'),
    '#default_value' => theme_get_setting('page_top_announcement_paths'),
    '#description' => t('Internal paths where the announcements are displayed. Enter one path per line.'),
  );
  // Cookie message
  $form['cookie_textarea'] = array(
    '#type' => 'textarea',
    '#title' => t('Cookie Message'),
    '#default_value' => theme_get_setting('cookie_textarea'),
    '#description' => t("This is the message that will appear in the cookie notification at the top of your site."),
  );
  // RSS author
  $form['rss_author'] = array(
    '#type' => 'textfield',
    '#title' => t('RSS Author'),
    '#default_value' => theme_get_setting('rss_author'),
    '#description' => t('Set author name to appear in the dc:creator field in RSS feeds.'),
  );
  // External link popup controls
  $form['external_link_popup'] = array(
    '#type' => 'fieldset',
    '#title' => t('External link popup'),
  );
  $form['external_link_popup']['external_link_enable_popup'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable external link popup'),
    '#default_value' => theme_get_setting('external_link_enable_popup'),
    '#description' => t('Display a popup modal window when an external link is clicked.'),
  );
  $form['external_link_popup']['external_link_popup_text'] = array(
    '#type' => 'textarea',
    '#title' => t('Text in the popup window'),
    '#default_value' => theme_get_setting('external_link_popup_text'),
    '#description' => t('Text to be display in the external link popup.'),
  );

  foreach ($form as $k => $v) {
    if ($k == 'group_tabs') {
      continue;
    }
    if ($k !== 'group_tab_default') {
      $form['group_tab_default'][$k] = $form[$k];
      $form['group_tab_default'][$k]['#group'] = 'group_tab_default';
      unset($form[$k]);
    }
  }

  // Site pages feedback settings.
  $form['feedback'] = array(
    '#type' => 'fieldset',
    '#title' => t('Site Pages Feedback'),
    '#description' => t("Site pages feedback settings."),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
    '#group' => 'group_tabs',
  );
  $form['feedback']['feedback_enabled'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable site pages feedback'),
    '#default_value' => theme_get_setting('feedback_enabled'),
  );
  $form['feedback']['container'] = array(
    '#type' => 'container',
    '#parents' => array('feedback'),
    '#states' => array(
      'invisible' => array(
        // If the checkbox is not enabled, show the container.
        'input[name="feedback_enabled"]' => array('checked' => FALSE),
      ),
    ),
  );
  $form['feedback']['container']['feedback_wform_nid'] = array(
    '#type' => 'select',
    '#title' => t('Choose site pages feedback form'),
    '#options' => _webform_list(),
    '#default_value' => theme_get_setting('feedback_wform_nid'),
    '#description' => t('Do not change it as this is for internal reference.'),
  );

  // Have your Say Form settings
  $form['have_your_say'] = array(
    '#type' => 'fieldset',
    '#title' => t('Have your Say'),
    '#description' => t("</p>Select the webform to appear on the <strong>Consultation</strong> Content Type as the <em>Have Your Say</em> form.</p>"),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
    '#group' => 'group_tabs',
  );
  $form['have_your_say']['have_your_say_wform_nid'] = array(
    '#type' => 'select',
    '#title' => t('Have your Say form'),
    '#options' => _webform_list(),
    '#default_value' => theme_get_setting('have_your_say_wform_nid'),
    '#description' => t('Choose the <em>Have your Say</em> form. Be careful changing this value as this is for internal reference.'),
  );
  $form['have_your_say']['funding_default_wform_nid'] = array(
    '#type' => 'select',
    '#title' => t('Default Funding and Support form'),
    '#options' => _webform_list(),
    '#default_value' => theme_get_setting('funding_default_wform_nid'),
    '#description' => t('Choose the <em>Default Funding and Support</em> form. Be careful changing this value as this is for internal reference.'),
  );

  // Load the terms available to be mini-sites
  $vocab = taxonomy_vocabulary_machine_name_load('business_area');
  $minisites = taxonomy_get_tree($vocab->vid);
  $options = array(0 => '<-- None -->');
  foreach ($minisites as $site) {
    $options[$site->tid] = $site->name;
  }

  // Have your Say Form settings
  $form['minisite'] = array(
    '#type' => 'fieldset',
    '#title' => t('Mini-site Theme Config'),
    '#description' => t("You can change the Theme settings related to each Sub site by changing the order of the items below."),
    '#collapsible' => TRUE,
    '#collapsed' => FALSE,
    '#group' => 'group_tabs',
  );
  $form['minisite']['sub_theme_1'] = array(
    '#type' => 'select',
    '#title' => 'Sub Theme 1',
    '#options' => $options,
    '#default_value' => theme_get_setting('sub_theme_1'),
  );
  $form['minisite']['sub_theme_2'] = array(
    '#type' => 'select',
    '#title' => 'Sub Theme 2',
    '#options' => $options,
    '#default_value' => theme_get_setting('sub_theme_2'),
  );
  $form['minisite']['sub_theme_3'] = array(
    '#type' => 'select',
    '#title' => 'Sub Theme 3',
    '#options' => $options,
    '#default_value' => theme_get_setting('sub_theme_3'),
  );
  $form['minisite']['sub_theme_4'] = array(
    '#type' => 'select',
    '#title' => 'Sub Theme 4',
    '#options' => $options,
    '#default_value' => theme_get_setting('sub_theme_4'),
  );
  $form['minisite']['sub_theme_1_title'] = array(
    '#type' => 'hidden',
    '#default_value' => theme_get_setting('sub_theme_1_title'),
  );
  $form['minisite']['sub_theme_2_title'] = array(
    '#type' => 'hidden',
    '#default_value' => theme_get_setting('sub_theme_2_title'),
  );
  $form['minisite']['sub_theme_3_title'] = array(
    '#type' => 'hidden',
    '#default_value' => theme_get_setting('sub_theme_3_title'),
  );
  $form['minisite']['sub_theme_4_title'] = array(
    '#type' => 'hidden',
    '#default_value' => theme_get_setting('sub_theme_4_title'),
  );
  $form['#validate'][] = '_doca_theme_form_system_theme_settings_alter_validate';
  $form['#submit'][] = '_doca_theme_form_system_theme_settings_alter_submit';
}

/**
 * fetch webform list..
 */
function _webform_list() {
  $options = array();
  $webform_types = webform_node_types();
  if (empty($webform_types)) {
    return $options;
  }

  $query = db_select('webform', 'w');
  $query->innerJoin('node', 'n', 'n.nid = w.nid');
  $query->fields('n', array('nid', 'title'));
  $query->condition('n.type', $webform_types, 'IN');
  $result = $query->execute();

  foreach ($result as $node) {
    $options[$node->nid] = check_plain($node->title);
  }

  return $options;
}
