<?php

include '../Config.php';
include '../dbh.php';
include '../postAndToken.php';

	$auth = new Auth;

    $idEntidad = 0;
	$tokenData = $auth->getDataFromHeader();	
	$idEntidad = $tokenData->idEntidad;


    $target_dir = "../uploads/".$idEntidad."/";
            
    $ficheros1  = scandir($target_dir);

    
    $resp = array(
        'status' => 'succes',
        'code' => '200',
        'message' => 'OK',
        'data'=>$ficheros1,
	'idEntidad'=>$idEntidad
    );
    echo json_encode($resp);					
    exit();	


    
?>