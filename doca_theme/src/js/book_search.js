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
          textHeight = $(this)
            .find('.book-details__overlay')
            .outerHeight() + 20;
          $(this).find('.views-field-field-thumbnail').animate({
            top: textHeight
          }, 200);
        }, function() {
          $(this).find('.views-field-field-thumbnail').animate({
            top: 0
          }, 200);
        });

        //        $('.views-row.book .views-field-field-thumbnail')
        //          .bind('click', function() {
        //            var hrefLocation = $(this).find('a').attr('href');
        //            location.href = hrefLocation;
        //          });
        var $param;
        var $y_param;
        var $labels = [];
        var $options = [];
        var $y_labels = [];
        var $y_options = [];
        var $params = [];
        var $y_params = [];

        // replace all the category and year select options are checkboxes
        $('#category-wrapper').ready(function() {
          if ($('#edit-field-book-type-tid_cb').length) {
            $('#edit-field-book-type-tid_cb').remove();
          }
          var $checkboxes = '<div class="filter"><label class="filter__label" for="edit-field-book-type-tid_cb">Categories</label>'
          $checkboxes += '<div id="edit-field-book-type-tid_cb" class="form-checkboxes">';
          $('#category-wrapper').find('select option').each(function(i) {
            $checkboxes += '<div class="form-item form-type-checkbox">';
            var value = $(this).val();
            $checkboxes += '<input type="checkbox" id="id-' + value + '" name="field_book_type_tid_check[]" value="' + value + '" class="form-checkbox"';
            if ($(this).attr('selected')) {
              $checkboxes += ' checked';
            }
            $checkboxes += '>';
            $checkboxes += '<label class="option" for="id-' + value + '">' + $(this).text() + '</label></div>';
          });
          $checkboxes += '</div></div>';
          $('[id^="views-exposed-form-book-search-block-search"]').after($checkboxes);
          $('#edit-field-book-type-tid_cb').find(':checkbox').bind('change', function() {
            if ($(this).attr('checked')) {
              $('#category-wrapper').find('select option[value="' + $(this).attr('id').replace('id-', '') + '"]' +
                '').selected(true).change();
            }
            else {
              $('#category-wrapper').find('select option[value="' + $(this).attr('id').replace('id-', '') + '"]' +
                '').selected(false).change();
            }
          });
        });
        $('#year-wrapper').ready(function() {
          if ($('#edit-form-item-field-book-year-tid').length) {
            $('#edit-form-item-field-book-year-tid').remove();
          }
          var $checkboxes = '<div class="filter"><label class="filter__label" for="edit-form-item-field-book-year-tid">Year</label>'
          $checkboxes += '<div id="edit-form-item-field-book-year-tid" class="form-checkboxes">';
          $('#year-wrapper').find('select option').each(function(i) {
            $checkboxes += '<div class="form-item form-type-checkbox">';
            var value = $(this).val();
            $checkboxes += '<input type="checkbox" id="id-' + value + '" name="field_book_year_tid_check[]" value="' + value + '" class="form-checkbox"';
            if ($(this).attr('selected')) {
              $checkboxes += ' checked';
            }
            $checkboxes += '>';
            $checkboxes += '<label class="option" for="id-' + value + '">' + $(this).text() + '</label></div>';
          });
          $checkboxes += '</div></div>';
          $('[id^="views-exposed-form-book-search-block-search"]').after($checkboxes);

          $('#edit-form-item-field-book-year-tid').find(':checkbox').bind('change', function() {
            if ($(this).attr('checked')) {
              $('#year-wrapper').find('select option[value="' + $(this).attr('id').replace('id-', '') + '"]' +
                '').selected(true).change();
            }
            else {
              $('#year-wrapper').find('select option[value="' + $(this).attr('id').replace('id-', '') + '"]' +
                '').selected(false).change();
            }
          });
        });
        var $search = window.location.search;
        $.each($params, function(k) {
          if ($search.indexOf($params[k]) >= 0) {
            $('#edit-field-book-type-tid_cb input')
              .eq(k)
              .attr("checked", 'checked');
          }
        });
        $.each($y_params, function(l) {
          if ($search.indexOf($y_params[l]) >= 0) {
            $('#edit-field-book-year-tid_cb input')
              .eq(l)
              .attr("checked", 'checked');
          }
        });

        // Years expand-collapse
        $('.filter__label[for="edit-field-book-year-tid"]')
          .bind('click', function() {
            $(this).toggleClass('open');
            $(this).next().toggleClass('open');
          });
      }
      $('.book-author').each(function() {
        if ($(this).find('.field-name-field-pbundle-subtitle').length > 1) {
          $(this).find('.pmla_author').html('Authors');
        }
      });
      $('.book-illustrator').each(function() {
        if ($(this).find('.field-name-field-pbundle-subtitle').length > 1) {
          $(this).find('.pmla_author').html('Illustrators');
        }
      });
    }
  };
})(jQuery, Drupal);
