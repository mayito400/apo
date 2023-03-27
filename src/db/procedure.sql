--! Table structure for table `datos_usuario`

CREATE TABLE `datos_usuario` (
  `DNI_USUARIO` int(20) NOT NULL,
  `NOM_USUARIO` varchar(50) NOT NULL,
  `APELL_USUARIO` varchar(50) NOT NULL,
  `FECHA_NAC` date DEFAULT NULL,
  `CONTRASEÑA` varchar(50) NOT NULL,
  `CORREO` varchar(20) NOT NULL,
  `SEXO` varchar(10) DEFAULT NULL,
  `ESTADO` varchar(10) NOT NULL,
  `COD_ROL` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE DEFINER=`root`@`localhost` PROCEDURE `spAddUser`(IN `_dni` INT, IN `_nom` VARCHAR(50), IN `_apell` VARCHAR(50), IN `_naci` DATE, IN `_contra` VARCHAR(50), IN `_correo` VARCHAR(20), IN `_sexo` VARCHAR(10), IN `_estado` VARCHAR(10), IN `_cod_rol` INT) NOT DETERMINISTIC CONTAINS SQL SQL SECURITY DEFINER BEGIN INSERT INTO datos_usuario( DNI_USUARIO, NOM_USUARIO, APELL_USUARIO, FECHA_NAC, CONTRASEÑA, CORREO, SEXO, ESTADO, COD_ROL ) VALUES( _dni, _nom, _apell, _naci, _contra, _correo, _sexo, _estado, _cod_rol ) ; END
CALL `spAddUser`(_dni, _nom, _apell, _naci, _contra, _correo, _sexo, _estado, _cod_rol);

CREATE PROCEDURE `spGetAllUsers`() NOT DETERMINISTIC CONTAINS SQL SQL SECURITY DEFINER BEGIN SELECT DNI_USUARIO, NOM_USUARIO, APELL_USUARIO, FECHA_NAC, CONTRASEÑA, CORREO, SEXO, ESTADO, COD_ROL FROM datos_usuario; END
CALL `spGetAllUsers`()

CREATE PROCEDURE `spGetUser`(IN `_dni` INT) NOT DETERMINISTIC CONTAINS SQL SQL SECURITY DEFINER BEGIN SELECT DNI_USUARIO, NOM_USUARIO, APELL_USUARIO, FECHA_NAC, CONTRASEÑA, CORREO, SEXO, ESTADO, COD_ROL FROM datos_usuario WHERE DNI_USUARIO = _dni ; END
CALL `spGetUser`(_dni)

CREATE PROCEDURE `spUpdateUser`(IN `_dni` INT, IN `_nom` VARCHAR(50), IN `_apell` VARCHAR(50), IN `_fecha` DATE, IN `_contra` VARCHAR(50), IN `_correo` VARCHAR(20), IN `_sexo` VARCHAR(10), IN `_estado` VARCHAR(10), IN `_cod_rol` INT) NOT DETERMINISTIC CONTAINS SQL SQL SECURITY DEFINER BEGIN UPDATE datos_usuario SET NOM_USUARIO = _nom, APELL_USUARIO = _apell, FECHA_NAC = _fecha, CONTRASEÑA = _contra, CORREO = _correo, SEXO = _sexo, ESTADO = _estado, COD_ROL = _cod_rol WHERE DNI_USUARIO = _dni ; END
CALL `spUpdateUser`(_dni, _nom, _apell, _naci, _contra, _correo, _sexo, _estado, _cod_rol);

CREATE PROCEDURE `spDeleteUser`(IN `_dni` INT) NOT DETERMINISTIC CONTAINS SQL SQL SECURITY DEFINER BEGIN DELETE FROM datos_usuario WHERE DNI_USUARIO = _dni ; END
CALL `spDeleteUser`(_dni)
-- --------------------------------------------------------

--! Table structure for table `editorial`

CREATE TABLE `editorial` (
  `COD_EDITORIAL` int(20) NOT NULL,
  `NOM_EDITORIAL` varchar(50) NOT NULL,
  `PAIS` varchar(50) NOT NULL,
  `CIUDAD` varchar(50) NOT NULL,
  `TELEFONO` varchar(35) NOT NULL,
  `DIRECCION` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;





-- --------------------------------------------------------

--! Table structure for table `enc_prestamo`

CREATE TABLE `enc_prestamo` (
  `COD_ENC_PRESTAMO` int(20) NOT NULL,
  `FECHA_PRESTAMO` date DEFAULT NULL,
  `CANT_LIBRO` int(20) DEFAULT NULL,
  `DNI_USUARIO` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELIMITER //
CREATE PROCEDURE `spGetLoanHeaders` () BEGIN SELECT COD_ENC_PRESTAMO, FECHA_PRESTAMO, CANT_LIBRO, DNI_USUARIO FROM enc_prestamo; END // DELIMITER ;
CALL `spGetLoanHeaders`(_dni, _nom, _apell, _naci, _contra, _correo, _sexo, _estado, _cod_rol);

DELIMITER //
CREATE PROCEDURE `spGetLoanHeadersForId` (IN p_COD_ENC_PRESTAMO INT) BEGIN SELECT COD_ENC_PRESTAMO, FECHA_PRESTAMO, CANT_LIBRO, DNI_USUARIO FROM enc_prestamo WHERE COD_ENC_PRESTAMO = p_COD_ENC_PRESTAMO; END //DELIMITER ;
CALL `spGetLoanHeadersForId`()

DELIMITER //
CREATE PROCEDURE `SPInsertEncPrestamo`(IN p_FECHA_PRESTAMO DATE, IN p_CANT_LIBRO INT, IN p_DNI_USUARIO INT) BEGIN INSERT INTO enc_prestamo (FECHA_PRESTAMO, CANT_LIBRO, DNI_USUARIO) VALUES (p_FECHA_PRESTAMO, p_CANT_LIBRO, p_DNI_USUARIO); END // DELIMITER ;
CALL `SPInsertEncPrestamo`(_dni, _nom, _apell, _naci, _contra, _correo, _sexo, _estado, _cod_rol);

DELIMITER //
CREATE PROCEDURE `SPupdateEncPrestamo`(IN p_COD_ENC_PRESTAMO INT, IN p_FECHA_PRESTAMO DATE, IN p_CANT_LIBRO INT, IN p_DNI_USUARIO INT) BEGIN UPDATE enc_prestamo SET FECHA_PRESTAMO = p_FECHA_PRESTAMO, CANT_LIBRO = p_CANT_LIBRO, DNI_USUARIO = p_DNI_USUARIO WHERE COD_ENC_PRESTAMO = p_COD_ENC_PRESTAMO; END // DELIMITER ;
CALL `SPupdateEncPrestamo`(_dni, _nom, _apell, _naci, _contra, _correo, _sexo, _estado, _cod_rol);

DELIMITER //
CREATE PROCEDURE `SPdeleteEncPrestamo`(IN p_COD_ENC_PRESTAMO INT) BEGIN DELETE FROM enc_prestamo WHERE COD_ENC_PRESTAMO = p_COD_ENC_PRESTAMO; END // DELIMITER ;
CALL `SPdeleteEncPrestamo`(_dni)

-- --------------------------------------------------------

--! Table structure for table `genero`

CREATE TABLE `genero` (
  `COD_GENERO` int(20) NOT NULL,
  `NOMBRE` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;





-- --------------------------------------------------------

--! Table structure for table `infoautor`

CREATE TABLE `infoautor` (
  `COD_AUTOR` int(20) NOT NULL,
  `NOM_AUTOR` varchar(40) NOT NULL,
  `FECHA_NACIMIENTO` date NOT NULL,
  `LUGAR_NACIMIENTO` varchar(50) NOT NULL,
  `FECHA_MUERTE` date DEFAULT NULL,
  `OCUPACIONES` varchar(40) NOT NULL,
  `MOVIMIENTO_LITERARIO` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
 

DELIMITER //
CREATE PROCEDURE  `spGetAuthor`() BEGIN SELECT COD_AUTOR, NOM_AUTOR, FECHA_NACIMIENTO, LUGAR_NACIMIENTO, FECHA_MUERTE, OCUPACIONES, MOVIMIENTO_LITERARIO FROM infoautor; END // DELIMITER ;
CALL `spGetAuthor`(_dni, _nom, _apell, _naci, _contra, _correo, _sexo, _estado, _cod_rol);

DELIMITER //
CREATE PROCEDURE `spGetAuthorForId`(IN id INT) BEGIN SELECT COD_AUTOR, NOM_AUTOR, FECHA_NACIMIENTO, LUGAR_NACIMIENTO, FECHA_MUERTE, OCUPACIONES, MOVIMIENTO_LITERARIO FROM infoautor WHERE COD_AUTOR = id; END // DELIMITER ;
CALL `spGetAuthorForId`()

DELIMITER //
CREATE PROCEDURE `spInsertAuthor`(IN id INT, IN nom VARCHAR(40), IN fecha DATE, IN lugar VARCHAR(50), IN muerte DATE, IN ocup VARCHAR(40), IN mov VARCHAR(50)) BEGIN INSERT INTO infoautor (COD_AUTOR, NOM_AUTOR, FECHA_NACIMIENTO, LUGAR_NACIMIENTO, FECHA_MUERTE, OCUPACIONES, MOVIMIENTO_LITERARIO) VALUES (id, nom, fecha, lugar, muerte, ocup, mov);END // DELIMITER ;
CALL `spInsertAuthor`(_dni, _nom, _apell, _naci, _contra, _correo, _sexo, _estado, _cod_rol);

DELIMITER //
CREATE PROCEDURE `spUpdateAuthor`(IN id INT, IN nom VARCHAR(40), IN fecha DATE, IN lugar VARCHAR(50), IN muerte DATE, IN ocup VARCHAR(40), IN mov VARCHAR(50)) BEGIN UPDATE infoautor SET NOM_AUTOR = nom, FECHA_NACIMIENTO = fecha, LUGAR_NACIMIENTO = lugar, FECHA_MUERTE = muerte, OCUPACIONES = ocup, MOVIMIENTO_LITERARIO = mov WHERE COD_AUTOR = id;END // DELIMITER ;
CALL `spupdatefoAuthor`(_dni, _nom, _apell, _naci, _contra, _correo, _sexo, _estado, _cod_rol);

DELIMITER //
CREATE PROCEDURE `spDeleteAuthor`(IN id INT) BEGIN DELETE FROM infoautor WHERE COD_AUTOR = id;END // DELIMITER ;
CALL `spDeleteAuthor`(_dni)

-- --------------------------------------------------------

--! Table structure for table `multa`

CREATE TABLE `multa` (
  `COD_MULTA` int(4) NOT NULL,
  `FECHA_INICIO` date DEFAULT NULL,
  `FECHA_FIN` date DEFAULT NULL,
  `VALOR` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELIMITER $$
CREATE PROCEDURE `spGetPenaltys`()
BEGIN
SELECT COD_MULTA, FECHA_INICIO, FECHA_FIN, VALOR FROM multa;
END$$
DELIMITER ;
CALL `spGetPenaltys`()

DELIMITER $$
CREATE PROCEDURE `spGetPenaltysForId`(IN `_COD_MULTA` INT)
BEGIN
SELECT COD_MULTA, FECHA_INICIO, FECHA_FIN, VALOR
FROM multa
WHERE COD_MULTA = _COD_MULTA;
END$$
DELIMITER ;
CALL `spGetPenaltysForId`(_COD_MULTA)

DELIMITER $$
CREATE PROCEDURE `spInsertPenaltys`(IN _COD_MULTA INT, IN _FECHA_INICIO DATE, IN _FECHA_FIN DATE, IN _VALOR INT)
BEGIN
INSERT INTO multa (COD_MULTA, FECHA_INICIO, FECHA_FIN, VALOR)
VALUES (_COD_MULTA, _FECHA_INICIO, _FECHA_FIN, _VALOR);
END$$
DELIMITER ;
CALL `spInsertPenaltys`(_COD_MULTA, _FECHA_INICIO, _FECHA_FIN, _VALOR)

DELIMITER $$
CREATE PROCEDURE `spUpdatePenaltys`(IN _COD_MULTA INT, IN _FECHA_INICIO DATE, IN _FECHA_FIN DATE, IN _VALOR INT)
BEGIN
UPDATE multa
SET FECHA_INICIO = _FECHA_INICIO, FECHA_FIN = _FECHA_FIN, VALOR = _VALOR
WHERE COD_MULTA = _COD_MULTA;
END$$
DELIMITER ;
CALL `spUpdatePenaltys`(_COD_MULTA,_FECHA_INICIO,_FECHA_FIN,_VALOR )

DELIMITER $$
CREATE PROCEDURE `spDeletePenaltys`(IN _COD_MULTA INT)
BEGIN
DELETE FROM multa WHERE COD_MULTA = _COD_MULTA;
END$$
DELIMITER ;
CALL `spDeletePenaltys`(_COD_MULTA)
-- --------------------------------------------------------

--! Table structure for table `rol`

CREATE TABLE `rol` (
  `cod_rol` int(4) NOT NULL,
  `rol` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELIMITER $$
CREATE PROCEDURE `spGetRoles`()
BEGIN
SELECT cod_rol, rol FROM rol;
END$$
DELIMITER ;
CALL `spGetRoles`()

DELIMITER $$
CREATE PROCEDURE `spGetRolesForId`(IN _cod_rol INT)
BEGIN
SELECT cod_rol, rol FROM rol WHERE cod_rol = _cod_rol;
END$$
DELIMITER ;
CALL `spGetRolesForId`(_cod_rol)

DELIMITER $$
CREATE PROCEDURE `spInsertRoles`(IN _cod_rol INT, IN _rol VARCHAR(50))
BEGIN
INSERT INTO rol (cod_rol, rol) VALUES (_cod_rol, _rol);
END$$
DELIMITER ;
CALL `spInsertRoles`(_cod_rol, _rol)

DELIMITER $$
CREATE PROCEDURE `spUpdateRoles`(IN _cod_rol INT, IN _rol VARCHAR(50))
BEGIN
UPDATE rol SET rol = _rol WHERE cod_rol = _cod_rol;
END$$
DELIMITER ;
CALL `spUpdateRoles`(_cod_rol, _rol)

DELIMITER $$
CREATE PROCEDURE `spDeleteRoles`(IN _cod_rol INT)
BEGIN
DELETE FROM rol WHERE cod_rol = _cod_rol;
END$$
DELIMITER ;
CALL `spDeleteRoles`(_cod_rol)


-- --------------------------------------------------------
