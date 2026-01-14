import { useGetBlogs } from "@/features/blogs/api";
import type { BlogParams } from "@/types/blog";
import BlogCard from "@/features/blogs/components/BlogCard";
import Loading from "@/components/ui/loading";
import Pagination from "@/components/ui/pagination";
import Layout from "@/components/layouts/Layout";
import BlogHeader from "@/features/blogs/components/BlogHeader";
import useFilters from "@/hooks/use-filters";
import EmptyState from "@/components/ui/empty-state";
import { env } from "@/config/env";
import SEO from "@/components/SEO";
import BlogSidebar from "@/features/blogs/components/BlogSidebar";

const Blog = () => {
  const { params, setFilter } = useFilters<BlogParams>();
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

        <div className="row">
          <div className="col-12 col-md-8 col-lg-9 pe-lg-5 mb-5 mb-md-0">
            {/* Loading */}
            {isLoading && <Loading className="py-5" />}

            {/* No Data */}
            {blogs?.data?.length === 0 && (
              <EmptyState
                title="Artikel Kosong"
                message="Segera hadir dengan konten menarik"
                iconClass="bi bi-journal"
                iconSize="3rem"
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
                      <BlogCard blog={blog} />
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
          <div className="col-12 col-md-4 col-lg-3">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
