'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';

export const PromotionBanner = () => {
  return (
    <section className="mb-8 rounded-2xl overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="min-h-20vh aspect-16/5 bg-slate-200"
      >
        <SwiperSlide className="flex items-center justify-center">
          <Image src="/umkm-banner-1.jpg" width={1600} height={500} alt=""  />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center">
          <Image src="/umkm-banner-2.jpg" width={1600} height={500} alt=""  />
        </SwiperSlide>
      </Swiper>
    </section>
  )
}