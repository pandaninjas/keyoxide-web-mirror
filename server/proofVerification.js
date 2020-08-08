const bent = require('bent');
const getJSON = bent('json');
require('dotenv').config();

const Proxy = async (params) => {
    let res = {
        success: false,
        errors: [],
        isVerified: false,
        params: params
    }

    if (!res.params.checkClaim) {
        switch (res.params.checkClaimFormat) {
            default:
            case "uri":
                res.params.checkClaim = `openpgp4fpr:${res.params.fingerprint}`;
                break;
            case "message":
                res.params.checkClaim = `[Verifying my OpenPGP key: openpgp4fpr:${res.params.fingerprint}]`;
                break;
            case "fingerprint":
                res.params.checkClaim = res.params.fingerprint;
                break;
        }
    }

    const obj = await getJSON(res.params.url);
    res.isVerified = VerifyJsonProof(obj, res.params.checkPath, res.params.checkClaim, res.params.checkRelation);

    return res;
};

const Twitter = async (params) => {
    let res = {
        success: false,
        errors: [],
        isVerified: false,
        params: params
    }

    let twitter_api_auth = process.env.TWITTER_API_AUTH;
    if (!twitter_api_auth) {
        res.errors.push("No Twitter API auth token provided");
        return res;
    }

    let proofUrl = `https://api.twitter.com/labs/2/tweets/${res.params.tweetId}?tweet.fields=author_id,created_at,id,source,text`;
    let re = new RegExp(`[Verifying my OpenPGP key: openpgp4fpr:${res.params.fingerprint}]`, "gi");

    const get = bent('GET', 'json', {'Content-Type': 'application/json', 'Authorization': `Bearer ${twitter_api_auth}`});
    const obj = await get(proofUrl);
    res.isVerified = re.test(obj.data.text);

    return res;
};

const VerifyJsonProof = (data, checkPath, checkClaim, checkRelation) => {
    let isVerified = false;

    if (!data) {
        return isVerified;
    }

    if (checkPath.length == 0) {
        switch (checkRelation) {
            default:
            case 'contains':
                let re = new RegExp(checkClaim, "gi");
                return re.test(data);
                break;
            case 'eq':
                return data == checkClaim;
                break;
            case 'oneOf':
                return data.includes(checkClaim);
                break;
        }
    }

    if (Array.isArray(data)) {
        data.forEach((item, i) => {
            isVerified = isVerified || VerifyJsonProof(item, checkPath, checkClaim, checkRelation);
        });
    } else if (Array.isArray(data[checkPath[0]])) {
        data[checkPath[0]].forEach((item, i) => {
            isVerified = isVerified || VerifyJsonProof(item, checkPath.slice(1), checkClaim, checkRelation);
        });
    } else {
        isVerified = isVerified || VerifyJsonProof(data[checkPath[0]], checkPath.slice(1), checkClaim, checkRelation);
    }

    return isVerified;
}

exports.Proxy = Proxy;
exports.Twitter = Twitter;

// include 'secrets.php';
//
// $fingerprint = urlencode($_GET["fp"]);
// $tweetId = urlencode($_GET["id"]);
//
// $check = "\[Verifying my OpenPGP key: openpgp4fpr:$fingerprint\]";
//
// $response = array();
// $response["verified"] = false;
// $response["fingerprint"] = $fingerprint;
// $response["tweetId"] = $tweetId;
// $response["text"] = $data["data"]["text"];
//
// if (!is_null($twitter_api_auth)) {
//     $ch = curl_init();
//     curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', $twitter_api_auth));
//     curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
//     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//     curl_setopt($ch, CURLOPT_URL, "https://api.twitter.com/labs/2/tweets/$tweetId?tweet.fields=author_id,created_at,id,source,text");
//     $result = curl_exec($ch);
//     curl_close($ch);
//     $data = json_decode($result, true);
//
//     if (preg_match("/{$check}/i", $data["data"]["text"])) {
//         $response["verified"] = true;
//     }
// }
//
// echo json_encode($response);
