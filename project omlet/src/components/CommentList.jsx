import { fmtDate } from "../utils/date.js";
export default function CommentList({ comments = [] }) {
import { fmtDate } from "../utils/date.js";

export default function CommentList({ comments = [] }) {
  if (!comments.length) return <p className="text-gray-500">No comments yet.</p>;
  
  return (
    <ul className="space-y-4">
      {comments.map((c) => (
        <li key={c._id} className="border-b pb-3">
          <p className="text-sm">
            <span className="font-semibold">{c.author?.name || "User"}</span> ·{" "}
            <span className="text-gray-500">
              {fmtDate(c.createdAt)}
            </span>
          </p>
          <p className="mt-1">{c.body}</p>
        </li>
      ))}
    </ul>
  );
}
return (
<ul className="space-y-4">
{comments.map((c) => (
<li key={c._id} className="border-b pb-3">
<p className="text-sm">
  <span className="font-semibold">{c.author?.name || "User"}</span> ·
  <span className="text-gray-500">
    {fmtDate(c.createdAt)}</span></p>
<p className="mt-1">{c.body}</p>
</li>
))}
</ul>
);
}


