DROP INDEX IF EXISTS `email_idx`;--> statement-breakpoint
CREATE INDEX `email_verification_idx` ON `email_verification_codes` (`email`);