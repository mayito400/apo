<?php
require_once "conexion/conexion.php";
//$uri = $_SERVER['REQUEST_URI'];

$pdo = new Conexion();

	if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['page'])){
	    $query = "SELECT cod_editorial_libros, cod_libro, cod_editorial FROM editorial_libros";
			
			$sql = $pdo->prepare($query);
			$sql->execute();
			$sql->setFetchMode(PDO::FETCH_ASSOC);
		     header("HTTP/1.1 200 hay datos");
			echo json_encode($sql->fetchAll());
			//http_response_code(200);
			exit;	  
    }

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['dato1'])){
    	$sql = "INSERT INTO editorial_libros ( COD_EDITORIAL_LIBROS, COD_LIBROS, COD_EDITORIAL) VALUES(:codigo_editorial_libros, :codigo_libros, :codigo_editorial)";
    	$stmt = $pdo->prepare($sql);
    	$stmt->bindValue(':cod_editorial_libros', $_GET['dato1']);
		$stmt->bindValue(':cod_libros', $_GET['dato2']);
		$stmt->bindValue(':cod_editorial', $_GET['dato3']);
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
    $sql = "UPDATE editorial_libros SET COD_EDITORIAL_LIBROS=:cod_editorial_libros, COD_LIBROS=:cod_libros, COD_EDITORIAL=:cod_editorial WHERE COD_EDITORIAL_LIBROS=:cod_editorial_libros";
		$stmt = $pdo->prepare($sql);
		$stmt->bindParam(':cod_editorial_libros', $_GET['dato2']);
		$stmt->bindParam(':cod_libros', $_GET['dato3']);
		$stmt->bindParam(':cod_editorial', $_GET['dato4']);
		$stmt->bindParam(':cod_editorial_libros', $_GET['modi']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
			echo json_encode($_GET['modi']);
		exit;
    
}

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['id'])){
    $query = "SELECT cod_editorial_libros, cod_libro, cod_editorial FROM editorial_libros";
  $sql = $pdo->prepare($query."WHERE  COD_EDITORIAL_LIBROS=:cod_editorial_libros");
			$sql->bindValue(':cod_editorial_libros', $_GET['id']);
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
		$sql = "INSERT INTO editorial_libros ( COD_EDITORIAL_LIBROS, COD_LIBROS, COD_EDITORIAL) VALUES(:codigo_editorial_libros, :codigo_libros, :codigo_editorial)";
		$stmt = $pdo->prepare($sql);
		//$stmt->bindValue(':id', "null");
		$stmt->bindValue(':cod_editorial_libros', $_GET['dato1']);
		$stmt->bindValue(':cod_libros', $_GET['dato2']);
		$stmt->bindValue(':cod_editorial', $_GET['dato3']);
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
		$sql = "UPDATE editorial_libros SET COD_EDITORIAL_LIBROS=:cod_editorial_libros, COD_LIBROS=:cod_libros, COD_EDITORIAL=:cod_editorial WHERE COD_EDITORIAL_LIBROS=:cod_editorial_libros";
		$stmt = $pdo->prepare($sql);
		$stmt->bindParam(':cod_editorial_libros', $_GET['dato2']);
		$stmt->bindParam(':cod_libros', $_GET['dato3']);
		$stmt->bindParam(':cod_editorial', $_GET['dato4']);
		$stmt->bindParam(':cod_editorial_libros', $_GET['modi']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
			echo json_encode($_GET['id']);
		exit;
	}
	
	if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['eli']))
	{
		$sql = "DELETE FROM editorial_libros WHERE cod_editorial_libros=:cod_editorial_libros";
		$stmt = $pdo->prepare($sql);
		$stmt->bindValue(':cod_editorial_libros', $_GET['eli']);
		$stmt->execute();
		header("HTTP/1.1 200 Ok");
		echo json_encode(0);
		exit;
	}
	

?>