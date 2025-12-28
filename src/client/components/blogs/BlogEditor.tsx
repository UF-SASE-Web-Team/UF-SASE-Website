import type { BlogExpandedProps } from "@/shared/types/blogTypes";
import { cn } from "@/shared/utils";
import React, { useEffect, useState } from "react";
import { useBlogFunctions } from "../../hooks/useBlogsFunctions";
import { Logo } from "../navigation/Logo";
import { Button } from "../ui/button";
import BlogCarousel from "./BlogCarousel";
import BlogForm from "./BlogForm";

const BlogEditor: React.FC<BlogExpandedProps> = ({ blog, isEditing = false, onClose, setIsEditing, showBackButton = true }) => {
  const { error, handleUpdateBlog, newBlogContent, newBlogImages, newBlogTags, newBlogTitle, setCurrentBlog, setNewBlogContent, setNewBlogImages, setNewBlogTags, setNewBlogTitle } =
    useBlogFunctions();
  const [tagsInput, setTagsInput] = useState<string>("");
  const [blogImages, setBlogImages] = useState<Array<string>>([]);
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    console.log(blog.tags);
    // Set the current blog for editing
    setCurrentBlog(blog);
    setNewBlogTitle(blog.title);
    setNewBlogContent(blog.content);
    setTagsInput(blog.tags.join(","));
    setBlogImages(blog.images ?? []);
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [blog, setCurrentBlog, setNewBlogContent, setNewBlogImages, setNewBlogTags, setNewBlogTitle]);

  const handleClose = () => {
    console.log("Close button clicked");
    if (setIsEditing) {
      setIsEditing(false);
    }
    if (onClose) {
      onClose();
    }
  };

  const handleEditButtonClicked = () => {
    if (setIsEditing) {
      setIsEditing(!isEditing);
    }
    console.log("Editing status set to: ", isEditing);
  };

  const handleEditFormSubmit = () => {
    handleUpdateBlog();
    if (setIsEditing) {
      setIsEditing(!isEditing);
    } else {
      console.log("Error: setIsEditing hook not found");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* back button */}
        {showBackButton && (
          <button
            className={cn("mb-6 flex cursor-pointer items-center font-pixelify font-semibold tracking-wider", "text-3xl")}
            onClick={handleClose}
            aria-label="Back to all posts"
          >
            <span className="mr-3 bg-gradient-to-r from-saseGreen to-saseBlue bg-clip-text text-transparent">≪</span>
            <span className="bg-gradient-to-r from-saseGreen to-saseBlue bg-clip-text text-transparent">BACK TO ALL POSTS</span>
          </button>
        )}

        <div className="relative">
          {/* shadow card */}
          <div className="absolute left-5 top-5 z-0 h-full w-full rounded-[50px] bg-gradient-to-b from-saseGreen to-saseBlue"></div>

          {/* main card */}
          <div className={cn("relative z-10 flex flex-col rounded-[50px] border-2 border-border bg-white p-8", "w-full shadow-lg transition")}>
            {/* header */}
            <div className="px-4 py-2 text-center">
              {/*Row with title and edit button*/}
              <div className="relative flex items-center justify-center">
                <h1 className={cn("text-4xl font-bold", "font-oswald")}>{blog.title}</h1>
                {blog.displayEditButton && (
                  <Button className={cn("absolute right-0")} onClick={handleEditButtonClicked}>
                    {!isEditing ? "Edit" : "Close Editor"}
                  </Button>
                )}
              </div>
              <div className={cn("mt-2 flex items-center justify-center text-sm text-gray-600", "font-redhat")}>
                <span className="mr-2">{blog.timeUpdated || "15 min read"}</span>
                <span className="mx-2">by {blog.author}</span>
                <span className="ml-2">
                  {new Date(blog.publishedDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* carousel */}
            <div className="mb-6 mt-4">
              {blogImages.length > 0 ? (
                <BlogCarousel images={blogImages} />
              ) : (
                <div className="flex h-64 w-full items-center justify-center rounded-lg bg-gray-200 text-gray-500">No images available</div>
              )}
              <div className={cn("mt-2 text-center text-sm text-gray-500", "font-redhat")}>
                {blog.images.length > 0 ? "caption lorem ipsum yuh lots of words to say about this photo" : ""}
              </div>
            </div>

            {/* content */}
            <BlogForm
              isCreating={false}
              images={newBlogImages}
              setImages={setNewBlogImages}
              isEditing={isEditing}
              newBlogTitle={newBlogTitle}
              newBlogContent={newBlogContent}
              newBlogTags={newBlogTags}
              error={error}
              onTitleChange={setNewBlogTitle}
              onContentChange={setNewBlogContent}
              tagsInput={tagsInput}
              setTagsInput={setTagsInput}
              onTagsChange={setNewBlogTags}
              onSubmit={handleEditFormSubmit}
              onCancel={() => setIsEditing && setIsEditing(false)}
            />
            {/* nav buttons */}
            <div className="mb-2 mt-auto flex items-center justify-between px-4">
              <Button className={cn("rounded-full bg-saseBlue px-6 py-2 text-white", "transition hover:bg-saseBlue/80", "font-redhat font-medium")}>
                &lt; Read last post
              </Button>

              <div className="absolute bottom-0 right-10 -mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-saseBlue p-3 text-white">
                  <Logo />
                </div>
              </div>

              <Button className={cn("rounded-full bg-saseBlue px-6 py-2 text-white", "transition hover:bg-saseBlue/80", "font-redhat font-medium")}>
                Read next post &gt;
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
