$(document).ready(function(){

//Ajax Event Handler For Categorie Demo
	var $menu1 = $('#navDemo02');


	
	function success(){
		
 		$('div.ajaxContent').hide();
      $('div.ajaxContent').show(200);
	}

	function ajaxCallTimeout(index){
	var url = 'categorie/0'+(index+1)+'.html';
	 $('div.ajaxContent').load(url, success);
	}
	function ajaxCategorie(){
		var index = $menu1.find('li a').index(this);
		 $('div.ajaxContent').html('<p style="color:#4CC3EC; text-align:center; margin-top:45px;">Loading...<img src="img/loading.gif" /></p>');
		switch(index){
			case 0 :
				
				  $('div.ajaxContent').stop().animate({marginTop: 0}, 1000,'linear', function(){ajaxCallTimeout(index)});
			break;
			case 1 : 
			
				  $('div.ajaxContent').stop().animate({marginTop: 0}, 1000,'linear', function(){ajaxCallTimeout(index)});
			break;
			case 2 : 
			
				  $('div.ajaxContent').stop().animate({marginTop: 0}, 1000,'linear',function(){ajaxCallTimeout(index)});
			break;
			case 3 : 
				
				  $('div.ajaxContent').stop().animate({marginTop: 0}, 1000,'linear', function(){ajaxCallTimeout(index)});
			break;
			case 4 : 
				
				  $('div.ajaxContent').stop().animate({marginTop:0}, 1000,'linear', function(){ajaxCallTimeout(index)});
			break;
			case 5 : 
		
				  $('div.ajaxContent').stop().animate({marginTop: 0}, 1000,'linear', function(){ajaxCallTimeout(index)});
			break;
			case 6 : 
		
				  $('div.ajaxContent').stop().animate({marginTop: 0}, 1000,'linear', function(){ajaxCallTimeout(index)});
			break;


		}
	}

	$menu1.find('li a').bind('click', ajaxCategorie);


}); 