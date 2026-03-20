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

export const ProductList = ({ currentPage, activeCategory, activeSort, onData = () => {} }) => {
  const {data, error, isLoading} = useSWR([`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/umkm/products?&page=${currentPage}&category=${activeCategory}&sort=${activeSort}`, onData], ([url, callback]) => getProducts(url, callback))
  
  if (isLoading) return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        { new Array(20).fill(null).map((_, i) => <ProductCardGhost key={i} /> )}
      </div>
  )
  if (error) return <p>Gagal menampilkan produk</p>
  return (
    <section>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {data.produk.map((item, idx) => <ProductCard key={idx} id={idx} product={item} />)}
      </div>
    </section>
  )
}