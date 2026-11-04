"use client";

import { useId } from "react";
import { useField } from "formik";

type Props = {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
};

export default function FormField({
  name,
  label,
  type = "text",
  autoComplete,
}: Props) {
  const [field, meta] = useField(name);
  const id = useId();
  const errorId = `${id}-error`;
  const hasError = meta.touched && !!meta.error;

  return (
    <div>
      <div className="relative">
        <input
          {...field}
          id={id}
          type={type}
          autoComplete={autoComplete}
          placeholder=" "
          aria-invalid={hasError}
          aria-describedby={hasError ? errorId : undefined}
          className={`peer h-14 w-full rounded-xl border px-5 pr-12 text-base text-main outline-none transition-colors ${
            hasError
              ? "border-red-500 bg-red-100 text-red-500 dark:bg-red-950"
              : "border-transparent bg-inputs focus:border-button"
          }`}
        />

        {/* підпис: усередині поля, коли воно порожнє, і на рамці, коли активне, заповнене або з помилкою */}
        <label
          htmlFor={id}
          className={`pointer-events-none absolute rounded-full px-2 transition-all ${
            hasError
              ? "left-4 top-0 -translate-y-1/2 bg-red-200 text-xs text-red-500 dark:bg-red-900"
              : "left-3 top-1/2 -translate-y-1/2 text-base text-gray peer-focus:left-4 peer-focus:top-0 peer-focus:bg-badges peer-focus:text-xs peer-not-placeholder-shown:left-4 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:bg-badges peer-not-placeholder-shown:text-xs"
          }`}
        >
          {label}
        </label>

        {hasError && (
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="absolute right-5 top-1/2 size-6 -translate-y-1/2 text-red-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7.5v5M12 16h.01" />
          </svg>
        )}
      </div>

      {hasError && (
        <p id={errorId} className="mt-1 text-base leading-[150%] text-red-500">
          {meta.error}
        </p>
      )}
    </div>
  );
}