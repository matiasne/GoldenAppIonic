<?php
	include '../Config.php';
	include '../dbh.php';	
	include '../postAndToken.php';


	$idEntidad = $tokenData->idEntidad;
	

	
	
	
	$query = "SELECT C.CD_CONTRATO, C.ID_COSECHA FROM MANI_CONTRATOS C LEFT JOIN MANI_CONTRATO_ENTIDADES CE ON C.ID_CONTRATO = CE.ID_CONTRATO WHERE (C.ID_ENTIDAD = '$idEntidad' OR CE.ID_ENTIDAD = '$idEntidad') ORDER BY C.CD_CONTRATO";

	$result = sqlsrv_query($conn, $query);

	if( ($errors = sqlsrv_errors() ) != null) {
    	foreach( $errors as $error ) {
            echo "SQLSTATE: ".$error[ 'SQLSTATE']."<br />";
            echo "code: ".$error[ 'code']."<br />";
            echo "message: ".$error[ 'message']."<br />";
    	}
    	die();
	}



	$rows = array();
	while($r = sqlsrv_fetch_array( $result, SQLSRV_FETCH_ASSOC)) {		
	    $rows[] = $r;
	}
	

	$data = [];

	if($tokenData->admin == 1)
	{
		$data = $rows[3];
	}
	else{
		$data = $rows;
	}

	
	$resp = array(
		'status' => 'succes',
		'code' => '200',
		'message' => 'OK',
		'data' =>$data
	  );
	  echo json_encode($resp);					
	  exit();

	
?>