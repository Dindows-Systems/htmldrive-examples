var sliding 			= 0;
var slideTime 			= '';
var panelHeight 		= 150;
var effectDuration 		= 300;
var idleTime 			= 10000;

// Set is sliding value
function setSliding(a_ISliding){
	sliding = a_ISliding;
}

// Get is sliding value
function getSliding(){
	return sliding;
}

// Carry out accordian styled effect
function accordion() {
		
	var eldown = this.getNext();
	
	//  If element is visible do nothing
	if ($('visible') == this) {
			return false;
	}
	if ($('visible')) {
	
			if( getSliding() == 1 ){
					return false;
			}
		
			var elup = $('visible').getNext();

			setSliding( 1 );
			
			parellelSlide( elup, eldown );
			$('visible').id = '';
			
	}
	else{
			setSliding( 1 );
			singleSlide( eldown );
	}
	
	this.id = 'visible';
}

function getElementsByClassNameFix(tag, className) {
		// This method of populating is used as Safari does use getElementsByClassName()
		var elements = [];
		var safariElements = $A(document.getElementsByTagName(tag));
		safariElements.each(function(safariElements){
			if(!safariElements.className.match(className)) return;
			elements.push(safariElements);
		});
		return elements;
}

// Setup accordian initial state
function init() {
		
		var bodyPanels 			= getElementsByClassNameFix('div', 'panel_body');
		var panels 					= getElementsByClassNameFix('div', 'panel_container');
		var noPanels 				= panels.length;
		var percentageWidth = 100 / noPanels;
		var position 				= 0;
		
		//  Loop through body panels and panels applying required styles and adding event listeners
    for (i = 0; i < bodyPanels.length; i++) {
			bodyPanels[i].style.height = '0px';
			panels[i].style.width = percentageWidth + '%';
			panels[i].style.position = 'absolute';
			panels[i].style.left = position + '%';
			
			$(panels[i].getElementsByTagName('h3')[0]).addEvent('mouseover', accordion);
			$(panels[i].getElementsByTagName('h3')[0]).addEvent('mousemove', accordion);
			$(document.body).addEvent('mousemove', resetIdle);
			
			position += percentageWidth;
    }
		
		if( $('visible') ){
		//  Set panel with id of visible to be initial displayed
			var vis = $('visible').parentNode.id+'-body';
			$(vis).style.height = '150px';
		}
		setIdle();
}

// Next sibling method to work around firefox issues
function getNextSibling(startBrother){
	var endBrother=startBrother.nextSibling;
  while(endBrother.nodeType!=1){
    endBrother = endBrother.nextSibling;
  }
  return endBrother;
}

function parellelSlide( elup, eldown ){
	
	
	myEffects = new Fx.Styles(elup, {duration: effectDuration, transition: Fx.Transitions.linear});
	myEffects.custom({
		 'height': [panelHeight, 0]
	});
	
	
	myEffects1 = new Fx.Styles(eldown, {duration: effectDuration, transition: Fx.Transitions.linear, onComplete: function() { setSliding( 0 ); }});
	myEffects1.custom({
		 'height': [0, panelHeight]
	});
	
}

function singleSlide( eldown ){
	
	myEffects = new Fx.Styles(eldown, {duration: effectDuration, transition: Fx.Transitions.linear, onComplete: function() { setSliding( 0 ); }});
	myEffects.custom({
		 'height': [0, panelHeight]
	});
	
}

function resetTabs(){
	
	var resetEl = $('visible').getNext();
	
	setSliding( 1 );
	
	myEffects = new Fx.Styles(resetEl, {duration: effectDuration, transition: Fx.Transitions.linear, onComplete: function() { setSliding( 0 ); }});
	myEffects.custom({
		 'height': [panelHeight, 0]
	});

	
	$('visible').id = '';
}

function resetIdle(){
		window.clearTimeout( slideTime );
		setIdle()
}

function setIdle(){
	if( $('visible') ){
		slideTime = window.setTimeout( "resetTabs()", idleTime );
	}
}

window.addEvent('load', init);