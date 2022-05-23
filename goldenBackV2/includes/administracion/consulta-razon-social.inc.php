<?php


include '../Config.php';
include '../dbh.php';
include '../postAndToken.php';

$ret = 'error';

$usuario = $_POST['USUARIO'];

$query = "SELECT * FROM users WHERE username='$usuario'"; 
$result = sqlsrv_query($conn, $query);
$res = sqlsrv_fetch_array( $result, SQLSRV_FETCH_ASSOC);



$resp = array(
	'status' => 'succes',
	'code' => '200',
	'message' => 'OK',
	'data'=>$res['razon_social']
);
echo json_encode($resp);					
exit();	

