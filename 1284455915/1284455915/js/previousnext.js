(function(a){
    a.fn.previousnext_slideshow=function(p){
        var p=p||{};

        var m=p&&p.slideshow_time_interval?p.slideshow_time_interval:"2000";
        var n=p&&p.slideshow_window_background_color?p.slideshow_window_background_color:"white";
        var o=p&&p.slideshow_window_padding?p.slideshow_window_padding:"5";
        var q=p&&p.slideshow_window_width?p.slideshow_window_width:"400";
        var r=p&&p.slideshow_window_height?p.slideshow_window_height:"400";
        var s=p&&p.slideshow_window_border_size?p.slideshow_window_border_size:"1";
        var t=p&&p.slideshow_window_border_color?p.slideshow_window_border_color:"black";
        var u=p&&p.slideshow_button_style?p.slideshow_button_style:"1";
        var d=p&&p.directory?p.directory:"images";
        o += "px";
        q += "px";
        r += "px";
        s += "px";
        var v;
        var w=0;
        var x=a(this);
        var y=x.find("ul:first").children("li").length;
        if(x.find("ul").length==0||x.find("li").length==0){
            x.append("Require content");
            return null
            }
            x.find("ul:first").children("li").children("a").children("img").css("width",q).css("height",r);
        s_s_ul(x.find("ul:first"),o,q,r,s,t,n);
        s_s_n(x.find(".slideshow_nav"),u,d);
        x.find("ul:first").children("li").hide();
        play();
        x.find(".slideshow_nav").children("li").click(function(){
            if($(this).attr("class")=="slideshow_nav_previous"){
                previous()
                }else if($(this).attr("class")=="slideshow_nav_next"){
                next()
                }
            });
    function previous(){
        if(w==0){
            w=y-2
            }else{
            if(w==1){
                w=y-1
                }else{
                w-=2
                }
            }
        play()
    }
    function next(){
    play()
    }
    function play(){
    clearTimeout(v);
    x.find("ul:first").children("li").fadeOut();
    x.find("ul:first").children("li").eq(w).fadeIn();
    w++;
    if(w>=y){
        w=0
        }
        v=setTimeout(play,m)
    }
    function s_s_ul(a,b,c,d,e,f,g){
    b=parseInt(b);
    c=parseInt(c);
    d=parseInt(d);
    e=parseInt(e);
    var h=c+e*2+b*2;
    var i=d+e*2+b*2;
    x.css("width",h);
    x.css("height",i);
    var j=d+"px";
    var k=c+"px";
    var l="border: "+f+" solid "+" "+e+"px; height:"+j+"; width:"+k+"; padding:"+b+"px; background-color:"+g;
    a.attr("style",l)
    }
    function s_s_n(a,b,d){
    var c=a.children(".slideshow_nav_previous");
    var e=a.children(".slideshow_nav_next");
    switch(b){
        case'1':
            c.css("width","26px");
            c.css("height","26px");
            c.css('background-image','url("'+d+'/style1.gif")');
            e.css("width","26px");
            e.css("height","26px");
            e.css('background-image','url("'+d+'/style1.gif")');
            e.css('background-position','right top');
            e.css('background-repeat','no-repeat');
            break;
        case'2':
            c.css("width","36px");
            c.css("height","39px");
            c.css('background-image','url("'+d+'/style2.gif")');
            e.css("width","36px");
            e.css("height","39px");
            e.css('background-image','url("'+d+'/style2.gif")');
            c.css('background-position','right top');
            c.css('background-repeat','no-repeat');
            break;
        case'3':
            c.css("width","33px");
            c.css("height","30px");
            c.css('background-image','url("'+d+'/style3.gif")');
            e.css("width","33px");
            e.css("height","30px");
            e.css('background-image','url("'+d+'/style3.gif")');
            c.css('background-position','right top');
            c.css('background-repeat','no-repeat');
            break;
        default:
            break
            }
        }
}
})(jQuery);