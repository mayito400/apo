<?php
require_once "conexion/conexion.php";


$pdo = new Conexion();
// Reemplazar "producto" por "libro"

	if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['page'])){
	    $query = "SELECT COD_LIBRO, SIPNOPSIS, TITULO, FECHA_PUBLICACION, NUM_SERIE, COD_GENERO, COD_AUTOR FROM libro"; // listo
			
			$sql = $pdo->prepare($query);
			$sql->execute();
			$sql->setFetchMode(PDO::FETCH_ASSOC);
		     header("HTTP/1.1 200 hay datos");
			echo json_encode($sql->fetchAll());
			//http_response_code(200);
			exit;	  
    }

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['dato1'])){
    	$sql = "INSERT INTO libro (SIPNOPSIS, TITULO, FECHA_PUBLICACION, NUM_SERIE, COD_GENERO, COD_AUTOR) VALUES (:sinopsis,:titulo ,:fecha_publicacion ,:numero_serie ,:codigo_genero , :codigo_autor)"; // listo
    	$stmt = $pdo->prepare($sql);
    	$stmt->bindValue(':sinopsis', $_GET['dato1']);
    	$stmt->bindValue(':titulo', $_GET['dato2']);
    	$stmt->bindValue(':fecha_publicacion', $_GET['dato3']);
    	$stmt->bindValue(':numero_serie', $_GET['dato4']);
    	$stmt->bindValue(':codigo_genero', $_GET['dato5']);
    	$stmt->bindValue(':codigo_autor', $_GET['dato6']);
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
    $sql = "UPDATE libro SET SIPNOPSIS=:sinopsis,TITULO=:titulo,FECHA_PUBLICACION=:fecha:publicacion,NUM_SERIE=:numero_serie,COD_GENERO=:codigo_genero,COD_AUTOR=:codigo_autor WHERE COD_LIBRO=:codigo_libro;"; //listo
		$stmt = $pdo->prepare($sql);
		$stmt->bindParam(':sinopsis', $_GET['dato1']);
    	$stmt->bindParam(':titulo', $_GET['dato2']);
    	$stmt->bindParam(':fecha_publicacion', $_GET['dato3']);
    	$stmt->bindParam(':numero_serie', $_GET['dato4']);
    	$stmt->bindParam(':codigo_genero', $_GET['dato5']);
    	$stmt->bindParam(':codigo_autor', $_GET['dato6']);
    	$stmt->bindParam(':codigo_libro', $_GET['modi']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
			echo json_encode($_GET['modi']);
		exit;
    
}

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['id'])){
   $query = "SELECT COD_LIBRO, SIPNOPSIS, TITULO, FECHA_PUBLICACION, NUM_SERIE, COD_GENERO, COD_AUTOR FROM libro"; //listo
  $sql = $pdo->prepare($query."COD_LIBRO = :codigo_libro");
			$sql->bindValue(':codigo_libro', $_GET['id']);
			$sql->execute();
			$sql->setFetchMode(PDO::FETCH_ASSOC);
			header("HTTP/1.1 200 hay datos");
			//header("Content-Type: application/json");
			echo json_encode($sql->fetchAll());
			//http_response_code(200);
			exit;				
}


// if($_SERVER['REQUEST_METHOD'] == 'POST')
// 	{
// 	   // $uri = "http://" . $_POST['uri']."?metodo=vista" ;
// 		$sql = "INSERT INTO provedor (descripcion, idProvedor) VALUES(:descripcion, :idProvedor)";
// 		$stmt = $pdo->prepare($sql);
// 		$stmt->bindValue(':descripcion', $_POST['dato1']);
// 		$stmt->bindValue(':idProvedor', $_POST['dato2']);
// 		$stmt->execute();
// 		$idPost = $pdo->lastInsertId(); 
// 		if($idPost)
// 		{
// 			header("HTTP/1.1 200 Ok");
// 			echo json_encode($idPost);
// 			exit;
// 		}
// 	}
	
	
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
	
	// if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['eli']))
	// {
	// 	$sql = "DELETE FROM provedor WHERE idProducto=:idProducto";
	// 	$stmt = $pdo->prepare($sql);
	// 	$stmt->bindValue(':idProducto', $_GET['eli']);
	// 	$stmt->execute();
	// 	header("HTTP/1.1 200 Ok");
	// 	echo json_encode(0);
	// 	exit;
	// }
	
	// if($_SERVER['REQUEST_METHOD'] == 'DELETE')
	// {
	// 	$sql = "DELETE FROM provedor WHERE idProducto=:idProducto";
	// 	$stmt = $pdo->prepare($sql);
	// 	$stmt->bindValue(':idProducto', $_GET['eli']);
	// 	$stmt->execute();
	// 	header("HTTP/1.1 200 Ok");
	// 	exit;
	// }

?>