CREATE TABLE `r_ingredient` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`ingredient_id` INT(11) NOT NULL,
	`recipe_id` INT(11) NOT NULL,
	`amount` FLOAT NOT NULL DEFAULT 0,
	`amount_unit` VARCHAR(10) NOT NULL,
	INDEX `Index 1` (`id`)
)
COMMENT='Recipe ingredient'
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=9
;
