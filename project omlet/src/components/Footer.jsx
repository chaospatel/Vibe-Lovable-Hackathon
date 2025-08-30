export default function Footer() {
return (
<footer className="border-t mt-10">
<div className="container py-6 text-sm text-gray-600 flex flex-col
md:flex-row items-center justify-between gap-3">
<p>© {new Date().getFullYear()} Devnovate. All rights reserved.</p>
<p className="opacity-80">Built with MERN • Secure JWT • Admin
moderation</p>
</div>
</footer>
);
}
