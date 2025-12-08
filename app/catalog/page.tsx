"use client";
import CamperList from "@/components/CamperList/CamperList";
import Filters from "@/components/Filter/Filter";
import useCamperStore from '@/lib/store/campers';

export default function CatalogPage() {
  const { campers}= useCamperStore()
  return (
    <main>
      <div className="container">
        <div>
          <Filters />
        </div>
        <div>
          <CamperList campers={campers}/>
        </div>
      </div>
    </main>
  );
}