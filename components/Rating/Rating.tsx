import { useTranslations } from "next-intl";
import SvgIcon from "@/components/SvgIcon/SvgIcon";

type Props = {
  rating: number;
  reviews: number;
};

export default function Rating({ rating, reviews }: Props) {
  const t = useTranslations("Catalog");

  return (
    <span className="inline-flex items-center gap-1 text-base font-normal leading-[150%] text-main">
      <SvgIcon src="/svg/star.svg" width={16} height={16} className="text-rating" />
      {rating}({t("reviews", { count: reviews })})
    </span>
  );
}