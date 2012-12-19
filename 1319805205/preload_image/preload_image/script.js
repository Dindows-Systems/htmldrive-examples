$(function(){
	LoadImage();
	$("#load_img").click(function(){
		$("#current_img").remove();
		$('#img_holder').addClass('loadit');
		LoadImage();
	});
	function LoadImage(){
		var img_url = $("#img_url").val();
		if(img_url == ''){
			img_url = "images/wetrepubliccomp7c.png";
		}
		var img = new Image();
		$(img).load(function(){
			$(this).hide();
			$('#img_holder').removeClass('loadit').append(img);
			$(img).fadeIn();
			
		}).attr('src',img_url).attr('id','current_img');
	}
});