import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/Navbar"
import { CATEGORIES } from "@/const"
import { Suspense} from 'react';

const getKategoriLabel = (id) => CATEGORIES.find(c => c.id === id)?.name ?? "Lainnya"

const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
})

async function getTokoDetail(id) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/umkm/toko/${id}`,
        { cache: 'no-store' }
    )
    if (!res.ok) return null
    const json = await res.json()
    return json.data
}

const MiniProductCard = ({ product, kategoriLabel }) => (
    <Link href={`/product/${product.id}`}>
        <div className="group bg-samara-white2 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
            <div className="relative h-36 w-full overflow-hidden bg-samara-primary/5">
                <Image
                    src={process.env.NEXT_PUBLIC_GCLOUD_PREFIX + product.img}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-3">
                <p className="text-xs text-samara-secondary uppercase tracking-wider line-clamp-1 font-bold">
                    {kategoriLabel}
                </p>
                <h3 className="text-sm font-semibold line-clamp-2 text-samara-text mt-0.5 leading-snug">
                    {product.name}
                </h3>
                <p className="text-base font-bold text-samara-primary mt-1">
                    {formatter.format(product.price)}
                </p>
            </div>
        </div>
    </Link>
)

// ── Kontak item ───────────────────────────────────────────────────────────────
const KontakItem = ({ href, icon, label, value, colorClass, borderClass }) => (
    <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors border ${colorClass} ${borderClass}`}
    >
        <span className="text-xl shrink-0">{icon}</span>
        <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-samara-text">{label}</p>
            <p className="text-sm text-samara-text/60 truncate">{value}</p>
        </div>
    </a>
)






export default async function TokoDetailPage({ params }) {
    const resolvedParams = await params
    const detail = await getTokoDetail(resolvedParams.id)

    if (!detail) { // klo gagal ora ada detil
        return (
            <>
                <Suspense fallback={null}>
                    <Navbar />
                </Suspense>
                {/* janlup search nya */}
                <main className="min-h-screen bg-samara-white2 flex items-center justify-center pt-26">
                    <div className="text-center">
                        <p className="text-4xl mb-4">🏪</p>
                        <p className="text-xl font-bold text-samara-text mb-4">Toko tidak ditemukan</p>
                        <Link href="/umkm">
                            <button className="bg-samara-primary text-white px-6 py-2 rounded-lg font-bold">
                                Kembali ke Daftar UMKM
                            </button>
                        </Link>
                    </div>
                </main>
            </>
        )
    }

    const { toko, produk } = detail
    const label = getKategoriLabel(toko.kategori)
    return (
        <>
            <Suspense fallback={null}>

                <Navbar />
            </Suspense>
            <main className="min-h-screen bg-samara-white2 pt-24">

                {/* breadcrumb ny */}
                <div className="max-w-6xl mx-auto px-4 py-3 text-sm text-samara-text/50 flex items-center gap-2">
                    <Link href="/" className="hover:text-samara-primary transition-colors font-medium">Beranda</Link>
                    <span>/</span>
                    <Link href="/umkm" className="hover:text-samara-primary transition-colors font-medium">UMKM</Link>
                    <span>/</span>
                    <span
                        className="text-samara-text font-semibold line-clamp-1"
                        dangerouslySetInnerHTML={{ __html: toko.nama }}
                    />
                </div>

                <div className="max-w-6xl mx-auto px-4 pb-12 space-y-6">

                    {/* info toko */}
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

                        {/* accent */}
                        <div className="h-2 bg-samara-primary" />
                        <div className="p-8">
                            <div className="flex flex-col sm:flex-row gap-6 items-start">
                                {/* logo toko */}
                                {toko.logo ? (
                                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 ring-4 ring-samara-primary/15 shadow">
                                        <Image
                                            src={process.env.NEXT_PUBLIC_GCLOUD_PREFIX + toko.logo}
                                            alt={toko.nama}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-24 h-24 rounded-2xl bg-samara-primary/10 flex items-center justify-center shrink-0 ring-4 ring-samara-primary/15">
                                        <span className="text-samara-primary font-extrabold text-4xl">
                                            {toko.nama?.charAt(0)}
                                        </span>
                                    </div>
                                )}

                                {/* identity */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                        <span className="text-xs font-bold uppercase tracking-wider text-samara-primary bg-samara-primary/10 px-3 py-1 rounded-full">
                                            {label}
                                        </span>
                                        {produk.length > 0 && (
                                            <span className="text-xs font-semibold text-samara-text/50">
                                                {produk.length} produk
                                            </span>
                                        )}
                                    </div>
                                    <h1
                                        className="text-3xl font-extrabold text-samara-text leading-tight mb-2"
                                        dangerouslySetInnerHTML={{ __html: toko.nama }}
                                    />
                                    <div className="flex flex-wrap gap-4 text-sm text-samara-text/60 mt-2">
                                        {toko.jenisProduk && (
                                            <span className="flex items-center gap-1.5">
                                                <span>🏷️</span>{toko.jenisProduk}
                                            </span>
                                        )}
                                        {toko.alamat && (
                                            <span className="flex items-center gap-1.5">
                                                <span>📍</span>{toko.alamat}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* inpo kontak toko */}
                            {(toko.whatsapp || toko.instagram || toko.facebook || toko.telepon) && (
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <p className="text-xs font-bold uppercase tracking-wider text-samara-primary mb-3">
                                        Hubungi Via
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {toko.whatsapp && (
                                            <KontakItem
                                                href={toko.whatsapp}
                                                icon="💬" label="WhatsApp" value={toko.whatsapp}
                                                colorClass="bg-green-50 hover:bg-green-100"
                                                borderClass="border-green-200"
                                            />
                                        )}
                                        {toko.instagram && (
                                            <KontakItem
                                                href={toko.instagram}
                                                icon="📸" label="Instagram" value={toko.instagram}
                                                colorClass="bg-fuchsia-50 hover:bg-fuchsia-100"
                                                borderClass="border-fuchsia-200"
                                            />
                                        )}
                                        {toko.facebook && (
                                            <KontakItem
                                                href={toko.facebook}
                                                icon="📘" label="Facebook" value={toko.facebook}
                                                colorClass="bg-blue-50 hover:bg-blue-100"
                                                borderClass="border-blue-200"
                                            />
                                        )}
                                        {toko.telepon && (
                                            <KontakItem
                                                href={`tel:${toko.telepon}`}
                                                icon="📞" label="Telepon" value={toko.telepon}
                                                colorClass="bg-samara-primary/5 hover:bg-samara-primary/10"
                                                borderClass="border-samara-primary/20"
                                            />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* list produk */}
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                        <div className="px-8 py-5 border-b border-gray-100 bg-samara-primary/5">
                            <h2 className="text-lg font-extrabold text-samara-text">
                                Produk dari{" "}
                                <span dangerouslySetInnerHTML={{ __html: toko.nama }} />
                            </h2>
                            <p className="text-samara-text/60 text-sm mt-0.5">
                                {produk.length} produk tersedia
                            </p>
                        </div>

                        <div className="p-8">
                            {produk.length === 0 ? (
                                <div className="text-center py-12 text-samara-text/40">
                                    <p className="text-4xl mb-3">📦</p>
                                    <p className="font-semibold">Belum ada produk</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {produk.map(p => (
                                        <MiniProductCard
                                            key={p.id}
                                            product={p}
                                            kategoriLabel={toko.kategoriLabel}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* back */}
                    <div className="flex justify-center pt-4">
                        <Link href="/umkm">
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