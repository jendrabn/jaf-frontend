import { type Blog } from "@/types/blog";
import { Badge, Card, Image } from "react-bootstrap";
import dayjs from "@/utils/dayjs";
import { Link } from "react-router";
import { words } from "@/utils/functions";
import { paths } from "@/config/paths";

type Props = { blog: Blog };

const BlogCard = ({ blog }: Props) => (
  <Card as="article" className="h-100 border-0">
    <div className="row g-2 g-md-2 align-items-start">
      <div className="col-4 col-md-12">
        <div className="position-relative">
          <Link
            to={paths.blog.detail(blog.slug)}
            aria-label={blog.title}
            className="d-block"
          >
            <div className="w-100 ratio ratio-16x9 overflow-hidden rounded-3 bg-gray-300 img-hover-zoom">
              <img
                className="w-100 h-100 object-fit-cover"
                loading="lazy"
                src={blog.featured_image}
                alt={blog.title}
              />
            </div>
          </Link>

          {blog.category && (
            <Link
              to={`${paths.blog.root()}?category_id=${blog.category.id}`}
              className="position-absolute top-0 start-0 m-2 z-1 text-decoration-none d-none d-md-inline-block"
            >
              <Badge bg="primary" className="fw-medium">
                {blog.category.name}
              </Badge>
            </Link>
          )}
        </div>
      </div>

      <div className="col-8 col-md-12">
        <Card.Body className="pt-0 pt-md-2 pb-3 pe-0 px-md-0">
          <Card.Title
            as="h5"
            className="line-clamp-2 m-0 fs-6 fs-md-5 fw-semibold"
          >
            <Link
              to={paths.blog.detail(blog.slug)}
              className="text-decoration-none text-body-emphasis hover-text-primary"
            >
              {blog.title}
            </Link>
          </Card.Title>

          <Card.Text className="d-flex align-items-center gap-2 small mt-2 flex-wrap lh-sm">
            {blog.author ? (
              <Link
                to={`${paths.blog.root()}/author/${encodeURIComponent(
                  blog.author
                )}`}
                className="text-decoration-none text-body-secondary d-inline-flex align-items-center"
              >
                <Image
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    blog.author
                  )}`}
                  alt={blog.author}
                  roundedCircle
                  width={32}
                  height={32}
                  className="d-none d-md-inline-block me-2"
                />
                <span className="fw-medium">{words(blog.author, 2, "")}</span>
              </Link>
            ) : (
              <span className="text-body-secondary fw-medium">
                {blog.author}
              </span>
            )}

            <span className="text-body-secondary">-</span>
            <time
              className="text-body-secondary"
              dateTime={new Date(blog.created_at).toISOString()}
              title={new Date(blog.created_at).toLocaleString()}
            >
              {dayjs(blog.created_at).fromNow()}
            </time>
          </Card.Text>
        </Card.Body>
      </div>
    </div>
  </Card>
);

export default BlogCard;
