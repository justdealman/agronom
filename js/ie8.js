$(document).ready(function() {
	$('.catalog ul li .picture img, .similar .jcarousel-clip .jcarousel-item .picture img').css({
		'top': '0'
	});
	$('.catalog ul li:nth-child(3n), .description ul.cols li:nth-child(2n)').css({
		'margin-right': '-10px'
	});
});