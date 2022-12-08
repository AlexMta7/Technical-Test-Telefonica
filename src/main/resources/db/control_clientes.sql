-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-12-2022 a las 15:42:22
-- Versión del servidor: 10.4.25-MariaDB
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `control_clientes`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `addresses`
--

CREATE TABLE `addresses` (
  `add_id` bigint(40) NOT NULL,
  `add_client_id` bigint(40) NOT NULL,
  `add_address` varchar(255) COLLATE utf8_bin NOT NULL,
  `add_type` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `addresses`
--

INSERT INTO `addresses` (`add_id`, `add_client_id`, `add_address`, `add_type`) VALUES
(33, 5, 'asdfg', 'Oficina'),
(34, 5, 'asdfg', 'Oficina'),
(35, 5, 'asdfg', 'Oficina'),
(36, 5, 'asdfg', 'Oficina'),
(37, 5, 'asdfg', 'Oficina'),
(38, 5, 'asdfg', 'Oficina'),
(40, 5, 'asdfzxzxg', 'Oficina');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clients`
--

CREATE TABLE `clients` (
  `cli_id` bigint(40) NOT NULL,
  `cli_email` varchar(255) COLLATE utf8_bin NOT NULL,
  `cli_lastname` varchar(255) COLLATE utf8_bin NOT NULL,
  `cli_name` varchar(255) COLLATE utf8_bin NOT NULL,
  `cli_service` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `clients`
--

INSERT INTO `clients` (`cli_id`, `cli_email`, `cli_lastname`, `cli_name`, `cli_service`) VALUES
(5, 'alex@hotmail.com', 'Pineda', 'Alex', '123456'),
(6, 'alex2@hotmail.com', 'Mata', 'Alex', 'Movil'),
(14, 'alex2@gmail.com', 'Mata', 'Alex ', 'Service'),
(15, 'marvin@gmail.com', 'Galdamez', 'Marvin', '123');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `documents`
--

CREATE TABLE `documents` (
  `doc_id` bigint(40) NOT NULL,
  `doc_client_id` bigint(40) NOT NULL,
  `doc_document` varchar(255) COLLATE utf8_bin NOT NULL,
  `doc_type` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `documents`
--

INSERT INTO `documents` (`doc_id`, `doc_client_id`, `doc_document`, `doc_type`) VALUES
(57, 5, 'sdfgh', 'DUI'),
(73, 14, '12345', 'ISSS'),
(74, 14, '1234', 'Passport');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logs`
--

CREATE TABLE `logs` (
  `log_id` bigint(40) NOT NULL,
  `log_action` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `log_date` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `log_user_id` bigint(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `logs`
--

INSERT INTO `logs` (`log_id`, `log_action`, `log_date`, `log_user_id`) VALUES
(22, 'Update: 18', '2022-11-11T17:45:02.421415300', 12),
(23, 'Update: 18', '2022-11-11T17:49:20.130111', 12),
(24, 'Update User: 7', '2022-11-11T17:58:58.153948200', 12),
(25, 'User Logged in: 12', '2022-11-15T08:32:37.939338900', 12),
(26, 'Updated User: 18', '2022-11-15T08:33:13.115866300', 12),
(27, 'Deleted User: 18', '2022-11-15T08:33:27.743470100', 12),
(28, 'Added New Client: ', '2022-11-15T08:34:02.218587600', 12),
(29, 'Updated Client: 13', '2022-11-15T08:34:18.207373100', 12),
(30, 'Address Trabajo Added for Client: 13', '2022-11-15T08:35:39.992759', 12),
(31, 'Address Trabajo Updated into Oficina for Client: 13', '2022-11-15T08:36:20.004333700', 12),
(32, 'Address Oficina Deleted for Client: 13', '2022-11-15T08:36:33.385551600', 12),
(33, 'Deleted Client: 13', '2022-11-15T08:36:41.575640300', 12),
(34, 'Document Otro Deleted for Client: 10', '2022-11-15T08:37:03.192414600', 12),
(35, 'Document Otro Updated into Otro for Client: 10', '2022-11-15T08:39:14.303007400', 12),
(36, 'Document Otro Deleted for Client: 10', '2022-11-15T08:39:21.007808800', 12),
(37, 'Document ISSS Added for Client: 10', '2022-11-15T09:19:41.848460300', 12),
(38, 'User Logged in: 12', '2022-11-15T09:20:56.990250400', 12),
(39, 'User Logged in: 12', '2022-11-15T09:21:52.429103500', 12),
(40, 'User Logged in: 12', '2022-11-15T09:22:12.972118200', 12),
(41, 'Updated User: 7', '2022-11-15T09:22:39.307277600', 12),
(42, 'Deleted User: 7', '2022-11-15T09:22:49.968375300', 12),
(43, 'Added New Client: ', '2022-11-15T09:23:16.350103300', 12),
(44, 'Document DUI Added for Client: 14', '2022-11-15T09:24:06.901456400', 12),
(45, 'Address Oficina Added for Client: 14', '2022-11-15T09:24:12.628229300', 12),
(46, 'Document DUI Updated into ISSS for Client: 14', '2022-11-15T09:24:34.841630100', 12),
(47, 'Address Oficina Updated into Departamento for Client: 14', '2022-11-15T09:24:38.741509500', 12),
(48, 'Document ISSS Deleted for Client: 14', '2022-11-15T09:24:59.026981200', 12),
(49, 'Address Departamento Deleted for Client: 14', '2022-11-15T09:25:01.644008800', 12),
(50, 'Deleted Client: 10', '2022-11-15T09:25:17.338253900', 12),
(51, 'Updated Client: 14', '2022-11-15T09:25:32.927036200', 12),
(52, 'Document DUI Added for Client: 14', '2022-11-15T09:26:07.701356500', 12),
(53, 'Document NIT Added for Client: 14', '2022-11-15T09:26:12.642163100', 12),
(54, 'Document DUI Updated into ISSS for Client: 14', '2022-11-15T09:26:30.513770700', 12),
(55, 'Document NIT Updated into Passport for Client: 14', '2022-11-15T09:26:37.700675800', 12),
(56, 'User Logged in: 12', '2022-11-15T09:29:14.810497400', 12),
(57, 'User Logged in: 12', '2022-11-15T09:32:26.332036800', 12),
(58, 'User Logged in: 12', '2022-11-16T11:30:03.272085100', 12),
(59, 'User Logged in: 9', '2022-11-28T09:28:19.269686600', 9),
(60, 'Updated User: 9', '2022-11-28T09:55:24.006345300', 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `us_id` bigint(20) NOT NULL,
  `us_email` varchar(255) COLLATE utf8_bin NOT NULL,
  `us_lastname` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `us_name` varchar(255) COLLATE utf8_bin NOT NULL,
  `us_password` varchar(255) COLLATE utf8_bin NOT NULL,
  `us_type` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`us_id`, `us_email`, `us_lastname`, `us_name`, `us_password`, `us_type`) VALUES
(9, 'alexmata@gmail.com', 'Pinedo', 'Manuel', '', 'ADMIN'),
(12, 'alex@gmail.com', 'Mata', 'Alex ', '$argon2id$v=19$m=1024,t=1,p=1$d8PLoJ5ESv9FPG4ODBVhXQ$Fco7CZesSv9Bcw9E1Dhg2kdN7qRikKLi5iA0UXh6nx8', 'NO_ADMIN'),
(17, 'manuel@hotmail.com', 'Pinedo', 'Manuel', '', 'NO_ADMIN');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`add_id`),
  ADD KEY `FOREIGN KEY` (`add_client_id`);

--
-- Indices de la tabla `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`cli_id`);

--
-- Indices de la tabla `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`doc_id`),
  ADD KEY `FOREIGN KEY` (`doc_client_id`);

--
-- Indices de la tabla `logs`
--
ALTER TABLE `logs`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `FOREIGN KEY` (`log_user_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`us_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `addresses`
--
ALTER TABLE `addresses`
  MODIFY `add_id` bigint(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de la tabla `clients`
--
ALTER TABLE `clients`
  MODIFY `cli_id` bigint(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `documents`
--
ALTER TABLE `documents`
  MODIFY `doc_id` bigint(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT de la tabla `logs`
--
ALTER TABLE `logs`
  MODIFY `log_id` bigint(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `us_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`add_client_id`) REFERENCES `clients` (`cli_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `documents_ibfk_1` FOREIGN KEY (`doc_client_id`) REFERENCES `clients` (`cli_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `logs`
--
ALTER TABLE `logs`
  ADD CONSTRAINT `FOREIGN KEY` FOREIGN KEY (`log_user_id`) REFERENCES `users` (`us_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
