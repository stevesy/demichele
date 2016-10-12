<?php
	$isProduction = false;
	if (($_SERVER["HTTP_HOST"] == "www.demichele.com") || ($_SERVER["HTTP_HOST"] == "demichele.com"))
		$isProduction = true;

	$gaNum = "UA-XXXXXX-X";
	if ($isProduction)
		$gaNum = "UA-32987284-2";
	
	$client = "DeMichele Co. Commercial Real Estate Services";
?>

<!DOCTYPE html>
<!--[if lte IE 8 ]><html dir="ltr" lang="en-US" class="no-js ie ie8 lte9 lte8"><![endif]-->
<!--[if IE 9 ]><html dir="ltr" lang="en-US" class="no-js ie ie9 lte9"><![endif]-->
<!--[if !IE]><!--><html dir="ltr" lang="en-US" class="no-js"><!--<![endif]-->
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=1024, user-scalable=1" />
		<title><?php echo $pageTitle != "" ? $pageTitle . " | " : "" ?><?php echo $client ?></title>
		<?php /* ?><meta name="description" content="" /><?php */ ?>
		<link rel="shortcut icon" href="/favicon.ico" />
		<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
		<link href="/content/css/site.css" rel="stylesheet" />
		<script src="//cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.2/modernizr.min.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
		<script>
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
			ga('create', '<?php echo $gaNum ?>', 'auto');
			ga('send', 'pageview');
		</script>
	</head>

	<body class="<?php echo $bodyClass ?>">
		<header id="site-header" role="banner">
			<div class="row app-bar">
				<div class="col">
					<h6 id="site-title"><a href="/"><span><?php echo $client ?></span></a></h6>
				</div>
			</div>

			<nav id="site-nav" class="nav-bar" role="navigation">
				<div class="row">
					<h6 class="assistive-text">Main navigation</h6>
					<a href="#content" class="skip-link assistive-text">Skip to content</a>
					<ul class="nav">
						<li class="nav-item nav-item-about">
							<a class="nav-link" href="/#about">
								<span>About</span>
							</a>
						</li>
						<li class="nav-item nav-item-services">
							<a class="nav-link" href="/#services">
								<span>Services</span>
							</a>
						</li>
						<li class="nav-item nav-item-projects">
							<a class="nav-link" href="/#projects">
								<span>Featured Projects</span>
							</a>
						</li>
						<li class="nav-item nav-item-contact">
							<a class="nav-link" href="/#contact">
								<span>Contact</span>
							</a>
						</li>
					</ul>
					<span class="current-nav-indicator"></span>
				</div>
			</nav>
		</header>

		<main id="content" role="main">