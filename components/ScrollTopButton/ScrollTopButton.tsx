"use client";

type Props = {
  label: string;
  children: React.ReactNode;
};

export default function ScrollTopButton({ label, children }: Props) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={label}
      className="cursor-pointer text-left text-xl font-semibold text-main transition-colors hover:text-button"
    >
      {children}
    </button>
  );
}