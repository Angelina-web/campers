"use client";

import { useState } from "react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import type { GalleryImage } from "@/types/camper";

type Props = {
  images: GalleryImage[];
  name: string;
};

export default function CamperGallery({ images, name }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  if (images.length === 0) return null;

  return (
    <div className="w-[638px] shrink-0">
      <Swiper
        modules={[FreeMode, Thumbs]}
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
      >
        {images.map((img, index) => (
          <SwiperSlide key={img.id}>
            <div className="relative h-[512px] w-full overflow-hidden rounded-[10px]">
              <Image
                src={img.original}
                alt={`${name} ${index + 1}`}
                fill
                sizes="638px"
                priority={index === 0}
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        className="mt-3"
        onSwiper={setThumbsSwiper}
        modules={[FreeMode, Thumbs]}
        spaceBetween={12}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
      >
        {images.map((img) => (
          <SwiperSlide
            key={img.id}
            className="cursor-pointer overflow-hidden rounded-[10px] border-2 border-transparent [&.swiper-slide-thumb-active]:border-button"
          >
            <div className="relative aspect-square w-full">
              <Image
                src={img.thumb}
                alt=""
                fill
                sizes="150px"
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}