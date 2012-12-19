/*
Script: Fx.MorphList.js
	Animates lists of objects with a morphing background.

	License:
		MIT-style license.

	Authors:
		Guillermo Rauch
*/

Fx.MorphList = new Class({   
	
	Implements: [Events, Options],
	
	options: {/*             
		onClick: $empty,
		onMorph: $empty,*/
		bg: {'class': 'background', html: '<div class="inner"></div>', morph: {link: 'cancel'}}		
	},
	
	initialize: function(element, options){
		var self = this;
		this.setOptions(options);
		this.element = $(element);		
		this.items = this.element.getChildren().addEvents({
			mouseenter: function(){ self.morphTo(this); },
			mouseleave: function(){ self.morphTo(self.current); },
			click: function(ev){ self.onClick(ev, this); }
		});       
		this.bg = new Element('li', this.options.bg).inject(this.element).fade('hide');
		this.setCurrent(this.element.getElement('.current'));
	},

	onClick: function(ev, item){
		this.setCurrent(item, true).fireEvent('click', [ev, item]);
	},
	
	setCurrent: function(el, effect){  
		if (el && !this.current){
			this.bg.set('styles', el.getCoordinates(this.element));
			(effect) ? this.bg.fade('in') : this.bg.fade('show');
		}
		if (this.current) this.current.removeClass('current');
		if (el) this.current = el.addClass('current');    
		return this;
	},         
         
	morphTo: function(to){
		if (to){
			var c = to.getCoordinates(this.element);
			delete c['right']; delete c['bottom'];
			this.bg.morph(c);
			this.fireEvent('morph', to);
		}
		return this;
	}

});