<?php
    include '../Config.php';
    include '../dbh.php';
    include '../postAndToken.php';
    
    $idEntidad = $_POST["idEntidad"];
    $target_dir = "../uploads/".$idEntidad."/";
            
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