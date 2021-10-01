<?php

// Allow cors
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: *');
    die();
}
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

function file_get($url, $headers = [])
{
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url); # URL to post to
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); # return into a variable
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers); # custom headers, see above
    $result = curl_exec($ch); # run!
    curl_close($ch);
    return $result;
}

$url = $_SERVER['QUERY_STRING'];
$headers = getallheaders();

header("x-url: $url\n");
echo file_get($url, $headers);