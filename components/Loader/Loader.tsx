import { useTranslations } from "next-intl";

export default function Loader() {
  const t = useTranslations("Loader");

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-background/60 backdrop-blur-[2px]"
    >
      <div className="flex w-[360px] max-w-[90vw] flex-col items-center gap-4 rounded-2xl bg-background p-8 text-center shadow-xl">
        <div aria-hidden="true" className="w-[160px]">
          <svg viewBox="0 0 120 60" className="animate-van-bounce motion-reduce:animate-none">
            {/* кузов */}
            <path
              d="M10 46V16a4 4 0 0 1 4-4h64a8 8 0 0 1 6 3l20 17a8 8 0 0 1 3 6v8a4 4 0 0 1-4 4H14a4 4 0 0 1-4-4Z"
              className="fill-button"
            />
            {/* вікна */}
            <rect x="18" y="20" width="18" height="12" rx="2" className="fill-background" />
            <rect x="42" y="20" width="18" height="12" rx="2" className="fill-background" />
            <path d="M68 20h10l14 12H68Z" className="fill-background" />

            {/* колеса: коло плюс «спиця», щоб було видно обертання */}
            <g className="origin-center [transform-box:fill-box] animate-spin [animation-duration:0.7s] motion-reduce:animate-none">
              <circle cx="32" cy="48" r="8" className="fill-main" />
              <line x1="32" y1="42" x2="32" y2="54" strokeWidth="2" className="stroke-background" />
            </g>
            <g className="origin-center [transform-box:fill-box] animate-spin [animation-duration:0.7s] motion-reduce:animate-none">
              <circle cx="88" cy="48" r="8" className="fill-main" />
              <line x1="88" y1="42" x2="88" y2="54" strokeWidth="2" className="stroke-background" />
            </g>
          </svg>

          {/* дорога */}
          <div
            className="h-[3px] w-full animate-road text-gray motion-reduce:animate-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, currentColor 0 16px, transparent 16px 32px)",
              backgroundSize: "32px 100%",
            }}
          />
        </div>

        <h2 className="text-xl font-semibold leading-[120%] text-main">{t("title")}</h2>
        <p className="text-base font-normal leading-[150%] text-text">{t("text")}</p>
      </div>
    </div>
  );
}