$(document).ready(function() {

	prettyPrint();
	
	$('.tooltip-nav').tooltipster({
		animation: 'slide',
		delay: 400, 				
		position: 'bottom',
		speed: 200, 				
		timer: 0
	});
	
	$('.tooltip').tooltipster({
		delay: 200,
		timer: 2000
	});
	
	$('.tooltip-example-1').tooltipster();
	
	$('.tooltip-example-2').tooltipster({
		fixedWidth: 400,			
		followMouse: false, 
		position: 'bottom-left', 			
		tooltipTheme: '.tooltip-custom-2'
	});
	
	$('.tooltip-example-3').tooltipster({
		arrow: false,
		delay: 500, 				
		followMouse: true, 		
		position: 'top-right', 			
		timer: 8000,					
		tooltipTheme: '.tooltip-custom-3'
	});
	
	$('.tooltip-example-').tooltipster({
		delay: 200, 				
		fixedWidth: 400,			
		followMouse: false, 		
		offsetX: 0,					
		position: 'top', 			
		overrideText: '',			
		speed: 200, 				
		timer: 2000,				
		tooltipTheme: '.tooltip-message-2'	
	});
	
	$('.tooltipster-chocolate-preview').tooltipster({
		tooltipTheme: '.tooltipster-chocolate'
	});
	
	$('.tooltipster-clean-cut-preview').tooltipster({
		tooltipTheme: '.tooltipster-clean-cut'
	});
	
	$('.tooltipster-smoke-preview').tooltipster({
		tooltipTheme: '.tooltipster-smoke'
	});
	
});