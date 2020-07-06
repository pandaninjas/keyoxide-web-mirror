<?php

$fingerprint = urlencode($_GET["fp"]);
$url = htmlspecialchars($_GET["url"]);

$urlProof = $url.".json";
$check = "\[Verifying my OpenPGP key: openpgp4fpr:$fingerprint\]";

$ch = curl_init();
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL, $urlProof);
$result = curl_exec($ch);
curl_close($ch);
$data = json_decode($result, true);

$response = array();
$response["isDiscourse"] = false;

if (isset($data) && array_key_exists("user", $data) && array_key_exists("bio_raw", $data["user"])) {
    $response["isDiscourse"] = true;
    $response["fingerprint"] = $fingerprint;
    $response["user"] = $data["user"]["username"];
    $response["verified"] = false;
}

if (preg_match("/{$check}/i", $data["user"]["bio_raw"])) {
    $response["verified"] = true;
}

echo json_encode($response);

?>
