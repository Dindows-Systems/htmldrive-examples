var $jx= jQuery.noConflict(); 
   $jx(window).scroll(function () { 
//	whichBrs function identify  browser  
if (whichBrs()=='chrome')
{
	$scroll_final=document.body.scrollTop;   /// identify  scroll position in pixels for chorme
}
if (whichBrs()=='Internet Explorer' || whichBrs()=='Firefox' )
{
	$scroll_final=document.documentElement.scrollTop; // identify scroll position for IE and firefox 
}

var toolbarid=document.getElementById('toolbar');
			if ($scroll_final <300)
			{
				toolbarid.style.visibility='hidden';
			}

			if ($scroll_final >300 && $scroll_final <600  )
   			{

				toolbarid.style.opacity='0.20';
				toolbarid.style.filter='alpha(opacity=20)';
				toolbarid.style.visibility='visible';
			}
			
			if ($scroll_final >600 && $scroll_final <1000  )
   			{

				toolbarid.style.opacity='0.40';
				toolbarid.style.filter='alpha(opacity=40)';
				toolbarid.style.visibility='visible';
			}

if ($scroll_final >=1000)
{
	toolbarid.style.opacity='1.00';
	toolbarid.style.filter='alpha(opacity=100)';
	toolbarid.style.visibility='visible';
}

});
var $bt= jQuery.noConflict(); 
var time=0;
      $bt(document).ready(function() {

          $bt("#toolbar").stop(true,true).mouseover(function () {
				if (time==0)
				{
		      $bt(".img_animate").slideToggle("slow");
				time=1;
				}
			 });
          $bt(".img_animate").click(function () {
  				if (time==1)
				{
			  $bt(".img_animate").slideToggle("slow");
			  time=0;
				}
			 });

      });

   $bt(document).bind('click', function(e){
                var $clicked = $bt(e.target);
                if (!($clicked.is('.img_animate') || $clicked.parents().is('.img_animate'))) {

				      $bt(".img_animate").stop(true, true);


						time=0;
				      $bt(".img_animate").hide();
                }	
                else {
                }
            });


function whichBrs() {
var agt=navigator.userAgent.toLowerCase();
if (agt.indexOf("opera") != -1) return 'Opera';
if (agt.indexOf("staroffice") != -1) return 'Star Office';
if (agt.indexOf("webtv") != -1) return 'WebTV';
if (agt.indexOf("beonex") != -1) return 'Beonex';
if (agt.indexOf("chimera") != -1) return 'Chimera';
if (agt.indexOf("netpositive") != -1) return 'NetPositive';
if (agt.indexOf("phoenix") != -1) return 'Phoenix';
if (agt.indexOf("firefox") != -1) return 'Firefox';
if (agt.indexOf("chrome") != -1) return 'chrome';
if (agt.indexOf("safari") != -1) return 'Safari';
if (agt.indexOf("skipstone") != -1) return 'SkipStone';
if (agt.indexOf("msie") != -1) return 'Internet Explorer';
if (agt.indexOf("netscape") != -1) return 'Netscape';
if (agt.indexOf("mozilla/5.0") != -1) return 'Mozilla';
if (agt.indexOf('\/') != -1) {
if (agt.substr(0,agt.indexOf('\/')) != 'mozilla') {
return navigator.userAgent.substr(0,agt.indexOf('\/'));}
else return 'Netscape';} else if (agt.indexOf(' ') != -1)
return navigator.userAgent.substr(0,agt.indexOf(' '));
else return navigator.userAgent;
}
