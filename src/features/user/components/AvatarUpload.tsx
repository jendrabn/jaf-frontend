import type { Ref } from "react";
import { Button, Image } from "react-bootstrap";

type AvatarUploadProps = {
  src?: string | null;
  name?: string | null;
  size?: number;
  imageRef?: Ref<HTMLImageElement>;
  onTriggerUpload: () => void;
};

const AvatarUpload = ({
  src,
  name,
  size = 120,
  imageRef,
  onTriggerUpload,
}: AvatarUploadProps) => {
  const badgeSize = 36;
  const badgeLeft = 84;
  const badgeTop = 84;

  return (
    <div className="text-center">
      <div
        className="position-relative d-inline-block"
        style={{ width: size, height: size }}
      >
        <div
          className="rounded-circle overflow-hidden shadow-sm bg-light"
          style={{ width: size, height: size }}
        >
          <Image
            src={src ?? ""}
            alt={name ? `Avatar ${name}` : "Avatar"}
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
            ref={imageRef}
            loading="lazy"
          />
        </div>

        <Button
          type="button"
          variant="primary"
          onClick={onTriggerUpload}
          aria-label="Upload foto"
          className="position-absolute d-flex align-items-center justify-content-center rounded-circle p-0 shadow border border-white border-3"
          style={{
            width: badgeSize,
            height: badgeSize,
            left: badgeLeft,
            top: badgeTop,
          }}
        >
          <i
            className="bi bi-camera-fill"
            style={{ fontSize: 16, lineHeight: 1 }}
          />
        </Button>
      </div>
    </div>
  );
};

export default AvatarUpload;
