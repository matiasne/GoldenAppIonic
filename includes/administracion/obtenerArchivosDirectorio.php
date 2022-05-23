<?php
    ini_set('display_errors',1);
    error_reporting(E_ALL);
    
    $urlDirectorio = $_POST["urlDirectorio"]; //Acá el directorio completo que quiere ver
    
    //echo $urlDirectorio;
    //$folderName=$_POST["folderName"]; //Siempre con / al final

    //$nombreUsuario = $_POST["nombreUsuario"];

    //$target_dir = "../uploads/".$nombreUsuario."/";
    //"../uploads/".$nombreUsuario."/" es la base

    $ficheros1  = scandir($urlDirectorio);

    $tipos = array();
    $fullpaths = array();
    foreach ($ficheros1 as $result) {
        if ($result === '.' or $result === '..') {
            array_push($tipos, "d");
        }    
        if (is_dir($urlDirectorio . '/' . $result)) {
            //code to use if directory
            array_push($tipos, "d");
            array_push($fullpaths, $urlDirectorio.$result."/");
        }
        else{
            array_push($tipos, "f");
            array_push($fullpaths, $urlDirectorio.$folderName."/".$result);
        }

        //echo $result."\r";
    }


    $resultado = array(
        'code' => "200",
        'archivos' => $ficheros1,
        'tipos' => $tipos,
        'fullpaths' => $fullpaths
    );    
    echo json_encode($resultado);


?>