export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  blogs_count: number | null;
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
  blogs_count: number | null;
}

export interface Blog {
  id: number;
  title: string;
  slug: string;
  content_thumbnail: string;
  min_read: number;
  featured_image: string;
  views_count: number;
  author: string;
  category: BlogCategory;
  created_at: string;
}

export interface BlogDetail {
  id: number;
  title: string;
  slug: string;
  content: string;
  min_read: number;
  featured_image: string;
  featured_image_description: string;
  views_count: number;
  author: string;
  category: BlogCategory;
  tags: Array<BlogTag>;
  created_at: string;
}

export interface BlogParams {
  page?: number;
  search?: string;
  sort_by?: "newest" | "oldest" | "views";
  category_id?: number;
  tag_id?: number;
}
