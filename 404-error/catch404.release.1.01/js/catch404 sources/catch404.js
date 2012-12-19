(function($) {
  $.fn.catch404 = function(options) {
    options = $.extend({
      optionOne: 'defaultValue',
      optionTwo: { partOne: 'defaultValue' }
    }, options);

  $(this).each(function() 
  { 
    /* begin catch 404 - contribs: Addy Osmani, James Padolsey, Christian Heillman, Soh Tanaka*/
	var container = $('#target');
    container.attr('tabIndex','-1');
  
  $(this).click(function()
  {
    var trigger = $(this);
    var url = trigger.attr('href');
	
    if(!trigger.hasClass('loaded'))
	{
      trigger.append('<span></span>');
      trigger.addClass('loaded');
      var msg = trigger.find('span::last');
    } else {
      var msg = trigger.find('span::last');
    }
	
    performAjaxCall(url,msg,container);
    return false;
  });
  
  function donav(url)
  {
    document.location.href = url;
  }
  
  function performAjaxCall(url,msg,container)
  {
    if(url.match('^http')){
      msg.removeClass('error');
      msg.html(' (checking...)');
      $.getJSON("http://query.yahooapis.com/v1/public/yql?"+
                "q=select%20*%20from%20html%20where%20url%3D%22"+
                encodeURIComponent(url)+
                "%22&format=xml'&callback=?",
        function(data){
          if(data.results[0]){
            var data = filterData(data.results[0]);
			donav(url);
          } else {
            msg.html(' (error!)');
            msg.addClass('error');	
			fourPop();
          }
        }
      );
    } else {
      $.ajax({
        url: url,
        timeout:5000,
        success: function(data){
          msg.html(' (ready.)');
        },
        error: function(req,error){
          msg.html(' (404!)');
          msg.addClass('error');
		  fourPop();
          if(error === 'error'){error = req.statusText;}
          var errormsg = 'Encountered comms error: '+error;
        },
        beforeSend: function(data){
          msg.removeClass('error');
          msg.html(' (checking...)');
        }
      });
    }
  }
  function filterData(data){
    // filter all the nasties out
    // no body tags
    data = data.replace(/<?\/body[^>]*>/g,'');
    // no linebreaks
    data = data.replace(/[\r|\n]+/g,'');
    // no comments
    data = data.replace(/<--[\S\s]*?-->/g,'');
    // no noscript blocks
    data = data.replace(/<noscript[^>]*>[\S\s]*?<\/noscript>/g,'');
    // no script blocks
    data = data.replace(/<script[^>]*>[\S\s]*?<\/script>/g,'');
    // no self closing scripts
    data = data.replace(/<script.*\/>/,'');
    // [... add as needed ...]
    return data;
  }
  
  function fourPop(){
		
				
		var popWidth = 500; 
		var popID = '404message';
 
		$('#' + popID).fadeIn().css({ 'width': Number( popWidth ) }).prepend('<a href="#" class="close"><img src="images/close_pop.png" class="btn_close" title="Close Window" alt="Close" /></a>');
		
		var popMargTop = ($('#' + popID).height() + 80) / 2;
		var popMargLeft = ($('#' + popID).width() + 80) / 2;
		
		//Apply Margin to Popup
		$('#' + popID).css({ 
			'margin-top' : -popMargTop,
			'margin-left' : -popMargLeft
		});
		
		//Fade in Background
		$('body').append('<div id="fade"></div>'); 
		$('#fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn(); 
		
		return false;
	};
	
	
	//Close Popups and Fade Layer
	$('a.close, #fade').live('click', function() { 
	  	$('#fade , .popup_block').fadeOut(function() {
			$('#fade, a.close').remove();  
	}); //fade them both out
		
		return false;
	});
  
  
    });
  }
})(jQuery);