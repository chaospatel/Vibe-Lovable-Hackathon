// This page would list published posts with actions: hide/delete
export default function ManagePosts() {
return (
<div className="container py-10">
<h2 className="text-2xl font-bold mb-4">Manage Published Posts</h2>
<p className="text-gray-600">Connect to /admin/blogs?status=published and
enable Hide/Delete buttons similar to PendingQueue.</p>
</div>
);
}