(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var $ = window.jQuery;

var isMobile = navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad|android|blackberry|opera mini|iemobile|kindle|silk|mobile)/);

if (isMobile) {
	document.documentElement.className += ' mobile';
} else {
	document.documentElement.className += ' no-mobile';
}

var checkScrollArea = function checkScrollArea() {
	var scrollTop = $(window).scrollTop();
	$('#site-nav .nav-item').removeClass('current');
	var selectedItem = '';

	$('#site-nav .nav-item').each(function () {
		var anchor = $(this).find('a').attr('href').replace('/', '');
		if (scrollTop + 20 > $(anchor).position().top) {
			selectedItem = 'a[href="/' + anchor + '"]';
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

var loadParallaxImage = function loadParallaxImage() {
	$('.parallax').each(function () {
		$(this).css('background-image', 'url(' + $(this).data('background-image') + ')');
	});
};

// disable tel links on non-mobilr devices
$('.no-mobile a[href^="tel:"]').on('click tap', function (e) {
	e.preventDefault();
});

// smooth scrolling
$('a[href*="#"]:not([href="#"])').on('click tap', function () {
	if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		if (target.length) {
			$('html,body').animate({
				scrollTop: target.offset().top
			}, 800, 'easeInOutSine');
			return false;
		}
	}
});

$('#site-title a').on('click tap', function () {
	$('html,body').animate({
		scrollTop: 0
	}, 800, 'easeInOutSine');
	return false;
});

var slideshowSpeed = 7000;
var animationSpeed = 500;
var animationDuration = slideshowSpeed - animationSpeed;
var animateProgressBar = function animateProgressBar() {
	$('.progress-bar div').stop().css('width', 0).animate({
		width: '100%'
	}, animationDuration);
};

var $slide1Img = $('.slider .slide-1').find('img');
$slide1Img.attr('src', $slide1Img.data('src'));
$slide1Img.load(function () {
	$('.slides').css('opacity', 1);
	$('.slider').flexslider({
		animation: 'slide',
		controlNav: false,
		directionNav: false,
		slideshowSpeed: slideshowSpeed,
		animationSpeed: animationSpeed,
		start: function start(slider) {
			$(slider).find('img').each(function () {
				if ($(this).data('src')) {
					$(this).attr('src', $(this).data('src'));
				}
			});
			animateProgressBar();
		},
		after: function after() {
			animateProgressBar();
		}
	});
});

$(window).scroll(function () {
	var x = $(this).scrollTop();
	$('.slider img').css('top', parseInt(-x / 5, 10) + 'px');
	$('.progress-bar').css('top', parseInt(70 - x, 10) + 'px');
});

// services modals
$('.modal-trigger').on('click tap', function (e) {
	e.preventDefault();
	$('html, body').animate({
		scrollTop: $('#services').offset().top
	}, 400, 'easeInOutSine');
	$('.modal').fadeOut('150').removeClass('active');
	$('#' + $(this).data('modal-target')).fadeIn('150').addClass('active');
});

$('.modal .close').on('click tap', function (e) {
	e.preventDefault();
	$(this).parents('.modal').fadeOut('150').removeClass('active');
});

// featured projects slider
$('.featured-projects-slider .close').on('click tap', function (e) {
	e.preventDefault();
	$('.featured-projects-slider').slideUp('150').removeClass('open');
	$('.featured-projects-nav .flex-active').removeClass('flex-active');
	$('html, body').animate({
		scrollTop: $('#projects').offset().top
	}, 400, 'easeInOutSine');
});

$('.featured-projects-slider').flexslider({
	animation: 'fade',
	manualControls: '.featured-projects-nav a',
	slideshow: false,
	selector: '.slides-outer > li',
	prevText: '<span>&#139;</span> <span class="assistive-text">Previous</span>',
	nextText: '<span class="assistive-text">Previous</span> <span>&#155;</span>',
	start: function start(slider) {
		$(slider).find('.flex-active-slide img').each(function () {
			if ($(this).data('src')) {
				$(this).attr('src', $(this).data('src'));
				$(this).removeAttr('data-src');
			}
		});
	},
	after: function after(slider) {
		$(slider).find('.flex-active-slide img').each(function () {
			if ($(this).data('src')) {
				$(this).attr('src', $(this).data('src'));
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

$('.featured-projects-nav a').on('click tap', function (e) {
	e.preventDefault();
	var $this = $(this);
	if (!$('.featured-projects-slider').hasClass('open')) {
		$('.featured-projects-slider').slideDown('150').addClass('open');
		$('html, body').animate({
			scrollTop: $('.featured-projects-slider').offset().top - 90
		}, 400, 'easeInOutSine');
		$this.trigger('click');
		$this.addClass('flex-active');
	}
});

$('.copyright .year').text(new Date().getFullYear());

$(window).load(function () {
	loadParallaxImage();

	$.stellar({
		responsive: true
	});

	var isScrolling = false;
	$(window).scroll(function () {
		isScrolling = true;
	});

	setInterval(function () {
		if (!isScrolling) return true;
		isScrolling = false;
		checkScrollArea();
	}, 100);

	$('.current-nav-indicator').css({
		left: $('.nav-item-about span').position().left,
		opacity: 1
	});

	$(window).resize(function () {
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvc2NyaXB0cy9zaXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLElBQUksT0FBTyxNQUFqQjs7QUFFQSxJQUFNLFdBQVcsVUFBVSxTQUFWLENBQW9CLFdBQXBCLEdBQ2YsS0FEZSxDQUNULDhFQURTLENBQWpCOztBQUdBLElBQUksUUFBSixFQUFjO0FBQ2IsVUFBUyxlQUFULENBQXlCLFNBQXpCLElBQXNDLFNBQXRDO0FBQ0EsQ0FGRCxNQUVPO0FBQ04sVUFBUyxlQUFULENBQXlCLFNBQXpCLElBQXNDLFlBQXRDO0FBQ0E7O0FBRUQsSUFBTSxrQkFBa0IsU0FBbEIsZUFBa0IsR0FBVztBQUNsQyxLQUFNLFlBQVksRUFBRSxNQUFGLEVBQVUsU0FBVixFQUFsQjtBQUNBLEdBQUUscUJBQUYsRUFBeUIsV0FBekIsQ0FBcUMsU0FBckM7QUFDQSxLQUFJLGVBQWUsRUFBbkI7O0FBRUEsR0FBRSxxQkFBRixFQUF5QixJQUF6QixDQUE4QixZQUFXO0FBQ3hDLE1BQU0sU0FBUyxFQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsR0FBYixFQUFrQixJQUFsQixDQUF1QixNQUF2QixFQUErQixPQUEvQixDQUF1QyxHQUF2QyxFQUEyQyxFQUEzQyxDQUFmO0FBQ0EsTUFBSSxZQUFZLEVBQVosR0FBaUIsRUFBRSxNQUFGLEVBQVUsUUFBVixHQUFxQixHQUExQyxFQUErQztBQUM5QyxnQ0FBMkIsTUFBM0I7QUFDQTtBQUNELEVBTEQ7O0FBT0EsS0FBSSxFQUFFLE1BQUYsRUFBVSxTQUFWLEtBQXdCLEVBQUUsY0FBRixFQUFrQixNQUFsQixFQUE1QixFQUF3RDtBQUN2RCxJQUFFLFlBQUYsRUFBZ0IsTUFBaEIsR0FBeUIsUUFBekIsQ0FBa0MsU0FBbEM7QUFDQTs7QUFFRCxLQUFJLEVBQUUsbUJBQUYsRUFBdUIsTUFBM0IsRUFBbUM7QUFDbEMsSUFBRSx3QkFB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V0FBWCxFQUEzQjs7QUFFQSxFQUFFLE1BQUYsRUFBVSxJQUFWLENBQWUsWUFBVztBQUN6Qjs7QUFFQSxHQUFFLE9BQUYsQ0FBVTtBQUNULGNBQVk7QUFESCxFQUFWOztBQUlBLEtBQUksY0FBYyxLQUFsQjtBQUNBLEdBQUUsTUFBRixFQUFVLE1BQVYsQ0FBaUIsWUFBVztBQUMzQixnQkFBYyxJQUFkO0FBQ0EsRUFGRDs7QUFJQSxhQUFZLFlBQVc7QUFDdEIsTUFBSSxDQUFDLFdBQUwsRUFDQyxPQUFPLElBQVA7QUFDRCxnQkFBYyxLQUFkO0FBQ0E7QUFDQSxFQUxELEVBS0csR0FMSDs7QUFPQSxHQUFFLHdCQUFGLEVBQTRCLEdBQTVCLENBQWdDO0FBQy9CLFFBQU0sRUFBRSxzQkFBRixFQUEwQixRQUExQixHQUFxQyxJQURaO0FBRS9CLFdBQVM7QUFGc0IsRUFBaEM7O0FBS0EsR0FBRSxNQUFGLEVBQVUsTUFBVixDQUFpQixZQUFXO0FBQzNCLE1BQUksRUFBRSxtQkFBRixFQUF1QixNQUEzQixFQUFtQztBQUNsQyxLQUFFLHdCQUFGLEVBQTRCLEdBQTVCLENBQWdDO0FBQy9CLFVBQU0sRUFBRSx3QkFBRixFQUE0QixRQUE1QixHQUF1QztBQURkLElBQWhDO0FBR0EsR0FKRCxNQUlPO0FBQ04sS0FBRSx3QkFBRixFQUE0QixHQUE1QixDQUFnQztBQUMvQixVQUFNLEVBQUUsc0JBQUYsRUFBMEIsUUFBMUIsR0FBcUMsSUFEWjtBQUUvQixXQUFPO0FBRndCLElBQWhDO0FBSUE7QUFDRCxFQVhEO0FBWUEsQ0FwQ0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc3QgJCA9IHdpbmRvdy5qUXVlcnk7XG5cbmNvbnN0IGlzTW9iaWxlID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpXG5cdC5tYXRjaCgvKGlwaG9uZXxpcG9kfGlwYWR8YW5kcm9pZHxibGFja2JlcnJ5fG9wZXJhIG1pbml8aWVtb2JpbGV8a2luZGxlfHNpbGt8bW9iaWxlKS8pO1xuXG5pZiAoaXNNb2JpbGUpIHtcblx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTmFtZSArPSAnIG1vYmlsZSc7XG59IGVsc2Uge1xuXHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NOYW1lICs9ICcgbm8tbW9iaWxlJztcbn1cblxuY29uc3QgY2hlY2tTY3JvbGxBcmVhID0gZnVuY3Rpb24oKSB7XG5cdGNvbnN0IHNjcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcblx0JCgnI3NpdGUtbmF2IC5uYXYtaXRlbScpLnJlbW92ZUNsYXNzKCdjdXJyZW50Jyk7XG5cdGxldCBzZWxlY3RlZEl0ZW0gPSAnJztcblxuXHQkKCcjc2l0ZS1uYXYgLm5hdi1pdGVtJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRjb25zdCBhbmNob3IgPSAkKHRoaXMpLmZpbmQoJ2EnKS5hdHRyKCdocmVmJykucmVwbGFjZSgnLycsJycpO1xuXHRcdGlmIChzY3JvbGxUb3AgKyAyMCA+ICQoYW5jaG9yKS5wb3NpdGlvbigpLnRvcCkge1xuXHRcdFx0c2VsZWN0ZWRJdGVtID0gYGFbaHJlZj1cIi8ke2FuY2hvcn1cIl1gO1xuXHRcdH1cblx0fSk7XG5cblx0aWYgKCQod2luZG93KS5zY3JvbGxUb3AoKSA+ICQoJyNzaXRlLWhlYWRlcicpLmhlaWdodCgpKSB7XG5cdFx0JChzZWxlY3RlZEl0ZW0pLnBhcmVudCgpLmFkZENsYXNzKCdjdXJyZW50Jyk7XG5cdH1cblxuXHRpZiAoJCgnLm5hdi1pdGVtLmN1cnJlbnQnKS5sZW5ndGgpIHtcblx0XHQkKCcuY3VycmVudC1uYXYtaW5kaWNhdG9yJykuY3NzKHtcblx0XHRcdGxlZnQ6ICQoJy5uYXYtaXRlbS5jdXJyZW50IHNwYW4nKS5wb3NpdGlvbigpLmxlZnQsXG5cdFx0XHR3aWR0aDogJCgnLm5hdi1pdGVtLmN1cnJlbnQgc3BhbicpLndpZHRoKClcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHQkKCcuY3VycmVudC1uYXYtaW5kaWNhdG9yJykuY3NzKHtcblx0XHRcdGxlZnQ6ICQoJy5uYXYtaXRlbS1hYm91dCBzcGFuJykucG9zaXRpb24oKS5sZWZ0LFxuXHRcdFx0d2lkdGg6IDBcblx0XHR9KTtcblx0fVxufTtcblxuY29uc3QgbG9hZFBhcmFsbGF4SW1hZ2UgPSBmdW5jdGlvbigpIHtcblx0JCgnLnBhcmFsbGF4JykuZWFjaChmdW5jdGlvbigpIHtcblx0XHQkKHRoaXMpLmNzcygnYmFja2dyb3VuZC1pbWFnZScsYHVybCgkeyQodGhpcykuZGF0YSgnYmFja2dyb3VuZC1pbWFnZScpfSlgKTtcblx0fSk7XG59O1xuXG4vLyBkaXNhYmxlIHRlbCBsaW5rcyBvbiBub24tbW9iaWxyIGRldmljZXNcbiQoJy5uby1tb2JpbGUgYVtocmVmXj1cInRlbDpcIl0nKS5vbignY2xpY2sgdGFwJywgZnVuY3Rpb24oZSkge1xuXHRlLnByZXZlbnREZWZhdWx0KCk7XG59KTtcblxuLy8gc21vb3RoIHNjcm9sbGluZ1xuJCgnYVtocmVmKj1cIiNcIl06bm90KFtocmVmPVwiI1wiXSknKS5vbignY2xpY2sgdGFwJywgZnVuY3Rpb24oKSB7XG5cdGlmIChsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgPT09IHRoaXMucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sJycpXG5cdFx0JiYgbG9jYXRpb24uaG9zdG5hbWUgPT09IHRoaXMuaG9zdG5hbWUpIHtcblx0XHRsZXQgdGFyZ2V0ID0gJCh0aGlzLmhhc2gpO1xuXHRcdHRhcmdldCA9IHRhcmdldC5sZW5ndGggPyB0YXJnZXQgOiAkKGBbbmFtZT0ke3RoaXMuaGFzaC5zbGljZSgxKX1dYCk7XG5cdFx0aWYgKHRhcmdldC5sZW5ndGgpIHtcblx0XHRcdCQoJ2h0bWwsYm9keScpLmFuaW1hdGUoe1xuXHRcdFx0XHRzY3JvbGxUb3A6IHRhcmdldC5vZmZzZXQoKS50b3Bcblx0XHRcdH0sIDgwMCwgJ2Vhc2VJbk91dFNpbmUnKTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH1cbn0pO1xuXG4kKCcjc2l0ZS10aXRsZSBhJykub24oJ2NsaWNrIHRhcCcsIGZ1bmN0aW9uKCkge1xuXHQkKCdodG1sLGJvZHknKS5hbmltYXRlKHtcblx0XHRzY3JvbGxUb3A6IDBcblx0fSwgODAwLCAnZWFzZUluT3V0U2luZScpO1xuXHRyZXR1cm4gZmFsc2U7XG59KTtcblxuY29uc3Qgc2xpZGVzaG93U3BlZWQgPSA3MDAwO1xuY29uc3QgYW5pbWF0aW9uU3BlZWQgPSA1MDA7XG5jb25zdCBhbmltYXRpb25EdXJhdGlvbiA9IHNsaWRlc2hvd1NwZWVkIC0gYW5pbWF0aW9uU3BlZWQ7XG5jb25zdCBhbmltYXRlUHJvZ3Jlc3NCYXIgPSBmdW5jdGlvbigpIHtcblx0JCgnLnByb2dyZXNzLWJhciBkaXYnKS5zdG9wKCkuY3NzKCd3aWR0aCcsMCkuYW5pbWF0ZSh7XG5cdFx0d2lkdGg6ICcxMDAlJ1xuXHR9LCBhbmltYXRpb25EdXJhdGlvbik7XG59O1xuXG5jb25zdCAkc2xpZGUxSW1nID0gJCgnLnNsaWRlciAuc2xpZGUtMScpLmZpbmQoJ2ltZycpO1xuJHNsaWRlMUltZy5hdHRyKCdzcmMnLCRzbGlkZTFJbWcuZGF0YSgnc3JjJykpO1xuJHNsaWRlMUltZy5sb2FkKGZ1bmN0aW9uKCkge1xuXHQkKCcuc2xpZGVzJykuY3NzKCdvcGFjaXR5JywxKTtcblx0JCgnLnNsaWRlcicpLmZsZXhzbGlkZXIoe1xuXHRcdGFuaW1hdGlvbjogJ3NsaWRlJyxcblx0XHRjb250cm9sTmF2OiBmYWxzZSxcblx0XHRkaXJlY3Rpb25OYXY6IGZhbHNlLFxuXHRcdHNsaWRlc2hvd1NwZWVkLFxuXHRcdGFuaW1hdGlvblNwZWVkLFxuXHRcdHN0YXJ0KHNsaWRlcikge1xuXHRcdFx0JChzbGlkZXIpLmZpbmQoJ2ltZycpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICgkKHRoaXMpLmRhdGEoJ3NyYycpKSB7XG5cdFx0XHRcdFx0JCh0aGlzKS5hdHRyKCdzcmMnLCQodGhpcykuZGF0YSgnc3JjJykpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdGFuaW1hdGVQcm9ncmVzc0JhcigpO1xuXHRcdH0sXG5cdFx0YWZ0ZXIoKSB7XG5cdFx0XHRhbmltYXRlUHJvZ3Jlc3NCYXIoKTtcblx0XHR9XG5cdH0pO1xufSk7XG5cbiQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG5cdGNvbnN0IHggPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xuXHQkKCcuc2xpZGVyIGltZycpLmNzcygndG9wJywgYCR7cGFyc2VJbnQoLXggLyA1LDEwKX1weGApO1xuXHQkKCcucHJvZ3Jlc3MtYmFyJykuY3NzKCd0b3AnLCBgJHtwYXJzZUludCg3MCAtIHgsMTApfXB4YCk7XG59KTtcblxuLy8gc2VydmljZXMgbW9kYWxzXG4kKCcubW9kYWwtdHJpZ2dlcicpLm9uKCdjbGljayB0YXAnLCBmdW5jdGlvbihlKSB7XG5cdGUucHJldmVudERlZmF1bHQoKTtcblx0JCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuXHRcdHNjcm9sbFRvcDogJCgnI3NlcnZpY2VzJykub2Zmc2V0KCkudG9wXG5cdH0sIDQwMCwgJ2Vhc2VJbk91dFNpbmUnKTtcblx0JCgnLm1vZGFsJykuZmFkZU91dCgnMTUwJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHQkKGAjJHskKHRoaXMpLmRhdGEoJ21vZGFsLXRhcmdldCcpfWApLmZhZGVJbignMTUwJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xufSk7XG5cbiQoJy5tb2RhbCAuY2xvc2UnKS5vbignY2xpY2sgdGFwJywgZnVuY3Rpb24oZSkge1xuXHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdCQodGhpcykucGFyZW50cygnLm1vZGFsJykuZmFkZU91dCgnMTUwJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xufSk7XG5cbi8vIGZlYXR1cmVkIHByb2plY3RzIHNsaWRlclxuJCgnLmZlYXR1cmVkLXByb2plY3RzLXNsaWRlciAuY2xvc2UnKS5vbignY2xpY2sgdGFwJywgZnVuY3Rpb24oZSkge1xuXHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdCQoJy5mZWF0dXJlZC1wcm9qZWN0cy1zbGlkZXInKS5zbGlkZVVwKCcxNTAnKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuXHQkKCcuZmVhdHVyZWQtcHJvamVjdHMtbmF2IC5mbGV4LWFjdGl2ZScpLnJlbW92ZUNsYXNzKCdmbGV4LWFjdGl2ZScpO1xuXHQkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG5cdFx0c2Nyb2xsVG9wOiAkKCcjcHJvamVjdHMnKS5vZmZzZXQoKS50b3Bcblx0fSwgNDAwLCAnZWFzZUluT3V0U2luZScpO1xufSk7XG5cbiQoJy5mZWF0dXJlZC1wcm9qZWN0cy1zbGlkZXInKS5mbGV4c2xpZGVyKHtcblx0YW5pbWF0aW9uOiAnZmFkZScsXG5cdG1hbnVhbENvbnRyb2xzOiAnLmZlYXR1cmVkLXByb2plY3RzLW5hdiBhJyxcblx0c2xpZGVzaG93OiBmYWxzZSxcblx0c2VsZWN0b3I6ICcuc2xpZGVzLW91dGVyID4gbGknLFxuXHRwcmV2VGV4dDogJzxzcGFuPiYjMTM5Ozwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJhc3Npc3RpdmUtdGV4dFwiPlByZXZpb3VzPC9zcGFuPicsXG5cdG5leHRUZXh0OiAnPHNwYW4gY2xhc3M9XCJhc3Npc3RpdmUtdGV4dFwiPlByZXZpb3VzPC9zcGFuPiA8c3Bhbj4mIzE1NTs8L3NwYW4+Jyxcblx0c3RhcnQoc2xpZGVyKSB7XG5cdFx0JChzbGlkZXIpLmZpbmQoJy5mbGV4LWFjdGl2ZS1zbGlkZSBpbWcnKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0aWYgKCQodGhpcykuZGF0YSgnc3JjJykpIHtcblx0XHRcdFx0JCh0aGlzKS5hdHRyKCdzcmMnLCQodGhpcykuZGF0YSgnc3JjJykpO1xuXHRcdFx0XHQkKHRoaXMpLnJlbW92ZUF0dHIoJ2RhdGEtc3JjJyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH0sXG5cdGFmdGVyKHNsaWRlcikge1xuXHRcdCQoc2xpZGVyKS5maW5kKCcuZmxleC1hY3RpdmUtc2xpZGUgaW1nJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdGlmICgkKHRoaXMpLmRhdGEoJ3NyYycpKSB7XG5cdFx0XHRcdCQodGhpcykuYXR0cignc3JjJywkKHRoaXMpLmRhdGEoJ3NyYycpKTtcblx0XHRcdFx0JCh0aGlzKS5yZW1vdmVBdHRyKCdkYXRhLXNyYycpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59KTtcblxuJCgnLmZlYXR1cmVkLXByb2plY3RzLW5hdiAuZmxleC1hY3RpdmUnKS5yZW1vdmVDbGFzcygnZmxleC1hY3RpdmUnKTtcblxuJCgnLnByb2plY3QtaW1hZ2Utc2xpZGVyJykuZWFjaChmdW5jdGlvbigpIHtcblx0JCh0aGlzKS5mbGV4c2xpZGVyKHtcblx0XHRhbmltYXRpb246ICdmYWRlJyxcblx0XHR1c2VDU1M6IGZhbHNlLFxuXHRcdG11bHRpcGxlS2V5Ym9hcmQ6IGZhbHNlLFxuXHRcdHNsaWRlc2hvdzogZmFsc2UsXG5cdFx0Y29udHJvbE5hdjogZmFsc2UsXG5cdFx0c2VsZWN0b3I6ICcuc2xpZGVzLWlubmVyID4gbGknLFxuXHRcdHByZXZUZXh0OiAnPHNwYW4+JiMxMzk7PC9zcGFuPiA8c3BhbiBjbGFzcz1cImFzc2lzdGl2ZS10ZXh0XCI+UHJldmlvdXM8L3NwYW4+Jyxcblx0XHRuZXh0VGV4dDogJzxzcGFuIGNsYXNzPVwiYXNzaXN0aXZlLXRleHRcIj5QcmV2aW91czwvc3Bhbj4gPHNwYW4+JiMxNTU7PC9zcGFuPidcblx0fSk7XG59KTtcblxuJCgnLmZlYXR1cmVkLXByb2plY3RzLW5hdiBhJykub24oJ2NsaWNrIHRhcCcsIGZ1bmN0aW9uKGUpIHtcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRjb25zdCAkdGhpcyA9ICQodGhpcyk7XG5cdGlmICghJCgnLmZlYXR1cmVkLXByb2plY3RzLXNsaWRlcicpLmhhc0NsYXNzKCdvcGVuJykpIHtcblx0XHQkKCcuZmVhdHVyZWQtcHJvamVjdHMtc2xpZGVyJykuc2xpZGVEb3duKCcxNTAnKS5hZGRDbGFzcygnb3BlbicpO1xuXHRcdCQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcblx0XHRcdHNjcm9sbFRvcDogJCgnLmZlYXR1cmVkLXByb2plY3RzLXNsaWRlcicpLm9mZnNldCgpLnRvcCAtIDkwXG5cdFx0fSwgNDAwLCAnZWFzZUluT3V0U2luZScpO1xuXHRcdCR0aGlzLnRyaWdnZXIoJ2NsaWNrJyk7XG5cdFx0JHRoaXMuYWRkQ2xhc3MoJ2ZsZXgtYWN0aXZlJyk7XG5cdH1cbn0pO1xuXG4kKCcuY29weXJpZ2h0IC55ZWFyJykudGV4dChuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCkpO1xuXG4kKHdpbmRvdykubG9hZChmdW5jdGlvbigpIHtcblx0bG9hZFBhcmFsbGF4SW1hZ2UoKTtcblxuXHQkLnN0ZWxsYXIoe1xuXHRcdHJlc3BvbnNpdmU6IHRydWVcblx0fSk7XG5cblx0bGV0IGlzU2Nyb2xsaW5nID0gZmFsc2U7XG5cdCQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG5cdFx0aXNTY3JvbGxpbmcgPSB0cnVlO1xuXHR9KTtcblxuXHRzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcblx0XHRpZiAoIWlzU2Nyb2xsaW5nKVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0aXNTY3JvbGxpbmcgPSBmYWxzZTtcblx0XHRjaGVja1Njcm9sbEFyZWEoKTtcblx0fSwgMTAwKTtcblxuXHQkKCcuY3VycmVudC1uYXYtaW5kaWNhdG9yJykuY3NzKHtcblx0XHRsZWZ0OiAkKCcubmF2LWl0ZW0tYWJvdXQgc3BhbicpLnBvc2l0aW9uKCkubGVmdCxcblx0XHRvcGFjaXR5OiAxXG5cdH0pO1xuXG5cdCQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XG5cdFx0aWYgKCQoJy5uYXYtaXRlbS5jdXJyZW50JykubGVuZ3RoKSB7XG5cdFx0XHQkKCcuY3VycmVudC1uYXYtaW5kaWNhdG9yJykuY3NzKHtcblx0XHRcdFx0bGVmdDogJCgnLm5hdi1pdGVtLmN1cnJlbnQgc3BhbicpLnBvc2l0aW9uKCkubGVmdFxuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdCQoJy5jdXJyZW50LW5hdi1pbmRpY2F0b3InKS5jc3Moe1xuXHRcdFx0XHRsZWZ0OiAkKCcubmF2LWl0ZW0tYWJvdXQgc3BhbicpLnBvc2l0aW9uKCkubGVmdCxcblx0XHRcdFx0d2lkdGg6IDBcblx0XHRcdH0pO1xuXHRcdH1cblx0fSk7XG59KTsiXX0=
