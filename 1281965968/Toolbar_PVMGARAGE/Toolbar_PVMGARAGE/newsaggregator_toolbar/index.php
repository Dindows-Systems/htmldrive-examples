<?php
    //get the simplepie library
    require_once('simplepie.inc');
    //grab the feeds
    $feed = new SimplePie();
    //our list of RSS
$feed->set_feed_url(array(
    'http://feeds.delicious.com/v2/rss/',
    'http://feeds.feedburner.com/cssglobe/',
    'http://feeds.dzone.com/dzone/frontpage',
    'http://www.good-tutorials.com/tutorials/photoshop.rss',
    'http://www.graphic-design-links.com/rss',
    'http://feeds2.feedburner.com/BestPhotoshopTutorials',
    'http://www.technewsworld.com/perl/syndication/rssfull.pl'
    ));
    //enable caching
    $feed->enable_cache(true);
    //complete path for caching system
    $feed->set_cache_location('cache');
    //set the amount of seconds you want to cache the feed
    $feed->set_cache_duration(1500);
    //init the process
    $feed->init();
    //let simplepie handle the content type (atom, RSS...)
    $feed->handle_content_type();

?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Tech News | A free Aggregator Template | made in PV.M Garage</title>
<link href="style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="js/jquery-1.3.2.min.js"></script>
</head>
<body>
<script type="text/javascript">

$(document).ready(function(){

	function adPostWidth() {
		
		var ovWid = $('#header').width(); /*We use the header width with min-height of 700px in the style*/
		var postN = Math.floor(ovWid / 250);
		var widFix = Math.floor(ovWid / postN);
		
		$(".post_cont").css({ 'width' : widFix});

	}
  
  function WidthHead() {
		
		var ovWid = $('#header').width(); /*We use the header width with min-height of 700px in the style*/
		var widFixHead = Math.floor(ovWid / 3);
		
		$(".head_info").css({ 'width' : widFixHead - 2});

	}
	
	adPostWidth();
  WidthHead();	

	$(window).resize(function () {
		adPostWidth();	
    WidthHead();	
	});
	
  //hide toolbar and make visible the 'show' button
	$("span.downarr a").click(function() {
    $("#toolbar").slideToggle("fast");
    $("#toolbarbut").fadeIn("slow");    
  });
  
  //show toolbar and hide the 'show' button
  $("span.showbar a").click(function() {
    $("#toolbar").slideToggle("fast");
    $("#toolbarbut").fadeOut();    
  });
  
  //show tooltip when the mouse is moved over a list element 
  $("ul#social li").hover(function() {
		$(this).find("div").fadeIn("fast").show(); //add 'show()'' for IE
    $(this).mouseleave(function () { //hide tooltip when the mouse moves off of the element
        $(this).find("div").hide();
    });
  });
  
  //don't jump to #id link anchor 
  $(".facebook, .twitter, .delicious, .digg, .rss, .stumble, .menutit, span.downarr a, span.showbar a").click(function() {
   return false;                                         
	});
	
  //show quick menu on click 
	$("span.menu_title a").click(function() {
		if($(".quickmenu").is(':hidden')){ //if quick menu isn't visible 
			$(".quickmenu").fadeIn("fast"); //show menu on click
		}
		else if ($(".quickmenu").is(':visible')) { //if quick menu is visible 
      $(".quickmenu").fadeOut("fast"); //hide menu on click
    }
	});
	
	//hide menu on casual click on the page
	$(document).click(function() {
			$(".quickmenu").fadeOut("fast");
			$(".quickmenu").css({'vivibility': 'hidden'});
	});
	$('.quickmenu').click(function(event) { 
		event.stopPropagation(); //use .stopPropagation() method to avoid the closing of quick menu panel clicking on its elements 
	});

		
});
	
</script>

<div id="toolbarbut"> <!-- hide button -->
  <span class="showbar"><a href="#">show bar</a></span>
</div>

<div id="toolbar"> <!-- toolbar container -->

  <div class="leftside"> <!-- all things in floating left side -->
  <ul id="social">
    <li><a class="rss" href="#"></a><!-- icon -->
      <div id="tiprss" class="tip"><!-- tooltip -->
        <ul>
          <li><a href="#">580 Readers</a></li>
          <li><a href="#"><small>[Subscribe]</small></a></li>
        </ul>  
      </div>
    </li>
    <li><a class="facebook" href="#"></a>
      <div id="tipfacebook" class="tip">
        <ul>
          <li><a href="#">Share Page</a></li>
          <li><a href="#">| Profile</a></li>
        </ul>  
      </div>  
    </li>
    <li><a class="twitter" href="#"></a>
      <div id="tiptwitter" class="tip">
        <ul>
          <li><a href="#">ReTweet</a></li>
          <li><a href="#">| Profile</a></li>
        </ul>  
      </div>
    </li>
    <li><a class="delicious" href="#"></a>
      <div id="tipdelicious" class="tip">
        <ul>
          <li><a href="#">Bookmark</a></li>
          <li><a href="#">| Profile</a></li>
        </ul>  
      </div>
    </li>
    <li><a class="digg" href="#"></a>
      <div id="tipdigg" class="tip">
        <ul>
          <li><a href="#">Digg</a></li>
          <li><a href="#">| Profile</a></li>
        </ul>  
      </div>
    </li>
    <li><a class="stumble" href="#"></a>
      <div id="tipstumble" class="tip">
        <ul>
          <li><a href="#">Stumble</a></li>
          <li><a href="#">| Profile</a></li>
        </ul>  
      </div>
    </li>
  </ul>
  </div>

  <div class="rightside"> <!-- all things in floating right side -->
  <span class="downarr"> <!-- hide button -->
  <a href="#"></a>
  </span>
  <span class="menu_title">
    <a class="menutit" href="#">quick menu</a> <!-- quick menu title -->
  </span>
  <div class="quickmenu">
    <ul> <!-- quick menu list -->
      <li><a href="#">Premium Member</a></li>
      <li><a href="#">Become Author</a></li>
      <li><a href="#">Submit News</a></li>
      <li><a href="#">Send Feedback</a></li>
      <li><a href="#">Contact Us</a></li>
      <li><a href="#">Privacy Policy</a></li>
    </ul> 
  </div>
  </div>

</div>

<div id="header">
  <h1><a href="http://www.pvmgarage.com/downloads/newsaggregator">TechNews</a></h1>
  <div class="menu">
  <ul>
    <li><a href="#">about</a></li>
    <li><a href="#">submit feed</a></li>
    <li><a href="#">help us</a></li>
    <li><a href="#">contact</a></li>
  </ul>
</div>
</div>

<div id="down_head" class="clearfix">
<div class="head_info">
      <h1>Our Goal</h1>
      <p>Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.</p>
</div>
<div class="head_info border_info">
      <h1>RSS Feed</h1>
      <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
</div>
<div class="head_info">
      <h1>You are member</h1>
      <p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
</div>
</div>

<div id="news_container" class="clearfix">

<?php foreach ($feed->get_items(0, 72) as $item): ?>

<div class="post_cont">
      <div class="content">
      <h2><?php echo $item->get_date('j M Y'); ?> | <?php echo $item->get_date('g:i a'); ?></h2>
      <h2><img src="<?php $feed = $item->get_feed(); echo $feed->get_favicon(); ?>" alt="favicon" /><a href="<?php echo $item->get_permalink(); ?>"><?php echo $item->get_title(); ?></a></h2> 
      <span class="visit_link"><a href="<?php echo $item->get_permalink(); ?>">direct link to article</a></span>
      </div>
</div>

<?php endforeach; ?>

</div>

<div id="footer">
  <p><strong>tech News</strong> is a <a href="#">PV.M Garage Product</a>. It's released under Creative Common License also for commercial use.<br />

More script and css style
: <a href="http://www.htmldrive.net/" title="HTML DRIVE - Free DHMTL Scripts,Jquery plugins,Javascript,CSS,CSS3,Html5 Library">www.htmldrive.net </a></p>
</div>


</body>
</html>