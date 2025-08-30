import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBlog, likeBlog } from "../store/slices/blogsSlice.js";
import { MarkdownRender } from "../utils/markdown.js";
import LikeButton from "../components/LikeButton.jsx";
import CommentList from "../components/CommentList.jsx";
import CommentForm from "../components/CommentForm.jsx";
import Loading from "../components/Loading.jsx";

export default function BlogDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { current, status, error } = useSelector((s) => s.blogs);
  
  useEffect(() => { 
    dispatch(fetchBlog(id)); 
  }, [dispatch, id]);
  
  const postComment = (body) => {
    /* TODO: Implement comment posting */
    console.log("Posting comment:", body);
  };
  
  if (status === "loading") return <Loading />;
  if (status === "failed") return <div className="container py-10 text-center text-red-600">Error: {error}</div>;
  if (!current) return <div className="container py-10 text-center">Blog post not found</div>;
  
  return (
    <div className="container py-10 max-w-3xl">
      <img 
        src={current.coverUrl || `https://picsum.photos/seed/${current._id}/1200/600`} 
        alt="cover" 
        className="w-full h-64 object-cover rounded-2xl" 
      />
      <h1 className="text-3xl font-bold mt-6">{current.title}</h1>
      <div className="mt-2 text-gray-500 text-sm">
        By {current.author?.name || "Unknown"} · {new Date(current.publishedAt).toLocaleDateString()}
      </div>
      <div className="mt-6">
        <MarkdownRender source={current.content} />
      </div>
      <div className="mt-6 flex items-center gap-3">
        <LikeButton 
          onClick={() => dispatch(likeBlog(current._id))}
          count={current.likes || 0} 
        />
      </div>
      <section className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Comments</h3>
        <CommentForm onSubmit={postComment} />
        <div className="mt-4">
          <CommentList comments={current.comments || []} />
        </div>
      </section>
    </div>
  );
}
