/**
 * @author alexander.farkas
 * @version 1.0
 */
(function($){
	if(!document.defaultView || !document.defaultView.getComputedStyle){ // IE6-IE8 workaround
		var oldCurCSS = $.curCSS;
		$.curCSS = function(elem, name, force) {
			var curStyle = elem.currentStyle, ret;
			if(name === 'font-size') {
				name = 'fontSize';
			}
			if((name !== 'clip' && name !== 'fontSize') || !curStyle) {
				return oldCurCSS.apply(this, arguments);
			}
			var style = elem.style;
			if(!force && style) {
				ret = style[ name ];
			}
			if(name === 'clip') {
				ret = ret || 'rect('+ (curStyle.clipTop || 'auto') +' '+ (curStyle.clipRight || 'auto') +' '+ (curStyle.clipBottom || 'auto') +' '+ (curStyle.clipLeft || 'auto') +')';
			} else {
				ret = ret || curStyle.fontSize;
				if(!(/px/.test(ret))) {
					// Remember the original values
					var width = style.width, rsWidth = elem.runtimeStyle.width;
	
					// Put in the new values to get a computed value out
					elem.runtimeStyle.width = elem.currentStyle.width;
					style.width = '100em';
					ret = style.pixelWidth / 100 + "px";
					// Revert the changed values
					style.width = width;
					elem.runtimeStyle.width = rsWidth;
				}
			}
			return ret;
		};
	}
})(jQuery);

(function($){
	var calcClipAuto = [
		function(){return 0;},
		function(elem){return $(elem).outerWidth();},
		function(elem){return $(elem).outerHeight();},
		function(elem){return 0;}
	],
	calcNumClip = function(prop, elem) {
		return ((/em/.test(prop))) ? 
			(parseFloat($.curCSS(elem, 'fontSize'), 10) || 1) * (parseFloat(prop, 10) || 0) :
			(parseInt(prop, 10) || 0);
	};
	
	var calcClip = function(css, fx, isEnd) {
		var ret = [];
		if(css === 'auto') {
			css = 'rect(auto auto auto auto)';
		}
		css = css.replace(/rect\(|\)/g, '').split(/,\s*|\s/);
		if(isEnd) {
			fx.endClipStyle = 'rect('+ css.join(' ') +')';
		}
		for(var i = 0; i < css.length; i++) {
			ret[i] = (css[i] !== 'auto') ? 
			calcNumClip(css[i], fx.elem) : 
			calcClipAuto[i](fx.elem);
		}
	
		return ret;
	};
	
	jQuery.fx.step.clip = function(fx) {
		if(!fx.clipInit) {
			fx.start = calcClip($.curCSS(fx.elem, 'clip'), fx);
			fx.end = calcClip(fx.end, fx, true);
			fx.elmStyle = fx.elem.style;
			fx.clipInit = true;
		}
		
		fx.elmStyle.clip = 'rect('+ ( fx.pos * (fx.end[0] - fx.start[0]) + fx.start[0] ) +'px '+ (fx.pos * (fx.end[1] - fx.start[1]) + fx.start[1]) +'px '+ (fx.pos * (fx.end[2] - fx.start[2]) + fx.start[2]) +'px '+ (fx.pos * (fx.end[3] - fx.start[3]) + fx.start[3]) +'px)';
		
		if(fx.pos === 1 && fx.endClipStyle) {
			//fx.elmStyle.clip = fx.endClipStyle;
		}
	};
})(jQuery);