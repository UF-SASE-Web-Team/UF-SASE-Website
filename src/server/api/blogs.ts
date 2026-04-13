import { db } from "@/server/db/db";
import * as Schema from "@db/tables";
import { createErrorResponse, createSuccessResponse } from "@shared/utils";
import { eq, like } from "drizzle-orm";
import { Hono } from "hono";
import { users } from "@db/tables";

const blogRoutes = new Hono();

// helper function to get tags for a blog
const getBlogTags = async (blogId: string) => {
  return db
    .select({ name: Schema.blogTags.name })
    .from(Schema.blogTagRelationship)
    .innerJoin(Schema.blogTags, eq(Schema.blogTags.id, Schema.blogTagRelationship.tagId))
    .where(eq(Schema.blogTagRelationship.blogId, blogId))
    .then((tags) => tags.map((t) => t.name));
};

// helper to add or update tags
const updateBlogTags = async (blogId: string, tags: Array<string> = []) => {
  // delete existing relationships
  await db.delete(Schema.blogTagRelationship).where(eq(Schema.blogTagRelationship.blogId, blogId));

  // add new tag relationships
  if (tags.length > 0) {
    await Promise.all(
      tags.map(async (tagName) => {
        const normalizedTag = tagName.trim();
        if (!normalizedTag) return;

        // find or create tag
        let tagId;
        const existingTag = await db.select().from(Schema.blogTags).where(eq(Schema.blogTags.name, normalizedTag)).limit(1);

        if (existingTag.length > 0) {
          tagId = existingTag[0].id;
        } else {
          // create new tag
          const newTag = await db.insert(Schema.blogTags).values({ name: normalizedTag }).returning();
          tagId = newTag[0].id;
        }

        // create relationship
        await db.insert(Schema.blogTagRelationship).values({ blogId, tagId });
      }),
    );
  }
};

// fetch all blogs with tags
blogRoutes.get("/blogs/all", async (c) => {
  try {
    const blogs = await db
  .select({
    id: Schema.blogs.id,
    title: Schema.blogs.title,
    content: Schema.blogs.content,
    authorId: Schema.blogs.authorId,
    images: Schema.blogs.images,
    publishedDate: Schema.blogs.publishedDate,
    timeUpdated: Schema.blogs.timeUpdated,
    username: users.username,
  })
  .from(Schema.blogs)
  .leftJoin(users, eq(Schema.blogs.authorId, users.id));

    // get tags for each blog
    const blogsWithTags = await Promise.all(
      blogs.map(async (blog) => ({
        ...blog,
        tags: await getBlogTags(blog.id),
      })),
    );

    return createSuccessResponse(c, blogsWithTags, "Blogs retrieved successfully");
  } catch (error) {
    console.error(error);
    return createErrorResponse(c, "FETCH_BLOGS_ERROR", "Cannot fetch blogs", 400);
  }
});

// fetch blog by id with tags
blogRoutes.get("/blogs/:blogID", async (c) => {
  try {
    const blogId = c.req.param("blogID");
    if (!blogId) {
      return createErrorResponse(c, "MISSING_BLOG_ID", "Blog Id required", 400);
    }

    const result = await db.select().from(Schema.blogs).where(eq(Schema.blogs.id, blogId)).limit(1);
    if (result.length === 0) {
      return createErrorResponse(c, "BLOG_NOT_FOUND", "No Blogs Found", 404);
    }

    // get tags for this blog
    const tags = await getBlogTags(blogId);

    return createSuccessResponse(c, { ...result[0], tags }, "Blog retrieved successfully");
  } catch (error) {
    console.error(error);
    return createErrorResponse(c, "FETCH_BLOG_ERROR", "Failed to fetch blog", 500);
  }
});

// search blogs by title
blogRoutes.get("/blogs/search/:title", async (c) => {
  try {
    const searchTitle = c.req.param("title");

    const blogs = await db
  .select({
    id: Schema.blogs.id,
    title: Schema.blogs.title,
    content: Schema.blogs.content,
    authorId: Schema.blogs.authorId,
    images: Schema.blogs.images,
    publishedDate: Schema.blogs.publishedDate,
    timeUpdated: Schema.blogs.timeUpdated,
    username: users.username, 
  })
  .from(Schema.blogs)
  .leftJoin(users, eq(Schema.blogs.authorId, users.id));

    // get tags for each blog
    const blogsWithTags = await Promise.all(
      blogs.map(async (blog) => ({
        ...blog,
        tags: await getBlogTags(blog.id),
      })),
    );

    return createSuccessResponse(c, blogsWithTags, "Blogs retrieved successfully");
  } catch (error) {
    console.error(error);
    return createErrorResponse(c, "SEARCH_BLOGS_ERROR", "Failed to search blogs", 500);
  }
});

// add blog with tags
blogRoutes.post("/blogs/add", async (c) => {
  try {
    const body = await c.req.json();
    const { images = [], tags = [], ...blogData } = body;

    // create blog with proper date handling
    const now = new Date();
    const newBlogArray = await db
      .insert(Schema.blogs)
      .values({
        ...blogData,
        images,
        published_date: now,
        time_updated: now,
      })
      .returning();

    const newBlog = newBlogArray[0];

    // handle tags
    await updateBlogTags(newBlog.id, tags);

    return createSuccessResponse(c, { ...newBlog, tags }, "Blog added successfully");
  } catch (error) {
    console.error("[ADD_BLOG_ERROR]", error);
    return createErrorResponse(c, "ADD_BLOG_ERROR", error instanceof Error ? error.message : "Unknown error occurred", 500);
  }
});

// update blog
blogRoutes.post("/blogs/update", async (c) => {
  try {
    const body = await c.req.json();
    const { id, images, tags, ...update } = body;

    if (!id) {
      return createErrorResponse(c, "MISSING_BLOG_ID", "Blog ID required", 400);
    }

    // update the blog with proper date handling
    const updatedBlog = await db
      .update(Schema.blogs)
      .set({
        ...update,
        images,
        time_updated: new Date(),
      })
      .where(eq(Schema.blogs.id, id))
      .returning();

    // if tags are provided, update them
    if (tags !== undefined) {
      await updateBlogTags(id, tags);
    }

    return createSuccessResponse(c, { ...updatedBlog[0], tags }, "Blog updated successfully");
  } catch (error) {
    console.error(error);
    return createErrorResponse(c, "UPDATE_BLOG_ERROR", "Failed to update blog", 500);
  }
});

export default blogRoutes;
