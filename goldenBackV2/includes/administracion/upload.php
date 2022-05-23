<?php
include '../Config.php';
include '../dbh.php';
//include '../postAndToken.php';


$nombreUsuario = $_POST["nombreUsuario"];
$target_dir = "../uploads/".$nombreUsuario."/";
$target_file = $target_dir . basename($_FILES["file"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));


if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}
// Check if file already exists
if (file_exists($target_file)) {

    $resp = array(
        'status' => 'error',
        'code' => '400',
        'message' => "El archivo ya existe.",
        'data'=>$resultado
    );
    echo json_encode($resp);					
    exit();	

    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
   

    $resp = array(
        'status' => 'error',
        'code' => '400',
        'message' => "Sorry, your file was not uploaded.",
        'data'=>$resultado
    );
    echo json_encode($resp);					
    exit();	

// if everything is ok, try to upload file
} else {
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)) {        
        $ficheros1  = scandir($target_dir);

        $resp = array(
            'status' => 'succes',
            'code' => '200',
            'message' => 'OK',
            'data'=>$ficheros1
        );
        echo json_encode($resp);					
        exit();	

    } else { 
        

        $resultado = array(
            'targetFile' => $target_file,
            'archivoTmp' => $_FILES["file"]["tmp_name"],

        );    

        $resp = array(
            'status' => 'error',
            'code' => '400',
            'message' => 'OK',
            'data'=>$resultado
        );
        echo json_encode($resp);					
        exit();	
        
    }
}
?>