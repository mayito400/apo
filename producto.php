<?php
require_once "conexion/conexion.php";


$pdo = new Conexion();

	if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['page'])){
	    $query = "SELECT idProducto, descripcion, idProvedor FROM producto";
			
			$sql = $pdo->prepare($query);
			$sql->execute();
			$sql->setFetchMode(PDO::FETCH_ASSOC);
		     header("HTTP/1.1 200 hay datos");
			echo json_encode($sql->fetchAll());
			//http_response_code(200);
			exit;	  
    }

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['dato1'])){
    	$sql = "INSERT INTO producto (descripcion, idProvedor) VALUES(:descripcion, :idProvedor)";
    	$stmt = $pdo->prepare($sql);
    	$stmt->bindValue(':descripcion', $_GET['dato1']);
		$stmt->bindValue(':idProvedor', $_GET['dato2']);
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
    $sql = "UPDATE producto SET descripcion=:descripcion, idProvedor=:idProvedor WHERE idProducto=:idProducto";
		$stmt = $pdo->prepare($sql);
		$stmt->bindParam(':nombre', $_GET['dato2']);
		$stmt->bindParam(':telefono', $_GET['dato3']);
		$stmt->bindParam(':idProducto', $_GET['modi']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
			echo json_encode($_GET['modi']);
		exit;
    
}

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['id'])){
   $query = "SELECT idProducto, descripcion, idProvedor FROM producto";
  $sql = $pdo->prepare($query."WHERE idProducto = :idProducto");
			$sql->bindValue(':idProducto', $_GET['id']);
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
		$sql = "INSERT INTO provedor (descripcion, idProvedor) VALUES(:descripcion, :idProvedor)";
		$stmt = $pdo->prepare($sql);
		$stmt->bindValue(':descripcion', $_POST['dato1']);
		$stmt->bindValue(':idProvedor', $_POST['dato2']);
		$stmt->execute();
		$idPost = $pdo->lastInsertId(); 
		if($idPost)
		{
			header("HTTP/1.1 200 Ok");
			echo json_encode($idPost);
			exit;
		}
	}
	
	
	if($_SERVER['REQUEST_METHOD'] == 'PUT')
	{		
		$sql = "UPDATE producto SET descripcion=:descripcion, idProvedor=:idProvedor WHERE idProducto=:idProducto";
		$stmt = $pdo->prepare($sql);
		$stmt->bindValue(':descripcion', $_GET['dato1']);
		$stmt->bindValue(':idProvedor', $_GET['dato2']);
		$stmt->bindValue(':correo', $_GET['email']);
		$stmt->bindValue(':idProducto', $_GET['id']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
			echo json_encode($_GET['id']);
		exit;
	}
	
	if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['eli']))
	{
		$sql = "DELETE FROM provedor WHERE idProducto=:idProducto";
		$stmt = $pdo->prepare($sql);
		$stmt->bindValue(':idProducto', $_GET['eli']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
		echo json_encode(0);
		exit;
	}
	
	if($_SERVER['REQUEST_METHOD'] == 'DELETE')
	{
		$sql = "DELETE FROM provedor WHERE idProducto=:idProducto";
		$stmt = $pdo->prepare($sql);
		$stmt->bindValue(':idProducto', $_GET['eli']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
		exit;
	}

?>