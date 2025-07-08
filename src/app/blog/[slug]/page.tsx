import Image from "next/image";
import ShareButtons from "@/components/UI/Buttons/ShareButtons";
import { DUMMY_BLOG_POSTS } from "@/constants/blogs";
import BlogCard from "@/components/UI/cards/BlogCard";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

const BlogPostPage = ({ params }: BlogPostPageProps) => {
  const { slug } = React.use(params);
  const post = DUMMY_BLOG_POSTS.find((post) => post.slug === slug);
  if (!post) {
    return notFound();
  }

  // Construct the full URL for sharing (replace with your actual domain)
  const currentUrl = `https://your-domain.com/blog/${post.slug}`;

  return (
    <div className="font-inter bg-white text-gray-800 antialiased">
      {/* Metadata is handled by the generateMetadata function */}

      <main className="container mx-auto px-4 lg:max-w-[1200px]">
        {/* Hero Image Section */}
        <div className="relative mb-8 h-64 w-full md:h-[400px]">
          <Image
            src={post.heroImage}
            alt={post.heroImageAlt}
            width={500}
            height={500}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-end gap-2 bg-gradient-to-t from-black/60 to-transparent p-6">
            <h1 className="text-xl font-extrabold leading-tight text-white sm:text-3xl">
              {post.title}
            </h1>
            <div className="flex items-center gap-2">
              <Link
                className="w-fit rounded-md bg-main px-2 py-1 text-xs text-white"
                href={`/blog/categories/${post.category.slug}`}
              >
                {post.category.title}
              </Link>
              <span className="text-xs text-white">{post.readingDuration}</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl">
          {/* Blog Content Section */}
          <article
            className="prose prose-lg max-w-none text-right leading-relaxed text-gray-700 md:text-right"
            dir="rtl"
          >
            {post.content.map((block, index) => {
              if (block.type === "heading") {
                return (
                  <h2
                    key={index}
                    className="mb-4 mt-8 text-2xl font-bold text-gray-900"
                  >
                    {block.text}
                  </h2>
                );
              } else if (block.type === "bold_paragraph") {
                return (
                  <p key={index} className="mb-6 font-bold">
                    {block.text}
                  </p>
                );
              } else if (block.type === "image") {
                return (
                  <div key={index} className="my-8 overflow-hidden">
                    <Image
                      src={
                        block.src ||
                        "https://placehold.co/800x450/CCCCCC/333333?text=Image+Not+Found"
                      }
                      alt={block.alt || "Content Image"}
                      width={800} // Example fixed width for content images
                      height={450} // Example fixed height for content images
                      layout="responsive" // Make image responsive within its container
                      objectFit="cover"
                    />
                    {block.alt && (
                      <p className="mt-2 text-center text-sm text-gray-500">
                        {block.alt}
                      </p>
                    )}
                  </div>
                );
              } else if (block.type === "list_item") {
                return (
                  <li key={index} className="mb-2 mr-6 list-disc text-right">
                    {block.text}
                  </li>
                ); // Tailwind doesn't have RTL list-disc by default, so added mr-6
              } else if (block.type === "quote") {
                return (
                  <blockquote
                    key={index}
                    className="my-6 border-r-4 border-main pl-2 pr-4 text-right italic text-gray-600"
                  >
                    <p className="text-lg">{block.text}</p>
                  </blockquote>
                );
              } else {
                return (
                  <p key={index} className="mb-6">
                    {block.text}
                  </p>
                );
              }
            })}
          </article>

          {/* Share Buttons Section */}
          <section className="mt-8 flex flex-col items-center border-t border-gray-200 py-4 md:flex-row md:justify-end">
            <p className="mb-4 text-lg font-semibold text-gray-900 md:mb-0 md:ml-4">
              شارك المقال:
            </p>{" "}
            {/* Share Article: */}
            <ShareButtons title={post.title} url={currentUrl} />
          </section>

          {/* Related Posts Section */}
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <section className="border-t border-gray-200 py-12 pt-8">
              <h2 className="mb-6 text-right text-3xl font-bold text-gray-900">
                مقالات ذات صلة
              </h2>{" "}
              {/* Related Articles */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {post.relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default BlogPostPage;
