import { BlogPost } from "@/types/blogs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BlogCardProps {
  post: BlogPost;
  className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, className }) => {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex-shrink-0 rounded-xl border bg-white p-3 shadow-sm ${className}`}
    >
      <div className="h-40 w-full overflow-hidden rounded-md">
        <Image
          width={300}
          height={300}
          src={post.heroImage}
          alt={post.title}
          className="h-full w-full object-cover transition duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
      <h3 className="mt-3 text-center text-sm font-semibold leading-snug text-gray-800 transition group-hover:text-main">
        {post.title}
      </h3>
    </Link>
  );
};

export default BlogCard;
