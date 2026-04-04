'use client'

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isUMKMMode = pathname.startsWith("/umkm")
  const currentQuery = searchParams.get("q") ?? ""

  const [input, setInput] = useState(currentQuery)
  const [suggestions, setSuggestions] = useState({ produk: [], toko: [] })
  const [showDropdown, setShowDropdown] = useState(false)

  const wrapperRef = useRef(null)
  
  useEffect(() => {
    if (input.trim().length < 2) {
      setSuggestions({ produk: [], toko: [] })
      setShowDropdown(false)
      return
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/umkm/suggest?q=${encodeURIComponent(input.trim())}`
        )
        if (!res.ok) return
        const json = await res.json()
        const data = json.data ?? json  
        setSuggestions({
          produk: data.produk ?? [],
          toko: data.toko ?? [],
        })
        setShowDropdown(true)
      } catch {


      }
    }, 300)

    return () => clearTimeout(timer)
  }, [input])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])


  const hasSuggestions =
    suggestions.produk.length > 0 || suggestions.toko.length > 0

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowDropdown(false)
      setInput("")
    }
    if (e.key === "Enter" && input.trim()) {
      setShowDropdown(false)
      const params = new URLSearchParams()
      params.set("q", input.trim())
      params.set("category", "all")
      params.set("sort", "az")
      params.set("page", "1")
      router.push(`/search?${params.toString()}`)
    }
  }

  const handleProdukClick = (nama) => {
    setShowDropdown(false)
    setInput(nama)
    const params = new URLSearchParams()
    params.set("q", nama)
    params.set("category", "all")
    params.set("sort", "az")
    params.set("page", "1")
    router.push(`/search?${params.toString()}`)
  }

  const handleTokoClick = (id) => {
    setShowDropdown(false)
    setInput("")
    router.push(`/umkm/${id}`)
  }

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


        <div className="w-2/3 relative" ref={wrapperRef}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onFocus={() => { if (hasSuggestions) setShowDropdown(true) }}
            onKeyDown={handleKeyDown}
            placeholder={"Cari nama produk/toko ..."}
            className="w-full border border-[#d4d4d4] rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-offset-1 focus:ring-samara-secondary transition-all duration-300"
          />

          {showDropdown && hasSuggestions && (
            <div className=" absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">

              {suggestions.produk.length > 0 && (
                <div>
                  {suggestions.produk.map((p) => (
                    <button
                      key={p.id}
                      onMouseDown={() => handleProdukClick(p.nama)}
                      className="cursor-pointer w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 transition-colors text-left"
                    >








                      <span className="text-gray-400 shrink-0">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                        </svg>
                      </span>
                      <span className="text-sm text-samara-text truncate">{p.nama}</span>
                    </button>
                  ))}
                </div>
              )}
              {suggestions.produk.length > 0 && suggestions.toko.length > 0 && (
                <div className="border-t border-gray-100 mx-4" />
              )}



              {suggestions.toko.length > 0 && (
                <div>
                  {suggestions.toko.map((t) => (
                    <button
                      key={t.id}
                      onMouseDown={() => handleTokoClick(t.id)}
                      className="cursor-pointer w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-100 transition-colors text-left"
                    >
                      
                      {t.logo ? (
                        <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 ring-1 ring-samara-primary/20">
                          <Image
                            src={process.env.NEXT_PUBLIC_GCLOUD_PREFIX + t.logo}
                            alt={t.nama}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-samara-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-samara-primary font-bold text-[10px]">{t.nama?.charAt(0)}</span>
                        </div>
                      )}
                      <span className="text-sm font-semibold text-samara-text truncate">{t.nama}</span>
                      <span className="ml-auto text-[10px] text-samara-primary bg-samara-primary/10 px-2 py-0.5 rounded-full shrink-0">Toko</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex w-1/3">
          {isUMKMMode ? (
            <Link href="/search?category=all&sort=az&page=1" className="text-samara-primary cursor-pointer transition-colors">
              Cari Produk
            </Link>
          ) : (
            <Link href="/umkm" className="text-samara-primary cursor-pointer transition-colors">
              Cari UMKM
            </Link>
          )}
        </div>
      </div>

      {showDropdown && hasSuggestions && (
        <div
          className="fixed inset-0 bg-black/30 -z-10"
          onMouseDown={() => setShowDropdown(false)}
        />
      )}
    </nav>
  )
}