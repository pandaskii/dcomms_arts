(function($, Drupal) {
  Drupal.behaviors.books = {
    attach: function(context) {
      if ($('.view-book-search').length > 0) {

        var $sort_option = $("#edit-field-winner-value option:selected").text();
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
          if ($('#filter-wrapper-booktype-tid').length) {
            $('#filter-wrapper-booktype-tid').remove();
          }
          var $checkboxes = '<div class="filter" id="filter-wrapper-booktype-tid"><label class="filter__label" id="label-field-book-type-tid_cb" for="edit-field-book-type-tid_cb">Categories</label>'
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
          if ($('#filter-wrapper-bookyear-tid').length) {
            $('#filter-wrapper-bookyear-tid').remove();
          }
          var $checkboxes = '<div class="filter" id="filter-wrapper-bookyear-tid"><label class="filter__label" for="edit-form-item-field-book-year-tid">Year</label>'
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
        $('.filter__label[for="edit-form-item-field-book-year-tid"], .filter__label[for="edit-field-book-type-tid_cb"]')
          .bind('click', function() {
            $(this).toggleClass('open');
            $(this).next().toggleClass('open');
          });
      }
      // Set correct labels for authors & illustrators.
      $('.book-author').each(function() {
        if ($(this).find('.field-name-field-pbundle-subtitle').length > 1) {
          $(this).find('.pmla_author').html('Authors: ');
        }
        if ($(this).find('.field-name-field-pbundle-subtitle').length == 0) {
          $(this).find('.pmla_author').html('');
        }
      });
      $('.book-illustrator').each(function() {
        if ($(this).find('.field-name-field-pbundle-subtitle').length > 1) {
          $(this).find('.pmla_illustrator').html('Illustrators: ');
        }
        if ($(this).find('.field-name-field-pbundle-subtitle').length == 0) {
          $(this).find('.pmla_illustrator').html('');
        }
      });

      // Set no result message.
      if ($('.layout-sidebar__main > .view-empty').length > 0) {
        var $isCurrentYr = 0;
        var $selectedCat = $('#edit-field-book-type-tid option:selected').length;
        var $selectedYear = $('#edit-field-book-year-tid option:selected').length;

        if ($selectedYear > 0) {
          var $current_yr = new Date().getFullYear();
          var $year_val = '';

          $('#edit-field-book-year-tid option:selected').each(function(i) {
            if ($(this).text() == $current_yr) {
              $('#no-yr').show();
              $isCurrentYr = 1;
              return false;
            }
            if (i < ($selectedYear - 1)) {
              $year_val += $(this).filter(':selected').text() + ', ';
            }
            else {
              $year_val += $(this).filter(':selected').text();
            }
          });
          $('.view-empty span:last-child').text(' in ' + $year_val);
        }

        if (($selectedCat > 0) && ($isCurrentYr == 0)) {
          var $cat_name = ''
          $('#edit-field-book-type-tid option:selected').each(function(i) {

            if (i < ($selectedCat - 1)) {
              $cat_name += $(this).filter(':selected').text() + ', ';
            }
            else {
              $cat_name += $(this).filter(':selected').text();
            }
          });
          $('.view-empty span:first-child').html(' ' + $cat_name + ' ');
          $('#no-cat').show();
        }
      }
    }
  };
})(jQuery, Drupal);
