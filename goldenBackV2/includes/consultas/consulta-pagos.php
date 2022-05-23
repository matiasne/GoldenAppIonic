<?php 

//include '../header.php';
include '../Config.php';
include '../dbh.php';	
include '../postAndToken.php';


  class Tabla{
    public $columns = array(
      array(
        "prop" => "DT_EMISION.date",
        "name" => "Emision"
      ),
      array(
        "prop" => "Comprobante",
        "name" => "Comprobante"
      ),
      array(
        "prop" => "Numero",
        "name" => "Numero"
      ),
      array(
        "prop" => "Numero",
        "name" => "Numero"
      ),
      array(
        "prop" => "VL_TOTAL",
        "name" => "Total"
      ),
      array(
        "prop" => "mas",
        "name" => "Más"
      ),
      array(
        "prop" => "pdf",
        "name" => "PDF"
      )
    );
    public $rows = [];
  }

  $tabla = new Tabla();

  $fechaDesde = $_POST['fechaDesde'];
  $fechaHasta = $_POST['fechaHasta'];
  $EntidadSQL = $tokenData->idEntidadSQL;

  $dateDesde = new DateTime($fechaDesde);
  $dateHasta = new DateTime($fechaHasta);

	$query= "SELECT     CC_RECIBOS.DT_EMISION, CBTES.DS_CBTE AS Comprobante, 
                      CC_RECIBOS.TP_RECIBO + ' ' + CC_RECIBOS.NO_EMISOR + '-' + CC_RECIBOS.NO_RECIBO AS Numero, CC_RECIBOS.VL_TOTAL, CC_RECIBOS.ID_CC_RECIBO, CC_RECIBOS.NO_RECIBO
  FROM         CC_RECIBOS INNER JOIN
                        CBTES ON CC_RECIBOS.ID_CBTE = CBTES.ID_CBTE
  WHERE     (CC_RECIBOS.ID_ENTIDAD = '$EntidadSQL') ORDER BY  CC_RECIBOS.DT_EMISION
";

$result = sqlsrv_query($conn_pagos, $query);

while($myRow = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)){ 


  $myRow['VL_TOTAL'] = number_format($myRow['VL_TOTAL'], 2, ',', '.');

   

  if ($dateDesde < $myRow['DT_EMISION'] ){
    if($dateHasta > $myRow['DT_EMISION']){
      array_push($tabla->rows,$myRow);
    }
  }
}

$resp = array(
  'status' => 'succes',
  'code' => '200',
  'message' => 'OK',
  'data' =>$tabla
);
echo json_encode($resp);					
exit();	
	


?>