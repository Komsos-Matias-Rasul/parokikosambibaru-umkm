import React from 'react';
import Image from 'next/image';

import Link from 'next/link';
import { PromotionBanner } from '@/components/homepage/PromotionBanner';
import { ProductList } from '@/components/homepage/ProductList';
import Navbar from '@/components/Navbar';
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

      
      <Navbar/>

      <div className="max-w-7xl mx-auto px-4 py-6 pt-32">
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