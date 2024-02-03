<?php
use \Mailjet\Resources;

$env = parse_ini_file('.env');

$apikey = $env['MJ_APIKEY_PUBLIC'];
$apisecret = $env['MJ_APIKEY_PRIVATE'];

// log the api key to the server console
error_log("key: " . $apikey);

$file = 'entries.json';


if($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the post request body
    $json = file_get_contents('php://input');
    echo $json;
    // add the new entry to the json file and keep the current entries

    // get the current entries
    $current = file_get_contents($file);
    // decode the json to an array
    $current = json_decode($current, true);
    // add the new entry to the array
    $current[] = json_decode($json, true);

    // encode the array back to json
    $json = json_encode($current);
    // write the json to the file
    file_put_contents($file, $json);
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $json = file_get_contents($file);
}

?>