import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchHome } from "../store/slices/blogsSlice.js";
import BlogGrid from "../components/BlogGrid.jsx";
function useQuery() { const { search } = useLocation(); return new
URLSearchParams(search); }
export default function Search() {
const q = useQuery().get("q") || "";
const dispatch = useDispatch();
const { items, total } = useSelector((s) => s.blogs);
useEffect(() => { dispatch(fetchHome({ q })); }, [dispatch, q]);
return (
<div className="container py-8">
<h2 className="text-2xl font-bold mb-4">Search results for "{q}"
({total})</h2>
<BlogGrid items={items} />
</div>
);
}
