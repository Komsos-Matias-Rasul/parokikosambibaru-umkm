'use client'

import { ProductCard, ProductCardGhost } from "../ProductCard";
import useSWR from "swr";

const getProducts = async (endpoint, callback) => {
  const res = await fetch(endpoint)
  const jsonData = await res.json()
  if (!res.ok) {
    throw new Error("failed to fetch product")
  }
  callback(jsonData.data.pageCount)
  return jsonData.data
}

export const ProductList = ({ currentPage, activeCategory, activeSort, searchQuery = '', onData = () => {} }) => {
  const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/umkm/products`)
  url.searchParams.set('page', currentPage)
  url.searchParams.set('category', activeCategory)
  url.searchParams.set('sort', activeSort)
  if (searchQuery) url.searchParams.set('q', searchQuery)

  const {data, error, isLoading, mutate} = useSWR(
    [url.toString(), onData],
    ([endpoint, callback]) => getProducts(endpoint, callback)
  )

  if (isLoading) return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {new Array(20).fill(null).map((_, i) => <ProductCardGhost key={i} />)}
    </div>
  )

  if (error) return (
    <div className="text-center py-20 text-samara-text/50">
      <p className="text-4xl mb-3">😕</p>
      <p className="font-semibold">Gagal memuat produk</p>
      <button
        onClick={() => mutate()}
        className="mt-4 text-sm text-samara-primary underline"
      >
        Coba lagi
      </button>
    </div>
  )

  if (!data?.produk || data.produk.length === 0) return (
    <div className="text-center py-20 text-samara-text/50">
      <p className="text-4xl mb-3">🔍</p>
      <p className="font-semibold">
        {searchQuery
          ? `Tidak ada produk untuk "${searchQuery}"`
          : "Tidak ada produk ditemukan"}
      </p>
      <p className="text-sm mt-1">Coba ubah kata kunci atau kategori</p>
    </div>
  )

  return (
    <section>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {data.produk.map((item, idx) => <ProductCard key={idx} id={idx} product={item} />)}
      </div>
    </section>
  )
}