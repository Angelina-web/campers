import { Camper } from "@/types/camper";
import Link from 'next/link';

type Props = {
  item: Camper;
};

const CamperItem = ({ item }: Props) => {
  return (
    <li>
       <Link href={`/campers/${item.id}`}>{item.name}</Link>
    </li>
  );
};

export default CamperItem;
