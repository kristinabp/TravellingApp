<?php
require 'vendor/autoload.php';

use GuzzleHttp\Client;

function fetchWeather($date) {
    $client = new Client();
    $url = "https://api.open-meteo.com/weather?date=2024-05-14&latitude=LATITUDE&longitude=LONGITUDE&hour=12&timezone=Europe%2FBerlin";
    
    try {
        $response = $client->request('GET', $url);
        
        $data = json_decode($response->getBody()->getContents(), true);
        return $data;
    } catch (\Exception $e) {
        return ['error' => $e->getMessage()];
    }
}

//if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //$date = $_POST['date'];
    $date = '2024-05-14';

    $weatherData = fetchWeather($date);

    $client = new Client();
    $client->request('POST', 'http://localhost:3000/weather', [
        'json' => $weatherData,
    ]);

    header('Content-Type: application/json');
    echo json_encode(['success' => true]);
// } else {
//     header('Content-Type: application/json');
//     http_response_code(405);
//     echo json_encode(['error' => 'Method not allowed']);
// }
?>
