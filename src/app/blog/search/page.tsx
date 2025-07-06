import BlogCardTwo from "@/components/UI/cards/BlogCardTwo";
import Pagination from "@/components/UI/Pagination";
import { DUMMY_BLOG_POSTS, INSTAGRAM_POSTS } from "@/constants/blogs";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

interface PageProps {
  searchParams: Promise<{
    page: string;
    q: string;
  }>;
}
function SearchResults({ searchParams }: PageProps) {
  const { q } = React.use(searchParams);
  const searchQuery = q || "";

  // Filter posts by search query
  const filteredPosts = DUMMY_BLOG_POSTS.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category?.title?.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const totalPosts = filteredPosts.length;
  return (
    <>
      {/* Search Form */}
      <div className="my-6">
        <form action="/blog/search" method="GET" className="flex">
          <input
            type="text"
            name="q"
            defaultValue={searchQuery}
            placeholder="ابحث عن مقالات..."
            className="flex-1 rounded-r-lg border border-gray-300 px-4 py-2 text-right focus:outline-none"
            dir="rtl"
          />
          <button
            type="submit"
            className="rounded-l-lg bg-main px-6 py-2 text-white hover:bg-main-dark"
          >
            بحث
          </button>
        </form>
      </div>

      {/* Search Results Info */}
      {searchQuery && (
        <div className="mb-4 text-right text-gray-600">
          {totalPosts} نتيجة بحث عن {searchQuery}
        </div>
      )}
    </>
  );
}

export default function SearchPage({ searchParams }: PageProps) {
  const { page, q } = React.use(searchParams);
  const searchQuery = q || "";
  const currentPage = Number(page) || 1;

  // Filter posts by search query
  const filteredPosts = DUMMY_BLOG_POSTS.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category?.title?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const postsPerPage = 6;
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  // Paginate results
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 lg:max-w-[1200px]">
        {/* Page Header */}
        <h2 className="mb-4 bg-main px-4 py-2 text-center text-2xl font-semibold text-white">
          {searchQuery ? `نتائج البحث عن ${searchQuery}` : `تصفح المقالات`}
        </h2>
        {/* Main Content Area */}
        <Suspense fallback={<div>جاري تحميل نتائج البحث...</div>}>
          <SearchResults searchParams={searchParams} />
        </Suspense>

        <div className="grid grid-cols-1 gap-6 py-6 md:grid-cols-7">
          <div className="md:col-span-5">
            {paginatedPosts.length > 0 ? (
              <>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {paginatedPosts.map((blog) => (
                    <BlogCardTwo key={blog.slug} {...blog} />
                  ))}
                </div>

                {/* Pagination - Preserves search query */}
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                  />
                )}
              </>
            ) : (
              <div className="py-12 text-center">
                <h3 className="text-xl font-semibold text-gray-700">
                  لا توجد نتائج
                </h3>
                <p className="mt-2 text-gray-500">
                  {searchQuery
                    ? "لم نتمكن من العثور على مقالات تطابق بحثك"
                    : "لا توجد مقالات متاحة حاليًا"}
                </p>
              </div>
            )}
          </div>

          {/* Instagram Sidebar */}
          <div className="md:col-span-2">
            <div className="text-center" dir="rtl">
              <h3 className="mb-4 text-xl font-semibold">
                تابعونا على إنستجرام
              </h3>
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
                      sizes="(max-width: 768px) 100vw, 33vw"
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
