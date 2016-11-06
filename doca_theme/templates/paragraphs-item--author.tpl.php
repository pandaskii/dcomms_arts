<?php

/**
 * @file
 * Default theme implementation for a single paragraph item.
 */
?>
<div class="book-author-inline">
	<?php print render($content['field_pbundle_title']) . ' ' . render($content['field_pbundle_subtitle']); ?>
</div>
<?php print render($content); ?>
