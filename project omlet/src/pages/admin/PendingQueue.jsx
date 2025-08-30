import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { approveBlog, fetchPending, rejectBlog } from "../../store/slices/adminSlice.js";

export default function PendingQueue() {
  const dispatch = useDispatch();
  const { pending, status, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchPending());
  }, [dispatch]);

  // Handle loading state
  if (status === "loading") {
    return (
      <div className="container py-10">
        <div className="text-center">Loading pending submissions...</div>
      </div>
    );
  }

  // Handle error state
  if (status === "failed" && error) {
    return (
      <div className="container py-10">
        <div className="text-red-600 text-center">
          Error loading pending submissions: {error}
        </div>
      </div>
    );
  }

  // Handle empty state
  if (!pending || pending.length === 0) {
    return (
      <div className="container py-10 space-y-4">
        <h2 className="text-2xl font-bold">Pending Submissions</h2>
        <div className="text-gray-600 text-center py-8">
          No pending submissions to review.
        </div>
      </div>
    );
  }

  const handleApprove = (id) => {
    try {
      dispatch(approveBlog(id));
    } catch (error) {
      console.error("Error approving blog:", error);
    }
  };

  const handleReject = (id, reason = "Low quality") => {
    try {
      dispatch(rejectBlog({ id, reason }));
    } catch (error) {
      console.error("Error rejecting blog:", error);
    }
  };

  return (
    <div className="container py-10 space-y-4">
      <h2 className="text-2xl font-bold">Pending Submissions</h2>
      <div className="text-sm text-gray-600 mb-4">
        {pending.length} submission{pending.length !== 1 ? 's' : ''} pending review
      </div>
      
      <ul className="space-y-4">
        {pending.map((post) => (
          <li key={post._id} className="card p-4 border rounded-lg shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">
                  {post.title || "Untitled"}
                </h3>
                <p className="text-gray-600 line-clamp-2 mb-2">
                  {post.excerpt || "No excerpt available"}
                </p>
                {post.author && (
                  <p className="text-sm text-gray-500">
                    By: {post.author}
                  </p>
                )}
                {post.createdAt && (
                  <p className="text-xs text-gray-400">
                    Submitted: {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
              
              <div className="flex gap-2 flex-shrink-0">
                <button
                  className="btn btn-outline px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 rounded"
                  onClick={() => handleReject(post._id, "Low quality")}
                  disabled={status === "loading"}
                >
                  Reject
                </button>
                <button
                  className="btn btn-primary px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded"
                  onClick={() => handleApprove(post._id)}
                  disabled={status === "loading"}
                >
                  Approve
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}