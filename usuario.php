<?php
require_once "conexion/conexion.php";
//$uri = $_SERVER['REQUEST_URI'];

$pdo = new Conexion();

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['dato1'])){
    	$sql = "INSERT INTO datos_usuario(NOM_USUARIO, APELL_USUARIO, FECHA_NAC, CONTRASEÑA, CORREO, SEXO) VALUES (:nombres, :apellidos, :fecha_nac,:contraseña,:correo, :sexo)"; //listo
    	$stmt = $pdo->prepare($sql);
    	$stmt->bindValue(':nombres', $_GET['dato1']);
		$stmt->bindValue(':apellidos', $_GET['dato2']);
		$stmt->bindValue(':fecha_nac', $_GET['dato3']);
		$stmt->bindValue(':contraseña', $_GET['dato4']);
		$stmt->bindValue(':correo', $_GET['dato5']);
		$stmt->bindValue(':sexo', $_GET['dato6']);
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
	    $query = "SELECT DNI_USUARIO, `NOM_USUARIO, APELL_USUARIO, FECHA_NAC, CONTRASEÑA, CORREO, SEXO FROM datos_usuario"; //listo
			
			$sql = $pdo->prepare($query);
			$sql->execute();
			$sql->setFetchMode(PDO::FETCH_ASSOC);
		     header("HTTP/1.1 200 hay datos");
			echo json_encode($sql->fetchAll());
			//http_response_code(200);
			exit;	  
    }



if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['modi'])){
    $sql = "UPDATE datos_usuario SET DNI_USUARIO=:UsuarioId,NOM_USUARIO=:nombres,APELL_USUARIO=:apellidos,FECHA_NAC=:fecha_nac,CONTRASEÑA=:contraseña,CORREO=:correo,SEXO=:sexo WHERE DNI_USUARIO=:UsuarioId; //listo
		$stmt = $pdo->prepare($sql);
		$stmt->bindParam(':nombres', $_GET['dato1']);
		$stmt->bindParam(':apellidos', $_GET['dato2']);
		$stmt->bindParam(':fecha_nac', $_GET['dato3']);
		$stmt->bindParam(':contraseña', $_GET['dato4']);
		$stmt->bindParam(':correo', $_GET['dato5']);
		$stmt->bindParam(':sexo', $_GET['dato6']);
		$stmt->bindParam(':UsuarioId', $_GET['modi']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
			echo json_encode($_GET['modi']);
		exit;
    
}

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['id'])){
    $query = " SELECT DNI_USUARIO, NOM_USUARIO, APELL_USUARIO, FECHA_NAC, CONTRASEÑA, CORREO, SEXO FROM datos_usuario "; //listo
  $sql = $pdo->prepare($query."WHERE DNI_USUARIO = :UsuarioId");
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
	   $sql = "INSERT INTO datos_usuario(NOM_USUARIO, APELL_USUARIO, FECHA_NAC, CONTRASEÑA, CORREO, SEXO) VALUES (:nombres, :apellidos, :fecha_nac,:contraseña,:correo, :sexo)"; //consulta
		$stmt = $pdo->prepare($sql);
		//$stmt->bindValue(':id', "null");
		$stmt->bindValue(':nombres', $_GET['dato1']);
		$stmt->bindValue(':apellidos', $_GET['dato2']);
		$stmt->bindValue(':fecha_nac', $_GET['dato3']);
		$stmt->bindValue(':contraseña', $_GET['dato4']);
		$stmt->bindValue(':correo', $_GET['dato5']);
		$stmt->bindValue(':sexo', $_GET['dato6']);
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
	
	// if($_SERVER['REQUEST_METHOD'] == 'PUT')
	// {		
	// 	$sql = "UPDATE provedor SET nombre=:nombre, telefono=:telefono, correo=:correo WHERE id=:id"; //consulta 
	// 	$stmt = $pdo->prepare($sql);
	// 	$stmt->bindValue(':nombre', $_GET['nombre']);
	// 	$stmt->bindValue(':telefono', $_GET['telefono']);
	// 	$stmt->bindValue(':correo', $_GET['email']);
	// 	$stmt->bindValue(':id', $_GET['id']);
	// 	$stmt->execute();
	// 	header("HTTP/1.1 200 Ok");
	// 		echo json_encode($_GET['id']);
	// 	exit;
	// }
	
	if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['eli']))
	{
		$sql = "DELETE FROM datos_usuario WHERE DNI_USUARIO=:UsuarioId"; //consulta 
		$stmt = $pdo->prepare($sql);
		$stmt->bindValue(':UsuarioId', $_GET['eli']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
		echo json_encode(0);
		exit;
	}

?>