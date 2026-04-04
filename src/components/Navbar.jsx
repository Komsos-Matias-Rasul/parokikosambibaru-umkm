// components/Navbar.jsx
import { Suspense } from 'react'
import Link from "next/link"
import Image from "next/image"
import NavbarClient from './NavbarClient'

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-[#E8E8E8]">
      <div className="bg-samara-white2 w-full flex gap-8 justify-end px-8 py-2 text-[#6C7A91] text-sm">
        <a href="https://parokikosambibaru.or.id" className="hover:text-samara-secondary cursor-pointer transition-colors">Paroki Kosambi Baru</a>
        <span className="hover:text-samara-secondary cursor-pointer transition-colors">Tambah Produk Kamu</span>
        <a href="https://sabuk.id/en/umk/category?paroki=39" className="hover:text-samara-secondary cursor-pointer transition-colors">Sabuk KAJ</a>
        <span className="hover:text-samara-secondary cursor-pointer transition-colors">Hubungi Kami</span>
      </div>
      <div className="flex bg-samara-white1 w-full px-8 py-2 items-center gap-16">
        <Link href="/">
          <Image src="/samara-umkm.png" alt="" width={400} height={480} className="w-64" />
        </Link>
        {/* Semua yang pakai useSearchParams/useRouter dipindah ke NavbarClient */}
        <Suspense fallback={
          <div className="w-2/3">
            <div className="w-full border border-[#d4d4d4] rounded-lg px-4 py-2 bg-gray-50 text-gray-400 text-sm">
              Mau cari produk apa hari ini?
            </div>
          </div>
        }>
          <NavbarClient />
        </Suspense>
      </div>
    </nav>
  )
}