<?php
$pdo  = NULL;
$dbhost     = "Roca12\sqlexpress";
$dbusername = "Golden";
$dbuserpass = "golden";

function get_PDO($dbname)
{
    global $pdo, $dbhost, $dbusername, $dbuserpass;

    if (!$pdo){ 
        $pdo = new PDO('sqlsrv:Server='.$dbhost.';Database='.$dbname, $dbusername, $dbuserpass);        
    }

    if (!$pdo) {
        return 0;
    } else {
        return $pdo;
    } // if

} // db_connect


function close_PDO($stmt){
    $stmt->closeCursor();
    $stmt = null;
    $pdo = null;
}