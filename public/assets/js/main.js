!(function ($) {
  "use strict";

  // Preloader
  $(window).on("load", function () {
    if ($("#preloader").length) {
      $("#preloader")
        .delay(100)
        .fadeOut("slow", function () {
          $(this).remove();
        });
    }
  });

  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $("#header").outerHeight() - 21;
  $(document).on("click", ".nav-menu a, .mobile-nav a, .scrollto", function (
    e
  ) {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == "#header") {
          scrollto = 0;
        }

        $("html, body").animate(
          {
            scrollTop: scrollto,
          },
          1500,
          "easeInOutExpo"
        );

        if ($(this).parents(".nav-menu, .mobile-nav").length) {
          $(".nav-menu .active, .mobile-nav .active").removeClass("active");
          $(this).closest("li").addClass("active");
        }

        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $(".mobile-nav-toggle i").toggleClass(
            "icofont-navigation-menu icofont-close"
          );
          $(".mobile-nav-overly").fadeOut();
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function () {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $("html, body").animate(
          {
            scrollTop: scrollto,
          },
          1500,
          "easeInOutExpo"
        );
      }
    }
  });

  // Mobile Navigation
  if ($(".nav-menu").length) {
    var $mobile_nav = $(".nav-menu").clone().prop({
      class: "mobile-nav d-lg-none",
    });
    $("body").append($mobile_nav);
    $("body").prepend(
      '<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>'
    );
    $("body").append('<div class="mobile-nav-overly"></div>');

    $(document).on("click", ".mobile-nav-toggle", function (e) {
      $("body").toggleClass("mobile-nav-active");
      $(".mobile-nav-toggle i").toggleClass(
        "icofont-navigation-menu icofont-close"
      );
      $(".mobile-nav-overly").toggle();
    });

    $(document).on("click", ".mobile-nav .drop-down > a", function (e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass("active");
    });

    $(document).click(function (e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $(".mobile-nav-toggle i").toggleClass(
            "icofont-navigation-menu icofont-close"
          );
          $(".mobile-nav-overly").fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Navigation active state on scroll
  var nav_sections = $("section");
  var main_nav = $(".nav-menu, .mobile-nav");

  $(window).on("scroll", function () {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function () {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find("li").removeClass("active");
        }
        main_nav
          .find('a[href="#' + $(this).attr("id") + '"]')
          .parent("li")
          .addClass("active");
      }
      if (cur_pos < 300) {
        $(
          ".nav-menu ul:first li:first, .mobile-menu ul:first li:first"
        ).addClass("active");
      }
    });
  });

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#header").addClass("header-scrolled");
    } else {
      $("#header").removeClass("header-scrolled");
    }
  });

  if ($(window).scrollTop() > 100) {
    $("#header").addClass("header-scrolled");
  }

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });

  $(".back-to-top").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1500,
      "easeInOutExpo"
    );
    return false;
  });

  // Initiate the venobox plugin
  $(window).on("load", function () {
    $(".venobox").venobox();
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000,
  });

  // Initiate venobox lightbox
  $(document).ready(function () {
    $(".venobox").venobox();
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1,
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  $(window).on("load", function () {
    aos_init();
  });
})(jQuery);

// Pageclip
!(function (e) {
  var t = function () {},
    s = {
      _base:
        "string" == typeof __pageclip_base
          ? __pageclip_base
          : "https://send.pageclip.co",
      _successTemplate:
        '<div class="pageclip-form__success__message">Thank you!</div>',
      cssBase: "pageclip-form",
      form: function (t, n) {
        if (((n = n || {}), null == t))
          throw new Error(
            "form() must be passed an HTMLFormElement or String, not null"
          );
        if (
          ("string" == typeof t && (t = document.querySelector(t)),
          e.jQuery && t instanceof e.jQuery && (t = t[0]),
          !(t instanceof e.HTMLFormElement))
        )
          throw new Error("form() must be passed an HTMLFormElement or String");
        var r = o(t.getAttribute("action")),
          a = { "X-REQMETHOD": "form-v1", "Content-Type": "application/json" },
          c = s.cssBase,
          u = s.cssBase + "--submitting",
          l = s.cssBase + "--error",
          d = s.cssBase + "--success",
          f = n.successTemplate || s._successTemplate,
          m = new i(t);
        t.classList.add(c),
          (t.onsubmit = function (e) {
            e.preventDefault(), m.start();
            var o = JSON.stringify(s.formToJSON(t)),
              i = !1 !== (!n.onSubmit || n.onSubmit());
            i &&
              (t.classList.add(u),
              s._showSubmitting(t),
              s._send(r.key, r.url, a, o, n, function (e, r) {
                i && s._hideSubmitting(t),
                  t.classList.remove(u),
                  t.classList.add(e ? l : d),
                  !1 !== (!n.onResponse || n.onResponse(e, r)) &&
                    !e &&
                    s._showSuccess(t, f),
                  e ? console.error(e.message || e) : t.reset(),
                  setTimeout(function () {
                    m.stop();
                  }, 200);
              }));
          });
      },
      send: function (e, t, n, r) {
        var o = s._base + "/" + e + "/" + (t || "");
        s._send(
          e,
          o,
          { "X-REQMETHOD": "send-v1", "Content-Type": "application/json" },
          JSON.stringify(n),
          {},
          r
        );
      },
      formToJSON: function (e) {
        for (var t = e.elements, s = {}, n = 0; n < t.length; n++) {
          var r = t[n];
          r.name.trim() &&
            (("radio" !== r.type && "checkbox" !== r.type) || r.checked) &&
            (s[r.name] = r.value);
        }
        return s;
      },
      _send: function (e, t, n, r, o, i) {
        try {
          s._xhrFetch(e, t, n, r, i);
        } catch (t) {
          s._sendError(e, t), i(t);
        }
      },
      _xhrFetch: function (n, r, o, i, a) {
        var c = s._xhr();
        (o = (function (e, t) {
          if (t) for (var s in t) e[s] = t[s];
          return e;
        })({ "X-REQTRANSPORT": "xhr", "X-HASFETCH": !!e.fetch }, o)),
          (a = a || t),
          (c.onreadystatechange = function () {
            try {
              if (4 === c.readyState) {
                var e = c.response,
                  t =
                    200 === c.status
                      ? null
                      : new Error(
                          "Error submitting data: " +
                            (e ? e.error : "Unknown Error")
                        );
                a(t, t ? null : e);
              }
            } catch (t) {
              s._sendError(n, t), a(t);
            }
          }),
          c.open("POST", r),
          (c.responseType = "json");
        for (var u in o) c.setRequestHeader(u, o[u]);
        c.send(i);
      },
      _xhr: function () {
        return new (e.XMLHttpRequest || ActiveXObject)("MSXML2.XMLHTTP.3.0");
      },
      _sendError: function (e, t) {
        var n =
            '{"error": "' +
            (t.stack || t.message || t + "")
              .replace(/"/g, '\\"')
              .replace(/\n/g, "\\n") +
            '"}',
          r = s._xhr();
        r.open("POST", s._base + "/error/" + (e || "")),
          r.setRequestHeader("Content-Type", "application/json"),
          r.setRequestHeader("X-REQMETHOD", "send-v1"),
          r.send(n);
      },
      _showSubmitting: function (e) {
        n(e, !0);
      },
      _hideSubmitting: function (e) {
        n(e, !1);
      },
      _showSuccess: function (e, t) {
        var n = document.createElement("div");
        n.classList.add(s.cssBase + "__success"),
          (n.innerHTML = t),
          (n.onclick = function () {
            s._hideSuccess(e);
          }),
          e.appendChild(n);
      },
      _hideSuccess: function (e) {
        var t = e.querySelector("." + s.cssBase + "__success");
        t && t.remove();
      },
    };
  function n(e, t) {
    for (var s = e.querySelectorAll("input"), n = 0; n < s.length; n++)
      s[n].disabled = t;
  }
  var r = /^(.+)\/([\w\d]{32})(\/([^\/]*))?$/;
  function o(e) {
    var t = "Malformed action: " + e,
      n = r.exec(e);
    if (!n) throw new Error(t);
    var o = { base: n[1], key: n[2], bucket: n[4] || "" };
    if (o.base !== s._base || !o.key.length) throw new Error(t);
    return (o.url = o.base + "/" + o.key + "/" + o.bucket), o;
  }
  function i(e) {
    this.el = e.querySelector("." + s.cssBase + "__submit");
  }
  var a = "__submit--",
    c = s.cssBase + a + "start-loading",
    u = s.cssBase + a + "loading",
    l = s.cssBase + a + "end-loading";
  function d(e, t, s) {
    var n = getComputedStyle(e, "::after"),
      r = n.animationName;
    r && "none" !== r
      ? (function (e, t) {
          clearTimeout(f);
          (e = 1e3 * parseFloat(e)), (f = setTimeout(t, e - 10));
        })(n.animationDuration, t)
      : s();
  }
  (i.prototype.start = function () {
    if (this.el) {
      this.el.disabled = !0;
      var e = this.el.classList;
      e.remove(l),
        e.remove(u),
        e.add(c),
        d(
          this.el,
          function () {
            e.remove(c), e.add(u);
          },
          function () {
            e.add(u), e.remove(c);
          }
        );
    }
  }),
    (i.prototype.stop = function () {
      if (this.el) {
        this.el.disabled = !1;
        var e = this.el.classList;
        function t() {
          e.remove(l);
        }
        e.remove(c), e.remove(u), e.add(l), d(this.el, t, t);
      }
    });
  var f = null;
  "undefined" != typeof module && void 0 !== module.exports
    ? ((module.exports = s), (module.exports.normalizeAction = o))
    : ((window.Pageclip = s),
      (function () {
        for (
          var e = document.querySelectorAll("." + s.cssBase), t = 0;
          t < e.length;
          t++
        )
          s.form(e[t]);
      })());
})(this || window || global);
