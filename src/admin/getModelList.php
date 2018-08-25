<?php

if($_SERVER['REQUEST_METHOD'] !== "GET") {
    http_response_code(400);
    echo "bad method ".$_SERVER['REQUEST_METHOD']." instead of GET";
    exit;
}

function getDirContents($dir, &$results = array()){
    $files = scandir($dir);

    foreach($files as $key => $value){
        $path = realpath($dir.DIRECTORY_SEPARATOR.$value);
        if(!is_dir($path)) {
            $results[] = $path;
        } else if($value !== "." && $value !== "..") {
            getDirContents($path, $results);
        }
    }

    return $results;
}

header('Content-type:application/json;charset=utf-8');

echo json_encode(array_values(array_filter(getDirContents(__DIR__."/../models"), function($v) {
    return !preg_match('/.*\.old/', $v);
})));