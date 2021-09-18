<?php
$token = 'TOKENID';
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
        $response = '**GNU General Public License.**
⬇️⬇️⬇️
Ver código: https://github.com/horacio507/HMLA_Bot';
        sendMessage($chatId, $response);
        break;

    case '/noticias':
        getNoticias($chatId);
        break;
}

function sendMessage($chatId, $response) {
    $url = $GLOBALS['website'].'/sendMessage?chat_id='.$chatId.'&parse_mode=HTML&text='.urlencode($response);
    file_get_contents($url);
}

function getNoticias($chatId){
    
    include("simple_html_dom.php");

    $context = stream_context_create(array('http:' => array('header' => 'Accept: application/xml')));
    $url = "https://eljuande.com/feed";

    $xmlstring = file_get_contents($url, false, $context);

    $xml = simplexml_load_string($xmlstring, "SimpleXMLElement", LIBXML_NOCDATA);
    $json = json_encode($xml);
    $array = json_decode($json, TRUE);

    for ($i=0; $i < 9; $i++) {
        $titulos = $titulos."\n\n".$array['channel']['item'][$i]['title']."<a href='".$array['channel']['item'][$i]['link']."'> 
            +info</a>";
    }

    sendMessage($chatId, $titulos);
}
?>
