export default function Pagination({ page, total, perPage = 9, onChange }) {
const totalPages = Math.max(1, Math.ceil(total / perPage));
return (
<div className="flex justify-center gap-2 mt-6">
<button className="btn btn-outline" disabled={page <= 1} onClick={() =>
onChange(page - 1)}>Prev</button>
<span className="badge">Page {page} / {totalPages}</span>
<button className="btn btn-outline" disabled={page >= totalPages}
onClick={() => onChange(page + 1)}>Next</button>
</div>
);
}