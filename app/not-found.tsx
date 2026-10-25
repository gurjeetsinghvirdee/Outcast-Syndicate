import Link from "next/link";
import shared from "./shared.module.css";

export default function NotFound() {
  return (
    <div className="wrap">
      <header className={shared.pageHead}>
        <span className="label">404 · Media offline</span>
        <h1 className={shared.title}>
          Off the <span>timeline.</span>
        </h1>
        <p className={shared.lede}>This page isn&rsquo;t in the cut. It may have moved, or it was never published.</p>
        <p>
          <Link href="/work">See all work</Link> or <Link href="/">go back to the start</Link>.
        </p>
      </header>
    </div>
  );
}
