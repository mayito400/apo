-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 20, 2023 at 09:22 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `genesis`
--

-- --------------------------------------------------------

--

--
-- Dumping data for table `editorial`
--

INSERT INTO `editorial` (`COD_EDITORIAL`, `NOM_EDITORIAL`, `PAIS`, `CIUDAD`, `TELEFONO`, `DIRECCION`) VALUES
(1, 'Suma de letras', 'Colombia', 'Bogotá', '(571) 771 7057 7777', NULL),
(3, 'Let', 'Veneela', 'Caas', '(324) 2345 434', NULL),
(5, 'Letrias', 'Venezuela', 'Caracas', '(324) 2345 434', NULL);

-- --------------------------------------------------------

--

--
-- Dumping data for table `enc_prestamo`
--

INSERT INTO `enc_prestamo` (`COD_ENC_PRESTAMO`, `FECHA_PRESTAMO`, `CANT_LIBRO`, `DNI_USUARIO`) VALUES
(1, '2011-11-11', 11, 1045856213),
(2, '2007-01-14', 3, 1020402543),
(3, '2000-12-24', 4, 1020402543),
(4, '2016-06-21', 4, 2147483647),
(5, '2023-03-02', 1, 1040571170),
(6, '2018-03-15', 8, 1040571170),
(7, '2023-03-01', 1, 456272738),
(8, '2021-12-24', 18, 43952528),
(9, '2020-03-02', 1, 43879524),
(10, '2023-01-03', 1, 2147483647);

-- --------------------------------------------------------

--

--
-- Dumping data for table `genero`
--

INSERT INTO `genero` (`COD_GENERO`, `NOMBRE`) VALUES
(1, 'Accion'),
(2, 'Aventura'),
(3, 'Ciencias Sociales'),
(4, 'Comedia'),
(5, 'Romance'),
(6, 'Terror'),
(7, 'Bellas Artes'),
(8, 'Bibliograficas'),
(9, 'Investigacion'),
(10, 'Programacion'),
(11, 'DESCONOCIDO'),
(12, 'sfjasfi');

-- --------------------------------------------------------

--

-- --------------------------------------------------------

--




--
-- Dumping data for table `multa`
--

INSERT INTO `multa` (`COD_MULTA`, `FECHA_INICIO`, `FECHA_FIN`, `VALOR`) VALUES
(1, '2023-01-03', '2023-02-04', 5000),
(2, '2023-02-15', '2023-03-21', 0),
(3, '2022-06-25', '2023-02-11', 0),
(4, '2017-01-01', '2017-03-08', 0),
(5, '2021-12-30', '2022-02-11', 100100),
(6, '2023-01-03', '2023-02-04', 5000),
(7, '2023-02-15', '2023-03-21', 1000),
(8, '2022-05-05', '2023-06-09', 500),
(9, '2023-02-01', '2023-03-08', 200),
(10, '2022-11-01', '2022-12-06', 500),
(11, '2022-10-01', '2022-11-01', 0);

-- --------------------------------------------------------

--

--
-- Dumping data for table `rol`
--

INSERT INTO `rol` (`cod_rol`, `rol`) VALUES
(1, 'user'),
(2, 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `editorial`
--
ALTER TABLE `editorial`
  ADD PRIMARY KEY (`COD_EDITORIAL`);

--
-- Indexes for table `enc_prestamo`
--
ALTER TABLE `enc_prestamo`
  ADD PRIMARY KEY (`COD_ENC_PRESTAMO`),
  ADD KEY `DNI_USUARIO` (`DNI_USUARIO`);

--
-- Indexes for table `genero`
--
ALTER TABLE `genero`
  ADD PRIMARY KEY (`COD_GENERO`);

--
-- Indexes for table `infoautor`
--
ALTER TABLE `infoautor`
  ADD PRIMARY KEY (`COD_AUTOR`);

--
-- Indexes for table `multa`
--
ALTER TABLE `multa`
  ADD PRIMARY KEY (`COD_MULTA`);

--
-- Indexes for table `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`cod_rol`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `editorial`
--
ALTER TABLE `editorial`
  MODIFY `COD_EDITORIAL` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `enc_prestamo`
--
ALTER TABLE `enc_prestamo`
  MODIFY `COD_ENC_PRESTAMO` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `genero`
--
ALTER TABLE `genero`
  MODIFY `COD_GENERO` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `infoautor`
--
ALTER TABLE `infoautor`
  MODIFY `COD_AUTOR` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `multa`
--
ALTER TABLE `multa`
  MODIFY `COD_MULTA` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `rol`
--
ALTER TABLE `rol`
  MODIFY `cod_rol` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `enc_prestamo`
--
ALTER TABLE `enc_prestamo`
  ADD CONSTRAINT `enc_prestamo_ibfk_1` FOREIGN KEY (`DNI_USUARIO`) REFERENCES `datos_usuario` (`DNI_USUARIO`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
