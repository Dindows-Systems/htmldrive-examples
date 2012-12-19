/*
LICENCE
*******
navDock jquery Plugin
@Author : Denis Pissoort
is shared under the terms of the licence Creative Commons Paternité-Partage des Conditions Initiales à l'Identique 2.0 Belgique.
For more information : Author's work Page : http://dipi-graphics.com/labs/6/NavDock-jQuery-Plugin.html
                       Licence Page : http://creativecommons.org/licenses/by-sa/2.0/be/
*/
(function($) {
       
        $.fn.navDocks = function(params) {
              
                params = $.extend( {fromSize: 64,toSize: 128, speed: 350, activeMenu: false, tips: true, ajax: true}, params);
               
                this.each(function() {
                var $menu = $(this);
		var margin = params.toSize - params.fromSize;
		var ItemsArray = $menu.find('li a').get();
		var numItems = ItemsArray.length;
		var interSize = params.fromSize+((params.toSize - params.fromSize)/2);
		var interMargin = params.toSize -  interSize;
		var normalMenuWidth = params.fromSize*numItems;
		var animateMenuWidth = (params.fromSize*(numItems-3)) + params.toSize +1 + (2*interSize);
		var animateMenuWidthCorner = (params.fromSize*(numItems-2)) + params.toSize +1 + interSize;
		var $spanTips;
		if(params.tips){
			var tips = new Array();
			for (i=0; i<numItems; i++){
				tips[i]= $('li a img:eq('+i+')').attr("alt");
				$menu.find('li a img:eq('+i+')').after('<span class="tips">'+tips[i]+'</span>');

			}
			$spanTips = $menu.find('span.tips');
			$spanTips.animate({opacity:0.0}, 0, 'linear');
		}
		
	function handlerEnter() {
		 console.time('navDock1-2');
		var indexIn = $menu.find('li a').index(this);
	    if( (indexIn== 0)||(indexIn == (numItems-1))){
			
			$menu.stop().animate({width: animateMenuWidthCorner}, params.speed, 'linear');
		}else{
		$menu.stop().animate({width: animateMenuWidth}, params.speed, 'linear');
		}
		$(this).stop().animate({width: params.toSize, height: params.toSize,  marginTop:0}, params.speed, 'linear', function(){if(params.tips){
		$(this).find('span.tips').stop().animate({opacity:1.0}, params.speed, 'linear');
		}});
		
		if(indexIn < (numItems-1)){
			
			$(ItemsArray[indexIn+1]).stop().animate({width: interSize, height: interSize,  marginTop:interMargin}, params.speed, 'linear');
		}
		if(indexIn > 0){
			$(ItemsArray[indexIn-1]).stop().animate({width: interSize, height: interSize,  marginTop:interMargin}, params.speed, 'linear');
		}
		 console.timeEnd('navDock1-2');
		
	};	

	function handlerLeave() {
		$(this).stop().animate({width: params.fromSize, height: params.fromSize, marginTop: margin}, params.speed, 'linear');
		var indexOut = $menu.find('li a').index(this);
		if(indexOut < (numItems-1)){
			$(ItemsArray[indexOut+1]).stop().animate({width: params.fromSize, height: params.fromSize, marginTop: margin}, params.speed, 'linear');
		}
		if(indexOut > 0){
			$(ItemsArray[indexOut-1]).stop().animate({width: params.fromSize, height: params.fromSize, marginTop: margin}, params.speed, 'linear');
		}
		$menu.stop().animate({width: normalMenuWidth}, params.speed, 'linear');
		if(params.tips){
		$spanTips.stop().animate({opacity:0.0}, params.speed, 'linear');
		}
	};

	$(ItemsArray).bind('mouseenter',handlerEnter);
	$(ItemsArray).bind('mouseleave',handlerLeave);

	if(params.ajax){
		$(ItemsArray).click(function() {
			if(params.tips){ $menu.find('span.tips').stop().animate({opacity:0}, 100, 'linear');}
			$(ItemsArray).unbind('mouseenter',this.mouseenter).unbind('mouseleave',this.mouseleave);
		
			$(this).stop().animate({width: params.fromSize, height: params.fromSize, marginTop: margin}, params.speed, 'linear', function() {
			    $(this).animate({marginTop:(margin/2)},300, 'linear',function() {
				    $(this).animate({marginTop:margin},300, 'linear',function() {
						    $(this).animate({marginTop:(margin/2)},300, 'linear',function() {
								    $(this).animate({marginTop:(margin)},300, 'linear',function() {
									   $(ItemsArray).bind('mouseenter',handlerEnter);
										    $(ItemsArray).bind('mouseleave',handlerLeave);
										    
									    });
							    });
					    });
				    });
			});
			var indexOut = $menu.find('li a').index(this);
			
			if(indexOut < (numItems-1)){
			$(ItemsArray[indexOut+1]).stop().animate({width: params.fromSize, height: params.fromSize, marginTop: margin}, params.speed, 'linear');
			}
			if(indexOut > 0){
			$(ItemsArray[indexOut-1]).stop().animate({width: params.fromSize, height: params.fromSize, marginTop: margin}, params.speed, 'linear');
			}
			$menu.stop().animate({width: normalMenuWidth}, params.speed, 'linear');
		
			if(params.activeMenu){
			$menu.find('li.navActive').removeClass('navActive');
			$(this).parent().addClass('navActive');
			}
			return false;
			
			
		});
	}
	});
       
        return this;
        };
})(jQuery);