import { getTranslations } from "next-intl/server";
import SvgIcon from "@/components/SvgIcon/SvgIcon";
import { FaEnvelope, FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa";
import ScrollTopButton from "@/components/ScrollTopButton/ScrollTopButton";

const contacts = [
  { label: "GitHub", href: "https://github.com/Angelina-web", Icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/anhelina-pushkash", Icon: FaLinkedin },
  { label: "Telegram", href: "https://t.me/Angelok_905", Icon: FaTelegram },
  { label: "Email", href: "mailto:anhelinapush@gmail.com", Icon: FaEnvelope },
];

export default async function Footer() {
  const t = await getTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-badges bg-inputs">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-16 py-8">
        <div className="flex flex-col gap-1">
                    
          <ScrollTopButton label={t("toTop")}> <SvgIcon src="/svg/logo.svg" width={136} height={16} /></ScrollTopButton>
    
          <p className="text-base font-normal leading-[150%] text-text">
            {t("madeBy")} <span className="font-medium text-main">Angelina Pushkash</span>
          </p>
        </div>

        <nav aria-label={t("contacts")}>
          <ul className="flex items-center gap-3">
            {contacts.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full text-xl text-main transition-colors  hover:text-button hover:scale-[1.3]"
                >
                  <Icon aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="text-sm text-gray">
          © {year} {t("rights")}
        </p>
      </div>
    </footer>
  );
}