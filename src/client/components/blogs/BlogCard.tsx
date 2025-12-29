"use client";

import type { BlogCardProps } from "@/shared/types/blogTypes";
import { cn } from "@/shared/utils";
import { imageUrls } from "@assets/imageUrls";
import React from "react";
import { Button } from "../ui/button";

const BlogCard: React.FC<BlogCardProps> = ({ blog, expandedBlogId, isEditing, setExpandedBlogId, setIsEditing }) => {
  if (expandedBlogId === blog.id) {
    return null;
  }
  const formattedDate = blog.publishedDate
    ? new Date(blog.publishedDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";
  const onEditButtonClicked = () => {
    if (blog.id && setIsEditing) {
      setIsEditing(true);
      setExpandedBlogId(blog.id);
    } else {
      console.log("Expanded blog or edit hook undefined");
    }
  };
  return (
    <article className="relative w-full max-w-6xl p-6">
      <div className="group relative">
        {/* shadow card */}
        <div className="absolute left-5 top-5 z-0 h-full w-full rounded-[50px] bg-gradient-to-b from-saseGreen to-saseBlue" />
        <div
          className={cn(
            "absolute left-5 top-5 z-0 h-full w-full rounded-[50px]",
            "bg-gradient-to-b from-saseBlue to-saseGreen opacity-0 transition-opacity duration-700 ease-in-out",
            "group-hover:opacity-100",
          )}
        />

        {/* main card */}
        <section
          className={cn(
            "relative z-10 flex flex-col items-start rounded-[50px] border-2 border-border bg-white p-12",
            "h-[450px] w-full shadow-lg transition sm:h-[600px] sm:flex-col",
          )}
        >
          {blog.displayEditButton && (
            <Button className="absolute right-4 top-4 z-20 shadow-sm sm:right-4 sm:top-4" onClick={onEditButtonClicked}>
              {!isEditing ? "Edit" : "Close"}
            </Button>
          )}
          {/* image */}
          <figure className="mb-6 aspect-video w-full overflow-hidden rounded-[35px]">
            {blog.images && blog.images.length > 0 ? (
              <img src={blog.images[0]} alt={blog.title} className="h-full w-full rounded-[35px] object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-[35px] bg-gray-300 text-gray-500">No Image</div>
            )}
          </figure>
          {/* content */}
          <div className="flex w-full flex-1 flex-col items-stretch">
            <div className="relative flex items-center justify-center">
              {/* title */}
              <div className="relative mb-2 flex w-full items-start justify-start">
                <h2 className={cn("font-oswald text-2xl font-bold text-gray-800 sm:text-4xl")}>{blog.title}</h2>
              </div>
            </div>
            {/* author, date */}
            <p className="mt-2 font-serif text-sm italic text-gray-600 sm:text-lg">{formattedDate}</p>

            {/* read time */}
            {blog.read_time && <span className="mt-2 rounded-full bg-gray-100 px-4 py-1 text-sm text-gray-600">{blog.read_time} read</span>}

            {/* content */}
            <p className={cn("mt-4 line-clamp-4 font-redhat text-gray-700", "text-sm sm:text-lg")}>
              {blog.content ? blog.content.substring(0, 80) + "..." : "No content available"}
            </p>

            {/* read more button*/}
            <div className="mt-6 flex w-full justify-center">
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-full bg-white shadow-md" />
                <Button
                  className={cn(
                    "relative rounded-full bg-saseBlue font-serif italic",
                    "text-white shadow-[2px_4px_12px_rgba(0,0,0,0.2)]",
                    "underline decoration-1 underline-offset-4",
                    "z-10 px-8 py-3",
                    "text-lg sm:text-xl",
                  )}
                  onClick={() => {
                    setExpandedBlogId(blog.id);
                  }}
                >
                  Read more...
                </Button>
              </div>
            </div>
          </div>
          {/* SASE Logo Star */}
          <img
            src={imageUrls["SASELogoStar.png"]}
            alt="Logo"
            className={cn(
              /* mobile */
              "absolute -bottom-10 -right-10 h-24 w-24",
              /* desktop */
              "sm:-bottom-12 sm:-right-12 sm:h-[140px] sm:w-[140px]",
              "object-contain",
            )}
          />
        </section>
      </div>
    </article>
  );
};

export default BlogCard;
