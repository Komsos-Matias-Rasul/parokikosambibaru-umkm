export const SearchPagination = ({ currentPage, pageCount, onfilterChange }) => {
  let pageWindow = Math.floor((currentPage-1) / 5)
  let paginateView = Array(5).fill(null).map((_, i) => 5*pageWindow + i + 1)
  
  if (pageCount - 5*pageWindow < 5) {
    let arrLength = pageCount - 5*pageWindow
    if (pageCount - 5*pageWindow <= 0) {
      arrLength = 1
    }
    paginateView = Array(arrLength).fill(null).map((_, i) => 5*pageWindow + i + 1)
  }
  return (
    <div className="flex justify-end mb-6">
      <div className="flex items-center gap-1">
        <button 
          disabled={currentPage === 1}
          onClick={() => onfilterChange({page: 1})}
          className="px-2 py-1 disabled:opacity-30 hover:bg-gray-100 rounded"
        >
          &lt;&lt;
        </button>
        <button 
          disabled={currentPage === 1}
          onClick={() => onfilterChange({page: currentPage - 1})}
          className="px-2 py-1 disabled:opacity-30 hover:bg-gray-100 rounded"
        >
          &lt;
        </button>
        
        {paginateView.map((idx) => (
          <button
            key={idx}
            onClick={() => onfilterChange({page: idx})}
            className={`w-8 h-8 rounded text-xs transition-all ${
              currentPage === idx ? "bg-[#1e3a8a] text-white font-bold" : "hover:bg-gray-200"
            }`}
          >
            {idx}
          </button>
        ))}

        <button 
          disabled={currentPage === pageCount}
          onClick={() => onfilterChange({page: currentPage + 1})}
          className="px-2 py-1 disabled:opacity-30 hover:bg-gray-100 rounded"
        >
          &gt;
        </button>
        <button 
          disabled={currentPage === pageCount}
          onClick={() => onfilterChange({page: pageCount})}
          className="px-2 py-1 disabled:opacity-30 hover:bg-gray-100 rounded"
        >
          &gt;&gt;
        </button>
      </div>
    </div>
  )
}