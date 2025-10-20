// src/client/components/blogs/BlogTags.tsx
import type { BlogTagsProps } from "@/shared/types/blogTypes";
import { cn } from "@/shared/utils";
import React, { useState } from "react";

const BlogTags: React.FC<BlogTagsProps> = ({ activeTag, onSearch, onTagClick, tags }) => {
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const TAGS_PER_PAGE = 3;
  const tagArray = Array.isArray(tags) ? tags : [];
  const totalPages = Math.ceil(tagArray.length / TAGS_PER_PAGE);
  const hasMultiplePages = tagArray.length > TAGS_PER_PAGE;
  const visibleTags = tagArray.slice(currentPage * TAGS_PER_PAGE, currentPage * TAGS_PER_PAGE + TAGS_PER_PAGE);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchText);
  };

  const navButtonClasses = cn(
    "flex items-center px-2 py-1 text-sm",
    "sm:px-3 sm:py-2 sm:text-base",
    "font-serif -mb-px transition-colors hover:border-b-2 hover:border-black text-foreground",
  );

  const tagButtonClasses = (isActive: boolean) =>
    cn(
      "flex items-center px-2 py-1 text-sm italic",
      "sm:px-5 sm:py-2 sm:text-base",
      "font-serif -mb-px transition-colors hover:border-b-2 hover:border-black text-foreground",
      isActive && "border-b-2 border-black font-bold",
    );

  return (
    <div className="mx-auto my-6 flex max-w-6xl flex-col items-center justify-between px-8 sm:flex-row sm:px-12">
      {/* tabs */}
      <div className="flex h-12 w-full flex-shrink-0 items-stretch overflow-x-auto pr-4 sm:w-auto sm:pr-8">
        <div className={cn("flex items-center bg-foreground px-5 py-2 text-background", "font-oswald text-3xl uppercase")}>TAGS</div>
        <div className="relative flex border-b border-gray-300">
          {visibleTags.length > 0 ? (
            <>
              {hasMultiplePages && currentPage > 0 && (
                <>
                  <button className={navButtonClasses} onClick={() => setCurrentPage((p) => p - 1)}>
                    {"<<"}
                  </button>
                  <div className="h-full w-px bg-gray-300" />
                </>
              )}

              {visibleTags.map((tag, i) => (
                <React.Fragment key={i}>
                  <button className={tagButtonClasses(activeTag === tag)} onClick={() => onTagClick?.(tag)}>
                    {tag}
                  </button>
                  {i < visibleTags.length - 1 && <div className="h-full w-px bg-gray-300" />}
                </React.Fragment>
              ))}

              {hasMultiplePages && currentPage < totalPages - 1 && (
                <>
                  <div className="h-full w-px bg-gray-300" />
                  <button className={navButtonClasses} onClick={() => setCurrentPage((p) => p + 1)}>
                    {">>"}
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="px-5 py-2 text-base text-gray-500">No tags available</div>
          )}

          {activeTag && (
            <>
              <div className="h-full w-px bg-gray-300" />
              <button
                className={cn(
                  "-mb-px flex items-center px-5 py-2 font-redhat text-base transition-colors hover:border-b-2 hover:border-black",
                  "text-red-600",
                )}
                onClick={() => onTagClick?.("")}
              >
                Clear
              </button>
            </>
          )}
        </div>
      </div>

      {/* search */}
      <div className="ml-0 mt-4 flex w-full flex-shrink-0 items-center pl-4 sm:mt-0 sm:w-auto sm:pl-8">
        <form onSubmit={handleSearch} className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="dark: w-full rounded-full bg-gray-200 px-4 py-2 text-sm text-black sm:w-64 sm:px-6 sm:py-3 sm:text-base"
          />
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 transform cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogTags;
