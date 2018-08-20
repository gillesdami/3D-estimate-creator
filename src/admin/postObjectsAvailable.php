<?php
// This script lacks security features, do not open to the public!

if($_SERVER['REQUEST_METHOD'] !== "POST") {
    http_response_code(400);
    echo "bad method ".$_SERVER['REQUEST_METHOD']." instead of POST";
    exit;
}

// archive one previous version
if(file_exists("/var/www/html/objectsAvailable.json.old"))
    unlink("/var/www/html/objectsAvailable.json.old");
if(file_exists("/var/www/html/objectsAvailable.json"))
    rename("/var/www/html/objectsAvailable.json", "/var/www/html/objectsAvailable.json.old");
    
if (move_uploaded_file($_FILES['objectsAvailable']['tmp_name'], "/var/www/html/objectsAvailable.json")) {
    print_r($_FILES);
} else {
    http_response_code(500);
    exit;
}