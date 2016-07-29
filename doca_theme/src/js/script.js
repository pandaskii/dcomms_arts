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

  Drupal.behaviors.skipLink = {
    attach: function() {
      setTimeout(function() {
        var firstElement = $('#skip-link').siblings().first();
        $(firstElement).before($('#skip-link'));
      }, 2100);

      $('#skip-link').click(function() {
        $('#skip-content').focus();
      });
    }
  };

  Drupal.behaviors.twitterFeed = {
    attach: function() {
      setTimeout(function() {
        $("iframe[id^=twitter-widget-").each(function() {
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

  Drupal.behaviors.streamLinks = {
    attach: function(context) {
      var filepath = "/sites/all/themes/dcomms_arts/doca_theme/dist/images/icons/stream/";
      $('.channel-list__grid-item a', context).each(function() {
        var imgSrc = $(this).find('img').attr('src');
        var imgSrc_o = imgSrc;
        var parts = imgSrc.split('/');
        imgSrc = parts[parts.length - 1];
        var imgSrc_h = imgSrc.replace('.svg', '_h.svg');
        imgSrc_h = filepath + imgSrc_h;
        var imgSrc_a = imgSrc.replace('.svg', '_a.svg');
        imgSrc_a = filepath + imgSrc_a;
        $(this).hover(function() {
          $(this).find('img').attr('src', imgSrc_h);
        }, function() {
          $(this).find('img').attr('src', imgSrc_o);
        });
        $(this).mousedown(function() {
          $(this).find('img').attr('src', imgSrc_a);
        });
        $(this).mouseup(function() {
          $(this).find('img').attr('src', imgSrc_o);
        });
      })
    }
  };
  Drupal.behaviors.qanda = {
    attach: function(context) {
      $('#qa-expand', context).on('click', function(e) {
        e.preventDefault();
        if ($('#qa-expand').hasClass('open-all')) {
          $('#qa-expand').removeClass('open-all');
          $('#qa-expand span').text('+');
        }
        else {
          $('#qa-expand').addClass('open-all');
          $('#qa-expand span').text('-');
        }
        $('.accordion__button').click();
      })
    }
  };

})(jQuery, Drupal);
