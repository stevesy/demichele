const $ = window.jQuery;

const checkScrollArea = function() {
	const scrollTop = $(window).scrollTop();
	$('#site-nav .nav-item').removeClass('current');
	let selectedItem = '';

	$('#site-nav .nav-item').each(function() {
		const anchor = $(this).find('a').attr('href').replace('/','');
		if (scrollTop + 20 > $(anchor).position().top) {
			selectedItem = `a[href="/${anchor}"]`;
		}
	});

	if ($(window).scrollTop() > $('#site-header').height()) {
		$(selectedItem).parent().addClass('current');
	}

	if ($('.nav-item.current').length) {
		$('.current-nav-indicator').css({
			left: $('.nav-item.current span').position().left,
			width: $('.nav-item.current span').width()
		});
	} else {
		$('.current-nav-indicator').css({
			left: $('.nav-item-about span').position().left,
			width: 0
		});
	}
};

const loadParallaxImage = function() {
	$('.parallax').each(function() {
		$(this).css('background-image',`url(${$(this).data('background-image')})`);
	});
};

// smooth scrolling
$('a[href*="#"]:not([href="#"])').on('click tap', function() {
	if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'')
		&& location.hostname === this.hostname) {
		let target = $(this.hash);
		target = target.length ? target : $(`[name=${this.hash.slice(1)}]`);
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

const slideshowSpeed = 7000;
const animationSpeed = 500;
const animationDuration = slideshowSpeed - animationSpeed;
const animateProgressBar = function() {
	$('.progress-bar div').stop().css('width',0).animate({
		width: '100%'
	}, animationDuration);
};

const $slide1Img = $('.slider .slide-1').find('img');
$slide1Img.attr('src',$slide1Img.data('src'));
$slide1Img.load(function() {
	$('.slides').css('opacity',1);
	$('.slider').flexslider({
		animation: 'slide',
		controlNav: false,
		directionNav: false,
		slideshowSpeed,
		animationSpeed,
		start(slider) {
			$(slider).find('img').each(function() {
				if ($(this).data('src')) {
					$(this).attr('src',$(this).data('src'));
				}
			});
			animateProgressBar();
		},
		after() {
			animateProgressBar();
		}
	});
});

$(window).scroll(function() {
	const x = $(this).scrollTop();
	$('.slider img').css('top', `${parseInt(-x / 5,10)}px`);
	$('.progress-bar').css('top', `${parseInt(70 - x,10)}px`);
});

// services modals
$('.modal-trigger').on('click tap', function(e) {
	e.preventDefault();
	$('html, body').animate({
		scrollTop: $('#services').offset().top
	}, 400, 'easeInOutSine');
	$('.modal').fadeOut('150').removeClass('active');
	$(`#${$(this).data('modal-target')}`).fadeIn('150').addClass('active');
});

$('.modal .close').on('click tap', function(e) {
	e.preventDefault();
	$(this).parents('.modal').fadeOut('150').removeClass('active');
});


// featured projects slider
const $featuredProjectsSlider = $('.featured-projects-slider');

$featuredProjectsSlider.flexslider({
	animation: 'fade',
	manualControls: '.featured-projects-nav a',
	slideshow: false,
	selector: '.slides-outer > li',
	prevText: '<span>&#139;</span> <span class="assistive-text">Previous</span>',
	nextText: '<span class="assistive-text">Previous</span> <span>&#155;</span>',
	start(slider) {
		$(slider).find('.flex-active-slide img').each(function() {
			if ($(this).data('src')) {
				$(this).attr('src',$(this).data('src'));
				$(this).removeAttr('data-src');
			}
		});

		$('.featured-projects-nav .flex-active').removeClass('flex-active');

		$('.featured-projects-nav').css('opacity',1);

		$('.featured-projects-nav a').on('click tap', function() {
			const $this = $(this);
			if (!$featuredProjectsSlider.hasClass('open')) {
				$featuredProjectsSlider.slideDown('150').addClass('open');
				$('html, body').animate({
					scrollTop: $featuredProjectsSlider.offset().top - 90
				}, 400, 'easeInOutSine');
				$this.addClass('flex-active');
			}
		});

		$featuredProjectsSlider.find('.close').on('click tap', function(e) {
			e.preventDefault();
			$featuredProjectsSlider.slideUp('150').removeClass('open');
			$('.featured-projects-nav .flex-active').removeClass('flex-active');
			$('html, body').animate({
				scrollTop: $('#projects').offset().top
			}, 400, 'easeInOutSine');
		});
	},
	after(slider) {
		$(slider).find('.flex-active-slide img').each(function() {
			if ($(this).data('src')) {
				$(this).attr('src',$(this).data('src'));
				$(this).removeAttr('data-src');
			}
		});
	}
});

$('.project-image-slider').each(function() {
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


$('.copyright .year').text(new Date().getFullYear());

$(window).load(function() {
	loadParallaxImage();

	$.stellar({
		responsive: true
	});

	let isScrolling = false;
	$(window).scroll(function() {
		isScrolling = true;
	});

	setInterval(function() {
		if (!isScrolling)
			return true;
		isScrolling = false;
		checkScrollArea();
	}, 100);

	$('.current-nav-indicator').css({
		left: $('.nav-item-about span').position().left,
		opacity: 1
	});

	$(window).resize(function() {
		if ($('.nav-item.current').length) {
			$('.current-nav-indicator').css({
				left: $('.nav-item.current span').position().left
			});
		} else {
			$('.current-nav-indicator').css({
				left: $('.nav-item-about span').position().left,
				width: 0
			});
		}
	});
});