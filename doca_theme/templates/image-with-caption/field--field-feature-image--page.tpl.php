<?php
/**
 * @file
 * Default template implementation to display the value of a field.
 */
?>
<div class="spacer--bottom-mid  image-with-caption">
  <?php foreach ($items as $delta => $item): ?>
    <?php print render($item); ?>
    <div class="image-with-caption__caption">
      <?php print render($item['#item']['field_file_image_title_text'][LANGUAGE_NONE][0]['safe_value']); ?>
      <?php print render($item['#item']['field_artist'][LANGUAGE_NONE][0]['safe_value']); ?>
    </div>
  <?php endforeach; ?>
</div>
