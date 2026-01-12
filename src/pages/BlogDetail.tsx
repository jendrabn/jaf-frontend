import { Link, useParams } from "react-router";
import { useGetBlog, useGetBlogRelated } from "@/features/blogs/api";
import Layout from "@/components/layouts/Layout";
import NotFoundPage from "@/pages/NotFound";
import Loading from "@/components/ui/loading";
import { Badge, Breadcrumb, Button, Image } from "react-bootstrap";
import { env } from "@/config/env";
import dayjs from "@/utils/dayjs";
import SEO from "@/components/SEO";
import { generateArticleSchema } from "@/utils/seo-schemas";
import { paths } from "@/config/paths";
import BlogSidebar from "@/features/blogs/components/BlogSidebar";
import TagBadge from "@/components/ui/tag-badge";
import BlogCard from "@/features/blogs/components/BlogCard";

const BlogDetail = () => {
  const { slug } = useParams();
  const { data: blog, isLoading } = useGetBlog(slug);
  const { data: relatedBlogs, isLoading: isLoadingRelated } = useGetBlogRelated(
    slug,
    { limit: 3 }
  );

  if (!isLoading && !blog) return <NotFoundPage />;

  const articleSchema = blog
    ? generateArticleSchema({
        title: blog.title,
        description: blog.title.substring(0, 160),
        image: blog.featured_image,
        author: blog.author,
        publishedTime: blog.created_at,
        modifiedTime: blog.updated_at,
        url: `${env.APP_URL}/blog/${blog.slug}`,
      })
    : null;

  const handleShare = async () => {
    if (!blog || !navigator.share) return;

    try {
      await navigator.share({
        title: blog.title,
        url: window.location.href,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      {isLoading && <Loading className="py-5" />}

      {blog && (
        <>
          <SEO
            title={blog.title}
            description={blog.title.substring(0, 160)}
            keywords={blog.tags.map((t) => t.name).join(", ") || undefined}
            canonical={`${env.APP_URL}/blog/${blog.slug}`}
            ogType="article"
            ogImage={blog.featured_image}
            ogImageAlt={blog.title}
            author={blog.author}
            publishedTime={blog.created_at}
            modifiedTime={blog.updated_at}
            structuredData={articleSchema ? [articleSchema] : undefined}
          />

          <div className="container">
            <Breadcrumb className="mb-5">
              <Breadcrumb.Item
                linkAs={Link}
                linkProps={{ to: paths.landing.root() }}
              >
                Home
              </Breadcrumb.Item>
              <Breadcrumb.Item
                linkAs={Link}
                linkProps={{ to: paths.blog.root() }}
              >
                Blog
              </Breadcrumb.Item>
              <Breadcrumb.Item active className="text-truncate">
                {blog.title}
              </Breadcrumb.Item>
            </Breadcrumb>
            <div className="row">
              <div className="col-12 col-md-8 col-lg-9 pe-lg-5 mb-5 mb-md-0">
                <article className="blog-detail">
                  <Badge
                    as={"a"}
                    href={`/blog?category_id=${blog.category.id}`}
                    className="blog-category fs-6 rounded-0 mb-3"
                  >
                    {blog.category.name}
                  </Badge>

                  <h1 className="blog-title fw-bold lh-sm mb-3 text-body-emphasis">
                    {blog.title}
                  </h1>

                  <div className="blog-meta d-flex align-items-center justify-content-between flex-wrap mb-3 gap-3">
                    <div className="d-flex justify-content-start align-items-center gap-3">
                      <div>
                        <Image
                          src={`https://ui-avatars.com/api/?name=${blog.author}`}
                          alt={blog.author}
                          width={40}
                          height={40}
                          roundedCircle
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <Link
                          to={`/blog?author=${blog.author}`}
                          style={{ fontWeight: 700 }}
                          className="fw-semibold text-decoration-none link-body-emphasis"
                        >
                          {blog.author}
                        </Link>
                        <time
                          className="small text-secondary-emphasis"
                          dateTime={blog.created_at}
                        >
                          <i className="bi bi-clock me-1"></i>
                          {dayjs(blog.created_at).format(
                            "dddd, D MMMM YYYY - HH:mm [WIB]"
                          )}
                        </time>
                      </div>
                    </div>

                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-light"
                        className="rounded-0"
                        title="Waktu baca"
                      >
                        <i className="bi bi-clock me-2"></i>
                        {blog.min_read}
                      </Button>

                      <Button
                        variant="outline-light"
                        className="rounded-0"
                        title="Jumlah dilihat"
                      >
                        <i className="bi bi-eye-fill me-2"></i>
                        {blog.views_count}
                      </Button>

                      <Button
                        variant="outline-light"
                        className="rounded-0"
                        title="Bagikan artikel"
                        onClick={handleShare}
                      >
                        <i className="bi bi-share-fill me-2"></i>
                        Share
                      </Button>
                    </div>
                  </div>

                  <figure className="blog-image mb-3">
                    <div className="w-100 ratio ratio-16x9 bg-gray-300 rounded-3 overflow-hidden">
                      <img
                        src={blog.featured_image}
                        alt={blog.title}
                        className="object-fit-fill w-100 h-100"
                        loading="lazy"
                      />
                    </div>
                    {blog.featured_image_description && (
                      <figcaption className="text-center text-secondary-emphasis mt-2">
                        {blog.featured_image_description}
                      </figcaption>
                    )}
                  </figure>

                  <div
                    className="blog-content mb-3"
                    style={{ fontSize: "1.125rem" }}
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  ></div>

                  <div className="blog-tags d-flex flex-wrap gap-2">
                    <span className="text-secondary-emphasis fw-semibold">
                      Tag:
                    </span>
                    {blog.tags.map((tag) => (
                      <TagBadge key={tag.id} href={`/blog?tag_id=${tag.id}`}>
                        {tag.name}
                      </TagBadge>
                    ))}
                  </div>

                  <section className="blog-related mt-5">
                    <h2 className="h4 fw-semibold mb-3 text-body-emphasis">
                      Artikel Terkait
                    </h2>
                    {isLoadingRelated ? (
                      <Loading className="py-3" />
                    ) : relatedBlogs?.length ? (
                      <div className="row g-4">
                        {relatedBlogs.map((related) => (
                          <div
                            key={`related-${related.id}`}
                            className="col-12 col-md-6 col-lg-4"
                          >
                            <BlogCard blog={related} />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-body-secondary">
                        Belum ada artikel terkait.
                      </div>
                    )}
                  </section>
                </article>
              </div>
              <div className="col-12 col-md-4 col-lg-3">
                <BlogSidebar />
              </div>
            </div>
          </div>
        </>
      )}
    </Layout>
  );
}

export default BlogDetail;
