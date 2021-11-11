/***
 +----------------------------------------------------------------------
 | 网站定制开发 微信：woniu_2025 [ WE ARE THE BEST. 2021-06-25 ]
 +----------------------------------------------------------------------
 | Copyright (c) 2021 https://snailweb.cn All Rights Reserved.
 +----------------------------------------------------------------------
 | Licensed ( https://snailweb.cn )
 +----------------------------------------------------------------------
 | Author: snail <137224272@qq.com> new
 +----------------------------------------------------------------------
 ***/

function isURL(e) {
    var t = e;
    return 1 == new RegExp(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/).test(t)
}

function isPC() {
    let e = navigator.userAgent,
        t = ["Android", "iPhone", "webOS", "BlackBerry", "SymbianOS", "Windows Phone", "iPad", "iPod"], i = !0;
    for (let a = 0; a < t.length; a++) if (e.indexOf(t[a]) > 0) {
        i = !1;
        break
    }
    return i
}

function chack_name(e) {
    return !!RegExp(/[( )(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\*)(\()(\))(\+)(\=)(\[)(\])(\{)(\})(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\»)(\«)(\“)(\”)(\?)(\)]+/).test(e)
}

function showAlert(e) {
    var t, i, a;
    switch (e.status) {
        case 1:
            t = localize.successAlert, i = "success", a = "icon-adopt";
            break;
        case 2:
            t = localize.infoAlert, i = "info", a = "icon-tishi";
            break;
        case 3:
            t = localize.warningAlert, i = "warning", a = "icon-warning";
            break;
        case 4:
            t = localize.errorAlert, i = "danger", a = "icon-close-circle"
    }
    var s = e.msg;
    $("#alert_placeholder").hasClass("text-sm") || $("body").append('<div id="alert_placeholder" class="text-sm" style="position: fixed;bottom: 10px;right: 10px;z-index: 2000;text-align: right;text-align: -webkit-right"></div>');
    var o = $('<div class="alert-body" style="display:none;"><div class="alert alert-' + i + ' text-lg pr-4 pr-md-5" style="text-align:initial"><i class="iconfont ' + a + ' icon-lg" style="vertical-align: middle;margin-right: 10px"></i><span style="vertical-align:middle">' + t + '</span><br><span class="text-md" style="margin-left:30px;vertical-align:middle">' + s + "</span></div></div>");
    $("#alert_placeholder").append(o), o.show(200).delay(3500).hide(300, function () {
        $(this).remove()
    })
}

function toTarget(e, t, i) {
    var a = e.children(".anchor"), s = e.children(".hover").first();
    s && 0 < s.length || (s = i ? e.find(".active").parent() : e.find(".active")), 0 < s.length ? t ? a.css({
        left: s.position().left + s.scrollLeft() + "px",
        width: s.outerWidth() + "px",
        opacity: "1"
    }) : a.css({
        left: s.position().left + s.scrollLeft() + s.outerWidth() / 4 + "px",
        width: s.outerWidth() / 2 + "px",
        opacity: "1"
    }) : a.css({opacity: "0"})
}

!function (e) {
    e(document).ready(function () {
        "1" != theme.minNav && l(), a(!1), function () {
            window.localStorage.getItem("searchlist") && (e(".hide-type-list input#" + window.localStorage.getItem("searchlist")).prop("checked", !0), e(".hide-type-list input#m_" + window.localStorage.getItem("searchlist")).prop("checked", !0));
            window.localStorage.getItem("searchlistmenu") && (e(".s-type-list.big label").removeClass("active"), e(".s-type-list [data-id=" + window.localStorage.getItem("searchlistmenu") + "]").addClass("active"));
            toTarget(e(".s-type-list.big"), !1, !1), e(".hide-type-list .s-current").removeClass("s-current"), e('.hide-type-list input:radio[name="type"]:checked').parents(".search-group").addClass("s-current"), e('.hide-type-list input:radio[name="type2"]:checked').parents(".search-group").addClass("s-current"), e(".super-search-fm").attr("action", e(".hide-type-list input:radio:checked").val()), e(".search-key").attr("placeholder", e(".hide-type-list input:radio:checked").data("placeholder")), "type-zhannei" == window.localStorage.getItem("searchlist") && e(".search-key").attr("zhannei", "true")
        }(), s(), isPC() ? e('[data-toggle="tooltip"]').tooltip({trigger: "hover"}) : e('.qr-img[data-toggle="tooltip"]').tooltip({trigger: "hover"}), e(".slider_menu[sliderTab]").each(function () {
            if (!e(this).hasClass("into")) {
                var t = e(this).children("ul");
                t.prepend('<li class="anchor" style="position:absolute;width:0;height:28px"></li>');
                var i = t.find(".active").parent();
                0 < i.length && t.children(".anchor").css({
                    left: i.position().left + i.scrollLeft() + "px",
                    width: i.outerWidth() + "px",
                    height: i.height() + "px",
                    opacity: "1"
                }), e(this).addClass("into")
            }
        }), e(".sidebar").theiaStickySidebar({
            additionalMarginTop: 90,
            additionalMarginBottom: 20
        }), "1" == theme.isCustomize && (p(!1), p(!0)), e(window).scrollTop() >= 50 && (e("#go-to-up").fadeIn(200), e(".big-header-banner").addClass("header-bg"))
    }), e(".panel-body.single img").each(function (t) {
        this.parentNode.href || ("1" == theme.lazyload ? e(this).wrap("<a class='js' href='" + e(this).data("src") + "' data-fancybox='fancybox' data-caption='" + this.alt + "'></a>") : e(this).wrap("<a class='js' href='" + this.src + "' data-fancybox='fancybox' data-caption='" + this.alt + "'></a>"))
    });
    var t = 0;

    function i() {
        s(), l()
    }

    function a(t) {
        var i = e("body"), a = e(".switch-dark-mode"), s = e(".mode-ico");
        i.hasClass("io-black-mode") ? (t && setCookie("night_mode", 0, 30), a.attr("data-original-title") ? a.attr("data-original-title", localize.lightMode) : a.attr("title", localize.lightMode), s.removeClass("icon-night").addClass("icon-light")) : (t && setCookie("night_mode", 1, 30), a.attr("data-original-title") ? a.attr("data-original-title", localize.nightMode) : a.attr("title", localize.nightMode), s.removeClass("icon-light").addClass("icon-night"))
    }

    function s() {
        if (e(".main-footer").attr("style", ""), e(".main-footer").hasClass("text-xs")) {
            var t = jQuery(window).height(), i = e(".main-footer").outerHeight(!0),
                a = e(".main-footer").position().top + i;
            t > a - parseInt(e(".main-footer").css("marginTop"), 10) && e(".main-footer").css({marginTop: t - a})
        }
    }

    e(window).resize(function () {
        clearTimeout(t), t = setTimeout(i, 200)
    }), e(".count-a").each(function () {
        e(this).prop("Counter", 0).animate({Counter: e(this).text()}, {
            duration: 1e3,
            easing: "swing",
            step: function (t) {
                e(this).text(Math.ceil(t))
            }
        })
    }), e(document).on("click", "a[target!='_blank']", function () {
        if (isPC() && "1" == theme.loading && e(this).attr("href") && 0 != e(this).attr("href").indexOf("#") && 0 != e(this).attr("href").indexOf("java") && !e(this).data("fancybox") && !e(this).data("commentid") && !e(this).hasClass("nofx")) {
            var t = e('<div id="load-loading"></div>');
            e("body").prepend(t), t.animate({opacity: "1"}, 200, "swing").delay(2e3).hide(300, function () {
                t.remove()
            })
        }
    }), e(".btn-like").click(function () {
        var t = e(this);
        if ("post_like" == t.data("action")) if (t.hasClass("liked")) showAlert(JSON.parse('{"status":3,"msg":"' + localize.liked + '"}')); else {
            var i = t.children(".flex-column");
            t.addClass("liked"), e.ajax({
                type: "POST",
                url: theme.ajaxurl,
                data: {action: t.data("action"), post_id: t.data("id"), ticket: t.data("ticket")},
                success: function (t) {
                    var a = e('<i class="iconfont icon-heart" style="color: #f12345;transform: scale(1) translateY(0);position: absolute;transition: .6s;opacity: 1;"></i>');
                    i.prepend(a), showAlert(JSON.parse('{"status":1,"msg":"' + localize.like + '"}')), e(".like-count").html(t), a.addClass("home-like-hide")
                },
                error: function () {
                    showAlert(JSON.parse('{"status":4,"msg":"' + localize.networkerror + '"}'))
                }
            })
        } else {
            if (t.hasClass("disabled")) return !1;
            var a = 0, s = t.data("id");
            t.hasClass("liked") && (a = 1), t.addClass("disabled"), e.ajax({
                type: "POST",
                url: theme.ajaxurl,
                data: {
                    action: t.data("action"),
                    post_id: t.data("id"),
                    post_type: t.data("post_type"),
                    delete: a,
                    ticket: t.data("ticket")
                },
                success: function (i) {
                    if (t.removeClass("disabled"), 1 == i.status) return e(".star-count-" + s).html(i.count), 1 == a ? (t.removeClass("liked"), t.find(".star-ico").removeClass("icon-collection").addClass("icon-collection-line")) : (t.addClass("liked"), t.find(".star-ico").removeClass("icon-collection-line").addClass("icon-collection")), ioPopupTips(i.status, i.msg), !1;
                    ioPopupTips(i.status, i.msg)
                },
                error: function () {
                    t.removeClass("disabled"), ioPopupTips(4, localize.networkerror)
                }
            })
        }
        return !1
    }), e(document).on("click", ".home-like", function () {
        if (e(this).hasClass("liked")) showAlert(JSON.parse('{"status":3,"msg":"' + localize.liked + '"}')); else {
            var t = e(this), i = e(this).data("id");
            e(this).addClass("liked"), e.ajax({
                type: "POST",
                url: theme.ajaxurl,
                data: {action: "post_like", post_id: i},
                success: function (a) {
                    var s = e('<i class="iconfont icon-heart" style="color: #f12345;transform: scale(1) translateY(0);position: absolute;transition: .6s;opacity: 1;"></i>');
                    t.prepend(s), showAlert(JSON.parse('{"status":1,"msg":"' + localize.like + '"}')), e(".home-like-" + i).html(a), s.addClass("home-like-hide")
                },
                error: function () {
                    showAlert(JSON.parse('{"status":4,"msg":"' + localize.networkerror + '"}'))
                }
            })
        }
        return !1
    }), e(document).on("click", ".url-card a.is-views[data-id]", function () {
        e.ajax({
            type: "GET",
            url: theme.ajaxurl,
            data: {action: "io_postviews", postviews_id: e(this).data("id")},
            cache: !1
        })
    }), e(document).on("click", ".switch-dark-mode", function (t) {
        t.preventDefault(), e("body").toggleClass("io-black-mode " + theme.defaultclass), a(!0), e("#" + e(".switch-dark-mode").attr("aria-describedby")).remove()
    }), e(window).scroll(function () {
        e(this).scrollTop() >= 50 ? (e("#go-to-up").fadeIn(200), e(".big-header-banner").addClass("header-bg")) : (e("#go-to-up").fadeOut(200), e(".big-header-banner").removeClass("header-bg"))
    }), e(".go-up").click(function () {
        return e("body,html").animate({scrollTop: 0}, 500), !1
    }), e(".slider_menu").children("ul").children("li").not(".anchor").hover(function () {
        e(this).addClass("hover"), toTarget(e(this).parent(), !0, !0)
    }, function () {
        e(this).removeClass("hover");
        var t = e(this).parent("ul");
        window.setTimeout(function () {
            toTarget(t, !0, !0)
        }, 50)
    }), e("#sidebar-switch").on("click", function () {
        e("#sidebar").removeClass("mini-sidebar"), e(".sidebar-nav .change-href").attr("href", "javascript:;")
    });
    var o = !1, n = !1;

    function l() {
        "1" == theme.minNav && !o && 767.98 < e(window).width() || !o && 767.98 < e(window).width() && e(window).width() < 1024 ? (e("#mini-button").prop("checked", !1), r(), o = !0, n && (e("#sidebar").addClass("mini-sidebar"), e(".sidebar-nav .change-href").each(function () {
            e(this).attr("href", e(this).data("change"))
        }), n = !1)) : "1" != theme.minNav && (o && e(window).width() >= 1024 || n && !o && e(window).width() >= 1024) ? (e("#mini-button").prop("checked", !0), r(), o = !1, n && (n = !1)) : e(window).width() < 767.98 && e("#sidebar").hasClass("mini-sidebar") && (e("#sidebar").removeClass("mini-sidebar"), e(".sidebar-nav .change-href").attr("href", "javascript:;"), n = !0, o = !1)
    }

    function r() {
        e('.header-mini-btn input[type="checkbox"]').prop("checked") ? (e(".sidebar-nav").removeClass("mini-sidebar"), e(".sidebar-nav .change-href").attr("href", "javascript:;"), e(".sidebar-menu ul ul").css("display", "none")) : (e(".sidebar-item.sidebar-show").removeClass("sidebar-show"), e(".sidebar-menu ul").removeAttr("style"), e(".sidebar-nav").addClass("mini-sidebar"), e(".sidebar-nav .change-href").each(function () {
            e(this).attr("href", e(this).data("change"))
        }))
    }

    function d(t, i, a) {
        t.hasClass("active") || (i.find("a").removeClass("active"), t.addClass("active"), 0 == e(a).children(".ajax-loading").length && e(a).append('<div class="ajax-loading text-center rounded" style="position:absolute;display:flex;left:0;width:100%;top:-1rem;bottom:.5rem;background:rgba(125,125,125,.5)"><div class="col align-self-center"><i class="iconfont icon-loading icon-spin icon-2x"></i></div></div>'), e.ajax({
            url: theme.ajaxurl,
            type: "POST",
            dataType: "html",
            data: t.data(),
            cache: !0
        }).done(function (i) {
            if (i.trim()) {
                e(a).html(""), e(a).append(i);
                var s = e(a).children("#ajax-cat-url").data("url");
                s ? t.parents(".d-flex.flex-fill.flex-tab").children(".btn-move.tab-move").show().attr("href", s) : t.parents(".d-flex.flex-fill.flex-tab").children(".btn-move.tab-move").hide(), isPC() && e('.ajax-url [data-toggle="tooltip"]').tooltip({trigger: "hover"})
            } else e(".ajax-loading").remove()
        }).fail(function () {
            e(".ajax-loading").remove()
        }))
    }

    e(".sidebar-menu-inner a").on("click", function () {
        e(".sidebar-nav").hasClass("mini-sidebar") || (e(this).parent("li").siblings("li.sidebar-item").children("ul").slideUp(200), "none" == e(this).next().css("display") ? (e(this).next("ul").slideDown(200), e(this).parent("li").addClass("sidebar-show").siblings("li").removeClass("sidebar-show")) : (e(this).next("ul").slideUp(200), e(this).parent("li").removeClass("sidebar-show")))
    }), e("#mini-button").on("click", function () {
        e(".sidebar-nav").hasClass() || e(".sidebar-nav").addClass("animate-nav"), r()
    }), e(document).on("mouseenter", ".mini-sidebar .sidebar-menu ul:first>li,.mini-sidebar .flex-bottom ul:first>li", function () {
        var t = 2;
        0 != e(this).parents(".flex-bottom").length && (t = -3), 0 == e(".sidebar-popup.second").length && e("body").append("<div class='second sidebar-popup sidebar-menu-inner text-sm'><div></div></div>"), e(".sidebar-popup.second>div").html(e(this).html()), e(".sidebar-popup.second").show();
        var i = e(this).offset().top - e(window).scrollTop() + t,
            a = e(window).height() - e(".sidebar-popup.second>div").height();
        a - i <= 0 && (i = a >= 0 ? a - 8 : 0), e(".sidebar-popup.second").stop().animate({top: i}, 50), e(this).one("mouseleave", function () {
            e(".sidebar-nav").hasClass("mini-sidebar") && e(".sidebar-scroll").innerHeight() > e(".sidebar-menu").innerHeight() ? e(".mini-sidebar .sidebar-menu").one("mouseleave", function () {
                e(".sidebar-popup.second").hide()
            }) : e(".sidebar-popup.second").hide()
        })
    }), e(document).on("mouseenter", ".mini-sidebar .slimScrollBar,.second.sidebar-popup", function () {
        e(".sidebar-popup.second").show(), e(this).one("mouseleave", function () {
            e(".sidebar-popup.second").hide()
        })
    }), e(document).on("click", ".ajax-cm-home .ajax-cm", function (t) {
        t.preventDefault();
        var i = e(this), a = i.data("id"), s = e(i.attr("href")).children(".site-list");
        0 == s.children(".url-card").length && (i.addClass("disabled"), e.ajax({
            url: theme.ajaxurl,
            type: "POST",
            dataType: "html",
            data: {action: i.data("action"), term_id: a},
            cache: !0
        }).done(function (t) {
            if (t.trim()) {
                var a = e(t);
                s.html(a), isPC() && a.find('[data-toggle="tooltip"]').tooltip({trigger: "hover"})
            }
            i.removeClass("disabled")
        }).fail(function () {
            i.removeClass("disabled")
        }))
    }), e(document).on("click", ".ajax-list a", function (t) {
        t.preventDefault(), d(e(this), e(this).parents(".ajax-list"), "." + e(this).data("target"))
    }), e(document).on("click", ".ajax-list-home a", function (t) {
        t.preventDefault(), d(e(this), e(this).parents(".ajax-list-home"), ".ajax-" + e(this).parents(".ajax-list-home").data("id"))
    }), e(".add-link-form").on("submit", function () {
        var t = e(".site-add-name").val(), i = e(".site-add-url").val();
        !function (e) {
            for (var t = m("myLinks"), i = 0; i < t.length; i++) if (t[i].url == e.url) return void showAlert(JSON.parse('{"status":4,"msg":"' + localize.urlExist + '"}'));
            t.unshift(e), h(e, !1, !1), u(t, "myLinks")
        }({
            id: +new Date,
            name: t,
            url: i
        }), this.reset(), this.querySelector("input").focus(), e(this).find(".btn-close-fm").click()
    });
    var c = !1;

    function h(t, i, a) {
        i ? e(".customize_nothing_click").remove() : e(".customize_nothing").remove();
        var s, o = t.url.match(/^(?:https?:\/\/)?((?:[-A-Za-z0-9]+\.)+[A-Za-z]{2,6})/);
        !o || o.length < 2 ? s = t.url : (s = o[0], "1" == theme.urlformat && (s = o[1]));
        var n = e('<div class="url-card  col-6 ' + theme.classColumns + ' col-xxl-10a"><div class="url-body mini"><a href="' + t.url + '" target="_blank" class="card new-site mb-3 site-' + t.id + '" data-id="' + t.id + '" data-url="' + t.url + '" data-toggle="tooltip" data-placement="bottom" title="' + t.name + '" rel="external nofollow"><div class="card-body" style="padding:0.4rem 0.5rem;"><div class="url-content d-flex align-items-center"><div class="url-img rounded-circle mr-2 d-flex align-items-center justify-content-center"><img src="' + theme.icourl + s + theme.icopng + '"></div><div class="url-info flex-fill"><div class="text-sm overflowClip_1"><strong>' + t.name + '</strong></div></div></div></div></a></div><a href="javascript:;" class="text-center remove-site" data-id="' + t.id + '" style="display: none"><i class="iconfont icon-close-circle"></i></a></div>');
        i ? (a ? e(".my-click-list").prepend(n) : e(".my-click-list").append(n), n.children(".remove-site").on("click", v)) : (e("#add-site").before(n), n.children(".remove-site").on("click", f)), c && n.children(".remove-site").show(), isPC() && e('.new-site[data-toggle="tooltip"]').tooltip({trigger: "hover"})
    }

    function m(e) {
        var t = window.localStorage.getItem(e);
        return t ? t = JSON.parse(t) : []
    }

    function u(e, t) {
        window.localStorage.setItem(t, JSON.stringify(e))
    }

    function p(t) {
        var i = m(t ? "livelists" : "myLinks");
        if (!i.length || t || e("#add-site")[0]) {
            if (i.length) for (var a = 0; a < i.length; a++) h(i[a], t, !1)
        } else e(".customize_nothing.custom-site").children(".nothing").html('<a href="javascript:;" class="add-new-custom-site" data-action="add_custom_urls" data-term_name="我的导航" data-urls="' + Base64.encode(JSON.stringify(i)) + '" >您已登录，检测到您的设备上有数据，点击<strong style="color:#db2323">同步到服务器</strong>。</a>')
    }

    function f() {
        for (var t = e(this).data("id"), i = m("myLinks"), a = 0; a < i.length; a++) if (parseInt(i[a].id) === parseInt(t)) {
            console.log(i[a].id, t), i.splice(a, 1);
            break
        }
        u(i, "myLinks"), e(this).parent().remove()
    }

    function v() {
        for (var t = e(this).data("id"), i = m("livelists"), a = 0; a < i.length; a++) if (parseInt(i[a].id) === parseInt(t)) {
            console.log(i[a].id, t), i.splice(a, 1);
            break
        }
        u(i, "livelists"), e(this).parent().remove()
    }

    function b() {
        e(".customize-sites").hasClass("edit") ? (isPC() && e('.customize-sites .new-site[data-toggle="tooltip"]').tooltip("disable"), e(".customize-sites .site-list").sortable({
            items: ".sortable",
            containment: ".main-content",
            update: function (t, i) {
                e(".customize-sites .site-list").sortable("disable");
                var a = {
                    action: "update_custom_url_order",
                    term_id: e(this).data("term_id"),
                    order: e(this).sortable("serialize")
                };
                e.ajax({
                    url: theme.ajaxurl, type: "POST", data: a, cache: !1, dataType: "json", success: function (t) {
                        1 != t.status && showAlert(t), e(".customize-sites .site-list").sortable("enable")
                    }, error: function (t) {
                        e(".customize-sites .site-list").sortable("enable"), showAlert(JSON.parse('{"status":4,"msg":"' + localize.networkerror + '"}'))
                    }
                })
            }
        })) : (isPC() && e('.customize-sites .new-site[data-toggle="tooltip"]').tooltip("enable"), e(".customize-sites .site-list").sortable("destroy"))
    }

    function g(t, i) {
        e.ajax({
            type: "GET",
            url: "//suggestqueries.google.com/complete/search?client=firefox&callback=iowenHot",
            async: !0,
            data: {q: t},
            dataType: "jsonp",
            jsonp: "callback",
            success: function (t) {
                var a = i.children(".search-smart-tips");
                if (a.children("ul").text(""), x = t[1].length) {
                    for (var s = 0; s < x; s++) a.children("ul").append("<li>" + t[1][s] + "</li>"), a.find("li").eq(s).click(function () {
                        var t = e(this).html();
                        i.find(".smart-tips.search-key").val(t), i.children(".super-search-fm").submit(), a.slideUp(200)
                    });
                    a.slideDown(200)
                } else a.slideUp(200)
            },
            error: function (e) {
                x = 0
            }
        })
    }

    function y(t, i) {
        e.ajax({
            type: "GET",
            url: "//sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=iowenHot",
            async: !0,
            data: {wd: t},
            dataType: "jsonp",
            jsonp: "cb",
            success: function (t) {
                var a = i.children(".search-smart-tips");
                if (a.children("ul").text(""), x = t.s.length) {
                    for (var s = 0; s < x; s++) a.children("ul").append("<li>" + t.s[s] + "</li>"), a.find("li").eq(s).click(function () {
                        var t = e(this).html();
                        i.find(".smart-tips.search-key").val(t), i.children(".super-search-fm").submit(), a.slideUp(200)
                    });
                    a.slideDown(200)
                } else a.slideUp(200)
            },
            error: function (e) {
                x = 0
            }
        })
    }

    e(".customize-menu .btn-edit").click(function () {
        c ? (e(".url-card .remove-site,#add-site").hide(), e(".url-card .remove-site,.add-custom-site").hide(), e(".url-card .remove-cm-site").hide(), e(".customize-sites").removeClass("edit"), b(), e(".customize-menu .btn-edit").html(localize.editBtn)) : (e(".url-card .remove-site,#add-site").show(), e(".url-card .remove-site,.add-custom-site").show(), e(".url-card .remove-cm-site").show(), e(".customize-sites").addClass("edit"), b(), e(".customize-menu .btn-edit").html(localize.okBtn)), c = !c
    }), e(document).on("click", ".add-new-custom-site", function (t) {
        var i = e(this);
        e.ajax({url: theme.ajaxurl, type: "POST", dataType: "json", data: i.data()}).done(function (e) {
            showAlert(e)
        }).fail(function () {
            showAlert(JSON.parse('{"status":4,"msg":"' + localize.networkerror + '"}'))
        })
    }), e(".add-custom-site-form").on("submit", function () {
        var t = e(this), i = this, a = t.find("input[name=url]").val(), s = t.find("input[name=url_name]").val(),
            o = t.find("input:radio:checked").val();
        if ("" == t.find("input[name=term_name]").val() && null == o) return showAlert(JSON.parse('{"status":3,"msg":"' + localize.selectCategory + '"}')), !1;
        e.ajax({
            url: theme.ajaxurl,
            type: "POST",
            dataType: "json",
            data: t.serialize() + "&action=add_custom_url"
        }).done(function (n) {
            if (1 == n.status) {
                var l, r = a.match(/^(?:https?:\/\/)?((?:[-A-Za-z0-9]+\.)+[A-Za-z]{2,6})/);
                !r || r.length < 2 ? l = a : (l = r[0], "1" == theme.urlformat && (l = r[1]));
                var d = n.id,
                    c = e('<div id="url-' + d + '" class="url-card sortable col-6 ' + theme.classColumns + ' col-xxl-10a"><div class="url-body mini"><a href="' + a + '" target="_blank" class="card new-site mb-3 site-' + d + '" data-id="' + d + '" data-url="' + a + '" data-toggle="tooltip" data-placement="bottom" title="' + s + '" rel="external nofollow"><div class="card-body" style="padding:0.4rem 0.5rem;"><div class="url-content d-flex align-items-center"><div class="url-img rounded-circle mr-2 d-flex align-items-center justify-content-center"><img src="' + theme.icourl + l + theme.icopng + '"></div><div class="url-info flex-fill"><div class="text-sm overflowClip_1"><strong>' + s + '</strong></div></div></div></div></a></div><a href="javascript:;" class="text-center remove-cm-site" data-action="delete_custom_url" data-id="' + d + '"><i class="iconfont icon-close-circle"></i></a></div>');
                e(".add-custom-site[data-term_id=" + o + "]").before(c), i.reset(), i.querySelector("input").focus(), t.find(".btn-close-fm").click(), showAlert(JSON.parse('{"status":1,"msg":"' + localize.addSuccess + '"}'))
            } else showAlert(n)
        }).fail(function () {
            showAlert(JSON.parse('{"status":4,"msg":"' + localize.networkerror + '"}'))
        })
    }), e(document).on("click", ".url-card .remove-cm-site", function (t) {
        var i = e(this);
        i.addClass("disabled"), e.ajax({
            url: theme.ajaxurl,
            type: "POST",
            dataType: "json",
            data: i.data()
        }).done(function (e) {
            1 == e.status && i.parent().remove(), i.removeClass("disabled"), showAlert(e)
        }).fail(function () {
            i.removeClass("disabled"), showAlert(JSON.parse('{"status":4,"msg":"' + localize.networkerror + '"}'))
        })
    }), e("input[name=term_name]").focus(function () {
        e("input[name=term_id]").prop("checked", !1)
    }), e(".form_custom_term_id").on("click", function (t) {
        e("input[name=term_name]").val("")
    }), e(document).on("click", ".url-card a.card", function (t) {
        var i = {id: e(this).data("id"), name: e(this).find("strong").html(), url: e(this).data("url")};
        if ("" !== i.url) {
            for (var a = m("livelists"), s = !0, o = 0; o < a.length; o++) a[o].name === i.name && (s = !1);
            if (s) {
                var n = theme.customizemax;
                a.length > n - 1 && (e(".my-click-list .site-" + a[n - 1].id).parent().remove(), a.splice(n - 1, 1)), h(i, !0, !0), a.unshift(i), u(a, "livelists")
            }
        }
    }), e(document).on("click", ".s-type-list label", function (t) {
        e(".s-type-list.big label").removeClass("active"), e(this).addClass("active"), window.localStorage.setItem("searchlistmenu", e(this).data("id"));
        var i = e(this).parents(".s-search");
        i.find(".search-group").removeClass("s-current"), i.find("#" + e(this).attr("for")).parents(".search-group").addClass("s-current"), toTarget(e(this).parents(".s-type-list"), !1, !1)
    }), e(".hide-type-list .search-group input").on("click", function () {
        var t = e(this).parents(".s-search");
        window.localStorage.setItem("searchlist", e(this).attr("id").replace("m_", "")), t.children(".super-search-fm").attr("action", e(this).val()), t.find(".search-key").attr("placeholder", e(this).data("placeholder")), "type-zhannei" == e(this).attr("id") || "m_type-zhannei" == e(this).attr("id") ? t.find(".search-key").attr("zhannei", "true") : t.find(".search-key").attr("zhannei", ""), t.find(".search-key").select(), t.find(".search-key").focus()
    }), e(document).on("submit", ".super-search-fm", function () {
        var t = encodeURIComponent(e(this).find(".search-key").val());
        return "" != t && (window.open(e(this).attr("action") + t), !1)
    });
    var w, k = -1, x = 0, C = !1;
    e(document).on("blur", ".smart-tips.search-key", function () {
        w = "", e(".search-smart-tips").delay(150).slideUp(200)
    }), e(document).on("focus", ".smart-tips.search-key", function () {
        if (C = "" != e(this).attr("zhannei"), w = e(this).parents("#search"), e(this).val() && !C) switch (theme.hotWords) {
            case"baidu":
                y(e(this).val(), w);
                break;
            case"google":
                g(e(this).val(), w)
        }
    }), e(document).on("keyup", ".smart-tips.search-key", function (t) {
        if (C = "" != e(this).attr("zhannei"), w = e(this).parents("#search"), e(this).val()) {
            if (38 == t.keyCode || 40 == t.keyCode || C) return;
            switch (theme.hotWords) {
                case"baidu":
                    y(e(this).val(), w);
                    break;
                case"google":
                    g(e(this).val(), w)
            }
            k = -1
        } else e(".search-smart-tips").slideUp(200)
    }), e(document).on("keydown", ".smart-tips.search-key", function (t) {
        if (w = e(this).parents("#search"), 40 === t.keyCode) {
            k === x - 1 ? k = 0 : k++, w.find(".search-smart-tips ul li").eq(k).addClass("current").siblings().removeClass("current");
            var i = w.find(".search-smart-tips ul li").eq(k).html();
            w.find(".smart-tips.search-key").val(i)
        }
        if (38 === t.keyCode) {
            t.preventDefault && t.preventDefault(), t.returnValue && (t.returnValue = !1), 0 === k || -1 === k ? k = x - 1 : k--, w.find(".search-smart-tips ul li").eq(k).addClass("current").siblings().removeClass("current");
            i = w.find(".search-smart-tips ul li").eq(k).html();
            w.find(".smart-tips.search-key").val(i)
        }
    }), e(".nav-login-user.dropdown----").hover(function () {
        e(this).hasClass("show") || e(this).children("a").click()
    }, function () {
    }), e("#add-new-sites-modal").on("show.bs.modal", function (t) {
        var i = e(t.relatedTarget), a = e(this);
        a.find('[name="term_id"]').val(i.data("terms_id")), a.find('[name="url"]').val(i.data("new_url")), a.find('[name="url_name"]').val(""), a.find('[name="url_summary"]').removeClass("is-invalid").val(""), i.data("new_url", "");
        var s = a.find('[name="url"]').val();
        "" != s && (z(s, a), _ = s)
    });
    var _ = "";

    function z(t, i) {
        e("#modal-new-url-ico").show(), e.post("//apiv2.iotheme.cn/webinfo/get.php", {
            url: t,
            key: theme.apikey
        }, function (t, a) {
            0 == t.code ? (e("#modal-new-url-ico").hide(), e("#modal-new-url-summary").addClass("is-invalid")) : (e("#modal-new-url-ico").hide(), "" == t.site_title && "" == t.site_description ? e("#modal-new-url-summary").addClass("is-invalid") : (i.find('[name="url_name"]').val(t.site_title), i.find('[name="url_summary"]').val(t.site_description)))
        }).fail(function () {
            e("#modal-new-url-ico").hide(), e(".refre_msg").html('<i class="iconfont icon-tishi"></i>' + localize.timeout).show(200).delay(4e3).hide(200)
        })
    }

    e("#modal-new-url").on("blur", function () {
        var t = e(this);
        "" != t.val() && (isURL(t.val()) ? _ != t.val() && (_ = t.val(), z(t.val(), e(".add_new_sites_modal"))) : showAlert(JSON.parse('{"status":4,"msg":"URL 无效！"}')))
    }), e("#modal-new-url-summary").on("blur", function () {
        var t = e(this);
        "" != t.val() && t.removeClass("is-invalid")
    })
}(jQuery);
var ioadindex = 0;

function loadingShow(e = "body") {
    if ($(".load-loading")[0]) return ioadindex++, $(".load-loading");
    var t = $('<div class="load-loading" style="display:none"><div class="bg"></div><div class="rounded-lg bg-light" style="z-index:1"><div class="spinner-border m-4" role="status"><span class="sr-only">Loading...</span></div></div></div>');
    return $(e).prepend(t), t.fadeIn(200), t
}

function loadingHid(e) {
    ioadindex > 0 ? ioadindex-- : (ioadindex = 0, e.fadeOut(300, function () {
        e.remove()
    }))
}

function ioPopupTips(e, t, i) {
    var a = "";
    switch (e) {
        case 1:
            a = "icon-adopt";
            break;
        case 2:
            a = "icon-tishi";
            break;
        case 3:
            a = "icon-warning";
            break;
        case 4:
            a = "icon-close-circle"
    }
    var s = $('<section class="io-bomb ' + (1 == e ? "tips-success" : "tips-error") + ' io-bomb-sm io-bomb-open"><div class="io-bomb-overlay"></div><div class="io-bomb-body text-center"><div class="io-bomb-content bg-white px-5"><i class="iconfont ' + a + ' icon-8x"></i><p class="text-md mt-3">' + t + "</p></div></div></section>");
    $("body").addClass("modal-open").append(s), hasScrollbar() && $("body").css("padding-right", getScrollbarWidth()), setTimeout(function () {
        $("body").removeClass("modal-open"), hasScrollbar() && $("body").css("padding-right", ""), $.isFunction(i) && i(!0), s.removeClass("io-bomb-open").addClass("io-bomb-close"), setTimeout(function () {
            s.removeClass("io-bomb-close"), setTimeout(function () {
                s.remove()
            }, 200)
        }, 400)
    }, 2e3)
}

function ioPopup(e, t, i, a) {
    i = i ? 'style="' + i + '"' : "";
    var s = "";
    "big" == e ? s = "io-bomb-lg" : "no-padding" == e ? s = "io-bomb-nopd" : "cover" == e ? s = "io-bomb-cover io-bomb-nopd" : "full" == e ? s = "io-bomb-xl" : "small" == e ? s = "io-bomb-sm" : "confirm" == e && (s = "io-bomb-md");
    var o = $('\t<div class="io-bomb ' + s + ' io-bomb-open">\t\t<div class="io-bomb-overlay" ' + i + '></div>\t\t<div class="io-bomb-body text-center">\t\t\t<div class="io-bomb-content bg-white">\t\t\t\t' + t + '\t\t\t</div>\t\t\t<div class="btn-close-bomb mt-2">                <i class="iconfont icon-close-circle"></i>            </div>\t\t</div>\t</div>\t');
    $("body").addClass("modal-open").append(o), hasScrollbar() && $("body").css("padding-right", getScrollbarWidth());
    return $(o).on("click touchstart", ".btn-close-bomb i, .io-bomb-overlay", function (e) {
        e.preventDefault(), $.isFunction(a) && a(!0), $("body").removeClass("modal-open"), hasScrollbar() && $("body").css("padding-right", ""), $(o).removeClass("io-bomb-open").addClass("io-bomb-close"), setTimeout(function () {
            $(o).removeClass("io-bomb-close"), setTimeout(function () {
                o.remove()
            }, 200)
        }, 600)
    }), o
}

function ioConfirm(e, t) {
    var i = '\t<div class="io-bomb io-bomb-confirm io-bomb-open">\t\t<div class="io-bomb-overlay"></div>\t\t<div class="io-bomb-body">\t\t\t<div class="io-bomb-content bg-white">\t\t\t\t' + e + '                <div class="text-center mt-3">                    <button class="btn btn-danger mx-2" onclick="_onclick(true);">' + localize.okBtn + '</button>                    <button class="btn btn-light mx-2" onclick="_onclick(false);">' + localize.cancelBtn + "</button>                </div>\t\t\t</div>\t\t</div>\t</div>\t",
        a = $(i);
    $("body").addClass("modal-open").append(a), hasScrollbar() && $("body").css("padding-right", getScrollbarWidth()), _onclick = function (e) {
        s(), $.isFunction(t) && t(e)
    };
    var s = function () {
        $("body").removeClass("modal-open"), hasScrollbar() && $("body").css("padding-right", ""), $(a).removeClass("io-bomb-open").addClass("io-bomb-close"), setTimeout(function () {
            $(a).removeClass("io-bomb-close"), setTimeout(function () {
                a.remove()
            }, 200)
        }, 600)
    };
    return a
}

function hasScrollbar() {
    return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight) ? "11" : "22"
}

function getScrollbarWidth() {
    var e, t, i = document.createElement("DIV");
    return i.style.cssText = "position:absolute; top:-1000px; width:100px; height:100px; overflow:hidden;", e = document.body.appendChild(i).clientWidth, i.style.overflowY = "scroll", t = i.clientWidth, document.body.removeChild(i), e - t
}

function setCookie(e, t, i) {
    var a = "";
    if ("" != i) {
        var s = new Date;
        s.setTime(s.getTime() + 24 * i * 60 * 60 * 1e3), a = "expires=" + s.toGMTString()
    }
    document.cookie = e + "=" + t + "; " + a + "; path=/"
}

function getCookie(e) {
    for (var t = e + "=", i = document.cookie.split(";"), a = 0; a < i.length; a++) {
        var s = i[a].trim();
        if (0 == s.indexOf(t)) return s.substring(t.length, s.length)
    }
    return ""
}


/**
 * Minified by jsDelivr using Terser v5.3.5.
 * Original file: /npm/js-base64@3.6.0/base64.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : function () {
        const r = e.Base64, o = t();
        o.noConflict = () => (e.Base64 = r, o), e.Meteor && (Base64 = o), e.Base64 = o
    }()
}("undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : this, (function () {
    "use strict";
    const e = "3.6.0", t = "function" == typeof atob, r = "function" == typeof btoa, o = "function" == typeof Buffer,
        n = "function" == typeof TextDecoder ? new TextDecoder : void 0,
        a = "function" == typeof TextEncoder ? new TextEncoder : void 0,
        f = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="], i = (e => {
            let t = {};
            return e.forEach(((e, r) => t[e] = r)), t
        })(f), c = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/,
        u = String.fromCharCode.bind(String),
        s = "function" == typeof Uint8Array.from ? Uint8Array.from.bind(Uint8Array) : (e, t = (e => e)) => new Uint8Array(Array.prototype.slice.call(e, 0).map(t)),
        d = e => e.replace(/[+\/]/g, (e => "+" == e ? "-" : "_")).replace(/=+$/m, ""),
        l = e => e.replace(/[^A-Za-z0-9\+\/]/g, ""), h = e => {
            let t, r, o, n, a = "";
            const i = e.length % 3;
            for (let i = 0; i < e.length;) {
                if ((r = e.charCodeAt(i++)) > 255 || (o = e.charCodeAt(i++)) > 255 || (n = e.charCodeAt(i++)) > 255) throw new TypeError("invalid character found");
                t = r << 16 | o << 8 | n, a += f[t >> 18 & 63] + f[t >> 12 & 63] + f[t >> 6 & 63] + f[63 & t]
            }
            return i ? a.slice(0, i - 3) + "===".substring(i) : a
        }, p = r ? e => btoa(e) : o ? e => Buffer.from(e, "binary").toString("base64") : h,
        y = o ? e => Buffer.from(e).toString("base64") : e => {
            let t = [];
            for (let r = 0, o = e.length; r < o; r += 4096) t.push(u.apply(null, e.subarray(r, r + 4096)));
            return p(t.join(""))
        }, A = (e, t = !1) => t ? d(y(e)) : y(e), b = e => {
            if (e.length < 2) return (t = e.charCodeAt(0)) < 128 ? e : t < 2048 ? u(192 | t >>> 6) + u(128 | 63 & t) : u(224 | t >>> 12 & 15) + u(128 | t >>> 6 & 63) + u(128 | 63 & t);
            var t = 65536 + 1024 * (e.charCodeAt(0) - 55296) + (e.charCodeAt(1) - 56320);
            return u(240 | t >>> 18 & 7) + u(128 | t >>> 12 & 63) + u(128 | t >>> 6 & 63) + u(128 | 63 & t)
        }, g = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g, B = e => e.replace(g, b),
        x = o ? e => Buffer.from(e, "utf8").toString("base64") : a ? e => y(a.encode(e)) : e => p(B(e)),
        C = (e, t = !1) => t ? d(x(e)) : x(e), m = e => C(e, !0),
        U = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g, F = e => {
            switch (e.length) {
                case 4:
                    var t = ((7 & e.charCodeAt(0)) << 18 | (63 & e.charCodeAt(1)) << 12 | (63 & e.charCodeAt(2)) << 6 | 63 & e.charCodeAt(3)) - 65536;
                    return u(55296 + (t >>> 10)) + u(56320 + (1023 & t));
                case 3:
                    return u((15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2));
                default:
                    return u((31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1))
            }
        }, w = e => e.replace(U, F), S = e => {
            if (e = e.replace(/\s+/g, ""), !c.test(e)) throw new TypeError("malformed base64.");
            e += "==".slice(2 - (3 & e.length));
            let t, r, o, n = "";
            for (let a = 0; a < e.length;) t = i[e.charAt(a++)] << 18 | i[e.charAt(a++)] << 12 | (r = i[e.charAt(a++)]) << 6 | (o = i[e.charAt(a++)]), n += 64 === r ? u(t >> 16 & 255) : 64 === o ? u(t >> 16 & 255, t >> 8 & 255) : u(t >> 16 & 255, t >> 8 & 255, 255 & t);
            return n
        }, E = t ? e => atob(l(e)) : o ? e => Buffer.from(e, "base64").toString("binary") : S,
        v = o ? e => s(Buffer.from(e, "base64")) : e => s(E(e), (e => e.charCodeAt(0))), D = e => v(z(e)),
        R = o ? e => Buffer.from(e, "base64").toString("utf8") : n ? e => n.decode(v(e)) : e => w(E(e)),
        z = e => l(e.replace(/[-_]/g, (e => "-" == e ? "+" : "/"))), T = e => R(z(e)),
        Z = e => ({value: e, enumerable: !1, writable: !0, configurable: !0}), j = function () {
            const e = (e, t) => Object.defineProperty(String.prototype, e, Z(t));
            e("fromBase64", (function () {
                return T(this)
            })), e("toBase64", (function (e) {
                return C(this, e)
            })), e("toBase64URI", (function () {
                return C(this, !0)
            })), e("toBase64URL", (function () {
                return C(this, !0)
            })), e("toUint8Array", (function () {
                return D(this)
            }))
        }, I = function () {
            const e = (e, t) => Object.defineProperty(Uint8Array.prototype, e, Z(t));
            e("toBase64", (function (e) {
                return A(this, e)
            })), e("toBase64URI", (function () {
                return A(this, !0)
            })), e("toBase64URL", (function () {
                return A(this, !0)
            }))
        }, O = {
            version: e,
            VERSION: "3.6.0",
            atob: E,
            atobPolyfill: S,
            btoa: p,
            btoaPolyfill: h,
            fromBase64: T,
            toBase64: C,
            encode: C,
            encodeURI: m,
            encodeURL: m,
            utob: B,
            btou: w,
            decode: T,
            isValid: e => {
                if ("string" != typeof e) return !1;
                const t = e.replace(/\s+/g, "").replace(/=+$/, "");
                return !/[^\s0-9a-zA-Z\+/]/.test(t) || !/[^\s0-9a-zA-Z\-_]/.test(t)
            },
            fromUint8Array: A,
            toUint8Array: D,
            extendString: j,
            extendUint8Array: I,
            extendBuiltins: () => {
                j(), I()
            },
            Base64: {}
        };
    return Object.keys(O).forEach((e => O.Base64[e] = O[e])), O
}));

/**
 * Chrome Bookmarks Converter
 * v1.0.0
 *
 * Convert a standard exported Google Chrome bookmarks HTML file into a JavaScript oject structure.
 *
 * Dependencies: jQuery (latest).
 *
 * @summary Use JavaScript to convert an exported Chrome bookmarks HTML file. Export the results to JSON.
 * @author Jason Snelders <jason@jsnelders.com>
 *
 * Created at     : 2019-11-14 22:34:00
 * Last modified  : 2019-11-14 22:34:00
 */
function ChromBookmarkConverter() {
    this.bookmarks = {folders: []}, this.stripUnneededTags = function (a) {
        return a = a.replace(/<p>/gi, ""), a = a.replace(/<P>/gi, ""), a = a.replace(/<dt>/gi, ""), a = a.replace(/<DT>/gi, "")
    }, this.processChromeBookmarksContent = function (a) {
        var c, b = this;
        a = this.stripUnneededTags(a), c = $.parseHTML(a), $.each(c, function (a, c) {
            if ("DL" == c.tagName) {
                var d = {type: "folder", title: "未命名", items: []};
                b.bookmarks.folders.push(d), b.processDL(c, 1, d)
            }
        })
    }, this.processDL = function (a, b, c) {
        var d = this, e = 0, f = {}, g = {type: "folder", title: "", add_date: "", last_modified: "", items: []},
            h = {}, i = $(a), j = !1;
        $.each(i.children(), function (a, i) {
            var k, l, m, n, o, p, q, r, s;
            e += 1, k = b + "." + e, 1 == j && i.tagName.toLowerCase() != "DL".toLowerCase() && (j = !1, console.log("h3", f), g.items.push(f)), i.tagName.toLowerCase() == "DL".toLowerCase() && (g = {
                type: "folder",
                title: f.title,
                add_date: f.add_date,
                last_modified: f.last_modified,
                items: []
            }, 1 == j && (j = !1), d.bookmarks.folders.push(g), d.processDL(i, k, g)), i.tagName.toLowerCase() == "H3".toLowerCase() && (l = $(i), m = l.text() ? l.text() : "未命名", n = l.attr("add_date"), o = l.attr("last_modified"), f = {
                type: "header",
                title: m,
                add_date: n,
                last_modified: o
            }, j = !0), "a" == i.tagName.toLowerCase() && isURL($(i).attr("href")) && "" != $(i).text() && (p = $(i), q = p.text(), r = p.attr("href"), s = p.attr("add_date"), p.attr("icon"), h = {
                type: "link",
                title: q,
                href: r,
                add_date: s
            }, c.items.push(h))
        })
    }
}
