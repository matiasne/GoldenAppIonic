<?php

include '../Config.php';
include '../dbh.php';
include '../postAndToken.php';

$usuario = $_POST['usuario'];
$contrasena = $_POST['contrasena'];
$confirmar_contrasena = $_POST['conf-contrasena'];


if($contrasena != $confirmar_contrasena){
	echo 'error validando contraseña';
	exit();
}

if(empty($usuario)){
	echo 'cuit_vacio';
	exit();
}

if(empty($contrasena)){
	echo 'contrasena vacia';
	exit();
}

if(empty($confirmar_contrasena)){
	echo 'confirmacion contrasena vacia';
	exit();
}
else{

	$query = "UPDATE users SET password='$contrasena' WHERE username='$usuario'";
	
	if (!sqlsrv_query($conn, $query))
    {            
        if( ($errors = sqlsrv_errors() ) != null) {
        	foreach( $errors as $error ) {
	            echo "SQLSTATE: ".$error[ 'SQLSTATE']."<br />";
	            echo "code: ".$error[ 'code']."<br />";
	            echo "message: ".$error[ 'message']."<br />";
        	}
        	die();
    	}
    }		
	$resp = array(
        'status' => 'succes',
        'code' => '200',
        'message' => 'OK'
    );
	echo json_encode($resp);					
    exit();	
	
}