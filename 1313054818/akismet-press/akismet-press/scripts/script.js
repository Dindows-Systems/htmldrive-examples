$(document).ready(function() {
	$('#logo').bind('contextmenu',function(e) {
		// check if right button is clicked
		if(e.button === 2) {
			showPressModal();
			e.preventDefault();
		}
	});
	
	// when clicking on the shadow or on the close button
	$('#shadow, .close').live('click', function() {
		hidePressModal();
	});
	
	// open links with rel="external" in a new window or tab
	$('a[rel="external"]').click( function() {
        window.open( $(this).attr('href') );
        return false;
    });
});

// the modal window html
var logos = '<h2>Looking for our Logo?<span class="close">X</span></h2>';
logos += '<img src="images/oxp-logo.png" alt="Logo Download" />';
logos += '<ul><li><a href="images/oxp-logo.png" rel="external">High Res<span>300 Kb</span></a></li>';
logos += '<li><a href="images/oxp-logo.png" rel="external">Low Res<span>150 Kb</span></a></li></ul>';


function showPressModal() {
	// if no shadow is visible then no modal is displayed
	if($('#shadow').length === 0) {
		$('#banner').append('<div id="logo-modal"></div>');
		$('body').prepend('<div id="shadow"></div>');
		$('#logo-modal').hide();
		$('#shadow').hide();
		if(logos !== undefined) {
			$('#logo-modal').append(logos);
			$('#shadow').fadeIn();
			$('#logo-modal').slideDown();
		}
	}
}

function hidePressModal() {
	$('#shadow').fadeOut(400, function() {
		$(this).remove();
	});
	$('#logo-modal').slideUp(400, function() {
		$(this).remove();
	});
}