/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function($, Drupal) {

  'use strict';

  Drupal.behaviors.defaultFundingEndDate = {
    attach: function(context) {

      function changeDate() {
        return $("[id^='edit-field-funding-type-und']").val() == Drupal.settings.doca_admin.ongoing_tid;
      }

      // Abort early if we aren't on a funding node edit page.
      if (!$(context).find('#funding-node-form')) {
        return;
      }

      // Pull in existing datepicker settings for start date field.
      var dateSettings = $.extend(true, {}, Drupal.settings.datePopup['edit-field-consultation-date-und-0-value-datepicker-popup-0']);
      var endDateSettings = Drupal.settings.datePopup['edit-field-consultation-date-und-0-value2-datepicker-popup-0'];

      // Select our date widgets.
      var startDate = $('#edit-field-consultation-date-und-0-value-datepicker-popup-0');
      var endDate = $('#edit-field-consultation-date-und-0-value2-datepicker-popup-0');

      // Init the end date datepicker before we try to call it's setDate method.
      // This usually happens on focus event in date_popup, but we need it sooner.
      endDate.datepicker(endDateSettings.settings);

      // Add the option to respond to onSelect events.
      dateSettings.settings.onSelect = function(d,i) {
        if (changeDate()) {
          var end = new Date(d);
          end.setMonth(end.getMonth() + 3);
          var formattedDate = $.datepicker.formatDate("d M yy", end);
          if (d !== i.lastVal) {
            // Update the end date when the start date changes.
            endDate.datepicker('setDate', formattedDate);
          }
        }
      }

      // When the Funding status field changes to Ongoing, also change the end date
      $("[id^='edit-field-funding-type-und']").change(function() {
        if (changeDate()) {
          var end = new Date(startDate.val());
          end.setMonth(end.getMonth() + 3);
          var formattedDate = $.datepicker.formatDate("d M yy", end);
          endDate.datepicker('setDate', formattedDate);
        }
      });

      // Re-init the date picker with our updated settings.
      startDate.datepicker(dateSettings.settings);
    }
  };

})(jQuery, Drupal);
