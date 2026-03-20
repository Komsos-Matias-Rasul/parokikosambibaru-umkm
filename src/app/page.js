import React from 'react';
import Image from 'next/image';

import Link from 'next/link';
import { PromotionBanner } from '@/components/homepage/PromotionBanner';
import { ProductList } from '@/components/homepage/ProductList';
import { CATEGORIES } from '@/const';

const CategoryCard = ({ category }) => {
  return (
    <Link href={`/search?category=${category.filterName}&sort=az&page=1`}>
      <div
        className="group flex flex-col items-center justify-center p-6 rounded-xl bg-samara-white2 hover:bg-samara-primary transition-colors duration-300 cursor-pointer"
      >
        <Image src={category.icon} alt={category.name} title={category.name} width={100} height={100} className='w-12 aspect-square' />
        <span className="font-bold text-center group-hover:text-white transition-colors">
          {category.name}
        </span>
      </div>
    </Link>
  )
}

export default function Home() {
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
        <PromotionBanner />

        <section className="bg-samara-white1 text-samara-text p-8 rounded-2xl mb-10">
          <h2 className="text-2xl font-bold mb-4">Kategori Produk</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.id} category={cat}/>
            ))}
          </div>
          <div className="flex justify-end mt-6 items-center gap-4">
            <span className="text-samara-text">atau</span>
            <Link href="/">
              <button className="border-2 border-samara-primary text-samara-primary px-6 py-2 rounded-lg font-bold hover:bg-samara-primary hover:text-white transition-colors cursor-pointer">
                Cari Berdasarkan UMKM
              </button>
            </Link>
          </div>
        </section>

        <ProductList />

        <section className="bg-samara-primary rounded-3xl p-10 text-white relative overflow-hidden group mt-10">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-700" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Tambah Produk UMKM Kamu!</h2>
            <p className="text-white mb-6 max-w-md text-sm">
              Kamu umat Paroki Kosambi Baru dan punya produk UMKM yang ingin dipromosikan? Hubungi kami sekarang!
            </p>
            <button className="bg-samara-secondary text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-900 transition-colors cursor-pointer">
              Hubungi Kami
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}