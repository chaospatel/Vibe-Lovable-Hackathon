export default function LikeButton({ onClick, liked = false, count = 0 }) {
return (
<button onClick={onClick} className={`btn ${liked ? "bg-rose-600 text-white" : "btn-outline"}`}>
{count}
</button>
);

}
