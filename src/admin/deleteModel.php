<?php
// This script lacks security features, do not open to the public!

if($_SERVER['REQUEST_METHOD'] !== "POST") {
    http_response_code(400);
    echo "bad method ".$_SERVER['REQUEST_METHOD']." instead of POST";
    exit;
}
if(!isset($_POST["fileName"])) {
    http_response_code(400);
    echo "the field 'fileName' is required";
    exit;
}

// archive one previous version
if(file_exists("/var/www/html/models/".$_POST["fileName"].".old"))
    unlink("/var/www/html/models/".$_POST["fileName"].".old");
if(file_exists("/var/www/html/models/".$_POST["fileName"]))
    rename("/var/www/html/models/".$_POST["fileName"], "/var/www/html/models/".$_POST["fileName"].".old");