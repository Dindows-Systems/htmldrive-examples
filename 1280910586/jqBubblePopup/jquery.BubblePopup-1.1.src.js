/*

	jQuery Bubble Popup plugin
	© 2010 Max Vergelli

	For support and tutorials visit
	http://maxvergelli.wordpress.com/

	License: GNU Lesser General Public License (LGPL) 
	at http://opensource.org/licenses/lgpl-2.1.php

	This plugin is free software;  you can redistribute it  and/or  modify  it 
	under the terms of the GNU Lesser General Public License as  published  by 
	the Free Software Foundation;  either version 2.1 of the License,  or  (at 
	your option) any later version.
	This software is distributed in the hope  that  it  will  be  useful,  but 
	WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
	or FITNESS FOR A PARTICULAR PURPOSE.  See the  GNU Lesser  General  Public 
	License for more details.
	You should have received a copy of  the  GNU Lesser General Public License 
	along with this library;  if not,  write to the  Free Software Foundation, 
	Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA

	THIS COMMENT AND COPYRIGHT NOTICE MUST BE RETAINED IN THE CODE AS IS FOR LEGAL USE

*/

(function ($) {
	$.fn.ShowBubblePopup = function(options){
		options = $.extend({
			innerHtml: null
		},options);
		var innerHtml = options.innerHtml;
		this.trigger("showBubblePopupHandler",innerHtml);
	};
	$.fn.HideBubblePopup = function(){
		this.trigger("hideBubblePopupHandler");
	};
	$.fn.SetBubblePopup = function (options) {
		var _ = {	objTags: ['object', 'embed', 'applet'],
					delayTimer: null,
					popups: [],
					loading: [],
					loaded: [],
					cache: [],
					me: this,
					markup: '\
							<table width="{TABLE_WIDTH}" cellpadding="0" cellspacing="0" style="{IE_FILTER_SHADOW}display:none; z-index:{Z-INDEX}; position:absolute; border:0px; border-collapse:collapse;"> \
							<tbody> \
							<tr> \
								<td style="width:18px; height:18px; background-image:url({IMAGE_1});"></td> \
								<td style="background-image:url({IMAGE_2}); background-repeat:repeat-x;"></td> \
								<td style="width:18px; height:18px; background-image:url({IMAGE_3});"></td> \
							</tr> \
							<tr> \
								<td style="background-image:url({IMAGE_4}); background-repeat:repeat-y;"></td> \
								<td style="{CONTENT_STYLE}"> \
								{HTML_CONTENT} \
								</td> \
								<td style="background-image:url({IMAGE_5}); background-repeat:repeat-y;"></td> \
							</tr> \
							<tr> \
								<td style="width:18px; height:26px; background-image:url({IMAGE_6}); background-repeat:repeat-x;"></td> \
								<td style="background-image:url({IMAGE_7}); background-repeat:repeat-x; text-align:{TAIL_ALIGN};">{IMAGE_TAIL}</td> \
								<td style="width:18px; height:26px; background-image:url({IMAGE_8}); background-repeat:repeat-x;"></td> \
							</tr> \
							</tbody> \
							</table>'
				};
		options = $.extend({ 
			tagID: [],
			cssClass: [],
			relAttribute: [],
			htmlTag: [],
			innerHtml: '',
			bubbleAlign: 'center',
			tailAlign: 'center',
			distanceFromTarget: 25,
			openingVelocity: 250,
			closingDelay: 150,
			showOnMouseOver: true,
			color: 'azure',
			imageFolder: 'bp_images',
			hideTail: false,
			hideObjectID: [],
			contentStyle: '',
			zIndex: 100,
			width: 'auto'
		},options);
		var tagID = options.tagID;
		var cssClass = options.cssClass;
		var relAttribute = options.relAttribute;
		var htmlTag = options.htmlTag;
		var innerHtml = options.innerHtml;
		var bubbleAlign = options.bubbleAlign.toLowerCase();
		var tailAlign = options.tailAlign.toLowerCase();
		var distanceFromTarget = options.distanceFromTarget;
		var openingVelocity = options.openingVelocity;
		var closingDelay = options.closingDelay;
		var showOnMouseOver = options.showOnMouseOver;
		var	hideObjectID = options.hideObjectID;
		var color = options.color;
		var imageFolder = options.imageFolder;		
		var hideTail = options.hideTail;
		var contentStyle = options.contentStyle;
		var zIndex = options.zIndex;
		var width = ((typeof options.width=="string" || typeof options.width=="number") && parseInt(options.width)>0 ? parseInt(options.width) : null);
		main();

		function preloadImages() { //accepts relative paths as arguments
			for (var i = arguments.length; i >= 0; i--) {
				var tmp = document.createElement('img');
				tmp.src = arguments[i];
				_.cache.push(tmp);
			};
		};

		function hideObjects() {
			if(hideObjectID && hideObjectID.length>0) {
				for (var i = 0; i < hideObjectID.length; i++) {
					var id = (hideObjectID[i].charAt(0)!='#' ? '#'+hideObjectID[i] : hideObjectID[i]);
					$(id).css({
						visibility: 'hidden'
					});
				};
			};
		};

		function showObjects() {
			if(hideObjectID && hideObjectID.length>0) {
				for (var i = 0; i < hideObjectID.length; i++) {
					var id = (hideObjectID[i].charAt(0)!='#' ? '#'+hideObjectID[i] : hideObjectID[i]);
					$(id).css({
						visibility: 'visible'
					});
					var elements = $(id).length;				
					for (var j = 0; j < elements.length; j++) {
						$(elements[j]).css({
							visibility: 'visible'
						});
					};
				};
			};
		};

		function getMarkup(input_html) {
			var f = imageFolder+'/'+color+'/'+($.browser.msie ? 'ie/' : '');
			var m = _.markup.replace('{HTML_CONTENT}',input_html).replace('{TAIL_ALIGN}',( tailAlign=='left' || tailAlign=='right' ? ( tailAlign=='left' ? 'left' : 'right' ) : 'center' ));
			if(hideTail){ 
				m = m.replace('{IMAGE_TAIL}','');
			} else { 
				m = m.replace('{IMAGE_TAIL}','<img src="'+f+'tail.'+($.browser.msie ? 'gif' : 'png')+'" width="24" height="26" alt="" style="border:0px" />') 
			};
			
			if(width!=null){
				m = m.replace('{TABLE_WIDTH}',parseInt(width)+'px');
			};
			m = m.replace('{Z-INDEX}',zIndex);
			if($.browser.msie){
				m = m.replace('{IE_FILTER_SHADOW}','filter:progid:DXImageTransform.Microsoft.Shadow(color=\'#333333\', Direction=135, Strength=2);');	
			} else {
				m = m.replace('{IE_FILTER_SHADOW}','');			
			};
			m = m.replace('{CONTENT_STYLE}','color:#000000;'+(contentStyle.indexOf('font-family:')>-1 ? '' : 'font-family:\'Trebuchet MS\',Arial;')+(contentStyle.indexOf('background-color:')>-1 ? '' : 'background-color:#FFFFFF;')+contentStyle);
			for (var i = 1; i < 9; i++) {
				var src = f+i+'.'+($.browser.msie ? 'gif' : 'png');
				m = m.replace('{IMAGE_'+i+'}',src);
				preloadImages(src);
			};
			return m;
		};

		function isTag(tag) { 
			return (typeof tag.get(0).tagName == 'undefined' ? false : true);
		};

		function attachBubbleTo(target_obj) {
			var tag = $(target_obj);
			var popup = $(getMarkup(innerHtml));
			popup.css('opacity', 0);
			popup.id = (_.popups.length+1)+'_bubblepopup';
			_.popups.push(popup.id);
			_.loading.push(false);
			_.loaded.push(false);
			if(showOnMouseOver) {
				tag.mouseover(function () {
					openBubble(popup, tag);
				}).mouseout(function () {
					closeBubble(popup);
				});
			} else {
				tag.bind('showBubblePopupHandler', function(e, newHtml){
					if(newHtml!=null){
						var tmp_id = popup.id;
						popup = $(getMarkup(newHtml));
						popup.css('opacity', 0);
						popup.id = tmp_id;
						openBubble(popup, tag);
					} else {
						openBubble(popup, tag);
					};
				});
				tag.bind('hideBubblePopupHandler', function(){closeBubble(popup);});
			};
		};

		function openBubble(popup_obj, tag_obj) {
			var i = parseInt(popup_obj.id)-1;
			if (_.popups[i]) clearTimeout(_.popups[i]);
			if (_.loading[i] || _.loaded[i]){
				return;
			} else {
				hideObjects();
				_.loading[i] = true;
				popup_obj.appendTo(tag_obj);
				var coord = new Array();
				var f = tag_obj.offset();
				coord["top"] = parseInt(f.top)-parseInt(popup_obj.height())-parseInt(distanceFromTarget/2); //alert();
				coord["left"] = (bubbleAlign=='left' || bubbleAlign=='right' ? ( bubbleAlign=='left' ? parseInt(f.left)-8 : parseInt(tag_obj.width())+parseInt(f.left)-parseInt(popup_obj.width())+18 ) : ( parseInt(f.left)+((parseInt(tag_obj.width())-parseInt(popup_obj.width())+18)/2)) );
				popup_obj.css({
					top: coord["top"],
					left: coord["left"],
					position: 'absolute',
					display: 'block'
				}).animate({
					top: '+=' + distanceFromTarget + 'px',
					opacity: 1
				}, openingVelocity, 'swing', function() {
					_.loading[i] = false;
					_.loaded[i] = true;
				});
			};
			return false;
		};

		function closeBubble(popup_obj) {
			var i = parseInt(popup_obj.id)-1;
			if (_.popups[i]) clearTimeout(_.popups[i]);
			_.popups[i] = setTimeout(function () {
				_.delayTimer = null;
				popup_obj.animate({
					top: '-=' + distanceFromTarget + 'px',
					opacity: 0
				}, openingVelocity, 'swing', function () {
					_.loaded[i] = false;
					popup_obj.css('display', 'none');
					popup_obj.remove();
				});
			}, closingDelay);
			showObjects();
			return false;
		};

		function main() {
			if(isTag(_.me)) {
				attachBubbleTo(_.me);
			} else {
				if (tagID.length>0) {
					for (var i = 0; i < tagID.length; i++) {
						var id = (tagID[i].charAt(0)!='#' ? '#'+tagID[i] : tagID[i]);				
						tagID[i] = id;
					};
					$(tagID.join(',')).each(function () {
						attachBubbleTo(this);
					});
				};
				if (cssClass.length>0) {
					for (var i = 0; i < cssClass.length; i++) {
						var css = (cssClass[i].charAt(0)!='.' ? '.'+cssClass[i] : cssClass[i]);				
						cssClass[i] = css;
					};
					$(cssClass.join(',')).each(function () {
						attachBubbleTo(this);
					});
				};
				if (relAttribute.length>0) {
					$('a').each(function () {
						for (var i = 0; i < relAttribute.length; i++) {
							if (this.getAttribute('href') && relAttribute[i] == String(this.getAttribute('rel')) ) {
								attachBubbleTo(this);
								break;
							};
						};
					});
				};
				if (htmlTag.length>0) {
					$(htmlTag.join(','), $('document')).each(function () {
						attachBubbleTo(this);
					});
				};
			};
		};

		return this;
	};
})(jQuery);
