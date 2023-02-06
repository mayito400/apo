<?php

	class Conexion extends PDO
	{
		private $hostBd;
		private $nombreBd;
		private $usuarioBd;
		private $passwordBd;
		
	/*	 "server" : "localhost",
        "user" :  "uservicczi_Donguillo",
        "password" : "Dady3012238397",
        "database" : "uservicczi_apiphp",
        "port" : "3306"*/
		
		public function __construct()
		{
			try{
			    $listado = $this->datosConexion();
                foreach ($listado as $key => $value){
                $this->hostBd = $value['server'];
                $this->usuarioBd = $value['user'];
                $this->passwordBd = $value['password'];
                $this->nombreBd = $value['database'];
    }
				parent::__construct('mysql:host=' . $this->hostBd . ';dbname=' . $this->nombreBd . ';charset=utf8', $this->usuarioBd, $this->passwordBd, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
				
				} catch(PDOException $e){
				echo 'Error: ' . $e->getMessage();
				exit;
			}//este cierra el catch------------------------------------------------
		}//este cierra el contructor-------------------------------------------------
		private function datosConexion(){
           $direccion = dirname(__FILE__);
           $jsondata = file_get_contents($direccion . "/" . "config");
           return json_decode($jsondata, true);
        }
	}//este cierra la clase---------------------------------------------------------
?>