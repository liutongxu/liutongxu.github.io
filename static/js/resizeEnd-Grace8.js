
;(function(plugin) {
	var chicago = window.Chicago || {
		utils : {
			now: Date.now || function() {
				return new Date().getTime();
			},
			uid : function(prefix) {
				return ( prefix || 'id' ) + chicago.utils.now() + 'RAND' + Math.ceil( Math.random() * 1e5 );
			},
			is : {
				number : function(obj) {
					return ! isNaN( parseFloat( obj ) ) && isFinite( obj );
				},
				fn : function(obj) {
					return typeof obj === 'function';
				},
				object : function(obj) {
					return Object.prototype.toString.call(obj) === "[object Object]";
				}
			},
			debounce : function(fn, wait, immediate) {
				var timeout;
				return function() {
					var context = this,
						args = arguments,
						later = function() {
							timeout = null;
							if ( ! immediate ) {
								fn.apply( context, args );
							}
						},
						callNow = immediate && !timeout;
					if( timeout ) {
						clearTimeout(timeout);
					}
					timeout = setTimeout( later, wait );
					if( callNow ) {
						fn.apply( context, args );
					}
				};
			},
		},
		$ : window.jQuery || null
	};

	if(typeof define === 'function' && define.amd) {
		define('chicago', function() {
			chicago.load = function(res, req, onload, config) {
				var resources = res.split(','),
					load = [];
				var base = ( config.config && config.config.chicago && config.config.chicago.base ? config.config.chicago.base : '' ).replace( /\/+$/g, '' );
				if( ! base ) {
					throw new Error( 'Please define base path to jQuery resizeend in the requirejs config.' );
				}
				var i = 0;
				while(i < resources.length) {
					var resource = resources[i].replace(/\./g, '/');
					load.push(base + '/' + resource);
					i += 1;
				}
				req(load, function() {
					onload( chicago );
				});
			};
			return chicago;
		});
	}

	if( window && window.jQuery ) {
		return plugin( chicago, window, window.document );
	} else if( ! window.jQuery ) {
		throw new Error( 'jQuery resizeend requires jQuery' );
	}

})(function(_c, win, doc) {

	_c.$win = _c.$(win);
	_c.$doc = _c.$(doc);

	if( ! _c.events ) {
		_c.events = {};
	}

	_c.events.resizeend = {
		defaults : {
			delay : 250
		},
		setup : function() {
			var args = arguments,
				options = {
					delay : _c.$.event.special.resizeend.defaults.delay
				},
				fn;

			if( _c.utils.is.fn( args[0] ) ) {
				fn = args[0];
			} else if( _c.utils.is.number( args[0] ) ) {
				options.delay = args[0];
			} else if( _c.utils.is.object( args[0] ) ) {
				options = _c.$.extend({}, options, args[0]);
			}

			var uid = _c.utils.uid('resizeend'),
				_data = _c.$.extend({
					delay : _c.$.event.special.resizeend.defaults.delay
				}, options),
				timer = _data,
				handler = function(e) {
					if(timer) {
						clearTimeout(timer);
					}
					timer = setTimeout(function() {
						timer = null;
						e.type = 'resizeend.chicago.dom';
						return _c.$(e.target).trigger('resizeend', e);
					}, _data.delay);
				};
			_c.$(this).data('chicago.event.resizeend.uid', uid);
			return _c.$(this).on('resize', _c.utils.debounce(handler, 100)).data(uid, handler);
		},
		teardown : function() {
			var uid = _c.$(this).data('chicago.event.resizeend.uid');
			_c.$(this).off('resize', _c.$(this).data(uid));
			_c.$(this).removeData(uid);
			return _c.$(this).removeData('chicago.event.resizeend.uid');
		}
	};

	(function() {
		_c.$.event.special.resizeend = _c.events.resizeend;
		_c.$.fn.resizeend = function(options, callback) {
			return this.each(function() {
				_c.$(this).on('resizeend', options, callback);
			});
		};
	})();
});


jQuery(document).ready(function($){
	// VIDEO IFRAME
	
	video_ok()
	$(window).resizeend(function(event) {
	    video_ok()
	});

	function video_ok(){
		var cw = $('.post-content').width()
	    $('.post-content embed, .post-content video, .post-content iframe').each(function(){
	        var w = $(this).attr('width')||0,
	            h = $(this).attr('height')||0
	        if( cw && w && h ){
	            $(this).css('width', cw<w?cw:w)
	            $(this).css('height', $(this).width()/(w/h))
	        }
	    })
	}
});