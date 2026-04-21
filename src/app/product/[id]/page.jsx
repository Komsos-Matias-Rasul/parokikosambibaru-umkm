import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import { Suspense } from 'react'


const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
})

async function getProductDetail(id) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/umkm/products/${id}`,
        { cache: 'no-store' } 
        


    )   
    if (!res.ok) return null
    const json = await res.json()
    return json.data.product
}

export default async function ProductDetailPage({ params }) {
    const resolvedParams = await params
    const product = await getProductDetail(resolvedParams.id)

    if (!product) {
        return (
            <>
                <Suspense fallback={null}>
                    <Navbar search={search}/> 
                </Suspense>
                
                
                <main className="min-h-screen bg-samara-white2 flex items-center justify-center pt-26">
                    <div className="text-center">
                        <p className="text-xl font-bold text-samara-text mb-4">Produk tidak ditemukan</p>
                        <Link href="/">
                            <button className="bg-samara-primary text-white px-6 py-2 rounded-lg font-bold">
                                Kembali ke Beranda
                            </button>
                        </Link>
                    </div>
                </main>
            </>
        )
    }

    const toko = product.toko

    return (
        <>
            <Suspense fallback={null}>
                
                <Navbar />
            </Suspense>
            
            <main className="min-h-screen bg-samara-white2 pt-24">



                <div className="max-w-6xl mx-auto px-4 py-3 text-sm text-samara-text/50 flex items-center gap-2">
                    <Link href="/" className="hover:text-samara-primary transition-colors font-medium">Beranda</Link>
                    <span>/</span>
                    <Link
                        href={`/search?category=${toko.kategoriLabel?.toLowerCase()}&sort=az&page=1`}
                        className="hover:text-samara-primary transition-colors font-medium"
                    >
                        {toko.kategoriLabel}
                    </Link>
                    <span>/</span>
                    <span className="text-samara-text font-semibold line-clamp-1">{product.name}</span>
                </div>



                <div className="max-w-6xl mx-auto px-4 pb-12 border-b-black">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm mb-6">
                        <div className="grid md:grid-cols-2">
                            <div className="relative h-105 md:h-125 bg-linear-to-br from-samara-primary/20 to-samara-primary/10">
                                <Image
                                    src={process.env.NEXT_PUBLIC_GCLOUD_PREFIX + product.img}
                                    alt={product.name}
                                    fill
                                    className="object-contain p-8"
                                />
                                <div className="absolute top-5 left-5">
                                    <span className="bg-samara-primary text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow">
                                        {toko.kategoriLabel}
                                    </span>
                                </div>
                            </div>





                            <div className="p-10 flex flex-col justify-between border-l border-gray-100">
                                <div>
                                    <h1 className="text-3xl font-bold text-samara-text mb-4 leading-tight">
                                        {product.name}
                                    </h1>

                                    <div className="rounded-xl mb-5 inline-block">
                                        
                                        <p className="text-4xl font-bold text-samara-primary">
                                            {formatter.format(product.price)}
                                        </p>
                                    </div>

                                    {product.description && (
                                        <p className="text-sm text-samara-text/70 leading-relaxed mt-2">
                                            {product.description}
                                        </p>
                                    )}
                                </div>

                                
                                <Link
                                    href={`/umkm/${toko.id}`}
                                    className="group flex items-center gap-3 mt-8 pt-6 border-t-2 border-samara-primary/15 hover:border-samara-primary/40 transition-colors"
                                >
                                    {toko.logo ? (
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-samara-white2 shrink-0 ring-2 ring-samara-primary/20 group-hover:ring-samara-primary/50 transition-all">
                                            <Image
                                                src={process.env.NEXT_PUBLIC_GCLOUD_PREFIX + toko.logo}
                                                alt={toko.nama}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-samara-primary/10 group-hover:bg-samara-primary/20 flex items-center justify-center shrink-0 transition-colors">
                                            <span className="text-samara-primary font-extrabold text-lg">
                                                {toko.nama?.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-xs text-samara-text/50 uppercase tracking-wider font-semibold">Dijual oleh</p>
                                        <p
                                            className="font-extrabold text-samara-primary text-sm group-hover:underline"
                                            dangerouslySetInnerHTML={{ __html: toko.nama }}
                                        />
                                    </div>
                                    
                                    <span className="ml-auto text-samara-primary/40 group-hover:text-samara-primary group-hover:translate-x-1 transition-all text-sm">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>


                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                        
                        <div className="px-8 py-5 border-b border-gray-100 bg-samara-primary/10">
                            <h2 className="text-lg font-extrabold text-samara-text">Informasi UMKM</h2>
                            <p className="text-samara-text/70 text-sm mt-0.5">
                                Hubungi penjual langsung untuk pemesanan
                            </p>
                        </div>

                        <div className="p-8">
                            <div className="grid md:grid-cols-2 gap-8">


                                <div className="space-y-4">
                                    {toko.jenisProduk && (
                                        <div className="rounded-xl p-4 bg-samara-primary/5">
                                            <p className="text-xs text-samara-primary font-bold uppercase tracking-wider mb-1">Jenis Produk</p>
                                            <p className="text-sm font-semibold text-samara-text">{toko.jenisProduk}</p>
                                        </div>
                                    )}
                                    {toko.alamat && (
                                        <div className="bg-samara-primary/5 rounded-xl p-4">
                                            <p className="text-xs text-samara-primary font-bold uppercase tracking-wider mb-1">Alamat</p>
                                            <p className="text-sm font-semibold text-samara-text">{toko.alamat}</p>
                                        </div>
                                    )}

                                    {toko.id && (
                                        <Link href={`/umkm/${toko.id}`}>
                                            <div className="rounded-xl p-4 bg-samara-primary/5 hover:bg-samara-primary/10 transition-colors cursor-pointer flex items-center justify-between group">
                                                <p className="text-sm font-bold text-samara-primary">Lihat Profil Toko Lengkap</p>
                                                <span className="text-samara-primary group-hover:translate-x-1 transition-transform">→</span>
                                            </div>
                                        </Link>
                                    )}
                                </div>


                                <div className="space-y-3">
                                    <p className="text-xs text-samara-primary font-bold uppercase tracking-wider mb-3">Hubungi Via</p>

                                    {toko.whatsapp && (
                                        <a href={toko.whatsapp} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center gap-3 px-4 py-3 bg-green-100 text-samara-text rounded-xl hover:bg-green-200 transition-colors w-full border border-green-300">
                                            <span className="text-xl text-green-500">
                                                <Image src="/wa_logo.png" width={25} height={25} alt=""  />
                                            </span>
                                            <div>
                                                <p className="text-sm font-bold uppercase tracking-wider text-samara-text">WhatsApp</p>
                                                <p className="text-sm font-medium text-samara-text/60 truncate">{toko.telepon}</p>
                                            </div>
                                        </a>
                                    )}
                                    {toko.instagram && (
                                        <a href={toko.instagram} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center gap-3 px-4 py-3 bg-fuchsia-100 text-samara-text rounded-xl hover:bg-fuchsia-200 transition-colors w-full border border-fuchsia-300">
                                            <span className="text-xl">
                                            <Image src="/ig_logo.webp" width={25} height={25} alt=""  />
                                            </span>
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wider text-samara-text">Instagram</p>
                                                <p className="text-sm font-medium text-samara-text/60 truncate">{String(toko.instagram).split("/")[3]}</p>
                                            </div>
                                        </a>
                                    )}
                                    {toko.facebook && (
                                        <a href={toko.facebook} target="_blank" rel="noopener noreferrer"
                                            className="flex items-center gap-3 px-4 py-3 bg-samara-white2 text-samara-text rounded-xl hover:bg-gray-100 transition-colors w-full border border-gray-100">
                                            <span className="text-xl">📘</span>
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wider text-samara-text">Facebook</p>
                                                <p className="text-sm font-medium text-samara-text/60 truncate">{toko.facebook}</p>
                                            </div>
                                        </a>
                                    )}
                                    {toko.telepon && (
                                        <a href={`tel:${toko.telepon}`}
                                            className="flex items-center gap-3 px-4 py-3 bg-samara-primary/5 text-samara-text rounded-xl hover:bg-samara-primary/10 transition-colors w-full border border-samara-primary/20">
                                            <span className="text-xl">📞</span>
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wider text-samara-text">Telepon</p>
                                                <p className="text-sm font-medium text-samara-text/60">{toko.telepon}</p>
                                            </div>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="flex justify-center pt-9">
                        <Link href="/search?category=all&sort=az&page=1">
                            <button className="text-sm text-samara-primary font-semibold hover:underline flex items-center gap-1">
                                ← Kembali ke Daftar UMKM
                            </button>
                        </Link>
                    </div>
                </div>
                
            </main>
        </>
    )
}