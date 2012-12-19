(function( $ ) {
    $.fn.myrotate = function() {
        var img = this.find("img");
        var imgpos = img.position();
        var x0, y0;
        
        $(window).load(function() {
            img.removeAttr("width"); 
            img.removeAttr("height");

            x0 = imgpos.left + (img.width() / 2);
            y0 = imgpos.top + (img.height() / 2);
        });
        
        
        var x, y, x1, y1, drag = 0;
        
        img.css({
            "cursor": "pointer",
            "position": "relative"
        });
        
        img.mousemove(function(e) {
            x1 = e.pageX;
            y1 = e.pageY;
            x = x1 - x0;
            y = y1 - y0;

            r = 360 - ((180/Math.PI) * Math.atan2(y,x));

            if (drag == 1) {
                img.css("transform","rotate(-"+r+"deg)");
                img.css("-moz-transform","rotate(-"+r+"deg)");
                img.css("-webkit-transform","rotate(-"+r+"deg)");
                img.css("-o-transform","rotate(-"+r+"deg)");
            }
        });
        
        img.mousedown(function() {
            if (drag == 0) {
                drag = 1;
                img.css("-webkit-box-shadow", "0 0 5px #999");
                img.css("-moz-box-shadow", "0 0 5px #999");
                img.css("box-shadow", "0 0 5px #999");
            } else {
                drag = 0;
                img.css("-webkit-box-shadow", "0 0 2px #999");
                img.css("-moz-box-shadow", "0 0 2px #999");
                img.css("box-shadow", "0 0 2px #999");
            }
        });
        
        img.mouseleave(function() {
            drag = 0;
        });
    };
})( jQuery );