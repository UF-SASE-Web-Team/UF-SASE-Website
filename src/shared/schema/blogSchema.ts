import { z } from "zod";

// Blog schema for full blog details
export const blogSchema = z.object({
  id: z.string().min(1, "Blog ID is required."),
  title: z.string().min(1, "Title is required."),
  content: z.string().min(1, "Content cannot be empty."),
  authorId: z.string().min(1, "Author ID is required."),
  publishedDate: z.string().min(0, "Published date must be a valid timestamp."),
  timeUpdated: z.string().min(0, "Update time must be a valid timestamp."),
  images: z.array(z.string().url()).optional(),
  tags: z.array(z.string()).optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export const blogTitleSchema = z.object({
  title: z.string().min(1, "Search title cannot be empty."),
});

export const createBlogSchema = blogSchema
  .omit({
    id: true,
    authorId: true,
    publishedDate: true,
  })
  .extend({
    tags: z.array(z.string()).optional(),
    images: z.array(z.string().url()).optional(),
  });

export const updateBlogSchema = blogSchema
  .partial()
  .omit({
    id: true,
    authorId: true,
    publishedDate: true,
  })
  .extend({
    id: z.string().min(1, "Blog ID is required for updates."),
    images: z.array(z.string().url()).optional(),
  });

export type Blog = z.infer<typeof blogSchema>;
export type BlogTitle = z.infer<typeof blogTitleSchema>;
export type CreateBlog = z.infer<typeof createBlogSchema>;
export type UpdateBlog = z.infer<typeof updateBlogSchema>;

export const blogSearchResponseSchema = z.object({
  blogIds: z.array(z.string().min(1, "Blog ID must be valid.")),
});
