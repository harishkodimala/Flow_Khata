import { Link } from "react-router-dom";
import {
    FiTrendingUp,
    FiShield,
    FiUsers,
    FiSmartphone,
    FiClock,
    FiBarChart2,
    FiCheckCircle
} from "react-icons/fi";

function Home() {
    return (
        <div className="bg-slate-50 text-slate-900">
            <section className="relative overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-emerald-600 text-white py-24 sm:py-32">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_left,rgba(34,197,94,0.45),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.35),transparent_30%)]" />
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <div className="max-w-2xl">
                            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-200 shadow-sm shadow-black/10">
                                Digital ledger for local businesses
                            </p>
                            <h1 className="mt-8 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                                Smarter udhaar management for shopkeepers and customers.
                            </h1>
                            <p className="mt-6 max-w-xl text-lg leading-8 text-emerald-100/95">
                                KhataFlow helps you track credit, record payments, and view business health in one beautifully simple dashboard.
                            </p>
                            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                                <Link to="/register" className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-slate-950 shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-slate-100">
                                    Get Started
                                </Link>
                                <Link to="/features" className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/20">
                                    Explore Features
                                </Link>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="pointer-events-none absolute inset-0 rounded-4xl bg-white/5 blur-3xl" />
                            <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-slate-950/80 p-8 shadow-2xl shadow-slate-950/30">
                                <div className="flex flex-col gap-6">
                                    <div className="rounded-3xl border border-slate-800/70 bg-slate-900/95 p-6 shadow-xl shadow-slate-950/30">
                                        <div className="flex items-center justify-between text-slate-300">
                                            <span className="text-sm uppercase tracking-[0.24em]">Today</span>
                                            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200">Live</span>
                                        </div>
                                        <div className="mt-6 flex items-end gap-4">
                                            <div>
                                                <p className="text-4xl font-extrabold text-white">₹12.4K</p>
                                                <p className="text-sm text-slate-400">Credit collected</p>
                                            </div>
                                            <div className="rounded-3xl bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-200">
                                                +18% this week
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="rounded-3xl border border-slate-800/70 bg-slate-900/95 p-5 shadow-xl shadow-slate-950/20">
                                            <p className="text-sm text-slate-400">Customers</p>
                                            <p className="mt-3 text-2xl font-semibold text-white">186</p>
                                        </div>
                                        <div className="rounded-3xl border border-slate-800/70 bg-slate-900/95 p-5 shadow-xl shadow-slate-950/20">
                                            <p className="text-sm text-slate-400">Pending dues</p>
                                            <p className="mt-3 text-2xl font-semibold text-white">34</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid gap-12 lg:grid-cols-3">
                    <div className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-lg shadow-slate-900/5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-sm shadow-emerald-200/25">
                            <FiSmartphone className="text-xl" />
                        </div>
                        <h2 className="mt-6 text-xl font-semibold text-slate-900">Effortless tracking</h2>
                        <p className="mt-4 text-sm leading-7 text-slate-600">
                            Record udhaar, approvals, and clear balances fast so every customer stays updated and every payment is logged.
                        </p>
                    </div>
                    <div className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-lg shadow-slate-900/5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-sm shadow-emerald-200/25">
                            <FiBarChart2 className="text-xl" />
                        </div>
                        <h2 className="mt-6 text-xl font-semibold text-slate-900">Actionable insights</h2>
                        <p className="mt-4 text-sm leading-7 text-slate-600">
                            See customer balances, overdue amounts, and business health in one place so you can grow with confidence.
                        </p>
                    </div>
                    <div className="rounded-3xl border border-slate-200/70 bg-white p-8 shadow-lg shadow-slate-900/5">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-sm shadow-emerald-200/25">
                            <FiShield className="text-xl" />
                        </div>
                        <h2 className="mt-6 text-xl font-semibold text-slate-900">Trusted records</h2>
                        <p className="mt-4 text-sm leading-7 text-slate-600">
                            Keep transactions secure and auditable with a reliable ledger built for real small business workflows.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                        <div>
                            <span className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">Why KhataFlow</span>
                            <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                Designed for shopkeepers and customers who want clear, reliable credit management.
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-slate-600">
                                Simplify ledger maintenance with a modern dashboard, fast transaction records, and customer-friendly statements you can trust.
                            </p>
                            <div className="mt-10 space-y-4">
                                {[
                                    "Manage customer balances without manual ledgers.",
                                    "Get payment reminders and status at a glance.",
                                    "Use simple role-based views for shopkeepers and customers."
                                ].map((item) => (
                                    <div key={item} className="flex items-start gap-3 text-slate-700">
                                        <span className="mt-1 text-emerald-600"><FiCheckCircle /></span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-5 rounded-4xl border border-slate-200 bg-slate-50 p-10 shadow-lg shadow-slate-900/5">
                            {[
                                {
                                    title: "Shopkeeper dashboard",
                                    description: "Find customer ledgers, payment status, and recent transactions in one clean view.",
                                    icon: FiTrendingUp
                                },
                                {
                                    title: "Customer account",
                                    description: "Customers can view their balance, payment history, and contact info instantly.",
                                    icon: FiUsers
                                },
                                {
                                    title: "Real-time updates",
                                    description: "Update transactions and balances instantly, with clear history for every entry.",
                                    icon: FiClock
                                }
                            ].map((card) => (
                                <div key={card.title} className="flex gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                                        <card.icon className="text-xl" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900">{card.title}</p>
                                        <p className="mt-2 text-sm text-slate-600">{card.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid gap-12 lg:grid-cols-3">
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Simple setup</p>
                        <h3 className="mt-4 text-2xl font-semibold text-slate-900">Start in minutes</h3>
                        <p className="mt-4 text-sm leading-7 text-slate-600">Create your account, add customers, and begin tracking credit without complicated onboarding.</p>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Built for business</p>
                        <h3 className="mt-4 text-2xl font-semibold text-slate-900">Scalable ledger view</h3>
                        <p className="mt-4 text-sm leading-7 text-slate-600">Handle growing customer lists, track outstanding dues, and keep every transaction logged and searchable.</p>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5">
                        <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Trusted design</p>
                        <h3 className="mt-4 text-2xl font-semibold text-slate-900">Clear financial clarity</h3>
                        <p className="mt-4 text-sm leading-7 text-slate-600">Avoid manual errors and maintain trust with customers using a polished, modern ledger experience.</p>
                    </div>
                </div>
            </section>

            <section className="bg-slate-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <div>
                            <span className="inline-flex rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">
                                Ready to simplify udhaar?
                            </span>
                            <h2 className="mt-6 text-4xl font-bold tracking-tight">Get the most reliable ledger platform for your local business.</h2>
                            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Join shopkeepers and customers who rely on KhataFlow to keep credit clear, payments fast, and customer trust strong.</p>
                            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                <Link to="/register" className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-emerald-500/25 hover:bg-emerald-400 transition">
                                    Start free
                                </Link>
                                <Link to="/contact" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/20">
                                    Contact sales
                                </Link>
                            </div>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2">
                            {[
                                { label: "Shopkeepers onboarded", value: "1.2K+" },
                                { label: "Transactions tracked", value: "24K+" },
                                { label: "Customer balances", value: "9.8K" },
                                { label: "Daily active users", value: "4.5K" }
                            ].map((item) => (
                                <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/10 backdrop-blur-sm">
                                    <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
                                    <p className="mt-4 text-3xl font-semibold text-white">{item.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;