"use client";
import Navbar from '@/components/Navbar';
import { ProductList } from '@/components/search/ProductList';
import { SearchPagination } from '@/components/search/SearchPagination';
import { CATEGORIES } from '@/const';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';


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

    if (!updates.page) params.set('page', '1')

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <>
      <Navbar/>

      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 pt-35">
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

        <section className="flex-1">
          <SearchPagination
            currentPage={currentPage}
            pageCount={totalPage}
            onfilterChange={updateFilters} />
          <ProductList
            activeCategory={activeCategory}
            activeSort={activeSort}
            currentPage={currentPage}
            searchQuery={searchQuery}
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