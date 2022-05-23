<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require 'db.inc.php';

class Default_Table
{
  var $tablename;         // table name
  var $dbname;            // database name
  var $fieldlist;         // list of fields in this table
  var $data_array;        // data from the database
  var $errors;            // array of error messages


  function Default_Table ()
  {
    $this->dbname          = 'default'; 
    $this->tablename       = 'default';
    
 
  } // constructor


/*
  Consulta en base de datos en base a la cadena WHERE  pasada como parámetro y retorna un JSON con cada resultado obtenido.
  Input: String,Array
  Output:JSON
*/
  function getData ($where,$valoresWhere,$max,$orderby,$ascOrDesc)
  {
    $this->data_array = array(); 

    $pdo = get_PDO($this->dbname);

    if (empty($where)) {
       $where_str = NULL;
    } else {
       $where_str = "WHERE $where";
    } // if


    if(isset($max) && intval($max)){ //Está seteado y es solo un número
      $top_str = " TOP(".$max.") ";
    }
    else{
      $top_str = NULL;
    }

    if(isset($orderby)){ //Está seteado y es solo un número

      $orderby_str = " ORDER BY ".$orderby." ".$ascOrDesc;

    }
    else{
      $orderby_str = NULL;
    }
    $stmt = $pdo->prepare('SELECT'.$top_str.'* FROM '.$this->tablename.' '.$where_str.' '.$orderby_str);
  

    if(!$stmt->execute($valoresWhere)){
      
      $ret = array(
        'status' => 'succes',
        'code' => '404',
        'message' => 'Error en la ejecución sql',
        'data' => $this->errors = $pdo->errorInfo()
      );
      $retorno = json_encode($ret);
      return $retorno;
    }

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
     $this->data_array[] = $row;
    } // while  

    if(count($this->data_array) <= 0){
      $ret = array(
          'status' => 'error',
          'code' => '404',
          'message' => 'No se encuentra el elemento',
          'data' => ''
      );        
    }
    else{
      $ret = array(
        'status' => 'succes',
        'code' => '200',
        'message' => 'resultado obtenido:',
        'data' => $this->data_array
      );
    }
    

    $retorno = json_encode($ret);

    return $retorno;
  }


  function getDataArray ($where,$valoresWhere,$max,$orderby,$ascOrDesc)
  {
    $this->data_array = array(); 

    $pdo = get_PDO($this->dbname);

    if (empty($where)) {
       $where_str = NULL;
    } else {
       $where_str = "WHERE $where";
    } // if


    if(isset($max) && intval($max)){ //Está seteado y es solo un número
      $top_str = " TOP(".$max.") ";
    }
    else{
      $top_str = NULL;
    }

    if(isset($orderby)){ //Está seteado y es solo un número

      $orderby_str = " ORDER BY ".$orderby." ".$ascOrDesc;

    }
    else{
      $orderby_str = NULL;
    }
    $stmt = $pdo->prepare('SELECT'.$top_str.'* FROM '.$this->tablename.' '.$where_str.' '.$orderby_str);
  

    if(!$stmt->execute($valoresWhere)){
      
      
      return null;
    }

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
     $this->data_array[] = $row;
    } // while  

    
    

    $retorno = $this->data_array;

    return $retorno;
  }

  function insertRecord ($json)
  {
    
    $fieldarray = json_decode($json,true);   //aca se convierte en array

    $this->errors = array();

    $pdo = get_PDO($this->dbname);

    $fieldlist = $this->fieldlist;
    foreach ($fieldarray as $field => $fieldvalue) { //Si hay un campo que no pertenece lo borra
       if (!in_array($field, $fieldlist)) {
          unset ($fieldarray[$field]);
       } // if  
       if (isset($fieldlist[$field]['pkey'])) { //Si es el pkey lo borro del array de seteo
          unset ($fieldarray[$field]);
       }   
    } // foreach

    $query = "INSERT INTO $this->tablename (";
    foreach ($fieldarray as $item => $value) {
       $query .= "$item, ";
    } // foreach
    $query = rtrim($query, ', '); 
    $query.=") VALUES (";
    foreach ($fieldarray as $item => $value) {
       $query .= "'$value', ";
    } // foreach
    $query = rtrim($query, ', ');
    $query.=")";


    $stmt = $pdo->prepare($query);
     

    if(!$stmt->execute()){
      
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
        'message' => 'Elemento insertado correctamente',
        'data' => $pdo->lastInsertId()
      );

    }
    
    $retorno = json_encode($ret);

    return $retorno;  
    
 } // insertRecord


 function updateRecord ($json)
 {
    $this->errors = array();

    $fieldarray = json_decode($json,true);   //aca se convierte en array

    $pdo = get_PDO($this->dbname);

    $fieldlist = $this->fieldlist;
    foreach ($fieldarray as $field => $fieldvalue) {
       if (!in_array($field, $fieldlist)) {
          unset ($fieldarray[$field]);
       } // if
    } // foreach

    $where  = NULL;
    $update = NULL;
    $valores = array();
    foreach ($fieldarray as $item => $value) {
       if (isset($fieldlist[$item]['pkey'])) { //Si es el pkey entonces va al where 
          $where .= "$item=$value AND ";
       } else {
          $update .= "$item=?, ";
          $valores[] = $value;
       } // if
    } // foreach


    $where  = rtrim($where, ' AND ');
    $update = rtrim($update, ', ');

    $query = "UPDATE $this->tablename SET $update WHERE $where";


    
    $stmt = $pdo->prepare($query);
    

    if(!$stmt->execute($valores)){
      
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
        'message' => 'Elemento actualizado correctamente',
        'data' => $pdo->lastInsertId()
    );
    }
    

    $retorno = json_encode($ret);

    return $retorno; 
    
 } // updateRecord

 function deleteRecord ($json)
 {
    $this->errors = array();

    $fieldarray = json_decode($json,true);   //aca se convierte en array

    $pdo = get_PDO($this->dbname);

    $fieldlist = $this->fieldlist;
    $where  = NULL;
    $valoresWhere = array();
    foreach ($fieldarray as $item => $value) {
       if (isset($fieldlist[$item]['pkey'])) { //Es primary key?
          $where .= "$item=? AND ";
          $valoresWhere[] = $value;
       } // if
    } // foreach

    $where  = rtrim($where, ' AND ');

    $query = "DELETE FROM  $this->tablename WHERE $where";
    
    $stmt = $pdo->prepare($query);

    if(!$stmt->execute($valoresWhere)){
      
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
        'message' => 'Elemento eliminado correctamente',
        'data' => $pdo->lastInsertId()
      );
    }
    
    

    $retorno = json_encode($ret);

    return $retorno;    
  } // deleteRecord

  function getErrors(){
    return $this->errors;
  }
} // end class