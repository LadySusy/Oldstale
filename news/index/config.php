<?php // config reprogrammed by cuarz
error_reporting(0);

	$WebsiteVersion="1.0.6";

	$db_Char='dbo.Character';//Character Liste
	$db_Account='dbo.Account';//Account Liste
	$db_News='dbo.NewsTable';//News
	$db_Comm='dbo.NewsCommentary';//News Kommentare
	$db_Penalty="dbo.PenaltyLog";//Penalty -> Ban
	$db_Ticket="dbo.Ticket";//Ticket ( ALLGEMEIN )
	$db_awTicket="dbo.TicketAnswer";//Ticket ( Antworten )

	$serverName = "VMI317344";
	$connectionInfo = "opennos2";

	$site = [
		'name' => 'DreamTrix',
		'url' => 'http://167.86.124.215',
		'style' => '/news/index/assets',

		'download' => [
			'directory' => '/launcher/',
			'launcher' => 'DreamTrix.exe'
		],

		'social' => [
			'discord' => 'https://discord.gg/4tPNNUH',
			'youtube' => 'https://www.youtube.com/channel/UCJv3fSdOYXdDGXL1VYyzT9g',
			'twitter' => '',
			'facebook' => ''
		],

		'assets' => [
			'javascript' => '/javascript',
			'css' => '/news/index/assets/css',
			'images' => '/news/index/assets/images'
		]
	];


	$RuleWebsite = "http://dreamtrix.fr/rules";
	$YouTube = "https://www.youtube.com";
	$Board = "http://board.dreamtrix.fr";
	$Discord = "https://discord.gg/4tPNNUH";

	$Facebook = "";
	$FacebookName = "";
	$ReCaptchaPublic = "6LcuzJIUAAAAAO-Y9biG3_ZunEAXGR-fhO_HUrl8";
    $ReCaptchaPrivate = "6LcuzJIUAAAAAMPdShitT7goJQPFDPEjnZNGqu9Z";
    
	try {

		$conn = new PDO("sqlsrv:Server=$serverName;Database=$connectionInfo", NULL, NULL);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}
	catch (PDOException $e) {
		echo 'Connection Failed to Database , please be patient !'; echo $e->getMessage();
	}
	
?>