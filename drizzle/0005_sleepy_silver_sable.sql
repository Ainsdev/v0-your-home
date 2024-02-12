CREATE TABLE `email_verification_codes` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`email` text NOT NULL,
	`code` text NOT NULL,
	`expiresAt` integer
);
--> statement-breakpoint
CREATE TABLE `password_reset_tokens` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expiresAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `posts` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`status` text NOT NULL,
	`tags` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at ` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`name` text,
	`email` text,
	`email_verified` integer,
	`google_id` text,
	`username` text,
	`hashed_password` text,
	`verification_level` real DEFAULT 0 NOT NULL,
	`avatar` text,
	`rut` text
);
--> statement-breakpoint
CREATE INDEX `email_idx` ON `email_verification_codes` (`email`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `password_reset_tokens` (`user_id`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `posts` (`user_id`);--> statement-breakpoint
CREATE INDEX `post_created_at_idx` ON `posts` (`created_at`);--> statement-breakpoint
CREATE INDEX `user_idx` ON `sessions` (`user_id`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `users` (`email`);--> statement-breakpoint
CREATE INDEX `discord_idx` ON `users` (`google_id`);