<?php


	include '../header.php';
	include '../dbh.php';	
	include '../estadisticas.php';
	//insertarEstadistica($conn,$_POST['usuario'],"consulta-entrega");
    class Tabla
    {
        public $columns = array(
			array(
				"prop" => "DT_BRUTO",
				"name" => "Fecha"
			),
			array(
				"prop" => "TP_EMISOR",
				"name" => "Tipo"
			),
			array(
				"prop" => "ID_SOM_MOVIM_EXTERNO",
				"name" => "Cartaporte"
			),
			array(
				"prop" => "QT_DESTINO_NETO",
				"name" => "Kg. Neto"
			),
			array(
				"prop" => "PC_HUMEDAD",
				"name" => "% Hdad"
			),
			array(
				"prop" => "PC_MERMA_HUMEDAD",
				"name" => "% Merma Humedad"
			),
			array(
				"prop" => "PC_TIERRA",
				"name" => "% Merma Tierra"
			),
			array(
				"prop" => "PC_CPOS_EXT",
				"name" => "% Merma Cpos. ext."
			),
			array(
				"prop" => "KGSECOS",
				"name" => "Kg Secos y Limpios"
			),
			array(
				"prop" => "PC_SUELTOS",
				"name" => "% Sueltos"
			),
			array(
				"prop" => "PC_MANI_COMERCIAL",
				"name" => "% Mani"
			),
			array(
				"prop" => "Confiteria",
				"name" => "% Confiteria"
			),
			array(
				"prop" => "NO_CAC",
				"name" => "Nro Certificado"
			),
			array(
				"prop" => "KGSECOS",
				"name" => "Kilos Secos"
			),
			array(
				"prop" => "DS_CAMPO",
				"name" => "Nombre del Campo"
			),

		);			
        public $rows =[];       
    }



    $resultadoTabla = new Tabla();



	
	$fechaDesde = $_POST['fechaDesde'];
	$fechaHasta = $_POST['fechaHasta'];

	$dateDesde = new DateTime($fechaDesde);
	$dateHasta = new DateTime($fechaHasta);

	$stringDesde = $dateDesde->format('Y/m/d');
	$stringHasta = $dateHasta->format('Y/m/d');

	$contrato = $_POST['contrato'];	

	
	$cosecha = $_POST['cosecha'];





	if($cosecha == "15/16"){
		$cosecha = "37";		
	}
	if($cosecha == "16/17"){
		$cosecha = "38";		
	}

	if($cosecha == "17/18"){
		$cosecha = "39";		
	}

	if($cosecha == "18/19"){
		$cosecha = "40";		
	}

	if($cosecha == "19/20"){
		$cosecha = "41";
		
	}

	if($cosecha == "20/21"){
		$cosecha = "42";		
	}

	if($cosecha == "21/22"){
		$cosecha = "43";		
	}
	

	$query = "SELECT * FROM MANI_CONTRATOS WHERE CD_CONTRATO = '$contrato'";

	$result = sqlsrv_query($conn, $query);	

	$row = sqlsrv_fetch_array( $result, SQLSRV_FETCH_ASSOC);
	$idContrato = (int)$row['ID_CONTRATO'];	
	$Entidad = $_POST['ID_ENTIDAD'];

	$query = "SELECT  MANI_ENTIDADES.ID_ENTIDAD, MANI_ENTIDADES.DS_RAZON_SOCIAL, MANI_CONTRATOS.CD_CONTRATO, 'MANI EN CAJA' AS ESPECIE, 
                      MANI_SOM_MOVIM.DT_BRUTO, MANI_SOM_MOVIM.NO_CBTE, MANI_SOM_MOVIM.ID_SOM_MOVIM_EXTERNO, MANI_SOM_MOVIM.QT_DESTINO_NETO, 
                      MANI_SOM_ANALISIS.PC_HUMEDAD, MANI_CALIDADES.PC_MERMA_HUMEDAD + Case when MANI_CALIDADES.PC_MERMA_HUMEDAD = 0 then 0 else  0.25 end AS PC_MERMA_HUMEDAD,
		      MANI_SOM_ANALISIS.PC_TIERRA, 
                      MANI_SOM_ANALISIS.PC_CPOS_EXT, MANI_SOM_MOVIM.QT_DESTINO_NETO * ((100 - MANI_CALIDADES.PC_MERMA_HUMEDAD - Case when MANI_CALIDADES.PC_MERMA_HUMEDAD = 0 then 0 else  0.25 end) / 100) 
                      - (MANI_SOM_MOVIM.QT_DESTINO_NETO * ((100 - MANI_CALIDADES.PC_MERMA_HUMEDAD - Case when MANI_CALIDADES.PC_MERMA_HUMEDAD = 0 then 0 else  0.25 end) / 100)) 
                      * (MANI_SOM_ANALISIS.PC_TIERRA + MANI_SOM_ANALISIS.PC_CPOS_EXT) / 100 AS SecoLimpio, 
                      ROUND((MANI_SOM_MOVIM.QT_DESTINO_NETO * ((100 - MANI_CALIDADES.PC_MERMA_HUMEDAD - Case when MANI_CALIDADES.PC_MERMA_HUMEDAD = 0 then 0 else  0.25 end) / 100) * MANI_SOM_ANALISIS.PC_SUELTOS / 100) 
                      / (MANI_SOM_MOVIM.QT_DESTINO_NETO * ((100 - MANI_CALIDADES.PC_MERMA_HUMEDAD - Case when MANI_CALIDADES.PC_MERMA_HUMEDAD = 0 then 0 else  0.25 end) / 100) 
                      - (MANI_SOM_MOVIM.QT_DESTINO_NETO * ((100 - MANI_CALIDADES.PC_MERMA_HUMEDAD - Case when MANI_CALIDADES.PC_MERMA_HUMEDAD = 0 then 0 else  0.25 end) / 100)) 
                      * (MANI_SOM_ANALISIS.PC_TIERRA + MANI_SOM_ANALISIS.PC_CPOS_EXT) / 100) * 100, 2) AS PC_SUELTOS, 
                      ROUND((MANI_SOM_MOVIM.QT_DESTINO_NETO * ((100 - MANI_CALIDADES.PC_MERMA_HUMEDAD - Case when MANI_CALIDADES.PC_MERMA_HUMEDAD = 0 then 0 else  0.25 end) / 100) * MANI_SOM_ANALISIS.PC_MANI_COMERCIAL / 100)
                       / (MANI_SOM_MOVIM.QT_DESTINO_NETO * ((100 - MANI_CALIDADES.PC_MERMA_HUMEDAD - Case when MANI_CALIDADES.PC_MERMA_HUMEDAD = 0 then 0 else  0.25 end) / 100) 
                      - (MANI_SOM_MOVIM.QT_DESTINO_NETO * ((100 - MANI_CALIDADES.PC_MERMA_HUMEDAD - Case when MANI_CALIDADES.PC_MERMA_HUMEDAD = 0 then 0 else  0.25 end) / 100)) 
                      * (MANI_SOM_ANALISIS.PC_TIERRA + MANI_SOM_ANALISIS.PC_CPOS_EXT) / 100) * 100, 2) AS PC_MANI_COMERCIAL, 
                      ROUND(MANI_SOM_ANALISIS.PC_ZA875+MANI_SOM_ANALISIS.PC_ZA8+MANI_SOM_ANALISIS.PC_ZA75+MANI_SOM_ANALISIS.PC_ZA725, 2) AS Confiteria, MANI_SOM_ANALISIS.IC_OK_CG,
		      MANI_SOM_ANALISIS.IC_OK_75, 
                      MANI_SOM_MOVIM.TP_EMISOR, MANI_SOM_C1116A.NO_CAC, 
                      ROUND(MANI_SOM_MOVIM.QT_DESTINO_NETO * ((100 - MANI_CALIDADES.PC_MERMA_HUMEDAD - Case when MANI_CALIDADES.PC_MERMA_HUMEDAD = 0 then 0 else  0.25 end) / 100), 0) AS KGSECOS, MANI_LUGARES.DS_LUGAR, 
                      MANI_LUGARES_CAMPOS.DS_CAMPO
                  FROM         MANI_SOM_MOVIM INNER JOIN
                      MANI_ENTIDADES ON MANI_SOM_MOVIM.ID_ENTIDAD = MANI_ENTIDADES.ID_ENTIDAD INNER JOIN
                      MANI_SOM_ANALISIS ON MANI_SOM_MOVIM.ID_SOM_MOVIM = MANI_SOM_ANALISIS.ID_SOM_MOVIM INNER JOIN
                      MANI_SOM_MOVIM_DETALLE ON MANI_SOM_MOVIM.ID_SOM_MOVIM = MANI_SOM_MOVIM_DETALLE.ID_SOM_MOVIM INNER JOIN
                      MANI_CONTRATOS ON MANI_SOM_MOVIM_DETALLE.ID_CONTRATO = MANI_CONTRATOS.ID_CONTRATO INNER JOIN
                      MANI_CALIDADES ON MANI_SOM_ANALISIS.PC_HUMEDAD = MANI_CALIDADES.PC_HUMEDAD LEFT OUTER JOIN
                      MANI_SOM_C1116A_DETALLE ON MANI_SOM_MOVIM.ID_SOM_MOVIM = MANI_SOM_C1116A_DETALLE.ID_SOM_MOVIM  LEFT JOIN
                      MANI_SOM_C1116A ON MANI_SOM_C1116A_DETALLE.ID_C1116A = MANI_SOM_C1116A.ID_C1116A AND MANI_SOM_C1116A.ID_ACTIVO_ESTADO = 1 LEFT OUTER JOIN
                      MANI_LUGARES ON MANI_SOM_MOVIM.CD_ORIGEN_LUGAR = MANI_LUGARES.CD_LUGAR LEFT OUTER JOIN
                      MANI_LUGARES_CAMPOS ON MANI_SOM_MOVIM.CD_ORIGEN_CAMPO = MANI_LUGARES_CAMPOS.CD_CAMPO			
                  WHERE     (MANI_SOM_MOVIM.ID_ENTIDAD = '$Entidad') AND (MANI_SOM_MOVIM_DETALLE.ID_CONTRATO = '$idContrato') 
		  AND (MANI_CONTRATOS.ID_COSECHA = '$cosecha') AND (MANI_SOM_MOVIM.QT_DESTINO_NETO <> 0)
		      /*AND (MANI_SOM_MOVIM.DT_BRUTO BETWEEN '$stringDesde' AND '$stringHasta')*/
                  
                  ORDER BY 5,21,6";
	
			  	$result = sqlsrv_query($conn, $query);

               
	while($myRow = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)){ 


		//Formateo a 2 dígitos
		$myRow['PC_HUMEDAD'] = sprintf('%0.2f', $myRow['PC_HUMEDAD']);  
		$myRow['PC_MERMA_HUMEDAD'] = sprintf('%0.2f', $myRow['PC_MERMA_HUMEDAD']);
		$myRow['PC_TIERRA'] = sprintf('%0.2f', $myRow['PC_TIERRA']);
		$myRow['PC_CPOS_EXT'] = sprintf('%0.2f', $myRow['PC_CPOS_EXT']);
		//$kgSecoLimpio = sprintf('%0.0f', $myRow['SecoLimpio']);
		$myRow['PC_SUELTOS'] = sprintf('%0.2f', $myRow['PC_SUELTOS']);
		$myRow['PC_MANI_COMERCIAL'] = sprintf('%0.2f', $myRow['PC_MANI_COMERCIAL']);  
		$myRow['Confiteria'] = sprintf('%0.2f', $myRow['Confiteria']);

		$myRow['QT_DESTINO_NETO'] = number_format((int)$myRow['QT_DESTINO_NETO'], 0, ',', '.');
		$myRow['SecoLimpio'] = number_format($myRow['SecoLimpio'], 0, ',', '');
		

		$myRow['PC_HUMEDAD'] = number_format($myRow['PC_HUMEDAD'], 2, ',', '.');
		$myRow['PC_MERMA_HUMEDAD'] = number_format($myRow['PC_MERMA_HUMEDAD'], 2, ',', '.');
		$myRow['PC_TIERRA'] = number_format($myRow['PC_TIERRA'], 2, ',', '.');
		$myRow['PC_CPOS_EXT'] = number_format($myRow['PC_CPOS_EXT'], 2, ',', '.');
		$myRow['PC_SUELTOS'] = number_format($myRow['PC_SUELTOS'], 2, ',', '.');
		$myRow['PC_MANI_COMERCIAL'] = number_format($myRow['PC_MANI_COMERCIAL'], 2, ',', '.');
		$myRow['Confiteria'] = number_format($myRow['Confiteria'], 2, ',', '.');

		$myRow['NO_CAC'] = (string) $myRow['NO_CAC']."_";

		//Si el analisis no ha sido realizdo no mostrar los últimos tres valores
		if($myRow['IC_OK_CG'] != "1"){
			$myRow['PC_SUELTOS'] = "";
			$myRow['PC_MANI_COMERCIAL'] = "";
		}

		//Si el analisis no ha sido autorizado no mostrar el último valor
		if($myRow['IC_OK_75'] != "1"){
			$myRow['Confiteria'] = "";
		}		  		

		
		if($myRow['NO_CAC'] == ""){
			$myRow['KGSECOS'] = "";
		}


		if ($dateDesde <= $myRow['DT_BRUTO'] ){
			if($dateHasta >= $myRow['DT_BRUTO']){
				array_push($resultadoTabla->rows,$myRow);
			}
		}
	}

echo json_encode($resultadoTabla);					
exit();
	


