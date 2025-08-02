-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: btdi4wfgwvzldtujujj7-mysql.services.clever-cloud.com:3306
-- Tiempo de generación: 02-08-2025 a las 15:25:55
-- Versión del servidor: 8.0.22-13
-- Versión de PHP: 8.2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `btdi4wfgwvzldtujujj7`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`ui9ocui64crd4rjt`@`%` PROCEDURE `lsp_get_available` ()   BEGIN
SELECT 
FORMAT( ((quantity*2)/30) ,2)mounts, 
FORMAT((quantity*2)  ,2) days, 
FORMAT(((quantity*2)/7)  ,2)  semanas, 
FORMAT(((quantity*2)/360)  ,2) years,
'disponivlidad' title  
from medicines  where id = 1;
END$$

CREATE DEFINER=`ui9ocui64crd4rjt`@`%` PROCEDURE `lsp_get_earrings` (IN `p_user_id` INT, IN `p_date_search` DATE)   BEGIN
    -- Desactivar ONLY_FULL_GROUP_BY
    SET sql_mode = (SELECT REPLACE(@@sql_mode, 'ONLY_FULL_GROUP_BY', ''));

    SELECT 
        m.id AS medicine_id, 
        m.name AS medicine_name, 
        DATE(lm.created_at) AS ultima_toma, 
        m.interval_days, 
        DATE(lm.created_at) + INTERVAL m.interval_days DAY AS proxima_toma, 
        
        CASE # Valida si el medicamento tiene mas de una toma por dia
            WHEN um.several_per_day > 0 THEN
                CASE 
                    WHEN (
                        SELECT COUNT(*) 
                        FROM log_medicines lm3 
                        WHERE DATE(lm3.created_at) = p_date_search 
                          AND lm3.medicine_id = m.id 
                          AND lm3.user_id = p_user_id
                    ) < um.several_per_day 
                    THEN 0 
                    ELSE 1 
                END
            ELSE 
                CASE 
                    WHEN yt.id IS NOT NULL THEN 1 
                    ELSE 0 
                END
        END AS ya_tome,
        um.several_per_day,
        IF(m.is_quantity, m.quantity, "N/A") AS quantity,
        m.descript,
        TIME(IF(yt.id, yt.created_at, lm.created_at)) AS hora,
        u.name AS user_name

    FROM log_medicines lm 
    INNER JOIN medicines m ON m.id = lm.medicine_id
    INNER JOIN user_medicines um ON m.id = um.medicine_id 
    INNER JOIN users u ON u.id = um.user_id

    LEFT JOIN (
        SELECT lm2.id, lm2.medicine_id, lm2.created_at
        FROM log_medicines lm2
        WHERE DATE(lm2.created_at) = p_date_search
          AND lm2.user_id = p_user_id
    ) yt ON lm.id AND yt.medicine_id = m.id

    WHERE DATE(lm.created_at) + INTERVAL m.interval_days DAY = p_date_search
      AND m.status = 1
      AND u.id = p_user_id

    GROUP BY m.id 
    ORDER BY m.medicines_types_id, lm.id DESC;
END$$

CREATE DEFINER=`ui9ocui64crd4rjt`@`%` PROCEDURE `lsp_get_investments` ()   BEGIN

	SET SESSION sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));	 
	SELECT
    i.id,
	it.name,
	i.name type_name, 
	i.entity, 
    i.investment_type_id,
	#i.valor, 
    if (investment_type_id = 3,
		(SELECT current_investment FROM  investment_payments WHERE  investment_id = id order by id desc limit 1), 
        i.valor 
        ) valor,
	i.status,
	i.term - (DATEDIFF( date(curdate()) ,date(i.created_at))) days_restantes,
	date(i.created_at) created_at, 
	date(i.expire) expire,
	i.term,  
	DATEDIFF( date(curdate()) ,date(i.created_at)) days_true,
	if(curdate() =  date(i.expire), 1 , 0 ) retiro,
	g.profit_obtained

	FROM investments i 
	JOIN investments_types it ON it.id = investment_type_id 
    LEFT JOIN (
		SELECT investment_id,  sum(current_profit)  profit_obtained, current_investment
		FROM  investment_payments ip 
        GROUP BY investment_id
    ) g ON g.investment_id = i.id 
    ORDER BY i.item_order;
    

    
    
END$$

CREATE DEFINER=`ui9ocui64crd4rjt`@`%` PROCEDURE `lsp_get_permissions` (IN `p_offset` INT, IN `p_limit` INT)   BEGIN

	SET @count = (
    SELECT count(id) 
    FROM permissions
    );

	SELECT
    *,
    @count count
    FROM permissions
    LIMIT  p_offset, p_limit;

END$$

CREATE DEFINER=`ui9ocui64crd4rjt`@`%` PROCEDURE `lsp_get_progress__bar_lv1` (IN `p_user_id` INT)   BEGIN
	SELECT m.id, m.name, m.quantity, 
	(
		SELECT max(quantity) 
		FROM  medicines 
		WHERE is_quantity = 1 
		AND um.user_id = p_user_id  
		AND status = 1  
    ) max_quantity
	FROM
	medicines m
	INNER JOIN user_medicines um ON  m.id = um.medicine_id AND m.status = 1
	WHERE is_quantity = 1
	AND um.user_id = p_user_id 
	ORDER BY quantity DESC;

END$$

CREATE DEFINER=`ui9ocui64crd4rjt`@`%` PROCEDURE `lsp_get_users` (IN `p_offset` INT, IN `p_limit` INT)   BEGIN

	SET @count = (
    SELECT count(id) 
    FROM users
    );

	SELECT
    *,
    @count count
    FROM users
    LIMIT  p_offset, p_limit;

END$$

CREATE DEFINER=`ui9ocui64crd4rjt`@`%` PROCEDURE `lsp_limpiar_log_medicines` ()   BEGIN
    DELETE FROM log_medicines
    WHERE id NOT IN (
        SELECT id FROM (
            SELECT id
            FROM log_medicines
            ORDER BY id DESC
            LIMIT 100
        ) AS sub
    );
END$$

CREATE DEFINER=`ui9ocui64crd4rjt`@`%` PROCEDURE `lsp_save_log` (IN `p_medicine_id` INT, IN `p_user_id` INT, IN `p_date` DATETIME)   BEGIN
	DECLARE is_qty INT DEFAULT 0;
    
    SELECT is_quantity
    INTO is_qty
	FROM  medicines
    WHERE id = p_medicine_id;
    
    IF is_qty = 1 THEN
		UPDATE medicines
		SET 
		quantity  = quantity - 1
		WHERE id =p_medicine_id;
	END IF;
    
    INSERT INTO log_medicines
	SET 
	created_at = p_date,
	updated_at = p_date,
	medicine_id = p_medicine_id,
	user_id 	= p_user_id;
    set @id 	= last_insert_id();
    
    select @id,
    1 status,
    'registro ok' msg ;
    

END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `blogs`
--

CREATE TABLE `blogs` (
  `id` bigint UNSIGNED NOT NULL,
  `titulo` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `contenido` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hours_per_dose`
--

CREATE TABLE `hours_per_dose` (
  `id` int NOT NULL,
  `hour` time NOT NULL,
  `user_medicines_id` int NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `hours_per_dose`
--

INSERT INTO `hours_per_dose` (`id`, `hour`, `user_medicines_id`, `created_at`) VALUES
(1, '07:50:00', 17, '2025-08-02 13:41:36'),
(2, '13:10:00', 17, '2025-08-02 13:41:36'),
(3, '18:00:00', 17, '2025-08-02 13:41:36'),
(4, '13:10:00', 36, '2025-08-02 13:41:36'),
(5, '18:10:00', 36, '2025-08-02 13:41:36');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `investments`
--

CREATE TABLE `investments` (
  `id` int NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `entity` varchar(200) DEFAULT NULL,
  `valor` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  `investment_type_id` int NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `expire` datetime DEFAULT NULL,
  `term` int DEFAULT NULL,
  `profit_obtained` int DEFAULT '0',
  `item_order` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `investments`
--

INSERT INTO `investments` (`id`, `name`, `entity`, `valor`, `status`, `investment_type_id`, `created_at`, `updated_at`, `expire`, `term`, `profit_obtained`, `item_order`) VALUES
(1, '9,25% EA', 'Davivienda', 38299000, 1, 1, '2025-04-23 16:05:44', '2025-04-23 16:05:44', '2026-04-23 16:05:44', 360, 0, 1),
(2, '10% EA', 'Pibank', 3477593, 1, 1, '2025-04-24 16:05:44', '2025-10-24 16:05:44', '2025-10-24 16:05:44', 180, 0, 2),
(3, 'JAV 11% EA', 'Uala', 8348000, 1, 4, '2025-07-01 16:05:44', '2025-04-23 16:05:44', NULL, 360, 0, 4),
(4, 'LID 11% EA', 'Uala', 8300000, 1, 4, '2025-07-01 16:05:44', '2025-04-23 16:05:44', NULL, 360, 0, 5),
(5, '12% EA', 'Pibank', 4599791, 1, 4, '2025-07-29 13:22:59', '2025-07-29 16:05:44', NULL, 30, 0, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `investments_types`
--

CREATE TABLE `investments_types` (
  `id` int NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `investments_types`
--

INSERT INTO `investments_types` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'CDT', 1, '2025-04-16 16:01:39', '2023-04-16 16:01:39'),
(2, 'Fondo de invercion', 1, '2025-04-16 16:01:39', '2023-04-16 16:01:39'),
(3, 'Caja interemdia', 1, '2023-04-16 16:01:39', '2023-04-16 16:01:39'),
(4, 'Cuenta de alto rendimiento', 1, '2025-07-29 13:57:27', '2025-07-29 13:57:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `investment_payments`
--

CREATE TABLE `investment_payments` (
  `id` int NOT NULL,
  `current_investment` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `investment_id` int DEFAULT NULL,
  `status` int DEFAULT NULL,
  `current_profit` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `investment_payments`
--

INSERT INTO `investment_payments` (`id`, `current_investment`, `created_at`, `updated_at`, `investment_id`, `status`, `current_profit`) VALUES
(7, NULL, '2025-07-29 20:22:52', '2025-07-29 20:22:52', 1, 1, 822000),
(8, NULL, '2025-07-29 20:23:10', '2025-07-29 20:23:10', 2, 1, 80504),
(10, NULL, '2025-08-01 01:50:15', '2025-08-01 01:50:15', 3, 1, 5000),
(11, NULL, '2025-08-01 01:50:26', '2025-08-01 01:50:26', 4, 1, 5000),
(12, NULL, '2025-08-01 14:33:31', '2025-08-01 14:33:31', 5, 1, 22223),
(13, NULL, '2025-08-01 14:35:08', '2025-08-01 14:35:08', 3, 1, 2388);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_medicines`
--

CREATE TABLE `log_medicines` (
  `id` int NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `medicine_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `log_medicines`
--

INSERT INTO `log_medicines` (`id`, `created_at`, `updated_at`, `medicine_id`, `user_id`) VALUES
(784, '2023-11-24 15:07:35', '2023-11-24 15:07:35', 4, 1),
(817, '2024-10-14 11:52:25', '2024-10-14 11:52:25', 9, 1),
(818, '2024-10-14 11:52:25', '2024-10-14 11:52:25', 1, 1),
(819, '2024-10-15 11:52:25', '2024-10-15 11:52:25', 9, 1),
(820, '2024-10-15 11:52:25', '2024-10-15 11:52:25', 4, 1),
(821, '2024-10-16 11:52:25', '2024-10-16 11:52:25', 9, 1),
(822, '2024-10-16 11:52:25', '2024-10-16 11:52:25', 1, 1),
(823, '2024-10-17 11:52:25', '2024-10-17 11:52:25', 9, 1),
(824, '2024-10-17 11:52:25', '2024-10-17 11:52:25', 4, 1),
(825, '2024-10-18 11:52:25', '2024-10-18 11:52:25', 9, 1),
(826, '2024-10-18 11:52:25', '2024-10-18 11:52:25', 1, 1),
(827, '2024-10-19 11:52:25', '2024-10-19 11:52:25', 9, 1),
(828, '2024-10-19 11:52:25', '2024-10-19 11:52:25', 4, 1),
(830, '2024-10-19 11:52:25', '2024-10-19 11:52:25', 7, 1),
(831, '2024-10-19 11:52:25', '2024-10-19 11:52:25', 13, 1),
(832, '2024-10-20 22:32:45', '2024-10-20 22:32:45', 13, 1),
(833, '2024-10-20 22:32:47', '2024-10-20 22:32:47', 7, 1),
(834, '2024-10-21 22:32:54', '2024-10-21 22:32:54', 7, 1),
(835, '2024-10-21 22:32:59', '2024-10-21 22:32:59', 13, 1),
(836, '2024-10-22 22:33:06', '2024-10-22 22:33:06', 13, 1),
(837, '2024-10-22 22:33:09', '2024-10-22 22:33:09', 7, 1),
(838, '2024-10-23 22:33:40', '2024-10-23 22:33:40', 7, 1),
(839, '2024-10-23 22:33:45', '2024-10-23 22:33:45', 13, 1),
(840, '2024-10-20 22:34:11', '2024-10-20 22:34:11', 9, 1),
(841, '2024-10-20 22:34:18', '2024-10-20 22:34:18', 1, 1),
(843, '2025-07-28 22:34:11', '2024-10-20 22:34:11', 9, 1),
(845, '2025-07-28 22:34:11', '2024-10-20 22:34:11', 7, 1),
(847, '2025-07-28 22:34:11', '2025-07-28 22:34:11', 15, 1),
(848, '2025-07-28 22:34:11', '2025-07-28 22:34:11', 16, 1),
(849, '2025-07-28 22:34:11', '2025-07-28 22:34:11', 17, 1),
(850, '2025-07-29 00:00:00', '2025-07-29 00:00:00', 9, 1),
(853, '2025-07-28 22:34:11', '2025-07-28 22:34:11', 20, 1),
(854, '2025-07-28 22:34:11', '2025-07-28 22:34:11', 21, 1),
(856, '2025-07-29 00:00:00', '2025-07-29 00:00:00', 20, 1),
(857, '2025-07-29 00:00:00', '2025-07-29 00:00:00', 16, 1),
(858, '2025-07-29 11:39:30', '2025-07-29 11:39:30', 21, 1),
(859, '2025-07-29 11:39:41', '2025-07-29 11:39:41', 7, 1),
(860, '2025-07-30 16:31:56', '2025-07-30 16:31:56', 9, 1),
(861, '2025-07-29 00:00:00', '2025-07-29 00:00:00', 15, 1),
(862, '2025-07-30 00:00:00', '2025-07-30 00:00:00', 15, 1),
(863, '2025-07-30 19:55:16', '2025-07-30 19:55:16', 7, 1),
(865, '2025-07-30 19:55:26', '2025-07-30 19:55:26', 21, 1),
(866, '2025-07-30 19:55:35', '2025-07-30 19:55:35', 16, 1),
(871, '2025-07-31 19:59:07', '2025-07-31 19:59:07', 20, 1),
(872, '2025-07-31 19:59:17', '2025-07-31 19:59:17', 16, 1),
(873, '2025-07-31 19:59:28', '2025-07-31 19:59:28', 21, 1),
(874, '2025-07-31 20:04:17', '2025-07-31 20:04:17', 7, 1),
(875, '2025-07-31 20:04:29', '2025-07-31 20:04:29', 15, 1),
(877, '2025-07-31 20:06:28', '2025-07-31 20:06:28', 9, 1),
(878, '2025-07-31 20:06:28', '2025-07-31 20:06:28', 18, 1),
(879, '2025-08-01 00:00:00', '2025-08-01 00:00:00', 9, 1),
(880, '2025-08-01 00:00:00', '2025-08-01 00:00:00', 20, 1),
(881, '2025-08-01 00:00:00', '2025-08-01 00:00:00', 7, 1),
(883, '2025-08-01 14:03:56', '2025-08-01 14:03:56', 15, 1),
(884, '2025-07-30 14:03:56', '2025-07-30 14:03:56', 3, 1),
(885, '2025-08-01 16:22:16', '2025-08-01 16:22:16', 17, 1),
(886, '2025-08-01 19:19:54', '2025-08-01 19:19:54', 21, 1),
(891, '2025-08-02 09:44:10', '2025-08-02 09:44:10', 7, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicines`
--

CREATE TABLE `medicines` (
  `id` int NOT NULL,
  `name` varchar(250) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `descript` varchar(250) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `interval_days` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  `is_quantity` int DEFAULT NULL,
  `order_` int DEFAULT NULL,
  `medicines_types_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `medicines`
--

INSERT INTO `medicines` (`id`, `name`, `status`, `descript`, `quantity`, `interval_days`, `created_at`, `update_at`, `is_quantity`, `order_`, `medicines_types_id`) VALUES
(1, 'dutasterida', 0, 'Día por medio', 15, 2, '2023-02-04 16:09:36', '2023-02-04 16:09:36', 1, 1, 1),
(2, 'vitamina d', 1, 'Una semanal', 0, 6, '2023-02-04 16:09:36', '2023-02-04 16:09:36', 1, 4, 1),
(3, 'vitamina c', 1, 'Una dosis diaria', 0, 2, '2023-02-04 16:09:36', '2023-02-04 16:09:36', 1, 3, 1),
(4, 'vitaminas dtr pulido', 1, 'Día por medio', 13, 2, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 1, 2, 1),
(5, 'tricobit', 1, 'diario', 0, 3, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0, NULL, 1),
(7, 'colgate', 1, 'diario', 0, 1, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0, NULL, 3),
(8, 'Peluqueada', 1, 'diario', 0, 30, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0, NULL, 3),
(9, 'llt', 1, 'diario', 0, 1, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0, NULL, 1),
(10, 'recorte bello', 1, '15 días', 0, 15, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0, NULL, 3),
(11, 'lubriden', 1, 'Dia por medio', 0, 2, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0, NULL, 1),
(12, 'biotin', 1, 'N/A', 0, 6, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 1, 5, 1),
(13, 'cicatricure', 1, NULL, 0, 1, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0, 6, 1),
(14, 'ojer', 1, NULL, 0, 1, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0, 7, 1),
(15, 'sawpalmeto', 1, 'diario', 53, 1, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 1, 7, 1),
(16, 'minoxidil topico', 1, 'diario', 0, 1, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0, 8, 1),
(17, 'ejer: biceps', 1, 'ejercicio diario', 0, 4, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0, 8, 2),
(18, 'ejer: hombro', 1, 'ejercicio diario', 0, 4, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0, 8, 2),
(19, 'ejer: pectorales', 1, 'ejercicio diario', 0, 4, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0, 8, 2),
(20, 'ejer: quegel', 1, 'ejercicio diario', 0, 1, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0, 8, 2),
(21, 'ejer: m_quegel', 1, 'ejercicio diario', 0, 1, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0, 8, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicines_types`
--

CREATE TABLE `medicines_types` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `medicines_types`
--

INSERT INTO `medicines_types` (`id`, `name`, `status`, `created_at`) VALUES
(1, 'medicamento', 1, '2025-08-01 01:21:49'),
(2, 'ejercicio', 1, '2025-08-01 01:21:49'),
(3, 'habito', 1, '2025-08-01 01:21:49');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(54, '2014_10_12_000000_create_users_table', 1),
(55, '2014_10_12_100000_create_password_resets_table', 1),
(56, '2016_06_01_000001_create_oauth_auth_codes_table', 1),
(57, '2016_06_01_000002_create_oauth_access_tokens_table', 1),
(58, '2016_06_01_000003_create_oauth_refresh_tokens_table', 1),
(59, '2016_06_01_000004_create_oauth_clients_table', 1),
(60, '2016_06_01_000005_create_oauth_personal_access_clients_table', 1),
(61, '2019_08_19_000000_create_failed_jobs_table', 1),
(62, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(63, '2021_09_06_113336_create_blogs_table', 1),
(64, '2023_12_06_121955_create_permission_tables', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `model_has_permissions`
--

INSERT INTO `model_has_permissions` (`permission_id`, `model_type`, `model_id`) VALUES
(27, 'App\\Models\\User', 1),
(28, 'App\\Models\\User', 1),
(29, 'App\\Models\\User', 1),
(32, 'App\\Models\\User', 1),
(33, 'App\\Models\\User', 1),
(34, 'App\\Models\\User', 1),
(41, 'App\\Models\\User', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `client_id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED NOT NULL,
  `client_id` bigint UNSIGNED NOT NULL,
  `scopes` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` bigint UNSIGNED NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redirect` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oauth_personal_access_clients`
--

CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint UNSIGNED NOT NULL,
  `client_id` bigint UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'table.medication', 'api', '2023-12-09 06:30:17', '2023-12-09 06:30:17'),
(27, 'table.medication2', 'api', '2023-12-09 06:30:17', '2023-12-09 06:30:17'),
(28, 'table.medication3', 'api', '2023-12-09 06:30:17', '2023-12-09 06:30:17'),
(29, 'table.medication4', 'api', '2023-12-09 06:30:17', '2023-12-09 06:30:17'),
(30, 'table.medication5', 'api', '2023-12-09 06:30:17', '2023-12-09 06:30:17'),
(31, 'table.medication6', 'api', '2023-12-09 06:30:17', '2023-12-09 06:30:17'),
(32, 'table.medication7', 'api', '2023-12-09 06:30:17', '2023-12-09 06:30:17'),
(33, 'table.medication8', 'api', '2023-12-09 06:30:17', '2023-12-09 06:30:17'),
(34, 'table.medication9', 'api', '2023-12-09 06:30:17', '2023-12-09 06:30:17'),
(35, 'table.medication10', 'api', '2023-12-09 06:30:17', '2023-12-09 06:30:17'),
(36, 'table.medication11', 'api', '2023-12-09 06:30:17', '2023-12-09 06:30:17'),
(37, 'table.medication12', 'api', '2023-12-09 06:30:17', '2023-12-09 06:30:17'),
(38, 'table.medication13', 'api', '2023-12-09 06:30:17', '2023-12-09 06:30:17'),
(39, 'table.medication14', 'api', '2023-12-09 06:30:17', '2023-12-09 06:30:17'),
(40, 'table.medication15', 'api', '2023-12-09 06:30:17', '2023-12-09 06:30:17'),
(41, 'user.control', 'api', '2023-12-09 06:30:17', '2023-12-09 06:30:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permission_role`
--

CREATE TABLE `permission_role` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `permission_role`
--

INSERT INTO `permission_role` (`permission_id`, `role_id`) VALUES
(27, 1),
(28, 1),
(29, 1),
(30, 1),
(31, 1),
(32, 1),
(33, 1),
(34, 1),
(35, 1),
(36, 1),
(37, 1),
(38, 1),
(39, 1),
(40, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'auth_token', '88b8d39861d7b3c45dd6d070426e8ae6afc76dd77d7ee149903677a33fabee12', '[\"*\"]', '2023-12-09 07:04:19', '2023-12-09 06:38:17', '2023-12-09 07:04:19'),
(2, 'App\\Models\\User', 1, 'auth_token', 'dfb243d80c2ca5dd7ee0cb8c92464669163fdc8008bc0eb91ebf6eb7063ab3dc', '[\"*\"]', '2023-12-09 07:05:53', '2023-12-09 07:04:19', '2023-12-09 07:05:53'),
(3, 'App\\Models\\User', 1, 'auth_token', '5c74103ba88eedf27cd0c79dc20bca1ae3c03ea3400b91b69c9a4c04cb2afebe', '[\"*\"]', '2023-12-09 07:06:42', '2023-12-09 07:05:53', '2023-12-09 07:06:42'),
(4, 'App\\Models\\User', 1, 'auth_token', '079d47541db70bb201e9efe1f83cd193328364570e5ed293687cad108e1eaeac', '[\"*\"]', '2023-12-09 07:08:46', '2023-12-09 07:06:42', '2023-12-09 07:08:46'),
(5, 'App\\Models\\User', 1, 'auth_token', '9a7d436181c1bb6b2773ef6f3884c4623a0d8487e40afd998223f5e02e47cf16', '[\"*\"]', '2023-12-09 07:53:54', '2023-12-09 07:08:46', '2023-12-09 07:53:54'),
(6, 'App\\Models\\User', 1, 'auth_token', 'dbbdc4910b98dcdba557f1af6224192f74b515459ab209c8e162e15d28a31bfa', '[\"*\"]', NULL, '2023-12-09 07:18:19', '2023-12-09 07:18:19'),
(7, 'App\\Models\\User', 1, 'auth_token', '9bdf83359ae42864f0c95e6cfe23d7bc8e9d07bbdba6c7aa82ff8520410daa35', '[\"*\"]', '2023-12-09 07:23:10', '2023-12-09 07:21:02', '2023-12-09 07:23:10'),
(8, 'App\\Models\\User', 1, 'auth_token', 'c557506c6a09bda8c63634c9e6682bf754d3b40cb989f0961e0a6ff139722770', '[\"*\"]', '2023-12-09 07:22:51', '2023-12-09 07:22:29', '2023-12-09 07:22:51'),
(9, 'App\\Models\\User', 1, 'auth_token', '7e18b35a45dcbbeb7781a225b55eb7bd0f5b73c1ef7010adc1df229af3cecea6', '[\"*\"]', '2023-12-09 07:25:16', '2023-12-09 07:22:51', '2023-12-09 07:25:16'),
(10, 'App\\Models\\User', 1, 'auth_token', '1b42b9bca86be25b3de44c0f58ccfe095827ffcc4ca750f31d2f710d39ab796f', '[\"*\"]', '2023-12-09 08:06:43', '2023-12-09 07:25:16', '2023-12-09 08:06:43'),
(11, 'App\\Models\\User', 1, 'auth_token', '3f812d3e0e2884a286a2dba3316923b91d55c8877384e66d27a1db90d51e48ad', '[\"*\"]', '2023-12-09 07:38:32', '2023-12-09 07:28:02', '2023-12-09 07:38:32'),
(12, 'App\\Models\\User', 1, 'auth_token', 'ab879a558c140076cb262f6665a75ad852b8c6a6b1d4f593784c51c85658d0ef', '[\"*\"]', '2023-12-09 08:17:44', '2023-12-09 07:53:54', '2023-12-09 08:17:44'),
(13, 'App\\Models\\User', 1, 'auth_token', 'e2f69617f82031a0c23a2d140bb06c30c1de61e1c9f8b04a5c92e34ab0a1c421', '[\"*\"]', '2023-12-09 08:24:03', '2023-12-09 08:17:44', '2023-12-09 08:24:03'),
(14, 'App\\Models\\User', 1, 'auth_token', 'c8bbfae902be098a3934b2ccdb80c634e084291e27000a7b1a6b4ea5a242d969', '[\"*\"]', '2023-12-09 08:49:48', '2023-12-09 08:24:03', '2023-12-09 08:49:48'),
(15, 'App\\Models\\User', 1, 'auth_token', 'b8b5e181319761f563c6a4b6954862e4f293779f39c953b49fce7ed208d434cd', '[\"*\"]', '2023-12-09 09:13:51', '2023-12-09 08:49:48', '2023-12-09 09:13:51'),
(16, 'App\\Models\\User', 1, 'auth_token', '593b0b00217260413b9266e833bc33d5cc50e18798f52cccd76eb39932581ff7', '[\"*\"]', '2023-12-09 09:15:27', '2023-12-09 09:13:51', '2023-12-09 09:15:27'),
(17, 'App\\Models\\User', 1, 'auth_token', 'b14ae9f3619832a56783e9679c081c47509d12a65b0578f78d5cfd47f0ffcf25', '[\"*\"]', '2023-12-09 09:20:20', '2023-12-09 09:15:27', '2023-12-09 09:20:20'),
(18, 'App\\Models\\User', 1, 'auth_token', '9aef7c35e16bed7865e321c057c07377b2b3dfa031dbb6a16b3f5d13834e91d7', '[\"*\"]', NULL, '2023-12-09 09:17:32', '2023-12-09 09:17:32'),
(19, 'App\\Models\\User', 1, 'auth_token', '6ded20610ee0adf74793c85fc127b067c56e54f155cf3f0165b90fb7efe89fc3', '[\"*\"]', NULL, '2023-12-09 09:19:25', '2023-12-09 09:19:25'),
(20, 'App\\Models\\User', 1, 'auth_token', '2fc94e8a2d29a0c658dac5766931bf6c7f392751f2f2566cf06df837b812acb9', '[\"*\"]', '2023-12-09 09:22:11', '2023-12-09 09:20:20', '2023-12-09 09:22:11'),
(21, 'App\\Models\\User', 1, 'auth_token', '78296c6df2a5b7f43275f6a32ddf9aa74910eeba5bbe48c51fb3e86b13b29181', '[\"*\"]', '2023-12-09 09:24:26', '2023-12-09 09:22:11', '2023-12-09 09:24:26'),
(22, 'App\\Models\\User', 1, 'auth_token', 'c61184ec7e7a68b63e084e262e603afd2e9d4fbb1856b49b4fe99dae02a69850', '[\"*\"]', '2023-12-09 09:26:05', '2023-12-09 09:24:26', '2023-12-09 09:26:05'),
(23, 'App\\Models\\User', 1, 'auth_token', 'dfdf0f43e5642b510c9110e58cef81d312feb4b7b6f83307246d48aff3c6e240', '[\"*\"]', '2023-12-09 09:26:19', '2023-12-09 09:26:05', '2023-12-09 09:26:19'),
(24, 'App\\Models\\User', 1, 'auth_token', 'f002e3c6b15ef361f3aba67d2d1a364658d3bf3aab3e24ec899ce9c472150206', '[\"*\"]', '2024-05-21 02:00:23', '2024-05-21 01:49:35', '2024-05-21 02:00:23'),
(25, 'App\\Models\\User', 1, 'auth_token', 'c3fc85d8b4b6a5a0abdf9da409277abf3ef697aa3761e7367fa9ba613178fc9f', '[\"*\"]', '2024-05-21 02:35:09', '2024-05-21 02:03:16', '2024-05-21 02:35:09'),
(26, 'App\\Models\\User', 1, 'auth_token', '1546af54c6541ae56059d1ff5671388c2e0ad753f527c080a37b5f8555968fb8', '[\"*\"]', '2024-10-24 08:34:18', '2024-10-24 08:29:06', '2024-10-24 08:34:18'),
(27, 'App\\Models\\User', 1, 'auth_token', 'ead8f37e70d47c9d0270306e8f5c36fedb2db5869d06111c976b1c38fa31ce72', '[\"*\"]', '2025-07-29 21:37:26', '2025-07-29 18:01:05', '2025-07-29 21:37:26'),
(28, 'App\\Models\\User', 1, 'auth_token', 'c74128ca8b974c343feeb2c312ac6b4082b5ac03ad6cb945a6ecfb9ff6b3fa46', '[\"*\"]', '2025-07-30 16:37:48', '2025-07-29 21:38:16', '2025-07-30 16:37:48'),
(29, 'App\\Models\\User', 1, 'auth_token', '799c49a2d7676a8c29be343d74e6b365cbc3fdd6a9b9631c172cfdb0c6dedb66', '[\"*\"]', '2025-08-01 00:54:57', '2025-07-30 16:37:49', '2025-08-01 00:54:57'),
(30, 'App\\Models\\User', 1, 'auth_token', '6312ab10e9edbdc24a42719e7981809dba16dc304f81cb726a89523713727406', '[\"*\"]', NULL, '2025-08-01 00:54:53', '2025-08-01 00:54:53'),
(31, 'App\\Models\\User', 1, 'auth_token', '23d0285f1d277548d62e2783728890154cae07325bdd2cbee4b3f7bcdc101136', '[\"*\"]', '2025-08-01 00:54:57', '2025-08-01 00:54:53', '2025-08-01 00:54:57'),
(32, 'App\\Models\\User', 1, 'auth_token', '158c56c2279bc48f7166dafde4340a50fa5675ca0eadaf8d7beac0dfe5882f6d', '[\"*\"]', NULL, '2025-08-01 00:54:57', '2025-08-01 00:54:57'),
(33, 'App\\Models\\User', 1, 'auth_token', 'b11ffcd340f30b38d4e41f376e38eefa01dcd43980790636360e3c6c66e589bf', '[\"*\"]', NULL, '2025-08-01 00:54:57', '2025-08-01 00:54:57'),
(34, 'App\\Models\\User', 1, 'auth_token', '4c4c8b6eafd68fc5bb42b4d24b3f4f475f822a05137075e549974f93d91e05ce', '[\"*\"]', NULL, '2025-08-01 00:54:57', '2025-08-01 00:54:57'),
(35, 'App\\Models\\User', 1, 'auth_token', 'a652c97b7ccb97ce42e5e78cfc9d213225aabb0fca2e79e365c00f5c87b27498', '[\"*\"]', '2025-08-01 12:15:06', '2025-08-01 00:54:57', '2025-08-01 12:15:06'),
(36, 'App\\Models\\User', 1, 'auth_token', '3ac9151ee756fe32d292d5afc67f223b2d6dd21800e7b40d183714f3f3c72143', '[\"*\"]', '2025-08-01 12:15:07', '2025-08-01 12:15:02', '2025-08-01 12:15:07'),
(37, 'App\\Models\\User', 1, 'auth_token', '9a644a6cd9b0735cefead9c3620f455ac3e4be1afcf785cdb3c9983997659be1', '[\"*\"]', '2025-08-02 13:27:10', '2025-08-01 12:15:07', '2025-08-02 13:27:10'),
(38, 'App\\Models\\User', 1, 'auth_token', '6b6784155e00efcfcf1b24e681991ba0d4f598a30259cd049770e4af25badefe', '[\"*\"]', '2025-08-01 21:54:14', '2025-08-01 18:32:34', '2025-08-01 21:54:14'),
(39, 'App\\Models\\User', 1, 'auth_token', '204567b3af9aac388a95d452337280cdfd9cedd17f4e419cff31f2f28998af29', '[\"*\"]', '2025-08-01 22:02:33', '2025-08-01 21:54:14', '2025-08-01 22:02:33'),
(40, 'App\\Models\\User', 1, 'auth_token', '2673fe2ba7ffd907b200308ed79324390b3ea89864437508726287f4b32ff248', '[\"*\"]', '2025-08-02 15:25:12', '2025-08-02 13:27:11', '2025-08-02 15:25:12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'api', '2023-12-09 06:30:17', '2023-12-09 06:30:17'),
(2, 'Consultor', 'api', '2023-12-09 06:30:17', '2023-12-09 06:30:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tweets`
--

CREATE TABLE `tweets` (
  `id` int NOT NULL,
  `fecha` longtext,
  `url` longtext,
  `lenguaje` longtext,
  `re_tweets` longtext,
  `tweet_id` longtext,
  `contenido` longtext,
  `user` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `tweets`
--

INSERT INTO `tweets` (`id`, `fecha`, `url`, `lenguaje`, `re_tweets`, `tweet_id`, `contenido`, `user`) VALUES
(1, '', 'https://twitter.com/Andreacely2970/status/1597792559094697984', 'es', '0', '1597792559094697984', '@FSanador @LaikaMascotas @juliherrerap Hermosos, los comprendo mucho y admiro  🤩. Ojalá pudiéramos apoyarnos entre todos 🙏', 'Andreacely2970'),
(2, '', 'https://twitter.com/Andreacely2970/status/1597792559094697984', 'es', '0', '1597792559094697984', '@FSanador @LaikaMascotas @juliherrerap Hermosos, los comprendo mucho y admiro  🤩. Ojalá pudiéramos apoyarnos entre todos 🙏', 'Andreacely2970');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Javier Reyes Neira', 'jav-rn@hotmail.com', NULL, '$2y$10$3bHs9tySr64PGnSqiUCbrOrFV0019P4rh36vwrkp97KdEMH.Kc2gq', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_medicines`
--

CREATE TABLE `user_medicines` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `medicine_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `several_per_day` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `user_medicines`
--

INSERT INTO `user_medicines` (`id`, `user_id`, `medicine_id`, `created_at`, `updated_at`, `several_per_day`) VALUES
(11, 1, 1, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0),
(12, 1, 2, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0),
(13, 1, 3, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0),
(14, 1, 4, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0),
(15, 1, 5, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0),
(17, 1, 7, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 3),
(18, 1, 8, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0),
(19, 1, 9, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0),
(24, 1, 10, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0),
(25, 1, 11, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0),
(26, 1, 12, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0),
(27, 1, 14, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0),
(28, 1, 13, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0),
(30, 1, 16, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0),
(31, 1, 17, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0),
(32, 1, 18, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0),
(34, 1, 19, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0),
(35, 1, 21, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0),
(36, 1, 20, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 2),
(37, 1, 15, '2023-02-04 16:09:50', '2023-02-04 16:09:50', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `hours_per_dose`
--
ALTER TABLE `hours_per_dose`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `investments`
--
ALTER TABLE `investments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_investment_type` (`investment_type_id`);

--
-- Indices de la tabla `investments_types`
--
ALTER TABLE `investments_types`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `investment_payments`
--
ALTER TABLE `investment_payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_investment_payments` (`investment_id`);

--
-- Indices de la tabla `log_medicines`
--
ALTER TABLE `log_medicines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `log_medicines_fk_medicines` (`medicine_id`);

--
-- Indices de la tabla `medicines`
--
ALTER TABLE `medicines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `medicines_types_medicines_fk` (`medicines_types_id`);

--
-- Indices de la tabla `medicines_types`
--
ALTER TABLE `medicines_types`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indices de la tabla `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indices de la tabla `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Indices de la tabla `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_auth_codes_user_id_index` (`user_id`);

--
-- Indices de la tabla `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_user_id_index` (`user_id`);

--
-- Indices de la tabla `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`);

--
-- Indices de la tabla `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indices de la tabla `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indices de la tabla `permission_role`
--
ALTER TABLE `permission_role`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_id` (`role_id`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indices de la tabla `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indices de la tabla `tweets`
--
ALTER TABLE `tweets`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indices de la tabla `user_medicines`
--
ALTER TABLE `user_medicines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_fk_medicines` (`medicine_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `hours_per_dose`
--
ALTER TABLE `hours_per_dose`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `investments`
--
ALTER TABLE `investments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `investments_types`
--
ALTER TABLE `investments_types`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `investment_payments`
--
ALTER TABLE `investment_payments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `log_medicines`
--
ALTER TABLE `log_medicines`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=892;

--
-- AUTO_INCREMENT de la tabla `medicines`
--
ALTER TABLE `medicines`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `medicines_types`
--
ALTER TABLE `medicines_types`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT de la tabla `oauth_clients`
--
ALTER TABLE `oauth_clients`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tweets`
--
ALTER TABLE `tweets`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `user_medicines`
--
ALTER TABLE `user_medicines`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `investments`
--
ALTER TABLE `investments`
  ADD CONSTRAINT `fk_investment_type` FOREIGN KEY (`investment_type_id`) REFERENCES `investments_types` (`id`);

--
-- Filtros para la tabla `investment_payments`
--
ALTER TABLE `investment_payments`
  ADD CONSTRAINT `fk_investment_payments` FOREIGN KEY (`investment_id`) REFERENCES `investments` (`id`);

--
-- Filtros para la tabla `log_medicines`
--
ALTER TABLE `log_medicines`
  ADD CONSTRAINT `log_medicines_fk_medicines` FOREIGN KEY (`medicine_id`) REFERENCES `medicines` (`id`);

--
-- Filtros para la tabla `medicines`
--
ALTER TABLE `medicines`
  ADD CONSTRAINT `medicines_types_medicines_fk` FOREIGN KEY (`medicines_types_id`) REFERENCES `medicines_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `permission_role`
--
ALTER TABLE `permission_role`
  ADD CONSTRAINT `permission_role_ibfk_1` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`),
  ADD CONSTRAINT `permission_role_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

--
-- Filtros para la tabla `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `user_medicines`
--
ALTER TABLE `user_medicines`
  ADD CONSTRAINT `users_fk_medicines` FOREIGN KEY (`medicine_id`) REFERENCES `medicines` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
