import { useSelector } from "react-redux";
import EmptyState from "../components/EmptyState.jsx";
import BlogGrid from "../components/BlogGrid.jsx";
export default function Profile() {
const { user } = useSelector((s) => s.auth);
// Ideally: fetch user's posts (submitted & published)
const submitted = user?.submitted || [];
const published = user?.published || [];
return (
<div className="container py-10 space-y-8">
<h2 className="text-2xl font-bold">Your Profile</h2>
<section>
<h3 className="text-xl font-semibold mb-3">Published</h3>
{published.length ? <BlogGrid items={published} /> : <EmptyState
title="No published posts" />}
</section>
<section>
<h3 className="text-xl font-semibold mb-3">Submitted (Pending)</h3>
{submitted.length ? <BlogGrid items={submitted} /> : <EmptyState
title="No submissions" subtitle="Write something awesome!" />}
</section>
</div>
);
}
