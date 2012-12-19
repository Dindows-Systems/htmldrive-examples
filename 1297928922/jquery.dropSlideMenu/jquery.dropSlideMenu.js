(function($) {
	/*
		jquery.dropSlideMenu.js v1.0
		Last updated: 24 July 2009

		Created by Damien du Toit
		http://coda.co.za/blog/2009/07/24/dropslidemenu

		Licensed under a Creative Commons Attribution-Non-Commercial 3.0 Unported License
		http://creativecommons.org/licenses/by-nc/3.0/
	*/

	$.fn.dropSlideMenu = function(options) {

		$.fn.dropSlideMenu.defaults = {
			indicators: true, // adds a div to the list items for attaching indicators (arrows)
			clickstream: true, // highlights the clickstream in a menu by comparing the links to the current URL path
			openEasing: "easeOutQuad", // open animation effect
			closeEasing: "easeInQuad", // close animation effect
			duration: 600, // speed of drop down animation (in milliseconds)
			delay: 800, // delay before the drop down closes (in milliseconds)
			hideSelects: true // hide all select elements on the page when the menu is active (IE6 only)
		};

		var o = $.extend({}, $.fn.dropSlideMenu.defaults, options);

		return this.each(function() {
			window.container = $(this).children("ul:first");
			window.lists = container.find("ul");
			window.listItems = lists.parent();
			window.timer = null;
			window.count = 1;

			// add class to container
			container.addClass("ds");
			
			// inject float clearer
			var clear = "<div class=\"dsClear\">&nbsp;</div>";
			container.append(clear);

			lists.each(function() {
				// assign unique id, hide list
				$(this).attr("id", "dsList-" + count).css({ display: "none", visibility: "visible" });

				count++;
			});

			count = 1;

			listItems.each(function() {
				var listItem = $(this);
				var list = listItem.children("ul:first");
				var link = listItem.children("a:first");

				// add clickstream if link href found in URL path
				if (o.clickstream) {
					var links = listItem.find("a");
	
					links.each(function() {
						if (window.location.pathname.indexOf($(this).attr("href")) != -1) {
							$(this).parent().addClass("clickstream");
						}
					});
				}

				// wrap indicator markup
				if (o.indicators) {
					link.wrap("<div class=\"indicator\"></div>");
				}

				// assign unique id
				listItem.attr("id", "dsListItem-" + count);
				
				$.event.special.hover.delay = 80;

				listItem.hover(function() {
					if ($(this).hasClass("open")) {
						if (timer) {
							// reset timer
							window.clearTimeout(timer);
							timer = null;
						}
					}
					else {
						// hide all menus
						lists.hide();

						// reset all list item styles
						listItems.removeClass("open").removeClass("active");

						// reset timer
						window.clearTimeout(timer);
						timer = null;

						// open menu
						openList($(this));
					}
				}, 
				function() { 
					timer = setTimeout(function() {
						// close menu
						closeList(list.parent());
					}, o.delay);
		        });

				function openList(li) {
					// hide select elements in IE6
					if (o.hideSelects && $.browser.msie && parseInt($.browser.version) < 7) {
						$("select").css("visibility", "hidden");
					}

					// add style
					li.addClass("open");

					// open menu
					list.show("slide", {duration: o.duration, direction: "up", easing: o.openEasing}, function() {
					});
				}

				function closeList(li) {
					// reset timer
					timer = null;

					// close menu
					list.hide("slide", {duration: o.duration, direction: "up", easing: o.closeEasing}, function() {
						// remove style
						li.removeClass("open");

						// show select elements in IE6
						if (o.hideSelects && $.browser.msie && parseInt($.browser.version) < 7) {
							$("select").css("visibility", "visible");
						}
					});	
				}

				count++;
			});

			// Internet Explorer fix
			if ($.browser.msie) {
				container.find("li ul li a").css({ zoom: 1, verticalAlign: "top" });
			}

			// behaviour for links with empty href's
			$("a[href$='#']", container).css({cursor: "default"}).click(function() { return false; });
		});
	};
})(jQuery);