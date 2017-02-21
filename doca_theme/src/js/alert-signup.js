(function($, Drupal) {

  'use strict';

  Drupal.behaviors.artsSignupForm = {
    attach: function() {

      function artsSignupForm() {
        var messageArea = $('.alert-signup__message');
        var alertForm = $('.alert-signup__form');

        // Standard fields.
        var standardFields = {};
        standardFields.EMAIL = $('#st_EMAIL').val();

        // Custom fields.
        var customFields = {};
        if (Drupal.settings.doca_theme.alertHideName === '0') {
          if (Drupal.settings.doca_theme.alertFullName === '0') {
            standardFields.FIRST_NAME = $('#st_FIRST_NAME').val();
            standardFields.LAST_NAME = $('#st_LAST_NAME').val();
          }
          else {
            customFields.cu_FULL_NAME = $('#cu_FULL_NAME').val();
          }
        }
        if (!Drupal.settings.doca_theme.alertHideNumber) {
          customFields.cu_CONTACT_NUMBER = $('#cu_CONTACT_NUMBER').val();
        }
        customFields.cu_DEPARTMENT_ID = $('#cu_DEPARTMENT_ID').val();

        var mailGroups = Drupal.settings.doca_theme.alertMailGroup.split(',');
        var microSite = Drupal.settings.doca_theme.microSite;
        var apicall = Drupal.settings.doca_theme.apicall;
        var errorMessage = Drupal.settings.doca_theme.errorMessage;

        $.getJSON(microSite + "/scripts/subscribe/subscribe.php?callback=?", {
          st: standardFields,
          cu: customFields,
          gr: mailGroups,
          method: apicall,
          format: "json"
        }, function(response) {
          $(alertForm).hide();

          // Show response message.
          switch (response.code) {
            case '000':
              $(messageArea).addClass('messages--status').html(Drupal.settings.doca_theme.alertSuccessMessage);
              break;

            case '101':
            case '102':
            case '103':
              $(messageArea).addClass('messages--error').html(errorMessage + '<br/><strong>Error:</strong> ' + response.message);
              break;

            default:
              $(messageArea).addClass('messages--error').html(errorMessage);
          }
        });
      }

      $('.alert-signup__form').submit(function(e) {
        e.preventDefault();
        artsSignupForm();
        return false;
      });

    }
  };

})(jQuery, Drupal);
