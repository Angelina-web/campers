import css from './Header.module.css';
import Link from 'next/link';

const Header = () => {
  return  <header className={css.header}>
       <Link href='/' aria-label='Home' className={css.logoLink}>
          <svg width="84" height="36" aria-hidden="true">
              <use href="/symbol-defs.svg#icon-logo"></use>
       </svg>
      </Link>

      <nav aria-label='Main Navigation' className={css.navigationList}>
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/catalog'>Catalog</Link>
          </li>
        </ul>
      </nav>
    </header>;
}

export default Header;