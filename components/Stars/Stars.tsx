import SvgIcon from "@/components/SvgIcon/SvgIcon";

type Props = {
  value: number;
};

export default function Stars({ value }: Props) {
  return (
    <span role="img" aria-label={`${value} / 5`} className="inline-flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <SvgIcon
          key={n}
          src="/svg/star.svg"
          width={16}
          height={16}
          className={n <= Math.round(value) ? "text-rating" : "text-gray-light"}
        />
      ))}
    </span>
  );
}