<?php
/**
 * @file
 * Channels theme implementation for question-answer groups.
 */
?>

<div class="palette__pale-grey">
<div class="layout-max spacer panel-background-8 spacer--bottom-mid">
  <div class="<?php print $classes; ?>">
    <?php print render($content['field_pbundle_title']); ?>
   <p><?php print render($content['field_bean_text']); ?></p>
    <div class="accordion">
      <?php print render($content['field_para_qna_pair']); ?>
    </div>
  </div>
</div>
</div>
