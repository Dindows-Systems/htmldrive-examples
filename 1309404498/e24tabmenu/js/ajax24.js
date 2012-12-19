var AJAX24 = Class.create();
AJAX24.prototype = {
	initialize: function() {
		this.m_eFlashFree = $('flashfree');
		this.m_eHeader = $('header');
		this.m_eMainContent = $('maincontent');
		this.m_eoverlay24 = $('overlay24');
		
		this.m_eFlashFree.setStyle({display: 'none', position: 'absolute', left: '660px', top: '-13px'});
		this.m_eHeader.setStyle({display: 'none'});
		this.m_eMainContent.setStyle({display: 'none', opacity: 0.0});
		new Effect.Fade ( this.m_eoverlay24, {duration: 1.2} );
	},

	start: function( ) {
		this.m_oe24Writer = new e24Writer( 'letters', { autostart: false, duration: 1.0, interval: 0.3, callback: this._showContent.bind(this) } );
		this.m_oe24TabMenu = new e24TabMenu( 'menu', { mode: 'uppertabs', duration: 1.0, transition: Effect.Transitions.sinoidal } ); 

		new Effect.BlindDown ( this.m_eHeader, { duration: 1.5, afterFinish: this._afterHeader.bind(this) } );

	},

	_afterHeader: function( ) {
		this.m_oe24Writer.start();
	},
	
	_showContent: function( ) {
		new Effect.Appear ( this.m_eMainContent, { duration: 1.5, from: 0.0, to: 1.0 } );
		new Effect.Grow ( this.m_eFlashFree, { duration: 1.5, direction: 'center', from: 0.0, to: 1.0 } );
	} 		
}
