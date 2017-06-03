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
		useCSS: false,
		multipleKeyboard: false,
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
	useCSS: false,
	multipleKeyboard: false,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvc2NyaXB0cy9zaXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFNLElBQUksT0FBTyxNQUFqQjs7QUFFQSxJQUFNLFdBQVcsVUFBVSxTQUFWLENBQW9CLFdBQXBCLEdBQ2YsS0FEZSxDQUNULDhFQURTLENBQWpCOztBQUdBLElBQUksUUFBSixFQUFjO0FBQ2IsVUFBUyxlQUFULENBQXlCLFNBQXpCLElBQXNDLFNBQXRDO0FBQ0EsQ0FGRCxNQUVPO0FBQ04sVUFBUyxlQUFULENBQXlCLFNBQXpCLElBQXNDLFlBQXRDO0FBQ0E7O0FBRUQsSUFBTSxrQkFBa0IsU0FBbEIsZUFBa0IsR0FBVztBQUNsQyxLQUFNLFlBQVksRUFBRSxNQUFGLEVBQVUsU0FBVixFQUFsQjtBQUNBLEdBQUUscUJBQUYsRUFBeUIsV0FBekIsQ0FBcUMsU0FBckM7QUFDQSxLQUFJLGVBQWUsRUFBbkI7O0FBRUEsR0FBRSxxQkFBRixFQUF5QixJQUF6QixDQUE4QixZQUFXO0FBQ3hDLE1BQU0sU0FBUyxFQUFFLElBQUYsRUFBUSxJQUFSLENBQWEsR0FBYixFQUFrQixJQUFsQixDQUF1QixNQUF2QixFQUErQixPQUEvQixDQUF1QyxHQUF2QyxFQUEyQyxFQUEzQyxDQUFmO0FBQ0EsTUFBSSxZQUFZLEVBQVosR0FBaUIsRUFBRSxNQUFGLEVBQVUsUUFBVixHQUFxQixHQUExQyxFQUErQztBQUM5QyxnQ0FBMkIsTUFBM0I7QUFDQTtBQUNELEVBTEQ7O0FBT0EsS0FBSSxFQUFFLE1BQUYsRUFBVSxTQUFWLEtBQXdCLEVBQUUsY0FBRixFQUFrQixNQUFsQixFQUE1QixFQUF3RDtBQUN2RCxJQUFFLFlBQUYsRUFBZ0IsTUFBaEIsR0FBeUIsUUFBekIsQ0FBa0MsU0FBbEM7QUFDQTs7QUFFRCxLQUFJLEVBQUUsbUJBQUYsRUFBdUIsTUFBM0IsRUFBbUM7QUFDbEMsSUFBRSx3QkFB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QUFOLENBQWUsYUFBZjtBQUNBO0FBQ0QsQ0FYRDs7QUFhQSxFQUFFLGtCQUFGLEVBQXNCLElBQXRCLENBQTJCLElBQUksSUFBSixHQUFXLFdBQVgsRUFBM0I7O0FBRUEsRUFBRSxNQUFGLEVBQVUsSUFBVixDQUFlLFlBQVc7QUFDekI7O0FBRUEsR0FBRSxPQUFGLENBQVU7QUFDVCxjQUFZO0FBREgsRUFBVjs7QUFJQSxLQUFJLGNBQWMsS0FBbEI7QUFDQSxHQUFFLE1BQUYsRUFBVSxNQUFWLENBQWlCLFlBQVc7QUFDM0IsZ0JBQWMsSUFBZDtBQUNBLEVBRkQ7O0FBSUEsYUFBWSxZQUFXO0FBQ3RCLE1BQUksQ0FBQyxXQUFMLEVBQ0MsT0FBTyxJQUFQO0FBQ0QsZ0JBQWMsS0FBZDtBQUNBO0FBQ0EsRUFMRCxFQUtHLEdBTEg7O0FBT0EsR0FBRSx3QkFBRixFQUE0QixHQUE1QixDQUFnQztBQUMvQixRQUFNLEVBQUUsc0JBQUYsRUFBMEIsUUFBMUIsR0FBcUMsSUFEWjtBQUUvQixXQUFTO0FBRnNCLEVBQWhDOztBQUtBLEdBQUUsTUFBRixFQUFVLE1BQVYsQ0FBaUIsWUFBVztBQUMzQixNQUFJLEVBQUUsbUJBQUYsRUFBdUIsTUFBM0IsRUFBbUM7QUFDbEMsS0FBRSx3QkFBRixFQUE0QixHQUE1QixDQUFnQztBQUMvQixVQUFNLEVBQUUsd0JBQUYsRUFBNEIsUUFBNUIsR0FBdUM7QUFEZCxJQUFoQztBQUdBLEdBSkQsTUFJTztBQUNOLEtBQUUsd0JBQUYsRUFBNEIsR0FBNUIsQ0FBZ0M7QUFDL0IsVUFBTSxFQUFFLHNCQUFGLEVBQTBCLFFBQTFCLEdBQXFDLElBRFo7QUFFL0IsV0FBTztBQUZ3QixJQUFoQztBQUlBO0FBQ0QsRUFYRDtBQVlBLENBcENEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImNvbnN0ICQgPSB3aW5kb3cualF1ZXJ5O1xuXG5jb25zdCBpc01vYmlsZSA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKVxuXHQubWF0Y2goLyhpcGhvbmV8aXBvZHxpcGFkfGFuZHJvaWR8YmxhY2tiZXJyeXxvcGVyYSBtaW5pfGllbW9iaWxlfGtpbmRsZXxzaWxrfG1vYmlsZSkvKTtcblxuaWYgKGlzTW9iaWxlKSB7XG5cdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc05hbWUgKz0gJyBtb2JpbGUnO1xufSBlbHNlIHtcblx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTmFtZSArPSAnIG5vLW1vYmlsZSc7XG59XG5cbmNvbnN0IGNoZWNrU2Nyb2xsQXJlYSA9IGZ1bmN0aW9uKCkge1xuXHRjb25zdCBzY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XG5cdCQoJyNzaXRlLW5hdiAubmF2LWl0ZW0nKS5yZW1vdmVDbGFzcygnY3VycmVudCcpO1xuXHRsZXQgc2VsZWN0ZWRJdGVtID0gJyc7XG5cblx0JCgnI3NpdGUtbmF2IC5uYXYtaXRlbScpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0Y29uc3QgYW5jaG9yID0gJCh0aGlzKS5maW5kKCdhJykuYXR0cignaHJlZicpLnJlcGxhY2UoJy8nLCcnKTtcblx0XHRpZiAoc2Nyb2xsVG9wICsgMjAgPiAkKGFuY2hvcikucG9zaXRpb24oKS50b3ApIHtcblx0XHRcdHNlbGVjdGVkSXRlbSA9IGBhW2hyZWY9XCIvJHthbmNob3J9XCJdYDtcblx0XHR9XG5cdH0pO1xuXG5cdGlmICgkKHdpbmRvdykuc2Nyb2xsVG9wKCkgPiAkKCcjc2l0ZS1oZWFkZXInKS5oZWlnaHQoKSkge1xuXHRcdCQoc2VsZWN0ZWRJdGVtKS5wYXJlbnQoKS5hZGRDbGFzcygnY3VycmVudCcpO1xuXHR9XG5cblx0aWYgKCQoJy5uYXYtaXRlbS5jdXJyZW50JykubGVuZ3RoKSB7XG5cdFx0JCgnLmN1cnJlbnQtbmF2LWluZGljYXRvcicpLmNzcyh7XG5cdFx0XHRsZWZ0OiAkKCcubmF2LWl0ZW0uY3VycmVudCBzcGFuJykucG9zaXRpb24oKS5sZWZ0LFxuXHRcdFx0d2lkdGg6ICQoJy5uYXYtaXRlbS5jdXJyZW50IHNwYW4nKS53aWR0aCgpXG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0JCgnLmN1cnJlbnQtbmF2LWluZGljYXRvcicpLmNzcyh7XG5cdFx0XHRsZWZ0OiAkKCcubmF2LWl0ZW0tYWJvdXQgc3BhbicpLnBvc2l0aW9uKCkubGVmdCxcblx0XHRcdHdpZHRoOiAwXG5cdFx0fSk7XG5cdH1cbn07XG5cbmNvbnN0IGxvYWRQYXJhbGxheEltYWdlID0gZnVuY3Rpb24oKSB7XG5cdCQoJy5wYXJhbGxheCcpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0JCh0aGlzKS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLGB1cmwoJHskKHRoaXMpLmRhdGEoJ2JhY2tncm91bmQtaW1hZ2UnKX0pYCk7XG5cdH0pO1xufTtcblxuLy8gZGlzYWJsZSB0ZWwgbGlua3Mgb24gbm9uLW1vYmlsciBkZXZpY2VzXG4kKCcubm8tbW9iaWxlIGFbaHJlZl49XCJ0ZWw6XCJdJykub24oJ2NsaWNrIHRhcCcsIGZ1bmN0aW9uKGUpIHtcblx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cbi8vIHNtb290aCBzY3JvbGxpbmdcbiQoJ2FbaHJlZio9XCIjXCJdOm5vdChbaHJlZj1cIiNcIl0pJykub24oJ2NsaWNrIHRhcCcsIGZ1bmN0aW9uKCkge1xuXHRpZiAobG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXlxcLy8sJycpID09PSB0aGlzLnBhdGhuYW1lLnJlcGxhY2UoL15cXC8vLCcnKVxuXHRcdCYmIGxvY2F0aW9uLmhvc3RuYW1lID09PSB0aGlzLmhvc3RuYW1lKSB7XG5cdFx0bGV0IHRhcmdldCA9ICQodGhpcy5oYXNoKTtcblx0XHR0YXJnZXQgPSB0YXJnZXQubGVuZ3RoID8gdGFyZ2V0IDogJChgW25hbWU9JHt0aGlzLmhhc2guc2xpY2UoMSl9XWApO1xuXHRcdGlmICh0YXJnZXQubGVuZ3RoKSB7XG5cdFx0XHQkKCdodG1sLGJvZHknKS5hbmltYXRlKHtcblx0XHRcdFx0c2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wXG5cdFx0XHR9LCA4MDAsICdlYXNlSW5PdXRTaW5lJyk7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG59KTtcblxuJCgnI3NpdGUtdGl0bGUgYScpLm9uKCdjbGljayB0YXAnLCBmdW5jdGlvbigpIHtcblx0JCgnaHRtbCxib2R5JykuYW5pbWF0ZSh7XG5cdFx0c2Nyb2xsVG9wOiAwXG5cdH0sIDgwMCwgJ2Vhc2VJbk91dFNpbmUnKTtcblx0cmV0dXJuIGZhbHNlO1xufSk7XG5cbmNvbnN0IHNsaWRlc2hvd1NwZWVkID0gNzAwMDtcbmNvbnN0IGFuaW1hdGlvblNwZWVkID0gNTAwO1xuY29uc3QgYW5pbWF0aW9uRHVyYXRpb24gPSBzbGlkZXNob3dTcGVlZCAtIGFuaW1hdGlvblNwZWVkO1xuY29uc3QgYW5pbWF0ZVByb2dyZXNzQmFyID0gZnVuY3Rpb24oKSB7XG5cdCQoJy5wcm9ncmVzcy1iYXIgZGl2Jykuc3RvcCgpLmNzcygnd2lkdGgnLDApLmFuaW1hdGUoe1xuXHRcdHdpZHRoOiAnMTAwJSdcblx0fSwgYW5pbWF0aW9uRHVyYXRpb24pO1xufTtcblxuY29uc3QgJHNsaWRlMUltZyA9ICQoJy5zbGlkZXIgLnNsaWRlLTEnKS5maW5kKCdpbWcnKTtcbiRzbGlkZTFJbWcuYXR0cignc3JjJywkc2xpZGUxSW1nLmRhdGEoJ3NyYycpKTtcbiRzbGlkZTFJbWcubG9hZChmdW5jdGlvbigpIHtcblx0JCgnLnNsaWRlcycpLmNzcygnb3BhY2l0eScsMSk7XG5cdCQoJy5zbGlkZXInKS5mbGV4c2xpZGVyKHtcblx0XHRhbmltYXRpb246ICdzbGlkZScsXG5cdFx0dXNlQ1NTOiBmYWxzZSxcblx0XHRtdWx0aXBsZUtleWJvYXJkOiBmYWxzZSxcblx0XHRjb250cm9sTmF2OiBmYWxzZSxcblx0XHRkaXJlY3Rpb25OYXY6IGZhbHNlLFxuXHRcdHNsaWRlc2hvd1NwZWVkLFxuXHRcdGFuaW1hdGlvblNwZWVkLFxuXHRcdHN0YXJ0KHNsaWRlcikge1xuXHRcdFx0JChzbGlkZXIpLmZpbmQoJ2ltZycpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICgkKHRoaXMpLmRhdGEoJ3NyYycpKSB7XG5cdFx0XHRcdFx0JCh0aGlzKS5hdHRyKCdzcmMnLCQodGhpcykuZGF0YSgnc3JjJykpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdGFuaW1hdGVQcm9ncmVzc0JhcigpO1xuXHRcdH0sXG5cdFx0YWZ0ZXIoKSB7XG5cdFx0XHRhbmltYXRlUHJvZ3Jlc3NCYXIoKTtcblx0XHR9XG5cdH0pO1xufSk7XG5cbiQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XG5cdGNvbnN0IHggPSAkKHRoaXMpLnNjcm9sbFRvcCgpO1xuXHQkKCcuc2xpZGVyIGltZycpLmNzcygndG9wJywgYCR7cGFyc2VJbnQoLXggLyA1LDEwKX1weGApO1xuXHQkKCcucHJvZ3Jlc3MtYmFyJykuY3NzKCd0b3AnLCBgJHtwYXJzZUludCg3MCAtIHgsMTApfXB4YCk7XG59KTtcblxuLy8gc2VydmljZXMgbW9kYWxzXG4kKCcubW9kYWwtdHJpZ2dlcicpLm9uKCdjbGljayB0YXAnLCBmdW5jdGlvbihlKSB7XG5cdGUucHJldmVudERlZmF1bHQoKTtcblx0JCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuXHRcdHNjcm9sbFRvcDogJCgnI3NlcnZpY2VzJykub2Zmc2V0KCkudG9wXG5cdH0sIDQwMCwgJ2Vhc2VJbk91dFNpbmUnKTtcblx0JCgnLm1vZGFsJykuZmFkZU91dCgnMTUwJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHQkKGAjJHskKHRoaXMpLmRhdGEoJ21vZGFsLXRhcmdldCcpfWApLmZhZGVJbignMTUwJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xufSk7XG5cbiQoJy5tb2RhbCAuY2xvc2UnKS5vbignY2xpY2sgdGFwJywgZnVuY3Rpb24oZSkge1xuXHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdCQodGhpcykucGFyZW50cygnLm1vZGFsJykuZmFkZU91dCgnMTUwJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xufSk7XG5cbi8vIGZlYXR1cmVkIHByb2plY3RzIHNsaWRlclxuJCgnLmZlYXR1cmVkLXByb2plY3RzLXNsaWRlciAuY2xvc2UnKS5vbignY2xpY2sgdGFwJywgZnVuY3Rpb24oZSkge1xuXHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdCQoJy5mZWF0dXJlZC1wcm9qZWN0cy1zbGlkZXInKS5zbGlkZVVwKCcxNTAnKS5yZW1vdmVDbGFzcygnb3BlbicpO1xuXHQkKCcuZmVhdHVyZWQtcHJvamVjdHMtbmF2IC5mbGV4LWFjdGl2ZScpLnJlbW92ZUNsYXNzKCdmbGV4LWFjdGl2ZScpO1xuXHQkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG5cdFx0c2Nyb2xsVG9wOiAkKCcjcHJvamVjdHMnKS5vZmZzZXQoKS50b3Bcblx0fSwgNDAwLCAnZWFzZUluT3V0U2luZScpO1xufSk7XG5cbiQoJy5mZWF0dXJlZC1wcm9qZWN0cy1zbGlkZXInKS5mbGV4c2xpZGVyKHtcblx0YW5pbWF0aW9uOiAnZmFkZScsXG5cdHVzZUNTUzogZmFsc2UsXG5cdG11bHRpcGxlS2V5Ym9hcmQ6IGZhbHNlLFxuXHRtYW51YWxDb250cm9sczogJy5mZWF0dXJlZC1wcm9qZWN0cy1uYXYgYScsXG5cdHNsaWRlc2hvdzogZmFsc2UsXG5cdHNlbGVjdG9yOiAnLnNsaWRlcy1vdXRlciA+IGxpJyxcblx0cHJldlRleHQ6ICc8c3Bhbj4mIzEzOTs8L3NwYW4+IDxzcGFuIGNsYXNzPVwiYXNzaXN0aXZlLXRleHRcIj5QcmV2aW91czwvc3Bhbj4nLFxuXHRuZXh0VGV4dDogJzxzcGFuIGNsYXNzPVwiYXNzaXN0aXZlLXRleHRcIj5QcmV2aW91czwvc3Bhbj4gPHNwYW4+JiMxNTU7PC9zcGFuPicsXG5cdHN0YXJ0KHNsaWRlcikge1xuXHRcdCQoc2xpZGVyKS5maW5kKCcuZmxleC1hY3RpdmUtc2xpZGUgaW1nJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdGlmICgkKHRoaXMpLmRhdGEoJ3NyYycpKSB7XG5cdFx0XHRcdCQodGhpcykuYXR0cignc3JjJywkKHRoaXMpLmRhdGEoJ3NyYycpKTtcblx0XHRcdFx0JCh0aGlzKS5yZW1vdmVBdHRyKCdkYXRhLXNyYycpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9LFxuXHRhZnRlcihzbGlkZXIpIHtcblx0XHQkKHNsaWRlcikuZmluZCgnLmZsZXgtYWN0aXZlLXNsaWRlIGltZycpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoJCh0aGlzKS5kYXRhKCdzcmMnKSkge1xuXHRcdFx0XHQkKHRoaXMpLmF0dHIoJ3NyYycsJCh0aGlzKS5kYXRhKCdzcmMnKSk7XG5cdFx0XHRcdCQodGhpcykucmVtb3ZlQXR0cignZGF0YS1zcmMnKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufSk7XG5cbiQoJy5mZWF0dXJlZC1wcm9qZWN0cy1uYXYgLmZsZXgtYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2ZsZXgtYWN0aXZlJyk7XG5cbiQoJy5wcm9qZWN0LWltYWdlLXNsaWRlcicpLmVhY2goZnVuY3Rpb24oKSB7XG5cdCQodGhpcykuZmxleHNsaWRlcih7XG5cdFx0YW5pbWF0aW9uOiAnZmFkZScsXG5cdFx0dXNlQ1NTOiBmYWxzZSxcblx0XHRtdWx0aXBsZUtleWJvYXJkOiBmYWxzZSxcblx0XHRzbGlkZXNob3c6IGZhbHNlLFxuXHRcdGNvbnRyb2xOYXY6IGZhbHNlLFxuXHRcdHNlbGVjdG9yOiAnLnNsaWRlcy1pbm5lciA+IGxpJyxcblx0XHRwcmV2VGV4dDogJzxzcGFuPiYjMTM5Ozwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJhc3Npc3RpdmUtdGV4dFwiPlByZXZpb3VzPC9zcGFuPicsXG5cdFx0bmV4dFRleHQ6ICc8c3BhbiBjbGFzcz1cImFzc2lzdGl2ZS10ZXh0XCI+UHJldmlvdXM8L3NwYW4+IDxzcGFuPiYjMTU1Ozwvc3Bhbj4nXG5cdH0pO1xufSk7XG5cbiQoJy5mZWF0dXJlZC1wcm9qZWN0cy1uYXYgYScpLm9uKCdjbGljayB0YXAnLCBmdW5jdGlvbihlKSB7XG5cdGUucHJldmVudERlZmF1bHQoKTtcblx0Y29uc3QgJHRoaXMgPSAkKHRoaXMpO1xuXHRpZiAoISQoJy5mZWF0dXJlZC1wcm9qZWN0cy1zbGlkZXInKS5oYXNDbGFzcygnb3BlbicpKSB7XG5cdFx0JCgnLmZlYXR1cmVkLXByb2plY3RzLXNsaWRlcicpLnNsaWRlRG93bignMTUwJykuYWRkQ2xhc3MoJ29wZW4nKTtcblx0XHQkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG5cdFx0XHRzY3JvbGxUb3A6ICQoJy5mZWF0dXJlZC1wcm9qZWN0cy1zbGlkZXInKS5vZmZzZXQoKS50b3AgLSA5MFxuXHRcdH0sIDQwMCwgJ2Vhc2VJbk91dFNpbmUnKTtcblx0XHQkdGhpcy50cmlnZ2VyKCdjbGljaycpO1xuXHRcdCR0aGlzLmFkZENsYXNzKCdmbGV4LWFjdGl2ZScpO1xuXHR9XG59KTtcblxuJCgnLmNvcHlyaWdodCAueWVhcicpLnRleHQobmV3IERhdGUoKS5nZXRGdWxsWWVhcigpKTtcblxuJCh3aW5kb3cpLmxvYWQoZnVuY3Rpb24oKSB7XG5cdGxvYWRQYXJhbGxheEltYWdlKCk7XG5cblx0JC5zdGVsbGFyKHtcblx0XHRyZXNwb25zaXZlOiB0cnVlXG5cdH0pO1xuXG5cdGxldCBpc1Njcm9sbGluZyA9IGZhbHNlO1xuXHQkKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCkge1xuXHRcdGlzU2Nyb2xsaW5nID0gdHJ1ZTtcblx0fSk7XG5cblx0c2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG5cdFx0aWYgKCFpc1Njcm9sbGluZylcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdGlzU2Nyb2xsaW5nID0gZmFsc2U7XG5cdFx0Y2hlY2tTY3JvbGxBcmVhKCk7XG5cdH0sIDEwMCk7XG5cblx0JCgnLmN1cnJlbnQtbmF2LWluZGljYXRvcicpLmNzcyh7XG5cdFx0bGVmdDogJCgnLm5hdi1pdGVtLWFib3V0IHNwYW4nKS5wb3NpdGlvbigpLmxlZnQsXG5cdFx0b3BhY2l0eTogMVxuXHR9KTtcblxuXHQkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xuXHRcdGlmICgkKCcubmF2LWl0ZW0uY3VycmVudCcpLmxlbmd0aCkge1xuXHRcdFx0JCgnLmN1cnJlbnQtbmF2LWluZGljYXRvcicpLmNzcyh7XG5cdFx0XHRcdGxlZnQ6ICQoJy5uYXYtaXRlbS5jdXJyZW50IHNwYW4nKS5wb3NpdGlvbigpLmxlZnRcblx0XHRcdH0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQkKCcuY3VycmVudC1uYXYtaW5kaWNhdG9yJykuY3NzKHtcblx0XHRcdFx0bGVmdDogJCgnLm5hdi1pdGVtLWFib3V0IHNwYW4nKS5wb3NpdGlvbigpLmxlZnQsXG5cdFx0XHRcdHdpZHRoOiAwXG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xufSk7Il19
