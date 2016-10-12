<?php
	$bodyClass = "home";
	function paralaxImage($img) {
		echo '<div
			class="parallax"
			data-background-image="' . $img . '"
			data-stellar-background-ratio="0.5"
			data-horizontal-scrolling="false">
		</div>';
	}

	include('includes/header.php');

	include('includes/slider.php');

	include('includes/about.php');

	paralaxImage('/content/img/parallax-1.jpg');

	include('includes/services.php');

	paralaxImage('/content/img/parallax-2.jpg');

	include('includes/projects.php');

	paralaxImage('/content/img/parallax-3.jpg');

	include('includes/contact.php');

	paralaxImage('/content/img/parallax-4.jpg');

	include('includes/footer.php');
?>