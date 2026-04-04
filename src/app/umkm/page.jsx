import { Suspense } from 'react'
import UMKMPageClient from './UMKMPageClient'

export default function UMKMPage() {
  return (
    <Suspense fallback={<div className="pt-24 text-center text-sm text-gray-400">Memuat...</div>}>
      <UMKMPageClient />
    </Suspense>
  )
}