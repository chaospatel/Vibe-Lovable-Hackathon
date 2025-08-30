import { useState } from "react";
export default function CommentForm({ onSubmit, loading }) {
const [body, setBody] = useState("");
return (
<form onSubmit={(e) => { e.preventDefault(); onSubmit?.(body);
setBody(""); }} className="flex gap-2">
<input className="input" placeholder="Write a comment..." value={body}
onChange={(e) => setBody(e.target.value)} />
<button className="btn btn-primary" disabled={loading}>Post</button>
</form>
);
}
