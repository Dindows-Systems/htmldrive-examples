/*
 * 	GARAGEDOOR MENU 
 * 	A Javascript jQuery script by Gaya Kessler
 * 	Version 1.0
 * 	Date: 08-04-09
 * 
 */

var GarageDoor = {
	
	scrollY: 0,
	scrollX: 0,
	
	setBindings: function(id) {
		$("#" + id + " .mouse").each(function(i){
			$(this).bind("mouseenter", function(e){
				GarageDoor.hideDoor(this);
			});
			$(this).bind("mouseleave", function(e){
				GarageDoor.showDoor(this);
			});
			
			$(this).bind("click", function(e){
				window.location = this.parentNode.title;
			});
		});
	},
	
	hideDoor: function(obj) {
		var xs = GarageDoor.scrollX;
		var ys = GarageDoor.scrollY;
		
		$(obj).parent().find(".overlay").each(function(i) {
			$(this).stop().animate({
				marginTop: ys + "px"
			}, 200);
		});
	},
	
	showDoor: function(obj) {		
		$(obj).parent().find(".overlay").each(function(i) {
			$(this).stop().animate({
				marginTop: "0px"
			}, 500);
		});
	}
}