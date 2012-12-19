jQuery(document).ready(function(){
	$("#iconbar li").hover(
		function(){
			var iconName = $(this).find("img").attr("src");
			var origen = iconName.split("x.")[0];
			$(this).find("img").attr({src: "" + origen + "o.gif"});
			$(this).find("span").attr({
				"style": 'display:inline'
			});
			$(this).find("span").animate({opacity: 1, top: "-60"}, {queue:false, duration:400});
		}, 
		function(){
			var iconName = $(this).find("img").attr("src");
			var origen = iconName.split("o.")[0];
			$(this).find("img").attr({src: "" + origen + "x.gif"});
			$(this).find("span").animate({opacity: 0, top: "-50"}, {queue:false, duration:400}, "linear",
				function(){
					$(this).find("span").attr({"style": 'display:none'});			
				}
			);
		});
});