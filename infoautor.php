<?php
require_once "conexion/conexion.php";


$pdo = new Conexion();

	if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['page'])){
	    $query = "SELECT cod_autor, fecha_nacimiento, lugar_nacimiento, lengua_nativa, educacion, años_activo, movimiento_literario, cod_genero FROM infoautor";
			
			$sql = $pdo->prepare($query);
			$sql->execute();
			$sql->setFetchMode(PDO::FETCH_ASSOC);
		     header("HTTP/1.1 200 hay datos");
			echo json_encode($sql->fetchAll());
			//http_response_code(200);
			exit;	  
    }

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['dato1'])){
    	$sql = "INSERT INTO infoautor (COD_AUTOR, FECHA_NACIMIETO,LUGAR_NACIMIENTO,LENGUA_NATIVA, EDUCACION, AÑOS_ACTIVO, MOVIMINETO_LITERARIO, COD_GENERO) VALUES(:codigo_autor, :fecha_nacimieto, :lugar_nacimiento, :lengua_nativa, educacion, años_activo, movimiento_literario, codigo_genero)";
    	$stmt = $pdo->prepare($sql);
    	$stmt->bindValue(':cod_autor', $_GET['dato1']);
		$stmt->bindValue(':fecha_nacimiento', $_GET['dato2']);
		$stmt->bindValue(':lugar_nacimiento', $_GET['dato3']);
		$stmt->bindValue(':lengua_nativa', $_GET['dato4']);
		$stmt->bindValue(':eduacion', $_GET['dato5']);
		$stmt->bindValue(':años_activo', $_GET['dato6']);
		$stmt->bindValue(':movimiento_literario', $_GET['dato7']);
		$stmt->bindValue(':cod_genero', $_GET['dato8']);
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
    $sql = "UPDATE infoautor SET COD_AUTOR=:codigo_autor, FECHA_NACIMINETO=:fecha_nacimiento, LUGAR_NACIMIENTO=:lugar_nacimiento, LENGUA_NATIVA=:lengua_nativa, EDUCACION=:educacion, AÑOS_ACITVO=:años_activo, MOVIMIENTO_LITERARIO=:movimiento_literario, COD_GENERO=codigo_genero  WHERE COD_AUTOR=:codigo_autor";
		$stmt = $pdo->prepare($sql);
		$stmt->bindParam(':fecha_nacimiento', $_GET['dato1']);
		$stmt->bindParam(':lugar_nacimiento', $_GET['dato2']);
		$stmt->bindParam(':lengua_nativa', $_GET['dato3']);
		$stmt->bindParam(':educacion', $_GET['dato4']);
		$stmt->bindParam(':años_activo', $_GET['dato5']);
		$stmt->bindParam(':movimiento_literario', $_GET['dato6']);
		$stmt->bindParam(':cod_genero', $_GET['dato7']);
		$stmt->bindParam(':cod_autor', $_GET['modi']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
			echo json_encode($_GET['modi']);
		exit;
    
}

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['id'])){
   $query = "SELECT cod_autor, fecha_nacimiento, lugar_nacimiento, lengua_nativa, educacion, años_activo, movimiento_literario, cod_genero FROM infoautor";
  $sql = $pdo->prepare($query."WHERE COD_AUTOR = :cod_autor");
			$sql->bindValue(':cod_autor', $_GET['id']);
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
		$sql = "INSERT INTO infoautor (COD_AUTOR, FECHA_NACIMIETO,LUGAR_NACIMIENTO,LENGUA_NATIVA, EDUCACION, AÑOS_ACTIVO, MOVIMINETO_LITERARIO, COD_GENERO) VALUES(:codigo_autor, :fecha_nacimieto, :lugar_nacimiento, :lengua_nativa, educacion, años_activo, movimiento_literario, codigo_genero)";
		$stmt = $pdo->prepare($sql);
		$stmt->bindValue(':cod_autor', $_POST['dato1']);
		$stmt->bindValue(':fecha_nacimiento', $_POST['dato2']);
		$stmt->bindValue(':lugar_nacimiento', $_POST['dato3']);
		$stmt->bindValue(':lengua_nativa', $_POST['dato4']);
		$stmt->bindValue(':educacion', $_POST['dato5']);
		$stmt->bindValue(':años_activo', $_POST['dato6']);
		$stmt->bindValue(':movimiento_literario', $_POST['dato7']);
		$stmt->bindValue(':cod_genero', $_POST['dato8']);
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
		$sql = "UPDATE infoautor SET COD_AUTOR=:codigo_autor, FECHA_NACIMINETO=:fecha_nacimiento, LUGAR_NACIMIENTO=:lugar_nacimiento, LENGUA_NATIVA=:lengua_nativa, EDUCACION=:educacion, AÑOS_ACITVO=:años_activo, MOVIMIENTO_LITERARIO=:movimiento_literario, COD_GENERO=codigo_genero  WHERE COD_AUTOR=:codigo_autor";
		$stmt = $pdo->prepare($sql);
		$stmt->bindValue(':fecha_nacimiento', $_GET['dato1']);
		$stmt->bindValue(':lugar_nacimiento', $_GET['dato2']);
		$stmt->bindValue(':lengua_nativa', $_GET['dato3']);
		$stmt->bindValue(':educacion', $_GET['dato3']);
		$stmt->bindValue(':años_activo', $_GET['dato3']);
		$stmt->bindValue(':movimiento_literario', $_GET['dato3']);
		$stmt->bindValue(':cod_genero', $_GET['dato3']);
		$stmt->bindValue(':cod_autor', $_GET['id']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
			echo json_encode($_GET['id']);
		exit;
	}
	
	if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['eli']))
	{
		$sql = "DELETE FROM infoautor WHERE COD_AUTOR=:cod_autor";
		$stmt = $pdo->prepare($sql);
		$stmt->bindValue(':cod_autor', $_GET['eli']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
		echo json_encode(0);
		exit;
	}
	

?>