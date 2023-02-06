<?php
require_once "conexion/conexion.php";
//$uri = $_SERVER['REQUEST_URI'];

$pdo = new Conexion();

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['dato1'])){
    	$sql = "INSERT INTO usuario (nombres, correo, contrasena, Estado) VALUES (:nombres, :correo, :contrasena, :Estado)";
    	$stmt = $pdo->prepare($sql);
    	$stmt->bindValue(':nombres', $_GET['dato1']);
		$stmt->bindValue(':correo', $_GET['dato2']);
		$stmt->bindValue(':contrasena', md5($_GET['dato3']));
		$stmt->bindValue(':Estado', "Activo");
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

	if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['page'])){
	    $query = "SELECT UsuarioId, nombres, correo, contrasena, Estado FROM usuario";
			
			$sql = $pdo->prepare($query);
			$sql->execute();
			$sql->setFetchMode(PDO::FETCH_ASSOC);
		     header("HTTP/1.1 200 hay datos");
			echo json_encode($sql->fetchAll());
			//http_response_code(200);
			exit;	  
    }



if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['modi'])){
    $sql = "UPDATE usuario SET nombres=:nombres, correo=:correo, correo=:correo, contrasena=:contrasena WHERE UsuarioId=:UsuarioId";
		$stmt = $pdo->prepare($sql);
		$stmt->bindParam(':nombres', $_GET['dato2']);
		$stmt->bindParam(':correo', $_GET['dato3']);
		$stmt->bindParam(':correo', $_GET['dato4']);
		$stmt->bindParam(':UsuarioId', $_GET['modi']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
			echo json_encode($_GET['modi']);
		exit;
    
}

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['id'])){
    $query = "SELECT UsuarioId, nombres, correo, contrasena, Estado FROM usuario";
  $sql = $pdo->prepare($query."WHERE UsuarioId = :UsuarioId");
			$sql->bindValue(':UsuarioId', $_GET['id']);
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
		$sql = "INSERT INTO usuario ( nombres, correo, contrasena, Estado) VALUES(:nombres, :correo, :contrasena, :Estado)";
		$stmt = $pdo->prepare($sql);
		//$stmt->bindValue(':id', "null");
		$stmt->bindValue(':nombre', $_POST['dato1']);
		$stmt->bindValue(':correo', $_POST['dato2']);
		$stmt->bindValue(':contrasena', $_POST['dato3']);
		$stmt->bindValue(':Estado', "Activo");
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
		$sql = "DELETE FROM usuario WHERE UsuarioId=:UsuarioId";
		$stmt = $pdo->prepare($sql);
		$stmt->bindValue(':UsuarioId', $_GET['eli']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
		echo json_encode(0);
		exit;
	}
	
	if($_SERVER['REQUEST_METHOD'] == 'DELETE')
	{
		$sql = "DELETE FROM usuario WHERE UsuarioId=:UsuarioId";
		$stmt = $pdo->prepare($sql);
		$stmt->bindValue(':UsuarioId', $_GET['eli']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
		exit;
	}

?>