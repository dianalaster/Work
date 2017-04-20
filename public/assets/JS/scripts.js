var thirst = thirst || {};
thirst.siteNav = function() {
    "use strict";
    var t = function() {
        var t = $(document).scrollTop();
        t > 10 ? $("body").addClass("nav-fixed") : $("body").removeClass("nav-fixed")
    }
      , n = function() {
        $(window).on("scroll", function() {
            t()
        })
    };
    return {
        init: n
    }
}(),
thirst.smoothAnchors = function() {
    "use strict";
    var t = 500
      , n = function(t, n) {
        var e = t.offset().top
          , i = 200;
        $("body").width() <= 1e3 && (i = 100),
        $("body").animate({
            scrollTop: e - i
        }, n)
    }
      , e = function() {
        var e = $(".smooth-scroll");
        e.length > 0 && e.on("click", function(e) {
            e.preventDefault();
            var i = $(this).attr("href")
              , r = $(i)
              , a = $(this).attr("data-scroll-speed") || t;
            n(r, a)
        })
    };
    return {
        init: e
    }
}(),
thirst.newsletterForm = function() {
    "use strict";
    function t(t) {
        t.preventDefault(),
        t.stopPropagation(),
        r.addClass("loader"),
        $.getJSON(this.action + "?callback=?", $(this).serialize(), function(t) {
            400 === t.Status ? (console.warn("Ajax campaign monitor error:", t),
            e("Something went awry, please try again.")) : (e("Thanks for signing up!"),
            n())
        })
    }
    function n() {
        ga("send", "event", "Subscription", "subscribe", "Thirst Quenchers")
    }
    function e(t) {
        var n = i.closest(".cta-card")
          , e = n.outerHeight()
          , a = i.find(".response");
        im.lessThan("tablet") && n.css({
            height: "calc(" + e + "px + 3em)"
        }),
        r.removeClass("loader"),
        a.text(t),
        a.fadeIn(1e3, function() {
            setTimeout(function() {
                a.fadeOut(1e3, function() {
                    im.lessThan("tablet") && n.css("height", e)
                })
            }, 2e3)
        })
    }
    var i, r, a = function() {
        i = $("#subForm"),
        r = i.find('.btn[type="submit"] .text'),
        i.length && i.submit(t)
    };
    return {
        init: a
    }
}(),
thirst.gaEvents = function() {
    "use strict";
    var t = function(t) {
        var n = $(t);
        ga("send", "event", n.attr("data-ga-category"), "click", n.attr("href"))
    }
      , n = function() {
        $(".ga-click").on("click", function(n) {
            t(this)
        })
    };
    return {
        init: n
    }
}();
var im = function() {
    function t(t) {
        c = t
    }
    function n(t) {
        "manual" == t && (u = !1,
        e())
    }
    function e() {
        if (window.getComputedStyle && "" !== window.getComputedStyle(c, "::after").content) {
            var t = window.getComputedStyle(c, "::after").content;
            try {
                l = JSON.parse(s(t))
            } catch (n) {}
        }
    }
    function i(t) {
        return u && e(),
        l.hasOwnProperty(t) && l[t].active
    }
    function r(t) {
        return !i(t)
    }
    function a() {
        u && e();
        var t = {
            name: !1,
            value: 0
        };
        for (var n in l)
            if (l.hasOwnProperty(n)) {
                var i = parseFloat(l[n].value);
                l[n].active && i > t.value && (t = {
                    name: n,
                    value: i
                })
            }
        return t.name
    }
    function o(t, n) {
        return u && e(),
        l && l.hasOwnProperty(t) ? n ? parseFloat(l[t].value) : l[t].value : !1
    }
    function s(t) {
        return ("string" == typeof t || t instanceof String) && (t = t.replace(/[']/g, '"').replace(/\\|^[\s\S]{0,1}|[\s\S]$/g, "")),
        t
    }
    var c = document.body
      , u = !0
      , l = !1;
    return {
        setElement: t,
        setUpdateMode: n,
        greaterThan: i,
        lessThan: r,
        getActive: a,
        getValue: o,
        update: e
    }
}();
$(document).ready(function() {
    thirst.siteNav.init(),
    thirst.smoothAnchors.init(),
    thirst.newsletterForm.init(),
    thirst.gaEvents.init()
});
