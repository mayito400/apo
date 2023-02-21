<?php
require_once "conexion/conexion.php";
//$uri = $_SERVER['REQUEST_URI'];

$pdo = new Conexion();

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['dato1'])){
    	$sql = "INSERT INTO editorial (	COD_EDITORIAL, NOM_EDITORIAL, PAIS, CUIDAD, TELEFONO, DIRECCION) VALUES (:codigo_editorial, :nombre_editorial, :pais, :ciudad, :telefono, :direccion)";
    	$stmt = $pdo->prepare($sql);
    	$stmt->bindValue(':cod_editorial', $_GET['dato1']);
		$stmt->bindValue(':nom_editorial', $_GET['dato2']);
		$stmt->bindValue(':pais', md5($_GET['dato3']));
		$stmt->bindValue(':ciudad', md5($_GET['dato4']));
		$stmt->bindValue(':telefono', md5($_GET['dato5']));
		$stmt->bindValue(':direccion', md5($_GET['dato6']));
		$stmt->execute();
		//$stmt->bindValue(':Estado', "Activo");
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
	    $query = "SELECT cod_editorial, nom_editorial, pais, ciudad, telefono, direccion FROM editorial";
			
			$sql = $pdo->prepare($query);
			$sql->execute();
			$sql->setFetchMode(PDO::FETCH_ASSOC);
		     header("HTTP/1.1 200 hay datos");
			echo json_encode($sql->fetchAll());
			//http_response_code(200);
			exit;	  
    }



if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['modi'])){
    $sql = "UPDATE editorial SET COD_EDITORIAL=:cod_editorial, NOM_EDITORIAL=:nom_editorial, PAIS=:pais, CIUDAD=:ciudad, TELEFONO=:telefono DIRECCION=:direccion WHERE COD_EDITORIAL=:cod_editorial";
		$stmt = $pdo->prepare($sql);
		$stmt->bindParam(':nom_editorial', $_GET['dato2']);
		$stmt->bindParam(':pais', $_GET['dato3']);
		$stmt->bindParam(':ciudad', $_GET['dato4']);
		$stmt->bindParam(':telefono', $_GET['dato5']);
		$stmt->bindParam(':cod_editorial', $_GET['modi']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
			echo json_encode($_GET['modi']);
		exit;
    
}

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['id'])){
    $query = "SELECT cod_editorial, nom_editorial, pais, ciudad, telefono, direccion FROM editorial";
  $sql = $pdo->prepare($query."WHERE cod_editorial = :cod_editorial");
			$sql->bindValue(':cod_editorial', $_GET['id']);
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
		$sql = "INSERT INTOeditorial (	COD_EDITORIAL, NOM_EDITORIAL, PAIS, CUIDAD, TELEFONO, DIRECCION) VALUES (:codigo_editorial, :nombre_editorial, :pais, :ciudad, :telefono, :direccion))";
		$stmt = $pdo->prepare($sql);
		//$stmt->bindValue(':id', "null");
		$stmt->bindValue(':cod_editorial', $_POST['dato1']);
		$stmt->bindValue(':nom_editorial', $_POST['dato2']);
		$stmt->bindValue(':pais', $_POST['dato3']);
		$stmt->bindValue(':ciudad', $_POST['dato4']);
		$stmt->bindValue(':telefono', $_POST['dato5']);
		$stmt->bindValue(':direccion', $_POST['dato6']);
		//$stmt->bindValue(':Estado', "Activo");
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
		$sql = "UPDATE editorial SET COD_EDITORIAL=:cod_editorial, NOM_EDITORIAL=:nom_editorial, PAIS=:pais, CIUDAD=:ciudad, TELEFONO=:telefono DIRECCION=:direccion WHERE COD_EDITORIAL=:cod_editorial";
		$stmt = $pdo->prepare($sql);
		$stmt->bindParam(':nom_editorial', $_GET['dato2']);
		$stmt->bindParam(':pais', $_GET['dato3']);
		$stmt->bindParam(':ciudad', $_GET['dato4']);
		$stmt->bindParam(':telefono', $_GET['dato5']);
		$stmt->bindParam(':cod_editorial', $_GET['id']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
			echo json_encode($_GET['id']);
		exit;
	}
	
	if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['eli']))
	{
		$sql = "DELETE FROM editorial WHERE cod_editorial=:cod_editorial";
		$stmt = $pdo->prepare($sql);
		$stmt->bindValue(':cod_editorial', $_GET['eli']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
		echo json_encode(0);
		exit;
	}	



?>