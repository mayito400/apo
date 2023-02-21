<?php
require_once "conexion/conexion.php";


$pdo = new Conexion();

	if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['page'])){
	    $query = "SELECT dni_admin, username, nom_admin, apell_admin, fecha_nac, contraseña, correo  FROM datos_admin";
			
			$sql = $pdo->prepare($query);
			$sql->execute();
			$sql->setFetchMode(PDO::FETCH_ASSOC);
		     header("HTTP/1.1 200 hay datos");
			echo json_encode($sql->fetchAll());
			//http_response_code(200);
			exit;	  
    }

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['dato1'])){
    	$sql = "INSERT INTO datos_admin (dni_admin, username, nom_admin, apell_admin, fecha_nac, contraseña, correo) VALUES(:dni_admin, :username, :nombre_admin, :apellido_admin, :fecha_nacimiento, :contraseña, :correo)";
    	$stmt = $pdo->prepare($sql);
    	$stmt->bindValue(':dni_admin', $_GET['dato1']);
		$stmt->bindValue(':username', $_GET['dato2']);
		$stmt->bindValue(':nom_admin', $_GET['dato3']);
		$stmt->bindValue(':apell_admin', $_GET['dato4']);
		$stmt->bindValue(':fecha_nac', $_GET['dato5']);
		$stmt->bindValue(':contreseña', $_GET['dato6']);
		$stmt->bindValue(':correo', $_GET['dato7']);
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
    $sql = "UPDATE datos_admin SET DNI_ADMIN=:dni_admin, USERNAME=:username, NOM_ADMIN=:nom_admin, APELL_ADMIN=:apell_admin, FECHA_NAC=:fecha_nac, CONTRASEÑA=:contraseña, CORREO=:correo WHERE DNI_ADMIN=:dni_admin";
		$stmt = $pdo->prepare($sql);
		$stmt->bindParam(':username', $_GET['dato2']);
		$stmt->bindParam(':nom_admin', $_GET['dato3']);
		$stmt->bindParam(':apell_admin', $_GET['dato4']);
		$stmt->bindParam(':fecha_nac', $_GET['dato5']);
		$stmt->bindParam(':contraseña', $_GET['dato6']);
		$stmt->bindParam(':correo', $_GET['dato7']);
		$stmt->bindParam(':dni_admin', $_GET['modi']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
			echo json_encode($_GET['modi']);
		exit;
    
}

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['id'])){
   $query = "SELECT dni_admin, username, nom_admin, apell_admin, fecha_nac, contraseña, correo  FROM administrador";
  $sql = $pdo->prepare($query."WHERE DNI_USUARIO = :dni_admin");
			$sql->bindValue(':dni_admin', $_GET['id']);
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
		$sql = "INSERT INTO datos_admin (dni_admin, username, nom_admin, apell_admin, fecha_nac, contraseña, correo) VALUES(:dni_admin, :username, :nombre_admin, :apellido_admin, :fecha_nacimiento, :contraseña, :correo)";
		$stmt = $pdo->prepare($sql);
		$stmt->bindValue(':dni_admin', $_POST['dato1']);
		$stmt->bindValue(':username', $_POST['dato2']);
		$stmt->bindValue(':nom_admin', $_GET['dato3']);
		$stmt->bindValue(':apell_admin', $_GET['dato4']);
		$stmt->bindValue(':fecha_nac', $_GET['dato5']);
		$stmt->bindValue(':contraseña', $_GET['dato6']);
		$stmt->bindValue(':correo', $_GET['dato7']);
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
		$sql = "UPDATE datos_admin SET DNI_ADMIN=:dni_admin, USERNAME=:username, NOM_ADMIN=:nom_admin, APELL_ADMIN=:apell_admin, FECHA_NAC=:fecha_nac, CONTRASEÑA=:contraseña, CORREO=:correo WHERE DNI_ADMIN=:dni_admin";
		$stmt = $pdo->prepare($sql);
		$stmt->bindValue(':username', $_POST['dato1']);
		$stmt->bindValue(':nom_admin', $_POST['dato2']);
		$stmt->bindValue(':apell_admin', $_GET['dato3']);
		$stmt->bindValue(':fecha_nac', $_GET['dato4']);
		$stmt->bindValue(':contraseña', $_GET['dato5']);
		$stmt->bindValue(':dni_admin', $_GET['id']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
			echo json_encode($_GET['id']);
		exit;
	}
	
	if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['eli']))
	{
		$sql = "DELETE FROM datos_admin WHERE DNI_ADMIN=:dni_admin";
		$stmt = $pdo->prepare($sql);
		$stmt->bindValue(':dni_admin', $_GET['eli']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
		echo json_encode(0);
		exit;
	}


?>