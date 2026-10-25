import Image from "next/image";
import type { ImageMedia } from "@/content";
import styles from "./BrowserFrame.module.css";

type Props = {
  image: ImageMedia;
  url?: string;
  status?: "live" | "archived";
  priority?: boolean;
  sizes?: string;
};

/** A build shown in its own window, with the real address it runs at. */
export function BrowserFrame({ image, url, status, priority, sizes = "100vw" }: Props) {
  const host = url ? url.replace(/^https?:\/\//, "").replace(/\/$/, "") : undefined;
  return (
    <figure className={styles.frame}>
      <div className={styles.chrome}>
        <span className={styles.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        {host && <span className={styles.address}>{host}</span>}
        {status && (
          <span className={styles.status} data-status={status}>
            {status === "live" ? "Live" : "Archived"}
          </span>
        )}
      </div>
      <div className={styles.view}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={priority}
          className={styles.img}
        />
      </div>
    </figure>
  );
}
