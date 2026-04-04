
import {Suspense} from 'react';



import SearchPageClient from './SearchPageClient'


export default function SearchPage() {
  return (
    <Suspense fallback={<div className="pt-24 text-center text-sm text-gray-400">Memuat...</div>}>
      <SearchPageClient />
    </Suspense>
  )
}