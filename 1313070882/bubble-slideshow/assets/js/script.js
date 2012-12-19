$(function(){
	var photos = [
		'http://farm6.static.flickr.com/5230/5822520546_dd2b6d7e24_z.jpg',
		'http://farm5.static.flickr.com/4014/4341260799_b466a1dfe4_z.jpg',
		'http://farm6.static.flickr.com/5138/5542165153_86e782382e_z.jpg',
		'http://farm5.static.flickr.com/4040/4305139726_829be74e29_z.jpg',
		'http://farm4.static.flickr.com/3071/5713923079_60f53b383f_z.jpg',
		'http://farm5.static.flickr.com/4108/5047301420_621d8a7912_z.jpg'
	];
	
	var slideshow = $('#slideShow').bubbleSlideshow(photos);

	$(window).load(function(){
		slideshow.autoAdvance(5000);
	});
	
	// Other valid method calls:
	
	// slideshow.showNext();
	// slideshow.showPrev();
	// slideshow.stopAutoAdvance();
});