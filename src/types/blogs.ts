// Define the type for different content blocks
export interface ContentBlock {
  type:
    | "paragraph"
    | "heading"
    | "bold_paragraph"
    | "image"
    | "list_item"
    | "quote";
  text?: string; // Optional for image type
  src?: string; // For image type
  alt?: string; // For image type
}
export interface Category {
  title: string;
  slug: string;
}

// Define the type for a blog post
export interface BlogPost {
  slug: string;
  title: string;
  heroImage: string;
  heroImageAlt: string;
  content: ContentBlock[]; // Array of structured content blocks
  relatedPosts: BlogPost[];
  readingDuration: string;
  category: Category;
  description: string;
}
