// e24Writer e24writer.js v0.4.1, Thu March 21 22:07:12 -0500 2008

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

var e24Writer = Class.create();
e24Writer.prototype = {
	initialize: function( p_eContainer, p_aOptions ) {
	    this.m_iCurrent = -1;
		this.m_sDirection = Object.isString(p_aOptions.direction) ? p_aOptions.direction : 'leftright';
		this.m_fCallBack = p_aOptions.callback ? p_aOptions.callback : undefined;
		this.m_bAutoStart = p_aOptions.autostart;
		this.m_iDuration = p_aOptions.duration ? p_aOptions.duration : 1.0;
		this.m_iInterval = p_aOptions.interval ? p_aOptions.interval : 0.3;
		this.m_eContainer = $( p_eContainer );
		this.m_eContainer.setStyle( { overflow: 'hidden'} );
		
        this.m_aLetters = this.m_eContainer.childElements();						
		
		this.m_aLetters.each( function(p_eLetter) {
		  p_eLetter.setStyle( { display: 'none' } );
		});
		
		if (this.m_bAutoStart) {
			setTimeout(this.start.bind(this), this.m_iInterval * 1000);
		}	
	},


	start: function() {
		this.m_iIntervalId = setInterval(this._load.bind(this), this.m_iInterval * 1000);
	},
	
	_load: function( ) {
	    this.m_iCurrent++;
		if (this.m_iCurrent < this.m_aLetters.length - 1) { 
			fCallBack = undefined; 
		} 
		else { 
			fCallBack = this._callBack.bind(this); 
		}
		
		if (this.m_iCurrent < this.m_aLetters.length) {
			p_eLetter = this.m_aLetters[ this.m_iCurrent ];
		}
		else {
			clearInterval(this.m_iIntervalId);
			return;
		}
 		
		new Effect.Parallel(
			[ 
				new Effect.Appear ( p_eLetter, { from: 0, to: 1.0 } )
				
			],
			{ 
				duration: this.m_iDuration, 
				afterFinish: fCallBack 
			}
		);	
	},
	
	_callBack: function( p_oObj ) {
		if (this.m_fCallBack) {
		  this.m_fCallBack(this, p_oObj);
		}
	}
	
}	
