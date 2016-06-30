<?php
/**
 * @file
 * Default template implementation to display the value of a field.
 */
?>
<div class="spacer--vertical">
  <?php if (!$label_hidden): ?>
    <div class="field-label"<?php print $title_attributes; ?>><?php print $label ?>:&nbsp;</div>
  <?php endif; ?>
  <div class="progress-bar <?php print $funding['status_class']; ?>"<?php print $content_attributes; ?>>
    <div class="progress-bar__text">
      <div class="progress-bar__start-date">
        <?php print t('Started') . ' ' . format_date($funding['start'], 'full_with_timezone'); ?></div>
      <div class="progress-bar__end-date">
        <?php print t('Ends') . ' ' . format_date($funding['end'], 'full_with_timezone'); ?></div>
    </div>
    <div class="progress-bar__bar">
      <div class="progress-bar__progress" style="width: <?php print round($funding['percentage']); ?>%;"></div>
    </div>
    <div class="progress-bar__days-remain">
      <span class="progress-bar__label"><?php print t('Days Remaining'); ?> </span>
      <span class="progress-bar__highlighted"><?php print $funding["days_remain"]; ?></span> <?php print 'of ' . $funding["days_total"]; ?>
    </div>

    <?php if(isset($funding['status_message'])): ?>
      <div class="progress-bar__highlighted">
        <?php print $funding['status_message']; ?>
      </div>
    <?php endif; ?>

  </div>
</div>
