<?php

/**
 * @file
 * Display Suite 1 column template.
 */
?>
<div class="document-list__item">
  <<?php print $ds_content_wrapper; print $layout_attributes; ?> class="ds-1col document-list__inner <?php print $classes;?> clearfix">

    <?php if (isset($title_suffix['contextual_links'])): ?>
    <?php print render($title_suffix['contextual_links']); ?>
    <?php endif; ?>

    <?php print $ds_content; ?>
  </<?php print $ds_content_wrapper ?>>

  <?php if (!empty($drupal_render_children)): ?>
    <?php print $drupal_render_children ?>
  <?php endif; ?>
</div>
