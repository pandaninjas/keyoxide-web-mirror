<?php

$fingerprint = urlencode($_GET["fp"]);
$user = urlencode($_GET["user"]);

$url = "https://hacker-news.firebaseio.com/v0/user/$user.json";
$check = "\[Verifying my OpenPGP key: openpgp4fpr:$fingerprint\]";

$ch = curl_init();
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $url);
$result = curl_exec($ch);
curl_close($ch);
$data = json_decode($result, true);

$response = array();
$response["verified"] = false;
$response["fingerprint"] = $fingerprint;
$response["user"] = $user;

if (preg_match("/{$check}/i", $data["about"])) {
    $response["verified"] = true;
}

echo json_encode($response);

?>
