/*
* Author:      Marco Kuiper (http://www.marcofolio.net/)
*/
google.load("jquery", "1.3.1");
google.setOnLoadCallback(function()
{
	// We'll need to loop through each <pre> element
	// with the class "jcexpander"
	$("pre.jcexpander").each(function(){
		
		// Only do something when the inner element (the <code> element)
		// is bigger than the parent (<pre>) element
		if( $("code", this).height() > $(this).height() ||
			$("code", this).width() > $(this).width()) {
			
			// We'll need to store the original values of the sizes
			// since we'll use it to "grow back"
			$(this).data('originalHeight' , $(this).height());
			$(this).data('originalWidth', $(this).width());
			
			// Create a IMG element for the overlay
			var icon = document.createElement("img");
			$(icon).css({ 'position' : 'absolute'});
			$(icon).attr("src", "images/fullscreen.png");
			
			// Append the image to the <pre> element
			$(icon).prependTo($(this));
			
			// When the <pre> element is hovered, this happens
			// First function is "over", second is "out"
			$(this).hover(function(){
				// Fade out the image
				$(icon).fadeOut();
				
				// Read the size of the <code> element
				var codeWidth = $("code", this).width();
				var codeHeight = $("code", this).height();
				
				// Size the <pre> element to be just as big
				// as the <code> element
				$(this)
					.stop()
					.animate({
						width : codeWidth + "px",
						height : codeHeight + "px"
					}, 1500);
					
			}, function(){
				// Fade in the image
				$(icon).fadeIn();
				
				// Size the <pre> element back to the
				// original size.
				$(this)
					.stop()
					.animate({
						width : $(this).data('originalWidth') + "px",
						height : $(this).data('originalHeight') + "px"
					}, 1500);
			});
		}
	});
});