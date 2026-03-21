import Image from "next/image"

const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
})

export const ProductCard = ({product}) => {
  return (
    <div
      className="bg-white rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative h-40 w-full overflow-hidden">
        <Image src={process.env.NEXT_PUBLIC_GCLOUD_PREFIX + product.img} alt="product" width={400} height={400} className="object-cover w-full h-full transform hover:scale-110 transition-transform duration-500" />
      </div>
      <div className="p-3">
        <p className="text-xs text-samara-secondary uppercase tracking-wider line-clamp-1">{product.category}</p>
        <h3 className="text-sm line-clamp-1">
          {product.name}
        </h3>
        <p className="text-lg font-bold text-samara-primary mb-2">{formatter.format(product.price)}</p>
        <p className="text-xs text-samara-text/50 uppercase tracking-wider line-clamp-1" dangerouslySetInnerHTML={{__html: product.storeName}}></p>
      </div>
    </div>
  )
}

export const ProductCardGhost = () => {
  return (
    <div
      className="bg-white rounded-xl overflow-hidden"
    >
      <div className="relative h-40 w-full overflow-hidden">
        <div className="size-full bg-slate-200 animate-pulse"></div>
      </div>
      <div className="p-3">
        <div className="w-2/3 h-3 bg-slate-200 animate-pulse mb-2 rounded-full"></div>
        <div className="w-full h-4 bg-slate-200 animate-pulse rounded-full"></div>
      </div>
    </div>
  )
}