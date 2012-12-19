$(function($){

var mapUrl=''; /* path to the .png file;
                  if the map doesn't load properly, replace the direct path to the file, example:
                  var mapUrl='http://example.com/map/eu-500px.png'; 
                  by default, the path to the map file is automatically taken by the script, but sometimes (for unknown reasons), this file is not located */
var loadingText="Loading ..."; // the pre-loader text shown when map is loading
var loadingErrorText="No map!"; // the loading error text
var tooltipArrowHeight=4; /* height of the arrow under the 'bubble';
                             You can remove the arrow in the CSS file, 
                             after removal of the arrow set: 
                             var tooltipArrowHeight=0; */
var IdListyAdresow='#addresses'; /* ID for the list of agents addresses
                                    don't forget about hash (#) before name  */

// MULTIPLE-CLICK MODE

var searchLink='search.php'; // search engine url
var searchLinkVar='region'; // variable passing to the search engine
var searchName='Search'; // text of the search engine link

  $.multipleClickAction = function(e){
    var clickedRegions=[];
    $('#europe').find('.active-region').each(function(){ // searching for activated regions (DO NOT EDIT!)
       var url=$(this).children('a').attr('href'); // get urls of activated regions (DO NOT EDIT!)

       // links settings

       var slicedUrl=url.slice(1); // by default, removes hash (#) from the link url
       /* when you're using a safe urls, like: 'search.php?region=bratislavsky-kraj'
          you have to 'cut-off' parameters from the link url, by this function:

          var slicedUrl=url.slice(url.indexOf('?')+8); // removes: '?region=' ... +8 is the number of cut-off characters
       */


       // fill an array of activated regions (DO NOT EDIT!)
       clickedRegions.push(slicedUrl);
    });

    // creates a link to a search engine with the name of selected regions
    $('#search-link').attr('href',searchLink+'?'+searchLinkVar+'='+clickedRegions.join('|'));

   }

// STANDARD FEATURES

  // click on the region
  $.defaultClickAction = function(e){
    var url = $(e).children('a').attr('href'); // get link url of the clicked region (DO NOT EDIT!)

    // by default, clicking on the region moves to the page in the link
    window.location.href=url; 

    // displays the agent address of the actived region
    $(IdListyAdresow).find('li:visible').hide();
    $(url).show();
  }

  // double click on the activated region
  $.doubleClickedRegion = function(e){
    // by default, disables the activated region
    $(e).removeClass('active-region');

    // hide agents addresses
    $(IdListyAdresow).find('li:visible').hide();
   }


/* --------------------------------------------------------
   the map starts here

DO NOT EDIT! 

Europe, CSS & jQuery clickable map| http://winstonwolf.pl/clickable-maps/europe.html
script version: 3.3.2 by Winston Wolf | http://winstonwolf.pl
Copyright (C) 2011 Winston_Wolf | All rights reserved


really, DO NOT EDIT THIS! */
  $('#map-eu').prepend('<span id="loader">'+loadingText+'</span>').addClass('script'); $('#europe').find('a').hide(); $(IdListyAdresow).find('li').hide(); if($('#map-eu').hasClass('multiple-click')){ if(searchLink==''){ searchLink='search.php'; } if(searchLinkVar==''){ searchLinkVar='region'; } if(searchName==''){ searchName='Search'; } $('<a href="'+searchLink+'" id="search-link">'+searchName+'</a>').insertAfter('#europe'); } if(mapUrl==''){ var mapUrl=$('#europe').css('background-image').replace(/"/g,"").replace(/url\(|\)$/ig, ""); } var mapImg=new Image();
  $(mapImg).load(function(){
    var countRegions=0; $('#loader').fadeOut();
    $('#europe').find('li').each(function(){
      var liid=$(this).attr('id'); var code=null; countRegions++;
      switch(liid){ case 'eu2': case 'eu21': case 'eu23': case 'eu25': case 'eu27': case 'eu29': case 'eu31': spans=2; break; case 'eu13': case 'eu16': case 'eu17': case 'eu35': case 'eu47': spans=17; break; case 'eu14': case 'eu22': case 'eu34': case 'eu43': case 'eu46': spans=31; break; case 'eu38': spans=42; break; default: spans=12; }
      var tooltipLeft=$(this).children('a').outerWidth()/-2; var tooltipTop=$(this).children('a').outerHeight()*-1-tooltipArrowHeight; if($('#map-eu').hasClass('no-tooltip')){ var tooltipTop=0; }
      $(this).prepend('<span class="map" />').append('<span class="bg" />').attr('tabindex',countRegions); for(var i=1;i<spans;i++){$(this).find('.map').append('<span class="s'+i+'" />');}
      $(this).children('a').css({'display':'none','margin-left':tooltipLeft,'margin-top':tooltipTop,'visibility':'visible'});
      if($(this).children('a').hasClass('active-region')){ $(this).addClass('active-region focus'); }
     }).hover(function(){ $.MapHoveredRegion($(this)); },function(){ $.MapUnHoveredRegion($(this)); }).focus(function(){ $.MapHoveredRegion($(this)); }).blur(function(){ $.MapUnHoveredRegion($(this)); }).keypress(function(e){ code=(e.keyCode ? e.keyCode : e.which); if(code==13) $.MapClickedRegion($(this));}).click(function(e){$.MapClickedRegion($(this)); });
   }).error(function(){$('#loader').text(loadingErrorText); $('#europe').find('span').hide(); $('#map-eu,#europe').css({'height':'auto','left':'0','margin':'0 auto'});}).attr('src',mapUrl);
  $.MapClickedRegion = function(e){ if($('#map-eu').hasClass('multiple-click')){ if($(e).hasClass('active-region')){ $(e).removeClass('active-region'); } else{ $(e).addClass('active-region'); } $.multipleClickAction(e); } else{ if($(e).hasClass('active-region')){ $.doubleClickedRegion(e); } else{ $('#europe').find('.active-region').removeClass('active-region'); $('#europe').find('.focus').removeClass('focus'); if($(e).hasClass('active-region')){ $(e).removeClass('active-region focus'); } else{ $(e).addClass('active-region focus').children('a').show(); } $.defaultClickAction(e); } } }
  $.MapHoveredRegion = function(e){ $('#europe').find('.active-region').children('a').hide(); $(e).children('a').show(); $(e).addClass('focus'); }
  $.MapUnHoveredRegion = function(e){ $(e).children('a').hide(); if($(e).hasClass('active-region')==false){ $(e).removeClass('focus'); } }
  var loaderLeft=$('#loader').outerWidth()/-2; var loaderTop=$('#loader').outerHeight()/-2; $('#loader').css({'margin-left':loaderLeft,'margin-top':loaderTop});
// end of the map

});