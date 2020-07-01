<?php

$fingerprint = urlencode($_GET["fp"]);
$user = urlencode($_GET["user"]);
$comment = urlencode($_GET["comment"]);

$url = "https://www.reddit.com/user/$user/comments/$comment.json";
$check = "\[Verifying my OpenPGP key: openpgp4fpr:$fingerprint\\\\\]";

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
$response["comment"] = $comment;

foreach ($data as $entry) {
    $entryData = $entry["data"]["children"];

    foreach ($entryData as $subEntry) {
        if (preg_match("/{$check}/i", $subEntry["data"]["selftext"])) {
            $response["verified"] = true;
        }
    }
}

echo json_encode($response);

?>
