import { Badge, Button, Form, InputGroup } from "react-bootstrap";
import { useGetBlogCategories, useGetBlogTags } from "@/features/blogs/api";
import useFilters from "@/hooks/use-filters";
import type { BlogParamsTypes } from "@/types/blog";
import { type ChangeEvent, type FormEvent, useState } from "react";

const TagBadge = ({ id, onClear }: { id: number; onClear: () => void }) => {
  const { data: tags } = useGetBlogTags();
  const t = tags?.find((tg) => tg.id === id);

  if (!t) return null;

  return (
    <Badge
      bg="light"
      text="dark"
      className="d-inline-flex align-items-center me-2"
    >
      <span className="me-2">{t.name}</span>
      <Button
        variant="link"
        size="sm"
        className="p-0 ms-1 text-dark"
        onClick={onClear}
        aria-label={`Clear tag ${t.name}`}
      >
        <i className="bi bi-x-lg" />
      </Button>
    </Badge>
  );
};

const BlogHeader = () => {
  const { params, setFilter, clearFilters } = useFilters<BlogParamsTypes>();
  const { data: categories } = useGetBlogCategories();
  const [searchTerm, setSearchTerm] = useState<string>(params.search || "");
  const categoryName = categories?.find(
    (category) => category.id === Number(params.category_id)
  )?.name;
  const headerTitle = categoryName
    ? `Blog & Artikel ${categoryName}`
    : "Blog & Artikel";

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFilter("search", searchTerm);
  };

  return (
    <div className="blog-header rounded-4 p-4 p-md-5 text-center mb-5">
      <h1 className="blog-header-title fw-bold mb-3">{headerTitle}</h1>
      <p className="blog-header-subtitle mb-0">
        Temukan insight, tips, dan inspirasi parfum agar pilihan aromamu lebih
        tepat setiap hari.
      </p>
      <form
        className="blog-header-search mx-auto mt-4"
        onSubmit={handleSearchSubmit}
      >
        <InputGroup>
          <InputGroup.Text aria-hidden="true">
            <i className="bi bi-search" />
          </InputGroup.Text>
          <Form.Control
            type="search"
            placeholder="Cari artikel..."
            value={searchTerm}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(event.target.value)
            }
            aria-label="Cari artikel"
          />
        </InputGroup>
      </form>

      {params.tag_id || params.search ? (
        <div className="blog-header-tags d-flex justify-content-center gap-2 flex-wrap mt-3">
          {params.tag_id && (
            <TagBadge
              id={Number(params.tag_id)}
              onClear={() => clearFilters("tag_id")}
            />
          )}

          {params.search && (
            <Badge
              bg="secondary"
              className="d-inline-flex align-items-center me-2 text-white"
            >
              <span className="me-2">{`Search: ${params.search}`}</span>
              <Button
                variant="link"
                size="sm"
                className="p-0 ms-1 text-white"
                onClick={() => setFilter("search", "")}
                aria-label="Clear search"
              >
                <i className="bi bi-x-lg" />
              </Button>
            </Badge>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default BlogHeader;

