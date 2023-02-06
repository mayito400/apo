<?php
require_once "conexion/conexion.php";
//$uri = $_SERVER['REQUEST_URI'];

$pdo = new Conexion();

	if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['page'])){
	    $query = "SELECT idProvedor,nit, nombre, telefono, correo, estado FROM provedor";
			
			$sql = $pdo->prepare($query);
			$sql->execute();
			$sql->setFetchMode(PDO::FETCH_ASSOC);
		     header("HTTP/1.1 200 hay datos");
			echo json_encode($sql->fetchAll());
			//http_response_code(200);
			exit;	  
    }

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['dato1'])){
    	$sql = "INSERT INTO provedor ( nit, nombre, telefono, correo, estado) VALUES(:nit, :nombre, :telefono, :correo, :estado)";
    	$stmt = $pdo->prepare($sql);
    	$stmt->bindValue(':nit', $_GET['dato1']);
		$stmt->bindValue(':nombre', $_GET['dato2']);
		$stmt->bindValue(':telefono', $_GET['dato3']);
		$stmt->bindValue(':correo', $_GET['dato4']);
		$stmt->bindValue(':estado', "Activo");
		$stmt->execute();
		$idPost = $pdo->lastInsertId();
		if($idPost){
			header("HTTP/1.1 200 Ok");
			echo json_encode($idPost);
			exit;
		}else{
		  echo json_encode(0);  
		}
    
}

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['modi'])){
    $sql = "UPDATE provedor SET nombre=:nombre, telefono=:telefono, correo=:correo WHERE idProvedor=:idProvedor";
		$stmt = $pdo->prepare($sql);
		$stmt->bindParam(':nombre', $_GET['dato2']);
		$stmt->bindParam(':telefono', $_GET['dato3']);
		$stmt->bindParam(':correo', $_GET['dato4']);
		$stmt->bindParam(':idProvedor', $_GET['modi']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
			echo json_encode($_GET['modi']);
		exit;
    
}

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['id'])){
    $query = "SELECT idProvedor, nit, nombre, telefono, correo, estado FROM provedor";
  $sql = $pdo->prepare($query."WHERE idProvedor = :idProvedor");
			$sql->bindValue(':idProvedor', $_GET['id']);
			$sql->execute();
			$sql->setFetchMode(PDO::FETCH_ASSOC);
			header("HTTP/1.1 200 hay datos");
			//header("Content-Type: application/json");
			echo json_encode($sql->fetchAll());
			//http_response_code(200);
			exit;				
}
			


if($_SERVER['REQUEST_METHOD'] == 'POST')
	{
	   // $uri = "http://" . $_POST['uri']."?metodo=vista" ;
		$sql = "INSERT INTO provedor ( nit, nombre, telefono, correo, estado) VALUES(:nit, :nombre, :telefono, :correo, :estado)";
		$stmt = $pdo->prepare($sql);
		//$stmt->bindValue(':id', "null");
		$stmt->bindValue(':nit', $_POST['dato1']);
		$stmt->bindValue(':nombre', $_POST['dato2']);
		$stmt->bindValue(':telefono', $_POST['dato3']);
		$stmt->bindValue(':correo', $_POST['dato4']);
		$stmt->bindValue(':estado', "Activo");
		$stmt->execute();
		$idPost = $pdo->lastInsertId(); 
		if($idPost)
		{
			header("HTTP/1.1 200 Ok");
			//header('Content-type: text/html');
			echo json_encode($idPost);
			//echo $uri;
			//file_get_contents($uri . "?metodo=vista");
			// header("Location: $uri");
			exit;
		}
	}
	
	
	if($_SERVER['REQUEST_METHOD'] == 'PUT')
	{		
		$sql = "UPDATE provedor SET nombre=:nombre, telefono=:telefono, correo=:correo WHERE id=:id";
		$stmt = $pdo->prepare($sql);
		$stmt->bindValue(':nombre', $_GET['nombre']);
		$stmt->bindValue(':telefono', $_GET['telefono']);
		$stmt->bindValue(':correo', $_GET['email']);
		$stmt->bindValue(':id', $_GET['id']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
			echo json_encode($_GET['id']);
		exit;
	}
	
	if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['eli']))
	{
		$sql = "DELETE FROM provedor WHERE idProvedor=:idProvedor";
		$stmt = $pdo->prepare($sql);
		$stmt->bindValue(':idProvedor', $_GET['eli']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
		echo json_encode(0);
		exit;
	}
	
	if($_SERVER['REQUEST_METHOD'] == 'DELETE')
	{
		$sql = "DELETE FROM provedor WHERE idProvedor=:idProvedor";
		$stmt = $pdo->prepare($sql);
		$stmt->bindValue(':idProvedor', $_GET['eli']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
		exit;
	}

?>