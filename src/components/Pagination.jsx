// --- Sub-component: Pagination ---
export const Pagination = ({ current, total, onChange }) => {
  return (
    <div className="flex items-center gap-1">
      <button 
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
        className="px-2 py-1 disabled:opacity-30 hover:bg-gray-100 rounded"
      >
        &lt;
      </button>
      
      {Array.from({ length: total }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => onChange(page)}
          className={`w-8 h-8 rounded text-xs transition-all ${
            current === page ? "bg-[#1e3a8a] text-white font-bold" : "hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}

      <button 
        disabled={current === total}
        onClick={() => onChange(current + 1)}
        className="px-2 py-1 disabled:opacity-30 hover:bg-gray-100 rounded"
      >
        &gt;
      </button>
    </div>
  );
};