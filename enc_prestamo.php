<?php
require_once "conexion/conexion.php";
//$uri = $_SERVER['REQUEST_URI'];

$pdo = new Conexion();

	if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['page'])){
	    $query = "SELECT cod_enc_prestamo, fecha_prestamo, cant_prestamo, dni_usuario FROM enc_prestamo";
			
			$sql = $pdo->prepare($query);
			$sql->execute();
			$sql->setFetchMode(PDO::FETCH_ASSOC);
		     header("HTTP/1.1 200 hay datos");
			echo json_encode($sql->fetchAll());
			//http_response_code(200);
			exit;	  
    }

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['dato1'])){
    	$sql = "INSERT INTO enc_prestamo ( COD_ENC_PRESTAMO, FECHA_PRESTAMO, CANT_PRESTAMO, DNI_USUARIO) VALUES(:codigo_encabezado_prestamo, :fecha_prestamo, :cantidad_prestamo, :dni_usuario)";
    	$stmt = $pdo->prepare($sql);
    	$stmt->bindValue(':codigo_encabezado_prestamo', $_GET['dato1']);
		$stmt->bindValue(':fecha_prestamo', $_GET['dato2']);
		$stmt->bindValue(':cantidad_prestamo', $_GET['dato3']);
		$stmt->bindValue(':dni_usuario', $_GET['dato4']);
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
    $sql = "UPDATE enc_prestamo SET COD_ENC_PRESTAMO=:codigo_encabezado_prestamo, FECHA_PRESTAMO=:fecha_prestamo, CANT_PRESTAMO=:cantidad_prestamo, DNI_USUARIO=:dni_usuario WHERE COD_ENC_PRESTAMO=:codigo_encabezado_prestamo";
		$stmt = $pdo->prepare($sql);
		$stmt->bindParam(':fecha_prestamo', $_GET['dato1']);
		$stmt->bindParam(':cant_prestamo', $_GET['dato2']);
		$stmt->bindParam(':dni_usuario', $_GET['dato3']);
		$stmt->bindParam(':cod_enc_prestamo', $_GET['modi']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
			echo json_encode($_GET['modi']);
		exit;
    
}

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['id'])){
    $query = "SELECT cod_enc_prestamo, fecha_prestamo, cant_prestamo, dni_usuario FROM enc_prestamo";
  $sql = $pdo->prepare($query."WHERE  COD_ENC_PRESTAMO=:cod_enc_prestamo");
			$sql->bindValue(':cod_enc_prestamo', $_GET['id']);
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
		$sql = "INSERT INTO enc_prestamo ( COD_ENC_PRESTAMO, FECHA_PRESTAMO, CANT_PRESTAMO, DNI_USUARIO) VALUES(:codigo_encabezado_prestamo, :fecha_prestamo, :cantidad_prestamo, :dni_usuario)";
		$stmt = $pdo->prepare($sql);
		//$stmt->bindValue(':id', "null");
		$stmt->bindValue(':codigo_encabezado_prestamo', $_GET['dato1']);
		$stmt->bindValue(':fecha_prestamo', $_GET['dato2']);
		$stmt->bindValue(':cantidad_prestamo', $_GET['dato3']);
		$stmt->bindValue(':dni_usuario', $_GET['dato4']);
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
		$sql = "UPDATE enc_prestamo SET COD_ENC_PRESTAMO=:codigo_encabezado_prestamo, FECHA_PRESTAMO=:fecha_prestamo, CANT_PRESTAMO=:cantidad_prestamo, DNI_USUARIO=:dni_usuario WHERE COD_ENC_PRESTAMO=:codigo_encabezado_prestamo";
		$stmt = $pdo->prepare($sql);
		$stmt->bindParam(':fecha_prestamo', $_GET['dato1']);
		$stmt->bindParam(':cant_prestamo', $_GET['dato2']);
		$stmt->bindParam(':dni_usuario', $_GET['dato3']);
		$stmt->bindParam(':cod_enc_prestamo', $_GET['modi']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
			echo json_encode($_GET['id']);
		exit;
	}
	
	if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['eli']))
	{
		$sql = "DELETE FROM enc_prestamo WHERE cod_enc_prestamo=:cod_enc_prestamo";
		$stmt = $pdo->prepare($sql);
		$stmt->bindValue(':cod_enc_prestamo', $_GET['eli']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
		echo json_encode(0);
		exit;
	}
	

?>