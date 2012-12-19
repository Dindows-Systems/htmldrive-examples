/**
 * jQuery (a)Sexy images plugin
 *
 * Copyright (c) 2009 Anton Shevchuk
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * @author 	Anton Shevchuk AntonShevchuk@gmail.com
 * @version 0.0.4
 */
;(function($) {
    defaults  = {
        width:320,
        height:240,
        left:0, // can be 'center'
        top:0,  // can be 'center'
        zoom:true,
        opacity:0.8, // from 0.0 to 1.0
        func:"snake", // snake, zigzag, vertical, horizontal, linear, x  
        speed:500, // only in ms
        round:"auto"  // auto is equal 1/4 of height
    };
    
    /**
     * Create a new instance of sexy images.
     *
     * @classDescription	This class creates a wrapper for every images and manipulate it
     *
     * @return {Object}	Returns a object.
     * @constructor	
     */
    $.fn.asexy = function(settings) {

        var _sexy = this;
        
        // Now initialize the configuration
        this.options = $.extend({}, defaults, settings);
        
        // Check round value
        if (this.options.round == 'auto') {
            this.options.round = Math.round(this.options.round/4);
        }
        
        /**
         * Construct
         */
        this.each(function(){
            var $img = $(this);
            
            // need wait for load image
            $img.load(function(){
                
                if ($img.data('asexy')) {
                    return true;
                } else {
                    $img.data('asexy', true);
                }
                
                $img.removeAttr("width")
                    .removeAttr("height")
                    .css({ width: "", height: "" });
                
                var $div = $img.wrap('<div class="asexy"></div>').parent();
       
                /* Image size */
                var imgWidth  = $img.width();
                var imgHeight = $img.height();
                
                /* Zoom */
                if (_sexy.options.zoom) {
                    var kWidth  = _sexy.options.width /imgWidth;
                    var kHeight = _sexy.options.height/imgHeight;
                    
                    var kImg    = (kWidth>kHeight)?kWidth:kHeight;
                    imgWidth  = kImg*imgWidth;
                    imgHeight = kImg*imgHeight;
                    
                    $img.attr('width',  imgWidth);
                    $img.attr('height', imgHeight);
                }
                /* Build style for DIV */
                /* - reset */ 
                var style = {
                    width:_sexy.options.width,
                    height:_sexy.options.height,
                    position:'relative',
                    overflow:'hidden'
                };
                
                /* - copy style */
                /* @see http://stackoverflow.com/questions/1004475/jquery-css-plugin-that-returns-computed-style-of-element-to-pseudo-clone-that-ele */
                var attr = [ 'margin-top',  'margin-right',  'margin-bottom',  'margin-left',
                             'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
                             'border-top-width','border-right-width','border-bottom-width',
                             'border-left-width','border-top-color','border-right-color',
                             'border-bottom-color','border-left-color','border-top-style',
                             'border-right-style','border-bottom-style','border-left-style',
                             'z-index','float','clear','cursor'];
        
                var len = attr.length;
                for (var i = 0; i < len; i++) 
                    style[attr[i]] = $img.css(attr[i]);

                /* Start position */
                var left = _sexy.options.left;
                var top  = _sexy.options.top;
                
                if (left == 'center') {
                    left = -((imgWidth/2)-(_sexy.options.width/2));
                }
                
                if (top == 'center') {
                    top = -((imgHeight/2)-(_sexy.options.height/2));
                }
                
                /* Change Images Style */
                $img
                    .css({
                        top:top,
                        left:left,
                        padding:0,
                        margin:0,
                        border:0,
                        position:'absolute',
                        opacity:_sexy.options.opacity
                    });
                  
                /* Change Div Style, init data and events */  
                $div
                    .css(style)
                    .data('asexy', {
                        img:{
                            width:imgWidth,
                            height:imgHeight
                            },
                        div:{
                            width:_sexy.options.width,
                            height:_sexy.options.height
                        },
                        def:{
                            top:top,
                            left:left
                        },
                        diff:{
                            width: Math.round(imgWidth  - _sexy.options.width),
                            height:Math.round(imgHeight - _sexy.options.height)
                        }
                    });
                    
                $div.hover(function(){
                   _sexy.go(this);
                }, function() {
                   _sexy.back(this); 
                });
            });//.trigger('load');
            
            
            var src  = $img.attr('src');
                       $img.attr('src', '');
                       $img.attr('src', src);
            
            return this;
        });
                
        /**
         * Run animation
         *
         * @param {DOMElement} el DIV with class "asexy"
         */
        this.go = function(el){
            
            $(el).find('img').fadeTo(_sexy.options.speed/2, 1);
            
            switch (_sexy.options.func) {
                case 'x':
                    _sexy.go.x(el);
                    break;
                case 'vertical':
                    _sexy.go.vertical(el);
                    break;
                case 'horizontal':
                    _sexy.go.horizontal(el);
                    break;
                case 'linear':
                    _sexy.go.linear(el);
                    break;
                case 'zigzag':
                    _sexy.go.zigzag(el);
                    break;
                case 'snake':
                default:
                    _sexy.go.snake(el);
                    break;
            }
            
        };
        
        /**
         * Linear animatation:
         *  horizontal or vertical animation
         *  based on ratio image width (or height) to div width (or height)
         *
         * @param {DOMElement} el DIV with class "asexy"
         */        
        this.go.linear = function(el) {
            
            var $el  = $(el);            
            var $img = $el.find('img');
            var data = $el.data('asexy');
            var left = $img.css('left');
            var top  = $img.css('top');
            
            var speed  = _sexy.options.speed;
            
            /* start animation */
            if ((data.img.width/data.div.width) >= (data.img.height/data.div.height)) {
                /* horizontal */
                $img.animate({left:-data.diff.width},speed);
            } else {
                /* vertical */      
                $img.animate({top:-data.diff.height},speed);
            }
        };
        
        /**
         * Snake animatation:
         *  --> V
         *  V <--
         *  --> V
         *  V -->
         *
         * @param {DOMElement} el DIV with class "asexy"
         */        
        this.go.snake = function(el) {
            
            var $el  = $(el);            
            var $img = $el.find('img');
            var data = $el.data('asexy');
            var left = $img.css('left');
            var top  = $img.css('top');
            
            /* count iterations based on height*/            
            var iter = Math.ceil(data.img.height / data.div.height);
                iter = (iter>1)?iter:2;

            var speed  = _sexy.options.speed;
                
            /* start iterations */
            for (i = 1; i < iter; i++) {
                
                var height = i*data.div.height;
                /*
                console.log('Iteration: '+i);
                console.log('Iteration Height: '+height);
                console.log('Img height: '+data.img.height);
                console.log('Img width: '+data.img.width);
                console.log('Diff height: '+data.diff.height);
                console.log('Diff width: '+data.diff.width);
                */
                
                if (data.diff.width)  {
                    if (i%2==0) {
                        /* <-- */
                        $img.animate({left:0},speed);
                    } else {
                        /* --> */
                        $img.animate({left:-data.diff.width},speed);
                    }
                }
                
                if ((data.diff.height + data.div.height - height) < _sexy.options.round) {
                    // don't start new iteration
                    break;
                }
                
                if (data.diff.height) {
                    if (height > data.diff.height) {
                        vspeed = Math.round(data.div.height/speed*2*(height - data.diff.height));
                        height = data.diff.height;                    
                    } else {
                        vspeed = speed;
                    }
                    $img.animate({top:-height},vspeed);
                }
            }
        };
        
        /**
         * Zigzag animatation:
         *  --->
         *  <---
         *  --->
         *  <---
         *
         * @param {DOMElement} el DIV with class "asexy"
         */        
        this.go.zigzag = function(el) {
            
            var $el  = $(el);            
            var $img = $el.find('img');
            var data = $el.data('asexy');
            var left = $img.css('left');
            var top  = $img.css('top');
            
            /* count iterations based on height */
            var iter = Math.ceil(data.img.height / data.div.height);
                iter = (iter>1)?iter:2;
            
            var speed = _sexy.options.speed;
                
            /* start iterations */
            for (i = 1; i<=iter; i++) {
                
                var height = i*data.div.height;
                
                if (data.diff.width)  {
                    /* --> */
                    $img.animate({left:-data.diff.width},speed);
                }
                
                if ((data.diff.height + data.div.height - height) < _sexy.options.round) {
                    // don't start new iteration
                    break;
                }
                
                if (data.diff.height) {
                    if (height > data.diff.height) {
                        height = data.diff.height;                    
                    }
                    if (i != iter) {
                        $img.animate({top:-height, left:0},speed);
                    }
                }
            }
        };
        
        
        /**
         * Horizontal animatation:
         *  
         * @param {DOMElement} el DIV with class "asexy"
         */        
        this.go.horizontal = function(el) {
            
            var $el  = $(el);            
            var $img = $el.find('img');
            var data = $el.data('asexy');
            var left = $img.css('left');
            var top  = $img.css('top');
            
            var speed = _sexy.options.speed;
            
            $img
                .animate({left:-data.diff.width}, speed)
                .animate({left:0}, speed);
        };
        
        /**
         * Vertical animatation:
         *  
         * @param {DOMElement} el DIV with class "asexy"
         */        
        this.go.vertical = function(el) {
            
            var $el  = $(el);            
            var $img = $el.find('img');
            var data = $el.data('asexy');
            var left = $img.css('left');
            var top  = $img.css('top');
            
            var speed = _sexy.options.speed;
            
            $img
                .animate({top:-data.diff.height}, speed)
                .animate({top:0}, speed);
        };
        
        /**
         * X animatation:
         *  
         * @param {DOMElement} el DIV with class "asexy"
         */        
        this.go.x = function(el) {
            
            var $el  = $(el);            
            var $img = $el.find('img');
            var data = $el.data('asexy');
            var left = $img.css('left');
            var top  = $img.css('top');
            
            var speed = _sexy.options.speed;
            
            $img
                .animate({left:-data.diff.width, top:-data.diff.height}, speed)
                .animate({left:-data.diff.width, top:0                }, speed)                
                .animate({left:0,                top:-data.diff.height}, speed)
                .animate({left:0,                top:0                }, speed);
              
        };
        
        /**
         * Stop animation and back to start
         *
         * @param {DOMElement} el DIV with class "asexy"
         */
        this.back = function(el){
            
            var $el  = $(el);            
            var $img = $el.find('img');
            var data = $el.data('asexy');
            
            $img.stop(true);
            $img
                .animate({
                    top:data.def.top,
                    left:data.def.left
                },_sexy.options.speed)
                .fadeTo(_sexy.options.speed/2, _sexy.options.opacity);
        };

        
        
        return this;
    };
})(jQuery);