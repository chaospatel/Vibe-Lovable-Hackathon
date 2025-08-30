import { useState } from "react";
import { useDispatch } from "react-redux";
import { submitBlog } from "../store/slices/blogsSlice.js";
import MarkdownEditor from "../components/MarkdownEditor.jsx";
import toast from "react-hot-toast";
export default function SubmitBlog() {
const dispatch = useDispatch();
const [title, setTitle] = useState("");
const [content, setContent] = useState("");
const [excerpt, setExcerpt] = useState("");
const [coverUrl, setCoverUrl] = useState("");
const onSubmit = async (e) => {
e.preventDefault();
try {
await dispatch(submitBlog({ title, content, excerpt,
coverUrl })).unwrap();
toast.success("Submitted for approval");
setTitle(""); setContent(""); setExcerpt(""); setCoverUrl("");
} catch (err) {
toast.error("Failed to submit");
}
};
return (
<div className="container py-10 max-w-3xl space-y-4">
<h2 className="text-2xl font-bold">Write a blog</h2>
<input className="input" placeholder="Title" value={title} onChange={(e)=> setTitle(e.target.value)} />
<input className="input" placeholder="Short excerpt" value={excerpt}
onChange={(e) => setExcerpt(e.target.value)} />
<input className="input" placeholder="Cover image URL (optional)"
value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} />
<MarkdownEditor value={content} onChange={setContent} />
<button className="btn btn-primary" onClick={onSubmit}>Submit for
Approval</button>
</div>
);
}