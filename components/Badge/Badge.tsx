import type { ReactNode } from "react";

type Props = {
  icon?: ReactNode;
  children: ReactNode;
};

export default function Badge({ icon, children }: Props) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-badges px-4 py-2 text-center text-base font-medium leading-[150%] text-main mix-blend-multiply dark:mix-blend-normal">
      {icon}
      {children}
    </span>
  );
}