'use client'

import Image from "next/image"
import Link from "next/link";

const products = Array(18).fill({
  title: "Produk 2 dengan nama yang...",
  price: "Rp30.000",
  category: "Kuliner",
  img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500&auto=format&fit=crop"
});

export const ProductList = () => {
  return (
    <section>
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
        <Link href="/">
          <button className="bg-samara-primary text-white px-12 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors cursor-pointer">
            Lihat Lebih Banyak
          </button>
        </Link>
      </div>
    </section>
  )
}