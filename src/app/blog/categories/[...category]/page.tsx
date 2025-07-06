import BlogCardTwo from "@/components/UI/cards/BlogCardTwo";
import Pagination from "@/components/UI/Pagination";
import { DUMMY_BLOG_POSTS, INSTAGRAM_POSTS } from "@/constants/blogs";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

interface PageProps {
  params: Promise<{ category: string[] }>;
  searchParams: Promise<{ page: string }>;
}

function BlogContent({ page }: { category: string[]; page?: string }) {
  const currentPage = parseInt(page || "1", 10);
  const postsPerPage = 6;
  const totalPosts = DUMMY_BLOG_POSTS.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Get current page posts
  const paginatedPosts = DUMMY_BLOG_POSTS.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {paginatedPosts.map((blog) => (
          <BlogCardTwo key={blog.slug} {...blog} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}

export default function CategoryPage({ params, searchParams }: PageProps) {
  const { category } = React.use(params);
  const { page } = React.use(searchParams);
  const decodedSlug = decodeURIComponent(category.toString());

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 lg:max-w-[1200px]">
        <h2 className="mb-4 bg-main px-4 py-2 text-center text-lg font-semibold text-white sm:text-2xl">
          {decodedSlug.replace(/-/g, " ")}
        </h2>
        <div className="grid grid-cols-1 gap-6 py-6 md:grid-cols-7">
          <div className="md:col-span-5">
            <Suspense fallback={<div>Loading posts...</div>}>
              <BlogContent category={category} page={page} />
            </Suspense>
          </div>
          <div className="md:col-span-2">
            <div className="text-center" dir="rtl">
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {INSTAGRAM_POSTS.map((post) => (
                  <Link
                    key={post.id}
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative aspect-square overflow-hidden rounded shadow transition-opacity hover:opacity-80"
                  >
                    <Image
                      src={post.imageUrl}
                      alt={`Instagram post ${post.id}`}
                      fill
                      className="object-cover"
                    />
                  </Link>
                ))}
              </div>
              <Link
                href="https://www.instagram.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-auto mt-4 flex w-fit items-center gap-2 rounded bg-main px-6 py-2 font-semibold text-white transition-colors hover:bg-main-dark"
              >
                تابعونا{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  role="img"
                  aria-label="Instagram"
                  className="h-4 w-4 text-pink-600 transition-colors hover:text-pink-700"
                  fill="white"
                >
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
