<?php
    include '../Config.php';
    include '../dbh.php';
    include '../postAndToken.php';
    
    $nombreUsuario = $_POST["nombreUsuario"];
    $nombreArchivo = $_POST["nombreArchivo"];
    
            
    $include_delete = realpath(__DIR__ . '/..');

    $delete_file = $include_delete."\\uploads\\".trim($nombreUsuario)."\\".$nombreArchivo;
    
    unlink($delete_file);

    $target_dir = "..\\uploads\\".$nombreUsuario."\\";
    $ficheros1  = scandir($target_dir);

  
$resp = array(
	'status' => 'succes',
	'code' => '200',
	'message' => 'OK',
	'data'=>$ficheros1
);
echo json_encode($resp);					
exit();	



?>