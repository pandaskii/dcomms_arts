<?php
/**
 * @file
 * Template implementation to display the image of channel.
 */
?>
<div class="show-at__large">
  <?php foreach ($items as $delta => $item): ?>
    <?php print dcomms_theme_trim(render($item), 130); ?>
  <?php endforeach; ?>
</div>
