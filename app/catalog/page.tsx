"use client";
import { getCampers } from "@/lib/api";
import { Camper } from "@/types/camper";
import { useEffect, useState } from "react";
import CamperList from "@/components/CamperList/CamperList";
import css from "./Catalog.module.css";

export default function Catalog() {
  const [campers, setCampers] = useState<Camper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampers = async () => {
      try {
        const response = await getCampers(); 
        setCampers(response);
      } catch (error) {
        console.error("Error fetching campers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampers();
  }, []);

  return (
    <main className="catalogPage">
      <div className="container">

        <div className={css.filter}>
          {/* <Filter /> */}
        </div>

        <div className={css.campersList}>
          <section>
            <h1>List</h1>

            {loading && <p>Loading...</p>}

            {!loading && campers.length === 0 && (
              <p>No campers found</p>
            )}

            {!loading && campers.length > 0 && (
              <CamperList campers={campers} />
            )}
          </section>
        </div>

      </div>
    </main>
  );
}