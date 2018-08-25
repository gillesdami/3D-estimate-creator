<?php
// This script lacks security features, do not open to the public!

if($_SERVER['REQUEST_METHOD'] !== "POST") {
    http_response_code(400);
    echo "bad method ".$_SERVER['REQUEST_METHOD']." instead of POST";
    exit;
}

$entityBody = json_decode(file_get_contents('php://input'), true);

if(!isset($entityBody) && !isset($entityBody['fileName'])) {
    http_response_code(400);
    echo "the field 'fileName' is required";
    exit;
}

// archive one previous version
if(file_exists(__DIR__."/../models/".$entityBody['fileName'].".old"))
    unlink(__DIR__."/../models/".$entityBody['fileName'].".old");
if(file_exists(__DIR__."/../models/".$entityBody['fileName']))
    rename(__DIR__."/../models/".$entityBody['fileName'], __DIR__."/../models/".$entityBody['fileName'].".old");