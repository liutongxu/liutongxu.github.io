/* http://www.mobantu.com/7458.html */
jQuery(function($){
    popupTemplate = {
        toast: function(t) {
            var e = t.type,
            n = t.icon,
            a = t.text,
            s = t.display;
            return '\n            <div class="wppay-toast ' + e + " " + s + '" id="toast">\n                ' + (n && "text" !== e ? "\n                    " + ("icon-loading" === n ? '\n                        <div class="icon">\n                            <svg class="circular" viewBox="25 25 50 50">\n                                <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="3" stroke-miterlimit="10"/>\n                            </svg>\n                        </div>\n                    ': '\n                    <div class="icon">\n                        <i class="erphp ' + n + '"></i>\n                    </div>\n                    ') + "\n                ": "") + "\n                " + (a && "icon" !== e ? '\n                    <div class="text">\n                        <p>' + a + "</p>\n                    </div>\n                ": "") + "\n            </div>\n        "
        },
        modal: function(t) {
            var e = t.title,
            n = t.content,
            a = t.showCancel,
            s = t.btnText,
            o = t.id,
            i = void 0 === o ? "modal": o;
            return '\n            <div class="wppay-modal-box" data-lib="popup" data-popup-action="layerClose" data-layer="' + i + '" id="' + i + '">\n                <div class="wppay-modal">\n                    <p class="title">' + e + '</p>\n                    <div class="content">\n                        <p>' + n + '</p>\n                    </div>\n                    <div class="options-btns">\n                        <a href="javascript:;" data-callback="success" class="yes">' + s[0] + "</a>\n                        " + (a ? '\n                            <a href="javascript:;" data-callback="fail" class="close">' + s[1] + "</a>\n                        ": "") + "\n                    </div>\n                </div>\n            </div>\n        "
        },
        customModal: function(t) {
            return '\n            <div class="wppay-custom-modal-box" data-lib="popup" data-popup-action="layerClose" data-layer="customModal" id="customModal">\n                <div class="wppay-modal">\n                    <div class="close-modal" data-popup-action="customModalClose">×</div>\n                    ' + t + "\n                </div>\n            </div>\n        "
        }
    },
    customModalTemplate = {
        erphpWppayQrcode: function(t) {
            if(_WPPAY.payment == 2){
                bgstyle = 'style="background-color: #21ab36 !important;"';
                var aliqr = '',wxqr = '',wxtit='',alitit='';
                if(t.code){
                    if(!t.code2){
                        aliqr = '<section class="item">\n        <div class="wppay-title">扫一扫支付 <span class="price">'+t.price+'</span> 元</div>                <section class="qr-code">\n                            <img src="'+t.code+'" class="img" alt="">\n                        </section>\n                        <p class="account">支付完成后请等待5秒左右，期间请勿关闭此页面</p>\n                        <p class="desc wtime"></p><p class="wap"><a href="'+t.aliurl+'" target="_blank">启动支付宝APP支付</a></p>\n                    </section>';
                        alitit = '<a href="javascript:;" data-custom-action="switchWppayPayment" data-payment="alipay" class="active wppay-alipay" >支付宝</a>\n';
                        bgstyle = 'style="background-color: #00a3ee !important;"';
                    }else{
                        aliqr = '<section class="item" style="display:none">\n       <div class="wppay-title">扫一扫支付 <span class="price">'+t.price+'</span> 元</div>                 <section class="qr-code">\n                            <img src="'+t.code+'" class="img" alt="">\n                        </section>\n                        <p class="account">支付完成后请等待5秒左右，期间请勿关闭此页面</p>\n                        <p class="desc wtime"></p><p class="wap"><a href="'+t.aliurl+'" target="_blank">启动支付宝APP支付</a></p>\n                    </section>';
                        alitit = '<a href="javascript:;" data-custom-action="switchWppayPayment" data-payment="alipay" class="wppay-alipay" >支付宝</a>\n';
                    }
                }

                if(t.code2){
                    wxqr = '<section class="item">\n           <div class="wppay-title">扫一扫支付 <span class="price">'+t.price2+'</span> 元</div>             <section class="qr-code">\n                            <img src="'+t.code2+'" class="img" alt="">\n                        </section>\n                        <p class="account">支付完成后请等待5秒左右，期间请勿关闭此页面</p>\n                        <p class="desc wtime"></p><p class="wap">请截屏，打开微信扫一扫，从相册里选择截图</p>\n                    </section>';
                    wxtit = '<a href="javascript:;" data-custom-action="switchWppayPayment" data-payment="weixin" class="active wppay-weixin">微信</a>\n';
                }

                return '\n            <section class="erphp-wppay-qrcode mobantu-wppay wppay-net">\n                 <section class="tab">\n                        '+wxtit+alitit+'                        </section>\n                <section class="tab-list" '+bgstyle+'>\n                    '+wxqr+'\n              '+aliqr+'\n                                        </section>\n            </section>\n        '
            }else{
                return '\n            <div class="erphp-wppay-qrcode mobantu-wppay wppay-net">\n                <div class="tab">\n                    <a href="javascript:;" class="active">'+(_WPPAY.payment==1 ? '<div class="payment"><img src="'+_WPPAY.uri+'/static/img/payment-alipay.png"></div>扫一扫':'扫一扫')+'支付 <span class="price">'+t.price+'</span> 元</a>\n                           </div>\n                <div class="tab-list">\n                    <div class="item">\n                        <div class="qr-code">\n                            <img src="'+t.code+'" class="img" alt="">\n                        </div>\n                        <p class="account">支付完成后请等待5秒左右，期间请勿关闭此页面</p>\n                        <p class="desc wtime"></p><p class="wap"><a href="'+t.aliurl+'" target="_blank">启动支付宝APP支付</a></p>\n                    </div>\n                                                      </div>\n            </div>\n        '
            }
        }
    },
    customModalFunc = {
        addEvent: function() {
            var t = this;
            $(popup.element.customModal).on("click", "*[data-custom-action]",
            function(e) {
                var n = $(this).data("custom-action");
                t[n]($(this), e)
            })
        },
        removeEvent: function() {
            $(popup.element.customModal).off("click", "*[data-custom-action]")
        },
        switchWppayPayment: function(t) {
            var ptype = t.data("payment");
            var e = t.index();

            if(ptype == "weixin"){
                $(".tab-list").css("background-color", "#21ab36");
            }else{
                $(".tab-list").css("background-color", "#00a3ee");
            }

            t.addClass("active").siblings().removeClass("active"),
            $(".tab-list .item").eq(e).show().siblings().hide()
        },
    };
    window.popup = {
        element: {
            body: "body",
            head: "head",
            toast: "#toast",
            modal: "#modal",
            customModal: "#customModal",
            scrollBodyStyle: "#scrollBodyStyle"
        },
        addEvent: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "body",
            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
            n = this,
            a = null !== e ? '*[data-popup-action="' + e + '"]': "*[data-popup-action]";
            $(this.element[t]).on("click", a,
            function(t) {
                var e = $(this).data("popup-action");
                n[e]($(this), t)
            })
        },
        removeEvent: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "body",
            e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
            n = null !== e ? '*[data-popup-action="' + e + '"]': "*[data-popup-action]";
            $(this.element[t]).off("click", n)
        },
        showToast: function() {
            var t = this,
            e = arguments,
            n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            a = n.type,
            s = void 0 === a ? "icon": a,
            o = n.icon,
            i = void 0 === o ? "icon-loading": o,
            c = n.text,
            l = void 0 === c ? "加载中...": c,
            d = n.display,
            p = void 0 === d ? "fs": d,
            m = n.el,
            u = void 0 === m ? "": m,
            r = n.time,
            h = void 0 === r ? 1500 : r,
            v = n.callback;
            $(this.element.body).find(this.element.toast).length <= 0 ? ("el" === p ? (u = "string" == typeof u ? $(u) : u, u.append(popupTemplate.toast({
                type: s,
                icon: i,
                text: l,
                display: p
            }))) : $(this.element.body).append(popupTemplate.toast({
                type: s,
                icon: i,
                text: l,
                display: p
            })), $(this.element.toast).animate({
                opacity: 1
            },
            300), this.toastTimer = setTimeout(function() {
                $(t.element.toast).animate({
                    opacity: 0
                },
                300,
                function() {
                    $(t.element.toast).remove(),
                    "function" == typeof v && v()
                })
            },
            h)) : this.hideToast(function() {
                t.showToast.call(t, e[0])
            })
        },
        hideToast: function(t) {
            var e = this;
            $(this.element.toast).animate({
                opacity: 0
            },
            300,
            function() {
                /* powered by wppay.net */
                $(e.element.toast).remove(),
                clearTimeout(e.toastTimer),
                e.toastTimer = null,
                "function" == typeof t ? t() : void 0
            })
        },
        showModal: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            e = t.title,
            n = void 0 === e ? "提示": e,
            a = t.content,
            s = void 0 === a ? "": a,
            o = t.showCancel,
            i = void 0 === o ? !0 : o,
            c = t.btnText,
            l = void 0 === c ? ["确定", "取消"] : c,
            d = (t.multiple, t.layerClose),
            p = void 0 === d ? !1 : d,
            m = (t.success, t.fail, arguments),
            u = this,
            r = $(this.element.body).find(this.element.modal).length,
            h = "modal_" + r;
            $(this.element.body).find("#" + h).length <= 0 && (utils.disabledScroll(), $(this.element.body).append(popupTemplate.modal({
                title: n,
                content: s,
                showCancel: i,
                btnText: l,
                id: h
            })), $("#" + h).on("click", "*[data-callback]",
            function() {
                var t = $(this).data("callback");
                m.length > 0 && m[0] && ("function" == typeof m[0][t] && m[0][t] ? m[0][t](h) : "")
            }), p && $("#" + h).on("click",
            function(t) {
                u.layerClose($(this), t)
            }))
        },
        showCustomModal: function(t) {
            var e = t.template,
            n = void 0 === e ? "": e,
            a = t.data,
            s = void 0 === a ? {}: a,
            o = t.callback,
            i = t.layerClose,
            c = void 0 === i ? !1 : i,
            l = this;
            $(this.element.body).find(this.element.customModal).length <= 0 && ($(this.element.body).append(popupTemplate.customModal(customModalTemplate[n](s))), this.addEvent("body", "customModalClose"), customModalFunc.addEvent(), c && $(this.element.customModal).on("click",
            function(t) {
                l.layerClose($(this), t)
            }), $(this.element.customModal).find("*[data-custom-submit]").length > 0 && $(this.element.customModal).on("click", "*[data-custom-submit]",
            function() {
                var t = {};
                $(l.element.customModal).find("*[name]").each(function() {
                    var e = $(this).attr("name");
                    t[e] = $(this).val() || ""
                }),
                "function" == typeof o ? o($(this), t) : function() {}
            }))
        },
        hideModal: function(t) {
            $("#" + t).remove(),
            this.commonHide()
        },
        customModalClose: function(t) {
            t.parents("" + this.element.customModal).remove(),
            this.commonHide()
        },
        layerClose: function(t, e) {
            var n = e.target,
            a = t.data("layer");
            n.id && n.id === a && ($("#" + a).off("click").remove(), this.commonHide())
        },
        commonHide: function() {
            var t = $(this.element.body).find("*[data-lib]").length;
            0 >= t && (this.removeEvent()),
            $(this.element.body).off("click", '*[data-popup-action="customModalClose"]'),
            customModalFunc.removeEvent(),
            $(this.element.customModal).off("click", "*[data-custom-submit]")
        }
    };

    var erphpWppayTimer, erphpWppayOrder;
    $(".erphp-wppay-loader").on("click",function(){
        clearInterval(erphpWppayOrder);
        clearInterval(erphpWppayTimer);
        var post_id = $(this).data("post");
        if(post_id){
            popup.showToast({
                type: "it",
                text: "处理中...",
                time: 1e5
            });
            $.post(wppay_ajax_url, {
                "action": "wppay",
                "post_id": post_id
            }, function(result) {
                if( result.status == 200 ){
                    popup.hideToast();
                    popup.showCustomModal({
                        template: "erphpWppayQrcode",
                        layerClose: 0,
                        data: {
                        	price: result.price,
                            price2: result.price2,
                        	code: result.code,
                            code2: result.code2,
                            aliurl: result.aliurl
                        }
                    });

                    var m = 5;
                    if(result.minute) m = result.minute;

                    erphpWppayOrder = setInterval(function() {
                        $.post(wppay_ajax_url, {
                            "action": "wppay_pay",
                            "post_id": post_id,
                            "order_num": result.num
                        }, function(data) {
                            if(data.status == "1"){
                                clearInterval(erphpWppayOrder);
                                popup.hideModal('customModal');
                                popup.showToast({
                                    type: "text",
                                    text: "支付成功！"
                                });
                                location.reload();
                            }
                        });
                    }, 5000);

                    var s = 0;  
                    wppayCountdown();
                    erphpWppayTimer = setInterval(function(){ wppayCountdown(); },1000);
                    function wppayCountdown(){
                        $(".wtime").html("支付倒计时：<span>0"+m+"分"+s+"秒</span>");
                        if( m == 0 && s == 0 ){
                            clearInterval(erphpWppayOrder);
                            clearInterval(erphpWppayTimer);
                            popup.hideModal('customModal');
                            m = 4;
                            s = 59;
                        }else if( m >= 0 ){
                            if( s > 0 ){
                                s--;
                            }else if( s == 0 ){
                                m--;
                                s = 59;
                            }
                        }
                    }

                }else if( result.status == 201 ){
                    popup.showToast({
                        type: "text",
                        text: result.msg
                    });
                }else{
                    popup.showToast({
                        type: "text",
                        text: "获取支付信息失败！"
                    });
                }
            }, 'json'); 
        }else{
            popup.showToast({
                type: "text",
                text: "获取支付信息失败！"
            });
        }
        return false;
    });
});