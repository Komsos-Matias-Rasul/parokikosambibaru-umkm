
'use client'

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function NavbarClient() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isUMKMMode = pathname.startsWith("/umkm")

  const [input, setInput] = useState( searchParams.get("q") ??"")
  const [suggestions, setSuggestions] = useState({ produk: [], toko: [] })
  const [showDropdown, setShowDropdown] = useState(false)
  const wrapperRef = useRef(null)
  const isTypingRef = useRef(false) 

  // onChange={e => {
  //   isTypingRef.current = true
  //   setInput(e.target.value)
  // }}

  const handleInputChange = (e) => {
    isTypingRef.current = true
    setInput(e.target.value)
  }
  useEffect(()=>{
    isTypingRef.current = false
    setInput(searchParams.get("q") ?? "")
  },[searchParams])

  useEffect(() => {

    if (!isTypingRef.current) return

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
        setSuggestions({ produk: data.produk ?? [], toko: data.toko ?? [] })
        setShowDropdown(true)
      } catch {}
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

  const hasSuggestions = suggestions.produk.length > 0 || suggestions.toko.length > 0

  const handleKeyDown = (e) => {
    if (e.key === "Escape") { setShowDropdown(false); setInput("") }
    if (e.key === "Enter") {
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
    <>
    
      <div className="w-2/3 relative" ref={wrapperRef}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onFocus={() => { if (hasSuggestions) setShowDropdown(true) }}
          onKeyDown={handleKeyDown}
          placeholder={isUMKMMode ? "Cari nama toko UMKM..." : "Mau cari produk apa hari ini?"}
          className="w-full border border-[#d4d4d4] rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-offset-1 focus:ring-samara-secondary transition-all duration-300"
        />

        {showDropdown && hasSuggestions && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
            {suggestions.produk.length > 0 && (
              <div>
                <p className="px-4 pt-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-samara-text/40">Produk</p>
                {suggestions.produk.map((p) => (
                  <button key={p.id} onMouseDown={() => handleProdukClick(p.nama)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left">
                    <span className="text-gray-400 shrink-0">
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                      </svg>
                    </span>
                    <span className="text-sm text-samara-text truncate">{p.nama}</span>
                  </button>
                ))}
              </div>
            )}

            {suggestions.produk.length > 0 && suggestions.toko.length > 0 && (
              <div className="border-t border-gray-100 mx-4 my-1" />
            )}

            {suggestions.toko.length > 0 && (
              <div>
                <p className="px-4 pt-2 pb-1 text-[10px] font-bold uppercase tracking-wider text-samara-text/40">Toko UMKM</p>
                {suggestions.toko.map((t) => (
                  <button key={t.id} onMouseDown={() => handleTokoClick(t.id)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left">
                    {t.logo ? (
                      <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 ring-1 ring-samara-primary/20">
                        <Image src={process.env.NEXT_PUBLIC_GCLOUD_PREFIX + t.logo} alt={t.nama} fill className="object-cover" />
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

            <div className="px-4 py-2 border-t border-gray-100 mt-1">
              <button
                onMouseDown={() => {
                  if (!input.trim()) return
                  setShowDropdown(false)
                  const params = new URLSearchParams()
                  params.set("q", input.trim())
                  params.set("category", "all")
                  params.set("sort", "az")
                  params.set("page", "1")
                  router.push(`/search?${params.toString()}`)
                }}
                className="text-sm text-samara-primary font-semibold hover:underline"
              >
                Cari &quot;{input}&quot; di semua produk →
              </button>
            </div>
          </div>
        )}
      </div>












      <div className="flex w-1/3">
        {isUMKMMode ? (
          <Link href="/search?category=all&sort=az&page=1" className="text-samara-primary cursor-pointer transition-colors">Cari Produk</Link>
        ) : (
          <Link href="/umkm" className="text-samara-primary cursor-pointer transition-colors">Cari UMKM</Link>
        )}
      </div>

      {showDropdown && hasSuggestions && (
        <div className="fixed inset-0 bg-black/30 -z-10" onMouseDown={() => setShowDropdown(false)} />
      )}
    </>
  )
}