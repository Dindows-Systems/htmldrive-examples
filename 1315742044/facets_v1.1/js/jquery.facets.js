/*
 * jQuery Facets v1.1
 * http://www.tn34.de
 * Authors: Mario Alves (JavaScript) + David Hestler (HTML / CSS)
 *
 * Copyright 2010, TN34.DE
 * Released under the GPL license.
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Date: Wed Nov 10 11:19:511 2010
 */

(function($) {
	
	/*
	 * create facets object
	 *
	 * @param {string, object} data A string, jQuery object or DOM element
	 * @param {object} [options] An optional object containing options overrides
	 */
	jQuery.facets = function(data, options) {
		return jQuery.facets.impl.init(data, options);
	};
	
	/*
	 * reset all clips
	 *
	 * @param {boolean} animated transition or instant setting
	 */
	jQuery.facets.resetClips = function(animated) {
		jQuery.facets.impl.resetClipValues(animated);
	};

	
	/*
	 * maximize clip
	 *
	 * @param {number}
	 */
	jQuery.facets.open = function(index) {
		jQuery.facets.impl.maximize(index);
	};
	
	/*
	 * maximize a certain clip
	 *
	 * @param {number}
	 */
	jQuery.facets.close = function(index) {
		jQuery.facets.impl.minimize(index);
	};
	
	/*
	 * keep a certain clip opened
	 *
	 * @param {number}
	 */
	jQuery.facets.lock = function(index) {
		jQuery.facets.impl.theOpenKeeper('true');
		jQuery.facets.impl.maximize(index);
	};
	
	/*
	 * keep a certain clip opened
	 *
	 * @param {number}
	 */
	jQuery.facets.unlock = function(index) {
		jQuery.facets.impl.theOpenKeeper('false');
		jQuery.facets.impl.minimizeAll();
	};
	
	/*
	 * keep a certain clip opened
	 *
	 * @param {number}
	 */
	jQuery.facets.restore = function() {
		jQuery.facets.impl.theOpenKeeper('restore');
		jQuery.facets.impl.minimizeAll();
	};
	
	/*
	 * chained function to create the facets panel
	 *
	 * @param {object} [options]
	 */
	jQuery.fn.facets = function(options) {
		return jQuery.facets.impl.init(this, options);
	};
	
	/*
	 * facets default options
	 *
	 * control:			(string: '') the DOM element id or jQuery selector of the control element, for example a 'ul'
	 * autoStart:		(object: null) automatically open the clip at start that correspons to given index
	 * autoCliping:		(boolean: false) automatically reset / adjust all clips at start
	 * debug:			(boolean: false) automatically write actions to console (firefox) or to div#facetsDebug (all other) wich is created and appended to document.body automatically at start
	 * clipSpacing:		(number: 0) automatically create space between clips
	 * animationSpeed:	(number: 500) speed of the animation on maximize or minimize
	 * keepItOpened:	(boolean: false) automatically keep the last opened clip open
	 * minimizeTimeout:	(number: 0) leave last opened clip maximized for x time, then close
	 * contentRelations:(boolean: false) automatically add css class 'on' to all 'a' elements with rel-attribute equals the id of the opened clip
	 * sense			(boolean: false) automatically connect 'a' elements with a corresponding id in the rel-attribute to a clip
	 * activePanel: 	(boolean: false) open a clip on mouseover
	 * autoOpenControl:	(boolean: true) automatically open show the corresponding controlling childelement
	 * minWidth:		(number: 0) leave other clips viewable
	 * beforeMax: 		(function: null) the callback function before maximize a clip
	 * afterMax: 		(function: null) the callback function after maximize a clip
	 * beforeMin: 		(function: null) the callback function before minimize a clip
	 * afterMin: 		(function: null) the callback function after minimize a clip
	 */
	jQuery.facets.defaults = {
		control: '',
		autoStart: null,
		autoCliping: false,
		debug: false,
		clipSpacing: 0,
		animationSpeed: 500,
		keepItOpened: false,
		minimizeTimeout: 0,
		contentRelations: false,
		sense: false,
		activePanel: false,
		autoOpenControl: true,
		minWidth: 0,
		beforeMax: null,
		afterMax: null,
		beforeMin: null,
		afterMin: null
	};
	
	/*
	 * main facets object
	 * o = options
	 */
	jQuery.facets.impl = {
		
		/*
		 * contains the facets elements and is the object passed
		 * back to the callback (beforeMax, afterMax, beforeMin, afterMin) functions
		 */
		d: {},
		
		/*
		 * initialize the facets panel
		 */
		init: function(elObj, options) {
			var t = this;

			// don't allow multiple calls
			if(t.d.cv) {
				t.debug('multiple calls init()');
				return false;
			}
			
			// merge defaults and user options
			t.o = jQuery.extend({}, jQuery.facets.defaults, options);
			// set element object
			t.d.elObj = elObj;
			// set timeout array for hiding children ul delay
			t.d.minimizetimeouts = [];
			// minimize opened before maximize next
			t.d.minBmax = false;
			// turn off the 'minimize opened before maximize next' option after 1st use
			t.d.minBmax_reset = true;
			// set or get clip values in css
			t.d.cv = t.o.autoCliping === true ? t.resetClipValues() : t.getClipValues();
			t.debug('autoCliping: ' + (t.o.autoCliping === true ? 'on' : 'off'));
			// set the 'keep last opened' option
			t.d.keepItOpened = false;
			// set the 'minimize timeout' option
			t.d.minimizeTimeout = typeof t.o.minimizeTimeout == 'number' && t.o.minimizeTimeout > 50 ? t.o.minimizeTimeout : 50;
			// set the 'minWith' option
			t.d.minWidth = typeof t.o.minWidth == 'number' && t.o.minWidth <= (t.d.elObj.width() / t.d.elObj.children().length) ? t.o.minWidth : 0;

			// main event bindings
			t.bindEvents();
			
			// set the 'autoopen clip on start' handler
			if(typeof t.o.autoStart == 'number' && t.o.autoStart < t.d.elObj.children().length) {
				t.d.minBmax = true;
				t.maximize(t.o.autoStart);
				t.debug('autoStart: '+t.o.autoStart);
			}
			// set 'keep clip opened' handler
			if(t.o.keepItOpened === true || (typeof t.d.minimizeTimeout == 'number' && t.d.minimizeTimeout > 0)) {
				if(t.o.keepItOpened === true) {
					t.debug('keepItOpened: true');
					t.d.keepItOpened = true;
				}
				t.d.minBmax = true;
				t.d.minBmax_reset = false;
			}

			// return chain
			return t;
		},
		
		/*
		 * bind events
		 */
		bindEvents: function() {
			var t = this,
				c = jQuery(t.o.control).children().length > 0 ? t.o.control : t.d.elObj,
				elObjChildElems = jQuery(c).children(),
				index = null;
			
			// publish the control element
			t.d.c = c;
			
			// bind control to hover event
			elObjChildElems.hover(function(event) {
				// current hovered index
				index = elObjChildElems.index(this);
				t.debug('hover: '+index);
				// maximize clip
				t.maximize(index);
				// unbind this from mouseleave
				jQuery(this).mouseleave(function(event) {
					t.debug('mouseleave: '+index);
					// minimize clip
					t.delayedMinimize(index);
					// prepare already opened clip to stay opened if mouseenter it
					if(t.isControl(t.o.control) && t.o.activePanel !== true && t.o.keepItOpened !== true) {
						t.bindPanel(index);
					}
					// unbind control from mouseleave event
					jQuery(this).unbind('mouseleave');
				});
			});
			
			// activate content sense
			t.sense();
			
			if(t.o.activePanel !== true || t.isControl(t.d.elObj)) return;
			// if activePanel is true bind clips as control
			t.bindPanel();
		},
		
		theOpenKeeper: function(status) {
			var t = this;
			
			if(typeof t.d.kfo == 'undefined') {
				t.d.kfo = {
					keepItOpened: t.d.keepItOpened,
					minBmax: t.d.minBmax,
					minBmax_reset: t.d.minBmax_reset
				};
			}
			
			switch(status) {
				case 'true':
					t.debug('keepItOpened: true');
					t.d.keepItOpened = true;
					t.d.minBmax = true;
					t.d.minBmax_reset = false;
					break;
				case 'false':
					t.debug('keepItOpened: false');
					t.d.keepItOpened = false;
					t.d.minBmax = false;
					t.d.minBmax_reset = false;
					break;
				case 'restore':
					t.debug('keepItOpened: restore');
					t.d.keepItOpened = t.d.kfo.keepItOpened;
					t.d.minBmax = t.d.kfo.minBmax;
					t.d.minBmax_reset = t.d.kfo.minBmax_reset;
					break;
			}
		},
		
		/*
		 * bind 'a' elements with a corresponding id of a clip in the rel-attribute to hover event
		 * example: <a href="#" rel="a-clip-id">example</a>
		 */
		sense: function() {
			var t = this, senseObj = null;
			if(t.o.sense !== true) return;
			
			t.debug('sense: on');
			// bind all a[rel=id_of_each_clip] to control
			t.d.elObj.children().each(function(i, el) {
				senseObj = jQuery(this);
				if(senseObj.attr('id') !== '') {
					jQuery( 'a[rel=' + senseObj.attr('id') + ']' ).hover(
						function() { t.maximize(i); },
						function() { t.delayedMinimize(i); }
					);
				}
			});
		},
		
		/*
		 * bind the panel itself
		 * needed on mouseout of the control element when panel itself is not the control
		 *
		 * @param {number} corresponding child element in the facets panel
		 */
		bindPanel: function(index) {
			var t = this,
				elem = null,
				elObjChildElems = t.d.elObj.children();
				
			t.debug('bind panel');
				
			// select single or all child elemenets
			elem = typeof index == 'number' ? elObjChildElems.eq( index ) : elObjChildElems;
			// bind selected child elements to open clip on mouseenter (also after leave control element)
			elem.mouseenter(function(event) {
				// select current index
				var i = elObjChildElems.index(this);
				// maximize entered clip
				t.maximize(i);
				// unbind it from mouseleave
				jQuery(this).mouseleave(function(event) {
					// minimize clip
					t.delayedMinimize(i);
				});
			});
		},
		
		/*
		 * unbindbind the panel itself
		 *
		 * @param {number} corresponding child element in the facets panel
		 */
		unbindPanel: function(index) {
			var t = this, i = index;
			// return if panel = control or panel is also control
			if(t.isControl(t.d.elObj) || t.o.activePanel === true) return;
			
			// unbind single or all from mouseenter hover mouseout mouseleave
			if(typeof i == 'number') {
				t.debug('minimize unbind "'+index+'"');
				t.d.elObj.children().eq(i).unbind('mouseenter hover mouseout mouseleave');
			} else {
				t.debug('minimize unbind all');
				t.d.elObj.children().unbind('mouseenter hover mouseout mouseleave');
			}
		},
		
		/*
		 * bind the panel itself
		 * needed on mouseout of the control element when panel itself is not the control
		 *
		 * @param {number} corresponding child element in the facets panel
		 */
		delayedMinimize: function(index) {
			var t = this, i = index;
			
			// return if 'keepItOpened' is on
			if(t.d.keepItOpened === true) return;
			// clear timeout for this index
			t.clearTimeout(i);
			// set setTimeout for this index
			t.d.minimizetimeouts[i] = setTimeout(function() {
				t.minimize(i);
			}, t.d.minimizeTimeout);
		},
		
		/*
		 * clear timeout for this index
		 *
		 * @param {number} corresponding child element in the facets panel
		 */
		clearTimeout: function(index) {
			var t = this, i = index;
			
			// clear timeout for this index
			if(t.d.minimizetimeouts[i]) {
				clearTimeout(t.d.minimizetimeouts[i]);
			}
		},
		
		/*
		 * minimize corresponding clip in the facets panel
		 *
		 * @param {number} corresponding child element in the facets panel
		 */
		minimizeAll: function() {
			var t = this,
				elObjChildElems = t.d.elObj.children();

			t.debug('minimizeAll');

			t.d.elObj.children().each(function(i, elm) {
				t.minimize(i);
			});
		},
		
		/*
		 * minimize corresponding clip in the facets panel
		 *
		 * @param {number} corresponding child element in the facets panel
		 */
		minimize: function(index) {
			var t = this,
				elObjChildElems = t.d.elObj.children(),
				i = index;

			t.debug('minimize');

			// clear timeout for this index
			t.clearTimeout(i);
			// hide subnavigation of the control element
			t.hideControl(i);
			// unbind corresponding clip from the mouseenter
			t.unbindPanel();
			// trigger the beforeMin
			t.trigger(t.o.beforeMin, i, function() {
				// if is set 'minWidth' for other clips use 'resetClipValues()' for resetting all clips to its initial coordinates
				// otherwise use instant setClip() for single resetting (faster)
				if(t.d.minWidth > 0) {
					// set clip to its start coordinated
					t.resetClipValues(true, function() {
						t.trigger(t.o.afterMin, i);
					});
				} else {
					// set clip to its start coordinated
					t.setClip(i, t.d.cv[i], true, function() {
						t.trigger(t.o.afterMin, i);
					});
				}
				// remove 'on' css-class from related elements in content
				if(t.o.contentRelations === true) {
					jQuery('a[rel='+ t.d.elObj.children().eq(i).attr('id') +']').removeClass('on');
				}
			});
		},
		
		/*
		 * used when use 'keepItOpen' or 'autoStart' option
		 *
		 * @param {number} corresponding child element in the facets panel
		 */
		minBeforeMax: function(index) {
			var t = this;
			// return 'minBmax' is not on or index is 'undefined' (occurs when use the 'autoStart' option)
			if(t.d.minBmax == false || typeof index == 'undefined') return;
			// minimize clip instantly
			t.minimize(index);
			// turn off the 'minimize opened before maximize next' option
			if(t.d.minBmax_reset == true) {
				t.d.minBmax = false;
			}
		},
		
		/*
		 * maximize corresponding clip in the facets panel
		 *
		 * @param {number} corresponding child element in the facets panel
		 */
		maximize: function(index) {
			var t = this, i = index, lastIndex = t.d.index;

			t.debug('maximize');

			// publish new opened index
			t.d.index = i;
			// close last opened clip
			t.minBeforeMax((typeof lastIndex == 'undefined' ? i : lastIndex));
			// show control children ul if autoOpenControl is true
			t.showControl(i);
			// set all clips to z-index 1 + current hovered to z-index 10
			t.d.elObj.children().css('z-index','1').eq(i).css('z-index','10');
			// trigger beforeMax
			t.trigger(t.o.beforeMax, i, function() {
				// add css-class to related elements in content
				if(t.o.contentRelations === true) {
					jQuery('a[rel='+ t.d.elObj.children().eq(i).attr('id') +']').addClass('on');
				}
				// if is set 'minWidth' for other clips use 'devideClips()' for deviding all clips
				// otherwise use instant setClip() for single resetting (faster)
				if(t.d.minWidth > 0) {
					t.devideClips(i, function() {
						t.trigger(t.o.afterMax, i);
					});
				} else {
					// set clip to full dimensions
					t.setClip(i, [0, t.d.elObj.width(), t.d.elObj.height(), 0], true, function() {
						t.trigger(t.o.afterMax, i);
					});
				}
			});
		},
		
		/*
		 * set other clips to remaining width
		 *
		 * @param {number} corresponding child element in the facets panel
		 * @param {function} pass callback function to setEachChildren()
		 */
		devideClips: function(index, callback) {
			var t = this,
				el = {obj: t.d.elObj, dim: {w: t.d.elObj.width(), h: t.d.elObj.height()}},
				ce = el.obj.children(),
				indexWidth = el.dim.w,
				widths = [];
			
			// get remaining width for opened clip
			indexWidth = el.dim.w - ((ce.length - 1) * t.d.minWidth);
			// set widths for all clips
			ce.each(function(i, elm) {
				widths[i] = i === index ? indexWidth : parseInt(t.d.minWidth);
			});
			// set all clips
			t.setEachChildren(widths, true, callback);
		},
		
		/*
		 * reset clip values
		 *
		 * @param {boolean} animated or instant transition
		 * @param {function} pass callback function to setEachChildren()
		 * @param {function} callback function after resetting
		 */
		resetClipValues: function(animated, callback, resetCallback) {
			var t = this, ret = null;

			// set all clips
			ret = t.setEachChildren((t.d.elObj.width() / t.d.elObj.children().length), animated, callback, true);
			// execute callback
			if(jQuery.isFunction(resetCallback)) {
				resetCallback();
			}
			// return updated clip values
			return ret;
		},
		
		/*
		 * set coordinates of each clip
		 *
		 * @param {array, number} width can be a object containing width of each clip or a single width applicable to all clips
		 * @param {boolean} animated or instant transition
		 * @param {function} pass callback function to setClip() after transition
		 */
		setEachChildren: function(width, animated, callback, ret) {
			var t = this;
			
			var el = {obj: t.d.elObj, dim: {w: t.d.elObj.width(), h: t.d.elObj.height()}},
				// childElements
				ce = el.obj.children(),
				// zero
				z = 0,
				// current x position
				x = z,
				// distance between clips
				d = typeof t.o.clipSpacing == 'number' ? t.o.clipSpacing : 0,
				// for values return
				values = [];

			// set all clips
			ce.each(function(i, elm) {
				var nLastItem = (i + 1) < ce.length ? true : false,
					distance = nLastItem ? true : false,
					s = typeof width == 'object' ? width[i] : width,
					rx = x + (d > 0 && distance ? s - d : s),
					rx_rnd = nLastItem ? Math.floor(rx) : Math.round(rx);
				// set rect values
				values[i] = [0, rx_rnd, el.dim.h, x];
				// set current clip
				t.setClip(i, values[i], animated, callback);
				// add width to start position for next clip
				x = x + s;
			});
			
			if(ret === true) {
				return values;
			}
		},
		
		/*
		 * transition switch
		 *
		 * @param {number} corresponding child element in the facets panel
		 * @param {array} object containing coordinates
		 * @param {boolean} animated or instant transition
		 * @param {function} pass callback function to execute after transition
		 */
		setClip: function(index, c, animated, callback) {
			var t = this;
			
			if(typeof animated == 'undefined' || animated !== false) {
				t.animateClip(index, c, callback);
			} else {
				t.cssClip(index, c, callback);
			}
		},
		
		/*
		 * animated transition
		 *
		 * @param {number} corresponding child element in the facets panel
		 * @param {array} object containing coordinates
		 * @param {function} callback function after transition
		 */
		animateClip: function(index, c, callback) {
			var t = this,
				rect = typeof c == 'string' ? c : t.rect([c]);
			
			// stop current transition and animate to new coordinates
			t.d.elObj.children().eq(index).stop().animate({clip: rect}, t.o.animationSpeed, function() {
				// execute callback if it is a function
				if(jQuery.isFunction(callback)) {
					callback();
				}
			});
		},
		
		/*
		 * instant transition
		 *
		 * @param {number} corresponding child element in the facets panel
		 * @param {array} object containing coordinates
		 * @param {function} callback function after transition
		 */
		cssClip: function(index, c, callback) {
			var t = this,
				rect = typeof c == 'string' ? c : t.rect([c]);
			
			// stop current transition and set new coordinates
			t.d.elObj.children().eq(index).stop().css('clip', rect);
			// execute callback if it is a function
			if(jQuery.isFunction(callback)) {
				callback();
			}
		},
		
		/*
		 * show subnavigation of current opened control element in navigation
		 *
		 * @param {number} corresponding control element in the control panel
		 */
		showControl: function(index) {
			var t = this;
			if(t.o.autoOpenControl !== true) return;
			// show subnavigation
			jQuery(t.d.c).children().eq(index).children('ul').show().css('visibility', 'visible');
		},
		
		/*
		 * hide subnavigation of current opened control element in navigation
		 *
		 * @param {number} corresponding control element in the control panel
		 */
		hideControl: function(index) {
			var t = this;
			
			// return if 'autoOpenControl' is off or facets panel itself is the control element
			if(t.o.autoOpenControl !== true || !t.isControl(t.o.control)) return;
			if(jQuery(t.d.c).find('ul').length <= 0) return;
			// hide certain subnavigation or all
			if(typeof index == 'undefined') {
				jQuery(t.d.c).find('ul').hide().css('visibility', 'hidden');
			} else {
				jQuery(t.d.c).children().eq(index).children('ul').hide().css('visibility', 'hidden');
			}
		},
		
		/*
		 * get css clip values
		 */
		getClipValues: function() {
			var t = this, values = [];
			
			// get css clip values of each clip in facets panel
			t.debug(t.d.elObj.children().first().css('clip'));
			if(t.o.autoCliping === true) {
				values = t.setEachChildren((t.d.elObj.width() / t.d.elObj.children().length), animated, callback);
			} else {
				t.d.elObj.children().each(function() {  
					values[jQuery(this).index()] = jQuery(this).css('clip');
				});
			}
			return values;
		},
		
		/*
		 * get rectangular (rect) clip (coordinates in px)
		 *
		 * @param {array}
		 * c[0] = distance from 0 to top of rectangular
		 * c[1] = distance from 0 to right of rectangular
		 * c[2] = distance from 0 to bottom of rectangular
		 * c[3] = distance from 0 to left of rectangular
		 */
		rect: function(c) {
			var t = this;
			
			if(typeof c === 'undefined') {
				t.debug('undefined coordinates in rect()');
				return t.rect([0,0,0,0]);
			}
			// return css value string width clip shape in px
			return 'rect('+c[0]+'px '+c[1]+'px '+c[2]+'px '+c[3]+'px)';
		},
		
		/*
		 * check if a certain element is the control panel
		 *
		 * @param {object, string} jQuery object or DOM element
		 */
		isControl: function(selector) {
			var t = this;
			
			// compare selector with the active control element
			if(jQuery(t.d.c)[0] == jQuery(selector)[0]) {
				return true;
			} return false;
		},
		
		/*
		 * trigger custom event functions
		 *
		 * @param {function} apply predefined function
		 * @param {number} pass index of current opened clip
		 * @param {function} callback function after apply custom function
		 */
		trigger: function(trigger, index, callback) {
			var t = this, i = index;
			
			// pass 'this' and current index and execute custom function
			if(jQuery.isFunction(trigger)) {
				trigger.apply(t, [i]);
			}
			// execute callback if it is a function
			if(jQuery.isFunction(callback)) {
				callback();
			}
		},
		
		/*
		 * write message to console (firefox) or
		 * write message to div#facetsDebug (all other) wich is created and appended to document.body automatically at start
		 *
		 * @param {string} 
		 */
		debug: function(msg) {
			if(this.o.debug !== true) return;

			// use console if firebug firefox, else use div as debug output
			if(window.console) {
				// write message to firefox console
				window.console.log(msg);
			} else {
				// create debugger output container if not exists
				if(jQuery('#facetsDebug').length == 0) {
					jQuery('<div id="facetsDebug"><div><b>Facets-debugger:</b></div></div>').appendTo(document.body);
				}
				// append message to debugger output container
				jQuery('#facetsDebug').prepend('<div>'+msg+'</div>');
			}
		}
	}
	
})(jQuery);