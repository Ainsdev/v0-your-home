CREATE TABLE `messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`post_id` integer NOT NULL,
	`user_id` text NOT NULL,
	`link` text,
	`phone` integer NOT NULL,
	`email` text,
	`message` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
ALTER TABLE `posts` RENAME COLUMN `content` TO `aditional_info`;--> statement-breakpoint
ALTER TABLE `users` RENAME COLUMN `rut` TO `personalId`;--> statement-breakpoint
DROP INDEX IF EXISTS `post_created_at_idx`;--> statement-breakpoint
/*
 SQLite does not support "Set autoincrement to a column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
/*
 SQLite does not support "Changing existing column type" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
/*
 SQLite does not support "Set default to column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
/*
 SQLite does not support "Drop not null from column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/--> statement-breakpoint
ALTER TABLE posts ADD `country` text;--> statement-breakpoint
ALTER TABLE posts ADD `city` text;--> statement-breakpoint
ALTER TABLE posts ADD `communes` text;--> statement-breakpoint
ALTER TABLE posts ADD `verification_level` integer;--> statement-breakpoint
ALTER TABLE posts ADD `rooms` text;--> statement-breakpoint
ALTER TABLE posts ADD `people` integer;--> statement-breakpoint
ALTER TABLE posts ADD `bathrooms` text;--> statement-breakpoint
ALTER TABLE posts ADD `parking` integer;--> statement-breakpoint
ALTER TABLE posts ADD `meters` text;--> statement-breakpoint
ALTER TABLE posts ADD `type` integer;--> statement-breakpoint
ALTER TABLE posts ADD `price` text;--> statement-breakpoint
ALTER TABLE posts ADD `costs` text;--> statement-breakpoint
ALTER TABLE users ADD `birthdate` text;--> statement-breakpoint
ALTER TABLE users ADD `country` text;--> statement-breakpoint
ALTER TABLE users ADD `phone` text;--> statement-breakpoint
CREATE INDEX `user_idx` ON `messages` (`user_id`);--> statement-breakpoint
CREATE INDEX `post_idx` ON `messages` (`post_id`);--> statement-breakpoint
CREATE INDEX `post_price_idx` ON `posts` (`price`);--> statement-breakpoint
CREATE INDEX `post_city_idx` ON `posts` (`city`);