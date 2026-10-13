import Image from "next/image";
import type { CSSProperties } from "react";

/**
 * Thin wrapper over next/image for the photos in /public/images.
 *
 * Layout is driven by CSS (object-fit + 100% sizing in globals.css), so width
 * and height here are only the intrinsic ratio hint that prevents layout shift.
 */
export default function Img({
  file,
  alt,
  className,
  style,
  priority = false,
  sizes = "100vw",
  width = 1600,
  height = 1067,
}: {
  file: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
}) {
  return (
    <Image
      src={`/images/${file}`}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className={className}
      style={style}
    />
  );
}
