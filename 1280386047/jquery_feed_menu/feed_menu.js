

function FeedMenu( sLinkSelector, sClass ){
        
    var jqoFeedMenu = $('<span class="feed_menu"><select></select></span>');
    var jqoSelect = jqoFeedMenu.find('select');
    
    if( sClass ){
    	jqoFeedMenu.addClass( sClass );
    }
    
    //feed links
    var defaults = { links: sLinkSelector || 'link[type*=rss],link[type*=atom]' };
    
    /*
    *
    *	Function build	
    *	
    *	@description	
    *
    *	This function builds the feed menu by ripping RSS|Atom feed
    *	content and creating links for those.						
    *							
    */
    this.build = function( mFeedLinks ) {
    	
    	mFeedLinks = mFeedLinks || defaults.links;
    	
    	var oAtom 	= $('<optgroup label="Atom Feeds"></optgroup>');
    	var oRSS 	= $('<optgroup label="RSS Feeds"></optgroup>'); 
    	var oAll    = [];
    	
    	$(mFeedLinks).each(
    		function(){
    			var sFeedType = $(this).is('link[type*=rss]')? "rss" : $(this).is('link[type*=atom]')?"atom":null;
    			var sFeedTitle= $(this).is('link')? "Subscribe to '" + $(this).attr('title') + "'" : $(this).attr('title');
    			
    			var oOption = $('<option></option>')
    					.html( sFeedTitle )
    					.attr('value', $(this).attr('href') )
    					.click(
    						function(){
    							document.location.href = $(this).attr('value');
    							jqoFeedMenu.removeClass('feed_menu_focused');
    						}
    					);
    			
    			if( sFeedType == 'rss' ) {
    				oRSS.append(oOption);
    			} else if ( sFeedType == 'atom' ) {
    				oAtom.append(oOption);
    			}
    			oAll.push(oOption);
    			
    		}
    	);
    	
    	//if there were RSS or Atom feeds found, append them
    	if ( oRSS.find('option').length > 1 ) {
    		if( $.browser.opera){
    			jqoSelect.append( oRSS.find('option') );
    		}else{
    			jqoSelect.append( oRSS );
    		}
    	}	
    	if ( oAtom.find('option').length > 1 ) {
    		if( $.browser.opera){
    			jqoSelect.append( oAtom.find('option') );
    		}else{
    			jqoSelect.append( oAtom );
    		}
    	} else {
    		for( opt in oAll){
    			jqoSelect.append( oAll[opt] );
    		}
    	}
    	
    	//setup the event handlers
    	/*jqoFeedMenu
    		.click(
    			function(){
    				$('.feed_menu select')
    					.not($(this).find('select'))
    					.blur();
    			}
    		);
    		*/
    	jqoSelect
    		.blur( 	function(){ 
    					if( $.browser.msie || $.browser.safari || $.browser.opera ){
    						this.selectedIndex = -1;
    					
    					}
    					jqoFeedMenu.removeClass('open'); 
    				} 
    		)
    		.focus( function(){
    					if( $.browser.msie || $.browser.safari || $.browser.opera ){
    						this.selectedIndex = -1;
    					
    					}
    					jqoFeedMenu.addClass('open'); 
    				} 
    		)
    		.change(
    			function(){
    				if( $.browser.msie || $.browser.safari || $.browser.opera ){
 		   				var i = this.selectedIndex;
 		   				this.selectedIndex = -1;
 		   				if ( i > -1 ) {
 		   					var o = this.options[i];
 		   					this.selectedIndex = -1;
 		   					document.location.href = $(o).attr('value');
 		   				}
    				}
    			}
    		)
    		.get(0).selectedIndex=-1;
    }
    
    /*
    *
    *	Function feedMenu.write	
    *	
    *	@description	
    *
    *	This function takes a $ selector and appends the 
    *	feed menu in that DOM node. If no nodes are found, it
    *	is not written.  If no selector was specified, this
    *	function automatically places the feeds menu as the
    *	last child of the body.
    *	
    *	@param	mTarget	A mixed type variable: string or $ or null	
    *
    */
    this.write = function( mTarget ) {
    	
    	//target for the menu is defaulted to the page body
    	mTarget = mTarget || 'body';
    	
    	//build the feed menu options
    	this.build();
    	
    	//shove the feed menu in the target item
    	$(mTarget).append( jqoFeedMenu );
    	
    }

}
