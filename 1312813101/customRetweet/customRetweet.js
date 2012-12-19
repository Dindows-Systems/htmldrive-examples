/*
* Copyright (C) 2010 Joel Sutherland
* Licenced under the MIT license
* http://www.gethifi.com/blog/a-jquery-plugin-for-custom-css-styled-retweet-buttons
*
* Available tags for templates:
* General: count, title, url, account, shortURL, allTweetsURL
* Topsy: all(count), influential, contains, topsy_trackback_url (http://code.google.com/p/otterapi/wiki/Resources?tm=6#/stats)
* Bit.ly: url, hash, global_hash, long_url, new_hash (http://code.google.com/p/bitly-api/wiki/ApiDocumentation#/v3/shorten)
*/
(function($) {
	$.fn.customRetweet = function(settings, callback) {
		settings = $.extend({
			// topsy settings
			topsyAPI: 'http://otter.topsy.com/stats.js?url=',
			// bit.ly settings
			shorten: true,
			bitlyLogin: 'customretweet',
			bitlyKey: 'R_be029e1ffd35d52dd502e1495752f0c2',
			bitlyAPI: 'http://api.bit.ly/v3/shorten?format=json&',
			// template values
			url: location.href,
			title: document.title,
			account: 'topsy',
			// templates
			retweetTemplate: 'RT @{{account}} | {{title}} | {{shortURL}}',
			template: 'Number of Tweets: {{count}} | <a href="{{allTweetsURL}}">All Tweets</a> | <a href="{{retweetURL}}">Retweet</a>'
		}, settings);

		// Returns replaced string
		function template(tmpl,data){
			var template = tmpl;
			for(var key in data){
				var rgx = new RegExp('{{' + key + '}}', 'g');
				template = template.replace(rgx, data[key]);
			}
			return template;
		}
		
		// Returns (flattish) object of template vars
		function buildData(twitter,shortener){
			var tmplvars = {};
			
			// Twitter Vars
			if ( twitter !== undefined ){
				tmplvars.count = twitter.all;
				tmplvars.allTweetsURL = twitter.topsy_trackback_url;
			}
			else {
				tmplvars.count = '?';
				tmplvars.allTweetsURL = '#';
			}
			
			// Shortener Vars
			if ( shortener.url !== undefined ){ tmplvars.shortURL = 'http://bit.ly/' + shortener.global_hash; }
			else { tmplvars.shortURL = settings.url }

			tmplvars = $.extend(twitter,shortener,settings,tmplvars);
			tmplvars.retweetURL = 'http://twitter.com/home?status=' + escape(template(settings.retweetTemplate, tmplvars));
			
			return tmplvars;
		}
		
		// Build the button and handle data being empty
		function buildButton( $container, data ){
			$container.append(template(settings.template, buildData(data.twitter,data.shortener)));
		}
		
		// Assemble URLs
		var topsyURL = settings.topsyAPI + settings.url;
		var bitlyURL = settings.bitlyAPI + 'login=' + settings.bitlyLogin + '&apiKey=' + settings.bitlyKey + '&uri=' + settings.url;
	
		
		function bitlyRequest(twitter, $container){
			$.ajax({
				url: bitlyURL,
				dataType: 'jsonp',
				success: function(results){
					buildButton($container, {twitter: twitter, shortener: results.data});
				},
				error: function(){
					buildButton($container, {twitter: twitter});
				}
			});		
		}
		
		return $(this).each(function(){
			var $container = $(this);
			// Topsy request
			$.ajax({
				url: topsyURL,
				dataType: 'jsonp',
				success: function(results){
					if(results.response.errors)
						bitlyRequest(undefined, $container);
					else
						bitlyRequest(results.response, $container);
				},
				error: function(){
					bitlyRequest(undefined, $container);
				}
			});	
		});
	}
})(jQuery);