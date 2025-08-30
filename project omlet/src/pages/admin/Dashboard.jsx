import { Link } from "react-router-dom";
export default function Dashboard() {
return (
<div className="container py-10 space-y-6">
<h2 className="text-2xl font-bold">Admin Dashboard</h2>
<div className="grid md:grid-cols-3 gap-4">
<Link to="/admin/pending" className="card">Review Pending Submissions
→</Link>
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="container py-10 space-y-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <Link to="/admin/pending" className="card">
          Review Pending Submissions →
        </Link>
        <Link to="/admin/manage" className="card">
          Manage Published Posts →
        </Link>
        <div className="card">
          <p className="font-semibold mb-2">Analytics (MVP stub)</p>
          <p className="text-gray-600 text-sm">
            Plug views/likes/comments charts here later.
          </p>
        </div>
      </div>
    </div>
  );
}
<div className="card">
<p className="font-semibold mb-2">Analytics (MVP stub)</p>
<p className="text-gray-600 text-sm">Plug views/likes/comments charts
here later.</p>
</div>
</div>
</div>
);
}   
