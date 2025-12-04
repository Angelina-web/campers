import Link from "next/link";
import css from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={css.heroSection}>
      <div className="container">
        <div className={css.cont}>
          <h1 className={css.mainText}>Campers of your dreams</h1>
          <p className={css.title}>
            You can find everything you want in our catalog
          </p>
          <Link href="/catalog" className={css.btn}>
            View Now
          </Link>
        </div>
      </div>
    </section>
  );
}
