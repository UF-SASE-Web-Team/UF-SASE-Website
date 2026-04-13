import type { Blog as SchemaBaseBlog, CreateBlog as SchemaCreateBlog, UpdateBlog as SchemaUpdateBlog } from "@shared/schema/blogSchema";
import type { BlogTag as SchemaTag } from "@shared/schema/blogTagSchema";

export type BlogBase = SchemaBaseBlog;
export type CreateBlogInput = SchemaCreateBlog;
export type UpdateBlogInput = SchemaUpdateBlog;
export type BlogTag = SchemaTag;

// Enhanced display type that components use
export interface BlogDisplay extends Omit<BlogBase, "images" | "tags" | "authorId"> {
  images: Array<string>;
  tags: Array<string>;
  author: string;
  read_time?: string;
  displayEditButton?: boolean;
}

// Props for blog components
export interface BlogCardProps {
  blog: BlogDisplay;
  expandedBlogId: string | null;
  setExpandedBlogId: (id: string | null) => void;
  isEditing?: boolean;
  setIsEditing?: (state: boolean) => void;
  displayEditButton: boolean;
}

export interface BlogExpandedProps {
  blog: BlogDisplay;
  onClose: () => void;
  showBackButton?: boolean;
  isEditing?: boolean;
  setIsEditing?: (state: boolean) => void;
  onNavigatePrev?: () => void;
  onNavigateNext?: () => void;
}

export interface BlogEditorProps {
  blog: BlogDisplay;
  onClose: () => void;
  showBackButton?: boolean;
  isEditing?: boolean;
  setIsEditing?: (state: boolean) => void;
  onNavigatePrev?: () => void;
  onNavigateNext?: () => void;
}

export interface BlogHeaderProps {
  blogs: Array<BlogDisplay>;
  expandedBlogId: string | null;
  setExpandedBlogId: (id: string | null) => void;
  setIsEditing?: (state: boolean) => void;
}

export interface BlogFormProps {
  isCreating: boolean;
  isEditing: boolean;
  images: Array<string>;
  setImages: (urls: Array<string>) => void;
  newBlogTitle: string;
  newBlogContent: string;
  newBlogTags: Array<string>;
  error: string | null;
  onTitleChange: (title: string) => void;
  onContentChange: (content: string) => void;
  onTagsChange: (tags: Array<string>) => void;
  onSubmit: () => void;
  onCancel: () => void;
  tagsInput?: string;
  setTagsInput?: (input: string) => void;
}

export interface BlogTagsProps {
  tags: Array<string>;
  activeTag?: string | null;
  onTagClick?: (tag: string) => void;
  onSearch?: (query: string) => void;
}

export interface BlogCarouselProps {
  images: Array<string>;
}

export type BlogAPI = BlogBase & {
  username: string;
  tags?: string[];
};