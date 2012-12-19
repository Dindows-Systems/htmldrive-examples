/*
 * jMagnify jQuery plugin - Rel. 0.1
 *
 * Copyright (c) 2010 Giovanni Casassa (senamion.com - senamion.it)
 *
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://www.senamion.com
 *
 */


(function($)
{
	$.fn.jMagnify = function(o) {

		o = $.extend({
			centralEffect: {'font-size': '200%'},
			lat1Effect: {'font-size': '180%'},
			lat2Effect: {'font-size': '150%'},
			lat3Effect: {'font-size': '120%'},
			resetEffect: {'font-size': '100%'}
		}, o);

		return this.each(function(i) {
			var el = $(this);
			var	uuid = (el.attr('id') || el.attr('class') || 'internalName') + '_jMagnify';
			var myText = "";
			var aStr = el.text().split("");

			for (var len in aStr)
				myText += "<span class='" + uuid + "'>" + aStr[len] + "</span>";
			el.html(myText);
			$('.' + uuid).hover(function(){
					$(this).css(o.centralEffect)
						.next().css(o.lat1Effect)
						.next().css(o.lat2Effect)
						.next().css(o.lat3Effect);
					$(this).prev().css(o.lat1Effect)
						.prev().css(o.lat2Effect)
						.prev().css(o.lat3Effect);
				},
				function() {
					$(this).css(o.resetEffect)
						.next().css(o.resetEffect)
						.next().css(o.resetEffect)
						.next().css(o.resetEffect);
					$(this).prev().css(o.resetEffect)
						.prev().css(o.resetEffect)
						.prev().css(o.resetEffect);
			});
		});
	};
})(jQuery);