<?php
require_once 'default_table.class.php';

class Usuarios_Table extends Default_Table
{
    
    function Usuarios_Table ()
    {
        $this->dbname          = 'LOGIN';
        $this->tablename       = 'usuarios';
        $this->tableIp         = 'ipRegistro';
        
        $this->fieldlist       = array(
        	'id',
        	'nombre',
        	'mail',
            'contrasena',
            'ID_ENTIDAD',
            'ID_ENTIDADSQL',
            'cuit',
            'razon_social',
            'email',
            'codigo_activacion',
            'activo',
            'permiso',
            'admin',
            'token',
            'fechaUltimaConexion',
            'fechaUltimoIntento',
            'intentos',
        );

        $this->fieldlist['id'] = array('pkey' => 'y');       
				
    } // end class constructor

    function incrementarIntentos($id){

        $pdo = get_PDO($this->dbname);

        $fechaActual = date("Y-m-d H:i:s");

        $query = "DECLARE @IncrementValue int
        SET @IncrementValue = 1 UPDATE $this->tablename SET fechaUltimoIntento = '".$fechaActual."', intentos = intentos + @IncrementValue WHERE id=?";

        $stmt = $pdo->prepare($query);        

        if(!$stmt->execute([$id])){
          
          $ret = array(
            'status' => 'succes',
            'code' => '404',
            'message' => 'Error en la ejecución sql',
            'data' => $this->errors = $pdo->errorInfo()
          );
        }
        else{
          $ret = array(
            'status' => 'succes',
            'code' => '200',
            'message' => 'Elemento incrementado',
            'data' => $pdo->lastInsertId()
          );
        }  


        $retorno = json_encode($ret);
        return $retorno;
    }  


    function resetearIntentos($id){

        $pdo = get_PDO($this->dbname);

        $query = "DECLARE @IncrementValue int
        SET @IncrementValue = 1 UPDATE $this->tablename SET intentos = 0 WHERE id=?";

        $stmt = $pdo->prepare($query);
        

        if(!$stmt->execute([$id])){
          
          $ret = array(
            'status' => 'succes',
            'code' => '404',
            'message' => 'Error en la ejecución sql',
            'data' => $this->errors = $pdo->errorInfo()
          );
        }
        else{
          $ret = array(
            'status' => 'succes',
            'code' => '200',
            'message' => 'Elemento incrementado',
            'data' => $pdo->lastInsertId()
          );
        }
        

        $retorno = json_encode($ret);

        return $retorno;
    } 

    function isIPRestringida()
    {
        if (!empty($_SERVER ['HTTP_CLIENT_IP'] ))
          $ip=$_SERVER ['HTTP_CLIENT_IP'];
        elseif (!empty($_SERVER ['HTTP_X_FORWARDED_FOR'] ))
          $ip=$_SERVER ['HTTP_X_FORWARDED_FOR'];
        else
          $ip=$_SERVER ['REMOTE_ADDR'];     

        $pdo = get_PDO($this->dbname);

        $query = "SELECT * FROM ".$this->tableIp." WHERE ip ='".$ip."'";
        $stmt = $pdo->prepare($query);
        $stmt->execute();

        $data_array = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $data_array[] = $row;
        }  

        if(count($data_array) <= 0){ //No se encontro        
            $this->InsertarIP($ip);
            return false;
        }
        else{
            
            if($data_array[0]['intentos'] < 4){            
                return false;            
            }
            else{ 
                
                //Pregunta si está restringida 
                if($data_array[0]['restringida'] == "0"){
                    $this->RestringirIP($ip); //Setea a 1  
                    return true;       
                }
                else{ //Esta restringida... hace cuanto tiempo? 
                    

                    

                    $fechaActual = strtotime(date("Y-m-d H:i:s"));		
                    $fechaUltimoIntento = strtotime($data_array[0]['fechaUltimoIntento']);


                    if(intval($fechaActual) > intval($fechaUltimoIntento)+(60*20)){                  
                        $this->HabilitarIP($ip);
                        
                        return false;            
                    }
                    else{   
                        
                        
                        
                                    
                        return true; 
                    }
                }          
            }
        }
    }

    function AgregarIntentoIP(){

        if (!empty($_SERVER ['HTTP_CLIENT_IP'] ))
          $ip=$_SERVER ['HTTP_CLIENT_IP'];
        elseif (!empty($_SERVER ['HTTP_X_FORWARDED_FOR'] ))
          $ip=$_SERVER ['HTTP_X_FORWARDED_FOR'];
        else
          $ip=$_SERVER ['REMOTE_ADDR'];

          $pdo = get_PDO($this->dbname);

          $fechaActual = date("Y-m-d H:i:s");		
      
          $query = "DECLARE @IncrementValue int
              SET @IncrementValue = 1 UPDATE ".$this->tableIp." SET fechaUltimoIntento = '".$fechaActual."', intentos = intentos + @IncrementValue WHERE ip=?";
      
          $stmt = $pdo->prepare($query);        
      
          $stmt->execute([$ip]);
    }

    function InsertarIP($ip){
      
        $pdo = get_PDO($this->dbname);
      $fechaActual = date("Y-m-d H:i:s");	
        $query = "INSERT INTO ".$this->tableIp." (ip,fechaUltimoIntento,intentos,restringida) VALUES  ('".$ip."','".$fechaActual."',1,0)";
        $stmt = $pdo->prepare($query);
        $stmt->execute();
    }

    function RestringirIP($ip){

        $pdo = get_PDO($this->dbname);
        $query = "UPDATE ".$this->tableIp." SET restringida = '1' WHERE ip=?";
        $stmt = $pdo->prepare($query);       
        $stmt->execute([$ip]);

    }

    function HabilitarIP($ip){
        $pdo = get_PDO($this->dbname);
        $query = "DELETE FROM ".$this->tableIp." WHERE ip ='".$ip."'"; //Borramos la restricción
        $stmt = $pdo->prepare($query);
        $stmt->execute();
    }


} // end class