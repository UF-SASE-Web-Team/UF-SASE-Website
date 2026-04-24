import { useAuth } from "@/client/hooks/AuthContext";
import { useBlogs } from "@hooks/useBlogs";
import type { BlogAPI, BlogBase, BlogDisplay } from "@shared/types/blogTypes";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchBlogsByTag } from "../api/blogs";

export const useBlogFunctions = () => {
  const { id, isAuthenticated } = useAuth();
  const { blogs, createBlog, tags, updateBlog } = useBlogs();

  // state management
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<BlogDisplay | null>(null);
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogContent, setNewBlogContent] = useState("");
  const [newBlogTags, setNewBlogTags] = useState<Array<string>>([]);
  const [error, setError] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newBlogImages, setNewBlogImages] = useState<Array<string>>([]);

  // filtered blogs query
  const filteredBlogsQuery = useQuery({
    queryKey: ["blogs", "tag", activeTag],
    queryFn: () => (activeTag ? fetchBlogsByTag(activeTag) : Promise.resolve([])),
    enabled: !!activeTag,
  });

  // form validation
  const validateForm = () => {
    if (!newBlogTitle.trim()) {
      setError("Blog title is required");
      return false;
    }
    return true;
  };

  const handleCreateBlog = () => {
    if (!validateForm()) return;

    createBlog.mutate(
      {
        title: newBlogTitle,
        content: newBlogContent,
        tags: newBlogTags,
        authorId: id,
        images: newBlogImages,
      } as unknown as BlogBase,
      {
        onError: (error: Error) => setError(error.message),
        onSuccess: () => {
          setIsCreating(false);
          resetForm();
        },
      },
    );
  };

  const handleUpdateBlog = () => {
    if (!validateForm()) return;

    // Use the current blog ID if it exists
    const blogId = currentBlog?.id;

    if (!blogId) {
      setError("Blog ID is missing");
      return;
    }

    updateBlog.mutate(
      {
        id: blogId,
        title: newBlogTitle,
        content: newBlogContent,
        tags: newBlogTags,
        images: newBlogImages,
      },
      {
        onError: (error: Error) => setError(error.message),
        onSuccess: () => {
          setIsEditing(false);
          resetForm();
        },
      },
    );
  };

  // New function to start editing a blog
  const startEditingBlog = (blog: BlogDisplay) => {
    console.log("blog editing started", blog);
    setCurrentBlog(blog);
    setNewBlogTitle(blog.title);
    setNewBlogContent(blog.content);
    setNewBlogTags(blog.tags || []);
    setNewBlogImages(blog.images || []);
    setIsEditing(true);
    setError(null);
  };

  const handleTagClick = (tagName: string) => {
    const normalizedTagName = tagName.toLowerCase();
    setActiveTag(activeTag === normalizedTagName ? null : normalizedTagName);
  };

  const resetForm = () => {
    setNewBlogTitle("");
    setNewBlogContent("");
    setNewBlogTags([]);
    setNewBlogImages([]);
    setError(null);
  };

  const getBlogDisplayData = (): Array<BlogDisplay> => {
    const blogsToUse = activeTag && filteredBlogsQuery.data ? (filteredBlogsQuery.data as Array<BlogAPI>) : (blogs.data as Array<BlogAPI>) || [];

    return blogsToUse.map((blog) => ({
      ...blog,
      images: blog.images || [],
      author: `${blog.firstName || ""} ${blog.lastName || ""}`.trim() || "UF SASE",
      read_time: `${Math.ceil((blog.content?.split(/\s+/).length || 0) / 200)} min`,
      tags: blog.tags || [],
      displayEditButton: isAuthenticated,
    }));
  };

  return {
    blogs: activeTag ? filteredBlogsQuery : blogs,
    tags,
    isAuthenticated,
    isCreating,
    setIsCreating,
    isEditing,
    setIsEditing,
    currentBlog,
    setCurrentBlog,
    handleCreateBlog,
    handleUpdateBlog,
    startEditingBlog,
    handleTagClick,
    resetForm,
    newBlogTitle,
    setNewBlogTitle,
    newBlogContent,
    setNewBlogContent,
    newBlogTags,
    setNewBlogTags,
    newBlogImages,
    setNewBlogImages,
    error,
    activeTag,
    setActiveTag,
    searchQuery,
    setSearchQuery,
    getBlogDisplayData,
  };
};
