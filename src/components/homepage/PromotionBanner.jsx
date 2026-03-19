'use client'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export const PromotionBanner = () => {
  return (
    <section className="mb-8 rounded-2xl overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        className="h-75 md:h-100 bg-gray-200"
      >
        <SwiperSlide className="flex items-center justify-center bg-blue-50 text-2xl font-bold opacity-50">
          Banner Promotion 1
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center bg-blue-100 text-2xl font-bold opacity-50">
          Banner Promotion 2
        </SwiperSlide>
      </Swiper>
    </section>
  )
}