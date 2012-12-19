/***
 * 
 * jbgallery 2.0 BETA - RC2
 * 
 * $Date: 2010-09-01 09:24:35 +0200 (mer, 01 set 2010) $
 * $Revision: 9 $
 * $Author: massimiliano.balestrieri $
 * $HeadURL: https://jbgallery.googlecode.com/svn/trunk/jbgallery-2.0.js $
 * $Id: jbgallery-2.0.js 9 2010-09-01 07:24:35Z massimiliano.balestrieri $
 * 
 * CHANGELOG:
 * - 01/09/2010 : options bug (metadata). add options.style = "original". commented height resize in webkit. loading dom position.
 * - 23/06/2010 : fixed _fix_dimensions webkit
 * - 22/06/2010 : fixed _centerImage -> docs/style_test.html
 * - 21/06/2010 : MenuSlider - thumbs slider markup 
 * - 21/06/2010 : If you are already on a specific slide, and attempt to access this same slide from a button using the “go” API, safari hangs on the preloading screen. (Sean)
 * - 17/06/2010 : method ready. opacity chromium bug (5.0.375.38 (46659) Ubuntu)
 * - 01/04/2010 : options.webkit -> bug
 * - 16/04/2010 : keys only if data.length > 1, class ie6 
 * @requires jQuery v1.3.2
 * 
 * Copyright (c) 2009 Massimiliano Balestrieri
 * Examples and docs at: http://maxb.net/blog/
 * Licensed GPL licenses:
 * http://www.gnu.org/licenses/gpl.html
 *
 * Inspired by http://www.ringvemedia.com/introduction
 */

//jQuery.noConflict();

;(function($){

jBGallery = {};

jBGallery.Settings = {
    style       : "centered", //centered, zoom, original    
    menu        : 'slider', //false, numbers, simple, slider
    shortcuts   : [37,39],
    slideshow   : false,
    fade        : true,
    popup       : false,
    caption     : true,  //NEW 2.0
    autohide    : false,  //NEW 2.0
    clickable   : false, //NEW 2.0
    current     : 1,     //NEW 2.0 - Peter : http://maxb.net/blog/2009/03/30/jbgallery-10/#comment-12239
    webkit      : (navigator.userAgent.toLowerCase().search(/webkit/) != -1),
    ie6         : (/MSIE 6/i.test(navigator.userAgent)),
    ie7         : (/MSIE 7/i.test(navigator.userAgent)),
    labels      : {
        play : "play",
        next : "next",
        prev : "prev",
        stop : "stop",
        close: "close",
        info : "info"
    },
    timers      : {
        fade        : 400,
        interval    : 7000,
        autohide    : 7000      
    },
    delays      : {
        mousemove   : 200,
        resize      : 500,
        mouseover   : 800
    },
    close       : function(){},
    before      : function(){},
    after       : function(ev){},
    load        : function(ev){},
    ready       : function(){}
};

jBGallery.Init = function(options, data){
    
    if(typeof options == "string"){
            if($(this).data("jbgallery"))
                return $(this).eq(0).data("jbgallery")[options](data);    
    }else{
        return this.each(function(nr){
            if($(this).data("jbgallery"))
                return;

            var _options = new jBGallery.Options(options, this);

            var _data = new jBGallery.Data(this, options);
            if (_data.length == 0) return;

            $(this).data("jbgallery", new jBGallery.Core(this, _data, _options));        
        });
    }    
};

jBGallery.Core = function(el, data, options){

    var that = el;

    //PRIVATE METHODS
    function _unload(){
        $("#jbgallery-css").attr("media","javascript-screen");
        $("html, body").removeClass("jbg").removeClass("ie6");
        
        _engine.target.unbind();
        _engine.target.remove();
        
        $.removeData(that, "jbgallery");
        //$.removeData($('#jbg-caption'), "height");
        $(that).unbind();
        $("#jbg",that).remove();
        
        //elements - loading, menu, slider, caption
        var _elements = ".jbgs-thumb, #jbgs, #jbgs-opacity, #jbgs-top, #jbgs-top-opacity, #jbg-loading, #jbg-caption, #jbg-caption-opacity, #jbg-menu-opacity, #jbg-menu";
        $(_elements).unbind().find("a").unbind();
        $(_elements).remove();

        $(document)
        .unbind('keydown.jbgallery')
        .unbind("mousemove.jbgallery")
        .unbind("click.jbgallery");

        $(window)
        .unbind('resize.jbgallery');
    }
    
    //MAIN
    
    new jBGallery.Interface(that, data, options);

    var _engine = new jBGallery.Engine(that, data, options);
    
    if(data.length > 1)
      new jBGallery.Keys(_engine, options.shortcuts);

    new jBGallery.OnLoadImage(_engine, options);
    
    var _caption = options.caption ? new jBGallery.Caption(that, data, _engine, options) : {};
    
    if (options.menu && data.length > 1) {
        if (jBGallery.MenuSlider && options.menu == 'slider') {
            new jBGallery.MenuSlider(that, _engine, _caption, options);
        } else {
            new jBGallery.MenuSimple(that, _engine, _caption, options);
        }
    }
    
    //events
    $(that).bind("destroy", _unload);
    $(window).bind("unload", _unload);

    $(that).fadeIn(options.timers.fade, function(){
        options.ready();//menuslider - preload images... 
    });
    
    
    
    //API:
    return {
        current: _engine.current,
        play   : _engine.play,
        stop   : _engine.stop,
        go     : _engine.go,
        right  : _engine.right,
        left   : _engine.left,
        destroy: _unload
    };
};

jBGallery.Loading = function(){
    document.getElementsByTagName('html')[0].className = "loading";    
};

jBGallery.Options = function(options, el){
    //OPTIONS
    var _metadata = {};
    var _labels, _timers , _delays = false;
    
    if($.metadata)
        _metadata = $(el).metadata();
    //purtroppo extend sovrascrive i "sotto-oggetti" e non fa il merge
    if (options) {
        if (options.labels) 
            _labels = $.extend(jBGallery.Settings.labels, options.labels);
        if (options.timers) 
            _timers = $.extend(jBGallery.Settings.timers, options.timers);
        if (options.delays) 
            _delays = $.extend(jBGallery.Settings.delays, options.delays);
    }
    
    var _options = $.extend(jBGallery.Settings,_metadata,options);
    
    if(_labels)
        _options.labels = _labels;
    if(_timers)
        _options.timers = _timers;
    if(_delays)
        _options.delays = _delays;


    //current
    var _hash = parseInt(location.hash.replace("#",""),10);
    _options.current = _hash ? (_hash - 1) : _options.current - 1;
    _options.current = _options.current < 0 ? 0 : _options.current;
    
    //fade    
    if(!_options.fade)
        _options.timers.fade = 0;    
    
    //position absolute più sicuro (...ma bug su opera)
    if(_options.popup && _options.style == 'centered')
        _options.style = 'centered modal';
        
    return _options;    
};

jBGallery.Data = function(el, data, options){
    return $.map($(el).find("ul > li"), function(li, i){

        var _a = $("a", li).get(0);
        var _caption = $("div.caption", li).html();

        return {href : _a.href, title: _a.title, caption : _caption};
    });
};


jBGallery.EventTimer = function(el, arr, ms, callback, cancel, debug){
    $.each(arr, function(i,v){
        var _timer = null;
        $(el).bind(v, function(ev) {
            if (debug) console.log("Bind: " + _timer + " " + v);
            if (_timer) {
                if (debug) console.log("Clear: " + _timer + " " + v);
                clearTimeout(_timer);
            }
            _timer = setTimeout(function(){
                if (debug) console.log("Exec: " + _timer + " " + v);
                callback(ev);
            }, ms);
        });
        if(cancel){
            $(el).bind(cancel, function(ev) {
                if(_timer)clearTimeout(_timer);
            });
        }
    });
};

jBGallery.AutoToggle = function(menu, options, effects){

    function _on(){
        _set_interval();
        _toggle_menu(effects[0])
    }
    function _off(){
        _toggle_menu(effects[1]);
    }
    function _toggle_menu(method){
        $(menu).each(function(){
            if($(this).css("visibility") !== "hidden")
                $(this)[method](options.timers.fade);
        });
    }
    function _set_interval(){
        if(_interval){
            clearInterval(_interval);
            _interval = false;
        }
        _interval = setInterval(_off, options.timers.autohide);
    }
    var _interval = false;
    var _timer = false;
    if(!effects)
        effects = ["slideDown","slideUp"];
    
    //new jBGallery.EventTimer(document, ["mousemove.jbgallery", "click.jbgallery"], options.delays.mousemove, _on);
    //new jBGallery.EventTimer(document, ["mousemove.jbgallery", "click.jbgallery"], options.timers.autohide , _off);
    $(document)
    .bind("click.jbgallery", _on)
    .bind("mousemove.jbgallery", function(){
        if(_timer){
            clearTimeout(_timer);
            _timer = false;
        }
        _timer = setTimeout(_on, options.delays.mousemove);
    });
    _set_interval();
    
};

jBGallery.Interface = function(el, data, options){
    var _image = '<img style="visibility:hidden" class="' + options.style + '" id="jbgallery-target" alt="' + data[options.current].title + '" src="' + data[options.current].href + '" />';
    var _html = '<div id="jbg" class="' + options.style + '"><table cellpadding="0" cellspacing="0"><tr><td>' + _image + '</td></tr></table></div>';
    var _loading = '<div id="jbg-loading"><span class="jbg-loading"></span></div>';
    var _caption = '<div id="jbg-caption-opacity"></div><div id="jbg-caption"></div>';//jBGallery.Caption(data[options.current].title, data[options.current].caption)

    //hide
    $(el).hide().find("ul").hide();
    
    $("#jbgallery-css").attr("media","screen");
    $("html, body").addClass("jbg");
    
    if(options.ie6)
        $("html").addClass("ie6");

    $('body').prepend(_loading);
    
    $(el)
    .prepend(_html)
    .before(_caption);
    //.before(_loading + _caption); // bug - krko Posted 29 August 2010
    
    //first
    var _img = new Image();
    _img.onload = function(){
        $('#jbgallery-target').hide().css("visibility", "").fadeIn(options.timers.fade);
    };
    _img.src = data[options.current].href;
    
};

jBGallery.Engine = function(el, data, options){

    //PRIVATE VARS
    var _current = options.current ? options.current + 1 : 1;//start 1 not 0
    var _slideshow = options.slideshow;//onLoadImage comanda
    var _interval = options.timers.interval;
    var _timer = false;
    //var _timestamp = 0;
    //var _timergo = 1;
    
    var _target  = $('#jbgallery-target');
    var _loading = $("#jbg-loading");
                
    //PRIVATE METHODS
    function _preload(){
        _loading.css("opacity",0.5).show();
    }
    function _load(nr){
        options.before();
        
        _preload();
        _current = nr;
        
        //IE7
        var _pl = new Image();
        _pl.onload = function(){
            _target.fadeOut(options.timers.fade, function(){
                $(this).hide().attr({
                    "src" : data[(_current - 1)].href, 
                    "alt" : data[(_current - 1)].title
                });
            });
        };
        _pl.src = data[(_current - 1)].href;
        
    }
    function _go(nr, ev){
        if(nr > data.length || nr === _current)//Thanks to Sean - http://maxb.net/blog/2010/03/29/jbgallery-2-0/#comment-14965
            return;
        if (_slideshow) {
            if(ev){
                //_timer_go = _timestamp  ? ev.timeStamp - _timestamp : _interval;//_interval;
                //_timestamp = ev.timeStamp;
                //console.log("Elapsed : " + _timer_go + " Interval: " + _interval);
                //if (_interval && ((_interval - 100) > _timer_go)) {
                //console.log("Skip go elapsed only : " + _timer_go + " Interval: " + _interval);
                _load(nr);
            }else{
                clearTimeout(_timer);
                _load(nr);//no event -> next, prev
            }
        } else {
            _load(nr);
        }    
        
    }
    function _right(ev){
        if(_current < data.length){
            var _goto = _current + 1;
        }else{
            var _goto = 1;
        }
        _go(_goto, ev);
    }
    function _left(){
        if(_current > 1){
            var _goto = _current - 1;
        }else{
            var _goto = data.length;
        }
        _go(_goto);
    }
    function _play(){
        if(_slideshow)
            return;

        _slideshow = true;
        
        _right(_interval);//???
    }
    function _stop(){
        _slideshow = false;
        clearTimeout(_timer);
    }
    function _timeout(ev){
        _timer = setTimeout(function(){
            _right(ev);
        }, _interval);
    }
    //MAIN    
    
    //API
    return {
        current      : function(){
            return _current;
        },
        slideshow    : function(){
            return _slideshow;
        },
        length         : data.length,
        play         : _play,
        stop         : _stop,
        go           : _go,
        right        : _right,
        left         : _left,
        target       : _target,
        loading      : _loading,
        timeout      : _timeout
    };
};

jBGallery.OnLoadImage = function(engine, options){

    //PRIVATE METHODS
    function _onload(ev){
        engine.loading.hide();
        engine.target.fadeIn(options.timers.fade);
    }

    //MAIN    
    if(options.ie6 || options.webkit || options.style == "centered" || options.style == "centered modal"){// 
        if(options.style !== "original")
          new jBGallery.Fix(engine.target, options);
    }
    
    //events
    if (options.clickable) {
        engine.target
        .click(function(){
            engine.right();
            return false;
        })
        .css({
            cursor : "pointer"
        });
    }

    engine.target
    .one("load", function(){
        $('html').removeClass("loading");
    })
    .bind("load",function(ev){
        _onload(ev);
        options.load(ev);
        options.after(ev);
        
        if(engine.slideshow()){
            engine.timeout(ev);
        }
    });    
    
};


jBGallery.Fix = function(target, options){
    
    //PRIVATE METHODS:
    function _get_dimensions(){
        var _bw = $("body").width();
        var _bh = $("body").height();
        var _pm = _bw / _bh;
        //IE sucks - 22/06/2010
        //var p = target.get(0).width / target.get(0).height;
        //return {bw : bw, bh : bh, pm : pm, p : p, h : target.get(0).height, w : target.get(0).width};
        var _img = new Image();
        _img.src = target.attr("src");
        var _p = _img.width / _img.height;
        var _ret = {bw : _bw, bh : _bh, pm : _pm, p : _p, h : _img.height, w : _img.width};
        _img = null;
        
        return _ret;
    }
    function _fix(ev){
        if(options.style == "centered" || options.style == "centered modal"){
            _centerImage(ev);
        }else if (options.webkit) {
            _fix_dimensions(ev);
        } else if (options.ie6) {
            target.height("auto").width("auto");
            setTimeout(_fix_dimensions, 10);
        }
    }
    function _centerImage(ev){
        target.width("auto").height("auto");
        var _dim = _get_dimensions();
        if(_dim.bw < _dim.bh){
            var _ih = _dim.h * _dim.bw / _dim.w;
            if(_ih > _dim.bh){
                var _iw = _dim.w * _dim.bh / _dim.h;
                target.width(_iw);
            }else{
                target.width(_dim.bw);
            }
        }else{
            var _iw = _dim.w * _dim.bh / _dim.h;
            if(_iw > _dim.bw){
                var _ih = _dim.h * _dim.bw / _dim.w;
                target.height(_ih);
            }else{
                target.height(_dim.bh);
            }
        }   
    }
    function _fix_dimensions(ev){
        var _dim = _get_dimensions();
        if (options.ie6) {
            if (_dim.h < _dim.bh || _dim.w < _dim.bw) {
                if (_dim.p == 1) {//immagine 1x1 -> monitor
                    if (_dim.pm > 1) {
                        target.width(_dim.bw);
                    } else {
                        target.height(_dim.bh);
                    }
                } else if (_dim.p < 1) {//immagine alta -> larghezza
                    target.width(_dim.bw);
                } else if (_dim.p > 1) {//immagine larga -> altezza
                    target.height(_dim.bh);
                }
            }
        } else {//webkit
            target.width("auto").height("auto");//23/06/2010
            if (_dim.h < _dim.bh) {
                //target.height(_dim.bh);//BUG fixed
                if (_dim.w <= _dim.h) {//portrait
                    target.width(_dim.bw).height(_dim.h * _dim.bw / _dim.w);
                }else{
                    //target.height(_dim.bh).width(_dim.w * _dim.bh / _dim.h); //BUG - Steffen Posted 6 July 2010 - test_style.html : 300x200 (style zoom - webkit)
                }
            }
        }
    }

    //MAIN
    //events
    jBGallery.EventTimer(window, ["resize.jbgallery"], options.delays.resize, _fix);
    
    target.bind('load',function(ev){
        _fix(ev);
    });
    
    
};

jBGallery.Keys = function(engine, shortcuts){
    function _onkeydown(e){
        var _keycode = e.which || e.keyCode;
        switch(_keycode){
            case shortcuts[0]:
                engine.left();
                return false;
            break;
            case shortcuts[1]:
                engine.right();
               return false;
            break;
            case 37:
            case 38:
            case 39:
            case 40:
                return false;
            break;
        }
    }
    $(document).bind("keydown.jbgallery", _onkeydown);
};

jBGallery.Caption = function(el, data, engine, options){
    
    function _resize(){
        if (_caption.html() && (_caption.is(":visible") && _caption.css("visibility") == "visible")) {
            var _h = _max_caption();
            _bg.css({height : _h + 10 });
            _caption.css({height : _h});
        }
    }
    function _max_caption(){
        var _h = _caption.height();
        var _sv = $('body').height() - 150;
        return Math.min(385, _sv, _h);
    }
    function _visibility_on(h){
        _bg.hide().css({
            visibility: "visible",
            height: h + 10
        }).fadeIn(options.timers.fade, function(){
           _bg.css("opacity",0.8);// -- chromium issue (5.0.375.38 (46659) Ubuntu)
           _caption.hide().css({
                visibility: "visible",
                height: h
            }).fadeIn(options.timers.fade);
        });
    }
    function _toggle(){
        if (_caption.html()) {
            //visibilita nascosta
            if (_caption.css("visibility") == "hidden") { 
                var _h = _max_caption();
                _visibility_on(_h);
            } else {
                if (!_caption.is(":visible")) {
                    _containers.fadeIn(options.timers.fade, function(){
                        _bg.css("opacity",0.8);// -- chromium issue (5.0.375.38 (46659) Ubuntu)
                    });
                }
                else {
                    _containers.fadeOut(options.timers.fade);
                }
            }
        }
    }
    function _wrap_caption(){
        var _current = engine.current();
        var _html = '';
        if(data[_current - 1].title)
            _html += '<h3>' + data[_current - 1].title + '</h3>';
        if(data[_current - 1].caption)
            _html += '<div>' + data[_current - 1].caption + '</div>';
        return _html + '';
    }

    
    var _caption = $('#jbg-caption').html(_wrap_caption());
    var _bg = $('#jbg-caption-opacity');
    var _containers = $('#jbg-caption, #jbg-caption-opacity')
    .css({visibility:'hidden'});//22/06 - chromium!!!
    
    
    $('#jbg-caption-opacity');//.css("opacity",0.8); -- chromium issue (5.0.375.38 (46659) Ubuntu)
    
    if(options.autohide){
        jBGallery.AutoToggle(_containers, options);
    }
    engine.target.bind("load", function(){
        var _old_visibility = _caption.css("visibility");//primo avvio
        var _old_display = _caption.is(":visible");
        _containers.css({visibility : "hidden", height: ""});
        var _html = _wrap_caption();
        _caption.html(_html);
        if(_old_visibility == "visible" && _old_display && _html.length > 0){
            var _h = _max_caption();
            _visibility_on(_h);
        }
    });
    jBGallery.EventTimer(window, ['resize.jbgallery'], options.delays.resize, _resize);
    
    return {
        toggle : _toggle
    };
};

jBGallery.MenuSimple = function(el, engine, caption, options){
    
    var that = el;
    
    //PRIVATE METHODS
    function _update_classes(ev){
        var _nr = engine.current();
        _menu.find("a.selected").removeClass("selected");
        _menu.find("a:eq("+ _nr +")").addClass("visited").addClass("selected");
    }
    function _button(css, label, callback){
        var _el = $('<a href="#" class="'+css+'">'+label+'</a>').click(function(){
            callback();
            return false;
        });
        return $("<li></li>").append(_el);
    }
    function _numbers(){
        var _html = '';
        for(var _x = 1; _x <= engine.length; _x++)
            _html += '<li><a href="#">'+_x+'</a></li>';
        return _html;
    }
    function _delegation(ev){
        var _el = ev.target || ev.srcElement;
        if(_el.tagName.toString().toLowerCase() === 'a'){
            var _num = parseInt($(_el).text());
            engine.go(_num);
        }
        return false;
    }
    
    //MAIN
    var _menu = $('<ul id="jbg-menu" />').hide();
    var _containers = "#jbg-menu-opacity, #jbg-menu";
    $('<div id="jbg-menu-opacity" />').hide().appendTo("body");//.css("opacity",0.7); - chromium issue
    
    //NUMBERS
    if(options.menu == 'numbers'){
        _menu
        .append(_numbers())
        .click(_delegation)
        .find("a:eq(" + (engine.current() -1 )+ ")").addClass("selected").addClass("visited");
    }
    //SIMPLE
    if(options.menu == 'simple'){
        _menu
        .append(_button('jbg-play', options.labels.play, engine.play))
        .append(_button('jbg-stop', options.labels.stop, engine.stop));
    }
    
    _menu
    .append(_button('jbg-next', options.labels.next, engine.right))
    .prepend(_button('jbg-prev', options.labels.prev, engine.left))
    .appendTo("body");
    
    if (options.caption) {
        _menu
        .append(_button('jbg-info', options.labels.info, function(){
            caption.toggle();
            return false;
        }));
    }
    
    if(options.popup){
        _menu
        .append(_button('jbg-close', options.labels.close, function(){
            $(that).trigger("destroy");
            options.close()
        }));
    }
    
    if(options.menu == 'numbers')
        engine.target.bind("load", _update_classes);
    
    if(options.autohide)
        jBGallery.AutoToggle($(_containers), options);

    $(_containers).fadeIn(options.timers.fade, function(){
        $('#jbg-menu-opacity').css("opacity",0.7);//chromium issue
    });

};

jBGallery.MenuSlider = function(el, engine, caption, options){
    
    var that = el;
    
    //PRIVATE METHODS
    
    function _click_and_lock(el , func){
        $(el).click(function(){
            var _el = this;
            if($(_el).is(".lock"))
                return;
            $(_el).addClass("lock");
            func(function(){
                $(_el).removeClass("lock")
            });
        });
    }
    function _get_optimal_position(nr){
        nr = nr - 1;
        nr = _get_first_of_last(nr);
        var _left = -(nr * 60) <= 0 ? -(nr * 60) : 0;
        
        return _left;
    }
    function _get_first_of_last(nr){
        var _tot = engine.length;
        var _v = _get_visible();
        return _tot - _v < nr ? _tot - _v : nr;         
    }
    function _focus(nr){
        $(_a)
        .find(".focus").removeClass("focus").css("opacity",'0.7').end()
        .eq((nr - 1)).find("img").addClass("focus").css("opacity",'1');
    }
    function _get_class_thumb(t){
        return t.height >= t.width ? "jbgs-thumb-portrait" : "jbgs-thumb-landscape";
    }
    function _get_optimal_left(t){
        if(t.height >= t.width){
            return 25;
        }else{
            var _v = t.width*100/t.height;
            return (_v - 60)/2;
        }
    }
    function _left(left, callback){
        _an.animate({"left" : left}, function(){
            if(callback) callback();
        });
    }
    function _move_left(callback){
        var _l = _get_left();
        var _v = _get_visible();
        //_l = (_l + 60) > 0 ?  0 : (_l + 60);
        _l = (_l + (60 * _v)) > 0 ?  0 : (_l + (60 * _v));
        _left(_l, callback);
    }
    function _move_right(callback){
        var _l = _get_left();
        var _tot = engine.length;
        var _back = _get_back(_l);
        var _v = _get_visible();
        var _max = (_tot - _v) * 60;
        //console.log(_v)
        if(_tot < _v)
            return;
        _l = ((_back + _v) + _v) > _tot ?  -(_max) : (_l - (60 *_v));//todo
        _left(_l, callback);
    }
    function _is_visible(nr){
        var _l = _get_left();
        var _back = _get_back(_l);
        var _v = _get_visible();
        
        var _first = _get_first_visible(_back, _v);
        var _last = _get_last_visible(_back, _v);

        return (nr >= _first && nr <= _last);
    }
    function _get_last_visible(back, v){
        return back + v;
    }
    function _get_first_visible(back, v){
        return back + 1;
    }
    function _get_left(){
        return parseInt(_an.css("left"),10);
    }
    function _get_visible(){
        var _bw = $("body").width() - 130;
        var _w = (_bw) - (_bw % 60);
        return _w / 60;
    }
    function _get_back(left){
        return Math.abs(left)/ 60;// - 60 (right)
    }
    function _mouseout(ev){
        $(_a).css("margin-top", "");
        $('.jbgs-thumb').fadeOut(options.timers.fade, function(){
            $(this).remove();
        });
    }
    function _delegation(ev){
        var _el = ev.target || ev.srcElement;
        if(_el.tagName.toString().toLowerCase() === 'img'){
            $(_el).parent().parent().css("margin-top", "3px");//21/06 + .parent()
            var _index = $(_a).index($(_el).parent().parent());//21/06 + .parent()
            var _thumb = $(_el).get(0);
            var _img = new Image();
            _img.src = _thumb.src;
                
            var _id = 'jbgs-thumb-'+_index;
            var _l = $(_thumb).parents("li:eq(0)").offset().left;//22/06/2010
            var _class = _get_class_thumb(_img);
            var _m = _l - _get_optimal_left(_img);
            if($("#"+_id).length == 0){
                var _btn = options.ie6 || options.ie7 ? '' : '<div class="jbgs-thumb-btn"><div class="jbgs-thumb-tip" /></div>';
                var _html = '<div style="left:'+_m+'px" class="jbgs-thumb" id="'+_id+'"><img src="'+_thumb.src+'" alt="" class="'+_class+'" />'+_btn+'</div>';
                $(_html).hide().appendTo('body').fadeIn(options.timers.fade);    
            }
        }
    }
    function _resize(){
        var _bw = $("body").width() - 130;
        var _w = (_bw) - (_bw % 60);
        _viewer.width(_w);
    }
    //RC2 - 21/06/2010 - TODO config width/height
    function _get_thumb_position(t){
        return t.height >= t.width ? {top : -((t.height*51/t.width)-51)/2} : {left : -((t.width*51/t.height)-51)/2 }; 
    }
    function _set_thumb_class(t){
        $(t).addClass(_get_class_thumb(t)).css(_get_thumb_position(t));
    }
    //MAIN
    var _bw = $("body").width() - 130;
    var _w = (_bw) - (_bw % 60);
    var _sep = '<span>&nbsp;|&nbsp;</span>';
    var _popup = '<a href="#" id="jbgs-h-close">'+options.labels.close+'</a>';
    var _info = '<a href="#" id="jbgs-h-info">'+options.labels.info+'</a>';
    var _top = '<div id="jbgs-top-opacity"></div><div id="jbgs-top"><div id="jbgs-top-center"><a href="#" class="jbgs-h" id="jbgs-h-prev">&nbsp;</a><a href="#" class="jbgs-h" id="jbgs-h-next">&nbsp;</a></div><div id="jbgs-top-right"></div></div>';
    var _slider = '<div id="jbgs-opacity"></div><div id="jbgs"><div id="jbgs-wrapper"><div id="jbgs-left"><a href="#" id="jbgs-h-play" class="jbgs-h">&nbsp;</a><a href="#" id="jbgs-h-pause" class="jbgs-h">&nbsp;</a><a href="#" id="jbgs-h-left" class="jbgs-h">&nbsp;</a></div><div id="jbgs-viewer" style="width:'+_w+'px"></div><div id="jbgs-right"><a href="#" id="jbgs-h-right" class="jbgs-h">&nbsp;</a></div></div></div>';
    
    $("body")
    .append(_top + _slider);
    
    var _menu = $(that).find("ul").clone();
    _menu.find(".caption").remove().end().attr("id", "jbgs-inner").show().appendTo('#jbgs-viewer');
    
    var _menutop = $('#jbgs-top-right');
    var _viewer = $('#jbgs-viewer');
    var _an = $('#jbgs-inner');
    var _play = $('#jbgs-h-play');
    var _pause = $('#jbgs-h-pause');
    var _a = $('a',_an);
    var _autohide = $('#jbgs-opacity, #jbgs, #jbgs-top-opacity, #jbgs-top');//, #jbg-caption, #jbg-caption-opacity
    
    $('#jbgs-opacity, .jbgs-h, #jbgs-top-opacity').css("opacity",0.8);//#jbg-caption-opacity
    $("img:not(.focus)", _menu).css("opacity",0.7);
    
    //class per le thumbs 21/06/2010 - preload immagini necessario su webkit
    $("img", _menu).each(function(){
        $(this).wrap('<div />');
        if (this.complete) {
            _set_thumb_class(this);
        }else{
            $(this).one("load", function(){
                _set_thumb_class(this); 
            });
        }
    });
    
    if(engine.slideshow())
        _play.hide();
    else    
        _pause.hide();
        
    //events
    if (options.caption) {
        $(_info)
        .click(function(){
            caption.toggle();
            return false;
        })
        .appendTo(_menutop);
    }
    if (options.popup) {
        if($('a',_menutop).length > 0){
            $(_sep).appendTo(_menutop);
        }
        $(_popup)
        .click(function(){
            $(that).trigger("destroy");
            options.close();
        })
        .appendTo(_menutop);
    }
    _click_and_lock('#jbgs-h-left', _move_left);
    _click_and_lock('#jbgs-h-right', _move_right);

    _play.click(function(){
        $(this).hide();
        _pause.show();
        engine.play();
    });    
    _pause.click(function(){
        $(this).hide();
        _play.show();
        engine.stop();
    });
    $('#jbgs-h-prev').click(function(){
        engine.left();
    });
    $('#jbgs-h-next').click(function(){
        engine.right();
    });
    
    
    _a.click(function(){
        var _i = _a.index(this) + 1;
        engine.go(_i);
        return false;
    });

    jBGallery.EventTimer(_an, ['mouseover'], options.delays.mouseover, _delegation, 'mouseout');//, true
    _an.bind("mouseout", _mouseout);//commenta per testare tooltip
            
    engine.target.bind("load", function(){
        var _current = engine.current();
        if(!_is_visible(_current)){
            var _position = _get_optimal_position(_current);
            _left(_position);
        }
        _focus(_current);
    });
    
    jBGallery.EventTimer(window, ['resize.jbgallery'], options.delays.resize, _resize);
    
    if(options.autohide){
        jBGallery.AutoToggle(_autohide, options);
        jBGallery.AutoToggle(".jbgs-thumb", options, ["fadeIn","fadeOut"]);
    }
};

jBGallery.Adapters = {};

$.fn.jbgallery = jBGallery.Init;

})(jQuery);