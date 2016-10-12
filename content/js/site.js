var isMobile = navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad|android|blackberry|opera mini|iemobile|kindle|silk|mobile)/);

var checkScrollArea = function () {
	var scrollTop = $(window).scrollTop();
	$("#site-nav .nav-item").removeClass("current");
	var selectedItem = '';

	$('#site-nav .nav-item').each(function () {
		var anchor = $(this).find('a').attr('href').replace('/','');
		if (scrollTop + 20 > $(anchor).position().top) {
			selectedItem = 'a[href="/' + anchor + '"]';
		}
	});

	if ($(window).scrollTop() > $('#site-header').height()) {
		$(selectedItem).parent().addClass('current');
	}

	if ($('.nav-item.current').length) {
		$('.current-nav-indicator').css({
			'left': $('.nav-item.current span').position().left,
			'width': $('.nav-item.current span').width()
		});
	} else {
		$('.current-nav-indicator').css({
			'left': $('.nav-item-about span').position().left,
			'width': 0
		});
	}
};

var loadParallaxImage = function () {
	$('.parallax').each(function () {
		$(this).css('background-image','url(' + $(this).data('background-image') + ')');
	});
};

$(function() {

	//== add class to html based on whether device is mobile or not
	if (isMobile) {
		$('html').addClass('mobile');
	} else {
		$('html').addClass('no-mobile');
	}


	//== disable tel links on non-mobilr devices
	$('.no-mobile a[href^="tel:"]').on('click tap', function (e) {
		e.preventDefault();
	});


	//== smooth scrolling

	$('a[href*=#]:not([href=#])').on('click tap', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 800, 'easeInOutSine');
				return false;
			}
		}
	});

	$('#site-title a').on('click tap', function() {
		$('html,body').animate({
			scrollTop: 0
		}, 800, 'easeInOutSine');
		return false;
	});

	$slide1Img = $('.slider .slide-1').find('img');
	$slide1Img.attr('src',$slide1Img.data('src'));
	$slide1Img.removeAttr('data-src');
	$slide1Img.load(function () {
		$('.slides').css('opacity',1);
		$('.slider').flexslider({
			animation: 'slide',
			useCSS: false,
			multipleKeyboard: false,
			controlNav: false,
			directionNav: false,
			slideshowSpeed: 7000,
			animationSpeed: 500,
			start: function (slider) {
				$(slider).find('img').each(function () {
					if ($(this).data('src')) {
						$(this).attr('src',$(this).data('src'));
						$(this).removeAttr('data-src');
					}
				});
				$('.progress-bar div').stop().css('width',0).animate({
					'width': '100%'
				}, this.slideshowSpeed - this.animationSpeed);
			},
			after: function () {
				$('.progress-bar div').stop().css('width',0).animate({
					'width': '100%'
				}, this.slideshowSpeed - this.animationSpeed);
			}
		});
	});

	if (!isMobile) {
		$(window).scroll(function() {
			var x = $(this).scrollTop();
			$('.slider img').css('top', parseInt(-x/5,null) + 'px');
			$('.progress-bar').css('top', parseInt(70-x,null) + 'px');
		});
	}


	//== services modals
	
	$('.modal-trigger').on('click tap', function(e) {
		e.preventDefault();
		$('html, body').animate({
			scrollTop: $('#services').offset().top
		}, 400, 'easeInOutSine');
		$('.modal').fadeOut('150').removeClass('active');
		$('#' + $(this).data('modal-target')).fadeIn('150').addClass('active');
		//$('.modal-overlay').show();
	});

	$('.modal .close').on('click tap', function(e) {
		e.preventDefault();
		$(this).parents('.modal').fadeOut('150').removeClass('active');
 	});


	//== featured projects slider
	
	$('.featured-projects-slider .close').on('click tap', function(e) {
		e.preventDefault();
		$('.featured-projects-slider').slideUp('150').removeClass('open');
		$('.featured-projects-nav .flex-active').removeClass('flex-active');
		$('html, body').animate({
			scrollTop: $('#projects').offset().top
		}, 400, 'easeInOutSine');
	});

	$('.featured-projects-slider').flexslider({
		animation: 'fade',
		useCSS: false,
		multipleKeyboard: false,
		manualControls: '.featured-projects-nav a',
		slideshow: false,
		//smoothHeight: true,
		selector: '.slides-outer > li',
		prevText: '<span>&#139;</span> <span class="assistive-text">Previous</span>',
		nextText: '<span class="assistive-text">Previous</span> <span>&#155;</span>',
		start: function (slider) {
			$(slider).find('.flex-active-slide img').each(function () {
				if ($(this).data('src')) {
					$(this).attr('src',$(this).data('src'));
					$(this).removeAttr('data-src');
				}
			});
		},
		after: function (slider) {
			$(slider).find('.flex-active-slide img').each(function () {
				if ($(this).data('src')) {
					$(this).attr('src',$(this).data('src'));
					$(this).removeAttr('data-src');
				}
			});
		}
	});

	$('.featured-projects-nav .flex-active').removeClass('flex-active');

	$('.project-image-slider').each(function () {
		$(this).flexslider({
			animation: 'fade',
			useCSS: false,
			multipleKeyboard: false,
			slideshow: false,
			controlNav: false,
			selector: '.slides-inner > li',
			prevText: '<span>&#139;</span> <span class="assistive-text">Previous</span>',
			nextText: '<span class="assistive-text">Previous</span> <span>&#155;</span>'
		});
	});

	$('.featured-projects-nav a').on('click tap', function(e) {
		e.preventDefault();
		$this = $(this);
		if (!$('.featured-projects-slider').hasClass('open')) {
			$('.featured-projects-slider').slideDown('150').addClass('open');
			$('html, body').animate({
				scrollTop: $('.featured-projects-slider').offset().top - 90
			}, 400, 'easeInOutSine');
			$this.trigger('click');
			$this.addClass('flex-active');
		}
	});

});

$(window).load(function () {

	loadParallaxImage();

	if (!isMobile) {
		$.stellar({
			responsive: true
		});
	}

	var isScrolling = false;
	$(window).scroll(function () {
		isScrolling = true;
	});

	setInterval(function () {
		if (!isScrolling)
			return true;
		isScrolling = false;
		checkScrollArea();
	}, 100);

	$('.current-nav-indicator').css({
		'left': $('.nav-item-about span').position().left,
		'opacity': 1
	});

	$(window).resize(function () {

		if ($('.nav-item.current').length) {
			$('.current-nav-indicator').css({
				'left': $('.nav-item.current span').position().left
			});
		} else {
			$('.current-nav-indicator').css({
				'left': $('.nav-item-about span').position().left,
				'width': 0
			});
		}

	});

});