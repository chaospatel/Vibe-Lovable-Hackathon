import { Link } from "react-router-dom";
import { fmtDate } from "../utils/date.js";

export default function BlogCard({ blog }) {
  return (
    <article className="card flex flex-col gap-3 h-full">
      <Link to={`/blog/${blog._id}`} className="block">
        <img 
          src={blog.coverUrl || `https://picsum.photos/seed/${blog._id}/800/450`} 
          alt="cover" 
          className="h-48 w-full object-cover rounded-xl"
        />
      </Link>
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-1 line-clamp-2">
          <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">{blog.excerpt}</p>
      </div>
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{fmtDate(blog.publishedAt)}</span>
        <span>❤️ {blog.likes || 0} • 💬 {blog.commentsCount || 0}</span>
      </div>
    </article>
  );
}
