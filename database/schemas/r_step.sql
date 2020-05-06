CREATE TABLE `r_step` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`recipe_id` INT(11) NOT NULL,
	`step` TINYINT(4) NOT NULL,
	`description` VARCHAR(500) NOT NULL DEFAULT '',
	INDEX `Index 1` (`id`)
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=53
;
