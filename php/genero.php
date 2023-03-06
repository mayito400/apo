<?php
require_once "conexion/conexion.php";
//$uri = $_SERVER['REQUEST_URI'];

$pdo = new Conexion();

	if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['page'])){
	    $query = "SELECT cod_genero, nombre,  FROM genero";
			
			$sql = $pdo->prepare($query);
			$sql->execute();
			$sql->setFetchMode(PDO::FETCH_ASSOC);
		     header("HTTP/1.1 200 hay datos");
			echo json_encode($sql->fetchAll());
			//http_response_code(200);
			exit;	  
    }

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['dato1'])){
    	$sql = "INSERT INTO genero (COD_GENERO, NOMBRE,) VALUES(:cod_genero, :nombre)";
    	$stmt = $pdo->prepare($sql);
    	$stmt->bindValue(':cod_genero', $_GET['dato1']);
		$stmt->bindValue(':nombre', $_GET['dato2']);
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
    $sql = "UPDATE genero SET COD_GENERO=:cod_genero, NOMBRE=:nombre WHERE COD_GENERO=:codigo:_genero";
		$stmt = $pdo->prepare($sql);
		$stmt->bindParam(':nombre', $_GET['dato1']);
		$stmt->bindParam(':cod_genero', $_GET['modi']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
			echo json_encode($_GET['modi']);
		exit;
    
}

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['id'])){
    $query = "SELECT cod_genero, nombre,  FROM genero";
  $sql = $pdo->prepare($query."WHERE  COD_GENERO=:cod_genero");
			$sql->bindValue(':cod_genero', $_GET['id']);
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
		$sql = "INSERT INTO enc_prestamo ( COD_GENERO, NOMBRE) VALUES(:codigo_genero, :nombre)";
		$stmt = $pdo->prepare($sql);
		//$stmt->bindValue(':id', "null");
		$stmt->bindValue(':cod_genero', $_GET['dato1']);
		$stmt->bindValue(':nombre', $_GET['dato2']);
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
		$sql = "UPDATE genero SET COD_GENERO=:cod_genero, NOMBRE=:nombre WHERE COD_GENERO=:codigo_genero";
		$stmt = $pdo->prepare($sql);
		$stmt->bindParam(':nombre', $_GET['dato1']);
		$stmt->bindParam(':cod_genero', $_GET['modi']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
			echo json_encode($_GET['id']);
		exit;
	}
	
	if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['eli']))
	{
		$sql = "DELETE FROM genero WHERE COD_GENERO=:codigo_genero";
		$stmt = $pdo->prepare($sql);
		$stmt->bindValue(':cod_enc_prestamo', $_GET['eli']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
		echo json_encode(0);
		exit;
	}
	

?>