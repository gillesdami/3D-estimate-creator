<?php
// send estimation mail
$apiKey = ''; //sendinblue api key DO NOT LET IN THE CODE
$to = ''; //target mail address DO NOT LET IN THE CODE

$data = json_decode(file_get_contents('php://input'), true);

$postField  = array(
    "sender" => array(
        "name" => $data["clientName"],
        "email" => $data["clientEmail"],
    ),
    "replyTo" => array(
        "name" => $data["clientName"],
        "email" => $data["clientEmail"],
    ),
    "to" => array( 
        array(
            "name" => "atawa",
            "email" => $to,
        )
    ),
    "textContent" => $data["content"],
    "subject" => "Demande d'estimation"
);

$curl = curl_init();

curl_setopt_array($curl, array(
    CURLOPT_URL => "https://api.sendinblue.com/v3/smtp/email",
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => "",
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => "POST",
    CURLOPT_POSTFIELDS => json_encode($postField),
    CURLOPT_HTTPHEADER => ['Content-Type: application/json', 'api-key: '.$apiKey]
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
    echo "Internal server error";
} else {
    $res = json_decode($response);

    if (isset($res->code)) {
        echo "Erreur: " . $response;
    } else {
        echo "true";
    }
}