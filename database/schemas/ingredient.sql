CREATE TABLE `ingredient` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`description` VARCHAR(500) NULL DEFAULT NULL,
	`name` VARCHAR(60) NOT NULL,
	`verified` TINYINT(4) NULL DEFAULT 0,
	PRIMARY KEY (`id`)
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=36
;
