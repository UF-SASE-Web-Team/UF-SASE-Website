import type { BlogFormProps } from "@/shared/types/blogTypes";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { useEffect } from "react";
import BlogImageUploader from "@components/blogs/BlogImageUploader";

const BlogForm: React.FC<BlogFormProps> = ({
  error,
  images,
  isCreating,
  newBlogContent,
  newBlogTags,
  newBlogTitle,
  onCancel,
  onContentChange,
  onSubmit,
  onTagsChange,
  onTitleChange,
  setImages,
  setTagsInput,
  tagsInput,
}) => {
  const handleTagsChange = (value: string) => {
    if (setTagsInput) setTagsInput(value);
    const tagsArray = value
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    onTagsChange(tagsArray);
  };

  useEffect(() => {
    if (setTagsInput) setTagsInput(newBlogTags.join(","));
  }, []);

  return (
    <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">{isCreating ? "Create New Blog Post" : "Edit Blog Post"}</h2>
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
          <Input value={newBlogTitle} onChange={(e) => onTitleChange(e.target.value)} placeholder="Enter blog title" className="w-full" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Content</label>
          <Textarea
            value={newBlogContent}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="Enter blog content"
            className="min-h-[200px] w-full"
          />
        </div>
        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">Images</label>
          <BlogImageUploader images={images} setImages={setImages} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Tags</label>
          <Input value={tagsInput} onChange={(e) => handleTagsChange(e.target.value)} placeholder="Enter tags (comma-separated)" className="w-full" />
        </div>
      </div>
      <div className="mt-4 space-x-2">
        <Button onClick={onSubmit}>{isCreating ? "Create Post" : "Update Post"}</Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
      {error && <div className="mt-2 text-red-500">{error}</div>}
    </div>
  );
};

export default BlogForm;
