import type { CSSProperties, ReactNode } from "react";

type SliderArrowButtonProps = {
  direction: "prev" | "next";
  onClick: () => void;
  className?: string;
  iconClassName?: string;
  iconWrapperClassName?: string;
  ariaLabel?: string;
  revealOnHover?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
  icon?: ReactNode;
};

const joinClassNames = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(" ");

const SliderArrowButton = ({
  direction,
  onClick,
  className,
  iconClassName,
  iconWrapperClassName,
  ariaLabel,
  revealOnHover = false,
  disabled = false,
  style,
  icon,
}: SliderArrowButtonProps) => {
  const baseIconClass =
    direction === "prev" ? "bi bi-chevron-left" : "bi bi-chevron-right";

  return (
    <button
      type="button"
      aria-label={ariaLabel ?? (direction === "prev" ? "Previous" : "Next")}
      onClick={onClick}
      className={joinClassNames(
        "slider-arrow",
        `slider-arrow--${direction}`,
        revealOnHover ? "slider-arrow--hover-reveal" : undefined,
        className
      )}
      disabled={disabled}
      style={style}
    >
      <span className={joinClassNames("slider-arrow__icon", iconWrapperClassName)}>
        {icon ?? <i className={iconClassName ?? baseIconClass} aria-hidden="true" />}
      </span>
    </button>
  );
};

export default SliderArrowButton;
