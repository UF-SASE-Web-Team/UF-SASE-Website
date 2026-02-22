CREATE TABLE `board_member_history` (
	`name` text NOT NULL,
	`description` text,
	`fileName` text,
	`role` text,
	`email` text,
	`bio` text,
	`key` text PRIMARY KEY NOT NULL,
	`url` text NOT NULL,
	`size` integer,
	`uploaded_at` text
);
--> statement-breakpoint
CREATE TABLE `company` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`start_date` text,
	`end_date` text,
	`role` text,
	`is_current` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `email_subscriber` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text,
	`subscribed_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `email_subscriber_email_unique` ON `email_subscriber` (`email`);--> statement-breakpoint
CREATE TABLE `linkedin_profile` (
	`user` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`major` text,
	`graduation_year` integer,
	`email` text,
	`linkedin` text,
	FOREIGN KEY (`user`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `meeting_slides` (
	`id` text PRIMARY KEY NOT NULL,
	`category` text NOT NULL,
	`name` text NOT NULL,
	`date` integer NOT NULL,
	`semester` text NOT NULL,
	`thumbnail_url` text NOT NULL,
	`embed_url` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `meeting_slides_thumbnail_url_unique` ON `meeting_slides` (`thumbnail_url`);--> statement-breakpoint
CREATE UNIQUE INDEX `meeting_slides_embed_url_unique` ON `meeting_slides` (`embed_url`);--> statement-breakpoint
CREATE TABLE `mentor_mentee_invites` (
	`id` text PRIMARY KEY NOT NULL,
	`mentor_id` text,
	`mentee_id` text,
	FOREIGN KEY (`mentor_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`mentee_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `oauth_account` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`provider` text NOT NULL,
	`provider_user_id` text NOT NULL,
	`email` text,
	`time_added` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `pending_verifications` (
	`email` text PRIMARY KEY NOT NULL,
	`code` text NOT NULL,
	`user_data` text NOT NULL,
	`expires_at` integer NOT NULL,
	`attempts` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `roles_name_unique` ON `roles` (`name`);--> statement-breakpoint
CREATE TABLE `user_roles_relationship` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`role` text DEFAULT 'user' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`role`) REFERENCES `roles`(`name`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
DROP TABLE `personal_info`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_blog_tag_relationship` (
	`id` text PRIMARY KEY NOT NULL,
	`blog_id` text,
	`tag_id` text,
	FOREIGN KEY (`blog_id`) REFERENCES `blog`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tag_id`) REFERENCES `blog_tag`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_blog_tag_relationship`("id", "blog_id", "tag_id") SELECT "id", "blog_id", "tag_id" FROM `blog_tag_relationship`;--> statement-breakpoint
DROP TABLE `blog_tag_relationship`;--> statement-breakpoint
ALTER TABLE `__new_blog_tag_relationship` RENAME TO `blog_tag_relationship`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_blog` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`author_id` text,
	`images` text DEFAULT '[]' NOT NULL,
	`published_date` integer NOT NULL,
	`time_updated` integer NOT NULL,
	FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_blog`("id", "title", "content", "author_id", "images", "published_date", "time_updated") SELECT "id", "title", "content", "author_id", "images", "published_date", "time_updated" FROM `blog`;--> statement-breakpoint
DROP TABLE `blog`;--> statement-breakpoint
ALTER TABLE `__new_blog` RENAME TO `blog`;--> statement-breakpoint
CREATE UNIQUE INDEX `blog_title_unique` ON `blog` (`title`);--> statement-breakpoint
CREATE TABLE `__new_mentor_mentee_relationship` (
	`id` text PRIMARY KEY NOT NULL,
	`mentor_id` text,
	`mentee_id` text,
	FOREIGN KEY (`mentor_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`mentee_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_mentor_mentee_relationship`("id", "mentor_id", "mentee_id") SELECT "id", "mentor_id", "mentee_id" FROM `mentor_mentee_relationship`;--> statement-breakpoint
DROP TABLE `mentor_mentee_relationship`;--> statement-breakpoint
ALTER TABLE `__new_mentor_mentee_relationship` RENAME TO `mentor_mentee_relationship`;--> statement-breakpoint
CREATE TABLE `__new_professional_info` (
	`user_id` text PRIMARY KEY NOT NULL,
	`bio` text DEFAULT '' NOT NULL,
	`phone` text DEFAULT '' NOT NULL,
	`discord` text DEFAULT '' NOT NULL,
	`resume_path` text DEFAULT '' NOT NULL,
	`linkedin` text DEFAULT '' NOT NULL,
	`portfolio` text DEFAULT '' NOT NULL,
	`majors` text DEFAULT '' NOT NULL,
	`minors` text DEFAULT '' NOT NULL,
	`graduation_semester` text DEFAULT '' NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_professional_info`("user_id", "bio", "phone", "discord", "resume_path", "linkedin", "portfolio", "majors", "minors", "graduation_semester") SELECT "user_id", "bio", "phone", "discord", "resume_path", "linkedin", "portfolio", "majors", "minors", "graduation_semester" FROM `professional_info`;--> statement-breakpoint
DROP TABLE `professional_info`;--> statement-breakpoint
ALTER TABLE `__new_professional_info` RENAME TO `professional_info`;--> statement-breakpoint
CREATE TABLE `__new_sase_info` (
	`user_id` text PRIMARY KEY NOT NULL,
	`events_attended` text,
	`groups` text,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_sase_info`("user_id", "events_attended", "groups") SELECT "user_id", "events_attended", "groups" FROM `sase_info`;--> statement-breakpoint
DROP TABLE `sase_info`;--> statement-breakpoint
ALTER TABLE `__new_sase_info` RENAME TO `sase_info`;--> statement-breakpoint
CREATE TABLE `__new_session` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_session`("id", "user_id", "expires_at") SELECT "id", "user_id", "expires_at" FROM `session`;--> statement-breakpoint
DROP TABLE `session`;--> statement-breakpoint
ALTER TABLE `__new_session` RENAME TO `session`;--> statement-breakpoint
DROP INDEX IF EXISTS "blog_tag_name_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "blog_title_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "email_subscriber_email_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "event_name_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "meeting_slides_thumbnail_url_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "meeting_slides_embed_url_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "roles_name_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "user_username_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "user_email_unique";--> statement-breakpoint
ALTER TABLE `user` ALTER COLUMN "points" TO "points" integer NOT NULL DEFAULT 0;--> statement-breakpoint
CREATE UNIQUE INDEX `blog_tag_name_unique` ON `blog_tag` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `event_name_unique` ON `event` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
ALTER TABLE `user` ALTER COLUMN "points" TO "points" integer NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `password` text;--> statement-breakpoint
ALTER TABLE `user` ADD `email` text NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `first_name` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `user` ADD `last_name` text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `password_hash`;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `roles`;--> statement-breakpoint
ALTER TABLE `event` ADD `slides_url` text;