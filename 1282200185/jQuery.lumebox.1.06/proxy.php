<?php
header('Content-type: application/xml');
$h = fopen($_REQUEST['url'], "r");

if ($h) {
	while (!feof($h)) {
		$b = fgets($h, 4096);
		echo $b;
	}
	fclose($h);
}
?>