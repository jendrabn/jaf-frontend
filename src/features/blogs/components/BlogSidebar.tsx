import { Accordion, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router";
import {
  useGetBlogCategories,
  useGetBlogLatest,
  useGetBlogPopular,
  useGetBlogTags,
} from "@/features/blogs/api";
import type { BlogItemTypes } from "@/types/blog";
import useFilters from "@/hooks/use-filters";
import { paths } from "@/config/paths";
import dayjs from "@/utils/dayjs";

function BlogPostList({
  title,
  posts,
  isLoading,
}: {
  title: string;
  posts?: BlogItemTypes[];
  isLoading: boolean;
}) {
  return (
    <div className="d-flex flex-column gap-2">
      <div className="fw-bold">{title}</div>

      {isLoading ? (
        <div className="d-flex align-items-center gap-2 text-body-secondary">
          <Spinner animation="border" size="sm" />
          <span>Memuat...</span>
        </div>
      ) : posts?.length ? (
        <div className="d-flex flex-column gap-2">
          {posts.slice(0, 3).map((post) => {
            const to = paths.blog.detail
              ? paths.blog.detail(post.slug)
              : `${paths.blog.root()}/${post.slug}`;

            return (
              <Link
                key={`${title}-${post.id}`}
                to={to}
                className="text-decoration-none"
              >
                <div className="d-flex gap-3 align-items-start">
                  {/* Thumbnail */}
                  <div
                    className="ratio ratio-4x3 rounded-3 overflow-hidden bg-body-tertiary flex-shrink-0"
                    style={{ width: 92 }}
                  >
                    <img
                      src={post.featured_image}
                      alt={post.title}
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                      loading="lazy"
                    />
                  </div>

                  <div className="min-w-0">
                    {/* JUDUL */}
                    <div
                      className="text-body fw-semibold"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {post.title}
                    </div>

                    <div className="small text-body-secondary mt-1">
                      {dayjs(post.created_at).format("DD MMM YYYY")}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-body-secondary">Belum ada data.</div>
      )}
    </div>
  );
}

function BlogSidebar() {
  const { setFilter, clearFilters, params } = useFilters();

  const { data: categories, isLoading: isLoadingCategories } =
    useGetBlogCategories();
  const { data: tags, isLoading: isLoadingTags } = useGetBlogTags();
  const { data: latestBlogs, isLoading: isLoadingLatest } = useGetBlogLatest();
  const { data: popularBlogs, isLoading: isLoadingPopular } =
    useGetBlogPopular();

  return (
    <aside className="d-flex flex-column gap-4">
      <BlogPostList
        title="Artikel Terbaru"
        posts={latestBlogs}
        isLoading={isLoadingLatest}
      />

      <BlogPostList
        title="Artikel Populer"
        posts={popularBlogs}
        isLoading={isLoadingPopular}
      />

      <div className="blog-filters d-flex flex-column gap-3">
        <Accordion defaultActiveKey="0" flush alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Kategori</Accordion.Header>
            <Accordion.Body>
              {isLoadingCategories ? (
                <Spinner size="sm" />
              ) : (
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <span
                      role="button"
                      className={
                        !params.category_id
                          ? "text-primary fw-bold"
                          : "text-dark-emphasis"
                      }
                      onClick={() => setFilter("category_id", "")}
                    >
                      Semua Kategori
                    </span>
                  </li>

                  {categories?.map((category) => (
                    <li key={category.id} className="mb-2">
                      <span
                        role="button"
                        className={
                          String(category.id) === String(params.category_id)
                            ? "text-primary fw-bold"
                            : "text-dark-emphasis"
                        }
                        onClick={() => setFilter("category_id", category.id)}
                      >
                        {category.name}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Accordion defaultActiveKey="1" flush alwaysOpen>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Tag</Accordion.Header>
            <Accordion.Body>
              {isLoadingTags ? (
                <Spinner size="sm" />
              ) : (
                <ul className="list-unstyled mb-0">
                  <li className="mb-2">
                    <span
                      role="button"
                      className={
                        !params.tag_id
                          ? "text-primary fw-bold"
                          : "text-dark-emphasis"
                      }
                      onClick={() => setFilter("tag_id", "")}
                    >
                      Semua Tag
                    </span>
                  </li>

                  {tags?.map((tag) => (
                    <li key={tag.id} className="mb-2">
                      <span
                        role="button"
                        className={
                          String(tag.id) === String(params.tag_id)
                            ? "text-primary fw-bold"
                            : "text-dark-emphasis"
                        }
                        onClick={() => setFilter("tag_id", tag.id)}
                      >
                        {tag.name}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <div className="d-grid">
          <Button
            variant="outline-danger"
            onClick={() => clearFilters("category_id", "tag_id")}
          >
            Hapus Semua
          </Button>
        </div>
      </div>
    </aside>
  );
}

export default BlogSidebar;
