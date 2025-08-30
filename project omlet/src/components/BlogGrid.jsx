import BlogCard from "./BlogCard.jsx";
export default function BlogGrid({ items = [] }) {
if (!items.length) return <p className="text-center text-gray-500">No blogs
yet.</p>;
return (
<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
{items.map((b) => <BlogCard key={b._id} blog={b} />)}
</div>
);
}