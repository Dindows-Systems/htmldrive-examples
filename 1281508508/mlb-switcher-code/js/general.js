$(document).ready(function() {

	// function to populate the data for the clicked item
	function fillContent(currentItem, objMLB) {
		$("#thumbs p").html(objMLB.headlineText[currentItem-1]);
		$("#long-desc").html(objMLB.descText[currentItem-1]);
		$("#title a").html(objMLB.headlineText[currentItem-1]);
		$("#title a")[0].href = "#"+currentItem;
		$("#small-caption").html(objMLB.smallCaption[currentItem-1]);
	}

   var sliderWidth = $("#photo").width();
   
   // bind a click event to the thumbnail photos and navigation links
   $("#thumbs a, #navigation ul a").bind("click", function() {
		$("#thumbs ul li a span").remove();
		// get the clicked item from the URL
		var clickedURL = this.href.toString();
		var clickedHash = clickedURL.split("#")[1];
		// a previously existing highlight is removed to prevent duplicates
		$("#thumbs a, #navigation ul a").removeClass("highlight");

		// loop through the navigation links to highlight the clicked one
		$("#navigation ul a").each(function() {
			var navURL = this.href.toString();
			var navHash = navURL.split("#")[1];
			if (clickedHash === navHash) {
				$(this).addClass("highlight");
				$("<span></span>").appendTo("#thumbs ul li a.highlight");
				}
		});
		
		// loop through all thumbnails, highlight the clicked one
		$("#thumbs a").each(function() {
			var thumbsURL = this.href.toString();
			var thumbsHash = thumbsURL.split("#")[1];
			if (clickedHash === thumbsHash) {
				 $(this).addClass("highlight");
				 $("<span></span>").appendTo("#thumbs ul li a.highlight");
				}
			});
		
		// if any of items 2-6 are clicked, animate the margin accordingly
		if (clickedHash > 1) {
		   var marginSetting = sliderWidth*clickedHash-sliderWidth;
		   $("#photo ul").animate({
			  marginLeft: "-"+marginSetting+"px"
			  }, 500, function() {
				  // optional callback after animation completes
				});
		
		// if item 1 is clicked, send the switcher back to the front (0 margin)
		} else {
		   $("#photo ul").animate(
				{
					marginLeft: "0px"
				}, 500, function() {
					// optional callback after animation completes
				}
			);
		}
				   
	fillContent(clickedHash, objMLB);
	return false;
	});

	// create the hover effect on the thumbnails
	$("#thumbs a, #navigation ul a").hover(function() {
		// remove highlight to prevent duplicates
		$("#thumbs ul li a span.hoverlight").remove();
		var mousedURL = this.href.toString();
		var mousedHash = mousedURL.split("#")[1];
		$("<span class='hoverlight'></span>").appendTo("#thumbs ul li:nth-child("+mousedHash+") a");
		}, function() {
			// callback executes after hover complete, so highlight is always ultimately removed
			$("#thumbs ul li a span.hoverlight").remove();
			});
	
	// Fade in the thumbs only when the nav bar is hovered
	// If you want the thumbs always visible, comment out these 5 lines below, and show #thumbs in CSS
	$("#hover-box").hover(function() {
		$("#thumbs").fadeIn(500);
		}, function() {
		$("#thumbs").fadeOut(500);
		});

	// click event for the previous/next buttons
	$(".prev-next").bind("click", function() {
	   var pnItem, activeItem;
	   activeItem = $('#thumbs ul li a.highlight')[0].href.split("#")[1];
	   // make sure the value from the URL is a number, otherwise addition operator won't work
	   activeItem = parseInt(activeItem, 10);
	   // create the previous/next item variable
	   pnItem = 0;
	   // decide the prev/next item based on link ID and active item
	   // this makes sure that "6" is the "previous" item in relation to "1",
	   // and "1" is "next" in relation to "6"
	   if ($(this).attr("id") === "prev") {
		   if (activeItem === 1) {
			   pnItem = 6;   
		   } else {
			   pnItem = activeItem - 1;												   
		   }
		} else {
			if (activeItem === 6) {
				pnItem = 1;
			} else {
				pnItem = activeItem + 1;
			}
		}

		// remove highlight before adding the new one, to avoid duplicates
		$("#thumbs ul li a.highlight span").remove();
		$("#thumbs ul li a, #navigation ul li a").removeClass("highlight");
		$("<span></span>").appendTo("#thumbs ul li:nth-child("+pnItem+") a");
		$("#thumbs ul li:nth-child("+pnItem+") a").addClass("highlight");
		$("#navigation ul li:nth-child("+pnItem+") a").addClass("highlight");

		// calculate the animated margins
		if (pnItem > 1) {
		   var marginSetting = sliderWidth*pnItem-sliderWidth;
		   $("#photo ul").animate(
				{
					marginLeft: "-"+marginSetting+"px"

				}, 500);

	   } else {
		   $("#photo ul").animate(
				{
					marginLeft: "0px"

				}, 500);
	   }
	fillContent(pnItem, objMLB);
	return false;
	});

});