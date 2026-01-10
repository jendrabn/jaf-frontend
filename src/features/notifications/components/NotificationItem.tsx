import type { KeyboardEvent } from "react";
import { Badge, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import type { Notification } from "@/types/notification";
import { headline } from "@/utils/format";
import dayjs from "@/utils/dayjs";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead?: (id: number) => void;
}

const NotificationItem = ({
  notification,
  onMarkAsRead,
}: NotificationItemProps) => {
  const navigate = useNavigate();

  const getLevelVariant = (level: string) => {
    switch (level) {
      case "success":
        return "success";
      case "warning":
        return "warning";
      case "error":
        return "danger";
      case "info":
      default:
        return "info";
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "success":
        return "bi-check-circle-fill";
      case "warning":
        return "bi-exclamation-triangle-fill";
      case "error":
        return "bi-x-circle-fill";
      case "info":
      default:
        return "bi-info-circle-fill";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "order":
        return "bi-box-seam";
      case "payment":
        return "bi-credit-card";
      case "shipping":
        return "bi-truck";
      case "promotion":
        return "bi-tag";
      case "account":
        return "bi-person";
      default:
        return "bi-bell";
    }
  };

  const isNavigable = Boolean(notification.url);

  const handleNavigate = () => {
    if (isNavigable && notification.url) {
      navigate(notification.url);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isNavigable) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleNavigate();
    }
  };

  return (
    <div
      className={`notification-card ${
        !notification.is_read ? "is-unread" : ""
      }`}
      style={{ cursor: isNavigable ? "pointer" : "default" }}
      onClick={handleNavigate}
      onKeyDown={handleKeyDown}
      role={isNavigable ? "button" : undefined}
      tabIndex={isNavigable ? 0 : undefined}
    >
      <div className="notification-card-body">
        <div className="notification-icon">
          <i className={`bi ${getCategoryIcon(notification.category)}`}></i>
        </div>
        <div className="notification-content">
          <div className="notification-header">
            <h3 className="notification-title">
              {headline(notification.title)}
            </h3>
            <span className="notification-date">
              {dayjs(notification.created_at).format("DD MMM YYYY, HH:mm")}
            </span>
          </div>
          <p className="notification-body">{notification.body}</p>
          <div className="notification-meta">
            <Badge bg={getLevelVariant(notification.level)} pill>
              <i className={`bi ${getLevelIcon(notification.level)} me-1`} />
              {notification.level}
            </Badge>
            <Badge bg="secondary" pill>
              <i
                className={`bi ${getCategoryIcon(notification.category)} me-1`}
              />
              {notification.category}
            </Badge>
            {!notification.is_read && onMarkAsRead && (
              <Button
                variant="outline-secondary"
                size="sm"
                className="ms-auto"
                onClick={(event) => {
                  event.stopPropagation();
                  onMarkAsRead(notification.id);
                }}
              >
                Tandai dibaca
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
