CREATE TABLE `r_vote` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`recipe_id` INT(11) NOT NULL,
	`vote` TINYINT(4) NOT NULL DEFAULT 0,
	`user_id` VARCHAR(50) NOT NULL,
	PRIMARY KEY (`id`)
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=24
;