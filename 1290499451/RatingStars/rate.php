<?php

        header('Content-Type: text/xml');
        echo '<?xml version="1.0"?><rating>' . $_REQUEST['rating'] . '</rating>';
?>