;(function($){

	$.widget("ui.coverflow", {
		init: function() {
			
			var self = this;
			
			this.items = $(this.options.items, this.element).bind("click", function() {
				self.moveTo(this);
				$("div.slider").slider("moveTo", self.current, null, true);
			});
			this.itemWidth = this.items.outerWidth(true);
			
			//THIS IS FOR DEMO PURPOSES ONLY!
			$(document).bind("keydown", function(e) {
					
				if(e.keyCode == 39 && self.items.length > self.current+1) {
						self.moveTo(self.current+1);
						$("div.slider").slider("moveTo", self.current, null, true);
				}
				
				if(e.keyCode == 37 && self.current-1 >= 0) {
						self.moveTo(self.current-1);
						$("div.slider").slider("moveTo", self.current, null, true);
				}
						
			});
			
			$("div.slider").slider({
				min: 0,
				max: self.items.length-1,
				noKeyboard: true,
				slide: function(e, ui) {
					self.moveTo(ui.value);
				}
			});
			//THIS IS FOR DEMO PURPOSES ONLY!
			
			this.current = 0; //Start item
			
			this.refresh(1, 0, this.current);
			this.element.css("left",
				(-this.current * this.itemWidth/2)
				+ (this.element.parent()[0].offsetWidth/2 - this.itemWidth/2) //Center the items container
				- (parseInt(this.element.css("paddingLeft")) || 0) //Subtract the padding of the items container
			);
			
		},
		moveTo: function(item) {
			
			this.previous = this.current;
			this.current = !isNaN(parseInt(item)) ? parseInt(item) : this.items.index(item);
			if(this.previous == this.current) return false; //Don't animate when clicking on the same item
			
			var self = this, to = Math.abs(self.previous-self.current) <=1 ? self.previous : self.current+(self.previous < self.current ? -1 : 1);
			$.fx.step.coverflow = function(fx) {
				self.refresh(fx.now, to, self.current);
			};
			
			this.element.stop().animate({
				coverflow: 1,
				left: (
					(-this.current * this.itemWidth/2)
					+ (this.element.parent()[0].offsetWidth/2 - this.itemWidth/2) //Center the items container
					- (parseInt(this.element.css("paddingLeft")) || 0) //Subtract the padding of the items container
				)
			}, {
				duration: 1000,
				easing: "easeOutQuint"
			});
			
		},
		refresh: function(state,from,to) {
			
			var self = this, offset = null;
			
			this.items.each(function(i) {
				
				var side = (i == to && from-to < 0 ) ||  i-to > 0 ? "left" : "right";
				var mod = i == to ? (1-state) : ( i == from ? state : 1 );				

				var before = (i > from && i != to);
				
				$(this).css({
					webkitTransform: "matrix(1,"+(mod * (side == "right" ? -0.5 : 0.5))+",0,1,0,0) scale("+(1+((1-mod)*0.5))+")",
					left: (
						(-i * (self.itemWidth/2))
						+ (side == "right"? -self.itemWidth/2 : self.itemWidth/2) * mod //For the space in the middle
					),
					zIndex: self.items.length + (side == "left" ? to-i : i-to)
				});
				
				if(!$.browser.msie)
					$(this).css("opacity", 1 - Math.abs((side == "left" ? to-i : i-to)) / 8);

			});
			
		}
	});
	
	$.extend($.ui.coverflow, {
		defaults: {
			items: "> *"
		}
	});
	
})(jQuery); 