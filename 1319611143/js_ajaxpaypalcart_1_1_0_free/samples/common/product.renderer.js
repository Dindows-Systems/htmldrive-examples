/* 
 *  Copyright (c) 2011 DIGICRAFTS. All Right Reserved.
 *  This software is the confidential and proprietary information of
 *  DIGICRAFTS. ("Confidential Information").  You shall not
 *  disclose such Confidential Information and shall use it only in
 *  accordance with the terms of the license agreement you entered into
 *   with DIGICRAFTS.
 * 
 *  http://www.digicrafts.com.hk
 * 
 *  File: newjavascript
 *  Author: tsangwailam
 *  Created: Apr 5, 2011
 */

(function(window){

/**
 * @class ThumbnailRenderer
 * @extends Container
 */
DC.ProductRenderer = {

// Private var
// --------------------------------------------------------------------------------------------

    captionContainer:null,    
    caption:null,
    button:null,
    
    
// Override Protected Methods
// --------------------------------------------------------------------------------------------

    /**
    * @override
    */
    createChildren:function(){        
        
        this._super();        
        
        var self = this;
        
        this.captionContainer = new DC.Container({       
            styles:'caption',
            //background:true,
            width:100
        });
        
        this.caption = new DC.Text({
            text:'caption'
        });
        this.captionContainer.addChild(this.caption);
        
        this.button = new DC.Button({
            text:'buy',
            onClick:function(){
                var e = new DC.Event('buy');
                e.data = self.data;
                self.dispatchEvent(e);
            }
        });
        this.captionContainer.addChild(this.button);
        
    },
    
    /**
    * @override
    */
    createComplete:function(){
        this._super();        
        this.addChild(this.captionContainer);        
    },
    
    /**
    * @override
    */
    setSize:function(w,h){      
      this._super(w,h);      
      this.captionContainer.setSize(this.width,this.height/3);
      this.caption.setSize(this.width);
      this.captionContainer.setXY(0,this.height/3*2);
      this.button.setXY((this.innerWidth-this.button.ui.width())/5*2,this.height/5);
    },
   
// Protected Methods
// --------------------------------------------------------------------------------------------
    
    /**
     * @override
     */
    commitProperties:function(prop,value){
        this._super(prop,value);
        switch(prop){
            case 'data':
                this.caption.setText(value.description);// + ' :' + value.shipping);
                this.button.setText('$' + value.price + ' buy');
                break;
        }
    }    
    
}
window.DC.ProductRenderer = DC.ThumbnailRenderer.extend (DC.ProductRenderer);
    
}(window));
