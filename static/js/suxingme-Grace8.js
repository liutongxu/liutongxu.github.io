

function clearButterbar() {
    if (jQuery(".butterBar").length > 0) {
        jQuery(".butterBar").remove();
    }
}

function createButterbar(message) {
    var t = this;
    t.clearButterbar();
    jQuery("body").append('<div class="butterBar butterBar--center is-active"><p class="butterBar-message">' + message + '</p></div>');
    setTimeout("jQuery('.butterBar').remove()", 3000);
}

jQuery(document).ready(function($) {

    if( suxingme_url.duang ){
        $(window).on('load', function() {
            $('.loader').fadeOut();
            $('.loader-mask').delay(350).fadeOut('slow');
        });
    }


    if( suxingme_url.sideroll ){
        /*
        -------------------------
        StickySidebar
        -------------------------
        */
        jQuery('.sidebar').theiaStickySidebar({
          // Settings
          additionalMarginTop: 110
        });
        
    }

    //wow
    if( suxingme_url.wow ){
        var wow = new WOW({
            boxClass: 'wow',
            animateClass: 'animated',
            offset: 100,
            mobile: true,
            live: true
        });
        wow.init();
    }
    /*

    -------------------------
    StickyNavbar
    -------------------------
    */
    $("div.navbar-fixed-top").autoHidingNavbar();
    


    switch( suxingme_url.slidestyle ){
        case 'index_slide_sytle_1' :
            var owl = $('.top-slide'); 
            owl.owlCarousel({
                items: 1,
                loop:true,
                animateOut: 'fadeOut',
                autoplay:true,
                autoplayTimeout:3000,
                responsive:{    
                    768:{
                      items:1,
                      nav : false,
                    }
                }
            });
            break;
        case 'index_slide_sytle_2' :
            var owl = $('.top-slide-two'); 
            owl.owlCarousel({
                items: 1,
                loop:true,
                animateOut: 'fadeOut',
                autoplay:true,
                autoplayTimeout:3000,
                nav : true,
                navText:'',
                responsive:{    
                    768:{
                      items:1,
                      nav : false,
                    },
                    992:{
                        nav : true,
                        navText:'',
                    }
                }
            });
            break;
        case 'index_slide_sytle_3' :
            var owl = $('.top-slide-three'); 
            owl.owlCarousel({
                items:1,
                loop:true,
                margin:10,
                autoplay:true,
                responsive: {
                    768 : {
                        items: 1,
                        margin: 0,
                        nav : false,
                    },
                    992 : {
                        items: 3,
                        margin: 0,
                        center: true,
                        autoplayTimeout:5000,
                        autoWidth:true,
                        nav : true,
                        navText:'',
                    }
                }
            });
            break;
        case 'index_slide_sytle_4' :
            var owl = $('.top-slide-two'); 
            owl.owlCarousel({
                items: 1,
                loop:true,
                animateOut: 'fadeOut',
                autoplay:true,
                autoplayTimeout:3000,
                nav : true,
                navText:'',
                responsive:{    
                    768:{
                      items:1,
                      nav : false,
                    },
                    992:{
                        nav : true,
                        navText:'',
                    }
                }
            });
                break;
        default:
            break;
    }

    $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');
    $(document).on('click', '#comments-navi a',
    function(e) {
        e.preventDefault();
        $.ajax({
            type: "GET",
            url: $(this).attr('href'),
            beforeSend: function() {
                $('#comments-navi').remove();
                $('.commentlist').remove();
                $('#loading-comments').slideDown()
            },
            dataType: "html",
            success: function(out) {
                result = $(out).find('.commentlist');
                nextlink = $(out).find('#comments-navi');
                $('#loading-comments').slideUp(550);
                $('#loading-comments').after(result.fadeIn(800));
                $('.commentlist').after(nextlink);
                $('.commentlist .avatar').lazyload({
                    event: 'scrollstop',
                });
            }
        })
    })



    /*
    -------------------------
    LIKE
    -------------------------
    */

	$.fn.postLike = function() {
	 if ($(this).hasClass('current')) {
     createButterbar("您已经赞过啦:-)");
	 return false;
	 } else {
	 $(this).addClass('current');
	 var id = $(this).data("id"),
	 action = $(this).data('action'),
	 rateHolder = $(this).children('.count');
	 var ajax_data = {
	 action: "suxing_like",
	 um_id: id,
	 um_action: action
	 };
	 $.post(suxingme_url.url_ajax, ajax_data,
	 function(data) {
	 $(rateHolder).html(data);
	 });
	 return false;
	 }
	};
	$(document).on("click", "#Addlike",
	function() {
	 $(this).postLike();
	});

    /*
    -------------------------
    SEARCH
    -------------------------
    */

    $('.js-toggle-search').on('click', function () {
        $('.search-form').toggleClass('is-visible');
        $("html").addClass("overflow-hidden");   
    });
    $('.close-search').click(function(){
        $(".search-form").removeClass("is-visible");
        $("html").removeClass("overflow-hidden");
    });


     /*
    -------------------------
    WEIXIN BOOM
    -------------------------
    */

    $('#tooltip-s-weixin').on('click', function () {
        $('.f-weixin-dropdown').toggleClass('is-visible');
    });
    $('#tooltip-f-weixin').on('click', function () {
        $('.f-weixin-dropdown').toggleClass('is-visible');
    });
    $(".close-weixin").on('click', function () {
        $(".f-weixin-dropdown").removeClass('is-visible');
    });
    
    
     $('#tooltip-s-weixin2').on('click', function () {
        $('.f-weixin-dropdown').toggleClass('is-visible');
    });
    
        $('#tooltip-s-weixin3').on('click', function () {
        $('.f-weixin-dropdown').toggleClass('is-visible');
    });

        $('#tooltip-s-weixin4').on('click', function () {
        $('.f-weixin-dropdown').toggleClass('is-visible');
    });
    /*
    -------------------------
    toTop
    -------------------------
    */

    !function(o){"use strict";o.fn.toTop=function(t){var i=this,e=o(window),s=o("html, body"),n=o.extend({autohide:!0,offset:420,speed:500,position:!0,right:38,bottom:38},t);i.css({cursor:"pointer"}),n.autohide&&i.css("display","none"),n.position&&i.css({position:"fixed",right:n.right,bottom:n.bottom}),i.click(function(){s.animate({scrollTop:0},n.speed)}),e.scroll(function(){var o=e.scrollTop();n.autohide&&(o>n.offset?i.fadeIn(n.speed):i.fadeOut(n.speed))})}}(jQuery);
    $(function() {
        $('.to-top').toTop();
     });
    $('body').append('<a class="to-top"><i class="icon-up-small"></i></a>');

    /*
    -------------------------
    MAIN NAV
    -------------------------
    */

    $(".navbar-collapse ul.navbar-nav li:has(>ul)").addClass("has-children");

    if($(".navbar-collapse ul.navbar-nav li").hasClass("has-children")){
        $(".navbar-collapse ul.navbar-nav li.has-children").prepend('<span class="toggle-submenu"></span>')
    }

    $('.navbar-collapse ul.navbar-nav li span').click(function(){
        if($(this).siblings('ul').hasClass('opened')){
            $(this).siblings('ul').removeClass('opened').slideUp(200);
            $(this).closest('li').removeClass('active');
        }
        else{
            $(this).siblings('ul').addClass('opened').slideDown(200);
            $(this).closest('li').addClass('active');
        }
    });   

    $(function(){
        $('.navbar-toggle').click(function(e){
            $('html, body').toggleClass('out');
            $('.navbar-fixed-top').toggleClass('out');
            $('.body-overlay').toggleClass('show-overlay');
            $('.navbar-collapse ul.navbar-nav').css({'overflow': 'hidden','height':document.documentElement.clientHeight});
            if ($('body').hasClass('out')) {
              $(this).focus();
            } else {
              $(this).blur();
            }
        });
        $('body').on({
            'click touchstart': function (e) {
              if ($('body').hasClass('out') && !$(e.target).closest('.navbar-collapse, button.navbar-toggle').length) {
                e.preventDefault();
                $('button.navbar-toggle').trigger('click');
                $('button.navbar-toggle').blur();
                $('.body-overlay').removeClass('show-overlay');

              }
            },
            keyup: function (e) {
              if (e.keyCode == 27 && $('body').hasClass('out')) {
                $('button.navbar-toggle').trigger('click');
              }
            }
        });
    });
    $(".navbar-collapse .navbar-nav").mCustomScrollbar({
        theme:"minimal-dark",
        scrollInertia:0
    });
    
    /*
    -------------------------
    Page loader
    -------------------------
    */
    if( suxingme_url.site_loading ){
        $(window).on('load', function () {
            $('body').addClass('loaded');
            setTimeout(function () {
                $('#pageloader').fadeOut('slow');
            }, 300);
        });
    }
});


document.addEventListener('DOMContentLoaded', function(){
   var aluContainer = document.querySelector('.comment-form-smilies');
    if ( !aluContainer ) return;
    aluContainer.addEventListener('click',function(e){
    var myField,
        _self = e.target.dataset.smilies ? e.target : e.target.parentNode,
        tag = ' ' + _self.dataset.smilies + ' ';
        if (document.getElementById('comment') && document.getElementById('comment').type == 'textarea') {
            myField = document.getElementById('comment')
        } else {
            return false
        }
        if (document.selection) {
            myField.focus();
            sel = document.selection.createRange();
            sel.text = tag;
            myField.focus()
        } else if (myField.selectionStart || myField.selectionStart == '0') {
            var startPos = myField.selectionStart;
            var endPos = myField.selectionEnd;
            var cursorPos = endPos;
            myField.value = myField.value.substring(0, startPos) + tag + myField.value.substring(endPos, myField.value.length);
            cursorPos += tag.length;
            myField.focus();
            myField.selectionStart = cursorPos;
            myField.selectionEnd = cursorPos
        } else {
            myField.value += tag;
            myField.focus()
        }
    });
});

jQuery(document).on("click", ".facetoggle", function($) {
    jQuery(".comment-form-smilies").toggle();
});

jQuery(document).on("click", "#fa-loadmore", function($) {
    var _self = jQuery(this),
        _postlistWrap = jQuery('.posts-con'),
        _button = jQuery('#fa-loadmore'),
        _data = _self.data();
    if (_self.hasClass('is-loading')) {
        return false
    } else {
        _button.html('<i class="icon-spin6 animate-spin"></i> 加载中...');
        _self.addClass('is-loading');
        jQuery.ajax({
            url: suxingme_url.url_ajax,
            data: _data,
            type: 'post',
            dataType: 'json',
            success: function(data) {
                if (data.code == 500) {
                    _button.data("paged", data.next).html('加载更多');
                    createButterbar('服务器正在努力找回自我  o(∩_∩)o')
                } else if (data.code == 200) {
                    _postlistWrap.append(data.postlist);
                    if( jQuery.isFunction(jQuery.fn.lazyload) ){
                        jQuery("img.lazy,img.avatar").lazyload({ effect: "fadeIn",});
                    } 
                    if (data.next) {
                        if( suxingme_url.wow ){
                            var btn = new WOW({
                                boxClass: 'button-more',
                                animateClass: 'animated',
                                offset: 0,
                                mobile: true,
                                live: true
                            });
                            btn.init();
                        }
                        _button.data("paged", data.next).html('加载更多')
                    } else {
                        _button.hide()
                    }
                }
                _self.removeClass('is-loading')
            },
            error:function(data){
                console.log(data.responseText);
                console.log(data);
            }
        })
    }
});


jQuery(document).on("click", ".post-nav span", function($) {
    var _self = jQuery(this),
        _postlistWrap = jQuery('.posts-con'),
        _button = jQuery('#fa-loadmore'),
        _data = _self.data();
    if (_self.hasClass('is-loading')) {
        return false
    } else {
        _postlistWrap.html('<div class="wait-tips"><i class="icon-spin6 animate-spin"></i> 加载中...</div>');
        _self.addClass('is-loading');
        _self.addClass("current").siblings().removeClass("current");
        _button.hide();
        jQuery.ajax({
            url: suxingme_url.url_ajax,
            data: _data,
            type: 'post',
            dataType: 'json',
            success: function(data) {
                if (data.code == 500) {
                    _button.data("paged", data.next).html('加载更多');
                    createButterbar('服务器正在努力找回自我  o(∩_∩)o')
                } else if (data.code == 200) {
                    _postlistWrap.html(data.postlist);
                    if( jQuery.isFunction(jQuery.fn.lazyload) ){
                        jQuery("img.lazy,img.avatar").lazyload({ effect: "fadeIn",});
                    }
                    if (data.next && _self.data("total") > 1) {
                        _button.show();
                        if( suxingme_url.wow ){
                            var btn = new WOW({
                                boxClass: 'button-more',
                                animateClass: 'animated',
                                offset: 0,
                                mobile: true,
                                live: true
                            });
                            btn.init();
                        }
                        _button.data("paged", data.next).html('加载更多');
                        if( _self.hasClass("new-post") ){
                           _button.data("home", true); 
                        } else {
                            _button.removeAttr("data-home");
                            _button.data("category",_self.data("category"));
                            _button.data("total",_self.data("total"));
                        }
                    } else {
                        _button.hide()
                    }
                }
                _self.removeClass('is-loading')
            },
            error:function(data){
                console.log(data.responseText);
                console.log(data);
            }
        })
    }
});

jQuery(document).on("click", "#contribute-cat li", function($) {
    jQuery(this).toggleClass('is-visible');
});

jQuery(document).on("click", "#radio2", function($) {
    jQuery(".copy-meta").hide();
});

jQuery(document).on("click", "#radio1", function($) {
    jQuery(".copy-meta").show();
});

jQuery(document).on("click", "#nice-check-contribute", function($) {

    tinyMCE.triggerSave();
    var type,name = source = '',
    catsopt = jQuery('#contribute-cat .is-visible'),
    title = jQuery('#title').val(),
    post_content = jQuery('#post_content').val(),
    cats = new Array(),
    cs = 0;
    catsopt.each(function(el) {
        if( jQuery(this).hasClass('is-visible') ){
            cs = 1;
            cats[el] = jQuery(this).attr('data-id');
        }
    });

    if( jQuery('#radio1').attr("checked") ){
        type = 1;
        name = jQuery('#name').val();
        source = jQuery('#source').val();
    }

    if( jQuery('#radio2').attr("checked") ){
        type = 2;
        name = source = '';
    }


    if( !title ){
        createButterbar('文章标题不能为空！');
        return false;
    }

    if( !post_content ){
        createButterbar('文章内容不能为空！');
        return false;
    }

    if( !cs ){
        createButterbar('至少选择一个分类！');
        return false;
    }

    if( type == 1 && ( name == '' || source =='' ) ){
        createButterbar('请填写完整版权说明');
        return false;
    }

    jQuery('#mailModal').modal('toggle');
});

jQuery(document).on("click", "#nice-do-contribute-verify-code", function($) {
    var nonce = jQuery(this).data('nonce');
    var email = jQuery("#email").val();
    var regemail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

    if( email == '' || !regemail.test(email) ){
        createButterbar('请填写正确的邮箱');
        return false;
    }

    jQuery.ajax({
        url: suxingme_url.url_ajax,
        type: "POST",
        data: {
            action: 'nice_send_mail_contribute',
            email:email,
            nonce:nonce
        },
        dataType: 'json',
        success: function(data) {
            if( data.code == 200 ){
                createButterbar(data.msg);
                var count = 60;
                var countdown = setInterval(CountDown, 1000);
                function CountDown() {
                    jQuery("#nice-do-contribute-verify-code").attr("disabled", true);
                    jQuery("#nice-do-contribute-verify-code").html( count + " 秒重发邮件");
                    if (count == 0) {
                        jQuery("#nice-do-contribute-verify-code").html("重发邮件").removeAttr("disabled");
                        clearInterval(countdown);
                    }
                    count--;
                }
            } else {
                createButterbar(data.msg);
            }
        },
    });

    return false;
});

jQuery(document).ready(function(){
    if( jQuery('#upimg').length > 0 ){
        jQuery("#upimg").wrap("<form id='imgupload' action='"+suxingme_url.url_ajax+"'  method='post' enctype='multipart/form-data'></form>");
        jQuery("#upimg").change(function(){
            if( jQuery("#upimg").val() != ''){
                jQuery("#imgupload").ajaxSubmit({
                    data:{action:'do_upimg', _suxingnonce:jQuery('#nonce').val()},
                    dataType:  'json',
                    success: function(data) {
                        console.log(data);
                        if( data.status == 1){
                            wp.media.editor.insert('<img class="aligncenter size-full" src="'+data.url+'" alt="" />');
                        } else {
                            createButterbar(data.info);
                        }
                               
                    },
                    error:function(xhr){
                        createButterbar('网络错误，请稍后再试！');
                    }
                });
            }
        });
    }
});

jQuery('#do-contribute').click(function() {
    tinyMCE.triggerSave();
    var type,name,source  = '',
    catsopt = jQuery('#contribute-cat .is-visible'),
    title = jQuery('#title').val(),
    post_content = jQuery('#post_content').val(),
    _suxingnonce = jQuery('#nonce').val(),
    email = jQuery('#email').val(),
    code = jQuery('#code').val(),
    cats = new Array(),
    cs = 0;
    catsopt.each(function(el) {
        if( jQuery(this).hasClass('is-visible') ){
            cs = 1;
            cats[el] = jQuery(this).attr('data-id');
        }
    });

    if( jQuery('#radio1').attr("checked") ){
        type = 1;
        name = jQuery('#name').val();
        source = jQuery('#source').val();
    }

    if( jQuery('#radio2').attr("checked") ){
        type = 2;
        name = source = '';
    }


    if( !title ){
        createButterbar('文章标题不能为空！');
        return false;
    }

    if( !post_content ){
        createButterbar('文章内容不能为空！');
        return false;
    }

    if( !cs ){
        createButterbar('至少选择一个分类！');
        return false;
    }

    if( type == 1 && ( name == '' || source =='' ) ){
        createButterbar('请填写完整版权说明');
        return false;
    }

    if( email == '' ){
        createButterbar('请填写邮箱');
        return false;
    }

    if( code == '' ){
        createButterbar('请填写验证码');
        return false;
    }

    jQuery.ajax({
        url: suxingme_url.url_ajax,
        type: 'POST',
        dataType: 'json',
        data: {action: 'do_contribute' , cats: cats , title: title , post_content: post_content , type:type, name:name,source:source,email:email,code:code,_suxingnonce:_suxingnonce },
    })
    .done(function(data) {
        if( data.status != 0 ){
            alert(data.info);
            location.replace(location.href);
        }else{
            createButterbar(data.info);
        }
    })
    .fail(function() {
        console.log("error");
    });
});