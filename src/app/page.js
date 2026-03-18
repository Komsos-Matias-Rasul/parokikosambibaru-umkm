"use client";
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';

export default function Home() {
  const categories = [
    { name: 'Kuliner', icon: '🍲' },
    { name: 'Jasa', icon: '🛠️' },
    { name: 'Kerajinan', icon: '🎨' },
    { name: 'Teknologi & Kreativitas', icon: '💻' },
    { name: 'Kesehatan & Pendidikan', icon: '📚' },
  ];

  const products = Array(18).fill({
    title: "Produk 2 dengan nama yang...",
    price: "Rp30.000",
    category: "Kuliner",
    img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500&auto=format&fit=crop"
  });

  return (
    <main className="min-h-screen bg-samara-white2">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 border-b border-[#E8E8E8]">
        <div className='bg-samara-white2 w-full flex gap-8 justify-end px-8 py-2 text-[#6C7A91] text-sm'>
          <a href='https://parokikosambibaru.or.id' className="hover:text-samara-secondary cursor-pointer transition-colors">Paroki Kosambi Baru</a>
          <span className="hover:text-samara-secondary cursor-pointer transition-colors">Tambah Produk Kamu</span>
          <a href='https://sabuk.id/en/umk/category?paroki=39' className="hover:text-samara-secondary cursor-pointer transition-colors">Sabuk KAJ</a>
          <span className="hover:text-samara-secondary cursor-pointer transition-colors">Hubungi Kami</span>
        </div>
        <div className='flex bg-samara-white1 w-full px-8 py-2 items-center gap-16'>
          <Link href="/">
            <Image src="/samara-umkm.png" alt="" width={400} height={480} className='w-64' />
          </Link>
          <div className='w-2/3 text-center'>
            <input
              type="text"
              placeholder="Mau cari produk apa hari ini?"
              className="w-full border border-[#d4d4d4] rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-offset-1 focus:ring-samara-secondary transition-all duration-300"
              />
          </div>
          <div className='flex w-1/3'>
            <Link href="/" className="text-samara-primary cursor-pointer transition-colors">Cari UMKM</Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Hero Slider */}
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

        {/* Categories Section */}
        <section className="bg-samara-white1 text-samara-text p-8 rounded-2xl mb-10">
          <h2 className="text-2xl font-bold mb-4">Kategori Produk</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="group flex flex-col items-center justify-center p-6 rounded-xl bg-samara-white2 hover:bg-samara-primary transition-colors duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 bg-gray-300 mb-3 rounded-md group-hover:bg-white/20 transition-colors flex items-center justify-center text-2xl">
                  {cat.icon}
                </div>
                <span className="font-bold text-center group-hover:text-white transition-colors">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-6 items-center gap-4">
            <span className="text-samara-text">atau</span>
            <button className="border-2 border-samara-primary text-samara-primary px-6 py-2 rounded-lg font-bold hover:bg-samara-primary hover:text-white transition-all">
              Cari Berdasarkan UMKM
            </button>
          </div>
        </section>

        {/* Product Grid */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Jelajahi Produk UMKM</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {products.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <Image src={item.img} alt="product" width={400} height={400} className="object-cover w-full h-full transform hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-3">
                  <h3 className="text-sm line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-lg font-bold text-samara-primary mb-2">{item.price}</p>
                  <p className="text-xs text-samara-secondary uppercase tracking-wider">{item.category}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <button className="bg-[#1e3a8a] text-white px-12 py-3 rounded-lg font-bold hover:bg-blue-800 hover:shadow-lg transition-all active:scale-95">
              Lihat Lebih Banyak
            </button>
          </div>
        </section>

        {/* Call to Action Footer */}
        <section className="bg-[#1e3a8a] rounded-3xl p-10 text-white relative overflow-hidden group">
          {/* Decorative Circle Background */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-700" />

          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Tambah Produk UMKM Kamu!</h2>
            <p className="text-blue-100 mb-6 max-w-md text-sm">
              Kamu umat Paroki Kosambi Baru dan punya produk UMKM yang ingin dipromosikan? Hubungi kami sekarang!
            </p>
            <button className="bg-[#0091d5] text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-900 transition-all shadow-lg">
              Hubungi Kami
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}