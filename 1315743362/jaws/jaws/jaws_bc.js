function Jaws(jsdo) {
	
	
	/* -----------------
	| CONFIG - styling and prefs
	----------------- */
	
	Jaws.config = {
		itemsPerFold: 4,
		goLinkText: 'MORE INFO >',
		animDuration: 600,
		autoRotateSpeed: 4000
	}
	
	
	/* -----------------
	| PREP & CHECKS
	----------------- */
	
	var ie = navigator.appName == 'Microsoft Internet Explorer';
	var thiss = this;
	var problem;
	if (!jsdo || typeof jsdo != 'object' || (!jsdo.jsonFile && (!jsdo.data || typeof jsdo.data != 'object')) || !jsdo.container)
		problem = "Could not start Jaws - required parameters not passed";
	else if ($(jsdo.container).length != 1)
		problem = "Specified container ("+jsdo.container+") not found or matched more than one element";
	this.itemsPerFold = jsdo.itemsPerFold ? jsdo.itemsPerFold : Jaws.config.defaultItemsPerFold;
	
	
	/* -----------------
	| ESTABLISH DATA - either through JSON or direct input via @data param
	----------------- */
	
	if (!problem && jsdo.jsonFile)
		$.ajax({
			url: jsdo.jsonFile,
			async: false,
			dataType: 'json',
			success: function(data) { thiss.data = data; },
			error: function(a, b, c) { problem = "Could not load specified JSON file. Server said:\n\n"+b+' - '+c; }
		});
	else if (!problem)
		this.data = jsdo.data;
		
	if (this.data && this.data.length == 0) problem = "Data object appears to be empty";


	/* -----------------
	| PROBLEM? - log and return if so
	----------------- */
		
	if (problem) { console.log("[] Jaws error: "+problem); return; }
	

	/* -----------------
	| PAD DATA if required (so scrolling always reliable, even if !total items % items per fold)
	----------------- */
	
	var numToAddAsPadders = this.itemsPerFold - (this.data.length % this.itemsPerFold);
	if (this.data.length % this.itemsPerFold != 0) for(var b=0; b<numToAddAsPadders; b++) this.data.push({});
	

	/* -----------------
	| CONTAINER, TITLE & UL
	----------------- */
	
	$(jsdo.container).addClass('jaws_container');
	
	if (jsdo.title)
		$(document.createElement('h4'))
			.text(jsdo.title)
			.appendTo($(jsdo.container));
	
	(this.ul = $(document.createElement('ul')))
		.appendTo($(jsdo.container))
		.addClass('mainList');
	
	
	/* -----------------
	| ITEMS - build items into UL. If an item has a 'moreInfo' property, build that, too, along with 'show more' link
	----------------- */
	
	$.each(this.data, function(key, val) {
		
		var li;
		(li = $(document.createElement('li')))
			.appendTo(thiss.ul);
			
		if (val.title) //else is padder (i.e. empty) LI
			$(document.createElement('a'))
				.html((jsdo.doNumbers ? (key+1)+' - ' : '')+val.title)
				.attr('href', val.moreInfo ? 'javascript:void(0)' : val.url)
				.appendTo(li)
				.hover(function() { $(this).animate({paddingLeft: 8}); }, function() { $(this).animate({paddingLeft: 0}); })
				.click(function() {
					
					if (!val.moreInfo) return; //don't do info panel if nothing set for the item
					
					//li
					(li = $(document.createElement('li')))
						.insertBefore($(this).parent())
						.css('height', thiss.itemsPerFold * thiss.itemHeight)
						.addClass('info');
					
					//bring in info panel
					li.slideDown(Jaws.config.animDuration, function() {
						
						//links bar at bottom
						var infoBottom;
						(infoBottom = $(document.createElement('div')))
							.appendTo(li)
							.fadeIn();
						!ie ? infoBottom.css('top', li.height() - infoBottom.height()) : infoBottom.css('bottom', 0);
	
						//back link (reverses appearance process, inc. reinstating scroll pos)
						$(document.createElement('a'))
							.appendTo(infoBottom)
							.attr('href', 'javascript:void(0)')
							.css('float', 'left')
							.text('< BACK')
							.click(function() {
								$(this).closest('.info').children().fadeOut('', function() {
									thiss.ul.animate({scrollTop: thiss.currScrollTop}, Jaws.config.animDuration);
									$(this).parent().slideUp(Jaws.config.animDuration, function() { $(this).remove(); });
								});
							});
						
						//go link
						$(document.createElement('a'))
							.appendTo(infoBottom)
							.attr('href', val.url)
							.css('float', 'right')
							.text(jsdo.goLinkText ? jsdo.goLinkText : Jaws.config.goLinkText);
							
					});
					
					//more info content element
					$(document.createElement('p'))
						.prependTo(li)
						.text(val.moreInfo ? val.moreInfo.info : '');
						
					if (val.moreInfo.image)
						$(document.createElement('img'))
							.prependTo(li)
							.attr('src', val.moreInfo.image);
					
					//as info panel comes in, adjust scroll pos accordingly
					thiss.currScrollTop = thiss.ul.scrollTop();
					thiss.ul.animate({scrollTop: ($(this).parent().index() * thiss.itemHeight) - thiss.itemHeight}, Jaws.config.animDuration, null, function() {
						li.children().fadeIn();
					});
					
				});
		else
			li.html('&nbsp;');
			
			
	});
	
	this.ul.children('li:odd').addClass('odd');
	
	
	/* -----------------
	| UL HEIGHT - update with computed height of LI times number of items wanted per fold
	----------------- */
	
	this.itemHeight = this.ul.children('li').get(0).offsetHeight;
	this.ul.css('height', (this.itemHeight * this.itemsPerFold) - 1);
	
	
	/* -----------------
	| PAGINATION NAV - build nav block above UL. On click, scroll UL to that fold (if 'more info' LI open at time of click, remove first)
	----------------- */
	
	(this.navUL = $(document.createElement('ul')))
		.prependTo($(jsdo.container))
		.addClass('nav');
		
	var numPages = Math.ceil(this.data.length / this.itemsPerFold);
	for (var j=0; j<numPages+2; j++)
		$(document.createElement('li'))
			.text(j == 0 ? '<' : (j == (numPages + 2) - 1 ? '>' : j))
			.appendTo(this.navUL)
			.hover(function() { $(this).addClass('hover'); }, function() { $(this).removeClass('hover'); })
			.click(function() {
				
				//do nothing if arrow, not number LI clicked
				if ($(this).index() == 0 || $(this).index() == $(this).siblings().length) return;
				
				thiss.navUL.children('.on').removeClass('on');
				$(this).addClass('on');
				
				//on click, scroll pos (closing any open info panel first if req.) (-1 is because first LI is not for index calcs, it's an arrow)
				var newScrollTop = ($(this).index() - 1) * thiss.itemsPerFold * thiss.itemHeight;
				if (thiss.ul.find('li.info').length == 1)
					thiss.ul.find('li.info').fadeOut('', function() {
						$(this).remove();
						thiss.ul.animate({scrollTop: newScrollTop}, Jaws.config.animDuration);
					});
				else
					thiss.ul.animate({scrollTop: newScrollTop}, Jaws.config.animDuration);
					
			});

	//first tab on to start with
	this.navUL.children('li:eq(1)').addClass('on');
	
	//do functionality for bookend links (arrows)
	this.navUL.children(':first, :last').click(function() {
		if ($(this).index() == 0) {
			if (!$(this).next().is('.on')) $(this).siblings('.on').prev().click();
		} else {
			if (!$(this).prev().is('.on')) $(this).siblings('.on').next().click();
		}
	});


	/* -----------------
	| AUTO-ROTATE (if params allow). Interrupt on mouseenter to container
	----------------- */
	
	if (jsdo.autoRotate == undefined || jsdo.autoRotate) {
		
		this.autoInt = setInterval(function() {
			if (thiss.interruptAutoInt) return false;
			var onTab = thiss.navUL.children('.on');
			var nextOn = onTab.index() < onTab.siblings().length - 1 ? onTab.next() : onTab.siblings().eq(1);
			nextOn.click();
		}, Jaws.config.autoRotateSpeed);
		
		$(jsdo.container).hover(function() { thiss.interruptAutoInt = true; }, function() { thiss.interruptAutoInt = false; });
		
	}
	
	
}