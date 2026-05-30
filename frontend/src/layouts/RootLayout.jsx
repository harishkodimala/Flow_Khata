import { Outlet } from "react-router-dom";
import Header from "../components/navigation/Header";
import Footer from "../components/navigation/Footer";

function RootLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50">

            {/* HEADER */}
            <Header />

            {/* MAIN CONTENT */}
            <main className="flex-1">
                <Outlet />
            </main>

            {/* FOOTER */}
            <Footer />
        </div>
    );
}

export default RootLayout;