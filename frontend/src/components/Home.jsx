import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="space-y-24 py-10">
            {/* HERO SECTION */}
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12">
                {/* Decorative background glows */}
                <div className="absolute -top-10 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>
                <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 pointer-events-none"></div>

                {/* Hero Left Content */}
                <div className="flex-1 max-w-2xl text-center lg:text-left space-y-6 z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-indigo-700 text-xs font-semibold uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                        Modern Ledger Solution
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-none">
                        Manage Your Ledger <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Digitally</span>
                    </h1>
                    <p className="text-lg text-gray-500 leading-relaxed">
                        Say goodbye to paper ledger books (Bahi Khata). Effortlessly record transactions, track credit, and send real-time transparency updates to customers with Digital Udhaar Khata.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                        <Link
                            to="/register"
                            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-100 hover:shadow-xl hover:shadow-indigo-200 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-150 text-center cursor-pointer"
                        >
                            Get Started Free
                        </Link>
                        <Link
                            to="/login"
                            className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border border-gray-200 hover:border-gray-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 text-center cursor-pointer"
                        >
                            Login to Account
                        </Link>
                    </div>
                </div>

                {/* Hero Right Content: Beautiful Ledger Dashboard Preview */}
                <div className="flex-1 w-full max-w-lg z-10">
                    <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                        {/* Mock Title Bar */}
                        <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                                <span className="w-3 h-3 rounded-full bg-green-400"></span>
                            </div>
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                                Live Dashboard Mockup
                            </span>
                            <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-green-50 rounded-full">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
                                <span className="text-[10px] font-bold text-green-700 uppercase">Synced</span>
                            </div>
                        </div>

                        {/* Mock Body */}
                        <div className="p-6 space-y-6">
                            {/* Summary Cards */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl">
                                    <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                                        You Will Get (Lene Hai)
                                    </p>
                                    <p className="text-xl font-extrabold text-emerald-600 mt-1">
                                        ₹18,240
                                    </p>
                                </div>
                                <div className="p-4 bg-rose-50/50 border border-rose-100 rounded-2xl">
                                    <p className="text-[11px] font-bold text-rose-700 uppercase tracking-wider">
                                        You Will Give (Dene Hai)
                                    </p>
                                    <p className="text-xl font-extrabold text-rose-600 mt-1">
                                        ₹3,450
                                    </p>
                                </div>
                            </div>

                            {/* Recent Ledger List */}
                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                    Recent Ledger Entries
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl hover:bg-gray-50 transition-colors duration-150">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm">
                                                RK
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800 text-sm">Ramesh Kumar</p>
                                                <p className="text-[11px] text-gray-400">Grocery Store Order</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-extrabold text-emerald-600">+ ₹1,200</span>
                                    </div>

                                    <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl hover:bg-gray-50 transition-colors duration-150">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center font-bold text-sm">
                                                SS
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800 text-sm">Suresh Singh</p>
                                                <p className="text-[11px] text-gray-400">Milk Delivery</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-extrabold text-rose-600">- ₹450</span>
                                    </div>

                                    <div className="flex items-center justify-between p-3.5 bg-gray-50/70 rounded-xl hover:bg-gray-50 transition-colors duration-150">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center font-bold text-sm">
                                                AV
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800 text-sm">Amit Verma</p>
                                                <p className="text-[11px] text-gray-400">Hardware Purchase</p>
                                            </div>
                                        </div>
                                        <span className="text-sm font-extrabold text-emerald-600">+ ₹2,500</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FEATURES SECTION */}
            <div className="space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-4">
                    <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                        Powering Smarter Credit Management
                    </h2>
                    <p className="text-gray-500">
                        Everything you need to digitalize and scale your traditional bookkeeping ledger.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Feature Card 1 */}
                    <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all duration-200 space-y-5">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">100% Free & Secure</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Access your business ledgers anytime from any device. Encrypted secure servers mean your records are always protected and never lost.
                        </p>
                    </div>

                    {/* Feature Card 2 */}
                    <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all duration-200 space-y-5">
                        <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89M9 11l3 3L22 4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Real-time Syncing</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Updates reflect instantly for both merchants and customers. Promote trust and transparency with automated shared digital ledger sheets.
                        </p>
                    </div>

                    {/* Feature Card 3 */}
                    <div className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all duration-200 space-y-5">
                        <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">PDF Transaction Reports</h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Export detailed ledger accounts, statements, and transaction histories into professional PDF files in one-click for quick reconciliation.
                        </p>
                    </div>
                </div>
            </div>

            {/* METRICS / STATS SECTION */}
            <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-purple-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"></div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center relative z-10">
                    <div className="space-y-2">
                        <p className="text-4xl sm:text-5xl font-extrabold tracking-tight text-indigo-200">10k+</p>
                        <p className="text-xs uppercase font-bold tracking-widest text-gray-300">Active Merchants</p>
                    </div>
                    <div className="space-y-2 border-y sm:border-y-0 sm:border-x border-white/10 py-6 sm:py-0">
                        <p className="text-4xl sm:text-5xl font-extrabold tracking-tight text-purple-200">₹50L+</p>
                        <p className="text-xs uppercase font-bold tracking-widest text-gray-300">Daily Volume Tracked</p>
                    </div>
                    <div className="space-y-2">
                        <p className="text-4xl sm:text-5xl font-extrabold tracking-tight text-pink-200">100%</p>
                        <p className="text-xs uppercase font-bold tracking-widest text-gray-300">Eco-Friendly Paperless</p>
                    </div>
                </div>
            </div>

            {/* CALL TO ACTION SECTION */}
            <div className="text-center max-w-3xl mx-auto space-y-6 py-8">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                    Ready to modernize your credit book ledger?
                </h2>
                <p className="text-gray-500 max-w-xl mx-auto">
                    Join thousands of smart shopkeepers who are using Digital Udhaar Khata to streamline customer credit operations.
                </p>
                <div className="pt-4">
                    <Link
                        to="/register"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-150 cursor-pointer"
                    >
                        Create Your Free Account
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;