<?php
require_once "conexion/conexion.php";


$pdo = new Conexion();

	if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['page'])){
	    $query = "SELECT det_prestamo, cod_detalle, descripcion, cod_libro, cod_enc_prestamo FROM det_prestamo";
			
			$sql = $pdo->prepare($query);
			$sql->execute();
			$sql->setFetchMode(PDO::FETCH_ASSOC);
		     header("HTTP/1.1 200 hay datos");
			echo json_encode($sql->fetchAll());
			//http_response_code(200);
			exit;	  
    }

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['dato1'])){
    	$sql = "INSERT INTO DET_PRESTAMO (COD_DETALLE, DESCRIPCION,COD_LIBRO,COD_ENC_PRESTAMO) VALUES(:cod_detalle, :descripcion, :cod_libro, :cod_enc_prestamo)";
    	$stmt = $pdo->prepare($sql);
    	$stmt->bindValue(':cod_detalle', $_GET['dato1']);
		$stmt->bindValue(':descripcion', $_GET['dato2']);
		$stmt->bindValue(':cod_libro', $_GET['dato3']);
		$stmt->bindValue(':cod_enc_prestamo', $_GET['dato4']);
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
    $sql = "UPDATE det_prestamo SET COD_DETALLE=:cod_detalle, DESCRIPCION=:descripcion, COD_LIBRO=:cod_libro, COD_ENC_PRESTAM0=:cod_enc_prestamo WHERE COD_LIBRO=:cod_libro";
		$stmt = $pdo->prepare($sql);
		$stmt->bindParam(':cod_enc_prestamo', $_GET['dato1']);
		$stmt->bindParam(':descripcion', $_GET['dato2']);
		$stmt->bindParam(':cod_libro', $_GET['dato3']);
		$stmt->bindParam(':cod_detalle', $_GET['modi']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
			echo json_encode($_GET['modi']);
		exit;
    
}

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['id'])){
   $query = "SELECT COD_DETALLE, DESCRIPCION, COD_LIBRO, COD_ENC_PRESTAMO FROM det_prestamo";
  $sql = $pdo->prepare($query."WHERE COD_DETALLE = :cod_detalle");
			$sql->bindValue(':cod_detalle', $_GET['id']);
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
		$sql = "INSERT INTO det_prestamo(cod_detalle, descripcion, cod_libro, cod_enc_prestamo) VALUES(:cod_detalle, :descripcion, :codigo_libro, :cod_enc_prestamo)";
		$stmt = $pdo->prepare($sql);
		$stmt->bindValue(':cod_detalle', $_POST['dato1']);
		$stmt->bindValue(':descripcion', $_POST['dato2']);
		$stmt->bindValue(':cod_libro', $_POST['dato3']);
		$stmt->bindValue(':cod_enc_prestamo', $_POST['dato4']);
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
		$sql = "UPDATE det_prestamo SET COD_DETALLE=:cod_detalle, DESCRIPCION=:descripcion, COD_LIBRO=cod_libro, COD_ENC_PRESTAM0=cod_enc_prestamo WHERE COD_LIBRO=:cod_libro";
		$stmt = $pdo->prepare($sql);
		$stmt->bindValue(':descripcion', $_GET['dato1']);
		$stmt->bindValue(':cod_libro', $_GET['dato2']);
		$stmt->bindValue(':cod_enc_prestamo', $_GET['dato3']);
		$stmt->bindValue(':cod_detalle', $_GET['id']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
			echo json_encode($_GET['id']);
		exit;
	}
	
	if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['eli']))
	{
		$sql = "DELETE FROM det_prestamo WHERE cod_detalle=:cod_detalle";
		$stmt = $pdo->prepare($sql);
		$stmt->bindValue(':cod_detalle', $_GET['eli']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
		echo json_encode(0);
		exit;
	}
	

?>