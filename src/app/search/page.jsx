"use client";
import { Pagination } from '@/components/Pagination';
import { ProductCard } from '@/components/ProductCard';
import { ProductList } from '@/components/search/ProductList';
import { SearchPagination } from '@/components/search/SearchPagination';
import { CATEGORIES } from '@/const';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';
import useSWR from 'swr';

const allProducts = Array(320).fill(null).map((_, i) => ({
  id: i,
  name: `Produk ${i + 1} dengan nama yang...`,
  price: 30000 + (i* 100),
  category: i % 4 === 0 ? "kuliner" : i % 4 === 1 ? "jasa" : "fashion",
  img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=300",
  storeName: "something",
}));

const DEFAULT_CATEGORY = { id: 0, filterName: 'all', name: 'Semua Ketegori' }
const SORTBY = [
  { id: 0, sortName: 'az', name: 'A-Z'},
  { id: 1, sortName: 'za', name: 'Z-A'},
  { id: 2, sortName: 'price-asc', name: 'Harga terendah'},
  { id: 3, sortName: 'price-desc', name: 'Harga tertinggi'},
]

export default function SearchPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [totalPage, setTotalPage] = useState(1)

  const currentPage = Number(searchParams.get('page')) || 1
  const activeCategory = searchParams.get('category') || 'all'
  const activeSort = searchParams.get('sort') || 'az'
  const searchQuery = searchParams.get('q') || ''
  
  
  const updateFilters = (updates) => {
    const params = new URLSearchParams(searchParams.toString())
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === 'all') {
        params.delete(key)
      } else {
        params.set(key, String(value))
      }
    })

    // Always reset to page 1 when filters change, unless we are specifically changing the page
    if (!updates.page) params.set('page', '1')

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <>
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

      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filter */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-36">
            <h2 className="font-bold text-lg mb-6">Opsi</h2>
            
            <div className="mb-8">
              <h3 className="font-bold text-sm mb-4">Kategori</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                {[DEFAULT_CATEGORY, ...CATEGORIES].map((cat) => (
                  <label key={cat.id} className="flex items-center gap-2 cursor-pointer group text-sm">
                    <input 
                      type="radio"
                      name="category"
                      checked={activeCategory === cat.filterName}
                      onChange={() => updateFilters({ category: cat.filterName })}
                      className="w-4 h-4 accent-samara-primary cursor-pointer transition-transform group-hover:scale-110"
                    />
                    <span className={activeCategory === cat.filterName ? "font-bold text-samara-primary" : ""}>{cat.name}</span>
                  </label>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-sm mb-4">Urutkan</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                {SORTBY.map((sort) => (
                  <label key={sort.id} className="flex items-center gap-2 cursor-pointer group text-sm">
                  <input 
                    type="radio"
                    name="sort"
                    checked={activeSort === sort.sortName}
                    onChange={() => updateFilters({ sort: sort.sortName })}
                    className="w-4 h-4 accent-samara-primary cursor-pointer transition-transform group-hover:scale-110"
                  />
                  <span className={activeSort === sort.sortName ? "font-bold text-samara-primary" : ""}>{sort.name}</span>
                </label>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <section className="flex-1">
          <SearchPagination
            currentPage={currentPage}
            pageCount={totalPage}
            onfilterChange={updateFilters} />
          <ProductList
            activeCategory={activeCategory}
            activeSort={activeSort}
            currentPage={currentPage}
            onData={(e) => setTotalPage(e)}
            />
          <SearchPagination
            currentPage={currentPage}
            pageCount={totalPage}
            onfilterChange={updateFilters} />
        </section>
      </div>
    </>
  );
}