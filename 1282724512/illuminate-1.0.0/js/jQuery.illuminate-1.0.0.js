/* Illuminate - jQuery plugin
 * 
 * This plugin is used to highlight elements on a web page.
 * 
 * What it does:
 * When using the plugin you can highlight any kind of element on the webpage. You could use it
 * for demo purpose. When you highlight an element, there is also an option to show a text
 * balloon. It will appear next to the element. This text balloon can contain text and HTML!
 * 
 * NOTE: To use this plugin properly you need to download the "jQuery.cookie" plugin!
 *       http://plugins.jquery.com/project/cookie
 * 
 * How to use:
 * $("#myElement").illuminate();
 * 
 * The options:
 * overlayColor      = This is used for the color of the overlay background.
 *                     Default: #000
 * overlayOpacity    = This is used to determine the opacity of the overlay.
 *                     Default: 0.4
 * overlayTimeOut    = The time (in milli seconds) before the overlay opens after you hover an
 *                     element. And the time before the overlay disappears after you exit the
 *                     element!
 *                     Default: 600
 * overlayOpen       = The options to open the overlay. "hover": When the mouse hovers the
 *                     object the overlay wil open. "click": When you click on an object the
 *                     overlay will open. "both": You can click and hover an object to open
 *                     the overlay
 *                     Default: both
 * overlayClose      = The options to close the overlay. "hover": When the mouse leaves the
 *                     object the overlay wil close. "click": When you click on the close button
 *                     the overlay will close. "both": You can click on the close button or
 *                     leave the object to close the overlay
 *                     Default: both
 * itemPadding       = This is used to add some space between the element and the border while
 *                     you hover the element
 *                     Default: 5
 * balloonWidth      = This is used for the with (in pixels) of the info balloon
                       Default: 300
 * balloonColor      = The color used for the text inside the info balloon
 *                     Default: #06c
 * balloonBackground = The background color inside the info balloon
 *                     Default: #e5effa
 * 
 * Add extra info balloon:
 * If you want the "Balloon" to appear, you need to add a div element width the class
 * "balloonText" inside the element you want to illuminate. What ever you put in that div will
 * appear inside the balloon. You can add text and html inside a balloon.
 * 
 * Add a status button:
 * It is possible for the user to turn the illuminate function off (or on). You only need a
 * checkbox with the id "illuminateStatus". You can add the checkbox anywhere you like.
 *
 * Add a status pop up (splash page):
 * If a user enters your site without a cookie, you can ask the user to turn on or off the demo
 * function. If you want this splash up, add a div (anywhere on the page) and give it the id
 * "illuminateCookiePopUp". The text you put inside that div is used for the pup up.
 * NOTE: The "on" and "off" buttons inside the pop up are images. You can change them, or even
 *       edit the CSS!
 * 
 * Developed with jQuery version: 1.4.2
 * 
 * Version: 1.0.0
 * Name: illuminate
 * 
 * Author: S.C. Tijdeman
 * E-mail: senne@howardshome.com
 */
 
 (function($){
	$.fn.extend({
		illuminate: function(custom_settings) {
            var defaults = {
                overlayColor: "#000",
                overlayOpacity: 0.4,
                overlayTimeOut: 600,
                overlayOpen: "both",
                overlayClose: "both",
                itemPadding: 5,
                balloonWidth: 300,
                balloonColor: "#06c",
                balloonBackground: "#e5effa"
            };
            
            var settings,           // Extends defaults with the custom_settings
                illuminateStatus,   // Turn the illuminate plugin onn or off (True / False)
                statusPopUp,        // Pop up if there is no cookie present
                statusButton,       // 
                obj,                // The object: $(this)
                openOverlayCheck,   // If the overlay shuold be opened (True / False)
                item,               // Object that should pup up
                itemPosition,       // 
                itemWidth,          // The width of the item
                itemHeight,         // The height of the item
                itemPadding,        // The padding around the item
                itemBorder,         // The border around the padding
                itemOffset,         // 
                isOpenOverlay,      // If the overlay is open or not (True / False)
                overlayColor,       // 
                overlayOpacity,     // 
                balloonContent,     // The content of the info balloon
                balloonOffsetLeft,  // The distance between the right border and the balloon
                balloonOffsetRight; // The distance between the left border and the balloon
            
            settings         = $.extend(defaults, custom_settings);
            statusPopUp      = $("#illuminateCookiePopUp").html();
            openOverlayCheck = false;
            isOpenOverlay    = false;
            
            if($.cookie('illuminateStatus')){
                checkStatus();
            }else{
                if(statusPopUp){
                    openOverlay("setStatus");
                }else{
                    illuminateStatus = true;
                    $.cookie('illuminateStatus', "demoOn", { expires: 365 });
                    
                    location.reload(true);
                }
            }
            
            $("#illuminateStatus").change(function(){
                changeStatus(false);
            });
            
            return this.each(function(){
                obj = $(this);
                
                obj.css("float", "left")
                   .css("display", "block");
               
                if(settings.overlayOpen == "hover"){
                    obj.mouseenter(function(){ countOpen("start") }).mouseleave(function(){ countOpen("stop") });
                }else if(settings.overlayOpen == "click"){
                    obj.click(function(){ countOpen("click") });
                }else{
                    obj.mouseenter(function(){ countOpen("start") }).mouseleave(function(){ countOpen("stop") });
                    obj.mouseenter(function(){ countOpen("start") }).mouseleave(function(){ countOpen("stop") });
                    
                    obj.click(function(){ countOpen("click") });
                }
            });
            
            function countOpen(countStatus)
            {
                if(illuminateStatus){
                    if(countStatus == "start"){
                        openOverlayCheck = true;
                        setTimeout(checkOverlayOpen, settings.overlayTimeOut);
                    }else if(countStatus == "stop"){
                        openOverlayCheck = false;
                    }else if(countStatus == "click"){
                        openOverlayCheck = true;
                        checkOverlayOpen();
                    }
                }
            }
            
            function checkOverlayOpen()
            {
                if(openOverlayCheck){
                    if(!isOpenOverlay){
                        openOverlay("openItem");
                    }
                }
            }
            
            function countClose(countStatus)
            {
                if(countStatus == "start"){
                    closeOverlayCheck = true;
                    setTimeout(checkOverlayClose, settings.overlayTimeOut);
                }else if(countStatus == "stop"){
                    closeOverlayCheck = false;
                }else if(countStatus == "click"){
                    closeOverlayCheck = true;
                    checkOverlayClose();
                }
            }
            
            function checkOverlayClose()
            {
                if(closeOverlayCheck){
                    if(isOpenOverlay){
                        closeOverlay();
                    }
                }
            }
            
            function openOverlay(afterOpen)
            {
                isOpenOverlay = true;
                
                if(afterOpen == "setStatus"){
                    overlayColor   = "#000";
                    overlayOpacity = 0.4;
                }else{
                    overlayColor   = settings.overlayColor;
                    overlayOpacity = settings.overlayOpacity;
                }
                
                $("body").append("<div id=\"illuminateOverlay\"></div>");
                $("#illuminateOverlay").css("background", overlayColor);
                $("#illuminateOverlay").fadeTo("fast", overlayOpacity);
                
                $("body").append("<div id=\"itemClose\"></div>");
                
                if(afterOpen == "openItem"){
                    openItem()
                }else if(afterOpen == "setStatus"){
                    setStatus()
                }
            }
        
            function closeOverlay()
            {
                $("#itemOverlay").fadeOut("fast", function(){
                    $("#illuminateOverlay").fadeOut("fast", function(){
                        $("#itemOverlay").remove();
                        $("#itemClose").remove();
                        $("#illuminateOverlay").remove();
                        
                        isOpenOverlay = false;
                    });
                });
            }
            
            function openItem()
            {
                item         = obj.html();
                itemPosition = obj.offset();
                itemWidth    = obj.width();
                itemHeight   = obj.height();
                itemPadding  = settings.itemPadding;
                itemBorder   = 1;
                itemOffset   = itemPadding + itemBorder;
                
                $("body").append("<div id=\"itemOverlay\"><div id=\"itemOverlayContent\"></div></div>");
                $("#itemOverlay").fadeIn("fast", addTextBalloon);
                
                $("#itemOverlay").css("left", itemPosition.left - itemOffset +"px")
                                 .css("top", itemPosition.top - itemOffset +"px")
                                 .css("position", "absolute");
                
                $("#itemOverlayContent").css("width", itemWidth +"px")
                                        .css("height", itemHeight +"px")
                                        .css("padding", itemPadding +"px")
                                        .append(item);
                
                if(settings.overlayClose == "hover"){
                    $("#itemOverlay").mouseleave(function(){ countClose("start") }).mouseenter(function(){ countClose("stop") });
                }else if(settings.overlayClose == "click"){
                    $("#itemClose").fadeIn("fast");
                    $("#itemClose").click(closeOverlay);
                }else{
                    $("#itemOverlay").mouseleave(function(){ countClose("start") }).mouseenter(function(){ countClose("stop") });
                    
                    $("#itemClose").fadeIn("fast");
                    $("#itemClose").click(function(){ countClose("click") });
                }
            }
            
            function addTextBalloon()
            {
                balloonContent = obj.find(".balloonText").html();
                
                if(balloonContent){
                    $("#itemOverlay").append("<div id=\"textBalloonWrapper\"><div id=\"textBalloon\"></div></div>");
                    
                    balloonOffsetLeft  = $(window).width() - obj.offset().left - itemWidth;
                    balloonOffsetRight = $(window).width() - balloonOffsetLeft - itemWidth;
                    
                    if(balloonOffsetLeft > settings.balloonWidth + 15){
                        balloonLeft    = itemWidth + (itemPadding * 2) + itemBorder;
                        balloonPadding = "padding-left";
                    }else if(balloonOffsetRight > settings.balloonWidth + 15){
                        balloonLeft    = -settings.balloonWidth - 10;
                        balloonPadding = "padding-right";
                    }else{
                        balloonLeft    = 10;
                        balloonPadding = "padding-right";
                    }
                    
                    $("#textBalloonWrapper").css("left", balloonLeft +"px")
                                            .css("top", 0 +"px")
                                            .css("width", settings.balloonWidth +"px")
                                            .css(balloonPadding, 10 +"px");
                    
                    $("#textBalloon").css("color", settings.balloonColor)
                                     .css("background", settings.balloonBackground)
                    
                    $("#textBalloon").append(balloonContent);
                    
                    setTimeout(function(){ $("#textBalloon").fadeIn("slow"); }, 100);
                }
            }
            
            function checkStatus()
            {
                if($.cookie('illuminateStatus') == "demoOn"){
                    $('input#illuminateStatus').attr('checked', true);
                    illuminateStatus = true;
                }else if($.cookie('illuminateStatus') == "demoOff"){
                    $('input#illuminateStatus').attr('checked', false);
                    illuminateStatus = false;
                }else{
                    return false;
                }
            }
            
            function setStatus()
            {
                $("body").append("<div id=\"itemOverlay\"><div id=\"illuminateCookie\">"+ statusPopUp +"<div style=\"margin-top: 15px;\"><span id=\"illuminateCookieON\"></span><span id=\"illuminateCookieOFF\"></span></div></div></div>");
                
                $("#itemOverlay").css("top", ($(window).height() / 2) - ($("#itemOverlay").height() / 2) +"px")
                                 .css("left", ($(window).width() / 2) - ($("#itemOverlay").width() / 2) +"px")
                                 .css("position", "absolute");
                
                $("#itemOverlay").fadeIn("normal");
                
                $("#illuminateCookieON").click(function(){
                    changeStatus("demoOn");
                    closeOverlay();
                });
                
                $("#illuminateCookieOFF").click(function(){
                    changeStatus("demoOff");
                    closeOverlay();
                });
            }
            
            function changeStatus(manualStatus)
            {
                if(!manualStatus){
                    if($('input#illuminateStatus').is(':checked')){
                        illuminateStatus = true;
                        $.cookie('illuminateStatus', "demoOn", { expires: 365 });
                    }else{
                        illuminateStatus = false;
                        $.cookie('illuminateStatus', "demoOff", { expires: 365 });
                    }
                }else{
                    if(manualStatus == "demoOn"){
                        illuminateStatus = true;
                        $.cookie('illuminateStatus', "demoOn", { expires: 365 });
                        $('input#illuminateStatus').attr('checked', true);
                    }else{
                        illuminateStatus = false;
                        $.cookie('illuminateStatus', "demoOff", { expires: 365 });
                        $('input#illuminateStatus').attr('checked', false);
                    }
                }
            }
		}
	});
})(jQuery);