"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { timecode } from "@/lib/timecode";
import { Monitor } from "./Monitor";
import type { SuiteClip, SuiteLane } from "./types";
import styles from "./EditSuite.module.css";

const UNIT = 22; // px per second of the cut
const PLAYHEAD = 0.3; // playhead position as a share of the timeline viewport
const SCRUB_QUERY = "(min-width: 900px) and (prefers-reduced-motion: no-preference)";

type Props = {
  clips: SuiteClip[];
  lanes: SuiteLane[];
  total: number;
  intro: React.ReactNode;
};

export function EditSuite({ clips, lanes, total, intro }: Props) {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const timecodeRef = useRef<HTMLSpanElement>(null);
  const clipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeRef = useRef(0);
  const scrubbing = useRef(false);

  const select = useCallback((index: number) => {
    activeRef.current = index;
    setActive(index);
  }, []);

  // Scroll-driven scrub. Only runs when the CSS scrub layout is active, so the
  // static layout (small screens, reduced motion) never gets transforms.
  useEffect(() => {
    const mq = window.matchMedia(SCRUB_QUERY);
    let frame = 0;

    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      const stage = stageRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!section || !stage || !viewport || !track) return;
      const rect = section.getBoundingClientRect();
      const travel = rect.height - stage.offsetHeight;
      const progress = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;
      const pos = progress * total;
      const x = viewport.clientWidth * PLAYHEAD - pos * UNIT;
      track.style.transform = `translate3d(${x}px,0,0)`;
      if (timecodeRef.current) timecodeRef.current.textContent = timecode(pos);
      const hit = clips.findIndex((c) => pos >= c.start && pos < c.start + c.length);
      const next = hit === -1 ? (pos < clips[0].start ? 0 : clips.length - 1) : hit;
      if (next !== activeRef.current) select(next);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const apply = () => {
      scrubbing.current = mq.matches;
      if (mq.matches) {
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        update();
      } else {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        if (trackRef.current) trackRef.current.style.transform = "";
      }
    };

    apply();
    mq.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [clips, total, select]);

  // Choosing a clip: in scrub mode, scroll the page so the playhead lands on it;
  // otherwise just cut the monitor to it.
  const goTo = useCallback(
    (index: number, focus = false) => {
      select(index);
      if (focus) clipRefs.current[index]?.focus({ preventScroll: true });
      const clip = clips[index];
      if (scrubbing.current && sectionRef.current && stageRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const travel = rect.height - stageRef.current.offsetHeight;
        const progress = (clip.start + clip.length / 2) / total;
        window.scrollTo({ top: window.scrollY + rect.top + progress * travel, behavior: "smooth" });
      } else {
        if (timecodeRef.current) timecodeRef.current.textContent = timecode(clip.start);
        clipRefs.current[index]?.scrollIntoView({ block: "nearest", inline: "center" });
      }
    },
    [clips, total, select],
  );

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const last = clips.length - 1;
    const to =
      e.key === "ArrowRight" ? Math.min(last, index + 1)
      : e.key === "ArrowLeft" ? Math.max(0, index - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : -1;
    if (to === -1) return;
    e.preventDefault();
    goTo(to, true);
  };

  const clip = clips[active];
  const ticks = Array.from({ length: Math.floor(total / 10) + 1 }, (_, i) => i * 10);

  return (
    <section
      ref={sectionRef}
      className={styles.suite}
      style={{ "--clips": clips.length } as React.CSSProperties}
      aria-label="The cut: selected work from every track"
    >
      <div ref={stageRef} className={styles.stage}>
        <div className={`wrap ${styles.head}`}>
          <span className="label">
            Sequence 01 · {clips.length} clips · {lanes.length} tracks
          </span>
          <span className={`label ${styles.hint}`}>Scroll to scrub · ← → between clips</span>
          <span className={`label ${styles.hintStatic}`}>Swipe the timeline · tap a clip</span>
        </div>

        <div className={`wrap ${styles.main}`}>
          <Monitor clip={clip} timecodeRef={timecodeRef} initialTimecode={timecode(clips[0].start)} priority />
          <div className={styles.intro}>{intro}</div>
        </div>

        <div className={`wrap ${styles.timeline}`}>
          <div className={styles.heads}>
            <span className={styles.rulerHead} aria-hidden="true">
              TC
            </span>
            {lanes.map((lane) => (
              <Link key={lane.track} href={lane.href} className={styles.laneHead}>
                <span className={styles.code}>{lane.track}</span>
                <span className={styles.laneName}>
                  {lane.name}
                  {lane.armed && <span className={styles.armed}>Armed · work arriving</span>}
                </span>
              </Link>
            ))}
          </div>
          <div ref={viewportRef} className={styles.viewport}>
            <div
              ref={trackRef}
              className={styles.track}
              style={{ "--u": `${UNIT}px`, width: `${total * UNIT}px` } as React.CSSProperties}
            >
              <div className={styles.ruler} aria-hidden="true">
                {ticks.map((t) => (
                  <span key={t} style={{ left: `calc(${t} * var(--u))` }}>
                    {timecode(t).slice(3, 8)}
                  </span>
                ))}
              </div>
              <div role="group" aria-label="Clips in the cut" className={styles.lanes}>
                {lanes.map((lane) => (
                  <div key={lane.track} className={styles.lane} data-armed={lane.armed || undefined}>
                    {clips.map((c, i) =>
                      c.track !== lane.track ? null : (
                        <button
                          key={c.slug}
                          ref={(el) => {
                            clipRefs.current[i] = el;
                          }}
                          type="button"
                          className={styles.clip}
                          data-kind={c.kind}
                          aria-pressed={i === active}
                          tabIndex={i === active ? 0 : -1}
                          style={{ left: `calc(${c.start} * var(--u))`, width: `calc(${c.length} * var(--u))` }}
                          onClick={() => goTo(i)}
                          onKeyDown={(e) => onKeyDown(e, i)}
                          aria-label={`${c.title}, ${c.person}, ${c.kindLabel}`}
                        >
                          <span className={styles.clipTitle}>{c.title}</span>
                          <span className={styles.clipMeta}>{c.measure}</span>
                        </button>
                      ),
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.playhead} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
