<?php
// Copyright (C) 2020 Yarmo Mackenbach
//
// This program is free software: you can redistribute it and/or modify it under
// the terms of the GNU Affero General Public License as published by the Free
// Software Foundation, either version 3 of the License, or (at your option)
// any later version.
//
// This program is distributed in the hope that it will be useful, but WITHOUT
// ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
// details.
//
// You should have received a copy of the GNU Affero General Public License along
// with this program. If not, see <https://www.gnu.org/licenses/>.
//
// Also add information on how to contact you by electronic and paper mail.
//
// If your software can interact with users remotely through a computer network,
// you should also make sure that it provides a way for users to get its source.
// For example, if your program is a web application, its interface could display
// a "Source" link that leads users to an archive of the code. There are many
// ways you could offer source, and different solutions will be better for different
// programs; see section 13 for the specific requirements.
//
// You should also get your employer (if you work as a programmer) or school,
// if any, to sign a "copyright disclaimer" for the program, if necessary. For
// more information on this, and how to apply and follow the GNU AGPL, see <https://www.gnu.org/licenses/>.
?>
<?php

include 'secrets.php';

$fingerprint = urlencode($_GET["fp"]);
$tweetId = urlencode($_GET["id"]);

$check = "\[Verifying my OpenPGP key: openpgp4fpr:$fingerprint\]";

$response = array();
$response["verified"] = false;
$response["fingerprint"] = $fingerprint;
$response["tweetId"] = $tweetId;
$response["text"] = $data["data"]["text"];

if (!is_null($twitter_api_auth)) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', $twitter_api_auth));
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_URL, "https://api.twitter.com/labs/2/tweets/$tweetId?tweet.fields=author_id,created_at,id,source,text");
    $result = curl_exec($ch);
    curl_close($ch);
    $data = json_decode($result, true);

    if (preg_match("/{$check}/i", $data["data"]["text"])) {
        $response["verified"] = true;
    }
}

echo json_encode($response);

?>
