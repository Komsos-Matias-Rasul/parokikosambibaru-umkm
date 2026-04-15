'use client'

import { useState, useCallback, useEffect, Suspense } from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import { SearchPagination } from "@/components/search/SearchPagination"
import { CATEGORIES } from "@/const"

const DEFAULT_CATEGORY = { id: 0, filterName: 'all', name: 'Semua Kategori' }
const FILTER_CATEGORIES = [DEFAULT_CATEGORY, ...CATEGORIES]
const getKategoriLabel = (id) => CATEGORIES.find(c => c.id === id)?.name ?? "Lainnya"
const SORTS = [
    { id: "A-Z", label: "A–Z" },
    { id: "Z-A", label: "Z–A" },
]

const TokoCardSkeleton = () => (
    <div className="bg-white rounded-2xl overflow-hidden animate-pulse">
        <div className="h-3 bg-slate-200" />
        <div className="p-5 space-y-3">
            <div className="flex gap-3 items-center">
                <div className="w-14 h-14 rounded-full bg-slate-200 shrink-0" />
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-200 rounded-full w-3/4" />
                    <div className="h-3 bg-slate-100 rounded-full w-1/2" />
                </div>
            </div>
            <div className="h-3 bg-slate-100 rounded-full w-2/3" />
            <div className="h-3 bg-slate-100 rounded-full w-1/2" />
            <div className="flex justify-between pt-2 border-t border-slate-100">
                <div className="h-3 w-16 bg-slate-100 rounded-full" />
                <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-full bg-slate-100" />
                    <div className="w-7 h-7 rounded-full bg-slate-100" />
                </div>
            </div>
        </div>
    </div>
)

const TokoCard = ({ toko }) => {
    const initial = toko.nama?.charAt(0)?.toUpperCase()
    const label = getKategoriLabel(toko.kategori)
    return (
        <Link href={`/umkm/${toko.id}`}>
            <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-transparent hover:border-samara-primary/20">
                <div className="h-3 bg-samara-primary" />
                <div className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                        {toko.logo ? (
                            <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 ring-2 ring-samara-primary/20">
                                <Image src={process.env.NEXT_PUBLIC_GCLOUD_PREFIX + toko.logo} alt={toko.nama} fill className="object-cover" />
                            </div>
                        ) : (
                            <div className="w-14 h-14 rounded-full bg-samara-primary/10 flex items-center justify-center shrink-0">
                                <span className="text-samara-primary font-extrabold text-xl">{initial}</span>
                            </div>
                        )}
                        <div className="min-w-0">
                            <p className="font-bold text-samara-text leading-tight line-clamp-2 text-sm group-hover:text-samara-primary transition-colors"
                                dangerouslySetInnerHTML={{ __html: toko.nama }} />
                            <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider text-samara-primary bg-samara-primary/10 px-2 py-0.5 rounded-full">
                                {label}
                            </span>
                        </div>
                    </div>
                    <div className="space-y-1.5 text-xs text-samara-text/60">
                        {toko.jenisProduk && <div className="flex items-center gap-2"><span>🏷️</span><span className="line-clamp-1">{toko.jenisProduk}</span></div>}
                        {toko.alamat && <div className="flex items-center gap-2"><span>📍</span><span className="line-clamp-1">{toko.alamat}</span></div>}
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs font-semibold text-samara-text/50">{toko.jumlahProduk} produk</span>
                        <div className="flex gap-2">
                            {toko.whatsapp && (
                                <button onClick={e => { e.preventDefault(); e.stopPropagation(); window.open(toko.whatsapp, '_blank', 'noopener,noreferrer') }}
                                    className="w-7 h-7 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center transition-colors text-sm" title="WhatsApp">
                                        <Image src="/wa_logo.png" width={20} height={20} alt=""  />
                                    </button>
                            )}
                            {toko.instagram && (
                                <button onClick={e => { e.preventDefault(); e.stopPropagation(); window.open(toko.instagram, '_blank', 'noopener,noreferrer') }}
                                    className="w-7 h-7 rounded-full bg-fuchsia-100 hover:bg-fuchsia-200 flex items-center justify-center transition-colors text-sm" title="Instagram">
                                        <Image src="/ig_logo.webp" width={20} height={20} alt=""  />
                                        </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

const TokoList = ({ kategori, sort, currentPage, search, onData }) => {
    const [toko, setToko] = useState([])
    const [total, setTotal] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchData = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const params = new URLSearchParams({ sort, page: currentPage, limit: 15 })
            if (search) params.set("q", search)
            if (kategori !== 0) params.set("filter", kategori)
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/umkm/toko?${params}`)
            if (!res.ok) throw new Error("Gagal memuat data")
            const json = await res.json()
            setToko(json.data.toko ?? [])
            setTotal(json.data.total ?? 0)
            onData(json.data.totalPages ?? 1)
        } catch (e) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }, [kategori, sort, currentPage, search])

    useEffect(() => { fetchData() }, [fetchData])

    if (isLoading) return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
            {new Array(15).fill(null).map((_, i) => <TokoCardSkeleton key={i} />)}
        </div>
    )
    
    if (error) return (
        <div className="text-center py-20 text-samara-text/50">
            <p className="text-4xl mb-3">😕</p>
            <p className="font-semibold">{error}</p>
            <button onClick={fetchData} className="mt-4 text-sm text-samara-primary underline">Coba lagi</button>
        </div>
    )
    
    if (toko.length === 0) return (
        <div className="text-center py-20 text-samara-text/50">
            <p className="text-4xl mb-3">🔍</p>
            <p className="font-semibold">Tidak ada toko ditemukan</p>
            <p className="text-sm mt-1">Coba ubah kata kunci atau kategori</p>
        </div>
    )
    
    return (
        <div className="my-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {toko.map(t => <TokoCard key={t.id} toko={t} />)}
            </div>
        </div>
    )
}

export default function UMKMPageClient() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [totalPage, setTotalPage] = useState(1)
    
    const searchQuery  = searchParams.get("q") || ""
    const currentPage  = Number(searchParams.get("page")) || 1
    const activeSort   = searchParams.get("sort") || "A-Z"
    const activeFilter = Number(searchParams.get("filter")) || 0

    const updateFilters = (updates) => {
        const params = new URLSearchParams(searchParams.toString())
        Object.entries(updates).forEach(([key, value]) => {
            if (value === null || value === 0) params.delete(key)
            else params.set(key, String(value))
        })
        if (!updates.page) params.set("page", "1")
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }

    const updatePage = (p) => {
        updateFilters({ page: p })
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <>
            <Suspense fallback={null}>
                <Navbar />
            </Suspense>
            
            <main className="min-h-screen bg-samara-white2 pt-24">
                <div className="bg-samara-primary">
                    <div className="max-w-6xl mx-auto px-4 py-8">
                        <h1 className="text-2xl font-extrabold text-white mb-1">Cari UMKM</h1>
                        <p className="text-white/70 text-sm">Temukan penjual UMKM Paroki Kosambi Baru</p>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
                    <aside className="w-full md:w-64 shrink-0">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-28">
                            <h2 className="font-bold text-lg mb-6">Opsi</h2>
                            <div className="mb-6">
                                <h3 className="font-bold text-sm mb-3">Kategori</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    {FILTER_CATEGORIES.map(cat => (
                                        <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="kategori"
                                                checked={activeFilter === cat.id}
                                                onChange={() => updateFilters({ filter: cat.id })}
                                                className="w-4 h-4 accent-samara-primary cursor-pointer"
                                            />
                                            <span className={activeFilter === cat.id ? "font-bold text-samara-primary" : ""}>{cat.name}</span>
                                        </label>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm mb-3">Urutkan</h3>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    {SORTS.map(s => (
                                        <label key={s.id} className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="radio"
                                                name="sort"
                                                checked={activeSort === s.id}
                                                onChange={() => updateFilters({ sort: s.id })}
                                                className="w-4 h-4 accent-samara-primary cursor-pointer"
                                            />
                                            <span className={activeSort === s.id ? "font-bold text-samara-primary" : ""}>{s.label}</span>
                                        </label>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </aside>

                    <section className="flex-1 min-w-0">
                        <SearchPagination currentPage={currentPage} pageCount={totalPage} onfilterChange={({ page: p }) => updatePage(p)} />
                        <TokoList kategori={activeFilter} sort={activeSort} currentPage={currentPage} search={searchQuery} onData={setTotalPage} />
                        <SearchPagination currentPage={currentPage} pageCount={totalPage} onfilterChange={({ page: p }) => updatePage(p)} />
                    </section>
                </div>
            </main>
        </>
    )
}