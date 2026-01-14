import React from "react";

interface EmptyStateProps {
  title?: string;
  message?: string;
  iconClass?: string;
  iconSize?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Belum ada data",
  message = "Tidak ada data yang tersedia saat ini.",
  iconClass = "bi bi-slash-circle",
  iconSize = "3rem",
}) => {
  return (
    <div className="text-center py-5 w-100">
      <div className="mb-3">
        <i
          className={`${iconClass} text-muted`}
          style={{ fontSize: iconSize }}
        ></i>
      </div>
      <h5 className="text-muted">{title}</h5>
      <p className="text-muted">{message}</p>
    </div>
  );
};

export default EmptyState;
