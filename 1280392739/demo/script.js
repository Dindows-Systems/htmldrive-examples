$(document).ready(function(){

	$('#navigationMenu li .normalMenu').each(function(){

		$(this).before($(this).clone().removeClass().addClass('hoverMenu'));

	});
	
	$('#navigationMenu li').hover(function(){
	
		$(this).find('.hoverMenu').stop().animate({marginTop:'0px'},200);

	},
	
	function(){
	
		$(this).find('.hoverMenu').stop().animate({marginTop:'-25px'},200);

	});
	
});
