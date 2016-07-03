<?php
/**
 * @file
 * Channels theme implementation for a single paragraph item.
 */
?>

<div class="featured__grid-item">
	<div class="featured__grid-item__left">
	  <?php print render($content['field_pbundle_image']); ?>
	</div>
	<div class="featured__grid-item__right">
	  <?php print render($content['field_pbundle_title']); ?>
	  <?php print render($content['field_pbundle_text']); ?>
	  <?php print render($content['field_pbundle_destination']); ?>
	</div>
</div>
