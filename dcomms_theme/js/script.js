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
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.skipLink = {
    attach: function () {
      setTimeout(function () {
        var firstElement = $('#skip-link').siblings().first();
        $(firstElement).before($('#skip-link'));
      }, 2100);

      $('#skip-link').click(function() {
        $('#skip-content').focus();
      });
    }
  };

  Drupal.behaviors.twitterFeed = {
    attach: function () {
      setTimeout(function () {
        $("iframe[id^=twitter-widget-").each(function () {
          var head = $(this).contents().find('head');
          if (head.length) {
            head.append('<style type="text/css">.timeline { max-width: none !important; width: 100% !important; } .timeline .stream { max-width: none !important; width: 100% !important; } </style>');
          }
        });
      }, 2000);
    }
  };

  Drupal.behaviors.iframeLinks = {
    attach: function(context) {
      $('.view-consultations-iframe', context).find('a').each(function() {
        var $this = $(this);
        if (!$this.is('[target]')) {
          $this.attr('target', '_parent');
        }
      });
    }
  };

})(jQuery, Drupal);
