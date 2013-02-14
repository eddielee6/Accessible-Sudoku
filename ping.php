<?php

	$output = shell_exec('git pull');
	echo '<p>'.$output.'</p>';
	
?>