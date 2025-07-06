import { BlogPost } from "@/types/blogs";
import Image from "next/image";
import Link from "next/link";

const BlogCardTwo = ({
  title,
  heroImage,
  category,
  readingDuration,
  description,
  slug,
}: BlogPost) => {
  return (
    <div className="w-full">
      <Link className="block" href={`/blog/${slug}`}>
        <div className="w-full overflow-hidden shadow-md">
          <Image
            src={heroImage}
            alt={title}
            width={400}
            height={400}
            className="h-72 w-full object-cover"
          />
        </div>
        <h2 className="mt-4 text-center text-xl font-bold leading-snug text-gray-800">
          {title}
        </h2>
      </Link>
      <div className="mt-2 space-x-1 space-x-reverse text-center text-sm text-gray-500">
        <Link href={`/blog/categories/${category.slug}`}>
          <span className="font-medium text-main">{category.title}</span>
        </Link>
        <span>•</span>
        <span>{readingDuration}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        {description}
      </p>
    </div>
  );
};

export default BlogCardTwo;
