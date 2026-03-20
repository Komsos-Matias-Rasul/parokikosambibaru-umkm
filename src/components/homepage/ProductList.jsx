'use client'

import Link from "next/link";
import { ProductCard, ProductCardGhost } from "../ProductCard";
import useSWR from "swr";

const getRandomProduct = async (path) => {
  const res = await fetch(path)
  const jsonData = await res.json()
  if (!res.ok) {
    throw new Error("Failed to get product data")
  }
  return jsonData.data.products
}

export const ProductList = () => {
  const {data, error, isLoading} = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/umkm/products/rand`, getRandomProduct)
  if (isLoading) return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      { new Array(18).fill(null).map((_, i) => <ProductCardGhost key={i} /> )}
    </div>
  )
  if (error) return <p>Gagal menampilkan produk</p>
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Jelajahi Produk UMKM</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.map((item, idx) => <ProductCard id={idx} product={item} key={idx} />)}
      </div>

      <div className="flex justify-center mt-12">
        <Link href="/search?category=all&sort=az&page=1">
          <button className="bg-samara-primary text-white px-12 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors cursor-pointer">
            Lihat Lebih Banyak
          </button>
        </Link>
      </div>
    </section>
  )
}