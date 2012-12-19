$(function(){
	var shadowOffset	=	1.08;									// shadow offset
	var lightswitch		=	$("#switch");							// the light switch
	var lightbulb		=	$("#light-bulb");						// outer light bulb
	var lightbulb2		=	$("#light-bulb2");						// inner light bulb
	var lightCenterX	=	parseInt(lightbulb.width()/2);			// center of light - X-axis
	var lightCenterY	=	parseInt(lightbulb.height()/2);			// center of light - Y-axis
	var logo			=	$("#logo");								// logo container
	var lightAlogo		=	$("#light-bulb, #logo");				// light and logo containers
	var logoCenterX		=	parseInt(logo.width()/2);				// center of logo - X-axis
	var logoCenterY		=	parseInt(logo.height()/2);				// center of logo - Y-axis
	var logoshadow		=	$("#logosh");							// shadow container
	var logoShdwCenterX	=	parseInt(logoshadow.width()/2);			// center of shadow - X-axis
	var logoShdwCenterY	=	parseInt(logoshadow.height()/2);		// center of shadow - Y-axis
	var statustext		=	$("#infobox p");						// info-box text container
	var defaulttxt		=	"Drag the light-bulb or the logo!";		// info-box default text
	var ontxt			=	"Let there be light!";					// info-box text for hovering switch while state is "off"
	var offtxt			=	"Switch off the light!";				// info-box text for hovering switch while state is "on"
	
	statustext.text(defaulttxt);		// set info-box text to default text
	moveShadow();						// start our main function
	
	
	
	
	// making the light and the logo draggable
	lightAlogo.draggable({
		drag: function(event, ui){
			statustext.text("dragging " + $(this).attr("id"));	// change the statustext do "dragging + element id" state
			moveShadow();										// our main function which will move the shadow
		},
		stop: function(event, ui){
			statustext.text(defaulttxt);						// switching to default text when stoped draging
		}
	});


	// asinging the things, which should happen, when clicking the light switch
	lightswitch.click(function(){
		if(lightbulb.hasClass("off")){									// when the light bulb has the class "off" do following:
			lightbulb.removeClass("off");									// first remove the class "off"
			lightswitch.css("backgroundPosition","0 0");					// change the background position of the CSS sprite
			logoshadow.stop().fadeTo(750,setOpacity(shadowDistance));		// showing the shadow of the logo with a fading animation
			lightbulb2.stop().fadeTo(750,1);								// fade in the inner light bulb container (light is turned on!)
			statustext.text(offtxt);										// changing the status text to the "off text"
		}else{															// else do following:
			lightbulb.addClass("off");										// adding the class "off"
			lightswitch.css("backgroundPosition","-80px 0");				// move the background position of the switch back to original position
			logoshadow.stop().fadeTo(750,0);								// fade out the logo shadow
			lightbulb2.stop().fadeTo(750,0);								// fade out the turned on light (no more lights now)
			statustext.text(ontxt);											// changing the status text to the "on text"
		}
	});
	
	
	
	// changing the infotext when hovering the switch
	lightswitch.hover(function(){
		if(lightbulb.hasClass("off")){
			statustext.text(ontxt);			// when lightbulb has the class "off" show this text
		}else{
			statustext.text(offtxt);		// otherwise show this text
		}
	},function(){
		statustext.text(defaulttxt);		// hovering out will show the default text again
	});



	// calculating the shadow opacity according to the light bulb distance
	function setOpacity(getDistance){
		if(lightbulb.hasClass("off")){
			return 0;								// if the lightbulb has the class "off", opacity = 0 (no shadow)
		}else{
			return (1.2 - getDistance /1000);		// otherwise we calculate a suitable shadow opacity with this formular
		}
	}
	
	// the main function - our shadow mover
	function moveShadow(){
			// save the current X position of the light bulb
		lightX			=	parseInt(lightbulb.offset().left) + lightCenterX;
			// save the current Y position of the light bulb
		lightY			=	parseInt(lightbulb.offset().top) + lightCenterY;
			// save the current X position of the logo
		logoX			=	parseInt(logo.offset().left) + logoCenterX;
			// save the current Y position of the logo
		logoY			=	parseInt(logo.offset().top) + logoCenterY;
			// save the value how far the logo is away from the light bulb on the X-axis
		distanceX		=	logoX - lightX;
			// save the value how far the logo is away from the light bulb on the Y-axis
		distanceY		=	logoY - lightY;
			// calculating and saving the value of the square root of those two distance values
		distance		=	Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
			// calculating and saving the shadow distance with the offset we defined in our variables 
		shadowDistance	=	distance * shadowOffset;
			// preparing the CSS value to put into the "left" attribute of the shadow container
		shadowPosLeft	=	(distanceX / distance * shadowDistance + lightX - logoShdwCenterX) + "px";
			// preparing the CSS value to put into the "top" attribute of the shadow container
		shadowPosTop	=	(distanceY / distance * shadowDistance + lightY - logoShdwCenterY) + "px";
			// finaly using the results of all above calculations to position our shadow and set the opacity
		logoshadow.css({ "left": shadowPosLeft, "top": shadowPosTop, "opacity": setOpacity(shadowDistance) });
	}
	
	
});