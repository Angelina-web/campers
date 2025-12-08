"use client"
import css from "./Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <div className=".container">
      <header className={css.header}>
        <Link href="/" aria-label="Home" className={css.logoLink}>
          <svg width="136" height="16" aria-hidden="true">
            <use href="/symbol-defs.svg#icon-logo"></use>
          </svg>
        </Link>

        <nav
          aria-label="Main Navigation"
          className={css.navigationList}
          role="navigation"
        >
          <ul className={css.navigation}>
            <li className={pathname === "/" ? css.active : css.navigationItem}>
              <Link href="/">Home</Link>
            </li>
            <li
              className={
                pathname === "/catalog" ? css.active : css.navigationItem
              }
            >
              <Link href="/catalog">Catalog</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
