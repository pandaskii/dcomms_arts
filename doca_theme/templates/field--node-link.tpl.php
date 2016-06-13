<?php
/**
 * @file
 * Default template implementation to display the value of a field.
 */
?>
<div>
  <?php if (!$label_hidden): ?>
    <div class="field-label"<?php print $title_attributes; ?>><?php print $label ?>:&nbsp;</div>
  <?php endif; ?>
  <?php print dcomms_theme_read_more_link(drupal_get_path_alias('node/' . $element['#object']->nid), $read_more_text, $external_source); ?>
</div>
