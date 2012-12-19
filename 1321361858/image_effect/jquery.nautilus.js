/*
 * ImageCloud - jQuery plugin 2.0
 *
 * Copyright (c) 2011 Alvaro Montoro Dominguez
 *
 * Licensed under the GPL license:
 *   http://www.gnu.org/licenses/gpl.html
 *
 */
 
;(function ($) {

	$.fn.nautilus=function (options) {
	
		var settings={
			width: 500,
			height: 200,
			deep: 1000,
			wide: 700,
			seed: 2,
			posTop: 0,
			posLeft: 100,
			color: '#ffffff',
			position: 'relative',
			controls: false,
			controlsWidth: 200,
			controlsType: 'text',
			controlsUp: 'Up',
			controlsDown: 'Down',
			controlsLeft: 'Left',
			controlsRight: 'Right',
			speedUp: 10000,
			speedDown: 5000,
			speedSides: 2000,
			wave:true,
			animation:true,
			animationSpeed:10000,
			animationInterval:12000
		};
		
		return this.each(function () {
			
			function nautilus_waves(object, pTop, pLeft, cTop, cLeft, duration) {
	            $(object).stop().animate({top:pTop-cTop,left:pLeft-cLeft}, duration);
	            setTimeout(function() {
		            nautilus_waves(object, pTop, pLeft, -cTop, -cLeft, duration);
	            }, duration);
        	}
        	
        	function nautilus_moves(object, sLeft, duration, interval) {
	        	$(object).stop().css({ left:-sLeft }).animate({ left: sLeft*2 }, duration);
	        	setTimeout(function() {
		            nautilus_moves(object, sLeft, duration, interval);
	            }, interval);
        	}
			
			var controlSize = 0;
			var frameWidth  = 0;
			var frameHeight = 0;
			var frameDepth  = 0;
			var frameWide   = 0;
			var frameWide2  = 0;
			var layerIndex  = 99999;
			var maxWidth    = 0;
			var maxHeight   = 0;
			var selfDiv     = $(this);
			
			// extend the default settings
            if (options){$.extend(settings,options)};
            
            // get the width of the visible frame
            frameWidth  = $(this).find(".window").css("width" ) ? $(this).find(".window").css("width" ) : settings.width;
            frameHeight = $(this).find(".window").css("height") ? $(this).find(".window").css("height") : settings.height;
            frameWide   = $(this).find(".back"  ).css("width" ) ? ($(this).find(".back"  ).css("width" ).toString().replace("px","")/1-frameWidth.toString().replace("px",""))/2 : settings.wide;
            frameWide2  = $(this).find(".back"  ).css("width" ) ? $(this).find(".back"  ).css("width" ).toString().replace("px","") : settings.wide;
            frameDepth  = $(this).find(".back"  ).css("height") ? $(this).find(".back"  ).css("height") : settings.deep;
            controlSize = settings.controls ? settings.controlsWidth : 0;
            settings.posLeft = frameWide;
            settings.width   = frameWidth.toString().replace("px","")/1;
            
            // set the parameters of the div
            $(this).css({
	            position:settings.position,
	            width:controlSize+frameWidth.toString().replace("px","")/1,
	            height:frameHeight,
	            overflow:'hidden'
            });
            
            // we create the div that will contain all the images (the one that will move around)
            $(this).append("<div class='frames' style='overflow:visible;position:absolute;top:0px;left:0px;width:1px;height:1px;'></div>");
            
            // for each image within the DIV that the plug-in is applied
            $(this).find("img").each(function() {
	            
	            // change CSS
		        $(this).css({ 
			        position:'absolute',
			        left:Math.round((frameWidth.toString().replace("px","")-$(this).css("width").toString().replace("px",""))/2),
			        zIndex:layerIndex
			    });
			    
		        layerIndex--;
		        
		        // Add the image to the Div that will move 
		        if (!$(this).hasClass("window")) { selfDiv.find(".frames").append($(this)); }
		        
		        // add the animation movement to the layers that move
		        if (settings.animation && $(this).hasClass("moves")) {
			        var aux1;
			        aux1 = $(this).css("left").toString().replace("px","")/1 < 0 ? $(this).css("left").toString().replace("px","")/1 : -(frameWide.toString().replace("px","")*2);
			        $(this).css("left",-aux1);
			        nautilus_moves($(this), -aux1, settings.animationSpeed, settings.animationInterval)
		        }
		        
		        // add the animation movement to the layers that wave
		        if (settings.wave && $(this).hasClass("waves")) { 
			        var x = Math.floor(Math.random()*2);
			        var y = Math.floor(Math.random()*2);
			        var z = Math.floor(Math.random()*4);
			        if (x == 0) { x = -1; }
			        if (y == 0) { y = -1; }
			        if (z == 0) { z = 4; }
			        nautilus_waves($(this), $(this).css("top").replace("px",""), $(this).css("left").replace("px",""), x*z, y*Math.round((frameWide.toString().replace("px","")/1+$(this).css("left").toString().replace("px","")/1)/2), 1000); 
			    }
			    
			    // add some small animation to all the rest of the layers
			    //alert(settings.posLeft);
		        
            });
            
            // we place the controls if they are required
            if (settings.controls) {
	            
	            // append the controls
	            $(this).append("<div class='controls' style='z-Index:99999;position:absolute;background-color:" + settings.color + ";left:" + frameWidth.toString().replace("px","") + "px;top:0px;width:" + settings.controlsWidth + "px;height:" + settings.height + "px;'></div>");
	            if (settings.controlsType == "text") {
		            $(this).find(".controls").append("<span class='sub_ctrl ctrlUp'   >" + settings.controlsUp    + "</span>");
		            $(this).find(".controls").append("<span class='sub_ctrl ctrlLeft' >" + settings.controlsLeft  + "</span>");
		            $(this).find(".controls").append("<span class='sub_ctrl ctrlRight'>" + settings.controlsRight + "</span>");
		            $(this).find(".controls").append("<span class='sub_ctrl ctrlDown' >" + settings.controlsDown  + "</span>");
	            } else {
		            $(this).find(".controls").append("<img src='" + settings.controlsUp    + "'  class='sub_ctrl ctrlUp'    />");
		            $(this).find(".controls").append("<img src='" + settings.controlsLeft  + "'  class='sub_ctrl ctrlLeft'  />");
		            $(this).find(".controls").append("<img src='" + settings.controlsRight + "'  class='sub_ctrl ctrlRight' />");
		            $(this).find(".controls").append("<img src='" + settings.controlsDown  + "'  class='sub_ctrl ctrlDown'  />");
	            }

	            // Add functionality to the buttons
	            $(".sub_ctrl").mouseenter(function() {
		            	// depending on the button moused over, we move to one direction or another
	                    if ($(this).hasClass("ctrlDown" )) { $(this).parent().parent().find(".frames").stop().animate({top:settings.height-settings.deep}, settings.speedDown) }
	                    if ($(this).hasClass("ctrlUp"   )) { $(this).parent().parent().find(".frames").stop().animate({top:0}, settings.speedDown) }
	                    //if ($(this).hasClass("ctrlLeft" )) { $(this).parent().parent().find(".frames").stop().animate({left:400}, settings.speedSides) }
	                    //if ($(this).hasClass("ctrlRight")) { $(this).parent().parent().find(".frames").stop().animate({left:-(settings.width-settings.controlsWidth-settings.posLeft)}, settings.speedSides) }
	                    
	                    if ($(this).hasClass("ctrlLeft" )) { $(this).parent().parent().find(".frames").stop().animate({left:settings.posLeft}, settings.speedSides) }
	                    if ($(this).hasClass("ctrlRight")) { $(this).parent().parent().find(".frames").stop().animate({left:-settings.posLeft}, settings.speedSides) }
	                }).mouseleave(function() {
		                // when the button is released, we always go to the top center
	                    selfDiv.find(".frames").stop().animate({left:0,top:0}, settings.speedUp)
	                });
            }
            
		});
	};
})(jQuery);