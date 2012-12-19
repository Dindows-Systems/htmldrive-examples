// e24TabMenu e24tabmenu.js v0.8, Thu March 21 22:07:12 -0500 2008

// Copyright (c) 2008 equipo24 S.L.N.E. (http://www.equipo24.com)
// 
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
// 
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//

var e24TabMenu = Class.create();
e24TabMenu.prototype = {
	initialize: function( p_eMenu, p_aOptions ) {
	    this.m_tWorking = false;
		this.m_iTransition = p_aOptions.transition ? p_aOptions.transition : Effect.Transitions.sinoidal;
		this.m_fCallBack = p_aOptions.callback ? p_aOptions.callback : undefined;		
		this.m_sMode = Object.isString(p_aOptions.mode) ? p_aOptions.mode : 'uppertabs';
		this.m_iDuration = p_aOptions.duration ? p_aOptions.duration : 1.5;
		this.m_sRel = Object.isString(p_aOptions.rel) ? p_aOptions.rel : 'e24menuitem';
		this.m_eMenu = $( p_eMenu );
		this.m_eMenu.setStyle( { overflow: 'hidden'} );
		
        this.m_aTargets = this.m_eMenu.childElements();						
		
		// loop through all menu anchors. 
		$$('a').each( function (p_eAnchor) {
			var sRel = String( p_eAnchor.getAttribute( 'rel' ) );			
			if ( sRel.toLowerCase().match( this.m_sRel ) ) {

				var sTarget = /^e24menuitem\[(.+)\]$/.exec( sRel.toLowerCase() )[ 1 ];
				eTarget = $(sTarget);
			    if (eTarget) {
				  eTarget.setStyle( { position: 'absolute', zIndex:4, display: 'block' } );
				  eTarget.setStyle( { top: -eTarget.getHeight() + 'px' } );
				}
				p_eAnchor.eTarget = eTarget;
				p_eAnchor.setStyle( { position: 'relative', top: '0px', zIndex:5 } );				
				Event.observe( p_eAnchor, 'click', this._onMenuClick.bindAsEventListener( this, p_eAnchor ) );
				
			}
		}, this);
	},

	_onMenuClick: function( p_eEvent, p_eAnchor ) {
	    p_eEvent.stop();
		this.toggleMenu( p_eAnchor );
	},

	_expandMenu: function( p_eAnchor, p_eTarget, p_fCallBack ) {
		new Effect.Parallel(
			[ 
				new Effect.Move ( p_eTarget, { x: 0, y: 0, transition: this.m_iTransition, mode: 'absolute' } ),
				new Effect.Move ( p_eAnchor, { x: 0, y: p_eTarget.getHeight(), transition: this.m_iTransition, mode: 'absolute' } )
			],
			{ 
				duration: this.m_iDuration, 
				sync: false,
				afterFinish: p_fCallBack 
			}
		);						
	},

	_collapseMenu: function( p_eAnchor, p_eTarget, p_fCallBack ) {
		new Effect.Parallel(
			[ 
				new Effect.Move ( p_eTarget, { x: 0, y: -p_eTarget.getHeight(), transition: this.m_iTransition, mode: 'absolute' } ),
				new Effect.Move ( p_eAnchor, { x: 0, y: 0, transition: this.m_iTransition, mode: 'absolute' } )
			],
			{ 
				duration: this.m_iDuration, 
				sync: false,
				afterFinish: p_fCallBack 
			}
		);						
	},
	
	toggleMenu : function( p_eAnchor ) {
	    if (this.m_tWorking) { return; } else { this.m_tWorking = true; }
		
		eTarget = p_eAnchor.eTarget;
	    if (!eTarget) {
		  return false;
		}
	
		switch(this.m_sMode) {
			case 'uppertabs':
				if (this.m_eCurrent) {
		            if (eTarget != this.m_eCurrent) {
						this._collapseMenu ( this.m_eCurrentAnchor, this.m_eCurrent, 
							function () { 
								this._expandMenu( p_eAnchor, eTarget, this._callBack.bind(this) );
							}.bind( this )				 											 
						);
					}
                    else {
						this._collapseMenu ( this.m_eCurrentAnchor, this.m_eCurrent, this._callBack.bind(this) );
						this.m_eCurrentAnchor = 0;
						this.m_eCurrent = 0;
						return;
					}					
				}	
				else {				    
				    this._expandMenu ( p_eAnchor, eTarget, this._callBack.bind(this) );
				}
			break;						
		}	
		this.m_eCurrentAnchor = p_eAnchor;
		this.m_eCurrent = eTarget;
	},

	_callBack: function( p_oObj ) {
		this.m_tWorking = false;
		if (this.m_fCallBack) {
		  this.m_fCallBack(this, p_oObj);
		}		
	}
}
