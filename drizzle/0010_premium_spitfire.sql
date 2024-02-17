ALTER TABLE posts ADD `image` text;--> statement-breakpoint
ALTER TABLE posts ADD `show_phone` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE posts ADD `phone` text;