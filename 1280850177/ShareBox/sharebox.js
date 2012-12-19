        (function($){
            $.fn.sharebox = function(){
                var element = this;

                var i = 10;
                var j = 0;
                $(element).find("li").each(function(){
                    $(this).css("z-index", i)
                    if (j>0)
                        $(this).css("left", j * 24 + 100 + "px");
                    i = i - 1;
                    j = j + 1;
                });
            }
        })(jQuery);
