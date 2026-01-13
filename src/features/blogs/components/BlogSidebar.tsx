import { Spinner } from "react-bootstrap";
import { Link } from "react-router";
import {
  useGetBlogCategories,
  useGetBlogLatest,
  useGetBlogPopular,
  useGetBlogTags,
} from "@/features/blogs/api";
import type { Blog } from "@/types/blog";
import useFilters from "@/hooks/use-filters";
import { paths } from "@/config/paths";
import dayjs from "@/utils/dayjs";
import { words } from "@/utils/functions";

function BlogCard({ post }: { post: Blog }) {
  const to = paths.blog.detail
    ? paths.blog.detail(post.slug)
    : `${paths.blog.root()}/${post.slug}`;

  return (
    <div className="d-flex gap-3 align-items-start">
      <Link to={to} className="text-decoration-none flex-shrink-0">
        <div
          className="ratio ratio-4x3 rounded-3 overflow-hidden bg-body-tertiary"
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
      </Link>

      <div className="min-w-0">
        <Link to={to} className="text-decoration-none">
          <div
            className="text-body fw-medium fs-6 lh-sm"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {post.title}
          </div>
        </Link>

        <div className="small text-body-secondary mt-1 d-flex align-items-center gap-2 flex-wrap lh-sm">
          {post.author ? (
            <Link
              to={`${paths.blog.root()}/author/${encodeURIComponent(
                post.author
              )}`}
              className="text-decoration-none text-body-secondary fw-medium"
            >
              {words(post.author, 2, "")}
            </Link>
          ) : (
            <span className="fw-medium">{post.author}</span>
          )}
          <span aria-hidden="true">-</span>
          <time
            dateTime={new Date(post.created_at).toISOString()}
            title={new Date(post.created_at).toLocaleString()}
          >
            {dayjs(post.created_at).fromNow()}
          </time>
        </div>
      </div>
    </div>
  );
}

function BlogSidebar() {
  const { params } = useFilters();

  const { data: categories, isLoading: isLoadingCategories } =
    useGetBlogCategories();
  const { data: tags, isLoading: isLoadingTags } = useGetBlogTags();
  const { data: latestBlogs, isLoading: isLoadingLatest } = useGetBlogLatest();
  const { data: popularBlogs, isLoading: isLoadingPopular } =
    useGetBlogPopular();

  return (
    <aside className="blog-sidebar d-flex flex-column gap-5">
      <div className="sidebar-section d-flex flex-column gap-3">
        <div className="sidebar-section-title">Artikel Terbaru</div>

        {isLoadingLatest ? (
          <div className="d-flex align-items-center gap-2 text-body-secondary">
            <Spinner animation="border" size="sm" />
            <span>Memuat...</span>
          </div>
        ) : latestBlogs?.length ? (
          <div className="d-flex flex-column gap-2">
            {latestBlogs.slice(0, 3).map((post) => (
              <BlogCard key={`latest-${post.id}`} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-body-secondary">Belum ada data.</div>
        )}
      </div>

      <div className="sidebar-section d-flex flex-column gap-3">
        <div className="sidebar-section-title">Artikel Populer</div>

        {isLoadingPopular ? (
          <div className="d-flex align-items-center gap-2 text-body-secondary">
            <Spinner animation="border" size="sm" />
            <span>Memuat...</span>
          </div>
        ) : popularBlogs?.length ? (
          <div className="d-flex flex-column gap-2">
            {popularBlogs.slice(0, 3).map((post) => (
              <BlogCard key={`popular-${post.id}`} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-body-secondary">Belum ada data.</div>
        )}
      </div>

      <div className="sidebar-section d-flex flex-column gap-3">
        <div className="sidebar-section-title">Kategori</div>

        {isLoadingCategories ? (
          <div className="d-flex align-items-center gap-2 text-body-secondary">
            <Spinner animation="border" size="sm" />
            <span>Memuat...</span>
          </div>
        ) : categories?.length ? (
          <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
            <li>
              <Link
                to={paths.blog.root()}
                className={`text-decoration-none ${
                  !params.category_id
                    ? "text-primary fw-bold"
                    : "text-dark-emphasis"
                }`}
              >
                Semua Kategori
              </Link>
            </li>

            {categories?.map((category) => (
              <li key={category.id}>
                <Link
                  to={`${paths.blog.root()}?category_id=${category.id}`}
                  className={`text-decoration-none ${
                    String(category.id) === String(params.category_id)
                      ? "text-primary fw-bold"
                      : "text-dark-emphasis"
                  }`}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-body-secondary">Belum ada data.</div>
        )}
      </div>

      <div className="sidebar-section d-flex flex-column gap-3">
        <div className="sidebar-section-title">Tag</div>

        {isLoadingTags ? (
          <div className="d-flex align-items-center gap-2 text-body-secondary">
            <Spinner animation="border" size="sm" />
            <span>Memuat...</span>
          </div>
        ) : tags?.length ? (
          <div className="d-flex flex-wrap gap-2">
            <Link
              to={paths.blog.root()}
              className={`sidebar-tag${!params.tag_id ? " is-active" : ""}`}
            >
              Semua Tag
            </Link>

            {tags?.map((tag) => (
              <Link
                key={tag.id}
                to={`${paths.blog.root()}?tag_id=${tag.id}`}
                className={`sidebar-tag${
                  String(tag.id) === String(params.tag_id) ? " is-active" : ""
                }`}
              >
                {tag.name}
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-body-secondary">Belum ada data.</div>
        )}
      </div>
    </aside>
  );
}

export default BlogSidebar;
