$(document).ready(function(){
	/* This code is run on page load */

	var deg=0;
	var dif=-3;

	/* Assigning the buttons to a variable for speed: */
	var arr = $('.btn');
	
	/* Storing the length of the array in a viriable: */
	var len = arr.length;
	
	/* Finding the centers of the animation container: */
	var centerX = $('#stage').width()/2 - 40;
	var centerY = $('#stage').height()/2 - 60;

	/* Applying relative positioning to the buttons: */
	arr.css('position','absolute');
	
	/* The function inside the interva is run 25 times a second */
	setInterval(function(){
	
	/* This forms an area with no activity in the middle of the stage */
	if(Math.abs(dif)<0.5) return false;
	
	/* Increment the degrees: */
	deg+=dif;
	
	/* Loop through all the buttons: */
	$.each(arr,function(i){
		
		/* Calculate the sine and cosine */

		var eSin = Math.sin(((360/len)*i+deg)*Math.PI/180);
		var eCos = Math.cos(((360/len)*i+deg)*Math.PI/180);
		
		/* Setting the css properties */
		$(this).css({
			top:centerY+25*eSin,
			left:centerX+90*eCos,
			opacity:0.8+eSin*0.2,
			zIndex:Math.round(80+eSin*20)
		});

	})
	
	},40);
	
	/* Detecting the movements on the mouse and speeding up or reversing the rotation accordingly: */
	
	var over=false;
	$("#stage").mousemove(function(e){

		if(!this.leftOffset)
		{
			/* This if section is only run the first time the function is executed. */
			this.leftOffset = $(this).offset().left;
			this.width = $(this).width();
		}
	
		/* If the mouse is over a button, set dif to 0, which stops the animation */
		if(over) dif=0;
		else
		dif = -5+(10*((e.pageX-this.leftOffset)/this.width));
		
		/* In the other case calculate the speed according to the X position of the mouse */
	});
	

	/* Detecting whether the mouse is positioned above a share button: */
	$(".bcontent").hover(
		function(){over=true;dif=0;},
		function(){over=false;}
	);
});