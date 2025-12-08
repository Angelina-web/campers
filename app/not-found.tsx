import Link from "next/link";
import css from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={css.wrapper}>
      <h1 className={css.code}>404</h1>

      <h2 className={css.title}>Сторінку не знайдено</h2>

      <p className={css.text}>
        Вибач, але сторінки, яку ти шукаєш, не існує або вона була переміщена.
      </p>

      <Link href="/" className={css.button}>
        Повернутися на головну
      </Link>

      <p className={css.hint}>Можливо, допоможе пошук або меню навігації.</p>
    </div>
  );
}