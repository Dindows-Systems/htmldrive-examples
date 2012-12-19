$(document).ready(function()
 {
   $(".bloccosingolo").bind("mouseenter",function(){
      $(".frecciablocco:first",this).fadeIn("slow");
    }).bind("mouseleave",function(){
      $(".frecciablocco:first",this).fadeOut("fast");
    });


   $(".icona").bind("mouseenter",function(){
      $(".text_description:first",this).fadeIn("slow");
    }).bind("mouseleave",function(){
      $(".text_description:first",this).fadeOut("fast");
    }).bind("click",function(){
      window.location = $(".page_link:first",this).attr( "href" );
    });

    
});

var scola_show = false;
var move_scola = window.setInterval("moveScola()", 10000); 
var scola_img = "luca";

function moveScola(){
  if (scola_show == true) {
    if (scola_img == "scola")
      scola_img = "luca";
    else
      scola_img = "scola";
    $("#scola img")[0].src = 'http://www.webair.it/images/' + scola_img + '.png';
    $("#riflessoscola img")[0].src = 'http://www.webair.it/images/riflesso-' + scola_img + '.png';
    $("#scola").animate({ 
          left: "0px"
        }, 1500 );
    $("#riflessoscola").fadeIn(3000);
    scola_show = false;
  }
  else {
    $("#scola").animate({ 
          left: "150px"
        }, 1500 );
    $("#riflessoscola").fadeOut(1000);
    scola_show = true;
  }
}