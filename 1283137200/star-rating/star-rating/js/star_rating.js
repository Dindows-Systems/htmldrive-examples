/*
* Written by eligeske
* downloaded from eligeske.com
* have fun. nerd.
*/

$(document).ready(function(){
	
	// hover
	$('#rating_btns li').hover(function(){	
			$rating = $(this).text();
			$('#rating_on').css('width', rateWidth($rating));
	});	
	
	// mouseout
	$('#rating_btns li').mouseout(function(){
		
		$rating = $('#rating').text();
		if($rating == "not rated"){		
			$('#rating_on').css('width', "0px");
		}
		else{
			$('#rating_on').css('width', rateWidth($rating));		
		}
	});
	
	//click
	$('#rating_btns li').click(function(){
		$rating = $(this).text();
		$('#rating').text($rating);
		$('#rating_output').val($rating);
		$pos = starSprite($rating);
		$('#small_stars').css('background-position', "0px " + $pos );							   
		$('#rating_btns').hide();
		$('#rating_on').hide();
		$('#rated').fadeIn();	
	});
	
	//edit
	$('#rate_edit').click(function(){
		$('#rated').hide();						   
		$('#rating_btns').fadeIn();
		$('#rating_on').fadeIn();
		
	});
	
	function rateWidth($rating){
		
		$rating = parseFloat($rating);
		switch ($rating){
			case 0.5: $width = "14px"; break;
			case 1.0: $width = "28px"; break;
			case 1.5: $width = "42px"; break;
			case 2.0: $width = "56px"; break;
			case 2.5: $width = "70px"; break;
			case 3.0: $width = "84px"; break;
			case 3.5: $width = "98px"; break;
			case 4.0: $width = "112px"; break;
			case 4.5: $width = "126px"; break;
			case 5.0: $width = "140px"; break;
			default:  $width =  "84px";
		}
		return $width;
	}				
	
	function starSprite($rating){
		
		$rating = parseFloat($rating);
		switch ($rating){
			case 0.5: $pos = "-11px"; break;
			case 1.0: $pos = "-22px"; break;
			case 1.5: $pos = "-33px"; break;
			case 2.0: $pos = "-44px"; break;
			case 2.5: $pos = "-55px"; break;
			case 3.0: $pos = "-66px"; break;
			case 3.5: $pos = "-77px"; break;
			case 4.0: $pos = "-88px"; break;
			case 4.5: $pos = "-99px"; break;
			case 5.0: $pos = "-110px"; break;
			default:  $pos =  "-77px";
		}
		return $pos;
	}
	
});	

