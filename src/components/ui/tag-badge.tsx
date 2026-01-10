import type { ReactNode } from "react";

type TagBadgeProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

const TagBadge = ({ href, children, className }: TagBadgeProps) => (
  <a
    href={href}
    className={`tag-badge d-inline-flex align-items-center gap-1 ${
      className ?? ""
    }`.trim()}
  >
    <i className="bi bi-tag" aria-hidden="true" />
    <span>{children}</span>
  </a>
);

export default TagBadge;
