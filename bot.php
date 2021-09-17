<?php
$token = '1927984192:AAHCuuVu7cJ02H0H3XJw1AlcLmE2ONL-iCU';
$website = 'https://api.telegram.org/bot'.$token;

$input = file_get_contents('php://input');
$update = json_decode($input, TRUE);

$chatId = $update['message']['chat']['id'];
$message = $update['message']['text'];

switch($message) {
    case '/start':
        $response = '¡Hola! Soy el bot que te ayudará a organizarte :)';
        sendMessage($chatId, $response);
        break;
    case '/info':
        $response = '¡Hola! Soy @HMLA_bot. Mi creador es @horacio507';
        sendMessage($chatId, $response);
        break;
    
    case '/license':
        $response = 'GNU General Public License'
        sendMessage($chatId, $response);
        break;
}

function sendMessage($chatId, $response) {
    $url = $GLOBALS['website'].'/sendMessage?chat_id='.$chatId.'&parse_mode=HTML&text='.urlencode($response);
    file_get_contents($url);
}
?>