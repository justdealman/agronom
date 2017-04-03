$(function() {
	var isMobile;
	function detectDevice() {
		if ( Modernizr.mq('(max-width:1110px)') ) {
			isMobile = true;
		} else {
			isMobile = false;
		}
	}
	detectDevice();
	$(window).on('resize', function() {
		detectDevice();
	});
	if ( $('[data-scroll]').length ) {
		function setStart() {
			$('[data-scroll] .animate, .production__complete').each(function() {
				$(this).attr('data-start',$(this).offset().top);
			});
		}
		setStart();
		var productionAnimation = function() {
			if ( !isMobile ) {
				$('[data-scroll] .animate').each(function() {
					var t = $(this);
					var y = $(window).height()/6;
					var diff = ($(document).scrollTop()+y-t.attr('data-start'));
					if ( diff >= 0 ) {
						t.css({
							'-webkit-transform': 'translate('+t.attr('data-x')+'px,'+(diff+(y+parseInt(t.attr('data-y'))))+'px) scale('+(1-t.attr('scale'))+') rotate('+t.attr('data-rotate')+'deg)',
							'transform': 'translate('+t.attr('data-x')+'px,'+(diff+(y+parseInt(t.attr('data-y'))))+'px) scale('+(1-t.attr('scale'))+') rotate('+t.attr('data-rotate')+'deg)'
						}).addClass('complete');
					} else {
						t.css({
							'-webkit-transform': 'translate(0,0) scale(1) rotate(0)',
							'transform': 'translate(0,0) scale(1) rotate(0)'
						}).removeClass('complete');
					}
				});
				$('.production__complete').each(function() {
					var t = $(this);
					var diff = ($(document).scrollTop()+$(window).height()/3)-t.attr('data-start');
					if ( diff >= 0 ) {
						$('[data-scroll] .animate').css({
							'opacity': '0'
						});
						t.css({
							'transform': 'scale(1)'
						});
					} else {
						$('[data-scroll] .animate').css({
							'opacity': '1'
						});
						t.css({
							'transform': 'scale('+t.attr('data-scale')+')'
						});
					}
				});
			} else {
				$('[data-scroll] .animate').css({
					'opacity': '1',
					'-webkit-transform': 'translate(0,0) scale(1) rotate(0)',
					'transform': 'translate(0,0) scale(1) rotate(0)'
				}).removeClass('complete');
				$('.production__complete').css({
					'transform': 'scale(1)'
				});
			}
		}
		$(window).on('resize', function() {
			setStart();
		});
		$(document).on('scroll', _.throttle(productionAnimation, 100));
		$(window).on('resize', productionAnimation);
	}
	$(window).trigger('resize');
	function setImgCover() {
		$('.img-cover').each(function() {
			$(this).parent().css({
				'background': 'url("'+$(this).attr('src')+'") no-repeat center center',
				'background-size': 'cover'
			});
		});
	}
	function setImgContain() {
		$('.img-contain').each(function() {
			$(this).parent().css({
				'background': 'url("'+$(this).attr('src')+'") no-repeat center center',
				'background-size': 'contain'
			});
		});
	}
	setImgCover();
	setImgContain();
	/*$(document).on('scroll', function() {
		var t = $(document).scrollTop();
		var progress;
		var elem = $('.welcome--hero');
		if ( t <= $('.welcome').height() ) {
			progress = t/$('.welcome').height();
		} else {
			progress = 1;
		}
		elem.css({
			'transform': 'translateX(-'+parseInt(elem.attr('data')*progress)+'px)'
		});
	});*/
	$('.welcome--model-ghost').on('wheel', function(e) {
		e.preventDefault();
		if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
			var t = e.originalEvent.deltaY/3;
		} else {
			var t = e.originalEvent.deltaY/100;
		}
		currentAngle = currentAngle+t;
		if ( currentAngle > 35 ) {
			currentAngle = 0;
		}
		if ( currentAngle < 0 ) {
			currentAngle = 35;
		}
		$('.welcome--slider').slider('value',currentAngle);
	});
	var currentAngle = 0;
	function rotate(e) {
		var t = $('.welcome--model-graphic img');
		var n = -e.value*797;
		t.css({
			'transform': 'translateY('+n+'px)',
			'-webkit-transform': 'translateY('+n+'px)'
		});
		var statement = Math.round((e.value/36*4)+0.51);
		var tip = $('.welcome--model-tip[data="'+statement+'"]');
		if ( tip.is(':hidden') ) {
			tip.siblings('[data]').stop(true,true).fadeOut(200);
			tip.stop(true,true).delay(300).fadeIn(200);
			$('.welcome--statements li[data="'+statement+'"]').addClass('active').siblings().removeClass('active');
		}
	}
	$('.welcome--statements li').on('click', function(e) {
		e.preventDefault();
		var v = parseInt($(this).attr('data')*9)-5;
		var counter = currentAngle;
		var steps = (currentAngle-v);
		if ( steps > 0 ) {
			var direction = 'up';
		} else {
			var direction = 'down';
		}
		if ( v !== currentAngle ) {
			currentAngle = v;
			var speed = 500;
			var i = setInterval(function(){
				if ( direction == 'up' ) {
					counter--;
				} else {
					counter++;
				}
				$('.welcome--slider').slider('value',counter);
				if ( counter === v ) {
					clearInterval(i);
				}
			}, speed/Math.abs(steps));
		}
	});
	$('.welcome--slider').slider({
		min: 0,
		max: 35,
		value: 0,
		step: 1,
		slide: function(event, ui) {
			rotate(ui)
			currentAngle = ui.value;
		},
		change: function(event, ui) {
			rotate(ui)
		}
	});
	$('.welcome--model-ghost span').draggable({
		axis: 'x',
		drag: function(event, ui) {
			var v = Math.round(-ui.position.left/20+currentAngle);
			var spins = Math.floor(v/36);
			if ( v > 35 || v<=0 ) {
				v = v-36*spins;
			}
			$('.welcome--slider').slider('value',v);
		},
		stop: function(event, ui) {
			currentAngle = Math.round(-ui.position.left/20)+currentAngle;
			$(this).css({
				'left': 0,
				'top': 0
			});
		}
	});
	$('.reviews__slider').slick({
		dots: true,
		arrows: false,
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [{
			breakpoint: 1110,
			settings: {
				slidesToShow: 1
			}
		}]
	});
	$('input[type="radio"]').uniform();
	function setEfficiency(e) {
		var result = e.find('.calculator--sketch').attr('data-current')*e.find('.calculator--product input:checked').val();
		e.siblings('.calculator__result').find('h5').text(result);
		$('.calculator__result .pic').css({
			'background-position': '0 -'+e.find('.calculator--product input:checked').parents('li').index()*150+'px'
		});
	}
	function setSketchProgress(e) {
		var t = e.find('.calculator--sketch');
		t.find('li').removeClass('highlight');
		for ( var i=0; i<t.attr('data'); i++ ) {
			t.find('li').eq(i).addClass('highlight');
		}
		t.find('li').removeClass('active').eq(t.attr('data')-1).addClass('active');
	}
	if ( $('.calculator__col').length ) {
		$('.calculator__col').each(function() {
			setSketchProgress($(this));
			setEfficiency($(this));
		});
	}
	$('.calculator--sketch li').on('mouseover', function() {
		var t = $(this).parents('.calculator__col');
		t.find('li').removeClass('highlight');
		for ( var i=0; i<=$(this).index(); i++ ) {
			t.find('li').eq(i).addClass('highlight');
		}
		$(this).addClass('active').siblings().removeClass('active');
	});
	$('.calculator--sketch li').on('mouseout', function() {
		var t = $(this).parents('.calculator__col');
		setSketchProgress(t);
		setEfficiency(t);
	});
	$('.calculator--sketch li').on('click', function() {
		var t = $(this).parents('.calculator__col');
		t.find('.calculator--sketch').attr('data',$(this).index()+1).attr('data-current',$(this).attr('data'));
		setEfficiency(t);
	});
	$('.calculator--product input[type="radio"]').change(function() {
		setEfficiency($(this).parents('.calculator__col'));
	});
	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
	$('[data-open]').on('click', function(e) {
		e.preventDefault();
		var t = $('[data-target="'+$(this).attr('data-open')+'"]');
		$('.fade-bg').stop(true,true).fadeIn(300);
		var h = $(window).scrollTop()+($(window).height()-t.outerHeight())/2;
		if ( h < $(window).scrollTop() ) {
			h = $(window).scrollTop();
		}
		t.css({
			'top': h+'px'
		}).stop(true,true).fadeIn(300).siblings('[data-target]').stop(true,true).fadeOut(300);
	});
	$('[data-target] .close, .fade-bg').on('click', function(e) {
		e.preventDefault();
		$('[data-target], .fade-bg').stop(true,true).fadeOut(300);
	});
	$('.menu-open').on('click', function(e) {
		e.preventDefault();
		$('.nav').addClass('opened');
	});
	$('.nav .close, .wrapper, footer').on('click', function() {
		$('.nav').removeClass('opened');
	});
	$('.progress-arrow').on('click', function(e) {
		e.preventDefault();
		$('html,body').stop().animate({
			'scrollTop': parseInt($('.step-4 i').attr('data-start'))-$(window).height()/6
		}, 500);
	});
	$('.modal-video').fancybox({
		openEffect: 'none',
		closeEffect: 'none',
		padding: 10,
		helpers: {
			media: {}
		}
	});
	$('[data-anchor-link]').on('click', function(e) {
		e.preventDefault();
		var diff = $('.header').height();
		var t = $('[data-anchor-target="'+$(this).attr('href')+'"]');
		if ( t.attr('data-diff') !== undefined ) {
			var diff = t.attr('data-diff');
		} else {
			var diff = 0;
		}
		console.log(diff);
		$('html,body').stop().animate({
			scrollTop: t.offset().top-parseInt(diff)
		}, 500);
	});
});
$(function() {
	var hideDelay;
	function removeTip() {
		var t = $('.map--container');
		t.find('.tip').remove();
		t.find('path').removeAttr('data-hover');
	}
	$('.map--container').on('mouseover', 'path', function() {
		var t = $(this);
		var c = $(this).parents('.map--container');
		removeTip();
		var pathLeft = t.position().left;
		var pathTop = t.position().top;
		c.append('<div class="tip">\
			<h5>'+t.attr('data-title')+'</h5>\
			<p><a href="mailto:'+$(this).attr('data-mail')+'">Связаться с менеджером</a></p>\
		<i></i></div>');
		c.find('.tip').css({
			left: (t.offset().left-c.offset().left)+t[0].getBoundingClientRect().width/2,
			top: (t.offset().top-c.offset().top)+t[0].getBoundingClientRect().height/2
		});
		t.attr('data-hover','');
	});
	$('.map--container').on('mouseleave', 'path[data-hover]', function() {
		clearTimeout(hideDelay);
		hideDelay = setTimeout(function() {
			removeTip();
		}, 500);
	});
	$('.map--container').on('mouseenter', '.tip', function() {
		clearTimeout(hideDelay);
	});
	$('.map--container').on('mouseleave', '.tip', function() {
		removeTip();
	});
});