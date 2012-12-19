var BOOKS = function(){
	var _P = {
		init : function( params ) {
			_P.params = params;
			_P.loadXml();
		},
		params : null,
		data : null,
		loadXml : function() {
			$.ajax({
				type : "GET",
				url : _P.params.xmlPath,
				dataType : "xml",
				success : function( data ) {
					_P.data = data;
					_P.max = _P.params.perView;
					_P.count = $( "book", data ).length;
					_P.preloadBooks();
					_P.browseBooks();
				}
			});
		},
		first : 0,
		max : 0,
		count : 0,
		preloadBooks : function() {
			$( "ul", "#books" ).empty();
			$( "book", _P.data ).each(function( i ) {
				var title = $.trim( $( "title", this ).text() );
				var href = $.trim( $( "href", this ).text() );
				$( "ul", "#books" ).append([
					"<li><a href='",
					href,
					"' class='info'><img src='",
					_P.params.imgPath,
					"/books_info.gif' width='15' height='16' alt='More Info' /></a><a href='",
					href,
					"' class='thumb'><img src='",
					$.trim( $( "image > src", this ).text() ),
					"' width='",
					$( "image", this ).attr( "width" ),
					"' height='",
					$( "image", this ).attr( "height" ),
					"' alt='",
					title,
					"' /></a></li>" ].join( "" ));
				$( "body" ).append([
					"<div class='books_tool_tip' id='books_tool_tip_",
					i,
					"'><div class='books_pointer_left'><!-- books pointer --></div><div class='inner'><p>",
					title,
					" (by <em>",
					$.trim( $( "author", this ).text() ),
					"</em>)",
					"</p><p><img src='",
					_P.params.imgPath,
					"/stars_",
					$.trim( $( "reviews > average_rating", this ).text() ),
					,".gif' width='55' height='12' /> (",
					$.trim( $( "reviews > total", this ).text() ),
					")",
					"</p></div></div>" ].join( "" ));
			});
			$( ".info", "#books" ).hover(function( e ) {
				_P.tooltip.show( e, $( "#books_tool_tip_" + $( "a.info", "#books" ).index( this ) ) );
			}, function( e ) {
				_P.tooltip.hide( e, $( "#books_tool_tip_" + $( "a.info", "#books" ).index( this ) ) );
			});
			$( "#books .prev" ).click(function() {
				_P.browseBooks( "prev" );
				return false;
			});
			$( "#books .next" ).click(function() {
				_P.browseBooks( "next" );
				return false;
			});
		},
		browseBooks : function( browse ) {
			if ( browse == "prev" ) {
				if ( _P.first == _P.count && ( _P.count % _P.max > 0 ) ) {
					_P.first = _P.first - ( ( _P.count % _P.max ) + _P.max );
				} else {
					_P.first = _P.first - ( _P.max * 2 );
				}
			}
			var range = _P.first + _P.max;
			var start = 1;
			if ( range > _P.max ) {
				start = ( ( range - _P.max ) + 1 );
			}
			if ( _P.first == 0 ) {
				$( "#books .prev" ).css( "visibility", "hidden" );
			} else {
				$( "#books .prev" ).css( "visibility", "visible" );
			}
			if ( range < _P.count ) {
				$( "#books .next" ).css( "visibility", "visible" );
			} else if ( range >= _P.count ) {
				range = _P.count;
				$( "#books .next" ).css( "visibility", "hidden" );
			}
			$( "book", _P.data ).each(function( i ) {
				if ( i >= _P.first && i < range ) {
					$( "#books li:eq(" + i + ")" ).fadeIn( "slow" );
				} else {
					$( "#books li:eq(" + i + ")" ).css( "display", "none" );
				}
			});
			_P.first = range;
			$( "#books .showing" ).html([
				"Viewing <strong>",
				start,
				" - ",
				range,
				"</strong> of <strong>",
				_P.count,
				"</strong>" ].join( "" ));
		},
		tooltip : {
			show : function( e, $o ) {
				var v = _P.tooltip.getViewport();
				var pageX = _P.tooltip.getMouseCoord( v, e )[0] + 15;
				var pageY = _P.tooltip.getMouseCoord( v, e )[1];
				$o.find( ".books_pointer_right" ).addClass( "books_pointer_left" ).removeClass( "books_pointer_right" );
				if ( pageX + $o.width() > v.innerWidth + v.pageXOffset ) {
					pageX = pageX - $o.width() - 30;
					$o.find( ".inner" ).addClass( "inner_right" );
					$o.find( ".books_pointer_left" ).addClass( "books_pointer_right" ).removeClass( "books_pointer_left" );
				}
				$o.css( "left", pageX ).css( "top", pageY ).css( "display", "block" );
			},
			hide : function( e, $o ) {
				$o.css( "display", "none" );
			},
			getMouseCoord : function( v, e ) {
				( !e ) ? e = window.event : e = e;
				( e.pageX ) ? v.pageX = e.pageX : v.pageX = e.clientX + v.scrollLeft;
				( e.pageY ) ? v.pageY = e.pageY : v.pageY = e.clientY + v.scrollTop;
				return [ e.pageX, e.pageY ];
			},
			getViewport : function() {
				var viewport = {}
				if ( self.innerHeight ) {
					viewport.pageYOffset = self.pageYOffset;
					viewport.pageXOffset = self.pageXOffset;
					viewport.innerHeight = self.innerHeight;
					viewport.innerWidth = self.innerWidth;
				} else if ( document.documentElement && document.documentElement.clientHeight ) {
					viewport.pageYOffset = document.documentElement.scrollTop;
					viewport.pageXOffset = document.documentElement.scrollLeft;
					viewport.innerHeight = document.documentElement.clientHeight;
					viewport.innerWidth = document.documentElement.clientWidth;
				}
				return viewport;
			}
		}
	};
	return {
		init : function( params ) {
			_P.init( params );
		}
	};
}();