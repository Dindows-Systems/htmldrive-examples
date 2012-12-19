/*
	*** danceFloor by Cedric Dugas ***
	*** Http://www.position-absolute.com ***
	
	Script for product placement.
	Licenced under the MIT Licence
	You can use and modify this script for any project you want, but please leave this comment as credit.

	Enjoy!
*/
$(document).ready(function() {
	$(".iDance .open").dancingSlide()
});


jQuery.fn.dancingSlide = function(settings) {

 	settings = jQuery.extend({
		speed : 1100
	}, settings);	

	isOpen = "none";		
		
	allDancer = $(".iDance").size();		// All SLIDING IMG
	for (x=0;x<allDancer;x++){			
		imgWidth = $(".iDance").eq(x).find(".open img").attr("width")
		imgWidth = imgWidth+"px"
		$(".iDance").eq(x).css("width", imgWidth)
	}
	return this.each(function(){
		var caller = this
		
		$("a[rel='closeDance']").bind("click",function(){close();return false;}) 
		$(caller).bind("click",function(){ startDance();return false; }) 
		
		function startDance() {				// OPEN CLOSE THE ANIMATION
			needToDance = $(caller) 
			openWidth = $(caller).parent().find(".interior").css("width")
	
			/* this is needed for internet explorer, it will not find this attr on the spot like firefox */
			callbackWidth2 =  $(caller).find("img").attr("width")
			callbackHeight2 =  $(caller).find("img").attr("height")
			
			if (isOpen != "none"){			// IF THE IS NO OPENED DIV
				
				$(isOpen).parent().animate({ width:callbackWidth});
			
			    $(isOpen).find("img").animate({
					width: callbackWidth,
					height: callbackHeight },500, function(){
					
					$(needToDance).parent().animate({width: openWidth},800);
			
				    $(needToDance).find("img").animate({
						width:0,
						height:0},700)
						
						isOpen = needToDance;
						callbackWidth = callbackWidth2 ;
						callbackHeight =  callbackHeight2;
					})
				}else{						// IF THERE IS A DIV OPEN
				isOpen = $(caller)	
				
				/* this is needed for internet explorer, it will not find this attr on the spot like firefox */
				callbackWidth =  $(caller).find("img").attr("width")
				callbackHeight =  $(caller).find("img").attr("height")
				
				$(caller).parent().animate({
					width: openWidth},800);
			    $(caller).find("img").animate({
					width:0,
					height:0},700)
			}
			return false;
		};
	})
	function close() { // CLOSE THE ANIMATION IF NEEDED
		$(isOpen).parent().animate({ width:callbackWidth});
	
	    $(isOpen).find("img").animate({
			width: callbackWidth,
			height: callbackHeight },500)

		return false;
	}
}

