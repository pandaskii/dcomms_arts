(function($, Drupal) {
  Drupal.behaviors.books = {
    attach: function(context) {
      if ($('.view-book-search').length > 0) {

        var $sort_option = $("#edit-field-winner option:selected").text();
        var $subtitle = '<h2 class="subtitle">' + $sort_option + '</h2>';
        $('.layout-max > .share-row').prepend($subtitle);
        //
        var textHeight;
        $('.views-row.book').hover(function() {
          textHeight = $(this).find('.book-details__overlay').outerHeight() + 20;
          $(this).find('.views-field-field-thumbnail').animate({
            top: textHeight
          }, 200);
        }, function() {
          $(this).find('.views-field-field-thumbnail').animate({
            top: 0
          }, 200);
        });

        $('.views-row.book .views-field-field-thumbnail').on('click', function() {
          var hrefLocation = $(this).find('a').attr('href');
          location.href = hrefLocation;
        });
        var $param;
        var $y_param;
        var $labels = [];
        var $options = [];
        var $y_labels = [];
        var $y_options = [];
        var $params = [];
        var $y_params = [];

        $('select#edit-field-book-type-tid option').each(function() {
          $options.push($(this).val());
          $labels.push($(this).text());
          $param = 'field_book_type%5B%5D=' + $(this).val();
          $params.push($param);
        });
        $('select#edit-field-book-year-tid option').each(function() {
          $y_options.push($(this).val());
          $y_labels.push($(this).text());
          $y_param = 'field_book_year_tid%5B%5D=' + $(this).val();
          $y_params.push($y_param);
        });
        var $checkboxes = '<div id="edit-field-book-type-tid_cb" class="form-checkboxes">';
        $.each($options, function(i) {
          $checkboxes += '<div class="form-item form-type-checkbox">';
          $checkboxes += '<input type="checkbox" id="id-' + $options[i] + '" name="field_book_type_tid[]" value="' + $options[i] + '" class="form-checkbox">';
          $checkboxes += '<label class="option" for="id-' + $options[i] + '">' + $labels[i] + '</label></div>';
        });
        $checkboxes += '</div>';
        $('#category-wrapper').before($checkboxes);
        //$('#category-wrapper').html('');

        var $y_checkboxes = '<div id="edit-field-book-year-tid_cb" class="form-checkboxes">';
        $.each($y_options, function(i) {
          $y_checkboxes += '<div class="form-item form-type-checkbox">';
          $y_checkboxes += '<input type="checkbox" id="id-' + $y_options[i] + '" name="field_book_year_tid[]" value="' + $y_options[i] + '" class="form-checkbox">';
          $y_checkboxes += '<label class="option" for="id-' + $y_options[i] + '">' + $y_labels[i] + '</label></div>';
        });
        $y_checkboxes += '</div>';
        $('#year-wrapper').before($y_checkboxes);
        //$('#year-wrapper').html('');

        $('select#edit-field-book-type-tid option').attr('selected', 'selected').each(function() {
          var $selected = $(this).val();
          $('input #id-' + $selected).attr('checked', 'checked');

        });
        var $search = window.location.search;
        $.each($params, function(k) {
          if ($search.indexOf($params[k]) >= 0) {
            $('#edit-field-book-type-tid_cb input').eq(k).attr("checked", 'checked');
          }
        });
        $.each($y_params, function(l) {
          if ($search.indexOf($y_params[l]) >= 0) {
            $('#edit-field-book-year-tid_cb input').eq(l).attr("checked", 'checked');
          }
        });

        // Years expand-collapse
        $('.filter__label[for="edit-field-book-year-tid"]').on('click', function() {
          $(this).toggleClass('open');
          $(this).next().toggleClass('open');
        });
      }
    }
  };
})(jQuery, Drupal);
