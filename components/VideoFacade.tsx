"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./VideoFacade.module.css";

type Props = {
  id: string;
  title: string;
  poster: string;
  aspect: "16:9" | "9:16";
  runtime?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Shows a poster until the visitor asks to play. The YouTube player (and its
 * cookies and scripts) only loads after that click, from the no-cookie domain.
 */
export function VideoFacade({ id, title, poster, aspect, runtime, priority, sizes = "100vw" }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={styles.frame} data-aspect={aspect}>
      {playing ? (
        <iframe
          className={styles.player}
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button type="button" className={styles.poster} onClick={() => setPlaying(true)}>
          <Image src={poster} alt="" fill sizes={sizes} priority={priority} className={styles.img} />
          <span className={styles.play}>
            <span className={styles.triangle} aria-hidden="true" />
            <span>
              Play {title}
              {runtime ? <span className={styles.runtime}> · {runtime}</span> : null}
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
