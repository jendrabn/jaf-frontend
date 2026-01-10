import { useGetBlogs } from "@/features/blogs/api";
import type { BlogParamsTypes } from "@/types/blog";
import BlogItem from "@/features/blogs/components/BlogItem";
import Loading from "@/components/ui/loading";
import Pagination from "@/components/ui/pagination";
import Layout from "@/components/layouts/Layout";
import BlogHeader from "@/features/blogs/components/BlogHeader";
import useFilters from "@/hooks/use-filters";
import NoData from "@/components/ui/no-data";

import { env } from "@/config/env";
import SEO from "@/components/SEO";
import BlogSidebar from "@/features/blogs/components/BlogSidebar";

const BlogPage = () => {
  const { params, setFilter } = useFilters<BlogParamsTypes>();
  const { data: blogs, isLoading } = useGetBlogs(params);

  const handlePageClick = (page: number) => {
    setFilter("page", page);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <Layout>
      <SEO
        title="Blog"
        description="Temukan artikel menarik seputar dunia parfum di blog kami. Baca tips, ulasan, dan berita terbaru tentang parfum."
        keywords="blog parfum, tips parfum, ulasan parfum, berita parfum, aroma parfum, jenis parfum"
        canonical={`${env.APP_URL}/blog`}
        ogType="website"
      />

      <div className="container">
        <BlogHeader />

        <div className="row justify-content-center">
          <div className="col-12 col-md-9 pe-5">
            {/* Loading */}
            {isLoading && <Loading className="py-5" />}

            {/* No Data */}
            {blogs?.data?.length === 0 && (
              <NoData
                title="Belum Ada Artikel"
                message="Kami sedang menyiapkan tulisan menarik untuk Anda. Nantikan insight, tips, dan inspirasi parfum terbaru dari kami."
              />
            )}

            {/* Blog List */}
            {blogs?.data && blogs?.data?.length > 0 && (
              <>
                <div className="row g-4">
                  {blogs.data.map((blog) => (
                    <div
                      key={`blog-${blog.id}`}
                      className="col-12 col-md-6 col-lg-4"
                    >
                      <BlogItem blog={blog} />
                    </div>
                  ))}
                </div>

                {blogs?.page && (
                  <Pagination
                    {...blogs.page}
                    onClick={(page) => handlePageClick(page)}
                  />
                )}
              </>
            )}
          </div>
          <div className="col-12 col-md-3">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;
