import { useNavigate } from 'react-router-dom';
import { Building2, Palette, Clock, ClipboardList, ArrowRight } from 'lucide-react';

const stats = [
    { label: 'Total Temples', value: '1,248', change: '+12 this month', icon: <Building2 size={22} className="text-primary-light" />, colorClass: 'bg-primary-glow border-primary/30 text-primary-light' },
    { label: 'Total Artists', value: '3,571', change: '+47 this month', icon: <Palette size={22} className="text-accent-light" />, colorClass: 'bg-accent-glow border-accent/30 text-accent-light' },
    { label: 'Pending Approvals', value: '34', change: '8 urgent', icon: <Clock size={22} className="text-orange-400" />, colorClass: 'bg-orange-500/10 border-orange-500/30 text-orange-400' },
    { label: 'Recent Registrations', value: '89', change: 'Last 30 days', icon: <ClipboardList size={22} className="text-green-400" />, colorClass: 'bg-green-500/10 border-green-500/30 text-green-400' },
];

const recentTemples = [
    { id: 'TMP-2026-001', name: 'Sri Murugan Temple', district: 'Jaffna', status: 'Approved', date: '2026-06-20' },
    { id: 'TMP-2026-002', name: 'Koneswaram Temple', district: 'Trincomalee', status: 'Pending', date: '2026-06-22' },
    { id: 'TMP-2026-003', name: 'Nainativu Nagapooshani', district: 'Kilinochchi', status: 'Approved', date: '2026-06-23' },
    { id: 'TMP-2026-004', name: 'Sri Veeramakaliamman', district: 'Batticaloa', status: 'Review', date: '2026-06-24' },
];

const recentArtists = [
    { nic: '199845623412', name: 'Ravindran Suresh', category: 'Classical Dance', status: 'Approved', date: '2026-06-21' },
    { nic: '200012346789', name: 'Meenakshi Priya', category: 'Carnatic Music', status: 'Pending', date: '2026-06-23' },
    { nic: '197832156789', name: 'Ananthan Kumar', category: 'Tamil Literature', status: 'Approved', date: '2026-06-24' },
];

export default function Dashboard() {
    const navigate = useNavigate();
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
                    <button className="btn-secondary" onClick={() => navigate('/temple-register')}>
                        + Register Temple
                    </button>
                    <button className="btn-primary" onClick={() => navigate('/artist-register')}>
                        + Register Artist
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div
                        key={stat.label}
                        className="glass-card p-5 flex items-center gap-4 animate-fade-up cursor-default"
                        style={{ animationDelay: `${i * 0.08}s`, animationFillMode: 'both' }}
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-[22px] shrink-0 border ${stat.colorClass}`}>
                            {stat.icon}
                        </div>
                        <div className="flex flex-col gap-0.5 min-w-0">
                            <span className="text-2xl font-extrabold text-text-heading leading-none">{stat.value}</span>
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
                        <button className="btn-secondary px-3.5 py-1.5 text-xs" onClick={() => navigate('/temple-search')}>
                            View All
                        </button>
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
                                {recentTemples.map((t) => (
                                    <tr key={t.id} className="cursor-pointer transition-colors hover:bg-primary/5" onClick={() => navigate('/temple-search')}>
                                        <td className="p-2.5 whitespace-nowrap border-b border-black/5">
                                            <span className="font-mono text-[11px] bg-bg-3 border border-border rounded px-1.5 py-0.5 text-primary-light">{t.id}</span>
                                        </td>
                                        <td className="p-2.5 whitespace-nowrap border-b border-black/5 font-medium text-text-heading max-w-[160px] truncate">{t.name}</td>
                                        <td className="p-2.5 whitespace-nowrap border-b border-black/5">{t.district}</td>
                                        <td className="p-2.5 whitespace-nowrap border-b border-black/5"><StatusBadge status={t.status} /></td>
                                        <td className="p-2.5 whitespace-nowrap border-b border-black/5 text-xs text-text-muted">{t.date}</td>
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
                        <button className="btn-secondary px-3.5 py-1.5 text-xs" onClick={() => navigate('/artist-search')}>
                            View All
                        </button>
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
                                {recentArtists.map((a) => (
                                    <tr key={a.nic} className="cursor-pointer transition-colors hover:bg-primary/5" onClick={() => navigate('/artist-search')}>
                                        <td className="p-2.5 whitespace-nowrap border-b border-black/5">
                                            <span className="font-mono text-[10px] bg-bg-3 border border-border rounded px-1.5 py-0.5 text-primary-light">{a.nic}</span>
                                        </td>
                                        <td className="p-2.5 whitespace-nowrap border-b border-black/5 font-medium text-text-heading max-w-[160px] truncate">{a.name}</td>
                                        <td className="p-2.5 whitespace-nowrap border-b border-black/5">{a.category}</td>
                                        <td className="p-2.5 whitespace-nowrap border-b border-black/5"><StatusBadge status={a.status} /></td>
                                        <td className="p-2.5 whitespace-nowrap border-b border-black/5 text-xs text-text-muted">{a.date}</td>
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
