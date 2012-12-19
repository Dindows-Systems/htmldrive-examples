(function($) {

	$.fn.animatedBG = function(options){
		var height = $(this).height();
		var width = $(this).width();
		var parts = options.parts;
		var parts_width = width/parts;
		var bg_image = $(this).css("background-image");
		var animationWidth = options.animationWidth;

		if (animationWidth == 'auto' || animationWidth == undefined) {
			animationWidth = parts_width;
		} 
		
		for (i=1;i<=options.parts;i++)
		{
			$(this).append("<div class='bg_part_cont bg_part_"+i+"' rel='"+i+"'></div>");
			$(this).find(".bg_part_"+i).css("float", "left");
			$(this).find(".bg_part_"+i).css("background-image", bg_image);
			$(this).find(".bg_part_"+i).css("background-position", "-"+parts_width*(i-1) + "px 0");
			$(this).find(".bg_part_"+i).css("width", parts_width);
			$(this).find(".bg_part_"+i).css("height", height);
			
			$(this).find(".bg_part_"+i).hover(function() {
				$(this).animate({backgroundPosition: "-"+parts_width*($(this).attr("rel")-1)-animationWidth + "px 0"});
			} , function() {
				$(this).animate({backgroundPosition: "-"+parts_width*($(this).attr("rel")-1) + "px 0"});
			});
		}

	};
	
})(jQuery);
