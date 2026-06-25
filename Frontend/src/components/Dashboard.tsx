import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Palette, Clock, ClipboardList, ArrowRight } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface StatsData {
    totalTemples: number;
    totalArtists: number;
    pendingApprovals: number;
    recentRegistrations: number;
}

interface RecentTemple {
    templeRegNo: string;
    templeName: string;
    district: string;
    status: string;
    createdAt: string;
}

interface RecentArtist {
    nic: string;
    englishName: string;
    category: string;
    status: string;
    registeredDate: string;
}

export default function Dashboard() {
    const navigate = useNavigate();

    const [stats, setStats] = useState<StatsData>({ totalTemples: 0, totalArtists: 0, pendingApprovals: 0, recentRegistrations: 0 });
    const [recentTemples, setRecentTemples] = useState<RecentTemple[]>([]);
    const [recentArtists, setRecentArtists] = useState<RecentArtist[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch(`${API_URL}/api/dashboard/stats`).then(r => r.json()),
            fetch(`${API_URL}/api/dashboard/recent`).then(r => r.json()),
        ]).then(([statsRes, recentRes]) => {
            if (statsRes.success) setStats(statsRes.data);
            if (recentRes.success) {
                setRecentTemples(recentRes.data.recentTemples || []);
                setRecentArtists(recentRes.data.recentArtists || []);
            }
        }).catch(() => {
            // API offline — keep zero defaults (frontend works standalone)
        }).finally(() => setLoading(false));
    }, []);

    const statCards = [
        { label: 'Total Temples', value: stats.totalTemples.toLocaleString(), change: 'Registered', icon: <Building2 size={22} className="text-primary-light" />, colorClass: 'bg-primary-glow border-primary/30 text-primary-light' },
        { label: 'Total Artists', value: stats.totalArtists.toLocaleString(), change: 'Registered', icon: <Palette size={22} className="text-accent-light" />, colorClass: 'bg-accent-glow border-accent/30 text-accent-light' },
        { label: 'Pending Approvals', value: stats.pendingApprovals.toLocaleString(), change: 'Awaiting review', icon: <Clock size={22} className="text-orange-400" />, colorClass: 'bg-orange-500/10 border-orange-500/30 text-orange-400' },
        { label: 'Recent Registrations', value: stats.recentRegistrations.toLocaleString(), change: 'Last 30 days', icon: <ClipboardList size={22} className="text-green-400" />, colorClass: 'bg-green-500/10 border-green-500/30 text-green-400' },
    ];

    return (
        <div className="p-5 md:p-8 flex flex-col gap-7 max-w-6xl w-full">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 animate-fade-up">
                <div>
                    <h1 className="text-2xl md:text-[26px] font-extrabold bg-gradient-to-br from-text-heading to-slate-100/70 bg-clip-text text-transparent mb-1">
                        Dashboard Overview
                    </h1>
                    <p className="text-[13px] text-text-muted">Department of Hindu Religious &amp; Cultural Affairs — Sri Lanka</p>
                </div>
                <div className="flex flex-col md:flex-row gap-2.5">
                    <button className="btn-secondary" onClick={() => navigate('/temple-register')}>+ Register Temple</button>
                    <button className="btn-primary" onClick={() => navigate('/artist-register')}>+ Register Artist</button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, i) => (
                    <div key={stat.label} className="glass-card p-5 flex items-center gap-4 animate-fade-up cursor-default" style={{ animationDelay: `${i * 0.08}s`, animationFillMode: 'both' }}>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-[22px] shrink-0 border ${stat.colorClass}`}>{stat.icon}</div>
                        <div className="flex flex-col gap-0.5 min-w-0">
                            {loading
                                ? <div className="h-7 w-14 bg-gradient-to-r from-bg-3 via-black/5 to-bg-3 animate-pulse rounded mb-1" />
                                : <span className="text-2xl font-extrabold text-text-heading leading-none">{stat.value}</span>}
                            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">{stat.label}</span>
                            <span className="text-[11px] text-green-400 mt-0.5">{stat.change}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Recent Temples */}
                <div className="glass-card p-6 overflow-hidden animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                    <div className="flex items-start justify-between mb-5 gap-3">
                        <div>
                            <h3 className="text-[15px] font-bold text-text-heading mb-0.5">Recent Temple Registrations</h3>
                            <p className="text-xs text-text-muted">Latest temple applications</p>
                        </div>
                        <button className="btn-secondary px-3.5 py-1.5 text-xs" onClick={() => navigate('/temple-search')}>View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-[13px]">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="p-2 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider whitespace-nowrap">Register ID</th>
                                    <th className="p-2 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider whitespace-nowrap">Temple Name</th>
                                    <th className="p-2 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider whitespace-nowrap">District</th>
                                    <th className="p-2 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider whitespace-nowrap">Status</th>
                                    <th className="p-2 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider whitespace-nowrap">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentTemples.length === 0 && !loading && (
                                    <tr><td colSpan={5} className="p-4 text-center text-xs text-text-muted">No records yet</td></tr>
                                )}
                                {recentTemples.map((t) => (
                                    <tr key={t.templeRegNo} className="cursor-pointer transition-colors hover:bg-primary/5" onClick={() => navigate('/temple-search')}>
                                        <td className="p-2.5 whitespace-nowrap border-b border-black/5">
                                            <span className="font-mono text-[11px] bg-bg-3 border border-border rounded px-1.5 py-0.5 text-primary-light">{t.templeRegNo}</span>
                                        </td>
                                        <td className="p-2.5 whitespace-nowrap border-b border-black/5 font-medium text-text-heading max-w-[160px] truncate">{t.templeName}</td>
                                        <td className="p-2.5 whitespace-nowrap border-b border-black/5">{t.district}</td>
                                        <td className="p-2.5 whitespace-nowrap border-b border-black/5"><StatusBadge status={t.status} /></td>
                                        <td className="p-2.5 whitespace-nowrap border-b border-black/5 text-xs text-text-muted">{new Date(t.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Artists */}
                <div className="glass-card p-6 overflow-hidden animate-fade-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                    <div className="flex items-start justify-between mb-5 gap-3">
                        <div>
                            <h3 className="text-[15px] font-bold text-text-heading mb-0.5">Recent Artist Registrations</h3>
                            <p className="text-xs text-text-muted">Latest artist applications</p>
                        </div>
                        <button className="btn-secondary px-3.5 py-1.5 text-xs" onClick={() => navigate('/artist-search')}>View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse text-[13px]">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="p-2 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider whitespace-nowrap">NIC</th>
                                    <th className="p-2 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider whitespace-nowrap">Name</th>
                                    <th className="p-2 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider whitespace-nowrap">Category</th>
                                    <th className="p-2 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider whitespace-nowrap">Status</th>
                                    <th className="p-2 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider whitespace-nowrap">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentArtists.length === 0 && !loading && (
                                    <tr><td colSpan={5} className="p-4 text-center text-xs text-text-muted">No records yet</td></tr>
                                )}
                                {recentArtists.map((a) => (
                                    <tr key={a.nic} className="cursor-pointer transition-colors hover:bg-primary/5" onClick={() => navigate('/artist-search')}>
                                        <td className="p-2.5 whitespace-nowrap border-b border-black/5">
                                            <span className="font-mono text-[10px] bg-bg-3 border border-border rounded px-1.5 py-0.5 text-primary-light">{a.nic}</span>
                                        </td>
                                        <td className="p-2.5 whitespace-nowrap border-b border-black/5 font-medium text-text-heading max-w-[160px] truncate">{a.englishName}</td>
                                        <td className="p-2.5 whitespace-nowrap border-b border-black/5">{a.category}</td>
                                        <td className="p-2.5 whitespace-nowrap border-b border-black/5"><StatusBadge status={a.status} /></td>
                                        <td className="p-2.5 whitespace-nowrap border-b border-black/5 text-xs text-text-muted">{new Date(a.registeredDate).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Quick Search Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                <div className="glass-card p-5 md:p-6 flex items-center gap-4 cursor-pointer group" onClick={() => navigate('/temple-search')}>
                    <span className="shrink-0 text-primary bg-primary/10 p-3 rounded-xl"><Building2 size={24} /></span>
                    <div>
                        <p className="text-sm font-bold text-text-heading mb-0.5">Temple Search</p>
                        <p className="text-xs text-text-muted">Search by Register ID (e.g. TMP-2026-001)</p>
                    </div>
                    <span className="ml-auto text-text-muted transition-transform group-hover:text-primary-light group-hover:translate-x-1"><ArrowRight size={18} /></span>
                </div>
                <div className="glass-card p-5 md:p-6 flex items-center gap-4 cursor-pointer group" onClick={() => navigate('/artist-search')}>
                    <span className="shrink-0 text-accent-light bg-accent/10 p-3 rounded-xl"><Palette size={24} /></span>
                    <div>
                        <p className="text-sm font-bold text-text-heading mb-0.5">Artist Search</p>
                        <p className="text-xs text-text-muted">Search by NIC Number (e.g. 200312345678)</p>
                    </div>
                    <span className="ml-auto text-text-muted transition-transform group-hover:text-primary-light group-hover:translate-x-1"><ArrowRight size={18} /></span>
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const isApproved = status === 'Approved';
    const isPending = status === 'Pending';
    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border ${isApproved ? 'bg-green-500/10 text-green-400 border-green-500/25' :
            isPending ? 'bg-accent-glow text-accent-light border-accent/30' :
                'bg-primary-glow text-primary-light border-primary/30'
            }`}>
            {status}
        </span>
    );
}
