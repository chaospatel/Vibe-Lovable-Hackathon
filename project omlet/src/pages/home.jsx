import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHome } from "../store/slices/blogsSlice.js";
import BlogGrid from "../components/BlogGrid.jsx";
import BlogCard from "../components/BlogCard.jsx"; // ✅ Add this import
import Loading from "../components/Loading.jsx";
import Pagination from "../components/Pagination.jsx";

export default function Home() {
  const dispatch = useDispatch();
  const { items, trending, total, status } = useSelector((s) => s.blogs);
  const [page, setPage] = useState(1);
  
  useEffect(() => { dispatch(fetchHome({ page })); }, [dispatch, page]);
  
  if (status === "loading") return <Loading />;
  
  return (
    <div className="container py-8 space-y-10">
      <section>
        <h2 className="text-2xl font-bold mb-4">Latest</h2>
        <BlogGrid items={items} />
        <Pagination page={page} total={total} onChange={setPage} />
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Trending</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trending.map((b) => <BlogCard key={b._id} blog={b} />)} {/* ✅ Fixed */}
        </div>
      </section>
    </div>
  );
}
