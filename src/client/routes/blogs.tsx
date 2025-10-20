"use client";

import { cn } from "@/shared/utils";
import { Button } from "@components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { imageUrls } from "../assets/imageUrls";
import BlogCard from "../components/blogs/BlogCard";
import BlogContainer from "../components/blogs/BlogContainer";
import BlogEditor from "../components/blogs/BlogEditor";
import BlogExpanded from "../components/blogs/BlogExpanded";
import BlogForm from "../components/blogs/BlogForm";
import BlogHeader from "../components/blogs/BlogHeader";
import BlogTags from "../components/blogs/BlogTags";
import { useBlogFunctions } from "../hooks/useBlogsFunctions";
import { useIsMobile } from "../hooks/useIsMobile";
import { seo } from "../utils/seo";

export const Route = createFileRoute("/blogs")({
  meta: () => [
    ...seo({
      title: "Blogs | UF SASE",
      description: "Blogs page for UF SASE, view and search through all blog posts related to the organization.",
      image: imageUrls["SASELogo.png"],
    }),
  ],
  component: BlogsPage,
});

function BlogsPage() {
  const isMobile = useIsMobile();
  const {
    activeTag,
    blogs,
    error,
    handleCreateBlog,
    handleTagClick,
    handleUpdateBlog,
    isAuthenticated,
    isCreating,
    isEditing,
    newBlogContent,
    newBlogTags,
    newBlogTitle,
    resetForm,
    setCurrentBlog,
    setIsCreating,
    setIsEditing,
    setNewBlogContent,
    setNewBlogTags,
    setNewBlogTitle,
    setSearchQuery,
    tags,
  } = useBlogFunctions();

  const [expandedBlogId, setExpandedBlogId] = useState<string | null>(null);

  // loading states
  if (blogs.isLoading) return <div className="p-4 font-redhat">Loading blogs...</div>;
  if (blogs.isError) return <div className="p-4 font-redhat">Error loading blogs: {blogs.error?.message}</div>;

  // process blogs
  const availableTags = tags.data?.map((tag) => tag.name) || ["Winter Banquet", "Collaborations", "GBMs"];
  const processedBlogs = (blogs.data || []).map((blog) => ({
    ...blog,
    author: blog.authorId || "SASE at UF",
    images: blog.images || [],
    read_time: `${Math.ceil((blog.content?.split(/\s+/).length || 0) / 200)} min`,
    tags: blog.tags || [],
    displayEditButton: isAuthenticated,
  }));

  // filter blogs
  const filteredBlogs = activeTag ? processedBlogs.filter((blog) => blog.tags.some((tag) => tag.toLowerCase() === activeTag)) : processedBlogs;

  const sortedBlogs = [...filteredBlogs].sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());
  // blog groups
  const recentBlogs = !activeTag ? sortedBlogs.slice(0, 2) : [];
  const otherBlogs = !activeTag ? sortedBlogs.slice(2) : sortedBlogs;
  const expandedBlog = expandedBlogId ? sortedBlogs.find((blog) => blog.id === expandedBlogId) : null;
  const currentIndex = sortedBlogs.findIndex((blog) => blog.id === expandedBlogId);
  const prevBlog = currentIndex > 0 ? sortedBlogs[currentIndex - 1] : null;
  const nextBlog = currentIndex < sortedBlogs.length - 1 ? sortedBlogs[currentIndex + 1] : null;

  // handlers
  const handleCloseExpandedBlog = () => {
    setExpandedBlogId(null);
    setCurrentBlog(null);
    document.body.style.overflow = "auto";
  };

  const handleFormCancel = () => {
    setIsCreating(false);
    setIsEditing(false);
    resetForm();
  };

  const sectionTitle = cn(
    "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
    "bg-gradient-to-r from-saseTeal to-saseBlue bg-clip-text text-transparent",
    "font-pixelify font-semibold tracking-wider",
  );

  // display logic
  const displayBlogs = activeTag ? sortedBlogs : otherBlogs;
  const noResultsMessage = activeTag ? `No blogs found with tag: ${activeTag}` : "No blogs found.";

  return (
    <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 md:px-8">
      {/* header */}
      {!expandedBlogId && !activeTag && recentBlogs.length > 0 && (
        <div>
          <BlogHeader
            blogs={isMobile ? [recentBlogs[0]] : recentBlogs}
            expandedBlogId={expandedBlogId}
            setExpandedBlogId={setExpandedBlogId}
            setIsEditing={setIsEditing}
          />
        </div>
      )}

      {/* expanded view */}
      {expandedBlog &&
        expandedBlogId &&
        (isEditing ? (
          <BlogEditor
            blog={expandedBlog}
            onClose={handleCloseExpandedBlog}
            showBackButton={false}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        ) : (
          <BlogExpanded
            blog={expandedBlog}
            onClose={handleCloseExpandedBlog}
            showBackButton={true}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            onNavigatePrev={prevBlog ? () => setExpandedBlogId(prevBlog.id) : undefined}
            onNavigateNext={nextBlog ? () => setExpandedBlogId(nextBlog.id) : undefined}
          />
        ))}

      {!expandedBlogId && (
        <>
          {/* create button */}
          {isAuthenticated && !isCreating && !isEditing && (
            <Button onClick={() => setIsCreating(true)} className="mb-4 font-redhat">
              Create New Blog Post
            </Button>
          )}

          {/* blog form */}
          {isCreating && (
            <BlogForm
              isCreating={isCreating}
              isEditing={false}
              newBlogTitle={newBlogTitle}
              newBlogContent={newBlogContent}
              newBlogTags={newBlogTags}
              error={error}
              onTitleChange={setNewBlogTitle}
              onContentChange={setNewBlogContent}
              onTagsChange={setNewBlogTags}
              onSubmit={isCreating ? handleCreateBlog : handleUpdateBlog}
              onCancel={handleFormCancel}
            />
          )}

          {/* tags */}
          <BlogTags tags={availableTags} activeTag={activeTag} onTagClick={handleTagClick} onSearch={setSearchQuery} />

          {/* title */}
          <div className="mx-auto mb-5 mt-10 max-w-6xl px-2 text-foreground sm:px-0">
            <h2 className={sectionTitle}>{activeTag ? `POSTS TAGGED: ${activeTag}` : "ALL POSTS"}</h2>
          </div>

          {/* blog grid */}
          <div className="relative mb-10 mt-8">
            <BlogContainer>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {displayBlogs.length > 0 ? (
                  displayBlogs.map((blog) => (
                    <BlogCard
                      key={blog.id}
                      blog={blog}
                      expandedBlogId={expandedBlogId}
                      setExpandedBlogId={setExpandedBlogId}
                      isEditing={isEditing}
                      setIsEditing={setIsEditing}
                      displayEditButton={isAuthenticated}
                    />
                  ))
                ) : (
                  <p className="font-redhat text-black">{noResultsMessage}</p>
                )}
              </div>
            </BlogContainer>
          </div>
        </>
      )}
    </div>
  );
}
