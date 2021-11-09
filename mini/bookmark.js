function StickyNavigation() {
	 
	this.currentId = null;
	this.currentTab = null;
	this.ultimateTab = 0;
	this.tabContainerHeight = 165;
	let self = this;
	if($('.sites-tab')[0]){
		$('.sites-tab').click(function(event) { 
			self.onTabClick(event, $(this)); 
		});
		$(window).scroll(function() { self.onScroll(); });
		$(window).resize(function() { self.onResize(); });
	} 
	this.onTabClick = function(event, element) {
		event.preventDefault();
		let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
		$('html, body').animate({ scrollTop: scrollTop }, 600);
	}
	
	this.onScroll = function() {
		this.checkTabContainerPosition();
        this.findCurrentTabSelector();
	}
	
	this.onResize = function() {
		if(this.currentId) {
			this.setSliderCss();
		}
	}
	
	this.checkTabContainerPosition = function() {
		let offset = $('.sites-tabs').offset().top + $('.sites-tabs').height() - this.tabContainerHeight; 
		if($(window).scrollTop() > offset) {
			$('.sites-tabs-container').addClass('sites-tabs-container-top');
            //$('header.navbar-dark').addClass('ub-blur-bg');
		} 
		else {
			$('.sites-tabs-container').removeClass('sites-tabs-container-top');
            //$('header.navbar-dark').removeClass('ub-blur-bg');
		}
	}
	
	this.findCurrentTabSelector = function(element) {
		let newCurrentId;
		let newCurrentTab;
		let self = this;
		$('.sites-tab:not(.list-hide)').each(function() {
			let id = $(this).attr('href');
			let offsetTop = $(id).offset().top - self.tabContainerHeight;
			let offsetBottom = $(id).offset().top + $(id).height();
			if($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
				newCurrentId = id;
				newCurrentTab = $(this);
			} 
		});
		if(this.currentId != newCurrentId || this.currentId === null) {
			this.currentId = newCurrentId;
			this.currentTab = newCurrentTab;
			this.setSliderCss();
		}
	}
	
	this.setSliderCss = function() {
		let width = 0;
		let left = 0;
		if(this.currentTab) {
			if(this.currentTab.hasClass('hide')){
				width = 0;
				left = this.ultimateTab;
			}
			else{
				width = parseFloat(this.currentTab.css('width'))-40;
				this.ultimateTab = this.currentTab.offset().left+20;
				left = this.ultimateTab;
			}
		}
		$('.sites-tab-slider').css('width', width);
		$('.sites-tab-slider').css('left', left);
	}
	
}

var stickyNavigation = new StickyNavigation();


(function($){ 
    $(document).on('click', '#seting-btn', function(event) {
        event.preventDefault();
        menuToggle();
    });
    $(document).on('click', '.seting-close', function(event) {
        event.preventDefault(); 
        menuToggle();
    });
    function menuToggle(){
        var parent = $('.seting-panel');
        var $bg = $('<div id="menu-bg" class="menu-backdrop" style="display: none;"></div>');
        if($('body').hasClass('modal-open')){
			if(hasScrollbar()){$('body').css("padding-right",'');$('.navbar-dark.fixed-top').css("margin-right",'');$('.align-items-end.sites-tabs-container-top').css("padding-right",'')}
            $('#menu-bg').fadeOut(800,function(){$(this).remove()});
        }else{
			var _w=getScrollbarWidth();
			if(hasScrollbar()){$('body').css("padding-right",_w);$('.navbar-dark.fixed-top').css("margin-right",_w);$('.align-items-end.sites-tabs-container-top').css("padding-right",_w)}
			//if(hasScrollbar())$('body').css("padding-right",getScrollbarWidth());
            $('body').append($bg);
            $bg.insertBefore(parent).on('click',menuToggle).fadeIn(800);
        }
        $('body').toggleClass('modal-open')
        parent.toggleClass('seting-open'); 
    }
    var copyUrl = new ClipboardJS('a.copy-url'); 
    var wid = 0;
    $(window).resize(function() {
        clearTimeout(wid);
        wid = setTimeout(go_resize, 200); 
    });
    $(document).ready(function(){
        go_resize();
    });
    function go_resize() {
        $(".sites-tab-btn:not(.list-hide)").each(function(){
            var this_w = $(this).offset().left+$(this).outerWidth() ; 
            var tabs_sites = $('.sites-tabs-btn').width()+$('.sites-tabs-btn').offset().left;
            if(this_w>tabs_sites){
                $(this).addClass('hide');
            }else{
                if($(this).hasClass('hide')){
                    $(this).removeClass('hide')
                } 
            }
        }); 
    }
	$('input[type=radio][name=bg]').change(function() {
        if (this.value == 'custom') { 
            $('#custom-img').show(100); 
        } else { 
            $('#custom-img').hide(100); 
        } 
    });
    $('#sites-btn-dropdown').on('show.bs.dropdown', function (event) {
        $(".sites-tab-btn").each(function(){ 
            if($(this).hasClass('hide')){
                $(this).clone().insertBefore('.sites-btn-dropdown-divider').removeClass('hide').addClass('list-hide').on('click',onTabClick)
            }  
        });  
    });
    $('#sites-btn-dropdown').on('hidden.bs.dropdown', function (event) {
        $('.list-hide').remove();  
    });
    function onTabClick() {
		let scrollTop = $($(this).attr('href')).offset().top - stickyNavigation.tabContainerHeight + 1;
		$('html, body').animate({ scrollTop: scrollTop }, 600);
	}

	$(document).on('submit','.bookmark-seting-form',function(){
		var t = $(this);
		t.find('.submit').text("保存中...").attr("disabled",true);
		$.ajax({
			url: theme.ajaxurl, 
			data : $(this).serialize(),
			type: 'POST',
			dataType: 'json',
		})
		.done(function(response) {  
			if(response.status == 1){ 
				location.reload();
			}
			t.find('.submit').text("保存").removeAttr("disabled");
			countdown = 0;
			showAlert(response); 
		})
		.fail(function() {  
			t.find('.submit').text("保存").removeAttr("disabled");
			showAlert(JSON.parse('{"status":4,"msg":"网络错误！"}'));
		});
		return false;
	});
	var loadUrlData;
	$(document).on("focus", ".smart-tips.search-key", function() {
		var _this = $(this);
		if(_this.attr('zhannei')=='')
			return;
		var parent = _this.parents('#search');
		var list = parent.children(".search-smart-tips");
		if(_this.val()==''){
			list.children("ul").text("");
		}else if(!list.children("ul").hasClass('li-null')){ 
			if(list.find("i").length>0){
				list.slideDown(200);
			}else if(_this.val()){
				loadUrlData = setTimeout(function (){showUrlBox(_this,parent)}, 500);
			}
		}else if(list.children("ul").hasClass('li-null') && list.find("i").length>0){
			list.slideDown(200);
		}else{
			list.children("ul").text("").addClass('li-null').append("<li><i class='iconfont icon-globe mr-2'></i>null...</li>");
			list.slideDown(200);
		}
	});
    $(document).on("keyup", ".smart-tips.search-key", function() {
		var _this = $(this);
		if(_this.attr('zhannei')=='')
			return;
		var parent = _this.parents('#search');
		if(_this.val()==''){
			clearTimeout(loadUrlData);
		} else {
			clearTimeout(loadUrlData);
			loadUrlData = setTimeout(function(){showUrlBox(_this,parent)}, 800);
        }
    });
	function showUrlBox(_this,parent){
		$.ajax({
			url: theme.ajaxurl, 
			data : {
				action:'search_custom_url',
				key_word:_this.val()
			},
			type: 'POST',
			dataType: 'json',
		})
		.done(function(response) {  
			var list = parent.children(".search-smart-tips");
			list.children("ul").text("");
			if(response.status == 4){
				list.children("ul").addClass('li-null').append("<li><i class='iconfont icon-globe mr-2'></i>null...</li>");
				list.slideDown(200);
				return;
			}
			tipsList = response.length;
			if (tipsList) {
				for (var i = 0; i < tipsList; i++) {
					list.children("ul").removeClass('li-null').append("<li><a href='"+response[i]['url']+"' target='_blank' rel='external nofollow noopener'><i class='iconfont icon-globe mr-2'></i>" + response[i]['url_name'] + "<a></li>");
				};
				list.slideDown(200);
			} else {
				list.slideUp(200);
			}
		})
		.fail(function() {  
			showAlert(JSON.parse('{"status":4,"msg":"网络错误！"}'));
		});
	}
	//var colorThief = new ColorThief();
    //var img = $('.img-bg-img')[0]; 
    //if (img.complete) {
	//	getColorFromImage(img,'complete');
    //}  else {
	//	img.addEventListener('load', function() {
	//		getColorFromImage(img,'listener');
	//	});
	//}
	
	function getColorFromImage(img,origin) {
        let color = colorThief.getColor(img); 
		const grayLevel = color[0] * 0.299 + color[1] * 0.587 + color[2] * 0.114;
		if (grayLevel >= 192) {
			//$('body').addClass('io-black-mode');
		} else {
			//$('body').removeClass('io-black-mode');
		}
        console.log(origin,color);
	} 
})(jQuery);