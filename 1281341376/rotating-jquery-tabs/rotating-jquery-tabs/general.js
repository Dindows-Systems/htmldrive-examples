//By ilovecolors.com.ar
//www.ilovecolors.com.ar/rotating-jquery-tabs/

//array to store IDs of our tabs
var tabs = [];
//index for array
var ind = 0;
//store setInterval reference
var inter;

//change tab and highlight current tab title
function change(stringref){
	//hide the other tabs
	jQuery('.tab:not(#' + stringref + ')').hide();
	//show proper tab, catch IE6 bug
	if (jQuery.browser.msie && jQuery.browser.version.substr(0,3) == "6.0")
		jQuery('.tab#' + stringref).show();
	else 
		jQuery('.tab#' + stringref).fadeIn();
	//clear highlight from previous tab title
	jQuery('.htabs a:not(#' + stringref + 't)').removeClass('select');
	//highlight currenttab title
	jQuery('.htabs a[href=#' + stringref + ']').addClass('select');
}
function next(){
	//call change to display next tab
	change(tabs[ind++]);
	//if it's the last tab, clear the index
	if(ind >= tabs.length)
		ind = 0;
}
jQuery(document).ready(function(){
	//store all tabs in array
	jQuery(".tab").map(function(){
		tabs[ind++] = jQuery(this).attr("id");
    })
	//set index to next element to fade
	ind = 1;
	//initialize tabs, display the current tab
	jQuery(".tab:not(:first)").hide();
	jQuery(".tab:first").show();
	//highlight the current tab title
	jQuery('#' + tabs[0] + 't').addClass('select');
	//handler for clicking on tabs
	jQuery(".htabs a").click(function(){
		
		//if tab is clicked, stop rotating 
		clearInterval(inter);
		//store reference to clicked tab
		stringref = jQuery(this).attr("href").split('#')[1];
		//display referenced tab
		change(stringref);
		return false;
	});
	//start rotating tabs
	inter = setInterval("next()", 1000);
});