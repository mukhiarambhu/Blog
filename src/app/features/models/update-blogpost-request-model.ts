export interface updateBlogPost {
  title?: string;
  shortDescription?: string;
  content?: string;
  featuredImageUrl?: string;
  urlHandle?: string;
  publishedDate?: Date;
  author?: string;
  isVisible?: boolean;
  categories?: string[];
}
