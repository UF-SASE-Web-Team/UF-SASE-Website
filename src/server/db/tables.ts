import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { generateIdFromEntropySize } from "lucia";

// Here we define our database schema as code
// https://orm.drizzle.team/docs/column-types/sqlite

// Users table
export const users = sqliteTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  username: text("username").notNull().unique(),
  password: text("password"),
  email: text("email").notNull().unique(),
  firstName: text("first_name").notNull().default(""),
  lastName: text("last_name").notNull().default(""),
  timeAdded: integer("time_added")
    .notNull()
    .$defaultFn(() => Date.now()),
  timeUpdated: integer("time_updated")
    .notNull()
    .$onUpdateFn(() => Date.now()),
  points: integer("points").notNull().default(0),
});

// OAuth Accounts table
export const oauthAccounts = sqliteTable("oauth_account", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  provider: text("provider").notNull(),
  providerUserId: text("provider_user_id").notNull(),
  email: text("email"),
  timeAdded: integer("time_added")
    .notNull()
    .$defaultFn(() => Date.now()),
});

// Session table
export const sessions = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: integer("expires_at").notNull(),
});

//Roles table
export const roles = sqliteTable("roles", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  name: text("name").notNull().unique(),
});

//User Roles Relationship table
export const userRoleRelationship = sqliteTable("user_roles_relationship", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  role: text("role")
    .notNull()
    .references(() => roles.name)
    .default("user"),
});

// Professional Info table
export const professionalInfo = sqliteTable("professional_info", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  bio: text("bio").notNull().default(""),
  phone: text("phone").notNull().default(""),
  discord: text("discord").notNull().default(""),
  resumePath: text("resume_path").notNull().default(""),
  linkedin: text("linkedin").notNull().default(""),
  portfolio: text("portfolio").notNull().default(""),
  majors: text("majors").notNull().default(""),
  minors: text("minors").notNull().default(""),
  graduationSemester: text("graduation_semester").notNull().default(""),
});

// SASE Info table
export const saseInfo = sqliteTable("sase_info", {
  userId: text("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  eventsAttended: text("events_attended"),
  groups: text("groups"),
});

// Events table
export const events = sqliteTable("event", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  name: text("name").notNull().unique(),
  description: text("description"),
  timeAdded: integer("time_added")
    .notNull()
    .$defaultFn(() => Date.now()),
  timeUpdated: integer("time_updated")
    .notNull()
    .$onUpdateFn(() => Date.now()),
  location: text("location").notNull(),
  startTime: integer("start_time", { mode: "timestamp" }).notNull(),
  endTime: integer("end_time", { mode: "timestamp" }).notNull(),
  involvedGroups: text("involved_groups"),
  slidesUrl: text("slides_url"),
});

// Blogs table
export const blogs = sqliteTable("blog", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  title: text("title").notNull().unique(),
  content: text("content").notNull(), // Assuming markdown content
  authorId: text("author_id").references(() => users.id, { onDelete: "cascade" }),
  images: text("images", { mode: "json" }).$type<Array<string>>().notNull().default([]),
  publishedDate: integer("published_date", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  timeUpdated: integer("time_updated", { mode: "timestamp" })
    .notNull()
    .$onUpdateFn(() => new Date()),
});

// Blog Tags table
export const blogTags = sqliteTable("blog_tag", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  name: text("name").notNull().unique(),
});

// Blog Tag Relationship table
export const blogTagRelationship = sqliteTable("blog_tag_relationship", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  blogId: text("blog_id").references(() => blogs.id, { onDelete: "cascade" }),
  tagId: text("tag_id").references(() => blogTags.id, { onDelete: "cascade" }),
});

// Mentor/Mentee Relationship table
export const mentorMenteeRelationship = sqliteTable("mentor_mentee_relationship", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  mentorId: text("mentor_id").references(() => users.id, { onDelete: "cascade" }),
  menteeId: text("mentee_id").references(() => users.id, { onDelete: "cascade" }),
});

export const mentorMenteeInvites = sqliteTable("mentor_mentee_invites", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  mentorId: text("mentor_id").references(() => users.id, { onDelete: "cascade" }),
  menteeId: text("mentee_id").references(() => users.id, { onDelete: "cascade" }),
});

export const emailSubscribers = sqliteTable("email_subscriber", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  email: text("email").notNull().unique(),
  name: text("name"),
  subscribedAt: integer("subscribed_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const meetingSlides = sqliteTable("meeting_slides", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => generateIdFromEntropySize(10)),
  category: text("category").notNull(),
  name: text("name").notNull(),
  date: integer("date", { mode: "timestamp" }).notNull(),
  semester: text("semester").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull().unique(),
  embedUrl: text("embed_url").notNull().unique(),
});

// History of Board Members table

export const boardMemberHistory = sqliteTable("board_member_history", {
  name: text("name").notNull(),
  description: text("description"),
  fileName: text("fileName"),
  role: text("role"),
  email: text("email"),
  bio: text("bio"),
  key: text("key").primaryKey(),
  url: text("url").notNull(),
  size: integer("size"),
  uploadedAt: text("uploaded_at"),
});

export const pendingVerifications = sqliteTable("pending_verifications", {
  email: text("email").primaryKey(),
  code: text("code").notNull(),
  userData: text("user_data").notNull(),
  expiresAt: integer("expires_at").notNull(),
  attempts: integer("attempts").notNull().default(0),
});

export const linkedinProfile = sqliteTable("linkedin_profile", {
  user: text("user")
    .primaryKey()
    .references(() => users.id),
  name: text("name").notNull(),
  major: text("major"),
  graduationYear: integer("graduation_year"),
  email: text("email"),
  linkedin: text("linkedin"),
});

export const company = sqliteTable("company", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(),
  startDate: text("start_date"),
  endDate: text("end_date"),
  role: text("role"),
  isCurrent: integer("is_current").default(0).notNull(),
});

// Alumni Bank table
export const alumniBank = sqliteTable("alumni_bank", {
  id: text("id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  major: text("major").notNull(),
  graduationYear: text("graduation_year").notNull(),
  currentCompany: text("current_company").notNull(),
  pastCompanies: text("past_companies", { mode: "json" }).$type<Array<string>>().notNull().default([]),
});
