CREATE TABLE `recipe` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NOT NULL,
	`description` VARCHAR(500) NULL DEFAULT NULL,
	`verified` TINYINT(4) NULL DEFAULT 0,
	INDEX `Index 1` (`id`)
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=35
;
