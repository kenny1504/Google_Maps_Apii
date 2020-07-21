<?php 
        
    //Abre coneccion con base de datos
    $conexion = pg_connect("host=localhost dbname=Ubicaciones user=postgres password=postgres");
    
    //Realiza consula con parametros
    $hospitales = pg_query($conexion, 'SELECT id, nombre, latitud, longitud FROM public.tb_hospitales;'); 
     //devuelve una matriz que contiene todas las filas
     $array= pg_fetch_all($hospitales);
     //convertimos el array a json
      $Datos= json_encode($array);
     //retonamos Datos
       echo $Datos;

?>