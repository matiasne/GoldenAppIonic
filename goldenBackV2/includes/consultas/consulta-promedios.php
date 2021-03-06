<?php
include '../Config.php';
include '../dbh.php';	
include '../postAndToken.php';

$idEntidad = $tokenData->idEntidad;


	class Tabla{
        public $columns = array(
			array(
				"prop" => "dato",
				"name" => "Dato"
			),
			array(
				"prop" => "total",
				"name" => "Total"
			),
			array(
				"prop" => "promedio",
				"name" => "Promedio"
			)
		);
		public $rows = [];
	}

	$tablaTotales = new Tabla();
	$tablaTotalesPropios = new Tabla();
	$tablaTotalesTerceros = new Tabla();

	$contrato = $_POST['contrato'];	

	//echo $contrato;
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


	

	$query = "SELECT DISTINCT    MANI_ENTIDADES.ID_ENTIDAD, MANI_ENTIDADES.DS_RAZON_SOCIAL, MANI_CONTRATOS.CD_CONTRATO, 'MANI EN CAJA' AS ESPECIE, 
                      MANI_SOM_MOVIM.DT_BRUTO, MANI_SOM_MOVIM.NO_CBTE, MANI_SOM_MOVIM.ID_SOM_MOVIM_EXTERNO, MANI_SOM_MOVIM.QT_DESTINO_NETO, 
                      MANI_SOM_ANALISIS.PC_HUMEDAD, MANI_CALIDADES.PC_MERMA_HUMEDAD + MANI_CALIDADES.PC_MERMA_HUMEDAD +Case when MANI_CALIDADES.PC_MERMA_HUMEDAD =0 then 0 else + 0.25 end AS PC_MERMA_HUMEDAD, MANI_SOM_ANALISIS.PC_TIERRA, 
                      MANI_SOM_ANALISIS.PC_CPOS_EXT, MANI_SOM_MOVIM.QT_DESTINO_NETO * ((100 - MANI_CALIDADES.PC_MERMA_HUMEDAD - Case when MANI_CALIDADES.PC_MERMA_HUMEDAD =0 then 0 else + 0.25 end) / 100) 
                      - (MANI_SOM_MOVIM.QT_DESTINO_NETO * ((100 - MANI_CALIDADES.PC_MERMA_HUMEDAD - Case when MANI_CALIDADES.PC_MERMA_HUMEDAD =0 then 0 else + 0.25 end) / 100)) 
                      * (MANI_SOM_ANALISIS.PC_TIERRA + MANI_SOM_ANALISIS.PC_CPOS_EXT) / 100 AS SecoLimpio, 
                      ROUND((MANI_SOM_MOVIM.QT_DESTINO_NETO * ((100 - MANI_CALIDADES.PC_MERMA_HUMEDAD - Case when MANI_CALIDADES.PC_MERMA_HUMEDAD =0 then 0 else + 0.25 end) / 100) * MANI_SOM_ANALISIS.PC_SUELTOS / 100) 
                      / (MANI_SOM_MOVIM.QT_DESTINO_NETO * ((100 - MANI_CALIDADES.PC_MERMA_HUMEDAD - Case when MANI_CALIDADES.PC_MERMA_HUMEDAD =0 then 0 else + 0.25 end) / 100) 
                      - (MANI_SOM_MOVIM.QT_DESTINO_NETO * ((100 - MANI_CALIDADES.PC_MERMA_HUMEDAD - Case when MANI_CALIDADES.PC_MERMA_HUMEDAD =0 then 0 else + 0.25 end) / 100)) 
                      * (MANI_SOM_ANALISIS.PC_TIERRA + MANI_SOM_ANALISIS.PC_CPOS_EXT) / 100) * 100, 2) AS PC_SUELTOS, 
                      ROUND((MANI_SOM_MOVIM.QT_DESTINO_NETO * ((100 - MANI_CALIDADES.PC_MERMA_HUMEDAD - Case when MANI_CALIDADES.PC_MERMA_HUMEDAD =0 then 0 else + 0.25 end) / 100) * MANI_SOM_ANALISIS.PC_MANI_COMERCIAL / 100)
                       / (MANI_SOM_MOVIM.QT_DESTINO_NETO * ((100 - MANI_CALIDADES.PC_MERMA_HUMEDAD - Case when MANI_CALIDADES.PC_MERMA_HUMEDAD =0 then 0 else + 0.25 end) / 100) 
                      - (MANI_SOM_MOVIM.QT_DESTINO_NETO * ((100 - MANI_CALIDADES.PC_MERMA_HUMEDAD - Case when MANI_CALIDADES.PC_MERMA_HUMEDAD =0 then 0 else + 0.25 end) / 100)) 
                      * (MANI_SOM_ANALISIS.PC_TIERRA + MANI_SOM_ANALISIS.PC_CPOS_EXT) / 100) * 100, 2) AS PC_MANI_COMERCIAL, 
                      ROUND(MANI_SOM_ANALISIS.PC_ZA875+MANI_SOM_ANALISIS.PC_ZA8 + MANI_SOM_ANALISIS.PC_ZA75 + MANI_SOM_ANALISIS.PC_ZA725, 2) AS Confiteria, MANI_SOM_ANALISIS.IC_OK_CG, 
                      MANI_SOM_MOVIM.TP_EMISOR, MANI_SOM_C1116A.NO_CAC, 
                      ROUND(MANI_SOM_MOVIM.QT_DESTINO_NETO * ((100 - MANI_CALIDADES.PC_MERMA_HUMEDAD - Case when MANI_CALIDADES.PC_MERMA_HUMEDAD =0 then 0 else + 0.25 end) / 100), 0) AS KGSECOS, MANI_LUGARES.DS_LUGAR, 
                      MANI_LUGARES_CAMPOS.DS_CAMPO
                  FROM         MANI_SOM_MOVIM INNER JOIN
                      MANI_ENTIDADES ON MANI_SOM_MOVIM.ID_ENTIDAD = MANI_ENTIDADES.ID_ENTIDAD INNER JOIN
                      MANI_SOM_ANALISIS ON MANI_SOM_MOVIM.ID_SOM_MOVIM = MANI_SOM_ANALISIS.ID_SOM_MOVIM INNER JOIN
                      MANI_SOM_MOVIM_DETALLE ON MANI_SOM_MOVIM.ID_SOM_MOVIM = MANI_SOM_MOVIM_DETALLE.ID_SOM_MOVIM INNER JOIN
                      MANI_CONTRATOS ON MANI_SOM_MOVIM_DETALLE.ID_CONTRATO = MANI_CONTRATOS.ID_CONTRATO INNER JOIN
                      MANI_CALIDADES ON MANI_SOM_ANALISIS.PC_HUMEDAD = MANI_CALIDADES.PC_HUMEDAD LEFT OUTER JOIN
                      MANI_SOM_C1116A_DETALLE ON MANI_SOM_MOVIM.ID_SOM_MOVIM = MANI_SOM_C1116A_DETALLE.ID_SOM_MOVIM left JOIN
                      MANI_SOM_C1116A ON MANI_SOM_C1116A_DETALLE.ID_C1116A = MANI_SOM_C1116A.ID_C1116A AND MANI_SOM_C1116A.ID_ACTIVO_ESTADO = 1 LEFT OUTER JOIN
                      MANI_LUGARES ON MANI_SOM_MOVIM.CD_ORIGEN_LUGAR = MANI_LUGARES.CD_LUGAR LEFT OUTER JOIN
                      MANI_LUGARES_CAMPOS ON MANI_SOM_MOVIM.CD_ORIGEN_CAMPO = MANI_LUGARES_CAMPOS.CD_CAMPO			
                  WHERE  MANI_SOM_MOVIM.QT_DESTINO_NETO <> 0 AND    (MANI_SOM_MOVIM.ID_ENTIDAD = '$idEntidad') AND (MANI_SOM_MOVIM_DETALLE.ID_CONTRATO = '$idContrato') AND (MANI_CONTRATOS.ID_COSECHA = '$cosecha')
		      /*AND (MANI_SOM_MOVIM.DT_BRUTO BETWEEN '$stringDesde' AND '$stringHasta')*/
                  
                  
                  ORDER BY 5,21,6";

			  	//$result = odbc_exec($conexion, $query);	
			  	

			  	
			  	$conunterManiComercial = 0;
			  	$conunterSueltos = 0;
			  	$conunterConfiteria = 0;		  	

			  	$sumKgNeto = 0;
			  	$sumKgSecoLimpio = 0;
			  	$sumPcManiComercial = 0;
			  	$sumConfiteria = 0;
			  	$sumPcSueltos = 0;

				$cantidadMani = 0;
				$cantidadGSuelto = 0;
				$cantidadConfiteria = 0;

			  	$conunterManiComercial_propios = 0;
			  	$conunterSueltos_propios = 0;
			  	$conunterConfiteria_propios = 0;		  	

			  	$sumKgNeto_propios = 0;
			  	$sumKgSecoLimpio_propios = 0;
			  	$sumPcManiComercial_propios = 0;
			  	$sumConfiteria_propios = 0;
			  	$sumPcSueltos_propios = 0;

			  	$conunterManiComercial_terceros = 0;
			  	$conunterSueltos_terceros = 0;
			  	$conunterConfiteria_terceros = 0;		  	

			  	$sumKgNeto_terceros = 0;
			  	$sumKgSecoLimpio_terceros = 0;
			  	$sumPcManiComercial_terceros = 0;
			  	$sumConfiteria_terceros = 0;
			  	$sumPcSueltos_terceros = 0;

				  $cantidadMani_terceros = 0;
				  $cantidadGSuelto_terceros = 0;
				  $cantidadConfiteria_terceros = 0;


			  	$result = sqlsrv_query($conn, $query);	
				  
				  $counter = 0;

			  	while($myRow = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)){ 			  		

			  		if ($dateDesde <= $myRow['DT_BRUTO'] ){
			  			if($dateHasta >= $myRow['DT_BRUTO']){		  				
					  		
					  		$counter++;
					  		
					  		//Obtengo las variables con dos decimales
					  		$kgNeto =sprintf('%0.2f', $myRow['QT_DESTINO_NETO']);
					  		$kgSecoLimpio = sprintf('%0.2f', $myRow['SecoLimpio']);					  		

					  		$pcManiComercial = sprintf('%0.2f', $myRow['PC_MANI_COMERCIAL']);  		  		
					  		$pcSueltos = sprintf('%0.2f', $myRow['PC_SUELTOS']);			  		
					  		$confiteria = sprintf('%0.2f', $myRow['Confiteria']);

					  		//Sumatoria completa
					  		$sumKgNeto += $kgNeto;
		    				$sumKgSecoLimpio += $kgSecoLimpio; 	
		    				
		    				//Sumatoria si confiteria no es cero
					  		if($myRow['IC_OK_CG'] != "0"){
					  			
					  			$sumPcSueltos += $pcSueltos;

					  			if($pcSueltos != 0)
					  				$conunterSueltos++;

					  			$sumPcManiComercial += $pcManiComercial;

					  			if($pcManiComercial != 0)
					  				$conunterManiComercial++;

					  			$sumConfiteria += $confiteria; 

					  			if($confiteria != 0)
					  				$conunterConfiteria++;

					  			//Por cada fila obtengo la cantidad en base al promedio
					  			$cantidadMani += $kgSecoLimpio * $pcManiComercial / 100;
					  			$cantidadGSuelto += $kgSecoLimpio * $pcSueltos /100;
					  			$cantidadConfiteria += $kgSecoLimpio * $confiteria /100;
					  		}

					  		if($myRow['TP_EMISOR'] == "P"){

					  			//Obtengo las variables con dos decimales
						  		$kgNeto_propios =sprintf('%0.2f', $myRow['QT_DESTINO_NETO']);
						  		$kgSecoLimpio_propios = sprintf('%0.2f', $myRow['SecoLimpio']);			  		

						  		$pcManiComercial_propios = sprintf('%0.2f', $myRow['PC_MANI_COMERCIAL']);  		
						  		$pcSueltos_propios = sprintf('%0.2f', $myRow['PC_SUELTOS']);			  		
						  		$confiteria_propios = sprintf('%0.2f', $myRow['Confiteria']);

						  		//Sumatoria completa
						  		$sumKgNeto_propios += $kgNeto_propios;
			    				$sumKgSecoLimpio_propios += $kgSecoLimpio_propios; 	
			    				
			    				//Sumatoria si confiteria no es cero
						  		if($myRow['IC_OK_CG'] != "0"){
						  			
						  			$sumPcSueltos_propios += $pcSueltos_propios;

						  			if($pcSueltos_propios != 0)
						  				$counterSueltos_propios++;

						  			$sumPcManiComercial_propios += $pcManiComercial_propios;

						  			if($pcManiComercial_propios != 0)
						  				$conunterManiComercial_propios++;

						  			$sumConfiteria_propios += $confiteria_propios;

						  			if($confiteria_propios != 0)
						  				$conunterConfiteria_propios++;

						  			//Por cada fila obtengo la cantidad en base al promedio
						  			$cantidadMani_propios += $kgSecoLimpio_propios * $pcManiComercial_propios / 100;
						  			$cantidadGSuelto_propios += $kgSecoLimpio_propios * $pcSueltos_propios /100;
						  			$cantidadConfiteria_propios += $kgSecoLimpio_propios * $confiteria_propios /100;
						  		}

					  		}

					  		if($myRow['TP_EMISOR'] == "T"){
					  			//Obtengo las variables con dos decimales
						  		$kgNeto_terceros =sprintf('%0.2f', $myRow['QT_DESTINO_NETO']);
						  		$kgSecoLimpio_terceros = sprintf('%0.2f', $myRow['SecoLimpio']);					  		

						  		$pcManiComercial_terceros = sprintf('%0.2f', $myRow['PC_MANI_COMERCIAL']);  		  		
						  		$pcSueltos_terceros = sprintf('%0.2f', $myRow['PC_SUELTOS']);			  		
						  		$confiteria_terceros = sprintf('%0.2f', $myRow['Confiteria']);

						  		//Sumatoria completa
						  		$sumKgNeto_terceros += $kgNeto_terceros;
			    				$sumKgSecoLimpio_terceros += $kgSecoLimpio_terceros; 	
			    				
			    				//Sumatoria si confiteria no es cero
						  		if($myRow['IC_OK_CG'] != "0"){
						  			
						  			$sumPcSueltos_terceros += $pcSueltos_terceros;

						  			if($pcSueltos_terceros != 0)
						  				$conunterSueltos_terceros++;

						  			$sumPcManiComercial_terceros += $pcManiComercial_terceros;

						  			if($pcManiComercial_terceros != 0)
						  				$conunterManiComercial_terceros++;

						  			$sumConfiteria_terceros += $confiteria_terceros;

						  			if($confiteria_terceros != 0) 
						  				$conunterConfiteria_terceros++;

						  			//Por cada fila obtengo la cantidad en base al promedio
						  			$cantidadMani_terceros += $kgSecoLimpio_terceros * $pcManiComercial_terceros / 100;
						  			$cantidadGSuelto_terceros += $kgSecoLimpio_terceros * $pcSueltos_terceros /100;
						  			$cantidadConfiteria_terceros += $kgSecoLimpio_terceros * $confiteria_terceros /100;
						  		}
					  		}				  		
		    			}
		    		}
			  	}			  	
				
				$promManiComercial = $sumPcManiComercial/$conunterManiComercial;
				$promSueltos = $sumPcSueltos/$conunterSueltos;				
				$promConfiteria = $sumConfiteria/$conunterConfiteria;
				//Formato para mostrar en App

				$sumKgNeto = number_format($sumKgNeto, 0, ',', '.');
				$sumKgSecoLimpio = number_format($sumKgSecoLimpio, 0, ',', '.');
				
				$cantidadMani = number_format($cantidadMani, 0, ',', '.');
				$cantidadGSuelto = number_format($cantidadGSuelto, 0, ',', '.');
				$cantidadConfiteria = number_format($cantidadConfiteria, 0, ',', '.');

				$promManiComercial = number_format($promManiComercial, 2, ',', '.');
		  		$promSueltos = number_format($promSueltos, 2, ',', '.');
		  		$promConfiteria = number_format($promConfiteria, 2, ',', '.');

				$fila['dato'] = "Total Kilogramos Netos" ;
				$fila['total'] = $sumKgNeto;
				$fila['promedio'] = "";
				array_push($tablaTotales->rows,$fila);

				$fila['dato'] = "Total Kilogramos Limpios y Secos" ;
				$fila['total'] = $sumKgSecoLimpio;
				$fila['promedio'] = "";
				array_push($tablaTotales->rows,$fila);

				$fila['dato'] = "Promedio Ponderado %  Man??" ;
				$fila['total'] = $cantidadMani;
				$fila['promedio'] = $promManiComercial;
				array_push($tablaTotales->rows,$fila);

				$fila['dato'] = "Promedio Ponderado % G. Sueltos" ;
				$fila['total'] = $cantidadGSuelto;
				$fila['promedio'] = $promSueltos;
				array_push($tablaTotales->rows,$fila);

				$fila['dato'] = "Promedio Ponderado % Confiter??a" ;
				$fila['total'] = $cantidadConfiteria;
				$fila['promedio'] = $promConfiteria;
				array_push($tablaTotales->rows,$fila);

		  		$promManiComercial_propios = $sumPcManiComercial_propios/$conunterManiComercial_propios;
				$promSueltos_propios = $sumPcSueltos_propios/$counterSueltos_propios;				
				$promConfiteria_propios = $sumConfiteria_propios/$conunterConfiteria_propios;
		  		//Formato para mostrar propios

		  		$sumKgNeto_propios = number_format($sumKgNeto_propios, 0, ',', '.');
				$sumKgSecoLimpio_propios = number_format($sumKgSecoLimpio_propios, 0, ',', '.');
				
				$cantidadMani_propios = number_format($cantidadMani_propios, 0, ',', '.');
				$cantidadGSuelto_propios = number_format($cantidadGSuelto_propios, 0, ',', '.');
				$cantidadConfiteria_propios = number_format($cantidadConfiteria_propios, 0, ',', '.');

				$promManiComercial_propios = number_format($promManiComercial_propios, 2, ',', '.');
		  		$promSueltos_propios = number_format($promSueltos_propios, 2, ',', '.');
		  		$promConfiteria_propios = number_format($promConfiteria_propios, 2, ',', '.');		  		

				$fila['dato'] = "Total Kilogramos Netos" ;
				$fila['total'] = $sumKgNeto_propios;
				$fila['promedio'] = "";
				array_push($tablaTotalesPropios->rows,$fila);

				$fila['dato'] = "Total Kilogramos Limpios y Secos" ;
				$fila['total'] = $sumKgSecoLimpio_propios;
				$fila['promedio'] = "";
				array_push($tablaTotalesPropios->rows,$fila);

				$fila['dato'] = "Promedio Ponderado %  Man??" ;
				$fila['total'] = $cantidadMani_propios;
				$fila['promedio'] = $promManiComercial_propios;
				array_push($tablaTotalesPropios->rows,$fila);

				$fila['dato'] = "Promedio Ponderado % G. Sueltos" ;
				$fila['total'] = $cantidadGSuelto_propios;
				$fila['promedio'] = $promSueltos_propios;
				array_push($tablaTotalesPropios->rows,$fila);

				$fila['dato'] = "Promedio Ponderado % Confiter??a" ;
				$fila['total'] = $cantidadConfiteria_propios;
				$fila['promedio'] = $promConfiteria_propios;
				array_push($tablaTotalesPropios->rows,$fila);
				
		  		$promManiComercial_terceros = $sumPcManiComercial_terceros/$conunterManiComercial_terceros;
				$promSueltos_terceros = $sumPcSueltos_terceros/$counterSueltos_terceros;				
				$promConfiteria_terceros = $sumConfiteria_terceros/$conunterConfiteria_terceros;
				//Formaro para mostrar terceros

		  		$sumKgNeto_terceros = number_format($sumKgNeto_terceros, 0, ',', '.');
				$sumKgSecoLimpio_terceros = number_format($sumKgSecoLimpio_terceros, 0, ',', '.');
				
				$cantidadMani_terceros = number_format($cantidadMani_terceros, 0, ',', '.');
				$cantidadGSuelto_terceros = number_format($cantidadGSuelto_terceros, 0, ',', '.');
				$cantidadConfiteria_terceros = number_format($cantidadConfiteria_terceros, 0, ',', '.');

				$promManiComercial_terceros = number_format($promManiComercial_terceros, 2, ',', '.');
		  		$promSueltos_terceros = number_format($promSueltos_terceros, 2, ',', '.');
		  		$promConfiteria_terceros = number_format($promConfiteria_terceros, 2, ',', '.');	
		  	

				$fila['dato'] = "Total Kilogramos Netos" ;
				$fila['total'] = $sumKgNeto_terceros;
				$fila['promedio'] = "";
				array_push($tablaTotalesTerceros->rows,$fila);

				$fila['dato'] = "Total Kilogramos Limpios y Secos" ;
				$fila['total'] = $sumKgSecoLimpio_terceros;
				$fila['promedio'] = "";
				array_push($tablaTotalesTerceros->rows,$fila);

				$fila['dato'] = "Promedio Ponderado %  Man??" ;
				$fila['total'] = $cantidadMani_terceros;
				$fila['promedio'] = $promManiComercial_terceros;
				array_push($tablaTotalesTerceros->rows,$fila);

				$fila['dato'] = "Promedio Ponderado % G. Sueltos" ;
				$fila['total'] = $cantidadGSuelto_terceros;
				$fila['promedio'] = $promSueltos_terceros;
				array_push($tablaTotalesTerceros->rows,$fila);

				$fila['dato'] = "Promedio Ponderado % Confiter??a" ;
				$fila['total'] = $cantidadConfiteria_terceros;
				$fila['promedio'] = $promConfiteria_terceros;
				array_push($tablaTotalesTerceros->rows,$fila);

				$resultado = array(
					
						"totales"=>$tablaTotales,
					
						"propios"=>$tablaTotalesPropios,
					
						"terceros"=>$tablaTotalesTerceros
					
				);

				
$resp = array(
	'status' => 'succes',
	'code' => '200',
	'message' => 'OK',
	'data' =>$resultado
  );
  echo json_encode($resp);					
  exit();	

				//echo "".$sumKgNeto."-".$sumKgSecoLimpio."-".$cantidadMani."-".$cantidadGSuelto."-".$promManiComercial."-".$promSueltos."-".$promConfiteria."-".$sumKgNeto_propios."-".$sumKgSecoLimpio_propios."-".$cantidadMani_propios."-".$cantidadGSuelto_propios."-".$promManiComercial_propios."-".$promSueltos_propios."-".$promConfiteria_propios."-".$sumKgNeto_terceros."-".$sumKgSecoLimpio_terceros."-".$cantidadMani_terceros."-".$cantidadGSuelto_terceros."-".$promManiComercial_terceros."-".$promSueltos_terceros."-".$promConfiteria_terceros;