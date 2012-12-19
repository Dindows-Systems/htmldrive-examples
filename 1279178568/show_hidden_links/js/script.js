/*
* Author:      Marco Kuiper (http://www.marcofolio.net/)
*/
google.load("jquery", "1.3.1");
google.setOnLoadCallback(function()
{
	var csshover = { 'color' : '#718374', 'text-decoration' : 'underline' };
	var cssclear = { 'text-decoration' : 'none', 'color' : '#888888' }
	
	$(".colorhover").hover(
		function() {
			 $(this).find("a").css(csshover);
		},
		function() {
			$(this).find("a").css(cssclear);
		}
	);
});