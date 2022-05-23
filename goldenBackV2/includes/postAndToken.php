<?php



include '../Config.php';
include '../Clases/auth.php';	

if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST)) 
$_POST = json_decode(file_get_contents('php://input'), true);

try{
    $auth = new Auth;
    $tokenData = $auth->getDataFromHeader();
}	
catch (Exception $e){
    $resp = array(
        'status' => 'succes',
        'code' => '403',
        'message' => 'No autorizado'
    );
    echo json_encode($resp);					
    exit();
}