import { useBlogFunctions } from "@/client/hooks/useBlogsFunctions";
import type { BlogHeaderProps } from "@/shared/types/blogTypes";
import { OmbreDivider } from "@components/custom_ui/OmbreDivider";
import React from "react";
import BlogCard from "./BlogCard";

const BlogHeader: React.FC<BlogHeaderProps> = ({ blogs, expandedBlogId, setExpandedBlogId, setIsEditing }) => {
  const { isAuthenticated } = useBlogFunctions();
  if (expandedBlogId) {
    return null;
  }

  //blog header is for the title and the recent posts (separate from all blogs)
  return (
    <div className="relative mb-10 mt-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="relative mb-5 flex flex-col items-center justify-between sm:items-center">
          <h1 className="header-text ombre-text">BLOGS</h1>
        </div>
      </div>
      <div className="w-full">
        <OmbreDivider />
        <div className="flex w-full flex-col items-center justify-center bg-black py-10 dark:bg-greenBackground">
          <div className="grid grid-cols-1 place-items-center gap-4 md:grid-cols-2">
            {blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                expandedBlogId={expandedBlogId}
                setExpandedBlogId={setExpandedBlogId}
                setIsEditing={setIsEditing}
                displayEditButton={isAuthenticated}
              />
            ))}
          </div>
        </div>
        <OmbreDivider />
      </div>
    </div>
  );
};

export default BlogHeader;
