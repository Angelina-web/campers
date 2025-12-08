'use client';

import { useEffect } from 'react';
import css from './Error.module.css';

type Props = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: Props) {

  useEffect(() => {
    const timer = setTimeout(() => {
      reset();
    }, 5000);

    return () => clearTimeout(timer);
  }, [reset]);

  return (
    <div className={css.wrapper}>
      <div className={css.card}>
        <div className={css.icon}>⚠️</div>

        <h2 className={css.title}>Помилка при завантаженні</h2>

        <p className={css.message}>
          {error.message || 'Щось пішло не так...'}
        </p>

        <p className={css.smallInfo}>
          Ми вже працюємо над вирішенням. Спробуйте перезавантажити сторінку.
        </p>

        <button className={css.button} onClick={reset}>
          Спробувати знову
        </button>
      </div>
    </div>
  );
}
