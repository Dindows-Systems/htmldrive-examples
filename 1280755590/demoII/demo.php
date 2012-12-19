<?php

$slides = file('db/slider.db.txt');
$products='';

foreach($slides as $v)
{
	$data = preg_split('/\s*\|\s*/',$v);
	
	$products.='
	
	<div class="product">
	<div class="pic"><img src="'.$data[3].'" width="128" height="128" alt="'.htmlspecialchars($data[0]).'" /></div>
	<div class="title">'.$data[0].'</div>
	
	<div class="price">$'.$data[2].'</div>
		
	<div class="description">'.$data[1].'</div>
	<div class="link"><a href="'.$data[4].'" target="blank">Find out more</a></div>
	<div class="clear"></div>
	</div>
	
	';
}

?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Slick Content Slider | Tutorialzine demo</title>

<link rel="stylesheet" type="text/css" href="demo.css" />

<?=$css?>

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.2/jquery-ui.min.js"></script>
<script type="text/javascript" src="pngFix/jquery.pngFix.js"></script>
<script type="text/javascript" src="mopSlider/mopSlider-2.4.js"></script>

<script type="text/javascript" src="script.js"></script>

</head>

<body>

<div id="main">
	<div class="titles">
	<h1>Notebooks</h1>
    <h2>Fresh on the market</h2>
    </div>
    
	<div class="container">
    
    <div id="slider">
    <?=$products?>
    </div>
    <div class="clear"></div>
    </div>
    
  	<div class="container tutorial-info">
   More script and css style
: <a href="http://www.htmldrive.net/" title="HTML DRIVE - Free DHMTL Scripts,Jquery plugins,Javascript,CSS,CSS3,Html5 Library">www.htmldrive.net </a>
  </div>
</div>

</body>
</html>
