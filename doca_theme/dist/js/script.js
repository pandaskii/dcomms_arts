var CustomizeTwitterWidget = function(e) {
  window.console && console.log || (console = {
    log: function() {},
    debug: function() {},
    info: function() {},
    warn: function() {},
    error: function() {}
  });
  var t = function(e) {
      return isNaN(parseFloat(e)) && isFinite(e)
    },
    i = function(e, t) {
      var i = e.createElement("link");
      return i.href = t, i.rel = "stylesheet", i.type = "text/css", i
    },
    o = function(e, t) {
      var o = i(e, t),
        n = e.getElementsByTagName("head")[0];
      n.appendChild(o)
    },
    n = function(e, t) {
      return e.indexOf(t) >= 0
    },
    r = function(e) {
      return e.frameElement.id.indexOf("twitter-widget") >= 0
    },
    a = function(t, i, s) {
      for (var l = 0; l < frames.length; l++) try {
        r(frames[l]) && !n(t, frames[l].name) && (o(frames[l].document, e.url), t.push(l))
      }
      catch (c) {
        console.log("caught an error"), console.log(c)
      }
      t.length < i && setTimeout(function() {
        a(t)
      }, s)
    };
  if (void 0 === e.url) return void console.log("need to specify a link to your CSS file. quitting");
  var s;
  s = void 0 === e.widget_count || t(e.widget_count) ? 1 : e.widget_count;
  var l;
  l = void 0 === e.timeout_length || t(e.timeout_length) ? 300 : e.timeout_length, setTimeout(function() {
    a([], s, l)
  }, l)
};
! function(e) {
  "use strict";
  e.fn.fitVids = function(t) {
    var i = {
      customSelector: null
    };
    if (!document.getElementById("fit-vids-style")) {
      var o = document.head || document.getElementsByTagName("head")[0],
        n = ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",
        r = document.createElement("div");
      r.innerHTML = '<p>x</p><style id="fit-vids-style">' + n + "</style>", o.appendChild(r.childNodes[1])
    }
    return t && e.extend(i, t), this.each(function() {
      var t = ["iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed"];
      i.customSelector && t.push(i.customSelector);
      var o = e(this).find(t.join(","));
      o = o.not("object object"), o.each(function() {
        var t = e(this);
        if (!("embed" === this.tagName.toLowerCase() && t.parent("object").length || t.parent(".fluid-width-video-wrapper").length)) {
          var i = "object" === this.tagName.toLowerCase() || t.attr("height") && !isNaN(parseInt(t.attr("height"), 10)) ? parseInt(t.attr("height"), 10) : t.height(),
            o = isNaN(parseInt(t.attr("width"), 10)) ? t.width() : parseInt(t.attr("width"), 10),
            n = i / o;
          if (!t.attr("id")) {
            var r = "fitvid" + Math.floor(999999 * Math.random());
            t.attr("id", r)
          }
          t.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * n + "%"), t.removeAttr("height").removeAttr("width")
        }
      })
    })
  }
}(window.jQuery || window.Zepto),
function(e) {
  e.TableOfContents = function(t, i, o) {
    var n = this;
    return n.$el = e(t), n.el = t, n.toc = "", n.listStyle = null, n.tags = ["h1", "h2", "h3", "h4", "h5", "h6"], n.init = function() {
      n.options = e.extend({}, e.TableOfContents.defaultOptions, o), "undefined" != typeof i && null != i || (i = document.body), n.$scope = e(i);
      var t = n.$scope.find(n.tags.join(", ")).filter(":first");
      if (1 == t.length) {
        n.starting_depth = n.options.startLevel, n.options.depth < 1 && (n.options.depth = 1);
        var r = n.tags.splice(n.options.startLevel - 1, n.options.depth);
        if (n.$headings = n.$scope.find(r.join(", ")), "" !== n.options.ignoreClass && n.$headings.each(function(t, i) {
            $this = e(this), $this.hasClass(n.options.ignoreClass) && n.$headings.splice(t, 1)
          }), n.options.topLinks !== !1) {
          var a = e(document.body).attr("id");
          "" == a && (a = n.options.topBodyId, document.body.id = a), n.topLinkId = a
        }
        return n.$el.is("ul") ? n.listStyle = "ul" : n.$el.is("ol") && (n.listStyle = "ol"), n.buildTOC(), n.options.proportionateSpacing !== !0 || n.tieredList() || n.addSpacing(), n
      }
    }, n.tieredList = function() {
      return "ul" == n.listStyle || "ol" == n.listStyle
    }, n.buildTOC = function() {
      n.current_depth = n.starting_depth, n.$headings.each(function(e, t) {
        var i = this.nodeName.toLowerCase().substr(1, 1);
        (e > 0 || 0 == e && i != n.current_depth) && n.changeDepth(i), n.toc += n.formatLink(this, i, e) + "\n", n.options.topLinks !== !1 && n.addTopLink(this)
      }), n.changeDepth(n.starting_depth, !0), n.tieredList() && (n.toc = "<li>\n" + n.toc + "</li>\n"), n.$el.html(n.toc)
    }, n.addTopLink = function(t) {
      var i = n.options.topLinks === !0 ? "Top" : n.options.topLinks,
        o = e("<a href='#" + n.topLinkId + "' class='" + n.options.topLinkClass + "'></a>").html(i);
      e(t).append(o)
    }, n.formatLink = function(t, i, o) {
      var r = t.id;
      "" == r && (r = n.buildSlug(e(t).text()), t.id = r);
      var a = "<a href='#" + r + "'";
      return n.tieredList() || (a += " class='" + n.depthClass(i) + "'"), a += ">" + n.options.levelText.replace("%", e(t).text()) + "</a>"
    }, n.changeDepth = function(e, t) {
      if (t !== !0 && (t = !1), !n.tieredList()) return n.current_depth = e, !0;
      if (e > n.current_depth) {
        for (var i = [], o = n.current_depth; e > o; o++) i.push("<" + n.listStyle + ">\n");
        var r = "<li>\n";
        n.toc += i.join(r) + r
      }
      else if (e < n.current_depth) {
        for (var a = [], o = n.current_depth; o > e; o--) a.push("</" + n.listStyle + ">\n");
        n.toc += "</li>\n" + a.join("</li>\n"), t || (n.toc += "</li>\n<li>\n")
      }
      else t || (n.toc += "</li>\n<li>\n");
      n.current_depth = e
    }, n.buildSlug = function(e) {
      return e = e.toLowerCase().replace(/[^a-z0-9 -]/gi, "").replace(/ /gi, "-"), e = e.substr(0, 50)
    }, n.depthClass = function(e) {
      return n.options.levelClass.replace("%", e - (n.starting_depth - 1))
    }, n.addSpacing = function() {
      var t = n.$headings.filter(":first").position().top;
      n.$headings.each(function(i, o) {
        var r = n.$el.find("a:eq(" + i + ")"),
          a = (e(this).position().top - t) / (n.$scope.height() - t) * n.$el.height();
        r.css({
          position: "absolute",
          top: a
        })
      })
    }, n.init()
  }, e.TableOfContents.defaultOptions = {
    startLevel: 1,
    depth: 3,
    levelClass: "toc-depth-%",
    levelText: "%",
    topLinks: !1,
    ignoreClass: "",
    topLinkClass: "toc-top-link",
    topBodyId: "toc-top",
    proportionateSpacing: !1
  }, e.fn.tableOfContents = function(t, i) {
    return this.each(function() {
      var o = new e.TableOfContents(this, t, i);
      delete o
    })
  }
}(jQuery),
function() {
  var e, t;
  e = this.jQuery || window.jQuery, t = e(window), e.fn.stick_in_parent = function(i) {
    var o, n, r, a, s, l, c, d, p, u, f, m, g;
    for (null == i && (i = {}), g = i.sticky_class, l = i.inner_scrolling, m = i.recalc_every, f = i.parent, p = i.offset_top, d = i.spacer, r = i.bottoming, null == p && (p = 0), null == f && (f = void 0), null == l && (l = !0), null == g && (g = "is_stuck"), o = e(document), null == r && (r = !0), u = function(e) {
        var t, i, o;
        return window.getComputedStyle ? (t = e[0], i = window.getComputedStyle(e[0]), o = parseFloat(i.getPropertyValue("width")) + parseFloat(i.getPropertyValue("margin-left")) + parseFloat(i.getPropertyValue("margin-right")), "border-box" !== i.getPropertyValue("box-sizing") && (o += parseFloat(i.getPropertyValue("border-left-width")) + parseFloat(i.getPropertyValue("border-right-width")) + parseFloat(i.getPropertyValue("padding-left")) + parseFloat(i.getPropertyValue("padding-right"))), o) : e.outerWidth(!0)
      }, a = function(i, n, a, s, c, h, v, y) {
        var w, b, C, k, x, I, _, T, S, P, O, E;
        if (!i.data("sticky_kit")) {
          if (i.data("sticky_kit", !0), x = o.height(), _ = i.parent(), null != f && (_ = _.closest(f)), !_.length) throw "failed to find stick parent";
          if (C = !1, w = !1, O = null != d ? d && i.closest(d) : e("<div />"), O && O.css("position", i.css("position")), T = function() {
              var e, t, r;
              if (!y) return x = o.height(), e = parseInt(_.css("border-top-width"), 10), t = parseInt(_.css("padding-top"), 10), n = parseInt(_.css("padding-bottom"), 10), a = _.offset().top + e + t, s = _.height(), C && (C = !1, w = !1, null == d && (i.insertAfter(O), O.detach()), i.css({
                position: "",
                top: "",
                width: "",
                bottom: ""
              }).removeClass(g), r = !0), c = i.offset().top - (parseInt(i.css("margin-top"), 10) || 0) - p, h = i.outerHeight(!0), v = i.css("float"), O && O.css({
                width: u(i),
                height: h,
                display: i.css("display"),
                "vertical-align": i.css("vertical-align"),
                "float": v
              }), r ? E() : void 0
            }, T(), h !== s) return k = void 0, I = p, P = m, E = function() {
            var e, u, f, b, S, E;
            if (!y) return f = !1, null != P && (P -= 1, 0 >= P && (P = m, T(), f = !0)), f || o.height() === x || (T(), f = !0), b = t.scrollTop(), null != k && (u = b - k), k = b, C ? (r && (S = b + h + I > s + a, w && !S && (w = !1, i.css({
              position: "fixed",
              bottom: "",
              top: I
            }).trigger("sticky_kit:unbottom"))), c > b && (C = !1, I = p, null == d && ("left" !== v && "right" !== v || i.insertAfter(O), O.detach()), e = {
              position: "",
              width: "",
              top: ""
            }, i.css(e).removeClass(g).trigger("sticky_kit:unstick")), l && (E = t.height(), h + p > E && (w || (I -= u, I = Math.max(E - h, I), I = Math.min(p, I), C && i.css({
              top: I + "px"
            }))))) : b > c && (C = !0, e = {
              position: "fixed",
              top: I
            }, e.width = "border-box" === i.css("box-sizing") ? i.outerWidth() + "px" : i.width() + "px", i.css(e).addClass(g), null == d && (i.after(O), "left" !== v && "right" !== v || O.append(i)), i.trigger("sticky_kit:stick")), C && r && (null == S && (S = b + h + I > s + a), !w && S) ? (w = !0, "static" === _.css("position") && _.css({
              position: "relative"
            }), i.css({
              position: "absolute",
              bottom: n,
              top: "auto"
            }).trigger("sticky_kit:bottom")) : void 0
          }, S = function() {
            return T(), E()
          }, b = function() {
            return y = !0, t.off("touchmove", E), t.off("scroll", E), t.off("resize", S), e(document.body).off("sticky_kit:recalc", S), i.off("sticky_kit:detach", b), i.removeData("sticky_kit"), i.css({
              position: "",
              bottom: "",
              top: "",
              width: ""
            }), _.position("position", ""), C ? (null == d && ("left" !== v && "right" !== v || i.insertAfter(O), O.remove()), i.removeClass(g)) : void 0
          }, t.bind("touchmove", E), t.bind("scroll", E), t.bind("resize", S), e(document.body).bind("sticky_kit:recalc", S), i.bind("sticky_kit:detach", b), setTimeout(E, 0)
        }
      }, s = 0, c = this.length; c > s; s++) n = this[s], a(e(n));
    return this
  }
}.call(this), ! function(e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function(e) {
  var t, i, o, n, r, a, s = "Close",
    l = "BeforeClose",
    c = "AfterClose",
    d = "BeforeAppend",
    p = "MarkupParse",
    u = "Open",
    f = "Change",
    m = "mfp",
    g = "." + m,
    h = "mfp-ready",
    v = "mfp-removing",
    y = "mfp-prevent-close",
    w = function() {},
    b = !!window.jQuery,
    C = e(window),
    k = function(e, i) {
      t.ev.on(m + e + g, i)
    },
    x = function(t, i, o, n) {
      var r = document.createElement("div");
      return r.className = "mfp-" + t, o && (r.innerHTML = o), n ? i && i.appendChild(r) : (r = e(r), i && r.appendTo(i)), r
    },
    I = function(i, o) {
      t.ev.triggerHandler(m + i, o), t.st.callbacks && (i = i.charAt(0).toLowerCase() + i.slice(1), t.st.callbacks[i] && t.st.callbacks[i].apply(t, e.isArray(o) ? o : [o]))
    },
    _ = function(i) {
      return i === a && t.currTemplate.closeBtn || (t.currTemplate.closeBtn = e(t.st.closeMarkup.replace("%title%", t.st.tClose)), a = i), t.currTemplate.closeBtn
    },
    T = function() {
      e.magnificPopup.instance || (t = new w, t.init(), e.magnificPopup.instance = t)
    },
    S = function() {
      var e = document.createElement("p").style,
        t = ["ms", "O", "Moz", "Webkit"];
      if (void 0 !== e.transition) return !0;
      for (; t.length;)
        if (t.pop() + "Transition" in e) return !0;
      return !1
    };
  w.prototype = {
    constructor: w,
    init: function() {
      var i = navigator.appVersion;
      t.isLowIE = t.isIE8 = document.all && !document.addEventListener, t.isAndroid = /android/gi.test(i), t.isIOS = /iphone|ipad|ipod/gi.test(i), t.supportsTransition = S(), t.probablyMobile = t.isAndroid || t.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), o = e(document), t.popupsCache = {}
    },
    open: function(i) {
      var n;
      if (i.isObj === !1) {
        t.items = i.items.toArray(), t.index = 0;
        var a, s = i.items;
        for (n = 0; n < s.length; n++)
          if (a = s[n], a.parsed && (a = a.el[0]), a === i.el[0]) {
            t.index = n;
            break
          }
      }
      else t.items = e.isArray(i.items) ? i.items : [i.items], t.index = i.index || 0;
      if (t.isOpen) return void t.updateItemHTML();
      t.types = [], r = "", i.mainEl && i.mainEl.length ? t.ev = i.mainEl.eq(0) : t.ev = o, i.key ? (t.popupsCache[i.key] || (t.popupsCache[i.key] = {}), t.currTemplate = t.popupsCache[i.key]) : t.currTemplate = {}, t.st = e.extend(!0, {}, e.magnificPopup.defaults, i), t.fixedContentPos = "auto" === t.st.fixedContentPos ? !t.probablyMobile : t.st.fixedContentPos, t.st.modal && (t.st.closeOnContentClick = !1, t.st.closeOnBgClick = !1, t.st.showCloseBtn = !1, t.st.enableEscapeKey = !1), t.bgOverlay || (t.bgOverlay = x("bg").on("click" + g, function() {
        t.close()
      }), t.wrap = x("wrap").attr("tabindex", -1).on("click" + g, function(e) {
        t._checkIfClose(e.target) && t.close()
      }), t.container = x("container", t.wrap)), t.contentContainer = x("content"), t.st.preloader && (t.preloader = x("preloader", t.container, t.st.tLoading));
      var l = e.magnificPopup.modules;
      for (n = 0; n < l.length; n++) {
        var c = l[n];
        c = c.charAt(0).toUpperCase() + c.slice(1), t["init" + c].call(t)
      }
      I("BeforeOpen"), t.st.showCloseBtn && (t.st.closeBtnInside ? (k(p, function(e, t, i, o) {
        i.close_replaceWith = _(o.type)
      }), r += " mfp-close-btn-in") : t.wrap.append(_())), t.st.alignTop && (r += " mfp-align-top"), t.fixedContentPos ? t.wrap.css({
        overflow: t.st.overflowY,
        overflowX: "hidden",
        overflowY: t.st.overflowY
      }) : t.wrap.css({
        top: C.scrollTop(),
        position: "absolute"
      }), (t.st.fixedBgPos === !1 || "auto" === t.st.fixedBgPos && !t.fixedContentPos) && t.bgOverlay.css({
        height: o.height(),
        position: "absolute"
      }), t.st.enableEscapeKey && o.on("keyup" + g, function(e) {
        27 === e.keyCode && t.close()
      }), C.on("resize" + g, function() {
        t.updateSize()
      }), t.st.closeOnContentClick || (r += " mfp-auto-cursor"), r && t.wrap.addClass(r);
      var d = t.wH = C.height(),
        f = {};
      if (t.fixedContentPos && t._hasScrollBar(d)) {
        var m = t._getScrollbarSize();
        m && (f.marginRight = m)
      }
      t.fixedContentPos && (t.isIE7 ? e("body, html").css("overflow", "hidden") : f.overflow = "hidden");
      var v = t.st.mainClass;
      return t.isIE7 && (v += " mfp-ie7"), v && t._addClassToMFP(v), t.updateItemHTML(), I("BuildControls"), e("html").css(f), t.bgOverlay.add(t.wrap).prependTo(t.st.prependTo || e(document.body)), t._lastFocusedEl = document.activeElement, setTimeout(function() {
        t.content ? (t._addClassToMFP(h), t._setFocus()) : t.bgOverlay.addClass(h), o.on("focusin" + g, t._onFocusIn)
      }, 16), t.isOpen = !0, t.updateSize(d), I(u), i
    },
    close: function() {
      t.isOpen && (I(l), t.isOpen = !1, t.st.removalDelay && !t.isLowIE && t.supportsTransition ? (t._addClassToMFP(v), setTimeout(function() {
        t._close()
      }, t.st.removalDelay)) : t._close())
    },
    _close: function() {
      I(s);
      var i = v + " " + h + " ";
      if (t.bgOverlay.detach(), t.wrap.detach(), t.container.empty(), t.st.mainClass && (i += t.st.mainClass + " "), t._removeClassFromMFP(i), t.fixedContentPos) {
        var n = {
          marginRight: ""
        };
        t.isIE7 ? e("body, html").css("overflow", "") : n.overflow = "", e("html").css(n)
      }
      o.off("keyup" + g + " focusin" + g), t.ev.off(g), t.wrap.attr("class", "mfp-wrap").removeAttr("style"), t.bgOverlay.attr("class", "mfp-bg"), t.container.attr("class", "mfp-container"), !t.st.showCloseBtn || t.st.closeBtnInside && t.currTemplate[t.currItem.type] !== !0 || t.currTemplate.closeBtn && t.currTemplate.closeBtn.detach(), t.st.autoFocusLast && t._lastFocusedEl && e(t._lastFocusedEl).focus(), t.currItem = null, t.content = null, t.currTemplate = null, t.prevHeight = 0, I(c)
    },
    updateSize: function(e) {
      if (t.isIOS) {
        var i = document.documentElement.clientWidth / window.innerWidth,
          o = window.innerHeight * i;
        t.wrap.css("height", o), t.wH = o
      }
      else t.wH = e || C.height();
      t.fixedContentPos || t.wrap.css("height", t.wH), I("Resize")
    },
    updateItemHTML: function() {
      var i = t.items[t.index];
      t.contentContainer.detach(), t.content && t.content.detach(), i.parsed || (i = t.parseEl(t.index));
      var o = i.type;
      if (I("BeforeChange", [t.currItem ? t.currItem.type : "", o]), t.currItem = i, !t.currTemplate[o]) {
        var r = t.st[o] ? t.st[o].markup : !1;
        I("FirstMarkupParse", r), r ? t.currTemplate[o] = e(r) : t.currTemplate[o] = !0
      }
      n && n !== i.type && t.container.removeClass("mfp-" + n + "-holder");
      var a = t["get" + o.charAt(0).toUpperCase() + o.slice(1)](i, t.currTemplate[o]);
      t.appendContent(a, o), i.preloaded = !0, I(f, i), n = i.type, t.container.prepend(t.contentContainer), I("AfterChange")
    },
    appendContent: function(e, i) {
      t.content = e, e ? t.st.showCloseBtn && t.st.closeBtnInside && t.currTemplate[i] === !0 ? t.content.find(".mfp-close").length || t.content.append(_()) : t.content = e : t.content = "", I(d), t.container.addClass("mfp-" + i + "-holder"), t.contentContainer.append(t.content)
    },
    parseEl: function(i) {
      var o, n = t.items[i];
      if (n.tagName ? n = {
          el: e(n)
        } : (o = n.type, n = {
          data: n,
          src: n.src
        }), n.el) {
        for (var r = t.types, a = 0; a < r.length; a++)
          if (n.el.hasClass("mfp-" + r[a])) {
            o = r[a];
            break
          }
        n.src = n.el.attr("data-mfp-src"), n.src || (n.src = n.el.attr("href"))
      }
      return n.type = o || t.st.type || "inline", n.index = i, n.parsed = !0, t.items[i] = n, I("ElementParse", n), t.items[i]
    },
    addGroup: function(e, i) {
      var o = function(o) {
        o.mfpEl = this, t._openClick(o, e, i)
      };
      i || (i = {});
      var n = "click.magnificPopup";
      i.mainEl = e, i.items ? (i.isObj = !0, e.off(n).on(n, o)) : (i.isObj = !1, i.delegate ? e.off(n).on(n, i.delegate, o) : (i.items = e, e.off(n).on(n, o)))
    },
    _openClick: function(i, o, n) {
      var r = void 0 !== n.midClick ? n.midClick : e.magnificPopup.defaults.midClick;
      if (r || !(2 === i.which || i.ctrlKey || i.metaKey || i.altKey || i.shiftKey)) {
        var a = void 0 !== n.disableOn ? n.disableOn : e.magnificPopup.defaults.disableOn;
        if (a)
          if (e.isFunction(a)) {
            if (!a.call(t)) return !0
          }
          else if (C.width() < a) return !0;
        i.type && (i.preventDefault(), t.isOpen && i.stopPropagation()), n.el = e(i.mfpEl), n.delegate && (n.items = o.find(n.delegate)), t.open(n)
      }
    },
    updateStatus: function(e, o) {
      if (t.preloader) {
        i !== e && t.container.removeClass("mfp-s-" + i), o || "loading" !== e || (o = t.st.tLoading);
        var n = {
          status: e,
          text: o
        };
        I("UpdateStatus", n), e = n.status, o = n.text, t.preloader.html(o), t.preloader.find("a").on("click", function(e) {
          e.stopImmediatePropagation()
        }), t.container.addClass("mfp-s-" + e), i = e
      }
    },
    _checkIfClose: function(i) {
      if (!e(i).hasClass(y)) {
        var o = t.st.closeOnContentClick,
          n = t.st.closeOnBgClick;
        if (o && n) return !0;
        if (!t.content || e(i).hasClass("mfp-close") || t.preloader && i === t.preloader[0]) return !0;
        if (i === t.content[0] || e.contains(t.content[0], i)) {
          if (o) return !0
        }
        else if (n && e.contains(document, i)) return !0;
        return !1
      }
    },
    _addClassToMFP: function(e) {
      t.bgOverlay.addClass(e), t.wrap.addClass(e)
    },
    _removeClassFromMFP: function(e) {
      this.bgOverlay.removeClass(e), t.wrap.removeClass(e)
    },
    _hasScrollBar: function(e) {
      return (t.isIE7 ? o.height() : document.body.scrollHeight) > (e || C.height())
    },
    _setFocus: function() {
      (t.st.focus ? t.content.find(t.st.focus).eq(0) : t.wrap).focus()
    },
    _onFocusIn: function(i) {
      return i.target === t.wrap[0] || e.contains(t.wrap[0], i.target) ? void 0 : (t._setFocus(), !1)
    },
    _parseMarkup: function(t, i, o) {
      var n;
      o.data && (i = e.extend(o.data, i)), I(p, [t, i, o]), e.each(i, function(i, o) {
        if (void 0 === o || o === !1) return !0;
        if (n = i.split("_"), n.length > 1) {
          var r = t.find(g + "-" + n[0]);
          if (r.length > 0) {
            var a = n[1];
            "replaceWith" === a ? r[0] !== o[0] && r.replaceWith(o) : "img" === a ? r.is("img") ? r.attr("src", o) : r.replaceWith(e("<img>").attr("src", o).attr("class", r.attr("class"))) : r.attr(n[1], o)
          }
        }
        else t.find(g + "-" + i).html(o)
      })
    },
    _getScrollbarSize: function() {
      if (void 0 === t.scrollbarSize) {
        var e = document.createElement("div");
        e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), t.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)
      }
      return t.scrollbarSize
    }
  }, e.magnificPopup = {
    instance: null,
    proto: w.prototype,
    modules: [],
    open: function(t, i) {
      return T(), t = t ? e.extend(!0, {}, t) : {}, t.isObj = !0, t.index = i || 0, this.instance.open(t)
    },
    close: function() {
      return e.magnificPopup.instance && e.magnificPopup.instance.close()
    },
    registerModule: function(t, i) {
      i.options && (e.magnificPopup.defaults[t] = i.options), e.extend(this.proto, i.proto), this.modules.push(t)
    },
    defaults: {
      disableOn: 0,
      key: null,
      midClick: !1,
      mainClass: "",
      preloader: !0,
      focus: "",
      closeOnContentClick: !1,
      closeOnBgClick: !0,
      closeBtnInside: !0,
      showCloseBtn: !0,
      enableEscapeKey: !0,
      modal: !1,
      alignTop: !1,
      removalDelay: 0,
      prependTo: null,
      fixedContentPos: "auto",
      fixedBgPos: "auto",
      overflowY: "auto",
      closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
      tClose: "Close (Esc)",
      tLoading: "Loading...",
      autoFocusLast: !0
    }
  }, e.fn.magnificPopup = function(i) {
    T();
    var o = e(this);
    if ("string" == typeof i)
      if ("open" === i) {
        var n, r = b ? o.data("magnificPopup") : o[0].magnificPopup,
          a = parseInt(arguments[1], 10) || 0;
        r.items ? n = r.items[a] : (n = o, r.delegate && (n = n.find(r.delegate)), n = n.eq(a)), t._openClick({
          mfpEl: n
        }, o, r)
      }
      else t.isOpen && t[i].apply(t, Array.prototype.slice.call(arguments, 1));
    else i = e.extend(!0, {}, i), b ? o.data("magnificPopup", i) : o[0].magnificPopup = i, t.addGroup(o, i);
    return o
  };
  var P, O, E, L = "inline",
    z = function() {
      E && (O.after(E.addClass(P)).detach(), E = null)
    };
  e.magnificPopup.registerModule(L, {
    options: {
      hiddenClass: "hide",
      markup: "",
      tNotFound: "Content not found"
    },
    proto: {
      initInline: function() {
        t.types.push(L), k(s + "." + L, function() {
          z()
        })
      },
      getInline: function(i, o) {
        if (z(), i.src) {
          var n = t.st.inline,
            r = e(i.src);
          if (r.length) {
            var a = r[0].parentNode;
            a && a.tagName && (O || (P = n.hiddenClass, O = x(P), P = "mfp-" + P), E = r.after(O).detach().removeClass(P)), t.updateStatus("ready")
          }
          else t.updateStatus("error", n.tNotFound), r = e("<div>");
          return i.inlineElement = r, r
        }
        return t.updateStatus("ready"), t._parseMarkup(o, {}, i), o
      }
    }
  });
  var M, B = "ajax",
    F = function() {
      M && e(document.body).removeClass(M)
    },
    j = function() {
      F(), t.req && t.req.abort()
    };
  e.magnificPopup.registerModule(B, {
    options: {
      settings: null,
      cursor: "mfp-ajax-cur",
      tError: '<a href="%url%">The content</a> could not be loaded.'
    },
    proto: {
      initAjax: function() {
        t.types.push(B), M = t.st.ajax.cursor, k(s + "." + B, j), k("BeforeChange." + B, j)
      },
      getAjax: function(i) {
        M && e(document.body).addClass(M), t.updateStatus("loading");
        var o = e.extend({
          url: i.src,
          success: function(o, n, r) {
            var a = {
              data: o,
              xhr: r
            };
            I("ParseAjax", a), t.appendContent(e(a.data), B), i.finished = !0, F(), t._setFocus(), setTimeout(function() {
              t.wrap.addClass(h)
            }, 16), t.updateStatus("ready"), I("AjaxContentAdded")
          },
          error: function() {
            F(), i.finished = i.loadError = !0, t.updateStatus("error", t.st.ajax.tError.replace("%url%", i.src))
          }
        }, t.st.ajax.settings);
        return t.req = e.ajax(o), ""
      }
    }
  });
  var A, H = function(i) {
    if (i.data && void 0 !== i.data.title) return i.data.title;
    var o = t.st.image.titleSrc;
    if (o) {
      if (e.isFunction(o)) return o.call(t, i);
      if (i.el) return i.el.attr(o) || ""
    }
    return ""
  };
  e.magnificPopup.registerModule("image", {
    options: {
      markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
      cursor: "mfp-zoom-out-cur",
      titleSrc: "title",
      verticalFit: !0,
      tError: '<a href="%url%">The image</a> could not be loaded.'
    },
    proto: {
      initImage: function() {
        var i = t.st.image,
          o = ".image";
        t.types.push("image"), k(u + o, function() {
          "image" === t.currItem.type && i.cursor && e(document.body).addClass(i.cursor)
        }), k(s + o, function() {
          i.cursor && e(document.body).removeClass(i.cursor), C.off("resize" + g)
        }), k("Resize" + o, t.resizeImage), t.isLowIE && k("AfterChange", t.resizeImage)
      },
      resizeImage: function() {
        var e = t.currItem;
        if (e && e.img && t.st.image.verticalFit) {
          var i = 0;
          t.isLowIE && (i = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", t.wH - i)
        }
      },
      _onImageHasSize: function(e) {
        e.img && (e.hasSize = !0, A && clearInterval(A), e.isCheckingImgSize = !1, I("ImageHasSize", e), e.imgHidden && (t.content && t.content.removeClass("mfp-loading"), e.imgHidden = !1))
      },
      findImageSize: function(e) {
        var i = 0,
          o = e.img[0],
          n = function(r) {
            A && clearInterval(A), A = setInterval(function() {
              return o.naturalWidth > 0 ? void t._onImageHasSize(e) : (i > 200 && clearInterval(A), i++, void(3 === i ? n(10) : 40 === i ? n(50) : 100 === i && n(500)))
            }, r)
          };
        n(1)
      },
      getImage: function(i, o) {
        var n = 0,
          r = function() {
            i && (i.img[0].complete ? (i.img.off(".mfploader"), i === t.currItem && (t._onImageHasSize(i), t.updateStatus("ready")), i.hasSize = !0, i.loaded = !0, I("ImageLoadComplete")) : (n++, 200 > n ? setTimeout(r, 100) : a()))
          },
          a = function() {
            i && (i.img.off(".mfploader"), i === t.currItem && (t._onImageHasSize(i), t.updateStatus("error", s.tError.replace("%url%", i.src))), i.hasSize = !0, i.loaded = !0, i.loadError = !0)
          },
          s = t.st.image,
          l = o.find(".mfp-img");
        if (l.length) {
          var c = document.createElement("img");
          c.className = "mfp-img", i.el && i.el.find("img").length && (c.alt = i.el.find("img").attr("alt")), i.img = e(c).on("load.mfploader", r).on("error.mfploader", a), c.src = i.src, l.is("img") && (i.img = i.img.clone()), c = i.img[0], c.naturalWidth > 0 ? i.hasSize = !0 : c.width || (i.hasSize = !1)
        }
        return t._parseMarkup(o, {
          title: H(i),
          img_replaceWith: i.img
        }, i), t.resizeImage(), i.hasSize ? (A && clearInterval(A), i.loadError ? (o.addClass("mfp-loading"), t.updateStatus("error", s.tError.replace("%url%", i.src))) : (o.removeClass("mfp-loading"), t.updateStatus("ready")), o) : (t.updateStatus("loading"), i.loading = !0, i.hasSize || (i.imgHidden = !0, o.addClass("mfp-loading"), t.findImageSize(i)), o)
      }
    }
  });
  var N, $ = function() {
    return void 0 === N && (N = void 0 !== document.createElement("p").style.MozTransform), N
  };
  e.magnificPopup.registerModule("zoom", {
    options: {
      enabled: !1,
      easing: "ease-in-out",
      duration: 300,
      opener: function(e) {
        return e.is("img") ? e : e.find("img")
      }
    },
    proto: {
      initZoom: function() {
        var e, i = t.st.zoom,
          o = ".zoom";
        if (i.enabled && t.supportsTransition) {
          var n, r, a = i.duration,
            c = function(e) {
              var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                o = "all " + i.duration / 1e3 + "s " + i.easing,
                n = {
                  position: "fixed",
                  zIndex: 9999,
                  left: 0,
                  top: 0,
                  "-webkit-backface-visibility": "hidden"
                },
                r = "transition";
              return n["-webkit-" + r] = n["-moz-" + r] = n["-o-" + r] = n[r] = o, t.css(n), t
            },
            d = function() {
              t.content.css("visibility", "visible")
            };
          k("BuildControls" + o, function() {
            if (t._allowZoom()) {
              if (clearTimeout(n), t.content.css("visibility", "hidden"), e = t._getItemToZoom(), !e) return void d();
              r = c(e), r.css(t._getOffset()), t.wrap.append(r), n = setTimeout(function() {
                r.css(t._getOffset(!0)), n = setTimeout(function() {
                  d(), setTimeout(function() {
                    r.remove(), e = r = null, I("ZoomAnimationEnded")
                  }, 16)
                }, a)
              }, 16)
            }
          }), k(l + o, function() {
            if (t._allowZoom()) {
              if (clearTimeout(n), t.st.removalDelay = a, !e) {
                if (e = t._getItemToZoom(), !e) return;
                r = c(e)
              }
              r.css(t._getOffset(!0)), t.wrap.append(r), t.content.css("visibility", "hidden"), setTimeout(function() {
                r.css(t._getOffset())
              }, 16)
            }
          }), k(s + o, function() {
            t._allowZoom() && (d(), r && r.remove(), e = null)
          })
        }
      },
      _allowZoom: function() {
        return "image" === t.currItem.type
      },
      _getItemToZoom: function() {
        return t.currItem.hasSize ? t.currItem.img : !1
      },
      _getOffset: function(i) {
        var o;
        o = i ? t.currItem.img : t.st.zoom.opener(t.currItem.el || t.currItem);
        var n = o.offset(),
          r = parseInt(o.css("padding-top"), 10),
          a = parseInt(o.css("padding-bottom"), 10);
        n.top -= e(window).scrollTop() - r;
        var s = {
          width: o.width(),
          height: (b ? o.innerHeight() : o[0].offsetHeight) - a - r
        };
        return $() ? s["-moz-transform"] = s.transform = "translate(" + n.left + "px," + n.top + "px)" : (s.left = n.left, s.top = n.top), s
      }
    }
  });
  var W = "iframe",
    q = "//about:blank",
    Z = function(e) {
      if (t.currTemplate[W]) {
        var i = t.currTemplate[W].find("iframe");
        i.length && (e || (i[0].src = q), t.isIE8 && i.css("display", e ? "block" : "none"))
      }
    };
  e.magnificPopup.registerModule(W, {
    options: {
      markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
      srcAction: "iframe_src",
      patterns: {
        youtube: {
          index: "youtube.com",
          id: "v=",
          src: "//www.youtube.com/embed/%id%?autoplay=1"
        },
        vimeo: {
          index: "vimeo.com/",
          id: "/",
          src: "//player.vimeo.com/video/%id%?autoplay=1"
        },
        gmaps: {
          index: "//maps.google.",
          src: "%id%&output=embed"
        }
      }
    },
    proto: {
      initIframe: function() {
        t.types.push(W), k("BeforeChange", function(e, t, i) {
          t !== i && (t === W ? Z() : i === W && Z(!0))
        }), k(s + "." + W, function() {
          Z()
        })
      },
      getIframe: function(i, o) {
        var n = i.src,
          r = t.st.iframe;
        e.each(r.patterns, function() {
          return n.indexOf(this.index) > -1 ? (this.id && (n = "string" == typeof this.id ? n.substr(n.lastIndexOf(this.id) + this.id.length, n.length) : this.id.call(this, n)), n = this.src.replace("%id%", n), !1) : void 0
        });
        var a = {};
        return r.srcAction && (a[r.srcAction] = n), t._parseMarkup(o, a, i), t.updateStatus("ready"), o
      }
    }
  });
  var V = function(e) {
      var i = t.items.length;
      return e > i - 1 ? e - i : 0 > e ? i + e : e
    },
    D = function(e, t, i) {
      return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, i)
    };
  e.magnificPopup.registerModule("gallery", {
    options: {
      enabled: !1,
      arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
      preload: [0, 2],
      navigateByImgClick: !0,
      arrows: !0,
      tPrev: "Previous (Left arrow key)",
      tNext: "Next (Right arrow key)",
      tCounter: "%curr% of %total%"
    },
    proto: {
      initGallery: function() {
        var i = t.st.gallery,
          n = ".mfp-gallery";
        return t.direction = !0, i && i.enabled ? (r += " mfp-gallery", k(u + n, function() {
          i.navigateByImgClick && t.wrap.on("click" + n, ".mfp-img", function() {
            return t.items.length > 1 ? (t.next(), !1) : void 0
          }), o.on("keydown" + n, function(e) {
            37 === e.keyCode ? t.prev() : 39 === e.keyCode && t.next()
          })
        }), k("UpdateStatus" + n, function(e, i) {
          i.text && (i.text = D(i.text, t.currItem.index, t.items.length))
        }), k(p + n, function(e, o, n, r) {
          var a = t.items.length;
          n.counter = a > 1 ? D(i.tCounter, r.index, a) : ""
        }), k("BuildControls" + n, function() {
          if (t.items.length > 1 && i.arrows && !t.arrowLeft) {
            var o = i.arrowMarkup,
              n = t.arrowLeft = e(o.replace(/%title%/gi, i.tPrev).replace(/%dir%/gi, "left")).addClass(y),
              r = t.arrowRight = e(o.replace(/%title%/gi, i.tNext).replace(/%dir%/gi, "right")).addClass(y);
            n.click(function() {
              t.prev()
            }), r.click(function() {
              t.next()
            }), t.container.append(n.add(r))
          }
        }), k(f + n, function() {
          t._preloadTimeout && clearTimeout(t._preloadTimeout), t._preloadTimeout = setTimeout(function() {
            t.preloadNearbyImages(), t._preloadTimeout = null
          }, 16)
        }), void k(s + n, function() {
          o.off(n), t.wrap.off("click" + n), t.arrowRight = t.arrowLeft = null
        })) : !1
      },
      next: function() {
        t.direction = !0, t.index = V(t.index + 1), t.updateItemHTML()
      },
      prev: function() {
        t.direction = !1, t.index = V(t.index - 1), t.updateItemHTML()
      },
      goTo: function(e) {
        t.direction = e >= t.index, t.index = e, t.updateItemHTML()
      },
      preloadNearbyImages: function() {
        var e, i = t.st.gallery.preload,
          o = Math.min(i[0], t.items.length),
          n = Math.min(i[1], t.items.length);
        for (e = 1; e <= (t.direction ? n : o); e++) t._preloadItem(t.index + e);
        for (e = 1; e <= (t.direction ? o : n); e++) t._preloadItem(t.index - e)
      },
      _preloadItem: function(i) {
        if (i = V(i), !t.items[i].preloaded) {
          var o = t.items[i];
          o.parsed || (o = t.parseEl(i)), I("LazyLoad", o), "image" === o.type && (o.img = e('<img class="mfp-img" />').on("load.mfploader", function() {
            o.hasSize = !0
          }).on("error.mfploader", function() {
            o.hasSize = !0, o.loadError = !0, I("LazyLoadError", o)
          }).attr("src", o.src)), o.preloaded = !0
        }
      }
    }
  });
  var R = "retina";
  e.magnificPopup.registerModule(R, {
    options: {
      replaceSrc: function(e) {
        return e.src.replace(/\.\w+$/, function(e) {
          return "@2x" + e
        })
      },
      ratio: 1
    },
    proto: {
      initRetina: function() {
        if (window.devicePixelRatio > 1) {
          var e = t.st.retina,
            i = e.ratio;
          i = isNaN(i) ? i() : i, i > 1 && (k("ImageHasSize." + R, function(e, t) {
            t.img.css({
              "max-width": t.img[0].naturalWidth / i,
              width: "100%"
            })
          }), k("ElementParse." + R, function(t, o) {
            o.src = e.replaceSrc(o, i)
          }))
        }
      }
    }
  }), T()
});


! function(e) {
  e(document).ready(function() {
    e(".accordion__item").each(function() {
      var t = e(this),
        a = "collapsible-" + t.index();
      t.children(".accordion__button").attr("aria-controls", a), t.children(".accordion__description").attr("id", a)
    }), e(".accordion__button").bind("click", function() {
      var t = "false" === e(this).attr("aria-expanded");
      e(this).attr("aria-expanded", t), e(this).next(".accordion__description").attr("aria-hidden", !t)
    })
  })
}(jQuery),
function(e, t) {
  "use strict";
  t.behaviors.alertSignupForm = {
    attach: function(a, i) {
      function n() {
        var a = e(".alert-signup__message"),
          i = e(".alert-signup__form"),
          n = {};
        n.EMAIL = e("#st_EMAIL").val();
        var s = {};
        t.settings.dcomms_theme.alertHideName || (s.cu_FULL_NAME = e("#cu_FULL_NAME").val()), t.settings.dcomms_theme.alertHideNumber || (s.cu_CONTACT_NUMBER = e("#cu_CONTACT_NUMBER").val()), s.cu_DEPARTMENT_ID = e("#cu_DEPARTMENT_ID").val();
        var o = t.settings.dcomms_theme.alertMailGroup.split(","),
          r = "http://ssoalerts.e-newsletter.com.au";
        e.getJSON(r + "/scripts/subscribe/subscribe.php?callback=?", {
          st: n,
          cu: s,
          gr: o,
          method: "updategroups",
          format: "json"
        }, function(n) {
          switch (e(i).hide(), n.code) {
            case "000":
              e(a).addClass("messages--status").html(t.settings.dcomms_theme.alertSuccessMessage);
              break;
            case "101":
            case "102":
            case "103":
              e(a).addClass("messages--error").html(n.message);
              break;
            default:
              e(a).addClass("messages--error").html("Sorry it looks like that didn't work. Please try refreshing the page and subscribing again.")
          }
        })
      }
      e(".alert-signup__form").submit(function() {
        return n(), !1
      })
    }
  }
}(jQuery, Drupal),
function(e, t) {
  t.behaviors.detectFileExtension = {
    attach: function(a, i) {
      e(".js-file-extension .file a").each(function(a, i) {
        var n = "/" + t.settings.pathToTheme,
          s = n + "/images/icons/application-pdf.png",
          o = n + "/images/icons/x-office-document.png",
          r = n + "/images/icons/generic.png",
          c = i.textContent,
          l = c.substr(c.lastIndexOf(".") + 1);
        switch (l) {
          case "pdf":
            e(i).text("Download PDF"), e(i).prepend("<img class='file__icon' src='" + s + "' />");
            break;
          case "doc":
          case "docx":
            e(i).text("Download DOC"), e(i).prepend("<img class='file__icon' src='" + o + "' />");
            break;
          default:
            e(i).text("Download File"), e(i).prepend("<img class='file__icon' src='" + r + "' />")
        }
      })
    }
  }
}(jQuery, Drupal),
function(e, t) {
  "use strict";
  t.behaviors.placeholderFallback = {
    attach: function() {
      "placeholder" in document.createElement("input") && "placeholder" in document.createElement("textarea") || e("[placeholder]").focus(function() {
        var t = e(this);
        t.val() === t.attr("placeholder") && (t.val(""), t.removeClass("placeholder"))
      }).blur(function() {
        var t = e(this);
        "" !== t.val() && t.val() !== t.attr("placeholder") || (t.addClass("placeholder"), t.val(t.attr("placeholder")))
      }).blur().parents("form").submit(function() {
        e(this).find("[placeholder]").each(function() {
          var t = e(this);
          t.val() === t.attr("placeholder") && t.val("")
        })
      })
    }
  }, t.behaviors.formalSubmissionNotify = {
    attach: function() {
      try {
        var a = e("input[name='submitted[email_notification]']");
        a.length > 0 && e(a).each(function() {
          e(this).val(t.settings.dcomms_theme.formalSubmissionNotify)
        })
      }
      catch (i) {}
    }
  }, t.behaviors.searchPlaceholder = {
    attach: function() {
      var t = e(".filter--search input");
      t.length > 0 && e(t).attr("placeholder", "Enter search term...")
    }
  }
}(jQuery, Drupal),
function(e, t) {
  "use strict";
  t.behaviors.gridAtThree = {
    attach: function() {
      var t = e(".grid-stream--grid-at-three");
      t.length > 0 && (e(".grid-stream__item--landscape-small", t).each(function() {
        e(this).removeClass("grid-stream__item--landscape-small"), e(this).addClass("grid-stream__item--vertical")
      }), e(".grid-stream__item--landscape-small--has-image-description", t).each(function() {
        e(this).removeClass("grid-stream__item--landscape-small--has-image-description"), e(this).addClass("grid-stream__item--vertical--has-image-description")
      }), e(".grid-stream__item--landscape-small__right", t).each(function() {
        e(this).attr("class", "grid-stream__item--vertical__top")
      }), e(".grid-stream__item--landscape-small__left", t).each(function() {
        e(this).attr("class", "grid-stream__item--vertical__bottom")
      }))
    }
  }
}(jQuery, Drupal),
function(e, t) {
  "use strict";
  t.behaviors.searchToggle = {
    attach: function() {
      var t = e(".header-search__form"),
        a = e(".header-search__icon--link"),
        i = e(".header-search__input");
      e(a).attr("role", "button"), e(a).attr("aria-controls", "search-form"), e(a).attr("aria-expanded", "false");
      var n = function() {
          e(t).addClass("is-active"), e(this).attr("aria-expanded", "true"), setTimeout(function() {
            e(i).focus()
          }, 250)
        },
        s = function(i) {
          e(t).removeClass("is-active"), e(a).attr("aria-expanded", "false"), e(i).focus()
        };
      e(a).click(function() {
        return n(), !1
      }), e(".header-search__icon--button").click(function() {
        return e(i).val() ? void 0 : (s(a), !1)
      }), e(document).click(function(e) {
        t.hasClass("is-active") && 0 === t.has(e.target).length && s(a)
      }), e(i).focus(function() {
        t.hasClass("is-active") || n()
      }), e(t).keydown(function(t) {
        var a = t.keyCode || t.which;
        if (!e(i).val() && (9 == a || 27 == a)) {
          var n = e(".header-menu__menu a").first();
          s(n), t.preventDefault()
        }
      })
    }
  }
}(jQuery, Drupal),
function(e, t) {
  "use strict";
  t.behaviors.linkExternal = {
    attach: function() {
      e('[data-js*="external-links"] a').each(function() {
        var t = e(this),
          a = t.hasClass("link-external__no-icon"),
          i = t.children("img").length;
        !this.hostname || this.hostname === location.hostname || a || i || (t.hasClass("read-more") && !t.hasClass("external-link") ? (t.addClass("external-link").attr("target", "_blank"), t.find("svg").before('<svg name="external-link" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" preserveAspectRatio="xMidYMid meet"> <path d="M11.3 6.2c.2 0 .4-.2.4-.4V.7H6.6c-.2 0-.4.2-.4.4s.2.4.4.4h3.7L4.2 7.6c-.2.2-.2.4 0 .6.2.2.4.2.6 0l6.1-6.1v3.7c0 .2.1.4.4.4z"/><path d="M9.5 9c0-.2-.2-.4-.4-.4s-.5.2-.5.4v2.1H1.4V3.8h2.1c.2 0 .4-.2.4-.4S3.7 3 3.5 3H.6v8.9h8.9V9z"/></svg>')) : t.hasClass("external-link") || t.addClass("link-external").attr("target", "_blank"), e("body").hasClass("caretaker") && t.click(function(a) {
          a.preventDefault(), e.magnificPopup.open({
            items: {
              preloader: !0,
              src: "#external-link-popup-content",
              type: "inline"
            }
          }), e("#external-link-action-continue").attr("href", t.attr("href")), e("#external-link-action-continue").attr("target", t.attr("target"))
        })), e("body").hasClass("caretaker") && (e("#external-link-action-cancel").click(function(t) {
          t.preventDefault();
          var a;
          a = e.magnificPopup.instance, a.close()
        }), e("#external-link-action-continue").click(function(t) {
          var a;
          a = e.magnificPopup.instance, a.close()
        }))
      })
    }
  }
}(jQuery, Drupal),
function(e, t) {
  "use strict";
  t.behaviors.offscreenToggle = {
    attach: function() {
      var t = !1,
        a = e(".offscreen__toggle");
      e(a).attr("role", "button"), e(a).attr("aria-controls", "offscreen"), e(a).attr("aria-expanded", "false"), e(a).click(function() {
        return t === !1 ? (e(".offscreen").addClass("is-moved"), e(this).addClass("is-active"), e(this).attr("aria-expanded", "true")) : (e(".offscreen").removeClass("is-moved"), e(this).removeClass("is-active"), e(this).attr("aria-expanded", "false")), t = !t, !1
      })
    }
  }
}(jQuery, Drupal),
function(e, t) {
  t.behaviors.onThisPage = {
    attach: function(t, a) {
      var i = e(".on-this-page");
      if (i.length > 0) {
        var n = e('<ul class="on-this-page__menu"></ul>');
        n.length > 0 && (n = n.tableOfContents(e("[data-js*='on-this-page__content']"), {
          startLevel: 2,
          depth: 1,
          ignoreClass: "element-invisible"
        }), e("li", n).length > 1 ? (i.show(), e(i).html(n), i.prepend('<h5 class="on-this-page__title">On this page</h5>')) : i.hide())
      }
    }
  }, t.behaviors.onThisPageSticky = {
    attach: function(t, a) {
      function i() {
        window.matchMedia("(min-width: 750px)").matches && n.stick_in_parent({
          sticky_class: "on-this-page__sticky",
          parent: "[data-js*='on-this-page__content']"
        }), window.matchMedia("(max-width: 750px)").matches && n.trigger("sticky_kit:detach")
      }
      var n = e(".on-this-page__menu");
      i();
      var s = !1;
      e(window).resize(function() {
        s !== !1 && clearTimeout(s), s = setTimeout(i, 200)
      }), e("a[href*=#]:not([href=#])").bind("click", function() {
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") || location.hostname == this.hostname) {
          var t = e(this.hash),
            a = n.height() + 30;
          if (t = t.length ? t : e("[name=" + this.hash.slice(1) + "]"), t.length) return e("html,body").animate({
            scrollTop: t.offset().top - a
          }, 500), !1
        }
      })
    }
  }
}(jQuery, Drupal),
function(e, t) {
  "use strict";
  t.behaviors.pollButtons = {
    attach: function() {
      var t = e(".poll-form__choices .option, .poll-form__option label");
      t.length && e(".poll-form__choices .option, .poll-form__option label").bind("click", function() {
        var a = e(t).closest(".poll-form__choices"),
          i = e(this).parent();
        e("input", a).removeAttr("checked"), e(t).removeClass("is-active"), e("input", i).attr("checked", "checked"), e(this).addClass("is-active")
      })
    }
  }
}(jQuery, Drupal),
function(e, t) {
  "use strict";
  t.behaviors.responsiveVideos = {
    attach: function() {
      e('[data-js*="responsive-video"]').fitVids()
    }
  }
}(jQuery, Drupal),
function(e, t) {
  "use strict";
  t.behaviors.SiteFeedbackPopupClose = {
    attach: function(t, a) {
      e(".site-feedback-thanks").click(function() {
        e(".site-feedback-form").trigger("siteFeedbackPopupClose")
      }), e(document).delegate(".site-feedback-form", "siteFeedbackPopupClose", function() {
        function t() {
          e(".site-feedback-thanks-countdown").text(s), s -= 1, 0 >= s && clearInterval(o)
        }

        function a() {
          n.close()
        }

        function i() {
          a(), t(), n.open({
            items: {
              preloader: !0,
              src: "#site-feedback-form",
              type: "inline"
            }
          }), setTimeout(function() {
            n.close()
          }, 5e3)
        }
        var n = e.magnificPopup.instance,
          s = 5,
          o = setInterval(t, 1e3);
        i()
      })
    }
  }
}(jQuery, Drupal),
function() {
  var e, t, a;
  e = this.jQuery, a = this.document, t = this.Drupal, this.Drupal.behaviors.siteFeedback = {
    attach: function(t, a) {
      var i, n, s, o, r, c, l;
      null != a.sitePagesFeedback && null != a.sitePagesFeedback.nid && (i = {
        nid: null != (n = a.sitePagesFeedback.nid) ? n : null,
        sid: null,
        token: null,
        url: null != (s = a.currentPath) ? s : window.location.href,
        option: 0,
        update: !1
      }, l = function(e, t) {
        i[e] = t
      }, c = function() {
        e(".site-feedback-block__inner .main", t).fadeOut("slow", function() {
          e(".site-feedback-block__inner .message", t).fadeIn()
        })
      }, r = function() {
        e.magnificPopup.open({
          items: {
            preloader: !0,
            src: "#site-feedback-form",
            type: "inline"
          }
        })
      }, o = function() {
        var t;
        c(), null != i && null != i.nid && (t = location.protocol + "//" + location.host + a.basePath + a.pathToTheme + "/api/ajax/feedback/submit_simple.php", e.ajax(t, {
          type: "POST",
          data: i,
          success: function(t) {
            null != t && null != t.sid && 0 === i.option && (l("sid", t.sid), e("input[name~='submitted[site_feedback_page_url]']").val(i.url), e("input[name~='submitted[site_feedback_helpful]']").val(0).prop("checked", !0), e("input[name~='details[sid]']").val(t.sid), e("input[name~='site_feedback_sid']").val(t.sid), r())
          },
          error: function(e) {}
        }))
      }, e(".site-feedback-action", t).click(function(t) {
        var a, i;
        t.preventDefault(), a = null != (i = e(this).data("spf-option")) ? i : 0, l("option", a), o()
      }))
    }
  }
}.call(this),
  function(e, t, a, i, n) {
    t.behaviors.subsiteMenuToggle = {
      attach: function(t, a) {
        e(".subsite-header__button").attr({
          role: "button",
          "aria-controls": "subsite-naviagtion",
          "aria-expanded": "false",
          "aria-label": "subsite navigation menu"
        }), e(".subsite-header__button").bind("click", function() {
          e(this).next(".subsite-header__list").toggleClass("subsite-header__expanded"), "false" == e(this).attr("aria-expanded") ? e(this).attr("aria-expanded", "true") : e(this).attr("aria-expanded", "false"), e(this).toggleClass("subsite-header__button--expanded")
        })
      }
    }
  }(jQuery, Drupal, this, this.document),
  function(e) {
    "use strict";

    function t(t, a) {
      var i = [],
        n = "";
      a ? (a = e(a).parent().parent(), n = e(a).attr("id")) : (a = ".top-notification", e(a).each(function() {
        i.push(e(this).attr("id"))
      })), t === !0 && (localStorage.setItem(n, 1), e(a).hide()), jQuery.each(i, function(t, a) {
        var i = document.getElementById(a);
        1 != localStorage.getItem(a) ? e(i).show() : e(i).hide()
      })
    }
    e("document").ready(function() {
      if (e("html").hasClass("lt-ie9")) {
        var a = e(".top-notification").clone().prependTo(".offscreen__inner");
        e(a).addClass("top-notification--alert"), e(a).attr("id", "oldIE-alert"), e(".top-notification__content", a).html("Our website has been optimised for display on IE9 and above and it looks like you have an older version. This just means that some elements of this website will display or behave unexpectedly."), e(".top-notification__icon", a).remove()
      }
      t(), e(".top-notification__close").click(function() {
        t(!0, this)
      })
    })
  }(jQuery),
  function(e, t) {
    "use strict";
    t.behaviors.placeholderFallback = {
      attach: function() {
        var a = "/" + t.settings.pathToTheme + "/dist/css/components/twitter-stream/twitter-stream.css",
          i = {
            url: a
          };
        e.getScript("https://platform.twitter.com/widgets.js", function() {
          twttr.widgets.load(), new CustomizeTwitterWidget(i)
        })
      }
    }
  }(jQuery, Drupal);


(function($) {

  /**
   * This script transforms a set of fieldsets into a stack of horizontal
   * tabs. Another tab pane can be selected by clicking on the respective
   * tab.
   *
   * Each tab may have a summary which can be updated by another
   * script. For that to work, each fieldset has an associated
   * 'horizontalTabCallback' (with jQuery.data() attached to the fieldset),
   * which is called every time the user performs an update to a form
   * element inside the tab pane.
   */
  Drupal.behaviors.horizontalTabs = {
    attach: function(context) {
      $('.horizontal-tabs-panes', context).once('horizontal-tabs', function() {
        var focusID = $(':hidden.horizontal-tabs-active-tab', this).val();
        var tab_focus;

        // Check if there are some fieldsets that can be converted to horizontal-tabs
        var $fieldsets = $('> fieldset', this);
        if ($fieldsets.length === 0) {
          return;
        }

        // Create the tab column.
        var tab_list = $('<ul class="horizontal-tabs-list" role="tablist"></ul>');
        $(this).wrap('<div class="horizontal-tabs clearfix"></div>').before(tab_list);

        // Transform each fieldset into a tab.
        $fieldsets.each(function(i) {
          var horizontal_tab = new Drupal.horizontalTab({
            title: $('> legend', this).text(),
            fieldset: $(this)
          });
          horizontal_tab.item.addClass('horizontal-tab-button-' + i);
          horizontal_tab.fieldset.before(horizontal_tab.mobile);
          tab_list.append(horizontal_tab.item);
          $(this)
            .removeClass('collapsible collapsed')
            .addClass('horizontal-tabs-pane')
            .data('horizontalTab', horizontal_tab);
          if (this.id == focusID) {
            tab_focus = $(this);
          }

        });

        $('> li:first', tab_list).addClass('first');
        $('> li:last', tab_list).addClass('last');

        if (!tab_focus) {
          // If the current URL has a fragment and one of the tabs contains an
          // element that matches the URL fragment, activate that tab.
          var hash = window.location.hash.replace(/[=%;,\/]/g, "");
          if (hash !== '#' && $(hash, this).length) {
            tab_focus = $(window.location.hash, this).closest('.horizontal-tabs-pane');
          }
          else {
            tab_focus = $('> .horizontal-tabs-pane:first', this);
          }
        }
        if (tab_focus.length) {
          tab_focus.data('horizontalTab').focus();
        }
      });
    }
  };

  /**
   * The horizontal tab object represents a single tab within a tab group.
   *
   * @param settings
   *   An object with the following keys:
   *   - title: The name of the tab.
   *   - fieldset: The jQuery object of the fieldset that is the tab pane.
   */
  Drupal.horizontalTab = function(settings) {
    var self = this;
    $.extend(this, settings, Drupal.theme('horizontalTab', settings));

    this.link.click(function() {
      self.focus();
      return false;
    });
    this.mobile.click(function() {
      self.focus();
      tab_top = self.mobile.offset().top - 20;
      $('html, body').animate({
        scrollTop: tab_top
      }, 500);
      return false;
    });

    // Keyboard events added:
    // Pressing the Enter key will open the tab pane.
    this.link.keydown(function(event) {
      if (event.keyCode == 13) {
        self.focus();
        // Set focus on the first input field of the visible fieldset/tab pane.
        $("fieldset.horizontal-tabs-pane :input:visible:enabled:first").focus();
        return false;
      }
    });
    this.mobile.keydown(function(event) {
      if (event.keyCode == 13) {
        self.focus();
        tab_top = self.mobile.offset().top - 20;
        $('html, body').animate({
          scrollTop: tab_top
        }, 500);
        // Set focus on the first input field of the visible fieldset/tab pane.
        $("fieldset.horizontal-tabs-pane :input:visible:enabled:first").focus();
        return false;
      }
    });

    // Only bind update summary on forms.
    if (this.fieldset.drupalGetSummary) {
      this.fieldset.bind('summaryUpdated', function() {
        self.updateSummary();
      }).trigger('summaryUpdated');
    }

  };

  Drupal.horizontalTab.prototype = {
    /**
     * Displays the tab's content pane.
     */
    focus: function() {
      this.fieldset
        .removeClass('horizontal-tab-hidden')
        .siblings('fieldset.horizontal-tabs-pane')
        .each(function() {
          var tab = $(this).data('horizontalTab');
          tab.fieldset.addClass('horizontal-tab-hidden');
          tab.item.removeClass('selected');
          tab.mobile.removeClass('selected');
        })
        .end()
        .siblings(':hidden.horizontal-tabs-active-tab')
        .val(this.fieldset.attr('id'));
      this.item.addClass('selected');
      this.mobile.addClass('selected');
      // Mark the active tab for screen readers.
      $('#active-horizontal-tab').remove();
      this.link.append('<span id="active-horizontal-tab" class="element-invisible" aria-selected="true">' + Drupal.t('(active tab)') + '</span>');
    },

    /**
     * Updates the tab's summary.
     */
    updateSummary: function() {
      this.summary.html(this.fieldset.drupalGetSummary());
    },

    /**
     * Shows a horizontal tab pane.
     */
    tabShow: function() {
      // Display the tab.
      this.item.removeClass('horizontal-tab-hidden');
      // Update .first marker for items. We need recurse from parent to retain the
      // actual DOM element order as jQuery implements sortOrder, but not as public
      // method.
      this.item.parent().children('.horizontal-tab-button').removeClass('first')
        .filter(':visible:first').addClass('first');
      // Display the fieldset.
      this.fieldset.removeClass('horizontal-tab-hidden');
      // Focus this tab.
      this.focus();
      return this;
    },

    /**
     * Hides a horizontal tab pane.
     */
    tabHide: function() {
      // Hide this tab.
      this.item.addClass('horizontal-tab-hidden');
      // Update .first marker for items. We need recurse from parent to retain the
      // actual DOM element order as jQuery implements sortOrder, but not as public
      // method.
      this.item.parent().children('.horizontal-tab-button').removeClass('first')
        .filter(':visible:first').addClass('first');
      // Hide the fieldset.
      this.fieldset.addClass('horizontal-tab-hidden');
      // Focus the first visible tab (if there is one).
      var $firstTab = this.fieldset.siblings('.horizontal-tabs-pane:not(.horizontal-tab-hidden):first');
      if ($firstTab.length) {
        $firstTab.data('horizontalTab').focus();
      }
      return this;
    }
  };

  /**
   * Theme function for a horizontal tab.
   *
   * @param settings
   *   An object with the following keys:
   *   - title: The name of the tab.
   * @return
   *   This function has to return an object with at least these keys:
   *   - item: The root tab jQuery element
   *   - link: The anchor tag that acts as the clickable area of the tab
   *       (jQuery version)
   *   - summary: The jQuery element that contains the tab summary
   */
  Drupal.theme.prototype.horizontalTab = function(settings) {
    var tab = {};
    var idAttr = settings.fieldset.attr('id');

    tab.item = $('<li class="horizontal-tab-button" role="tab" tabindex="-1"></li>')
      .append(tab.link = $('<a href="#' + idAttr + '"></a>')
        .append(tab.title = $('<strong></strong>').text(settings.title))
      );

    // No need to add summary on frontend.
    if (settings.fieldset.drupalGetSummary) {
      tab.link.append(tab.summary = $('<span class="summary"></span>'));
    }

    tab.mobile = $('<a href="#' + idAttr + '" class="tabber__mobile-item">' + settings.title + '</a>');

    return tab;
  };

})(jQuery);


/*! jQuery v1.11.3 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */ ! function(a, b) {
  "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
    if (!a.document) throw new Error("jQuery requires a window with a document");
    return b(a)
  } : b(a)
}("undefined" != typeof window ? window : this, function(a, b) {
  var c = [],
    d = c.slice,
    e = c.concat,
    f = c.push,
    g = c.indexOf,
    h = {},
    i = h.toString,
    j = h.hasOwnProperty,
    k = {},
    l = "1.11.3",
    m = function(a, b) {
      return new m.fn.init(a, b)
    },
    n = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    o = /^-ms-/,
    p = /-([\da-z])/gi,
    q = function(a, b) {
      return b.toUpperCase()
    };
  m.fn = m.prototype = {
    jquery: l,
    constructor: m,
    selector: "",
    length: 0,
    toArray: function() {
      return d.call(this)
    },
    get: function(a) {
      return null != a ? 0 > a ? this[a + this.length] : this[a] : d.call(this)
    },
    pushStack: function(a) {
      var b = m.merge(this.constructor(), a);
      return b.prevObject = this, b.context = this.context, b
    },
    each: function(a, b) {
      return m.each(this, a, b)
    },
    map: function(a) {
      return this.pushStack(m.map(this, function(b, c) {
        return a.call(b, c, b)
      }))
    },
    slice: function() {
      return this.pushStack(d.apply(this, arguments))
    },
    first: function() {
      return this.eq(0)
    },
    last: function() {
      return this.eq(-1)
    },
    eq: function(a) {
      var b = this.length,
        c = +a + (0 > a ? b : 0);
      return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
    },
    end: function() {
      return this.prevObject || this.constructor(null)
    },
    push: f,
    sort: c.sort,
    splice: c.splice
  }, m.extend = m.fn.extend = function() {
    var a, b, c, d, e, f, g = arguments[0] || {},
      h = 1,
      i = arguments.length,
      j = !1;
    for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || m.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
      if (null != (e = arguments[h]))
        for (d in e) a = g[d], c = e[d], g !== c && (j && c && (m.isPlainObject(c) || (b = m.isArray(c))) ? (b ? (b = !1, f = a && m.isArray(a) ? a : []) : f = a && m.isPlainObject(a) ? a : {}, g[d] = m.extend(j, f, c)) : void 0 !== c && (g[d] = c));
    return g
  }, m.extend({
    expando: "jQuery" + (l + Math.random()).replace(/\D/g, ""),
    isReady: !0,
    error: function(a) {
      throw new Error(a)
    },
    noop: function() {},
    isFunction: function(a) {
      return "function" === m.type(a)
    },
    isArray: Array.isArray || function(a) {
      return "array" === m.type(a)
    },
    isWindow: function(a) {
      return null != a && a == a.window
    },
    isNumeric: function(a) {
      return !m.isArray(a) && a - parseFloat(a) + 1 >= 0
    },
    isEmptyObject: function(a) {
      var b;
      for (b in a) return !1;
      return !0
    },
    isPlainObject: function(a) {
      var b;
      if (!a || "object" !== m.type(a) || a.nodeType || m.isWindow(a)) return !1;
      try {
        if (a.constructor && !j.call(a, "constructor") && !j.call(a.constructor.prototype, "isPrototypeOf")) return !1
      }
      catch (c) {
        return !1
      }
      if (k.ownLast)
        for (b in a) return j.call(a, b);
      for (b in a);
      return void 0 === b || j.call(a, b)
    },
    type: function(a) {
      return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? h[i.call(a)] || "object" : typeof a
    },
    globalEval: function(b) {
      b && m.trim(b) && (a.execScript || function(b) {
        a.eval.call(a, b)
      })(b)
    },
    camelCase: function(a) {
      return a.replace(o, "ms-").replace(p, q)
    },
    nodeName: function(a, b) {
      return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
    },
    each: function(a, b, c) {
      var d, e = 0,
        f = a.length,
        g = r(a);
      if (c) {
        if (g) {
          for (; f > e; e++)
            if (d = b.apply(a[e], c), d === !1) break
        }
        else
          for (e in a)
            if (d = b.apply(a[e], c), d === !1) break
      }
      else if (g) {
        for (; f > e; e++)
          if (d = b.call(a[e], e, a[e]), d === !1) break
      }
      else
        for (e in a)
          if (d = b.call(a[e], e, a[e]), d === !1) break; return a
    },
    trim: function(a) {
      return null == a ? "" : (a + "").replace(n, "")
    },
    makeArray: function(a, b) {
      var c = b || [];
      return null != a && (r(Object(a)) ? m.merge(c, "string" == typeof a ? [a] : a) : f.call(c, a)), c
    },
    inArray: function(a, b, c) {
      var d;
      if (b) {
        if (g) return g.call(b, a, c);
        for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)
          if (c in b && b[c] === a) return c
      }
      return -1
    },
    merge: function(a, b) {
      var c = +b.length,
        d = 0,
        e = a.length;
      while (c > d) a[e++] = b[d++];
      if (c !== c)
        while (void 0 !== b[d]) a[e++] = b[d++];
      return a.length = e, a
    },
    grep: function(a, b, c) {
      for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
      return e
    },
    map: function(a, b, c) {
      var d, f = 0,
        g = a.length,
        h = r(a),
        i = [];
      if (h)
        for (; g > f; f++) d = b(a[f], f, c), null != d && i.push(d);
      else
        for (f in a) d = b(a[f], f, c), null != d && i.push(d);
      return e.apply([], i)
    },
    guid: 1,
    proxy: function(a, b) {
      var c, e, f;
      return "string" == typeof b && (f = a[b], b = a, a = f), m.isFunction(a) ? (c = d.call(arguments, 2), e = function() {
        return a.apply(b || this, c.concat(d.call(arguments)))
      }, e.guid = a.guid = a.guid || m.guid++, e) : void 0
    },
    now: function() {
      return +new Date
    },
    support: k
  }), m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
    h["[object " + b + "]"] = b.toLowerCase()
  });

  function r(a) {
    var b = "length" in a && a.length,
      c = m.type(a);
    return "function" === c || m.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
  }
  var s = function(a) {
    var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = "sizzle" + 1 * new Date,
      v = a.document,
      w = 0,
      x = 0,
      y = ha(),
      z = ha(),
      A = ha(),
      B = function(a, b) {
        return a === b && (l = !0), 0
      },
      C = 1 << 31,
      D = {}.hasOwnProperty,
      E = [],
      F = E.pop,
      G = E.push,
      H = E.push,
      I = E.slice,
      J = function(a, b) {
        for (var c = 0, d = a.length; d > c; c++)
          if (a[c] === b) return c;
        return -1
      },
      K = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      L = "[\\x20\\t\\r\\n\\f]",
      M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
      N = M.replace("w", "w#"),
      O = "\\[" + L + "*(" + M + ")(?:" + L + "*([*^$|!~]?=)" + L + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + N + "))|)" + L + "*\\]",
      P = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + O + ")*)|.*)\\)|)",
      Q = new RegExp(L + "+", "g"),
      R = new RegExp("^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$", "g"),
      S = new RegExp("^" + L + "*," + L + "*"),
      T = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"),
      U = new RegExp("=" + L + "*([^\\]'\"]*?)" + L + "*\\]", "g"),
      V = new RegExp(P),
      W = new RegExp("^" + N + "$"),
      X = {
        ID: new RegExp("^#(" + M + ")"),
        CLASS: new RegExp("^\\.(" + M + ")"),
        TAG: new RegExp("^(" + M.replace("w", "w*") + ")"),
        ATTR: new RegExp("^" + O),
        PSEUDO: new RegExp("^" + P),
        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + L + "*(even|odd|(([+-]|)(\\d*)n|)" + L + "*(?:([+-]|)" + L + "*(\\d+)|))" + L + "*\\)|)", "i"),
        bool: new RegExp("^(?:" + K + ")$", "i"),
        needsContext: new RegExp("^" + L + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + L + "*((?:-\\d)?\\d*)" + L + "*\\)|)(?=[^-]|$)", "i")
      },
      Y = /^(?:input|select|textarea|button)$/i,
      Z = /^h\d$/i,
      $ = /^[^{]+\{\s*\[native \w/,
      _ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      aa = /[+~]/,
      ba = /'|\\/g,
      ca = new RegExp("\\\\([\\da-f]{1,6}" + L + "?|(" + L + ")|.)", "ig"),
      da = function(a, b, c) {
        var d = "0x" + b - 65536;
        return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
      },
      ea = function() {
        m()
      };
    try {
      H.apply(E = I.call(v.childNodes), v.childNodes), E[v.childNodes.length].nodeType
    }
    catch (fa) {
      H = {
        apply: E.length ? function(a, b) {
          G.apply(a, I.call(b))
        } : function(a, b) {
          var c = a.length,
            d = 0;
          while (a[c++] = b[d++]);
          a.length = c - 1
        }
      }
    }

    function ga(a, b, d, e) {
      var f, h, j, k, l, o, r, s, w, x;
      if ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, d = d || [], k = b.nodeType, "string" != typeof a || !a || 1 !== k && 9 !== k && 11 !== k) return d;
      if (!e && p) {
        if (11 !== k && (f = _.exec(a)))
          if (j = f[1]) {
            if (9 === k) {
              if (h = b.getElementById(j), !h || !h.parentNode) return d;
              if (h.id === j) return d.push(h), d
            }
            else if (b.ownerDocument && (h = b.ownerDocument.getElementById(j)) && t(b, h) && h.id === j) return d.push(h), d
          }
          else {
            if (f[2]) return H.apply(d, b.getElementsByTagName(a)), d;
            if ((j = f[3]) && c.getElementsByClassName) return H.apply(d, b.getElementsByClassName(j)), d
          }
        if (c.qsa && (!q || !q.test(a))) {
          if (s = r = u, w = b, x = 1 !== k && a, 1 === k && "object" !== b.nodeName.toLowerCase()) {
            o = g(a), (r = b.getAttribute("id")) ? s = r.replace(ba, "\\$&") : b.setAttribute("id", s), s = "[id='" + s + "'] ", l = o.length;
            while (l--) o[l] = s + ra(o[l]);
            w = aa.test(a) && pa(b.parentNode) || b, x = o.join(",")
          }
          if (x) try {
            return H.apply(d, w.querySelectorAll(x)), d
          }
          catch (y) {}
          finally {
            r || b.removeAttribute("id")
          }
        }
      }
      return i(a.replace(R, "$1"), b, d, e)
    }

    function ha() {
      var a = [];

      function b(c, e) {
        return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e
      }
      return b
    }

    function ia(a) {
      return a[u] = !0, a
    }

    function ja(a) {
      var b = n.createElement("div");
      try {
        return !!a(b)
      }
      catch (c) {
        return !1
      }
      finally {
        b.parentNode && b.parentNode.removeChild(b), b = null
      }
    }

    function ka(a, b) {
      var c = a.split("|"),
        e = a.length;
      while (e--) d.attrHandle[c[e]] = b
    }

    function la(a, b) {
      var c = b && a,
        d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || C) - (~a.sourceIndex || C);
      if (d) return d;
      if (c)
        while (c = c.nextSibling)
          if (c === b) return -1;
      return a ? 1 : -1
    }

    function ma(a) {
      return function(b) {
        var c = b.nodeName.toLowerCase();
        return "input" === c && b.type === a
      }
    }

    function na(a) {
      return function(b) {
        var c = b.nodeName.toLowerCase();
        return ("input" === c || "button" === c) && b.type === a
      }
    }

    function oa(a) {
      return ia(function(b) {
        return b = +b, ia(function(c, d) {
          var e, f = a([], c.length, b),
            g = f.length;
          while (g--) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
        })
      })
    }

    function pa(a) {
      return a && "undefined" != typeof a.getElementsByTagName && a
    }
    c = ga.support = {}, f = ga.isXML = function(a) {
      var b = a && (a.ownerDocument || a).documentElement;
      return b ? "HTML" !== b.nodeName : !1
    }, m = ga.setDocument = function(a) {
      var b, e, g = a ? a.ownerDocument || a : v;
      return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = g.documentElement, e = g.defaultView, e && e !== e.top && (e.addEventListener ? e.addEventListener("unload", ea, !1) : e.attachEvent && e.attachEvent("onunload", ea)), p = !f(g), c.attributes = ja(function(a) {
        return a.className = "i", !a.getAttribute("className")
      }), c.getElementsByTagName = ja(function(a) {
        return a.appendChild(g.createComment("")), !a.getElementsByTagName("*").length
      }), c.getElementsByClassName = $.test(g.getElementsByClassName), c.getById = ja(function(a) {
        return o.appendChild(a).id = u, !g.getElementsByName || !g.getElementsByName(u).length
      }), c.getById ? (d.find.ID = function(a, b) {
        if ("undefined" != typeof b.getElementById && p) {
          var c = b.getElementById(a);
          return c && c.parentNode ? [c] : []
        }
      }, d.filter.ID = function(a) {
        var b = a.replace(ca, da);
        return function(a) {
          return a.getAttribute("id") === b
        }
      }) : (delete d.find.ID, d.filter.ID = function(a) {
        var b = a.replace(ca, da);
        return function(a) {
          var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
          return c && c.value === b
        }
      }), d.find.TAG = c.getElementsByTagName ? function(a, b) {
        return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0
      } : function(a, b) {
        var c, d = [],
          e = 0,
          f = b.getElementsByTagName(a);
        if ("*" === a) {
          while (c = f[e++]) 1 === c.nodeType && d.push(c);
          return d
        }
        return f
      }, d.find.CLASS = c.getElementsByClassName && function(a, b) {
        return p ? b.getElementsByClassName(a) : void 0
      }, r = [], q = [], (c.qsa = $.test(g.querySelectorAll)) && (ja(function(a) {
        o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\f]' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + L + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + L + "*(?:value|" + K + ")"), a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="), a.querySelectorAll(":checked").length || q.push(":checked"), a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]")
      }), ja(function(a) {
        var b = g.createElement("input");
        b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + L + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:")
      })), (c.matchesSelector = $.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ja(function(a) {
        c.disconnectedMatch = s.call(a, "div"), s.call(a, "[s!='']:x"), r.push("!=", P)
      }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = $.test(o.compareDocumentPosition), t = b || $.test(o.contains) ? function(a, b) {
        var c = 9 === a.nodeType ? a.documentElement : a,
          d = b && b.parentNode;
        return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
      } : function(a, b) {
        if (b)
          while (b = b.parentNode)
            if (b === a) return !0;
        return !1
      }, B = b ? function(a, b) {
        if (a === b) return l = !0, 0;
        var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
        return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === g || a.ownerDocument === v && t(v, a) ? -1 : b === g || b.ownerDocument === v && t(v, b) ? 1 : k ? J(k, a) - J(k, b) : 0 : 4 & d ? -1 : 1)
      } : function(a, b) {
        if (a === b) return l = !0, 0;
        var c, d = 0,
          e = a.parentNode,
          f = b.parentNode,
          h = [a],
          i = [b];
        if (!e || !f) return a === g ? -1 : b === g ? 1 : e ? -1 : f ? 1 : k ? J(k, a) - J(k, b) : 0;
        if (e === f) return la(a, b);
        c = a;
        while (c = c.parentNode) h.unshift(c);
        c = b;
        while (c = c.parentNode) i.unshift(c);
        while (h[d] === i[d]) d++;
        return d ? la(h[d], i[d]) : h[d] === v ? -1 : i[d] === v ? 1 : 0
      }, g) : n
    }, ga.matches = function(a, b) {
      return ga(a, null, null, b)
    }, ga.matchesSelector = function(a, b) {
      if ((a.ownerDocument || a) !== n && m(a), b = b.replace(U, "='$1']"), !(!c.matchesSelector || !p || r && r.test(b) || q && q.test(b))) try {
        var d = s.call(a, b);
        if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
      }
      catch (e) {}
      return ga(b, n, null, [a]).length > 0
    }, ga.contains = function(a, b) {
      return (a.ownerDocument || a) !== n && m(a), t(a, b)
    }, ga.attr = function(a, b) {
      (a.ownerDocument || a) !== n && m(a);
      var e = d.attrHandle[b.toLowerCase()],
        f = e && D.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
      return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null
    }, ga.error = function(a) {
      throw new Error("Syntax error, unrecognized expression: " + a)
    }, ga.uniqueSort = function(a) {
      var b, d = [],
        e = 0,
        f = 0;
      if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
        while (b = a[f++]) b === a[f] && (e = d.push(f));
        while (e--) a.splice(d[e], 1)
      }
      return k = null, a
    }, e = ga.getText = function(a) {
      var b, c = "",
        d = 0,
        f = a.nodeType;
      if (f) {
        if (1 === f || 9 === f || 11 === f) {
          if ("string" == typeof a.textContent) return a.textContent;
          for (a = a.firstChild; a; a = a.nextSibling) c += e(a)
        }
        else if (3 === f || 4 === f) return a.nodeValue
      }
      else
        while (b = a[d++]) c += e(b);
      return c
    }, d = ga.selectors = {
      cacheLength: 50,
      createPseudo: ia,
      match: X,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: !0
        },
        " ": {
          dir: "parentNode"
        },
        "+": {
          dir: "previousSibling",
          first: !0
        },
        "~": {
          dir: "previousSibling"
        }
      },
      preFilter: {
        ATTR: function(a) {
          return a[1] = a[1].replace(ca, da), a[3] = (a[3] || a[4] || a[5] || "").replace(ca, da), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
        },
        CHILD: function(a) {
          return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || ga.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && ga.error(a[0]), a
        },
        PSEUDO: function(a) {
          var b, c = !a[6] && a[2];
          return X.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && V.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
        }
      },
      filter: {
        TAG: function(a) {
          var b = a.replace(ca, da).toLowerCase();
          return "*" === a ? function() {
            return !0
          } : function(a) {
            return a.nodeName && a.nodeName.toLowerCase() === b
          }
        },
        CLASS: function(a) {
          var b = y[a + " "];
          return b || (b = new RegExp("(^|" + L + ")" + a + "(" + L + "|$)")) && y(a, function(a) {
            return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "")
          })
        },
        ATTR: function(a, b, c) {
          return function(d) {
            var e = ga.attr(d, a);
            return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(Q, " ") + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0
          }
        },
        CHILD: function(a, b, c, d, e) {
          var f = "nth" !== a.slice(0, 3),
            g = "last" !== a.slice(-4),
            h = "of-type" === b;
          return 1 === d && 0 === e ? function(a) {
            return !!a.parentNode
          } : function(b, c, i) {
            var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
              q = b.parentNode,
              r = h && b.nodeName.toLowerCase(),
              s = !i && !h;
            if (q) {
              if (f) {
                while (p) {
                  l = b;
                  while (l = l[p])
                    if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                  o = p = "only" === a && !o && "nextSibling"
                }
                return !0
              }
              if (o = [g ? q.firstChild : q.lastChild], g && s) {
                k = q[u] || (q[u] = {}), j = k[a] || [], n = j[0] === w && j[1], m = j[0] === w && j[2], l = n && q.childNodes[n];
                while (l = ++n && l && l[p] || (m = n = 0) || o.pop())
                  if (1 === l.nodeType && ++m && l === b) {
                    k[a] = [w, n, m];
                    break
                  }
              }
              else if (s && (j = (b[u] || (b[u] = {}))[a]) && j[0] === w) m = j[1];
              else
                while (l = ++n && l && l[p] || (m = n = 0) || o.pop())
                  if ((h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) && ++m && (s && ((l[u] || (l[u] = {}))[a] = [w, m]), l === b)) break; return m -= e, m === d || m % d === 0 && m / d >= 0
            }
          }
        },
        PSEUDO: function(a, b) {
          var c, e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || ga.error("unsupported pseudo: " + a);
          return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ia(function(a, c) {
            var d, f = e(a, b),
              g = f.length;
            while (g--) d = J(a, f[g]), a[d] = !(c[d] = f[g])
          }) : function(a) {
            return e(a, 0, c)
          }) : e
        }
      },
      pseudos: {
        not: ia(function(a) {
          var b = [],
            c = [],
            d = h(a.replace(R, "$1"));
          return d[u] ? ia(function(a, b, c, e) {
            var f, g = d(a, null, e, []),
              h = a.length;
            while (h--)(f = g[h]) && (a[h] = !(b[h] = f))
          }) : function(a, e, f) {
            return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop()
          }
        }),
        has: ia(function(a) {
          return function(b) {
            return ga(a, b).length > 0
          }
        }),
        contains: ia(function(a) {
          return a = a.replace(ca, da),
            function(b) {
              return (b.textContent || b.innerText || e(b)).indexOf(a) > -1
            }
        }),
        lang: ia(function(a) {
          return W.test(a || "") || ga.error("unsupported lang: " + a), a = a.replace(ca, da).toLowerCase(),
            function(b) {
              var c;
              do
                if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
              while ((b = b.parentNode) && 1 === b.nodeType);
              return !1
            }
        }),
        target: function(b) {
          var c = a.location && a.location.hash;
          return c && c.slice(1) === b.id
        },
        root: function(a) {
          return a === o
        },
        focus: function(a) {
          return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
        },
        enabled: function(a) {
          return a.disabled === !1
        },
        disabled: function(a) {
          return a.disabled === !0
        },
        checked: function(a) {
          var b = a.nodeName.toLowerCase();
          return "input" === b && !!a.checked || "option" === b && !!a.selected
        },
        selected: function(a) {
          return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
        },
        empty: function(a) {
          for (a = a.firstChild; a; a = a.nextSibling)
            if (a.nodeType < 6) return !1;
          return !0
        },
        parent: function(a) {
          return !d.pseudos.empty(a)
        },
        header: function(a) {
          return Z.test(a.nodeName)
        },
        input: function(a) {
          return Y.test(a.nodeName)
        },
        button: function(a) {
          var b = a.nodeName.toLowerCase();
          return "input" === b && "button" === a.type || "button" === b
        },
        text: function(a) {
          var b;
          return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
        },
        first: oa(function() {
          return [0]
        }),
        last: oa(function(a, b) {
          return [b - 1]
        }),
        eq: oa(function(a, b, c) {
          return [0 > c ? c + b : c]
        }),
        even: oa(function(a, b) {
          for (var c = 0; b > c; c += 2) a.push(c);
          return a
        }),
        odd: oa(function(a, b) {
          for (var c = 1; b > c; c += 2) a.push(c);
          return a
        }),
        lt: oa(function(a, b, c) {
          for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
          return a
        }),
        gt: oa(function(a, b, c) {
          for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);
          return a
        })
      }
    }, d.pseudos.nth = d.pseudos.eq;
    for (b in {
        radio: !0,
        checkbox: !0,
        file: !0,
        password: !0,
        image: !0
      }) d.pseudos[b] = ma(b);
    for (b in {
        submit: !0,
        reset: !0
      }) d.pseudos[b] = na(b);

    function qa() {}
    qa.prototype = d.filters = d.pseudos, d.setFilters = new qa, g = ga.tokenize = function(a, b) {
      var c, e, f, g, h, i, j, k = z[a + " "];
      if (k) return b ? 0 : k.slice(0);
      h = a, i = [], j = d.preFilter;
      while (h) {
        (!c || (e = S.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = T.exec(h)) && (c = e.shift(), f.push({
          value: c,
          type: e[0].replace(R, " ")
        }), h = h.slice(c.length));
        for (g in d.filter) !(e = X[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({
          value: c,
          type: g,
          matches: e
        }), h = h.slice(c.length));
        if (!c) break
      }
      return b ? h.length : h ? ga.error(a) : z(a, i).slice(0)
    };

    function ra(a) {
      for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
      return d
    }

    function sa(a, b, c) {
      var d = b.dir,
        e = c && "parentNode" === d,
        f = x++;
      return b.first ? function(b, c, f) {
        while (b = b[d])
          if (1 === b.nodeType || e) return a(b, c, f)
      } : function(b, c, g) {
        var h, i, j = [w, f];
        if (g) {
          while (b = b[d])
            if ((1 === b.nodeType || e) && a(b, c, g)) return !0
        }
        else
          while (b = b[d])
            if (1 === b.nodeType || e) {
              if (i = b[u] || (b[u] = {}), (h = i[d]) && h[0] === w && h[1] === f) return j[2] = h[2];
              if (i[d] = j, j[2] = a(b, c, g)) return !0
            }
      }
    }

    function ta(a) {
      return a.length > 1 ? function(b, c, d) {
        var e = a.length;
        while (e--)
          if (!a[e](b, c, d)) return !1;
        return !0
      } : a[0]
    }

    function ua(a, b, c) {
      for (var d = 0, e = b.length; e > d; d++) ga(a, b[d], c);
      return c
    }

    function va(a, b, c, d, e) {
      for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
      return g
    }

    function wa(a, b, c, d, e, f) {
      return d && !d[u] && (d = wa(d)), e && !e[u] && (e = wa(e, f)), ia(function(f, g, h, i) {
        var j, k, l, m = [],
          n = [],
          o = g.length,
          p = f || ua(b || "*", h.nodeType ? [h] : h, []),
          q = !a || !f && b ? p : va(p, m, a, h, i),
          r = c ? e || (f ? a : o || d) ? [] : g : q;
        if (c && c(q, r, h, i), d) {
          j = va(r, n), d(j, [], h, i), k = j.length;
          while (k--)(l = j[k]) && (r[n[k]] = !(q[n[k]] = l))
        }
        if (f) {
          if (e || a) {
            if (e) {
              j = [], k = r.length;
              while (k--)(l = r[k]) && j.push(q[k] = l);
              e(null, r = [], j, i)
            }
            k = r.length;
            while (k--)(l = r[k]) && (j = e ? J(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l))
          }
        }
        else r = va(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : H.apply(g, r)
      })
    }

    function xa(a) {
      for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = sa(function(a) {
          return a === b
        }, h, !0), l = sa(function(a) {
          return J(b, a) > -1
        }, h, !0), m = [function(a, c, d) {
          var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));
          return b = null, e
        }]; f > i; i++)
        if (c = d.relative[a[i].type]) m = [sa(ta(m), c)];
        else {
          if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
            for (e = ++i; f > e; e++)
              if (d.relative[a[e].type]) break;
            return wa(i > 1 && ta(m), i > 1 && ra(a.slice(0, i - 1).concat({
              value: " " === a[i - 2].type ? "*" : ""
            })).replace(R, "$1"), c, e > i && xa(a.slice(i, e)), f > e && xa(a = a.slice(e)), f > e && ra(a))
          }
          m.push(c)
        }
      return ta(m)
    }

    function ya(a, b) {
      var c = b.length > 0,
        e = a.length > 0,
        f = function(f, g, h, i, k) {
          var l, m, o, p = 0,
            q = "0",
            r = f && [],
            s = [],
            t = j,
            u = f || e && d.find.TAG("*", k),
            v = w += null == t ? 1 : Math.random() || .1,
            x = u.length;
          for (k && (j = g !== n && g); q !== x && null != (l = u[q]); q++) {
            if (e && l) {
              m = 0;
              while (o = a[m++])
                if (o(l, g, h)) {
                  i.push(l);
                  break
                }
              k && (w = v)
            }
            c && ((l = !o && l) && p--, f && r.push(l))
          }
          if (p += q, c && q !== p) {
            m = 0;
            while (o = b[m++]) o(r, s, g, h);
            if (f) {
              if (p > 0)
                while (q--) r[q] || s[q] || (s[q] = F.call(i));
              s = va(s)
            }
            H.apply(i, s), k && !f && s.length > 0 && p + b.length > 1 && ga.uniqueSort(i)
          }
          return k && (w = v, j = t), r
        };
      return c ? ia(f) : f
    }
    return h = ga.compile = function(a, b) {
      var c, d = [],
        e = [],
        f = A[a + " "];
      if (!f) {
        b || (b = g(a)), c = b.length;
        while (c--) f = xa(b[c]), f[u] ? d.push(f) : e.push(f);
        f = A(a, ya(e, d)), f.selector = a
      }
      return f
    }, i = ga.select = function(a, b, e, f) {
      var i, j, k, l, m, n = "function" == typeof a && a,
        o = !f && g(a = n.selector || a);
      if (e = e || [], 1 === o.length) {
        if (j = o[0] = o[0].slice(0), j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type]) {
          if (b = (d.find.ID(k.matches[0].replace(ca, da), b) || [])[0], !b) return e;
          n && (b = b.parentNode), a = a.slice(j.shift().value.length)
        }
        i = X.needsContext.test(a) ? 0 : j.length;
        while (i--) {
          if (k = j[i], d.relative[l = k.type]) break;
          if ((m = d.find[l]) && (f = m(k.matches[0].replace(ca, da), aa.test(j[0].type) && pa(b.parentNode) || b))) {
            if (j.splice(i, 1), a = f.length && ra(j), !a) return H.apply(e, f), e;
            break
          }
        }
      }
      return (n || h(a, o))(f, b, !p, e, aa.test(a) && pa(b.parentNode) || b), e
    }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ja(function(a) {
      return 1 & a.compareDocumentPosition(n.createElement("div"))
    }), ja(function(a) {
      return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
    }) || ka("type|href|height|width", function(a, b, c) {
      return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
    }), c.attributes && ja(function(a) {
      return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
    }) || ka("value", function(a, b, c) {
      return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
    }), ja(function(a) {
      return null == a.getAttribute("disabled")
    }) || ka(K, function(a, b, c) {
      var d;
      return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
    }), ga
  }(a);
  m.find = s, m.expr = s.selectors, m.expr[":"] = m.expr.pseudos, m.unique = s.uniqueSort, m.text = s.getText, m.isXMLDoc = s.isXML, m.contains = s.contains;
  var t = m.expr.match.needsContext,
    u = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    v = /^.[^:#\[\.,]*$/;

  function w(a, b, c) {
    if (m.isFunction(b)) return m.grep(a, function(a, d) {
      return !!b.call(a, d, a) !== c
    });
    if (b.nodeType) return m.grep(a, function(a) {
      return a === b !== c
    });
    if ("string" == typeof b) {
      if (v.test(b)) return m.filter(b, a, c);
      b = m.filter(b, a)
    }
    return m.grep(a, function(a) {
      return m.inArray(a, b) >= 0 !== c
    })
  }
  m.filter = function(a, b, c) {
    var d = b[0];
    return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? m.find.matchesSelector(d, a) ? [d] : [] : m.find.matches(a, m.grep(b, function(a) {
      return 1 === a.nodeType
    }))
  }, m.fn.extend({
    find: function(a) {
      var b, c = [],
        d = this,
        e = d.length;
      if ("string" != typeof a) return this.pushStack(m(a).filter(function() {
        for (b = 0; e > b; b++)
          if (m.contains(d[b], this)) return !0
      }));
      for (b = 0; e > b; b++) m.find(a, d[b], c);
      return c = this.pushStack(e > 1 ? m.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, c
    },
    filter: function(a) {
      return this.pushStack(w(this, a || [], !1))
    },
    not: function(a) {
      return this.pushStack(w(this, a || [], !0))
    },
    is: function(a) {
      return !!w(this, "string" == typeof a && t.test(a) ? m(a) : a || [], !1).length
    }
  });
  var x, y = a.document,
    z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    A = m.fn.init = function(a, b) {
      var c, d;
      if (!a) return this;
      if ("string" == typeof a) {
        if (c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : z.exec(a), !c || !c[1] && b) return !b || b.jquery ? (b || x).find(a) : this.constructor(b).find(a);
        if (c[1]) {
          if (b = b instanceof m ? b[0] : b, m.merge(this, m.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : y, !0)), u.test(c[1]) && m.isPlainObject(b))
            for (c in b) m.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
          return this
        }
        if (d = y.getElementById(c[2]), d && d.parentNode) {
          if (d.id !== c[2]) return x.find(a);
          this.length = 1, this[0] = d
        }
        return this.context = y, this.selector = a, this
      }
      return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : m.isFunction(a) ? "undefined" != typeof x.ready ? x.ready(a) : a(m) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), m.makeArray(a, this))
    };
  A.prototype = m.fn, x = m(y);
  var B = /^(?:parents|prev(?:Until|All))/,
    C = {
      children: !0,
      contents: !0,
      next: !0,
      prev: !0
    };
  m.extend({
    dir: function(a, b, c) {
      var d = [],
        e = a[b];
      while (e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !m(e).is(c))) 1 === e.nodeType && d.push(e), e = e[b];
      return d
    },
    sibling: function(a, b) {
      for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
      return c
    }
  }), m.fn.extend({
    has: function(a) {
      var b, c = m(a, this),
        d = c.length;
      return this.filter(function() {
        for (b = 0; d > b; b++)
          if (m.contains(this, c[b])) return !0
      })
    },
    closest: function(a, b) {
      for (var c, d = 0, e = this.length, f = [], g = t.test(a) || "string" != typeof a ? m(a, b || this.context) : 0; e > d; d++)
        for (c = this[d]; c && c !== b; c = c.parentNode)
          if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && m.find.matchesSelector(c, a))) {
            f.push(c);
            break
          }
      return this.pushStack(f.length > 1 ? m.unique(f) : f)
    },
    index: function(a) {
      return a ? "string" == typeof a ? m.inArray(this[0], m(a)) : m.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
    },
    add: function(a, b) {
      return this.pushStack(m.unique(m.merge(this.get(), m(a, b))))
    },
    addBack: function(a) {
      return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
    }
  });

  function D(a, b) {
    do a = a[b]; while (a && 1 !== a.nodeType);
    return a
  }
  m.each({
    parent: function(a) {
      var b = a.parentNode;
      return b && 11 !== b.nodeType ? b : null
    },
    parents: function(a) {
      return m.dir(a, "parentNode")
    },
    parentsUntil: function(a, b, c) {
      return m.dir(a, "parentNode", c)
    },
    next: function(a) {
      return D(a, "nextSibling")
    },
    prev: function(a) {
      return D(a, "previousSibling")
    },
    nextAll: function(a) {
      return m.dir(a, "nextSibling")
    },
    prevAll: function(a) {
      return m.dir(a, "previousSibling")
    },
    nextUntil: function(a, b, c) {
      return m.dir(a, "nextSibling", c)
    },
    prevUntil: function(a, b, c) {
      return m.dir(a, "previousSibling", c)
    },
    siblings: function(a) {
      return m.sibling((a.parentNode || {}).firstChild, a)
    },
    children: function(a) {
      return m.sibling(a.firstChild)
    },
    contents: function(a) {
      return m.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : m.merge([], a.childNodes)
    }
  }, function(a, b) {
    m.fn[a] = function(c, d) {
      var e = m.map(this, b, c);
      return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = m.filter(d, e)), this.length > 1 && (C[a] || (e = m.unique(e)), B.test(a) && (e = e.reverse())), this.pushStack(e)
    }
  });
  var E = /\S+/g,
    F = {};

  function G(a) {
    var b = F[a] = {};
    return m.each(a.match(E) || [], function(a, c) {
      b[c] = !0
    }), b
  }
  m.Callbacks = function(a) {
    a = "string" == typeof a ? F[a] || G(a) : m.extend({}, a);
    var b, c, d, e, f, g, h = [],
      i = !a.once && [],
      j = function(l) {
        for (c = a.memory && l, d = !0, f = g || 0, g = 0, e = h.length, b = !0; h && e > f; f++)
          if (h[f].apply(l[0], l[1]) === !1 && a.stopOnFalse) {
            c = !1;
            break
          }
        b = !1, h && (i ? i.length && j(i.shift()) : c ? h = [] : k.disable())
      },
      k = {
        add: function() {
          if (h) {
            var d = h.length;
            ! function f(b) {
              m.each(b, function(b, c) {
                var d = m.type(c);
                "function" === d ? a.unique && k.has(c) || h.push(c) : c && c.length && "string" !== d && f(c)
              })
            }(arguments), b ? e = h.length : c && (g = d, j(c))
          }
          return this
        },
        remove: function() {
          return h && m.each(arguments, function(a, c) {
            var d;
            while ((d = m.inArray(c, h, d)) > -1) h.splice(d, 1), b && (e >= d && e--, f >= d && f--)
          }), this
        },
        has: function(a) {
          return a ? m.inArray(a, h) > -1 : !(!h || !h.length)
        },
        empty: function() {
          return h = [], e = 0, this
        },
        disable: function() {
          return h = i = c = void 0, this
        },
        disabled: function() {
          return !h
        },
        lock: function() {
          return i = void 0, c || k.disable(), this
        },
        locked: function() {
          return !i
        },
        fireWith: function(a, c) {
          return !h || d && !i || (c = c || [], c = [a, c.slice ? c.slice() : c], b ? i.push(c) : j(c)), this
        },
        fire: function() {
          return k.fireWith(this, arguments), this
        },
        fired: function() {
          return !!d
        }
      };
    return k
  }, m.extend({
    Deferred: function(a) {
      var b = [
          ["resolve", "done", m.Callbacks("once memory"), "resolved"],
          ["reject", "fail", m.Callbacks("once memory"), "rejected"],
          ["notify", "progress", m.Callbacks("memory")]
        ],
        c = "pending",
        d = {
          state: function() {
            return c
          },
          always: function() {
            return e.done(arguments).fail(arguments), this
          },
          then: function() {
            var a = arguments;
            return m.Deferred(function(c) {
              m.each(b, function(b, f) {
                var g = m.isFunction(a[b]) && a[b];
                e[f[1]](function() {
                  var a = g && g.apply(this, arguments);
                  a && m.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                })
              }), a = null
            }).promise()
          },
          promise: function(a) {
            return null != a ? m.extend(a, d) : d
          }
        },
        e = {};
      return d.pipe = d.then, m.each(b, function(a, f) {
        var g = f[2],
          h = f[3];
        d[f[1]] = g.add, h && g.add(function() {
          c = h
        }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
          return e[f[0] + "With"](this === e ? d : this, arguments), this
        }, e[f[0] + "With"] = g.fireWith
      }), d.promise(e), a && a.call(e, e), e
    },
    when: function(a) {
      var b = 0,
        c = d.call(arguments),
        e = c.length,
        f = 1 !== e || a && m.isFunction(a.promise) ? e : 0,
        g = 1 === f ? a : m.Deferred(),
        h = function(a, b, c) {
          return function(e) {
            b[a] = this, c[a] = arguments.length > 1 ? d.call(arguments) : e, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c)
          }
        },
        i, j, k;
      if (e > 1)
        for (i = new Array(e), j = new Array(e), k = new Array(e); e > b; b++) c[b] && m.isFunction(c[b].promise) ? c[b].promise().done(h(b, k, c)).fail(g.reject).progress(h(b, j, i)) : --f;
      return f || g.resolveWith(k, c), g.promise()
    }
  });
  var H;
  m.fn.ready = function(a) {
    return m.ready.promise().done(a), this
  }, m.extend({
    isReady: !1,
    readyWait: 1,
    holdReady: function(a) {
      a ? m.readyWait++ : m.ready(!0)
    },
    ready: function(a) {
      if (a === !0 ? !--m.readyWait : !m.isReady) {
        if (!y.body) return setTimeout(m.ready);
        m.isReady = !0, a !== !0 && --m.readyWait > 0 || (H.resolveWith(y, [m]), m.fn.triggerHandler && (m(y).triggerHandler("ready"), m(y).off("ready")))
      }
    }
  });

  function I() {
    y.addEventListener ? (y.removeEventListener("DOMContentLoaded", J, !1), a.removeEventListener("load", J, !1)) : (y.detachEvent("onreadystatechange", J), a.detachEvent("onload", J))
  }

  function J() {
    (y.addEventListener || "load" === event.type || "complete" === y.readyState) && (I(), m.ready())
  }
  m.ready.promise = function(b) {
    if (!H)
      if (H = m.Deferred(), "complete" === y.readyState) setTimeout(m.ready);
      else if (y.addEventListener) y.addEventListener("DOMContentLoaded", J, !1), a.addEventListener("load", J, !1);
    else {
      y.attachEvent("onreadystatechange", J), a.attachEvent("onload", J);
      var c = !1;
      try {
        c = null == a.frameElement && y.documentElement
      }
      catch (d) {}
      c && c.doScroll && ! function e() {
        if (!m.isReady) {
          try {
            c.doScroll("left")
          }
          catch (a) {
            return setTimeout(e, 50)
          }
          I(), m.ready()
        }
      }()
    }
    return H.promise(b)
  };
  var K = "undefined",
    L;
  for (L in m(k)) break;
  k.ownLast = "0" !== L, k.inlineBlockNeedsLayout = !1, m(function() {
      var a, b, c, d;
      c = y.getElementsByTagName("body")[0], c && c.style && (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== K && (b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", k.inlineBlockNeedsLayout = a = 3 === b.offsetWidth, a && (c.style.zoom = 1)), c.removeChild(d))
    }),
    function() {
      var a = y.createElement("div");
      if (null == k.deleteExpando) {
        k.deleteExpando = !0;
        try {
          delete a.test
        }
        catch (b) {
          k.deleteExpando = !1
        }
      }
      a = null
    }(), m.acceptData = function(a) {
      var b = m.noData[(a.nodeName + " ").toLowerCase()],
        c = +a.nodeType || 1;
      return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b
    };
  var M = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    N = /([A-Z])/g;

  function O(a, b, c) {
    if (void 0 === c && 1 === a.nodeType) {
      var d = "data-" + b.replace(N, "-$1").toLowerCase();
      if (c = a.getAttribute(d), "string" == typeof c) {
        try {
          c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : M.test(c) ? m.parseJSON(c) : c
        }
        catch (e) {}
        m.data(a, b, c)
      }
      else c = void 0
    }
    return c
  }

  function P(a) {
    var b;
    for (b in a)
      if (("data" !== b || !m.isEmptyObject(a[b])) && "toJSON" !== b) return !1;

    return !0
  }

  function Q(a, b, d, e) {
    if (m.acceptData(a)) {
      var f, g, h = m.expando,
        i = a.nodeType,
        j = i ? m.cache : a,
        k = i ? a[h] : a[h] && h;
      if (k && j[k] && (e || j[k].data) || void 0 !== d || "string" != typeof b) return k || (k = i ? a[h] = c.pop() || m.guid++ : h), j[k] || (j[k] = i ? {} : {
        toJSON: m.noop
      }), ("object" == typeof b || "function" == typeof b) && (e ? j[k] = m.extend(j[k], b) : j[k].data = m.extend(j[k].data, b)), g = j[k], e || (g.data || (g.data = {}), g = g.data), void 0 !== d && (g[m.camelCase(b)] = d), "string" == typeof b ? (f = g[b], null == f && (f = g[m.camelCase(b)])) : f = g, f
    }
  }

  function R(a, b, c) {
    if (m.acceptData(a)) {
      var d, e, f = a.nodeType,
        g = f ? m.cache : a,
        h = f ? a[m.expando] : m.expando;
      if (g[h]) {
        if (b && (d = c ? g[h] : g[h].data)) {
          m.isArray(b) ? b = b.concat(m.map(b, m.camelCase)) : b in d ? b = [b] : (b = m.camelCase(b), b = b in d ? [b] : b.split(" ")), e = b.length;
          while (e--) delete d[b[e]];
          if (c ? !P(d) : !m.isEmptyObject(d)) return
        }(c || (delete g[h].data, P(g[h]))) && (f ? m.cleanData([a], !0) : k.deleteExpando || g != g.window ? delete g[h] : g[h] = null)
      }
    }
  }
  m.extend({
    cache: {},
    noData: {
      "applet ": !0,
      "embed ": !0,
      "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
    },
    hasData: function(a) {
      return a = a.nodeType ? m.cache[a[m.expando]] : a[m.expando], !!a && !P(a)
    },
    data: function(a, b, c) {
      return Q(a, b, c)
    },
    removeData: function(a, b) {
      return R(a, b)
    },
    _data: function(a, b, c) {
      return Q(a, b, c, !0)
    },
    _removeData: function(a, b) {
      return R(a, b, !0)
    }
  }), m.fn.extend({
    data: function(a, b) {
      var c, d, e, f = this[0],
        g = f && f.attributes;
      if (void 0 === a) {
        if (this.length && (e = m.data(f), 1 === f.nodeType && !m._data(f, "parsedAttrs"))) {
          c = g.length;
          while (c--) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = m.camelCase(d.slice(5)), O(f, d, e[d])));
          m._data(f, "parsedAttrs", !0)
        }
        return e
      }
      return "object" == typeof a ? this.each(function() {
        m.data(this, a)
      }) : arguments.length > 1 ? this.each(function() {
        m.data(this, a, b)
      }) : f ? O(f, a, m.data(f, a)) : void 0
    },
    removeData: function(a) {
      return this.each(function() {
        m.removeData(this, a)
      })
    }
  }), m.extend({
    queue: function(a, b, c) {
      var d;
      return a ? (b = (b || "fx") + "queue", d = m._data(a, b), c && (!d || m.isArray(c) ? d = m._data(a, b, m.makeArray(c)) : d.push(c)), d || []) : void 0
    },
    dequeue: function(a, b) {
      b = b || "fx";
      var c = m.queue(a, b),
        d = c.length,
        e = c.shift(),
        f = m._queueHooks(a, b),
        g = function() {
          m.dequeue(a, b)
        };
      "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
    },
    _queueHooks: function(a, b) {
      var c = b + "queueHooks";
      return m._data(a, c) || m._data(a, c, {
        empty: m.Callbacks("once memory").add(function() {
          m._removeData(a, b + "queue"), m._removeData(a, c)
        })
      })
    }
  }), m.fn.extend({
    queue: function(a, b) {
      var c = 2;
      return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? m.queue(this[0], a) : void 0 === b ? this : this.each(function() {
        var c = m.queue(this, a, b);
        m._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && m.dequeue(this, a)
      })
    },
    dequeue: function(a) {
      return this.each(function() {
        m.dequeue(this, a)
      })
    },
    clearQueue: function(a) {
      return this.queue(a || "fx", [])
    },
    promise: function(a, b) {
      var c, d = 1,
        e = m.Deferred(),
        f = this,
        g = this.length,
        h = function() {
          --d || e.resolveWith(f, [f])
        };
      "string" != typeof a && (b = a, a = void 0), a = a || "fx";
      while (g--) c = m._data(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
      return h(), e.promise(b)
    }
  });
  var S = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    T = ["Top", "Right", "Bottom", "Left"],
    U = function(a, b) {
      return a = b || a, "none" === m.css(a, "display") || !m.contains(a.ownerDocument, a)
    },
    V = m.access = function(a, b, c, d, e, f, g) {
      var h = 0,
        i = a.length,
        j = null == c;
      if ("object" === m.type(c)) {
        e = !0;
        for (h in c) m.access(a, b, h, c[h], !0, f, g)
      }
      else if (void 0 !== d && (e = !0, m.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
          return j.call(m(a), c)
        })), b))
        for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
      return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
    },
    W = /^(?:checkbox|radio)$/i;
  ! function() {
    var a = y.createElement("input"),
      b = y.createElement("div"),
      c = y.createDocumentFragment();
    if (b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", k.leadingWhitespace = 3 === b.firstChild.nodeType, k.tbody = !b.getElementsByTagName("tbody").length, k.htmlSerialize = !!b.getElementsByTagName("link").length, k.html5Clone = "<:nav></:nav>" !== y.createElement("nav").cloneNode(!0).outerHTML, a.type = "checkbox", a.checked = !0, c.appendChild(a), k.appendChecked = a.checked, b.innerHTML = "<textarea>x</textarea>", k.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue, c.appendChild(b), b.innerHTML = "<input type='radio' checked='checked' name='t'/>", k.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, k.noCloneEvent = !0, b.attachEvent && (b.attachEvent("onclick", function() {
        k.noCloneEvent = !1
      }), b.cloneNode(!0).click()), null == k.deleteExpando) {
      k.deleteExpando = !0;
      try {
        delete b.test
      }
      catch (d) {
        k.deleteExpando = !1
      }
    }
  }(),
  function() {
    var b, c, d = y.createElement("div");
    for (b in {
        submit: !0,
        change: !0,
        focusin: !0
      }) c = "on" + b, (k[b + "Bubbles"] = c in a) || (d.setAttribute(c, "t"), k[b + "Bubbles"] = d.attributes[c].expando === !1);
    d = null
  }();
  var X = /^(?:input|select|textarea)$/i,
    Y = /^key/,
    Z = /^(?:mouse|pointer|contextmenu)|click/,
    $ = /^(?:focusinfocus|focusoutblur)$/,
    _ = /^([^.]*)(?:\.(.+)|)$/;

  function aa() {
    return !0
  }

  function ba() {
    return !1
  }

  function ca() {
    try {
      return y.activeElement
    }
    catch (a) {}
  }
  m.event = {
    global: {},
    add: function(a, b, c, d, e) {
      var f, g, h, i, j, k, l, n, o, p, q, r = m._data(a);
      if (r) {
        c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = m.guid++), (g = r.events) || (g = r.events = {}), (k = r.handle) || (k = r.handle = function(a) {
          return typeof m === K || a && m.event.triggered === a.type ? void 0 : m.event.dispatch.apply(k.elem, arguments)
        }, k.elem = a), b = (b || "").match(E) || [""], h = b.length;
        while (h--) f = _.exec(b[h]) || [], o = q = f[1], p = (f[2] || "").split(".").sort(), o && (j = m.event.special[o] || {}, o = (e ? j.delegateType : j.bindType) || o, j = m.event.special[o] || {}, l = m.extend({
          type: o,
          origType: q,
          data: d,
          handler: c,
          guid: c.guid,
          selector: e,
          needsContext: e && m.expr.match.needsContext.test(e),
          namespace: p.join(".")
        }, i), (n = g[o]) || (n = g[o] = [], n.delegateCount = 0, j.setup && j.setup.call(a, d, p, k) !== !1 || (a.addEventListener ? a.addEventListener(o, k, !1) : a.attachEvent && a.attachEvent("on" + o, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? n.splice(n.delegateCount++, 0, l) : n.push(l), m.event.global[o] = !0);
        a = null
      }
    },
    remove: function(a, b, c, d, e) {
      var f, g, h, i, j, k, l, n, o, p, q, r = m.hasData(a) && m._data(a);
      if (r && (k = r.events)) {
        b = (b || "").match(E) || [""], j = b.length;
        while (j--)
          if (h = _.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o) {
            l = m.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, n = k[o] || [], h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = n.length;
            while (f--) g = n[f], !e && q !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (n.splice(f, 1), g.selector && n.delegateCount--, l.remove && l.remove.call(a, g));
            i && !n.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || m.removeEvent(a, o, r.handle), delete k[o])
          }
          else
            for (o in k) m.event.remove(a, o + b[j], c, d, !0);
        m.isEmptyObject(k) && (delete r.handle, m._removeData(a, "events"))
      }
    },
    trigger: function(b, c, d, e) {
      var f, g, h, i, k, l, n, o = [d || y],
        p = j.call(b, "type") ? b.type : b,
        q = j.call(b, "namespace") ? b.namespace.split(".") : [];
      if (h = l = d = d || y, 3 !== d.nodeType && 8 !== d.nodeType && !$.test(p + m.event.triggered) && (p.indexOf(".") >= 0 && (q = p.split("."), p = q.shift(), q.sort()), g = p.indexOf(":") < 0 && "on" + p, b = b[m.expando] ? b : new m.Event(p, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = q.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + q.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : m.makeArray(c, [b]), k = m.event.special[p] || {}, e || !k.trigger || k.trigger.apply(d, c) !== !1)) {
        if (!e && !k.noBubble && !m.isWindow(d)) {
          for (i = k.delegateType || p, $.test(i + p) || (h = h.parentNode); h; h = h.parentNode) o.push(h), l = h;
          l === (d.ownerDocument || y) && o.push(l.defaultView || l.parentWindow || a)
        }
        n = 0;
        while ((h = o[n++]) && !b.isPropagationStopped()) b.type = n > 1 ? i : k.bindType || p, f = (m._data(h, "events") || {})[b.type] && m._data(h, "handle"), f && f.apply(h, c), f = g && h[g], f && f.apply && m.acceptData(h) && (b.result = f.apply(h, c), b.result === !1 && b.preventDefault());
        if (b.type = p, !e && !b.isDefaultPrevented() && (!k._default || k._default.apply(o.pop(), c) === !1) && m.acceptData(d) && g && d[p] && !m.isWindow(d)) {
          l = d[g], l && (d[g] = null), m.event.triggered = p;
          try {
            d[p]()
          }
          catch (r) {}
          m.event.triggered = void 0, l && (d[g] = l)
        }
        return b.result
      }
    },
    dispatch: function(a) {
      a = m.event.fix(a);
      var b, c, e, f, g, h = [],
        i = d.call(arguments),
        j = (m._data(this, "events") || {})[a.type] || [],
        k = m.event.special[a.type] || {};
      if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
        h = m.event.handlers.call(this, a, j), b = 0;
        while ((f = h[b++]) && !a.isPropagationStopped()) {
          a.currentTarget = f.elem, g = 0;
          while ((e = f.handlers[g++]) && !a.isImmediatePropagationStopped())(!a.namespace_re || a.namespace_re.test(e.namespace)) && (a.handleObj = e, a.data = e.data, c = ((m.event.special[e.origType] || {}).handle || e.handler).apply(f.elem, i), void 0 !== c && (a.result = c) === !1 && (a.preventDefault(), a.stopPropagation()))
        }
        return k.postDispatch && k.postDispatch.call(this, a), a.result
      }
    },
    handlers: function(a, b) {
      var c, d, e, f, g = [],
        h = b.delegateCount,
        i = a.target;
      if (h && i.nodeType && (!a.button || "click" !== a.type))
        for (; i != this; i = i.parentNode || this)
          if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
            for (e = [], f = 0; h > f; f++) d = b[f], c = d.selector + " ", void 0 === e[c] && (e[c] = d.needsContext ? m(c, this).index(i) >= 0 : m.find(c, this, null, [i]).length), e[c] && e.push(d);
            e.length && g.push({
              elem: i,
              handlers: e
            })
          }
      return h < b.length && g.push({
        elem: this,
        handlers: b.slice(h)
      }), g
    },
    fix: function(a) {
      if (a[m.expando]) return a;
      var b, c, d, e = a.type,
        f = a,
        g = this.fixHooks[e];
      g || (this.fixHooks[e] = g = Z.test(e) ? this.mouseHooks : Y.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new m.Event(f), b = d.length;
      while (b--) c = d[b], a[c] = f[c];
      return a.target || (a.target = f.srcElement || y), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, g.filter ? g.filter(a, f) : a
    },
    props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function(a, b) {
        return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
      }
    },
    mouseHooks: {
      props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
      filter: function(a, b) {
        var c, d, e, f = b.button,
          g = b.fromElement;
        return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || y, e = d.documentElement, c = d.body, a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)), !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
      }
    },
    special: {
      load: {
        noBubble: !0
      },
      focus: {
        trigger: function() {
          if (this !== ca() && this.focus) try {
            return this.focus(), !1
          }
          catch (a) {}
        },
        delegateType: "focusin"
      },
      blur: {
        trigger: function() {
          return this === ca() && this.blur ? (this.blur(), !1) : void 0
        },
        delegateType: "focusout"
      },
      click: {
        trigger: function() {
          return m.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
        },
        _default: function(a) {
          return m.nodeName(a.target, "a")
        }
      },
      beforeunload: {
        postDispatch: function(a) {
          void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
        }
      }
    },
    simulate: function(a, b, c, d) {
      var e = m.extend(new m.Event, c, {
        type: a,
        isSimulated: !0,
        originalEvent: {}
      });
      d ? m.event.trigger(e, null, b) : m.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
    }
  }, m.removeEvent = y.removeEventListener ? function(a, b, c) {
    a.removeEventListener && a.removeEventListener(b, c, !1)
  } : function(a, b, c) {
    var d = "on" + b;
    a.detachEvent && (typeof a[d] === K && (a[d] = null), a.detachEvent(d, c))
  }, m.Event = function(a, b) {
    return this instanceof m.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? aa : ba) : this.type = a, b && m.extend(this, b), this.timeStamp = a && a.timeStamp || m.now(), void(this[m.expando] = !0)) : new m.Event(a, b)
  }, m.Event.prototype = {
    isDefaultPrevented: ba,
    isPropagationStopped: ba,
    isImmediatePropagationStopped: ba,
    preventDefault: function() {
      var a = this.originalEvent;
      this.isDefaultPrevented = aa, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
    },
    stopPropagation: function() {
      var a = this.originalEvent;
      this.isPropagationStopped = aa, a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
    },
    stopImmediatePropagation: function() {
      var a = this.originalEvent;
      this.isImmediatePropagationStopped = aa, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation()
    }
  }, m.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function(a, b) {
    m.event.special[a] = {
      delegateType: b,
      bindType: b,
      handle: function(a) {
        var c, d = this,
          e = a.relatedTarget,
          f = a.handleObj;
        return (!e || e !== d && !m.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
      }
    }
  }), k.submitBubbles || (m.event.special.submit = {
    setup: function() {
      return m.nodeName(this, "form") ? !1 : void m.event.add(this, "click._submit keypress._submit", function(a) {
        var b = a.target,
          c = m.nodeName(b, "input") || m.nodeName(b, "button") ? b.form : void 0;
        c && !m._data(c, "submitBubbles") && (m.event.add(c, "submit._submit", function(a) {
          a._submit_bubble = !0
        }), m._data(c, "submitBubbles", !0))
      })
    },
    postDispatch: function(a) {
      a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && m.event.simulate("submit", this.parentNode, a, !0))
    },
    teardown: function() {
      return m.nodeName(this, "form") ? !1 : void m.event.remove(this, "._submit")
    }
  }), k.changeBubbles || (m.event.special.change = {
    setup: function() {
      return X.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (m.event.add(this, "propertychange._change", function(a) {
        "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
      }), m.event.add(this, "click._change", function(a) {
        this._just_changed && !a.isTrigger && (this._just_changed = !1), m.event.simulate("change", this, a, !0)
      })), !1) : void m.event.add(this, "beforeactivate._change", function(a) {
        var b = a.target;
        X.test(b.nodeName) && !m._data(b, "changeBubbles") && (m.event.add(b, "change._change", function(a) {
          !this.parentNode || a.isSimulated || a.isTrigger || m.event.simulate("change", this.parentNode, a, !0)
        }), m._data(b, "changeBubbles", !0))
      })
    },
    handle: function(a) {
      var b = a.target;
      return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
    },
    teardown: function() {
      return m.event.remove(this, "._change"), !X.test(this.nodeName)
    }
  }), k.focusinBubbles || m.each({
    focus: "focusin",
    blur: "focusout"
  }, function(a, b) {
    var c = function(a) {
      m.event.simulate(b, a.target, m.event.fix(a), !0)
    };
    m.event.special[b] = {
      setup: function() {
        var d = this.ownerDocument || this,
          e = m._data(d, b);
        e || d.addEventListener(a, c, !0), m._data(d, b, (e || 0) + 1)
      },
      teardown: function() {
        var d = this.ownerDocument || this,
          e = m._data(d, b) - 1;
        e ? m._data(d, b, e) : (d.removeEventListener(a, c, !0), m._removeData(d, b))
      }
    }
  }), m.fn.extend({
    on: function(a, b, c, d, e) {
      var f, g;
      if ("object" == typeof a) {
        "string" != typeof b && (c = c || b, b = void 0);
        for (f in a) this.on(f, b, c, a[f], e);
        return this
      }
      if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1) d = ba;
      else if (!d) return this;
      return 1 === e && (g = d, d = function(a) {
        return m().off(a), g.apply(this, arguments)
      }, d.guid = g.guid || (g.guid = m.guid++)), this.each(function() {
        m.event.add(this, a, d, c, b)
      })
    },
    one: function(a, b, c, d) {
      return this.on(a, b, c, d, 1)
    },
    off: function(a, b, c) {
      var d, e;
      if (a && a.preventDefault && a.handleObj) return d = a.handleObj, m(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
      if ("object" == typeof a) {
        for (e in a) this.off(e, b, a[e]);
        return this
      }
      return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = ba), this.each(function() {
        m.event.remove(this, a, c, b)
      })
    },
    trigger: function(a, b) {
      return this.each(function() {
        m.event.trigger(a, b, this)
      })
    },
    triggerHandler: function(a, b) {
      var c = this[0];
      return c ? m.event.trigger(a, b, c, !0) : void 0
    }
  });

  function da(a) {
    var b = ea.split("|"),
      c = a.createDocumentFragment();
    if (c.createElement)
      while (b.length) c.createElement(b.pop());
    return c
  }
  var ea = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    fa = / jQuery\d+="(?:null|\d+)"/g,
    ga = new RegExp("<(?:" + ea + ")[\\s/>]", "i"),
    ha = /^\s+/,
    ia = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    ja = /<([\w:]+)/,
    ka = /<tbody/i,
    la = /<|&#?\w+;/,
    ma = /<(?:script|style|link)/i,
    na = /checked\s*(?:[^=]|=\s*.checked.)/i,
    oa = /^$|\/(?:java|ecma)script/i,
    pa = /^true\/(.*)/,
    qa = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    ra = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      legend: [1, "<fieldset>", "</fieldset>"],
      area: [1, "<map>", "</map>"],
      param: [1, "<object>", "</object>"],
      thead: [1, "<table>", "</table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: k.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    },
    sa = da(y),
    ta = sa.appendChild(y.createElement("div"));
  ra.optgroup = ra.option, ra.tbody = ra.tfoot = ra.colgroup = ra.caption = ra.thead, ra.th = ra.td;

  function ua(a, b) {
    var c, d, e = 0,
      f = typeof a.getElementsByTagName !== K ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== K ? a.querySelectorAll(b || "*") : void 0;
    if (!f)
      for (f = [], c = a.childNodes || a; null != (d = c[e]); e++) !b || m.nodeName(d, b) ? f.push(d) : m.merge(f, ua(d, b));
    return void 0 === b || b && m.nodeName(a, b) ? m.merge([a], f) : f
  }

  function va(a) {
    W.test(a.type) && (a.defaultChecked = a.checked)
  }

  function wa(a, b) {
    return m.nodeName(a, "table") && m.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
  }

  function xa(a) {
    return a.type = (null !== m.find.attr(a, "type")) + "/" + a.type, a
  }

  function ya(a) {
    var b = pa.exec(a.type);
    return b ? a.type = b[1] : a.removeAttribute("type"), a
  }

  function za(a, b) {
    for (var c, d = 0; null != (c = a[d]); d++) m._data(c, "globalEval", !b || m._data(b[d], "globalEval"))
  }

  function Aa(a, b) {
    if (1 === b.nodeType && m.hasData(a)) {
      var c, d, e, f = m._data(a),
        g = m._data(b, f),
        h = f.events;
      if (h) {
        delete g.handle, g.events = {};
        for (c in h)
          for (d = 0, e = h[c].length; e > d; d++) m.event.add(b, c, h[c][d])
      }
      g.data && (g.data = m.extend({}, g.data))
    }
  }

  function Ba(a, b) {
    var c, d, e;
    if (1 === b.nodeType) {
      if (c = b.nodeName.toLowerCase(), !k.noCloneEvent && b[m.expando]) {
        e = m._data(b);
        for (d in e.events) m.removeEvent(b, d, e.handle);
        b.removeAttribute(m.expando)
      }
      "script" === c && b.text !== a.text ? (xa(b).text = a.text, ya(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), k.html5Clone && a.innerHTML && !m.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && W.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
    }
  }
  m.extend({
    clone: function(a, b, c) {
      var d, e, f, g, h, i = m.contains(a.ownerDocument, a);
      if (k.html5Clone || m.isXMLDoc(a) || !ga.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (ta.innerHTML = a.outerHTML, ta.removeChild(f = ta.firstChild)), !(k.noCloneEvent && k.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || m.isXMLDoc(a)))
        for (d = ua(f), h = ua(a), g = 0; null != (e = h[g]); ++g) d[g] && Ba(e, d[g]);
      if (b)
        if (c)
          for (h = h || ua(a), d = d || ua(f), g = 0; null != (e = h[g]); g++) Aa(e, d[g]);
        else Aa(a, f);
      return d = ua(f, "script"), d.length > 0 && za(d, !i && ua(a, "script")), d = h = e = null, f
    },
    buildFragment: function(a, b, c, d) {
      for (var e, f, g, h, i, j, l, n = a.length, o = da(b), p = [], q = 0; n > q; q++)
        if (f = a[q], f || 0 === f)
          if ("object" === m.type(f)) m.merge(p, f.nodeType ? [f] : f);
          else if (la.test(f)) {
        h = h || o.appendChild(b.createElement("div")), i = (ja.exec(f) || ["", ""])[1].toLowerCase(), l = ra[i] || ra._default, h.innerHTML = l[1] + f.replace(ia, "<$1></$2>") + l[2], e = l[0];
        while (e--) h = h.lastChild;
        if (!k.leadingWhitespace && ha.test(f) && p.push(b.createTextNode(ha.exec(f)[0])), !k.tbody) {
          f = "table" !== i || ka.test(f) ? "<table>" !== l[1] || ka.test(f) ? 0 : h : h.firstChild, e = f && f.childNodes.length;
          while (e--) m.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j)
        }
        m.merge(p, h.childNodes), h.textContent = "";
        while (h.firstChild) h.removeChild(h.firstChild);
        h = o.lastChild
      }
      else p.push(b.createTextNode(f));
      h && o.removeChild(h), k.appendChecked || m.grep(ua(p, "input"), va), q = 0;
      while (f = p[q++])
        if ((!d || -1 === m.inArray(f, d)) && (g = m.contains(f.ownerDocument, f), h = ua(o.appendChild(f), "script"), g && za(h), c)) {
          e = 0;
          while (f = h[e++]) oa.test(f.type || "") && c.push(f)
        }
      return h = null, o
    },
    cleanData: function(a, b) {
      for (var d, e, f, g, h = 0, i = m.expando, j = m.cache, l = k.deleteExpando, n = m.event.special; null != (d = a[h]); h++)
        if ((b || m.acceptData(d)) && (f = d[i], g = f && j[f])) {
          if (g.events)
            for (e in g.events) n[e] ? m.event.remove(d, e) : m.removeEvent(d, e, g.handle);
          j[f] && (delete j[f], l ? delete d[i] : typeof d.removeAttribute !== K ? d.removeAttribute(i) : d[i] = null, c.push(f))
        }
    }
  }), m.fn.extend({
    text: function(a) {
      return V(this, function(a) {
        return void 0 === a ? m.text(this) : this.empty().append((this[0] && this[0].ownerDocument || y).createTextNode(a))
      }, null, a, arguments.length)
    },
    append: function() {
      return this.domManip(arguments, function(a) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var b = wa(this, a);
          b.appendChild(a)
        }
      })
    },
    prepend: function() {
      return this.domManip(arguments, function(a) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var b = wa(this, a);
          b.insertBefore(a, b.firstChild)
        }
      })
    },
    before: function() {
      return this.domManip(arguments, function(a) {
        this.parentNode && this.parentNode.insertBefore(a, this)
      })
    },
    after: function() {
      return this.domManip(arguments, function(a) {
        this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
      })
    },
    remove: function(a, b) {
      for (var c, d = a ? m.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || m.cleanData(ua(c)), c.parentNode && (b && m.contains(c.ownerDocument, c) && za(ua(c, "script")), c.parentNode.removeChild(c));
      return this
    },
    empty: function() {
      for (var a, b = 0; null != (a = this[b]); b++) {
        1 === a.nodeType && m.cleanData(ua(a, !1));
        while (a.firstChild) a.removeChild(a.firstChild);
        a.options && m.nodeName(a, "select") && (a.options.length = 0)
      }
      return this
    },
    clone: function(a, b) {
      return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
        return m.clone(this, a, b)
      })
    },
    html: function(a) {
      return V(this, function(a) {
        var b = this[0] || {},
          c = 0,
          d = this.length;
        if (void 0 === a) return 1 === b.nodeType ? b.innerHTML.replace(fa, "") : void 0;
        if (!("string" != typeof a || ma.test(a) || !k.htmlSerialize && ga.test(a) || !k.leadingWhitespace && ha.test(a) || ra[(ja.exec(a) || ["", ""])[1].toLowerCase()])) {
          a = a.replace(ia, "<$1></$2>");
          try {
            for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (m.cleanData(ua(b, !1)), b.innerHTML = a);
            b = 0
          }
          catch (e) {}
        }
        b && this.empty().append(a)
      }, null, a, arguments.length)
    },
    replaceWith: function() {
      var a = arguments[0];
      return this.domManip(arguments, function(b) {
        a = this.parentNode, m.cleanData(ua(this)), a && a.replaceChild(b, this)
      }), a && (a.length || a.nodeType) ? this : this.remove()
    },
    detach: function(a) {
      return this.remove(a, !0)
    },
    domManip: function(a, b) {
      a = e.apply([], a);
      var c, d, f, g, h, i, j = 0,
        l = this.length,
        n = this,
        o = l - 1,
        p = a[0],
        q = m.isFunction(p);
      if (q || l > 1 && "string" == typeof p && !k.checkClone && na.test(p)) return this.each(function(c) {
        var d = n.eq(c);
        q && (a[0] = p.call(this, c, d.html())), d.domManip(a, b)
      });
      if (l && (i = m.buildFragment(a, this[0].ownerDocument, !1, this), c = i.firstChild, 1 === i.childNodes.length && (i = c), c)) {
        for (g = m.map(ua(i, "script"), xa), f = g.length; l > j; j++) d = i, j !== o && (d = m.clone(d, !0, !0), f && m.merge(g, ua(d, "script"))), b.call(this[j], d, j);
        if (f)
          for (h = g[g.length - 1].ownerDocument, m.map(g, ya), j = 0; f > j; j++) d = g[j], oa.test(d.type || "") && !m._data(d, "globalEval") && m.contains(h, d) && (d.src ? m._evalUrl && m._evalUrl(d.src) : m.globalEval((d.text || d.textContent || d.innerHTML || "").replace(qa, "")));
        i = c = null
      }
      return this
    }
  }), m.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function(a, b) {
    m.fn[a] = function(a) {
      for (var c, d = 0, e = [], g = m(a), h = g.length - 1; h >= d; d++) c = d === h ? this : this.clone(!0), m(g[d])[b](c), f.apply(e, c.get());
      return this.pushStack(e)
    }
  });
  var Ca, Da = {};

  function Ea(b, c) {
    var d, e = m(c.createElement(b)).appendTo(c.body),
      f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : m.css(e[0], "display");
    return e.detach(), f
  }

  function Fa(a) {
    var b = y,
      c = Da[a];
    return c || (c = Ea(a, b), "none" !== c && c || (Ca = (Ca || m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = (Ca[0].contentWindow || Ca[0].contentDocument).document, b.write(), b.close(), c = Ea(a, b), Ca.detach()), Da[a] = c), c
  }! function() {
    var a;
    k.shrinkWrapBlocks = function() {
      if (null != a) return a;
      a = !1;
      var b, c, d;
      return c = y.getElementsByTagName("body")[0], c && c.style ? (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), typeof b.style.zoom !== K && (b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", b.appendChild(y.createElement("div")).style.width = "5px", a = 3 !== b.offsetWidth), c.removeChild(d), a) : void 0
    }
  }();
  var Ga = /^margin/,
    Ha = new RegExp("^(" + S + ")(?!px)[a-z%]+$", "i"),
    Ia, Ja, Ka = /^(top|right|bottom|left)$/;
  a.getComputedStyle ? (Ia = function(b) {
    return b.ownerDocument.defaultView.opener ? b.ownerDocument.defaultView.getComputedStyle(b, null) : a.getComputedStyle(b, null)
  }, Ja = function(a, b, c) {
    var d, e, f, g, h = a.style;
    return c = c || Ia(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, c && ("" !== g || m.contains(a.ownerDocument, a) || (g = m.style(a, b)), Ha.test(g) && Ga.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 === g ? g : g + ""
  }) : y.documentElement.currentStyle && (Ia = function(a) {
    return a.currentStyle
  }, Ja = function(a, b, c) {
    var d, e, f, g, h = a.style;
    return c = c || Ia(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), Ha.test(g) && !Ka.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left = "fontSize" === b ? "1em" : g, g = h.pixelLeft + "px", h.left = d, f && (e.left = f)), void 0 === g ? g : g + "" || "auto"
  });

  function La(a, b) {
    return {
      get: function() {
        var c = a();
        if (null != c) return c ? void delete this.get : (this.get = b).apply(this, arguments)
      }
    }
  }! function() {
    var b, c, d, e, f, g, h;
    if (b = y.createElement("div"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName("a")[0], c = d && d.style) {
      c.cssText = "float:left;opacity:.5", k.opacity = "0.5" === c.opacity, k.cssFloat = !!c.cssFloat, b.style.backgroundClip = "content-box", b.cloneNode(!0).style.backgroundClip = "", k.clearCloneStyle = "content-box" === b.style.backgroundClip, k.boxSizing = "" === c.boxSizing || "" === c.MozBoxSizing || "" === c.WebkitBoxSizing, m.extend(k, {
        reliableHiddenOffsets: function() {
          return null == g && i(), g
        },
        boxSizingReliable: function() {
          return null == f && i(), f
        },
        pixelPosition: function() {
          return null == e && i(), e
        },
        reliableMarginRight: function() {
          return null == h && i(), h
        }
      });

      function i() {
        var b, c, d, i;
        c = y.getElementsByTagName("body")[0], c && c.style && (b = y.createElement("div"), d = y.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), b.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", e = f = !1, h = !0, a.getComputedStyle && (e = "1%" !== (a.getComputedStyle(b, null) || {}).top, f = "4px" === (a.getComputedStyle(b, null) || {
          width: "4px"
        }).width, i = b.appendChild(y.createElement("div")), i.style.cssText = b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", i.style.marginRight = i.style.width = "0", b.style.width = "1px", h = !parseFloat((a.getComputedStyle(i, null) || {}).marginRight), b.removeChild(i)), b.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", i = b.getElementsByTagName("td"), i[0].style.cssText = "margin:0;border:0;padding:0;display:none", g = 0 === i[0].offsetHeight, g && (i[0].style.display = "", i[1].style.display = "none", g = 0 === i[0].offsetHeight), c.removeChild(d))
      }
    }
  }(), m.swap = function(a, b, c, d) {
    var e, f, g = {};
    for (f in b) g[f] = a.style[f], a.style[f] = b[f];
    e = c.apply(a, d || []);
    for (f in b) a.style[f] = g[f];
    return e
  };
  var Ma = /alpha\([^)]*\)/i,
    Na = /opacity\s*=\s*([^)]*)/,
    Oa = /^(none|table(?!-c[ea]).+)/,
    Pa = new RegExp("^(" + S + ")(.*)$", "i"),
    Qa = new RegExp("^([+-])=(" + S + ")", "i"),
    Ra = {
      position: "absolute",
      visibility: "hidden",
      display: "block"
    },
    Sa = {
      letterSpacing: "0",
      fontWeight: "400"
    },
    Ta = ["Webkit", "O", "Moz", "ms"];

  function Ua(a, b) {
    if (b in a) return b;
    var c = b.charAt(0).toUpperCase() + b.slice(1),
      d = b,
      e = Ta.length;
    while (e--)
      if (b = Ta[e] + c, b in a) return b;
    return d
  }

  function Va(a, b) {
    for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = m._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && U(d) && (f[g] = m._data(d, "olddisplay", Fa(d.nodeName)))) : (e = U(d), (c && "none" !== c || !e) && m._data(d, "olddisplay", e ? c : m.css(d, "display"))));
    for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
    return a
  }

  function Wa(a, b, c) {
    var d = Pa.exec(b);
    return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
  }

  function Xa(a, b, c, d, e) {
    for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += m.css(a, c + T[f], !0, e)), d ? ("content" === c && (g -= m.css(a, "padding" + T[f], !0, e)), "margin" !== c && (g -= m.css(a, "border" + T[f] + "Width", !0, e))) : (g += m.css(a, "padding" + T[f], !0, e), "padding" !== c && (g += m.css(a, "border" + T[f] + "Width", !0, e)));
    return g
  }

  function Ya(a, b, c) {
    var d = !0,
      e = "width" === b ? a.offsetWidth : a.offsetHeight,
      f = Ia(a),
      g = k.boxSizing && "border-box" === m.css(a, "boxSizing", !1, f);
    if (0 >= e || null == e) {
      if (e = Ja(a, b, f), (0 > e || null == e) && (e = a.style[b]), Ha.test(e)) return e;
      d = g && (k.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
    }
    return e + Xa(a, b, c || (g ? "border" : "content"), d, f) + "px"
  }
  m.extend({
    cssHooks: {
      opacity: {
        get: function(a, b) {
          if (b) {
            var c = Ja(a, "opacity");
            return "" === c ? "1" : c
          }
        }
      }
    },
    cssNumber: {
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0
    },
    cssProps: {
      "float": k.cssFloat ? "cssFloat" : "styleFloat"
    },
    style: function(a, b, c, d) {
      if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
        var e, f, g, h = m.camelCase(b),
          i = a.style;
        if (b = m.cssProps[h] || (m.cssProps[h] = Ua(i, h)), g = m.cssHooks[b] || m.cssHooks[h], void 0 === c) return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
        if (f = typeof c, "string" === f && (e = Qa.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(m.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || m.cssNumber[h] || (c += "px"), k.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), !(g && "set" in g && void 0 === (c = g.set(a, c, d))))) try {
          i[b] = c
        }
        catch (j) {}
      }
    },
    css: function(a, b, c, d) {
      var e, f, g, h = m.camelCase(b);
      return b = m.cssProps[h] || (m.cssProps[h] = Ua(a.style, h)), g = m.cssHooks[b] || m.cssHooks[h], g && "get" in g && (f = g.get(a, !0, c)), void 0 === f && (f = Ja(a, b, d)), "normal" === f && b in Sa && (f = Sa[b]), "" === c || c ? (e = parseFloat(f), c === !0 || m.isNumeric(e) ? e || 0 : f) : f
    }
  }), m.each(["height", "width"], function(a, b) {
    m.cssHooks[b] = {
      get: function(a, c, d) {
        return c ? Oa.test(m.css(a, "display")) && 0 === a.offsetWidth ? m.swap(a, Ra, function() {
          return Ya(a, b, d)
        }) : Ya(a, b, d) : void 0
      },
      set: function(a, c, d) {
        var e = d && Ia(a);
        return Wa(a, c, d ? Xa(a, b, d, k.boxSizing && "border-box" === m.css(a, "boxSizing", !1, e), e) : 0)
      }
    }
  }), k.opacity || (m.cssHooks.opacity = {
    get: function(a, b) {
      return Na.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
    },
    set: function(a, b) {
      var c = a.style,
        d = a.currentStyle,
        e = m.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
        f = d && d.filter || c.filter || "";
      c.zoom = 1, (b >= 1 || "" === b) && "" === m.trim(f.replace(Ma, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d && !d.filter) || (c.filter = Ma.test(f) ? f.replace(Ma, e) : f + " " + e)
    }
  }), m.cssHooks.marginRight = La(k.reliableMarginRight, function(a, b) {
    return b ? m.swap(a, {
      display: "inline-block"
    }, Ja, [a, "marginRight"]) : void 0
  }), m.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function(a, b) {
    m.cssHooks[a + b] = {
      expand: function(c) {
        for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + T[d] + b] = f[d] || f[d - 2] || f[0];
        return e
      }
    }, Ga.test(a) || (m.cssHooks[a + b].set = Wa)
  }), m.fn.extend({
    css: function(a, b) {
      return V(this, function(a, b, c) {
        var d, e, f = {},
          g = 0;
        if (m.isArray(b)) {
          for (d = Ia(a), e = b.length; e > g; g++) f[b[g]] = m.css(a, b[g], !1, d);
          return f
        }
        return void 0 !== c ? m.style(a, b, c) : m.css(a, b)
      }, a, b, arguments.length > 1)
    },
    show: function() {
      return Va(this, !0)
    },
    hide: function() {
      return Va(this)
    },
    toggle: function(a) {
      return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
        U(this) ? m(this).show() : m(this).hide()
      })
    }
  });

  function Za(a, b, c, d, e) {
    return new Za.prototype.init(a, b, c, d, e)
  }
  m.Tween = Za, Za.prototype = {
    constructor: Za,
    init: function(a, b, c, d, e, f) {
      this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (m.cssNumber[c] ? "" : "px")
    },
    cur: function() {
      var a = Za.propHooks[this.prop];
      return a && a.get ? a.get(this) : Za.propHooks._default.get(this)
    },
    run: function(a) {
      var b, c = Za.propHooks[this.prop];
      return this.options.duration ? this.pos = b = m.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : Za.propHooks._default.set(this), this
    }
  }, Za.prototype.init.prototype = Za.prototype, Za.propHooks = {
    _default: {
      get: function(a) {
        var b;
        return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = m.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
      },
      set: function(a) {
        m.fx.step[a.prop] ? m.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[m.cssProps[a.prop]] || m.cssHooks[a.prop]) ? m.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
      }
    }
  }, Za.propHooks.scrollTop = Za.propHooks.scrollLeft = {
    set: function(a) {
      a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
    }
  }, m.easing = {
    linear: function(a) {
      return a
    },
    swing: function(a) {
      return .5 - Math.cos(a * Math.PI) / 2
    }
  }, m.fx = Za.prototype.init, m.fx.step = {};
  var $a, _a, ab = /^(?:toggle|show|hide)$/,
    bb = new RegExp("^(?:([+-])=|)(" + S + ")([a-z%]*)$", "i"),
    cb = /queueHooks$/,
    db = [ib],
    eb = {
      "*": [function(a, b) {
        var c = this.createTween(a, b),
          d = c.cur(),
          e = bb.exec(b),
          f = e && e[3] || (m.cssNumber[a] ? "" : "px"),
          g = (m.cssNumber[a] || "px" !== f && +d) && bb.exec(m.css(c.elem, a)),
          h = 1,
          i = 20;
        if (g && g[3] !== f) {
          f = f || g[3], e = e || [], g = +d || 1;
          do h = h || ".5", g /= h, m.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i)
        }
        return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
      }]
    };

  function fb() {
    return setTimeout(function() {
      $a = void 0
    }), $a = m.now()
  }

  function gb(a, b) {
    var c, d = {
        height: a
      },
      e = 0;
    for (b = b ? 1 : 0; 4 > e; e += 2 - b) c = T[e], d["margin" + c] = d["padding" + c] = a;
    return b && (d.opacity = d.width = a), d
  }

  function hb(a, b, c) {
    for (var d, e = (eb[b] || []).concat(eb["*"]), f = 0, g = e.length; g > f; f++)
      if (d = e[f].call(c, b, a)) return d
  }

  function ib(a, b, c) {
    var d, e, f, g, h, i, j, l, n = this,
      o = {},
      p = a.style,
      q = a.nodeType && U(a),
      r = m._data(a, "fxshow");
    c.queue || (h = m._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function() {
      h.unqueued || i()
    }), h.unqueued++, n.always(function() {
      n.always(function() {
        h.unqueued--, m.queue(a, "fx").length || h.empty.fire()
      })
    })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [p.overflow, p.overflowX, p.overflowY], j = m.css(a, "display"), l = "none" === j ? m._data(a, "olddisplay") || Fa(a.nodeName) : j, "inline" === l && "none" === m.css(a, "float") && (k.inlineBlockNeedsLayout && "inline" !== Fa(a.nodeName) ? p.zoom = 1 : p.display = "inline-block")), c.overflow && (p.overflow = "hidden", k.shrinkWrapBlocks() || n.always(function() {
      p.overflow = c.overflow[0], p.overflowX = c.overflow[1], p.overflowY = c.overflow[2]
    }));
    for (d in b)
      if (e = b[d], ab.exec(e)) {
        if (delete b[d], f = f || "toggle" === e, e === (q ? "hide" : "show")) {
          if ("show" !== e || !r || void 0 === r[d]) continue;
          q = !0
        }
        o[d] = r && r[d] || m.style(a, d)
      }
      else j = void 0;
    if (m.isEmptyObject(o)) "inline" === ("none" === j ? Fa(a.nodeName) : j) && (p.display = j);
    else {
      r ? "hidden" in r && (q = r.hidden) : r = m._data(a, "fxshow", {}), f && (r.hidden = !q), q ? m(a).show() : n.done(function() {
        m(a).hide()
      }), n.done(function() {
        var b;
        m._removeData(a, "fxshow");
        for (b in o) m.style(a, b, o[b])
      });
      for (d in o) g = hb(q ? r[d] : 0, d, n), d in r || (r[d] = g.start, q && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
    }
  }

  function jb(a, b) {
    var c, d, e, f, g;
    for (c in a)
      if (d = m.camelCase(c), e = b[d], f = a[c], m.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = m.cssHooks[d], g && "expand" in g) {
        f = g.expand(f), delete a[d];
        for (c in f) c in a || (a[c] = f[c], b[c] = e)
      }
      else b[d] = e
  }

  function kb(a, b, c) {
    var d, e, f = 0,
      g = db.length,
      h = m.Deferred().always(function() {
        delete i.elem
      }),
      i = function() {
        if (e) return !1;
        for (var b = $a || fb(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
        return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
      },
      j = h.promise({
        elem: a,
        props: m.extend({}, b),
        opts: m.extend(!0, {
          specialEasing: {}
        }, c),
        originalProperties: b,
        originalOptions: c,
        startTime: $a || fb(),
        duration: c.duration,
        tweens: [],
        createTween: function(b, c) {
          var d = m.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
          return j.tweens.push(d), d
        },
        stop: function(b) {
          var c = 0,
            d = b ? j.tweens.length : 0;
          if (e) return this;
          for (e = !0; d > c; c++) j.tweens[c].run(1);
          return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
        }
      }),
      k = j.props;
    for (jb(k, j.opts.specialEasing); g > f; f++)
      if (d = db[f].call(j, a, k, j.opts)) return d;
    return m.map(k, hb, j), m.isFunction(j.opts.start) && j.opts.start.call(a, j), m.fx.timer(m.extend(i, {
      elem: a,
      anim: j,
      queue: j.opts.queue
    })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
  }
  m.Animation = m.extend(kb, {
      tweener: function(a, b) {
        m.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
        for (var c, d = 0, e = a.length; e > d; d++) c = a[d], eb[c] = eb[c] || [], eb[c].unshift(b)
      },
      prefilter: function(a, b) {
        b ? db.unshift(a) : db.push(a)
      }
    }), m.speed = function(a, b, c) {
      var d = a && "object" == typeof a ? m.extend({}, a) : {
        complete: c || !c && b || m.isFunction(a) && a,
        duration: a,
        easing: c && b || b && !m.isFunction(b) && b
      };
      return d.duration = m.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in m.fx.speeds ? m.fx.speeds[d.duration] : m.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
        m.isFunction(d.old) && d.old.call(this), d.queue && m.dequeue(this, d.queue)
      }, d
    }, m.fn.extend({
      fadeTo: function(a, b, c, d) {
        return this.filter(U).css("opacity", 0).show().end().animate({
          opacity: b
        }, a, c, d)
      },
      animate: function(a, b, c, d) {
        var e = m.isEmptyObject(a),
          f = m.speed(b, c, d),
          g = function() {
            var b = kb(this, m.extend({}, a), f);
            (e || m._data(this, "finish")) && b.stop(!0)
          };
        return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
      },
      stop: function(a, b, c) {
        var d = function(a) {
          var b = a.stop;
          delete a.stop, b(c)
        };
        return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function() {
          var b = !0,
            e = null != a && a + "queueHooks",
            f = m.timers,
            g = m._data(this);
          if (e) g[e] && g[e].stop && d(g[e]);
          else
            for (e in g) g[e] && g[e].stop && cb.test(e) && d(g[e]);
          for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
          (b || !c) && m.dequeue(this, a)
        })
      },
      finish: function(a) {
        return a !== !1 && (a = a || "fx"), this.each(function() {
          var b, c = m._data(this),
            d = c[a + "queue"],
            e = c[a + "queueHooks"],
            f = m.timers,
            g = d ? d.length : 0;
          for (c.finish = !0, m.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
          for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
          delete c.finish
        })
      }
    }), m.each(["toggle", "show", "hide"], function(a, b) {
      var c = m.fn[b];
      m.fn[b] = function(a, d, e) {
        return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(gb(b, !0), a, d, e)
      }
    }), m.each({
      slideDown: gb("show"),
      slideUp: gb("hide"),
      slideToggle: gb("toggle"),
      fadeIn: {
        opacity: "show"
      },
      fadeOut: {
        opacity: "hide"
      },
      fadeToggle: {
        opacity: "toggle"
      }
    }, function(a, b) {
      m.fn[a] = function(a, c, d) {
        return this.animate(b, a, c, d)
      }
    }), m.timers = [], m.fx.tick = function() {
      var a, b = m.timers,
        c = 0;
      for ($a = m.now(); c < b.length; c++) a = b[c], a() || b[c] !== a || b.splice(c--, 1);
      b.length || m.fx.stop(), $a = void 0
    }, m.fx.timer = function(a) {
      m.timers.push(a), a() ? m.fx.start() : m.timers.pop()
    }, m.fx.interval = 13, m.fx.start = function() {
      _a || (_a = setInterval(m.fx.tick, m.fx.interval))
    }, m.fx.stop = function() {
      clearInterval(_a), _a = null
    }, m.fx.speeds = {
      slow: 600,
      fast: 200,
      _default: 400
    }, m.fn.delay = function(a, b) {
      return a = m.fx ? m.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
        var d = setTimeout(b, a);
        c.stop = function() {
          clearTimeout(d)
        }
      })
    },
    function() {
      var a, b, c, d, e;
      b = y.createElement("div"), b.setAttribute("className", "t"), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName("a")[0], c = y.createElement("select"), e = c.appendChild(y.createElement("option")), a = b.getElementsByTagName("input")[0], d.style.cssText = "top:1px", k.getSetAttribute = "t" !== b.className, k.style = /top/.test(d.getAttribute("style")), k.hrefNormalized = "/a" === d.getAttribute("href"), k.checkOn = !!a.value, k.optSelected = e.selected, k.enctype = !!y.createElement("form").enctype, c.disabled = !0, k.optDisabled = !e.disabled, a = y.createElement("input"), a.setAttribute("value", ""), k.input = "" === a.getAttribute("value"), a.value = "t", a.setAttribute("type", "radio"), k.radioValue = "t" === a.value
    }();
  var lb = /\r/g;
  m.fn.extend({
    val: function(a) {
      var b, c, d, e = this[0]; {
        if (arguments.length) return d = m.isFunction(a), this.each(function(c) {
          var e;
          1 === this.nodeType && (e = d ? a.call(this, c, m(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : m.isArray(e) && (e = m.map(e, function(a) {
            return null == a ? "" : a + ""
          })), b = m.valHooks[this.type] || m.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
        });
        if (e) return b = m.valHooks[e.type] || m.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(lb, "") : null == c ? "" : c)
      }
    }
  }), m.extend({
    valHooks: {
      option: {
        get: function(a) {
          var b = m.find.attr(a, "value");
          return null != b ? b : m.trim(m.text(a))
        }
      },
      select: {
        get: function(a) {
          for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
            if (c = d[i], !(!c.selected && i !== e || (k.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && m.nodeName(c.parentNode, "optgroup"))) {
              if (b = m(c).val(), f) return b;
              g.push(b)
            }
          return g
        },
        set: function(a, b) {
          var c, d, e = a.options,
            f = m.makeArray(b),
            g = e.length;
          while (g--)
            if (d = e[g], m.inArray(m.valHooks.option.get(d), f) >= 0) try {
              d.selected = c = !0
            }
          catch (h) {
            d.scrollHeight
          }
          else d.selected = !1;
          return c || (a.selectedIndex = -1), e
        }
      }
    }
  }), m.each(["radio", "checkbox"], function() {
    m.valHooks[this] = {
      set: function(a, b) {
        return m.isArray(b) ? a.checked = m.inArray(m(a).val(), b) >= 0 : void 0
      }
    }, k.checkOn || (m.valHooks[this].get = function(a) {
      return null === a.getAttribute("value") ? "on" : a.value
    })
  });
  var mb, nb, ob = m.expr.attrHandle,
    pb = /^(?:checked|selected)$/i,
    qb = k.getSetAttribute,
    rb = k.input;
  m.fn.extend({
    attr: function(a, b) {
      return V(this, m.attr, a, b, arguments.length > 1)
    },
    removeAttr: function(a) {
      return this.each(function() {
        m.removeAttr(this, a)
      })
    }
  }), m.extend({
    attr: function(a, b, c) {
      var d, e, f = a.nodeType;
      if (a && 3 !== f && 8 !== f && 2 !== f) return typeof a.getAttribute === K ? m.prop(a, b, c) : (1 === f && m.isXMLDoc(a) || (b = b.toLowerCase(), d = m.attrHooks[b] || (m.expr.match.bool.test(b) ? nb : mb)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = m.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void m.removeAttr(a, b))
    },
    removeAttr: function(a, b) {
      var c, d, e = 0,
        f = b && b.match(E);
      if (f && 1 === a.nodeType)
        while (c = f[e++]) d = m.propFix[c] || c, m.expr.match.bool.test(c) ? rb && qb || !pb.test(c) ? a[d] = !1 : a[m.camelCase("default-" + c)] = a[d] = !1 : m.attr(a, c, ""), a.removeAttribute(qb ? c : d)
    },
    attrHooks: {
      type: {
        set: function(a, b) {
          if (!k.radioValue && "radio" === b && m.nodeName(a, "input")) {
            var c = a.value;
            return a.setAttribute("type", b), c && (a.value = c), b
          }
        }
      }
    }
  }), nb = {
    set: function(a, b, c) {
      return b === !1 ? m.removeAttr(a, c) : rb && qb || !pb.test(c) ? a.setAttribute(!qb && m.propFix[c] || c, c) : a[m.camelCase("default-" + c)] = a[c] = !0, c
    }
  }, m.each(m.expr.match.bool.source.match(/\w+/g), function(a, b) {
    var c = ob[b] || m.find.attr;
    ob[b] = rb && qb || !pb.test(b) ? function(a, b, d) {
      var e, f;
      return d || (f = ob[b], ob[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, ob[b] = f), e
    } : function(a, b, c) {
      return c ? void 0 : a[m.camelCase("default-" + b)] ? b.toLowerCase() : null
    }
  }), rb && qb || (m.attrHooks.value = {
    set: function(a, b, c) {
      return m.nodeName(a, "input") ? void(a.defaultValue = b) : mb && mb.set(a, b, c)
    }
  }), qb || (mb = {
    set: function(a, b, c) {
      var d = a.getAttributeNode(c);
      return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += "", "value" === c || b === a.getAttribute(c) ? b : void 0
    }
  }, ob.id = ob.name = ob.coords = function(a, b, c) {
    var d;
    return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null
  }, m.valHooks.button = {
    get: function(a, b) {
      var c = a.getAttributeNode(b);
      return c && c.specified ? c.value : void 0
    },
    set: mb.set
  }, m.attrHooks.contenteditable = {
    set: function(a, b, c) {
      mb.set(a, "" === b ? !1 : b, c)
    }
  }, m.each(["width", "height"], function(a, b) {
    m.attrHooks[b] = {
      set: function(a, c) {
        return "" === c ? (a.setAttribute(b, "auto"), c) : void 0
      }
    }
  })), k.style || (m.attrHooks.style = {
    get: function(a) {
      return a.style.cssText || void 0
    },
    set: function(a, b) {
      return a.style.cssText = b + ""
    }
  });
  var sb = /^(?:input|select|textarea|button|object)$/i,
    tb = /^(?:a|area)$/i;
  m.fn.extend({
    prop: function(a, b) {
      return V(this, m.prop, a, b, arguments.length > 1)
    },
    removeProp: function(a) {
      return a = m.propFix[a] || a, this.each(function() {
        try {
          this[a] = void 0, delete this[a]
        }
        catch (b) {}
      })
    }
  }), m.extend({
    propFix: {
      "for": "htmlFor",
      "class": "className"
    },
    prop: function(a, b, c) {
      var d, e, f, g = a.nodeType;
      if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !m.isXMLDoc(a), f && (b = m.propFix[b] || b, e = m.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
    },
    propHooks: {
      tabIndex: {
        get: function(a) {
          var b = m.find.attr(a, "tabindex");
          return b ? parseInt(b, 10) : sb.test(a.nodeName) || tb.test(a.nodeName) && a.href ? 0 : -1
        }
      }
    }
  }), k.hrefNormalized || m.each(["href", "src"], function(a, b) {
    m.propHooks[b] = {
      get: function(a) {
        return a.getAttribute(b, 4)
      }
    }
  }), k.optSelected || (m.propHooks.selected = {
    get: function(a) {
      var b = a.parentNode;
      return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
    }
  }), m.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
    m.propFix[this.toLowerCase()] = this
  }), k.enctype || (m.propFix.enctype = "encoding");
  var ub = /[\t\r\n\f]/g;
  m.fn.extend({
    addClass: function(a) {
      var b, c, d, e, f, g, h = 0,
        i = this.length,
        j = "string" == typeof a && a;
      if (m.isFunction(a)) return this.each(function(b) {
        m(this).addClass(a.call(this, b, this.className))
      });
      if (j)
        for (b = (a || "").match(E) || []; i > h; h++)
          if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(ub, " ") : " ")) {
            f = 0;
            while (e = b[f++]) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
            g = m.trim(d), c.className !== g && (c.className = g)
          }
      return this
    },
    removeClass: function(a) {
      var b, c, d, e, f, g, h = 0,
        i = this.length,
        j = 0 === arguments.length || "string" == typeof a && a;
      if (m.isFunction(a)) return this.each(function(b) {
        m(this).removeClass(a.call(this, b, this.className))
      });
      if (j)
        for (b = (a || "").match(E) || []; i > h; h++)
          if (c = this[h], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(ub, " ") : "")) {
            f = 0;
            while (e = b[f++])
              while (d.indexOf(" " + e + " ") >= 0) d = d.replace(" " + e + " ", " ");
            g = a ? m.trim(d) : "", c.className !== g && (c.className = g)
          }
      return this
    },
    toggleClass: function(a, b) {
      var c = typeof a;
      return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(m.isFunction(a) ? function(c) {
        m(this).toggleClass(a.call(this, c, this.className, b), b)
      } : function() {
        if ("string" === c) {
          var b, d = 0,
            e = m(this),
            f = a.match(E) || [];
          while (b = f[d++]) e.hasClass(b) ? e.removeClass(b) : e.addClass(b)
        }
        else(c === K || "boolean" === c) && (this.className && m._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : m._data(this, "__className__") || "")
      })
    },
    hasClass: function(a) {
      for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
        if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(ub, " ").indexOf(b) >= 0) return !0;
      return !1
    }
  }), m.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
    m.fn[b] = function(a, c) {
      return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
    }
  }), m.fn.extend({
    hover: function(a, b) {
      return this.mouseenter(a).mouseleave(b || a)
    },
    bind: function(a, b, c) {
      return this.on(a, null, b, c)
    },
    unbind: function(a, b) {
      return this.off(a, null, b)
    },
    delegate: function(a, b, c, d) {
      return this.on(b, a, c, d)
    },
    undelegate: function(a, b, c) {
      return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
    }
  });
  var vb = m.now(),
    wb = /\?/,
    xb = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
  m.parseJSON = function(b) {
    if (a.JSON && a.JSON.parse) return a.JSON.parse(b + "");
    var c, d = null,
      e = m.trim(b + "");
    return e && !m.trim(e.replace(xb, function(a, b, e, f) {
      return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, "")
    })) ? Function("return " + e)() : m.error("Invalid JSON: " + b)
  }, m.parseXML = function(b) {
    var c, d;
    if (!b || "string" != typeof b) return null;
    try {
      a.DOMParser ? (d = new DOMParser, c = d.parseFromString(b, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(b))
    }
    catch (e) {
      c = void 0
    }
    return c && c.documentElement && !c.getElementsByTagName("parsererror").length || m.error("Invalid XML: " + b), c
  };
  var yb, zb, Ab = /#.*$/,
    Bb = /([?&])_=[^&]*/,
    Cb = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    Db = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    Eb = /^(?:GET|HEAD)$/,
    Fb = /^\/\//,
    Gb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
    Hb = {},
    Ib = {},
    Jb = "*/".concat("*");
  try {
    zb = location.href
  }
  catch (Kb) {
    zb = y.createElement("a"), zb.href = "", zb = zb.href
  }
  yb = Gb.exec(zb.toLowerCase()) || [];

  function Lb(a) {
    return function(b, c) {
      "string" != typeof b && (c = b, b = "*");
      var d, e = 0,
        f = b.toLowerCase().match(E) || [];
      if (m.isFunction(c))
        while (d = f[e++]) "+" === d.charAt(0) ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
    }
  }

  function Mb(a, b, c, d) {
    var e = {},
      f = a === Ib;

    function g(h) {
      var i;
      return e[h] = !0, m.each(a[h] || [], function(a, h) {
        var j = h(b, c, d);
        return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1)
      }), i
    }
    return g(b.dataTypes[0]) || !e["*"] && g("*")
  }

  function Nb(a, b) {
    var c, d, e = m.ajaxSettings.flatOptions || {};
    for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
    return c && m.extend(!0, a, c), a
  }

  function Ob(a, b, c) {
    var d, e, f, g, h = a.contents,
      i = a.dataTypes;
    while ("*" === i[0]) i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
    if (e)
      for (g in h)
        if (h[g] && h[g].test(e)) {
          i.unshift(g);
          break
        }
    if (i[0] in c) f = i[0];
    else {
      for (g in c) {
        if (!i[0] || a.converters[g + " " + i[0]]) {
          f = g;
          break
        }
        d || (d = g)
      }
      f = f || d
    }
    return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
  }

  function Pb(a, b, c, d) {
    var e, f, g, h, i, j = {},
      k = a.dataTypes.slice();
    if (k[1])
      for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
    f = k.shift();
    while (f)
      if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
        if ("*" === f) f = i;
        else if ("*" !== i && i !== f) {
      if (g = j[i + " " + f] || j["* " + f], !g)
        for (e in j)
          if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
            g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
            break
          }
      if (g !== !0)
        if (g && a["throws"]) b = g(b);
        else try {
          b = g(b)
        }
      catch (l) {
        return {
          state: "parsererror",
          error: g ? l : "No conversion from " + i + " to " + f
        }
      }
    }
    return {
      state: "success",
      data: b
    }
  }
  m.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: zb,
      type: "GET",
      isLocal: Db.test(yb[1]),
      global: !0,
      processData: !0,
      async: !0,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      accepts: {
        "*": Jb,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      converters: {
        "* text": String,
        "text html": !0,
        "text json": m.parseJSON,
        "text xml": m.parseXML
      },
      flatOptions: {
        url: !0,
        context: !0
      }
    },
    ajaxSetup: function(a, b) {
      return b ? Nb(Nb(a, m.ajaxSettings), b) : Nb(m.ajaxSettings, a)
    },
    ajaxPrefilter: Lb(Hb),
    ajaxTransport: Lb(Ib),
    ajax: function(a, b) {
      "object" == typeof a && (b = a, a = void 0), b = b || {};
      var c, d, e, f, g, h, i, j, k = m.ajaxSetup({}, b),
        l = k.context || k,
        n = k.context && (l.nodeType || l.jquery) ? m(l) : m.event,
        o = m.Deferred(),
        p = m.Callbacks("once memory"),
        q = k.statusCode || {},
        r = {},
        s = {},
        t = 0,
        u = "canceled",
        v = {
          readyState: 0,
          getResponseHeader: function(a) {
            var b;
            if (2 === t) {
              if (!j) {
                j = {};
                while (b = Cb.exec(f)) j[b[1].toLowerCase()] = b[2]
              }
              b = j[a.toLowerCase()]
            }
            return null == b ? null : b
          },
          getAllResponseHeaders: function() {
            return 2 === t ? f : null
          },
          setRequestHeader: function(a, b) {
            var c = a.toLowerCase();
            return t || (a = s[c] = s[c] || a, r[a] = b), this
          },
          overrideMimeType: function(a) {
            return t || (k.mimeType = a), this
          },
          statusCode: function(a) {
            var b;
            if (a)
              if (2 > t)
                for (b in a) q[b] = [q[b], a[b]];
              else v.always(a[v.status]);
            return this
          },
          abort: function(a) {
            var b = a || u;
            return i && i.abort(b), x(0, b), this
          }
        };
      if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, k.url = ((a || k.url || zb) + "").replace(Ab, "").replace(Fb, yb[1] + "//"), k.type = b.method || b.type || k.method || k.type, k.dataTypes = m.trim(k.dataType || "*").toLowerCase().match(E) || [""], null == k.crossDomain && (c = Gb.exec(k.url.toLowerCase()), k.crossDomain = !(!c || c[1] === yb[1] && c[2] === yb[2] && (c[3] || ("http:" === c[1] ? "80" : "443")) === (yb[3] || ("http:" === yb[1] ? "80" : "443")))), k.data && k.processData && "string" != typeof k.data && (k.data = m.param(k.data, k.traditional)), Mb(Hb, k, b, v), 2 === t) return v;
      h = m.event && k.global, h && 0 === m.active++ && m.event.trigger("ajaxStart"), k.type = k.type.toUpperCase(), k.hasContent = !Eb.test(k.type), e = k.url, k.hasContent || (k.data && (e = k.url += (wb.test(e) ? "&" : "?") + k.data, delete k.data), k.cache === !1 && (k.url = Bb.test(e) ? e.replace(Bb, "$1_=" + vb++) : e + (wb.test(e) ? "&" : "?") + "_=" + vb++)), k.ifModified && (m.lastModified[e] && v.setRequestHeader("If-Modified-Since", m.lastModified[e]), m.etag[e] && v.setRequestHeader("If-None-Match", m.etag[e])), (k.data && k.hasContent && k.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", k.contentType), v.setRequestHeader("Accept", k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + ("*" !== k.dataTypes[0] ? ", " + Jb + "; q=0.01" : "") : k.accepts["*"]);
      for (d in k.headers) v.setRequestHeader(d, k.headers[d]);
      if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || 2 === t)) return v.abort();
      u = "abort";
      for (d in {
          success: 1,
          error: 1,
          complete: 1
        }) v[d](k[d]);
      if (i = Mb(Ib, k, b, v)) {
        v.readyState = 1, h && n.trigger("ajaxSend", [v, k]), k.async && k.timeout > 0 && (g = setTimeout(function() {
          v.abort("timeout")
        }, k.timeout));
        try {
          t = 1, i.send(r, x)
        }
        catch (w) {
          if (!(2 > t)) throw w;
          x(-1, w)
        }
      }
      else x(-1, "No Transport");

      function x(a, b, c, d) {
        var j, r, s, u, w, x = b;
        2 !== t && (t = 2, g && clearTimeout(g), i = void 0, f = d || "", v.readyState = a > 0 ? 4 : 0, j = a >= 200 && 300 > a || 304 === a, c && (u = Ob(k, v, c)), u = Pb(k, u, v, j), j ? (k.ifModified && (w = v.getResponseHeader("Last-Modified"), w && (m.lastModified[e] = w), w = v.getResponseHeader("etag"), w && (m.etag[e] = w)), 204 === a || "HEAD" === k.type ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = u.state, r = u.data, s = u.error, j = !s)) : (s = x, (a || !x) && (x = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || x) + "", j ? o.resolveWith(l, [r, x, v]) : o.rejectWith(l, [v, x, s]), v.statusCode(q), q = void 0, h && n.trigger(j ? "ajaxSuccess" : "ajaxError", [v, k, j ? r : s]), p.fireWith(l, [v, x]), h && (n.trigger("ajaxComplete", [v, k]), --m.active || m.event.trigger("ajaxStop")))
      }
      return v
    },
    getJSON: function(a, b, c) {
      return m.get(a, b, c, "json")
    },
    getScript: function(a, b) {
      return m.get(a, void 0, b, "script")
    }
  }), m.each(["get", "post"], function(a, b) {
    m[b] = function(a, c, d, e) {
      return m.isFunction(c) && (e = e || d, d = c, c = void 0), m.ajax({
        url: a,
        type: b,
        dataType: e,
        data: c,
        success: d
      })
    }
  }), m._evalUrl = function(a) {
    return m.ajax({
      url: a,
      type: "GET",
      dataType: "script",
      async: !1,
      global: !1,
      "throws": !0
    })
  }, m.fn.extend({
    wrapAll: function(a) {
      if (m.isFunction(a)) return this.each(function(b) {
        m(this).wrapAll(a.call(this, b))
      });
      if (this[0]) {
        var b = m(a, this[0].ownerDocument).eq(0).clone(!0);
        this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
          var a = this;
          while (a.firstChild && 1 === a.firstChild.nodeType) a = a.firstChild;
          return a
        }).append(this)
      }
      return this
    },
    wrapInner: function(a) {
      return this.each(m.isFunction(a) ? function(b) {
        m(this).wrapInner(a.call(this, b))
      } : function() {
        var b = m(this),
          c = b.contents();
        c.length ? c.wrapAll(a) : b.append(a)
      })
    },
    wrap: function(a) {
      var b = m.isFunction(a);
      return this.each(function(c) {
        m(this).wrapAll(b ? a.call(this, c) : a)
      })
    },
    unwrap: function() {
      return this.parent().each(function() {
        m.nodeName(this, "body") || m(this).replaceWith(this.childNodes)
      }).end()
    }
  }), m.expr.filters.hidden = function(a) {
    return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !k.reliableHiddenOffsets() && "none" === (a.style && a.style.display || m.css(a, "display"))
  }, m.expr.filters.visible = function(a) {
    return !m.expr.filters.hidden(a)
  };
  var Qb = /%20/g,
    Rb = /\[\]$/,
    Sb = /\r?\n/g,
    Tb = /^(?:submit|button|image|reset|file)$/i,
    Ub = /^(?:input|select|textarea|keygen)/i;

  function Vb(a, b, c, d) {
    var e;
    if (m.isArray(b)) m.each(b, function(b, e) {
      c || Rb.test(a) ? d(a, e) : Vb(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
    });
    else if (c || "object" !== m.type(b)) d(a, b);
    else
      for (e in b) Vb(a + "[" + e + "]", b[e], c, d)
  }
  m.param = function(a, b) {
    var c, d = [],
      e = function(a, b) {
        b = m.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
      };
    if (void 0 === b && (b = m.ajaxSettings && m.ajaxSettings.traditional), m.isArray(a) || a.jquery && !m.isPlainObject(a)) m.each(a, function() {
      e(this.name, this.value)
    });
    else
      for (c in a) Vb(c, a[c], b, e);
    return d.join("&").replace(Qb, "+")
  }, m.fn.extend({
    serialize: function() {
      return m.param(this.serializeArray())
    },
    serializeArray: function() {
      return this.map(function() {
        var a = m.prop(this, "elements");
        return a ? m.makeArray(a) : this
      }).filter(function() {
        var a = this.type;
        return this.name && !m(this).is(":disabled") && Ub.test(this.nodeName) && !Tb.test(a) && (this.checked || !W.test(a))
      }).map(function(a, b) {
        var c = m(this).val();
        return null == c ? null : m.isArray(c) ? m.map(c, function(a) {
          return {
            name: b.name,
            value: a.replace(Sb, "\r\n")
          }
        }) : {
          name: b.name,
          value: c.replace(Sb, "\r\n")
        }
      }).get()
    }
  }), m.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function() {
    return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && Zb() || $b()
  } : Zb;
  var Wb = 0,
    Xb = {},
    Yb = m.ajaxSettings.xhr();
  a.attachEvent && a.attachEvent("onunload", function() {
    for (var a in Xb) Xb[a](void 0, !0)
  }), k.cors = !!Yb && "withCredentials" in Yb, Yb = k.ajax = !!Yb, Yb && m.ajaxTransport(function(a) {
    if (!a.crossDomain || k.cors) {
      var b;
      return {
        send: function(c, d) {
          var e, f = a.xhr(),
            g = ++Wb;
          if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)
            for (e in a.xhrFields) f[e] = a.xhrFields[e];
          a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
          for (e in c) void 0 !== c[e] && f.setRequestHeader(e, c[e] + "");
          f.send(a.hasContent && a.data || null), b = function(c, e) {
            var h, i, j;
            if (b && (e || 4 === f.readyState))
              if (delete Xb[g], b = void 0, f.onreadystatechange = m.noop, e) 4 !== f.readyState && f.abort();
              else {
                j = {}, h = f.status, "string" == typeof f.responseText && (j.text = f.responseText);
                try {
                  i = f.statusText
                }
                catch (k) {
                  i = ""
                }
                h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204) : h = j.text ? 200 : 404
              }
            j && d(h, i, j, f.getAllResponseHeaders())
          }, a.async ? 4 === f.readyState ? setTimeout(b) : f.onreadystatechange = Xb[g] = b : b()
        },
        abort: function() {
          b && b(void 0, !0)
        }
      }
    }
  });

  function Zb() {
    try {
      return new a.XMLHttpRequest
    }
    catch (b) {}
  }

  function $b() {
    try {
      return new a.ActiveXObject("Microsoft.XMLHTTP")
    }
    catch (b) {}
  }
  m.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /(?:java|ecma)script/
    },
    converters: {
      "text script": function(a) {
        return m.globalEval(a), a
      }
    }
  }), m.ajaxPrefilter("script", function(a) {
    void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
  }), m.ajaxTransport("script", function(a) {
    if (a.crossDomain) {
      var b, c = y.head || m("head")[0] || y.documentElement;
      return {
        send: function(d, e) {
          b = y.createElement("script"), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), b.src = a.url, b.onload = b.onreadystatechange = function(a, c) {
            (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, "success"))
          }, c.insertBefore(b, c.firstChild)
        },
        abort: function() {
          b && b.onload(void 0, !0)
        }
      }
    }
  });
  var _b = [],
    ac = /(=)\?(?=&|$)|\?\?/;
  m.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function() {
      var a = _b.pop() || m.expando + "_" + vb++;
      return this[a] = !0, a
    }
  }), m.ajaxPrefilter("json jsonp", function(b, c, d) {
    var e, f, g, h = b.jsonp !== !1 && (ac.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && ac.test(b.data) && "data");
    return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = m.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(ac, "$1" + e) : b.jsonp !== !1 && (b.url += (wb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function() {
      return g || m.error(e + " was not called"), g[0]
    }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
      g = arguments
    }, d.always(function() {
      a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, _b.push(e)), g && m.isFunction(f) && f(g[0]), g = f = void 0
    }), "script") : void 0
  }), m.parseHTML = function(a, b, c) {
    if (!a || "string" != typeof a) return null;
    "boolean" == typeof b && (c = b, b = !1), b = b || y;
    var d = u.exec(a),
      e = !c && [];
    return d ? [b.createElement(d[1])] : (d = m.buildFragment([a], b, e), e && e.length && m(e).remove(), m.merge([], d.childNodes))
  };
  var bc = m.fn.load;
  m.fn.load = function(a, b, c) {
    if ("string" != typeof a && bc) return bc.apply(this, arguments);
    var d, e, f, g = this,
      h = a.indexOf(" ");
    return h >= 0 && (d = m.trim(a.slice(h, a.length)), a = a.slice(0, h)), m.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (f = "POST"), g.length > 0 && m.ajax({
      url: a,
      type: f,
      dataType: "html",
      data: b
    }).done(function(a) {
      e = arguments, g.html(d ? m("<div>").append(m.parseHTML(a)).find(d) : a)
    }).complete(c && function(a, b) {
      g.each(c, e || [a.responseText, b, a])
    }), this
  }, m.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
    m.fn[b] = function(a) {
      return this.on(b, a)
    }
  }), m.expr.filters.animated = function(a) {
    return m.grep(m.timers, function(b) {
      return a === b.elem
    }).length
  };
  var cc = a.document.documentElement;

  function dc(a) {
    return m.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
  }
  m.offset = {
    setOffset: function(a, b, c) {
      var d, e, f, g, h, i, j, k = m.css(a, "position"),
        l = m(a),
        n = {};
      "static" === k && (a.style.position = "relative"), h = l.offset(), f = m.css(a, "top"), i = m.css(a, "left"), j = ("absolute" === k || "fixed" === k) && m.inArray("auto", [f, i]) > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), m.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (n.top = b.top - h.top + g), null != b.left && (n.left = b.left - h.left + e), "using" in b ? b.using.call(a, n) : l.css(n)
    }
  }, m.fn.extend({
    offset: function(a) {
      if (arguments.length) return void 0 === a ? this : this.each(function(b) {
        m.offset.setOffset(this, a, b)
      });
      var b, c, d = {
          top: 0,
          left: 0
        },
        e = this[0],
        f = e && e.ownerDocument;
      if (f) return b = f.documentElement, m.contains(b, e) ? (typeof e.getBoundingClientRect !== K && (d = e.getBoundingClientRect()), c = dc(f), {
        top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
        left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
      }) : d
    },
    position: function() {
      if (this[0]) {
        var a, b, c = {
            top: 0,
            left: 0
          },
          d = this[0];
        return "fixed" === m.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), m.nodeName(a[0], "html") || (c = a.offset()), c.top += m.css(a[0], "borderTopWidth", !0), c.left += m.css(a[0], "borderLeftWidth", !0)), {
          top: b.top - c.top - m.css(d, "marginTop", !0),
          left: b.left - c.left - m.css(d, "marginLeft", !0)
        }
      }
    },
    offsetParent: function() {
      return this.map(function() {
        var a = this.offsetParent || cc;
        while (a && !m.nodeName(a, "html") && "static" === m.css(a, "position")) a = a.offsetParent;
        return a || cc
      })
    }
  }), m.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function(a, b) {
    var c = /Y/.test(b);
    m.fn[a] = function(d) {
      return V(this, function(a, d, e) {
        var f = dc(a);
        return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void(f ? f.scrollTo(c ? m(f).scrollLeft() : e, c ? e : m(f).scrollTop()) : a[d] = e)
      }, a, d, arguments.length, null)
    }
  }), m.each(["top", "left"], function(a, b) {
    m.cssHooks[b] = La(k.pixelPosition, function(a, c) {
      return c ? (c = Ja(a, b), Ha.test(c) ? m(a).position()[b] + "px" : c) : void 0
    })
  }), m.each({
    Height: "height",
    Width: "width"
  }, function(a, b) {
    m.each({
      padding: "inner" + a,
      content: b,
      "": "outer" + a
    }, function(c, d) {
      m.fn[d] = function(d, e) {
        var f = arguments.length && (c || "boolean" != typeof d),
          g = c || (d === !0 || e === !0 ? "margin" : "border");
        return V(this, function(b, c, d) {
          var e;
          return m.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? m.css(b, c, g) : m.style(b, c, d, g)
        }, b, f ? d : void 0, f, null)
      }
    })
  }), m.fn.size = function() {
    return this.length
  }, m.fn.andSelf = m.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
    return m
  });
  var ec = a.jQuery,
    fc = a.$;
  return m.noConflict = function(b) {
    return a.$ === m && (a.$ = fc), b && a.jQuery === m && (a.jQuery = ec), m
  }, typeof b === K && (a.jQuery = a.$ = m), m
});


var jQuery1113 = jQuery;
jQuery.noConflict(true);


! function(e, t, n) {
  function r(e, t) {
    return typeof e === t
  }

  function o() {
    var e, t, n, o, s, i, a;
    for (var l in g)
      if (g.hasOwnProperty(l)) {
        if (e = [], t = g[l], t.name && (e.push(t.name.toLowerCase()), t.options && t.options.aliases && t.options.aliases.length))
          for (n = 0; n < t.options.aliases.length; n++) e.push(t.options.aliases[n].toLowerCase());
        for (o = r(t.fn, "function") ? t.fn() : t.fn, s = 0; s < e.length; s++) i = e[s], a = i.split("."), 1 === a.length ? w[a[0]] = o : (!w[a[0]] || w[a[0]] instanceof Boolean || (w[a[0]] = new Boolean(w[a[0]])), w[a[0]][a[1]] = o), S.push((o ? "" : "no-") + a.join("-"))
      }
  }

  function s(e) {
    var t = x.className,
      n = w._config.classPrefix || "";
    if (b && (t = t.baseVal), w._config.enableJSClass) {
      var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
      t = t.replace(r, "$1" + n + "js$2")
    }
    w._config.enableClasses && (t += " " + n + e.join(" " + n), b ? x.className.baseVal = t : x.className = t)
  }

  function i(e, t) {
    return !!~("" + e).indexOf(t)
  }

  function a() {
    return "function" != typeof t.createElement ? t.createElement(arguments[0]) : b ? t.createElementNS.call(t, "http://www.w3.org/2000/svg", arguments[0]) : t.createElement.apply(t, arguments)
  }

  function l() {
    var e = t.body;
    return e || (e = a(b ? "svg" : "body"), e.fake = !0), e
  }

  function u(e, n, r, o) {
    var s, i, u, f, d = "modernizr",
      c = a("div"),
      p = l();
    if (parseInt(r, 10))
      for (; r--;) u = a("div"), u.id = o ? o[r] : d + (r + 1), c.appendChild(u);
    return s = a("style"), s.type = "text/css", s.id = "s" + d, (p.fake ? p : c).appendChild(s), p.appendChild(c), s.styleSheet ? s.styleSheet.cssText = e : s.appendChild(t.createTextNode(e)), c.id = d, p.fake && (p.style.background = "", p.style.overflow = "hidden", f = x.style.overflow, x.style.overflow = "hidden", x.appendChild(p)), i = n(c, e), p.fake ? (p.parentNode.removeChild(p), x.style.overflow = f, x.offsetHeight) : c.parentNode.removeChild(c), !!i
  }

  function f(e) {
    return e.replace(/([A-Z])/g, function(e, t) {
      return "-" + t.toLowerCase()
    }).replace(/^ms-/, "-ms-")
  }

  function d(t, r) {
    var o = t.length;
    if ("CSS" in e && "supports" in e.CSS) {
      for (; o--;)
        if (e.CSS.supports(f(t[o]), r)) return !0;
      return !1
    }
    if ("CSSSupportsRule" in e) {
      for (var s = []; o--;) s.push("(" + f(t[o]) + ":" + r + ")");
      return s = s.join(" or "), u("@supports (" + s + ") { #modernizr { position: absolute; } }", function(e) {
        return "absolute" == getComputedStyle(e, null).position
      })
    }
    return n
  }

  function c(e) {
    return e.replace(/([a-z])-([a-z])/g, function(e, t, n) {
      return t + n.toUpperCase()
    }).replace(/^-/, "")
  }

  function p(e, t, o, s) {
    function l() {
      f && (delete N.style, delete N.modElem)
    }
    if (s = r(s, "undefined") ? !1 : s, !r(o, "undefined")) {
      var u = d(e, o);
      if (!r(u, "undefined")) return u
    }
    for (var f, p, m, h, v, y = ["modernizr", "tspan"]; !N.style;) f = !0, N.modElem = a(y.shift()), N.style = N.modElem.style;
    for (m = e.length, p = 0; m > p; p++)
      if (h = e[p], v = N.style[h], i(h, "-") && (h = c(h)), N.style[h] !== n) {
        if (s || r(o, "undefined")) return l(), "pfx" == t ? h : !0;
        try {
          N.style[h] = o
        }
        catch (g) {}
        if (N.style[h] != v) return l(), "pfx" == t ? h : !0
      }
    return l(), !1
  }

  function m(e, t) {
    return function() {
      return e.apply(t, arguments)
    }
  }

  function h(e, t, n) {
    var o;
    for (var s in e)
      if (e[s] in t) return n === !1 ? e[s] : (o = t[e[s]], r(o, "function") ? m(o, n || t) : o);
    return !1
  }

  function v(e, t, n, o, s) {
    var i = e.charAt(0).toUpperCase() + e.slice(1),
      a = (e + " " + T.join(i + " ") + i).split(" ");
    return r(t, "string") || r(t, "undefined") ? p(a, t, o, s) : (a = (e + " " + P.join(i + " ") + i).split(" "), h(a, t, n))
  }

  function y(e, t, r) {
    return v(e, n, n, t, r)
  }
  var g = [],
    C = {
      _version: "3.3.1",
      _config: {
        classPrefix: "",
        enableClasses: !0,
        enableJSClass: !0,
        usePrefixes: !0
      },
      _q: [],
      on: function(e, t) {
        var n = this;
        setTimeout(function() {
          t(n[e])
        }, 0)
      },
      addTest: function(e, t, n) {
        g.push({
          name: e,
          fn: t,
          options: n
        })
      },
      addAsyncTest: function(e) {
        g.push({
          name: null,
          fn: e
        })
      }
    },
    w = function() {};
  w.prototype = C, w = new w;
  var S = [],
    x = t.documentElement,
    b = "svg" === x.nodeName.toLowerCase(),
    _ = "Moz O ms Webkit",
    T = C._config.usePrefixes ? _.split(" ") : [];
  C._cssomPrefixes = T;
  var E = {
    elem: a("modernizr")
  };
  w._q.push(function() {
    delete E.elem
  });
  var N = {
    style: E.elem.style
  };
  w._q.unshift(function() {
    delete N.style
  });
  var P = C._config.usePrefixes ? _.toLowerCase().split(" ") : [];
  C._domPrefixes = P, C.testAllProps = v, C.testAllProps = y, w.addTest("flexbox", y("flexBasis", "1px", !0)), w.addTest("svg", !!t.createElementNS && !!t.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect);
  var z = function() {
    var t = e.matchMedia || e.msMatchMedia;
    return t ? function(e) {
      var n = t(e);
      return n && n.matches || !1
    } : function(t) {
      var n = !1;
      return u("@media " + t + " { #modernizr { position: absolute; } }", function(t) {
        n = "absolute" == (e.getComputedStyle ? e.getComputedStyle(t, null) : t.currentStyle).position
      }), n
    }
  }();
  C.mq = z, w.addTest("mediaqueries", z("only all")), w.addTest("multiplebgs", function() {
    var e = a("a").style;
    return e.cssText = "background:url(https://),url(https://),red url(https://)", /(url\s*\(.*?){3}/.test(e.background)
  }), o(), s(S), delete C.addTest, delete C.addAsyncTest;
  for (var k = 0; k < w._q.length; k++) w._q[k]();
  e.Modernizr = w
}(window, document);


/*! Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with span elements). Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2 */

(function(w) {

  // Enable strict mode
  "use strict";

  w.picturefill = function() {
    var ps = w.document.getElementsByTagName("span");

    // Loop the pictures
    for (var i = 0, il = ps.length; i < il; i++) {
      if (ps[i].getAttribute("data-picture") !== null) {

        var sources = ps[i].getElementsByTagName("span"),
          matches = [];

        // See if which sources match
        for (var j = 0, jl = sources.length; j < jl; j++) {
          var media = sources[j].getAttribute("data-media");
          // if there's no media specified, OR w.matchMedia is supported
          if (!media || (w.matchMedia && w.matchMedia(media).matches)) {
            matches.push(sources[j]);
          }
        }

        // Find any existing img element in the picture element
        var picImg = ps[i].getElementsByTagName("img")[0];

        if (matches.length) {
          var matchedEl = matches.pop();
          if (!picImg || picImg.parentNode.nodeName === "NOSCRIPT") {
            picImg = w.document.createElement("img");
            picImg.alt = ps[i].getAttribute("data-alt");
          }

          picImg.src = matchedEl.getAttribute("data-src");
          matchedEl.appendChild(picImg);
        }
        else if (picImg) {
          picImg.parentNode.removeChild(picImg);
        }
      }
    }
  };

  // Run on resize and domready (w.load as a fallback)
  if (w.addEventListener) {
    w.addEventListener("resize", w.picturefill, false);
    w.addEventListener("DOMContentLoaded", function() {
      w.picturefill();
      // Run once only
      w.removeEventListener("load", w.picturefill, false);
    }, false);
    w.addEventListener("load", w.picturefill, false);
  }
  else if (w.attachEvent) {
    w.attachEvent("onload", w.picturefill);
  }

}(this));


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

  Drupal.behaviors.formalSubmissionToggle = {
    attach: function() {
      // Attach toggle functionality for Have Your Say webform.

      if ($("[data-js*='webform-toggle']").length > 0) {
        var webform_toggle = $("[data-js*='webform-toggle']");

        $(webform_toggle).once('weformToggle', function() {
          var toggled_form_id = $(this).attr('data-toggle');
          var form = document.getElementById(toggled_form_id);
          $(form).hide();

          $(webform_toggle).click(function() {
            var toggled_form_id = $(this).attr('data-toggle');
            var form = document.getElementById(toggled_form_id);

            $(this).parent().hide();
            $(form).show();
            $('input', form).first().focus();
          });
        });
      }

      $('#formal-submission-webform #webform-client-form-15 input[id*="remain-anonymous"]').change(function() {
        $('#formal-submission-webform #webform-client-form-15 input[id*="private-submission"]')
          .attr('checked', false);
        if ($(this).is(":checked")) {
          $('#formal-submission-webform #webform-client-form-15 input[id*="hys-formal-your-name"]')
            .val('Anonymous')
            .attr('readonly', true);
        }
        else {
          $('#formal-submission-webform #webform-client-form-15 input[id*="hys-formal-your-name"]')
            .val('')
            .attr('readonly', false);
        }
      });
      $('#formal-submission-webform #webform-client-form-15 input[id*="private-submission"]').change(function() {
        $('#formal-submission-webform #webform-client-form-15 input[id*="remain-anonymous"]')
          .attr('checked', false);
        if ($(this).is(":checked")) {
          $('#formal-submission-webform #webform-client-form-15 input[id*="hys-formal-your-name"]')
            .val('Not required - private submission')
            .attr('readonly', true);
        }
        else {
          $('#formal-submission-webform #webform-client-form-15 input[id*="hys-formal-your-name"]')
            .val('')
            .attr('readonly', false);
        }
      });
    }
  };

  Drupal.behaviors.formalSubmissionValidation = {
    attach: function(context) {
      var fileUploadsEnabled = Drupal.settings.doca_theme.fileUploadsEnabled;
      var shortCommentsEnabled = Drupal.settings.doca_theme.shortCommentsEnabled;
      var message = 'It looks like you haven\'t added a submission. Please add a submission to have your say.';
      var shortCommentSelector = 'textarea[name$="[short_comments]"]';
      var firstFileSelector = 'input[name$="formal_uploads_hys_formal_upload_file_1]"]';
      var submittedFileSelector = 'div[id$="formal-uploads-hys-formal-upload-file-1-upload"] > .file';
      var $forms = $('#webform-client-form-15', context);

      $forms.each(function(index, item) {
        var $form = $(item);
        if (fileUploadsEnabled && !shortCommentsEnabled) {
          $form.find(firstFileSelector).attr('required', 'true');
        }
        else if (shortCommentsEnabled && !fileUploadsEnabled) {
          $form.find(shortCommentSelector).attr('required', 'true');
        }
        else if (shortCommentsEnabled && fileUploadsEnabled) {
          $form.find('.webform-submit').unbind('click.formalSubmissionValidation').bind('click.formalSubmissionValidation', function(o) {
            $form.find('.custom-message').remove();
            // Get fields
            var $filesInput = $form.find(firstFileSelector);
            var $filesSubmitted = $form.find(submittedFileSelector);
            var $shortDescription = $form.find(shortCommentSelector).val();
            var pass = false;
            var has_file = ($filesInput.length > 0 && $filesInput[0].value.length > 0) || $filesSubmitted.length > 0;

            try {
              // Check for at least one field to be populated
              if ($shortDescription.length > 0 || has_file) {
                pass = true;
              }
              if (!pass) {
                // Show error message
                $form.find('.webform-component--step-1-your-submission > .fieldset-wrapper').each(function() {
                  $(this).prepend('<div class="messages--error messages error custom-message">' + message + '</div>');
                  $(window).scrollTop($('.custom-message').position().top);
                });
              }
            }
            catch (e) {
              console.log('An error occured validating form. Allowing to pass. ' + e);
              pass = true;
            }
            return pass;
          });
        }
      });

    }
  };

  Drupal.behaviors.submissionCommentDisplay = {
    attach: function(context) {
      var is_mobile = null;
      var $window = $(window);
      var medium_breakpoint = 720 - 15;
      var accordion = '.document-list__inner--comment';
      var comment_toolbar = '.document-list__comment--comment-docs';
      var accordion_head = '.document-list__comment--comment-link';
      var accordion_body = '.document-list__desc--comment';

      // Set up toggle click
      $(accordion_head, context).bind('click', function() {
        $(this).toggleClass('link-open');
        $(this).closest(accordion).find(accordion_body).toggle();
      });
      // Set up mobile switch
      function windowResize() {
        // 720 - 15px for scrollbar
        if ($window.width() < medium_breakpoint) {
          if (!is_mobile || is_mobile === null) {
            $(accordion_body, context).each(function() {
              var acc_head = $(this).closest(accordion).find(accordion_head);
              $(this).insertAfter(acc_head);
            });
            is_mobile = true;
          }
        }
        else {
          if (is_mobile || is_mobile === null) {
            $(accordion_body, context).each(function() {
              var comm_toolbar = $(this).closest(accordion).find(comment_toolbar);
              $(this).insertAfter(comm_toolbar);
            });
            is_mobile = false;
          }
        }
      }
      $window.resize(windowResize);
      windowResize();
    }
  };

  Drupal.behaviors.uploadMultipleSubmissions = {
    attach: function(context) {
      // Attach toggle functionality for Have Your Say webform.
      $('fieldset[class*="--hys-formal-uploads"]', context).each(function() {

        var $parent = $(this);
        var $files = $parent.children('.fieldset-wrapper').children('div[id*="hys-formal-upload-file-"]');

        function refreshSubmissionView() {
          var currentFileSlot = 0;
          var fileSlots = [];

          $files.each(function(index, item) {
            var $file = $(item).find('input');
            fileSlots.push($file);
            // Find current file slot
            if ($file[0].value !== undefined && $file[0].value.length > 0) {
              currentFileSlot++;
            }
          });

          // Hide unused
          $files.hide();

          for (var i = 0; i < (currentFileSlot + 1); i++) {
            if (fileSlots[i] !== undefined) {
              fileSlots[i].parent().parent().parent().show();
            }
          }
        }
        $files.unbind('change.multi_submission').bind('change.multi_submission', refreshSubmissionView);
        refreshSubmissionView();
      });
    }
  };

  Drupal.behaviors.shortCommentMaxLength = {
    attach: function(context) {
      var maxLengthHandler = function(e) {
        var target = e.target;
        if (target.value.length > 500) {
          target.value = target.value.substring(0, 500);
        }
      };

      $('textarea[name="submitted[step_1_your_submission][short_comments]"]')
        .attr('maxlength', 500)
        .keyup(maxLengthHandler)
        .keydown(maxLengthHandler);
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

})(jQuery, Drupal);


(function($) {
  Drupal.behaviors.stacklaPane = {
    attach: function(context, settings) {
      $(window).load(function() {
        (function(d, id) {
          if (d.getElementById(id)) {
            return;
          }
          var t = d.createElement('script');
          t.type = 'text/javascript';
          t.src = '//stackla-widget.s3.amazonaws.com/media/js/widget/fluid-embed.js';
          t.id = id;
          (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(t);
        }(document, 'stacklafw-js'));
      });
    }
  };
})(jQuery);


/*! Tablesaw - v1.0.4 - 2015-02-19
 * https://github.com/filamentgroup/tablesaw
 * Copyright (c) 2015 Filament Group; Licensed MIT */
;
(function($) {
  var div = document.createElement('div'),
    all = div.getElementsByTagName('i'),
    $doc = $(document.documentElement);

  div.innerHTML = '<!--[if lte IE 8]><i></i><![endif]-->';
  if (all[0]) {
    $doc.addClass('ie-lte8');
  }

  // Cut the mustard
  if (!('querySelector' in document) ||
    (window.blackberry && !window.WebKitPoint) ||
    window.operamini) {
    return;
  }
  else {
    $doc.addClass('tablesaw-enhanced');

    // DOM-ready auto-init of plugins.
    // Many plugins bind to an "enhance" event to init themselves on dom ready, or when new markup is inserted into the DOM
    $(function() {
      $(document).trigger("enhance.tablesaw");
    });
  }

})(jQuery);
/*
 * tablesaw: A set of plugins for responsive tables
 * Stack and Column Toggle tables
 * Copyright (c) 2013 Filament Group, Inc.
 * MIT License
 */

if (typeof Tablesaw === "undefined") {
  Tablesaw = {
    i18n: {
      modes: ['Stack', 'Swipe', 'Toggle'],
      columns: 'Col<span class=\"a11y-sm\">umn</span>s',
      columnBtnText: 'Columns',
      columnsDialogError: 'No eligible columns.',
      sort: 'Sort'
    }
  };
}
if (!Tablesaw.config) {
  Tablesaw.config = {};
}

;
(function($) {
  var pluginName = "table",
    classes = {
      toolbar: "tablesaw-bar"
    },
    events = {
      create: "tablesawcreate",
      destroy: "tablesawdestroy",
      refresh: "tablesawrefresh"
    },
    defaultMode = "stack",
    initSelector = "table[data-tablesaw-mode],table[data-tablesaw-sortable]";

  var Table = function(element) {
    if (!element) {
      throw new Error("Tablesaw requires an element.");
    }

    this.table = element;
    this.$table = $(element);

    this.mode = this.$table.attr("data-tablesaw-mode") || defaultMode;

    this.init();
  };

  Table.prototype.init = function() {
    // assign an id if there is none
    if (!this.$table.attr("id")) {
      this.$table.attr("id", pluginName + "-" + Math.round(Math.random() * 10000));
    }

    this.createToolbar();

    var colstart = this._initCells();

    this.$table.trigger(events.create, [this, colstart]);
  };

  Table.prototype._initCells = function() {
    var colstart,
      thrs = this.table.querySelectorAll("thead tr"),
      self = this;

    $(thrs).each(function() {
      var coltally = 0;

      $(this).children().each(function() {
        var span = parseInt(this.getAttribute("colspan"), 10),
          sel = ":nth-child(" + (coltally + 1) + ")";

        colstart = coltally + 1;

        if (span) {
          for (var k = 0; k < span - 1; k++) {
            coltally++;
            sel += ", :nth-child(" + (coltally + 1) + ")";
          }
        }

        // Store "cells" data on header as a reference to all cells in the same column as this TH
        this.cells = self.$table.find("tr").not($(thrs).eq(0)).not(this).children(sel);
        coltally++;
      });
    });

    return colstart;
  };

  Table.prototype.refresh = function() {
    this._initCells();

    this.$table.trigger(events.refresh);
  };

  Table.prototype.createToolbar = function() {
    // Insert the toolbar
    // TODO move this into a separate component
    var $toolbar = this.$table.prev('.' + classes.toolbar);
    if (!$toolbar.length) {
      $toolbar = $('<div>')
        .addClass(classes.toolbar)
        .insertBefore(this.$table);
    }
    this.$toolbar = $toolbar;

    if (this.mode) {
      this.$toolbar.addClass('mode-' + this.mode);
    }
  };

  Table.prototype.destroy = function() {
    // Don’t remove the toolbar. Some of the table features are not yet destroy-friendly.
    this.$table.prev('.' + classes.toolbar).each(function() {
      this.className = this.className.replace(/\bmode\-\w*\b/gi, '');
    });

    var tableId = this.$table.attr('id');
    $(document).unbind("." + tableId);
    $(window).unbind("." + tableId);

    // other plugins
    this.$table.trigger(events.destroy, [this]);

    this.$table.removeAttr('data-tablesaw-mode');

    this.$table.removeData(pluginName);
  };

  // Collection method.
  $.fn[pluginName] = function() {
    return this.each(function() {
      var $t = $(this);

      if ($t.data(pluginName)) {
        return;
      }

      var table = new Table(this);
      $t.data(pluginName, table);
    });
  };

  $(document).on("enhance.tablesaw", function(e) {
    $(e.target).find(initSelector)[pluginName]();
  });

}(jQuery));

;
(function(win, $, undefined) {

  var classes = {
    stackTable: 'tablesaw-stack',
    cellLabels: 'tablesaw-cell-label',
    cellContentLabels: 'tablesaw-cell-content'
  };

  var data = {
    obj: 'tablesaw-stack'
  };

  var attrs = {
    labelless: 'data-tablesaw-no-labels',
    hideempty: 'data-tablesaw-hide-empty'
  };

  var Stack = function(element) {

    this.$table = $(element);

    this.labelless = this.$table.is('[' + attrs.labelless + ']');
    this.hideempty = this.$table.is('[' + attrs.hideempty + ']');

    if (!this.labelless) {
      // allHeaders references headers, plus all THs in the thead, which may include several rows, or not
      this.allHeaders = this.$table.find("th");
    }

    this.$table.data(data.obj, this);
  };

  Stack.prototype.init = function(colstart) {
    this.$table.addClass(classes.stackTable);

    if (this.labelless) {
      return;
    }

    // get headers in reverse order so that top-level headers are appended last
    var reverseHeaders = $(this.allHeaders);
    var hideempty = this.hideempty;

    // create the hide/show toggles
    reverseHeaders.each(function() {
      var $t = $(this),
        $cells = $(this.cells).filter(function() {
          return !$(this).parent().is("[" + attrs.labelless + "]") && (!hideempty || !$(this).is(":empty"));
        }),
        hierarchyClass = $cells.not(this).filter("thead th").length && " tablesaw-cell-label-top",
        // TODO reduce coupling with sortable
        $sortableButton = $t.find(".tablesaw-sortable-btn"),
        html = $sortableButton.length ? $sortableButton.html() : $t.html();

      if (html !== "") {
        if (hierarchyClass) {
          var iteration = parseInt($(this).attr("colspan"), 10),
            filter = "";

          if (iteration) {
            filter = "td:nth-child(" + iteration + "n + " + (colstart) + ")";
          }
          $cells.filter(filter).prepend("<b class='" + classes.cellLabels + hierarchyClass + "'>" + html + "</b>");
        }
        else {
          $cells.wrapInner("<span class='" + classes.cellContentLabels + "'></span>");
          $cells.prepend("<b class='" + classes.cellLabels + "'>" + html + "</b>");
        }
      }
    });
  };

  Stack.prototype.destroy = function() {
    this.$table.removeClass(classes.stackTable);
    this.$table.find('.' + classes.cellLabels).remove();
    this.$table.find('.' + classes.cellContentLabels).each(function() {
      $(this).replaceWith(this.childNodes);
    });
  };

  // on tablecreate, init
  $(document).on("tablesawcreate", function(e, Tablesaw, colstart) {
    if (Tablesaw.mode === 'stack') {
      var table = new Stack(Tablesaw.table);
      table.init(colstart);
    }

  });

  $(document).on("tablesawdestroy", function(e, Tablesaw) {

    if (Tablesaw.mode === 'stack') {
      $(Tablesaw.table).data(data.obj).destroy();
    }

  });

}(this, jQuery));;
(function($) {
  var pluginName = "tablesawbtn",
    initSelector = ".btn",
    methods = {
      _create: function() {
        return $(this).each(function() {
          $(this)
            .trigger("beforecreate." + pluginName)[pluginName]("_init")
            .trigger("create." + pluginName);
        });
      },
      _init: function() {
        var oEl = $(this),
          sel = this.getElementsByTagName("select")[0];

        if (sel) {
          $(this)
            .addClass("btn-select")[pluginName]("_select", sel);
        }
        return oEl;
      },
      _select: function(sel) {
        var update = function(oEl, sel) {
          var opts = $(sel).find("option"),
            label, el, children;

          opts.each(function() {
            var opt = this;
            if (opt.selected) {
              label = document.createTextNode(opt.text);
            }
          });

          children = oEl.childNodes;
          if (opts.length > 0) {
            for (var i = 0, l = children.length; i < l; i++) {
              el = children[i];

              if (el && el.nodeType === 3) {
                oEl.replaceChild(label, el);
              }
            }
          }
        };

        update(this, sel);
        $(this).bind("change refresh", function() {
          update(this, sel);
        });
      }
    };

  // Collection method.
  $.fn[pluginName] = function(arrg, a, b, c) {
    return this.each(function() {

      // if it's a method
      if (arrg && typeof(arrg) === "string") {
        return $.fn[pluginName].prototype[arrg].call(this, a, b, c);
      }

      // don't re-init
      if ($(this).data(pluginName + "active")) {
        return $(this);
      }

      // otherwise, init

      $(this).data(pluginName + "active", true);
      $.fn[pluginName].prototype._create.call(this);
    });
  };

  // add methods
  $.extend($.fn[pluginName].prototype, methods);

  $(document).on("enhance", function(e) {
    $(initSelector, e.target)[pluginName]();
  });

}(jQuery));;
(function(win, $, undefined) {

  var ColumnToggle = function(element) {

    this.$table = $(element);

    this.classes = {
      columnToggleTable: 'tablesaw-columntoggle',
      columnBtnContain: 'tablesaw-columntoggle-btnwrap tablesaw-advance',
      columnBtn: 'tablesaw-columntoggle-btn tablesaw-nav-btn down',
      popup: 'tablesaw-columntoggle-popup',
      priorityPrefix: 'tablesaw-priority-',
      // TODO duplicate class, also in tables.js
      toolbar: 'tablesaw-bar'
    };

    // Expose headers and allHeaders properties on the widget
    // headers references the THs within the first TR in the table
    this.headers = this.$table.find('tr:first > th');

    this.$table.data('tablesaw-coltoggle', this);
  };

  ColumnToggle.prototype.init = function() {

    var tableId,
      id,
      $menuButton,
      $popup,
      $menu,
      $btnContain,
      self = this;

    this.$table.addClass(this.classes.columnToggleTable);

    tableId = this.$table.attr("id");
    id = tableId + "-popup";
    $btnContain = $("<div class='" + this.classes.columnBtnContain + "'></div>");
    $menuButton = $("<a href='#" + id + "' class='btn btn-micro " + this.classes.columnBtn + "' data-popup-link>" +
      "<span>" + Tablesaw.i18n.columnBtnText + "</span></a>");
    $popup = $("<div class='dialog-table-coltoggle " + this.classes.popup + "' id='" + id + "'></div>");
    $menu = $("<div class='btn-group'></div>");

    var hasNonPersistentHeaders = false;
    $(this.headers).not("td").each(function() {
      var $this = $(this),
        priority = $this.attr("data-tablesaw-priority"),
        $cells = $this.add(this.cells);

      if (priority && priority !== "persist") {
        $cells.addClass(self.classes.priorityPrefix + priority);

        $("<label><input type='checkbox' checked>" + $this.text() + "</label>")
          .appendTo($menu)
          .children(0)
          .data("cells", $cells);

        hasNonPersistentHeaders = true;
      }
    });

    if (!hasNonPersistentHeaders) {
      $menu.append('<label>' + Tablesaw.i18n.columnsDialogError + '</label>');
    }

    $menu.appendTo($popup);

    // bind change event listeners to inputs - TODO: move to a private method?
    $menu.find('input[type="checkbox"]').on("change", function(e) {
      var checked = e.target.checked;

      $(e.target).data("cells")
        .toggleClass("tablesaw-cell-hidden", !checked)
        .toggleClass("tablesaw-cell-visible", checked);

      self.$table.trigger('tablesawcolumns');
    });

    $menuButton.appendTo($btnContain);
    $btnContain.appendTo(this.$table.prev('.' + this.classes.toolbar));

    var closeTimeout;

    function openPopup() {
      $btnContain.addClass('visible');
      $menuButton.removeClass('down').addClass('up');

      $(document).unbind('click.' + tableId, closePopup);

      window.clearTimeout(closeTimeout);
      closeTimeout = window.setTimeout(function() {
        $(document).one('click.' + tableId, closePopup);
      }, 15);
    }

    function closePopup(event) {
      // Click came from inside the popup, ignore.
      if (event && $(event.target).closest("." + self.classes.popup).length) {
        return;
      }

      $(document).unbind('click.' + tableId);
      $menuButton.removeClass('up').addClass('down');
      $btnContain.removeClass('visible');
    }

    $menuButton.on("click.tablesaw", function(event) {
      event.preventDefault();

      if (!$btnContain.is(".visible")) {
        openPopup();
      }
      else {
        closePopup();
      }
    });

    $popup.appendTo($btnContain);

    this.$menu = $menu;

    $(window).on("resize." + tableId, function() {
      self.refreshToggle();
    });

    this.refreshToggle();
  };

  ColumnToggle.prototype.refreshToggle = function() {
    this.$menu.find("input").each(function() {
      var $this = $(this);

      this.checked = $this.data("cells").eq(0).css("display") === "table-cell";
    });
  };

  ColumnToggle.prototype.refreshPriority = function() {
    var self = this;
    $(this.headers).not("td").each(function() {
      var $this = $(this),
        priority = $this.attr("data-tablesaw-priority"),
        $cells = $this.add(this.cells);

      if (priority && priority !== "persist") {
        $cells.addClass(self.classes.priorityPrefix + priority);
      }
    });
  };

  ColumnToggle.prototype.destroy = function() {
    // table toolbars, document and window .tableId events
    // removed in parent tables.js destroy method

    this.$table.removeClass(this.classes.columnToggleTable);
    this.$table.find('th, td').each(function() {
      var $cell = $(this);
      $cell.removeClass('tablesaw-cell-hidden')
        .removeClass('tablesaw-cell-visible');

      this.className = this.className.replace(/\bui\-table\-priority\-\d\b/g, '');
    });
  };

  // on tablecreate, init
  $(document).on("tablesawcreate", function(e, Tablesaw) {

    if (Tablesaw.mode === 'columntoggle') {
      var table = new ColumnToggle(Tablesaw.table);
      table.init();
    }

  });

  $(document).on("tablesawdestroy", function(e, Tablesaw) {
    if (Tablesaw.mode === 'columntoggle') {
      $(Tablesaw.table).data('tablesaw-coltoggle').destroy();
    }
  });

}(this, jQuery));;
(function(win, $, undefined) {

  $.extend(Tablesaw.config, {
    swipe: {
      horizontalThreshold: 15,
      verticalThreshold: 30
    }
  });

  function createSwipeTable($table) {

    var $btns = $("<div class='tablesaw-advance'></div>"),
      $prevBtn = $("<a href='#' class='tablesaw-nav-btn btn btn-micro left' title='Previous Column'></a>").appendTo($btns),
      $nextBtn = $("<a href='#' class='tablesaw-nav-btn btn btn-micro right' title='Next Column'></a>").appendTo($btns),
      hideBtn = 'disabled',
      persistWidths = 'tablesaw-fix-persist',
      $headerCells = $table.find("thead th"),
      $headerCellsNoPersist = $headerCells.not('[data-tablesaw-priority="persist"]'),
      headerWidths = [],
      $head = $(document.head || 'head'),
      tableId = $table.attr('id'),
      // TODO switch this to an nth-child feature test
      isIE8 = $('html').is('.ie-lte8');

    if (!$headerCells.length) {
      throw new Error("tablesaw swipe: no header cells found. Are you using <th> inside of <thead>?");
    }

    // Calculate initial widths
    $table.css('width', 'auto');
    $headerCells.each(function() {
      headerWidths.push($(this).outerWidth());
    });
    $table.css('width', '');

    $btns.appendTo($table.prev('.tablesaw-bar'));

    $table.addClass("tablesaw-swipe");

    if (!tableId) {
      tableId = 'tableswipe-' + Math.round(Math.random() * 10000);
      $table.attr('id', tableId);
    }

    function $getCells(headerCell) {
      return $(headerCell.cells).add(headerCell);
    }

    function showColumn(headerCell) {
      $getCells(headerCell).removeClass('tablesaw-cell-hidden');
    }

    function hideColumn(headerCell) {
      $getCells(headerCell).addClass('tablesaw-cell-hidden');
    }

    function persistColumn(headerCell) {
      $getCells(headerCell).addClass('tablesaw-cell-persist');
    }

    function isPersistent(headerCell) {
      return $(headerCell).is('[data-tablesaw-priority="persist"]');
    }

    function unmaintainWidths() {
      $table.removeClass(persistWidths);
      $('#' + tableId + '-persist').remove();
    }

    function maintainWidths() {
      var prefix = '#' + tableId + '.tablesaw-swipe ',
        styles = [],
        tableWidth = $table.width(),
        hash = [],
        newHash;

      $headerCells.each(function(index) {
        var width;
        if (isPersistent(this)) {
          width = $(this).outerWidth();

          // Only save width on non-greedy columns (take up less than 75% of table width)
          if (width < tableWidth * 0.75) {
            hash.push(index + '-' + width);
            styles.push(prefix + ' .tablesaw-cell-persist:nth-child(' + (index + 1) + ') { width: ' + width + 'px; }');
          }
        }
      });
      newHash = hash.join('_');

      $table.addClass(persistWidths);

      var $style = $('#' + tableId + '-persist');
      // If style element not yet added OR if the widths have changed
      if (!$style.length || $style.data('hash') !== newHash) {
        // Remove existing
        $style.remove();

        if (styles.length) {
          $('<style>' + styles.join("\n") + '</style>')
            .attr('id', tableId + '-persist')
            .data('hash', newHash)
            .appendTo($head);
        }
      }
    }

    function getNext() {
      var next = [],
        checkFound;

      $headerCellsNoPersist.each(function(i) {
        var $t = $(this),
          isHidden = $t.css("display") === "none" || $t.is(".tablesaw-cell-hidden");

        if (!isHidden && !checkFound) {
          checkFound = true;
          next[0] = i;
        }
        else if (isHidden && checkFound) {
          next[1] = i;

          return false;
        }
      });

      return next;
    }

    function getPrev() {
      var next = getNext();
      return [next[1] - 1, next[0] - 1];
    }

    function nextpair(fwd) {
      return fwd ? getNext() : getPrev();
    }

    function canAdvance(pair) {
      return pair[1] > -1 && pair[1] < $headerCellsNoPersist.length;
    }

    function matchesMedia() {
      var matchMedia = $table.attr("data-tablesaw-swipe-media");
      return !matchMedia || ("matchMedia" in win) && win.matchMedia(matchMedia).matches;
    }

    function fakeBreakpoints() {
      if (!matchesMedia()) {
        return;
      }

      var extraPaddingPixels = 20,
        containerWidth = $table.parent().width(),
        persist = [],
        sum = 0,
        sums = [],
        visibleNonPersistantCount = $headerCells.length;

      $headerCells.each(function(index) {
        var $t = $(this),
          isPersist = $t.is('[data-tablesaw-priority="persist"]');

        persist.push(isPersist);

        sum += headerWidths[index] + (isPersist ? 0 : extraPaddingPixels);
        sums.push(sum);

        // is persistent or is hidden
        if (isPersist || sum > containerWidth) {
          visibleNonPersistantCount--;
        }
      });

      var needsNonPersistentColumn = visibleNonPersistantCount === 0;

      $headerCells.each(function(index) {
        if (persist[index]) {

          // for visual box-shadow
          persistColumn(this);
          return;
        }

        if (sums[index] <= containerWidth || needsNonPersistentColumn) {
          needsNonPersistentColumn = false;
          showColumn(this);
        }
        else {
          hideColumn(this);
        }
      });

      if (!isIE8) {
        unmaintainWidths();
      }
      $table.trigger('tablesawcolumns');
    }

    function advance(fwd) {
      var pair = nextpair(fwd);
      if (canAdvance(pair)) {
        if (isNaN(pair[0])) {
          if (fwd) {
            pair[0] = 0;
          }
          else {
            pair[0] = $headerCellsNoPersist.length - 1;
          }
        }

        if (!isIE8) {
          maintainWidths();
        }

        hideColumn($headerCellsNoPersist.get(pair[0]));
        showColumn($headerCellsNoPersist.get(pair[1]));

        $table.trigger('tablesawcolumns');
      }
    }

    $prevBtn.add($nextBtn).click(function(e) {
      advance(!!$(e.target).closest($nextBtn).length);
      e.preventDefault();
    });

    function getCoord(event, key) {
      return (event.touches || event.originalEvent.touches)[0][key];
    }

    $table
      .bind("touchstart.swipetoggle", function(e) {
        var originX = getCoord(e, 'pageX'),
          originY = getCoord(e, 'pageY'),
          x,
          y;

        $(win).off("resize", fakeBreakpoints);

        $(this)
          .bind("touchmove", function(e) {
            x = getCoord(e, 'pageX');
            y = getCoord(e, 'pageY');
            var cfg = Tablesaw.config.swipe;
            if (Math.abs(x - originX) > cfg.horizontalThreshold && Math.abs(y - originY) < cfg.verticalThreshold) {
              e.preventDefault();
            }
          })
          .bind("touchend.swipetoggle", function() {
            var cfg = Tablesaw.config.swipe;
            if (Math.abs(y - originY) < cfg.verticalThreshold) {
              if (x - originX < -1 * cfg.horizontalThreshold) {
                advance(true);
              }
              if (x - originX > cfg.horizontalThreshold) {
                advance(false);
              }
            }

            window.setTimeout(function() {
              $(win).on("resize", fakeBreakpoints);
            }, 300);
            $(this).unbind("touchmove touchend");
          });

      })
      .bind("tablesawcolumns.swipetoggle", function() {
        $prevBtn[canAdvance(getPrev()) ? "removeClass" : "addClass"](hideBtn);
        $nextBtn[canAdvance(getNext()) ? "removeClass" : "addClass"](hideBtn);
      })
      .bind("tablesawnext.swipetoggle", function() {
        advance(true);
      })
      .bind("tablesawprev.swipetoggle", function() {
        advance(false);
      })
      .bind("tablesawdestroy.swipetoggle", function() {
        var $t = $(this);

        $t.removeClass('tablesaw-swipe');
        $t.prev('.tablesaw-bar').find('.tablesaw-advance').remove();
        $(win).off("resize", fakeBreakpoints);

        $t.unbind(".swipetoggle");
      });

    fakeBreakpoints();
    $(win).on("resize", fakeBreakpoints);
  }



  // on tablecreate, init
  $(document).on("tablesawcreate", function(e, Tablesaw) {

    if (Tablesaw.mode === 'swipe') {
      createSwipeTable(Tablesaw.$table);
    }

  });

}(this, jQuery));

;
(function($) {
  function getSortValue(cell) {
    return $.map(cell.childNodes, function(el) {
      var $el = $(el);
      if ($el.is('input, select')) {
        return $el.val();
      }
      else if ($el.hasClass('tablesaw-cell-label')) {
        return;
      }
      return $.trim($el.text());
    }).join('');
  }

  var pluginName = "tablesaw-sortable",
    initSelector = "table[data-" + pluginName + "]",
    sortableSwitchSelector = "[data-" + pluginName + "-switch]",
    attrs = {
      defaultCol: "data-tablesaw-sortable-default-col"
    },
    classes = {
      head: pluginName + "-head",
      ascend: pluginName + "-ascending",
      descend: pluginName + "-descending",
      switcher: pluginName + "-switch",
      tableToolbar: 'tablesaw-toolbar',
      sortButton: pluginName + "-btn"
    },
    methods = {
      _create: function(o) {
        return $(this).each(function() {
          var init = $(this).data("init" + pluginName);
          if (init) {
            return false;
          }
          $(this)
            .data("init" + pluginName, true)
            .trigger("beforecreate." + pluginName)[pluginName]("_init", o)
            .trigger("create." + pluginName);
        });
      },
      _init: function() {
        var el = $(this),
          heads,
          $switcher;

        var addClassToTable = function() {
            el.addClass(pluginName);
          },
          addClassToHeads = function(h) {
            $.each(h, function(i, v) {
              $(v).addClass(classes.head);
            });
          },
          makeHeadsActionable = function(h, fn) {
            $.each(h, function(i, v) {
              var b = $("<button class='" + classes.sortButton + "'/>");
              b.bind("click", {
                col: v
              }, fn);
              $(v).wrapInner(b);
            });
          },
          clearOthers = function(sibs) {
            $.each(sibs, function(i, v) {
              var col = $(v);
              col.removeAttr(attrs.defaultCol);
              col.removeClass(classes.ascend);
              col.removeClass(classes.descend);
            });
          },
          headsOnAction = function(e) {
            if ($(e.target).is('a[href]')) {
              return;
            }

            e.stopPropagation();
            var head = $(this).parent(),
              v = e.data.col,
              newSortValue = heads.index(head);

            clearOthers(head.siblings());
            if (head.hasClass(classes.descend)) {
              el[pluginName]("sortBy", v, true);
              newSortValue += '_asc';
            }
            else {
              el[pluginName]("sortBy", v);
              newSortValue += '_desc';
            }
            if ($switcher) {
              $switcher.find('select').val(newSortValue).trigger('refresh');
            }

            e.preventDefault();
          },
          handleDefault = function(heads) {
            $.each(heads, function(idx, el) {
              var $el = $(el);
              if ($el.is("[" + attrs.defaultCol + "]")) {
                if (!$el.hasClass(classes.descend)) {
                  $el.addClass(classes.ascend);
                }
              }
            });
          },
          addSwitcher = function(heads) {
            $switcher = $('<div>').addClass(classes.switcher).addClass(classes.tableToolbar).html(function() {
              var html = ['<label>' + Tablesaw.i18n.sort + ':'];

              html.push('<span class="btn btn-small">&#160;<select>');
              heads.each(function(j) {
                var $t = $(this),
                  isDefaultCol = $t.is("[" + attrs.defaultCol + "]"),
                  isDescending = $t.hasClass(classes.descend),
                  isNumeric = false;

                // Check only the first three rows to see if the column is numbers.
                $(this.cells).slice(0, 3).each(function() {
                  if (!isNaN(parseInt(getSortValue(this), 10))) {
                    isNumeric = true;
                    return false;
                  }
                });

                html.push('<option' + (isDefaultCol && !isDescending ? ' selected' : '') + ' value="' + j + '_asc">' + $t.text() + ' ' + (isNumeric ? '↑' : '(A-Z)') + '</option>');
                html.push('<option' + (isDefaultCol && isDescending ? ' selected' : '') + ' value="' + j + '_desc">' + $t.text() + ' ' + (isNumeric ? '↓' : '(Z-A)') + '</option>');
              });
              html.push('</select></span></label>');

              return html.join('');
            });

            var $toolbar = el.prev('.tablesaw-bar'),
              $firstChild = $toolbar.children().eq(0);

            if ($firstChild.length) {
              $switcher.insertBefore($firstChild);
            }
            else {
              $switcher.appendTo($toolbar);
            }
            $switcher.find('.btn').tablesawbtn();
            $switcher.find('select').on('change', function() {
              var val = $(this).val().split('_'),
                head = heads.eq(val[0]);

              clearOthers(head.siblings());
              el[pluginName]('sortBy', head.get(0), val[1] === 'asc');
            });
          };

        addClassToTable();
        heads = el.find("thead th[data-" + pluginName + "-col]");
        addClassToHeads(heads);
        makeHeadsActionable(heads, headsOnAction);
        handleDefault(heads);

        if (el.is(sortableSwitchSelector)) {
          addSwitcher(heads, el.find('tbody tr:nth-child(-n+3)'));
        }
      },
      getColumnNumber: function(col) {
        return $(col).prevAll().length;
      },
      getTableRows: function() {
        return $(this).find("tbody tr");
      },
      sortRows: function(rows, colNum, ascending, col) {
        var cells, fn, sorted;
        var getCells = function(rows) {
            var cells = [];
            $.each(rows, function(i, r) {
              cells.push({
                cell: getSortValue($(r).children().get(colNum)),
                rowNum: i
              });
            });
            return cells;
          },
          getSortFxn = function(ascending, forceNumeric) {
            var fn,
              regex = /[^\-\+\d\.]/g;
            if (ascending) {
              fn = function(a, b) {
                if (forceNumeric || !isNaN(parseFloat(a.cell))) {
                  return parseFloat(a.cell.replace(regex, '')) - parseFloat(b.cell.replace(regex, ''));
                }
                else {
                  return a.cell.toLowerCase() > b.cell.toLowerCase() ? 1 : -1;
                }
              };
            }
            else {
              fn = function(a, b) {
                if (forceNumeric || !isNaN(parseFloat(a.cell))) {
                  return parseFloat(b.cell.replace(regex, '')) - parseFloat(a.cell.replace(regex, ''));
                }
                else {
                  return a.cell.toLowerCase() < b.cell.toLowerCase() ? 1 : -1;
                }
              };
            }
            return fn;
          },
          applyToRows = function(sorted, rows) {
            var newRows = [],
              i, l, cur;
            for (i = 0, l = sorted.length; i < l; i++) {
              cur = sorted[i].rowNum;
              newRows.push(rows[cur]);
            }
            return newRows;
          };

        cells = getCells(rows);
        var customFn = $(col).data('tablesaw-sort');
        fn = (customFn && typeof customFn === "function" ? customFn(ascending) : false) ||
          getSortFxn(ascending, $(col).is('[data-sortable-numeric]'));
        sorted = cells.sort(fn);
        rows = applyToRows(sorted, rows);
        return rows;
      },
      replaceTableRows: function(rows) {
        var el = $(this),
          body = el.find("tbody");
        body.html(rows);
      },
      makeColDefault: function(col, a) {
        var c = $(col);
        c.attr(attrs.defaultCol, "true");
        if (a) {
          c.removeClass(classes.descend);
          c.addClass(classes.ascend);
        }
        else {
          c.removeClass(classes.ascend);
          c.addClass(classes.descend);
        }
      },
      sortBy: function(col, ascending) {
        var el = $(this),
          colNum, rows;

        colNum = el[pluginName]("getColumnNumber", col);
        rows = el[pluginName]("getTableRows");
        rows = el[pluginName]("sortRows", rows, colNum, ascending, col);
        el[pluginName]("replaceTableRows", rows);
        el[pluginName]("makeColDefault", col, ascending);
      }
    };

  // Collection method.
  $.fn[pluginName] = function(arrg) {
    var args = Array.prototype.slice.call(arguments, 1),
      returnVal;

    // if it's a method
    if (arrg && typeof(arrg) === "string") {
      returnVal = $.fn[pluginName].prototype[arrg].apply(this[0], args);
      return (typeof returnVal !== "undefined") ? returnVal : $(this);
    }
    // check init
    if (!$(this).data(pluginName + "data")) {
      $(this).data(pluginName + "active", true);
      $.fn[pluginName].prototype._create.call(this, arrg);
    }
    return $(this);
  };
  // add methods
  $.extend($.fn[pluginName].prototype, methods);

  $(document).on("tablesawcreate", function(e, Tablesaw) {
    if (Tablesaw.$table.is(initSelector)) {
      Tablesaw.$table[pluginName]();
    }
  });

}(jQuery));

;
(function(win, $, undefined) {

  var MM = {
    attr: {
      init: 'data-tablesaw-minimap'
    }
  };

  function createMiniMap($table) {

    var $btns = $('<div class="tablesaw-advance minimap">'),
      $dotNav = $('<ul class="tablesaw-advance-dots">').appendTo($btns),
      hideDot = 'tablesaw-advance-dots-hide',
      $headerCells = $table.find('thead th');

    // populate dots
    $headerCells.each(function() {
      $dotNav.append('<li><i></i></li>');
    });

    $btns.appendTo($table.prev('.tablesaw-bar'));

    function showMinimap($table) {
      var mq = $table.attr(MM.attr.init);
      return !mq || win.matchMedia && win.matchMedia(mq).matches;
    }

    function showHideNav() {
      if (!showMinimap($table)) {
        $btns.hide();
        return;
      }
      $btns.show();

      // show/hide dots
      var dots = $dotNav.find("li").removeClass(hideDot);
      $table.find("thead th").each(function(i) {
        if ($(this).css("display") === "none") {
          dots.eq(i).addClass(hideDot);
        }
      });
    }

    // run on init and resize
    showHideNav();
    $(win).on("resize", showHideNav);


    $table
      .bind("tablesawcolumns.minimap", function() {
        showHideNav();
      })
      .bind("tablesawdestroy.minimap", function() {
        var $t = $(this);

        $t.prev('.tablesaw-bar').find('.tablesaw-advance').remove();
        $(win).off("resize", showHideNav);

        $t.unbind(".minimap");
      });
  }



  // on tablecreate, init
  $(document).on("tablesawcreate", function(e, Tablesaw) {

    if ((Tablesaw.mode === 'swipe' || Tablesaw.mode === 'columntoggle') && Tablesaw.$table.is('[ ' + MM.attr.init + ']')) {
      createMiniMap(Tablesaw.$table);
    }

  });

}(this, jQuery));

;
(function(win, $) {

  var S = {
    selectors: {
      init: 'table[data-tablesaw-mode-switch]'
    },
    attributes: {
      excludeMode: 'data-tablesaw-mode-exclude'
    },
    classes: {
      main: 'tablesaw-modeswitch',
      toolbar: 'tablesaw-toolbar'
    },
    modes: ['stack', 'swipe', 'columntoggle'],
    init: function(table) {
      var $table = $(table),
        ignoreMode = $table.attr(S.attributes.excludeMode),
        $toolbar = $table.prev('.tablesaw-bar'),
        modeVal = '',
        $switcher = $('<div>').addClass(S.classes.main + ' ' + S.classes.toolbar).html(function() {
          var html = ['<label>' + Tablesaw.i18n.columns + ':'],
            dataMode = $table.attr('data-tablesaw-mode'),
            isSelected;

          html.push('<span class="btn btn-small">&#160;<select>');
          for (var j = 0, k = S.modes.length; j < k; j++) {
            if (ignoreMode && ignoreMode.toLowerCase() === S.modes[j]) {
              continue;
            }

            isSelected = dataMode === S.modes[j];

            if (isSelected) {
              modeVal = S.modes[j];
            }

            html.push('<option' +
              (isSelected ? ' selected' : '') +
              ' value="' + S.modes[j] + '">' + Tablesaw.i18n.modes[j] + '</option>');
          }
          html.push('</select></span></label>');

          return html.join('');
        });

      var $otherToolbarItems = $toolbar.find('.tablesaw-advance').eq(0);
      if ($otherToolbarItems.length) {
        $switcher.insertBefore($otherToolbarItems);
      }
      else {
        $switcher.appendTo($toolbar);
      }

      $switcher.find('.btn').tablesawbtn();
      $switcher.find('select').bind('change', S.onModeChange);
    },
    onModeChange: function() {
      var $t = $(this),
        $switcher = $t.closest('.' + S.classes.main),
        $table = $t.closest('.tablesaw-bar').nextUntil($table).eq(0),
        val = $t.val();

      $switcher.remove();
      $table.data('table').destroy();

      $table.attr('data-tablesaw-mode', val);
      $table.table();
    }
  };

  $(win.document).on("tablesawcreate", function(e, Tablesaw) {
    if (Tablesaw.$table.is(S.selectors.init)) {
      S.init(Tablesaw.table);
    }
  });

})(this, jQuery);
