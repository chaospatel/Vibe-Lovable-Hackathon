import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
export default function App() {
return (
<div className="min-h-screen flex flex-col">
<Navbar />
<main className="flex-1">
<AppRoutes />
</main>
<Footer />
<Toaster position="top-right" />
</div>
);
}
