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
        if (!Drupal.settings.doca_theme.alertHideName) {
          customFields.cu_FULL_NAME = $('#cu_FULL_NAME').val();
        }
        if (!Drupal.settings.doca_theme.alertHideNumber) {
          customFields.cu_CONTACT_NUMBER = $('#cu_CONTACT_NUMBER').val();
        }
        customFields.cu_DEPARTMENT_ID = $('#cu_DEPARTMENT_ID').val();

        var mailGroups = Drupal.settings.doca_theme.alertMailGroup.split(',');
        var microSite = Drupal.settings.doca_theme.microSite;

        $.getJSON(microSite + "/scripts/subscribe/subscribe.php?callback=?", {
          st: standardFields,
          cu: customFields,
          gr: mailGroups,
          method: 'updategroups',
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
              $(messageArea).addClass('messages--error').html(response.message);
              break;

            default:
              $(messageArea).addClass('messages--error').html("Sorry it looks like that didn't work. Please try refreshing the page and subscribing again.");
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
      var filepath = "/" + Drupal.settings.pathToTheme + "/dist/images/icons/stream/";
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
      $('#qa-expand', context).bind('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('open-all')) {
          $(this).removeClass('open-all');
          $(this).html('Expand all <span>+</span>');
          $('.accordion__button[aria-expanded="true"]').click();
        }
        else {
          $(this).addClass('open-all');
          $(this).html('Collapse all <span>-</span>');
          $('.accordion__button[aria-expanded="false"]').click();
        }

      })
    }
  };

  Drupal.behaviors.caption_hover = {
    attach: function(context) {
      var is_touch_screen = 'ontouchstart' in document.documentElement;
      if (!is_touch_screen) {
        $('.featured-with-caption', context).hover(function() {
          $(this).find('.featured-overlay').fadeIn(100);
          $(this).closest('div.node').css('overflow', 'visible');
        }, function() {
          $(this).find('.featured-overlay').fadeOut(100);
          $(this).closest('div.node').css('overflow', 'hidden');
        })
      }
    }
  };

  Drupal.behaviors.ga = {
    attach: function(context) {
      // Only set up GA tracking and custom event bindings once.
      $('body', context).once('gaBehavior', function() {
        // Grab appropriate GA code for the active environment.
        var gaCode = Drupal.settings.gaSettings.gaCode;

        // Add GA magic.
        (function(i, s, o, g, r, a, m) {
          i["GoogleAnalyticsObject"] = r;
          i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments)
          }, i[r].l = 1 * new Date();
          a = s.createElement(o), m = s.getElementsByTagName(o)[0];
          a.async = 1;
          a.src = g;
          m.parentNode.insertBefore(a, m)
        })(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");
        ga("create", gaCode, {
          "cookieDomain": "auto"
        });

        // GTM tracking. If GTM is used - it will use GA tracker created by this module and send Pageview later. If GTM is not used - send Pageview right now
        ga("set", "page", location.pathname + location.search + location.hash);
        var isGTMUsed = true;
        if (!isGTMUsed) {
          ga("send", "pageview");
        }
        ga('create', gaCode, 'auto', {
          'name': 'govcms'
        });
        ga('govcms.send', 'pageview', {
          'anonymizeIp': true
        });

        // Track frontend webform submisions as custom events.
        $('.webform-client-form').submit(function(event) {
          // Wrap the form in a jQuery object.
          var $form = $(this);
          ga('send', {
            hitType: 'event',
            eventCategory: 'webform',
            eventAction: 'submit',
            // Pass the form ID as the label argument.
            eventLabel: $form.attr('id'),
          });
        });
      });
    }
  };

  Drupal.behaviors.tables = {
    attach: function(context) {
      if ($('.tablesaw').length > 0) {
        $(".tablesaw tbody tr:even").addClass("tr-even");
      }
    }
  };

  Drupal.behaviors.books = {
    attach: function(context) {
      if ($('.view-book-search-with-fields').length > 0) {
        var $sort_option = $("#edit-field-winner option:selected").text();
        var $subtitle = '<h2>' + $sort_option + '</h2>';
        $('.layout-max > .share-row').prepend($subtitle);

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
        var $labels = [];
        var $options = [];
        var $params = [];
        $('select#edit-field-book-type option').each(function() {
          $options.push($(this).val());
          $labels.push($(this).text());
          $param = 'field_book_type%5B%5D=' + $(this).val();
          $params.push($param);
        });
        var $checkboxes = '<div id="edit-field-book-type_cb" class="form-checkboxes">';
        $.each($options, function(i) {
          $checkboxes += '<div class="form-item form-type-checkbox">';
          $checkboxes += '<input type="checkbox" id="id-' + $options[i] + '" name="field_book_type[]" value="' + $options[i] + '" class="form-checkbox">';
          $checkboxes += '<label class="option" for="id-' + $options[i] + '">' + $labels[i] + '</label></div>';
        });
        $checkboxes += '</div>';
        $('#category-wrapper').before($checkboxes);
        $('#category-wrapper').html('');

        $('#edit-field-book-type_cb input').each(function(j) {
          $(this).on('click', function() {
            $('.view-filters > form').submit();

          })
        });

        var $search = window.location.search;
        $.each($params, function(k) {
          if ($search.indexOf($params[k]) >= 0) {
            $('#edit-field-book-type_cb input').eq(k).attr("checked", 'checked');
          }
        });
        $('#edit-field-winner').on('change', function() {
          $('.view-filters > form').submit();
        });
      }
    }
  };

})(jQuery, Drupal);

jQuery.extend({
  getUrlVars: function() {
    var vars = [],
      hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name) {
    return $.getUrlVars()[name];
  }
});
