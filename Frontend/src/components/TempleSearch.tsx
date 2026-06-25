import { useState } from 'react';
import { Building2, Search, MapPin, Map, Phone, User, Users, Landmark, History, Flame, HeartHandshake, FileText, File, ArrowLeft } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface TempleProfile {
    id: number;
    templeRegNo: string;
    templeName: string;
    tamilName: string | null;
    address: string;
    district: string;
    dsDivision: string;
    gnDivision: string;
    phone: string | null;
    email: string | null;
    website: string | null;
    bankName: string | null;
    bankBranch: string | null;
    accountName: string | null;
    accountNo: string | null;
    history: string | null;
    festivals: string | null;       // comma-separated from backend
    idols: string | null;           // comma-separated from backend
    socialActivities: string | null; // comma-separated from backend
    status: string;
    createdAt: string;
    committee: { presidentName: string; secretaryName: string } | null;
    documents: { id: number; documentType: string; fileUrl: string | null; status: string }[];
}

// Helper: split comma-separated string into array safely
function toArray(val: string | null | undefined): string[] {
    if (!val) return [];
    return val.split(',').map(s => s.trim()).filter(Boolean);
}

export default function TempleSearch() {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<TempleProfile | null>(null);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const handleSearch = async () => {
        if (!query.trim()) return;
        setLoading(true); setNotFound(false); setResult(null); setShowProfile(false);
        try {
            const res = await fetch(`${API_URL}/api/temples/${query.trim().toUpperCase()}`);
            const json = await res.json();
            if (res.ok && json.success) {
                setResult(json.data);
            } else {
                setNotFound(true);
            }
        } catch {
            setNotFound(true);
        } finally {
            setLoading(false);
        }
    };

    const handleKey = (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleSearch(); };

    return (
        <div className="p-5 md:p-8 flex flex-col gap-6 max-w-4xl w-full">
            <div className="animate-fade-up">
                <h1 className="text-2xl md:text-[26px] font-extrabold bg-gradient-to-br from-text-heading to-slate-100/70 bg-clip-text text-transparent mb-1 flex items-center gap-2">
                    <Building2 className="text-primary" size={28} /> Temple Search
                </h1>
                <p className="text-[13px] text-text-muted">Search registered temples by Temple Register ID</p>
            </div>

            <div className="glass-card p-6 flex flex-col gap-4 animate-fade-up">
                <div className="flex flex-col gap-2.5">
                    <label className="text-[13px] font-bold text-text-muted uppercase tracking-wider">Temple Register ID</label>
                    <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                        <div className="flex-1 relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"><Search size={18} /></span>
                            <input
                                className="w-full h-12 md:h-[52px] pl-11 pr-4 bg-bg-3 border border-border rounded-xl text-text-heading text-[15px] font-medium tracking-wide outline-none transition-all placeholder-text-muted/70 focus:border-primary focus:bg-bg-2 focus:ring-4 focus:ring-primary-glow"
                                type="text" placeholder="e.g. TMP-2026-001" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKey}
                            />
                        </div>
                        <button className="btn-primary h-12 md:h-[52px] px-7 shrink-0" onClick={handleSearch} disabled={loading}>
                            {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" /> : 'Search'}
                        </button>
                    </div>
                    <p className="text-xs text-text-muted">Enter the Temple Register ID in format: TMP-YYYY-NNN</p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-text-muted">Try:</span>
                    {['TMP-2026-001', 'TMP-2026-002'].map((id) => (
                        <button key={id} className="px-3 py-1 bg-bg-3 border border-border rounded-full text-xs font-mono text-primary-light cursor-pointer transition-colors hover:border-primary hover:bg-primary-glow" onClick={() => setQuery(id)}>
                            {id}
                        </button>
                    ))}
                </div>
            </div>

            {loading && (
                <div className="glass-card p-7 animate-fade-in">
                    <div className="h-5.5 w-2/5 bg-gradient-to-r from-bg-3 via-black/5 to-bg-3 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded mb-3" />
                    <div className="h-3.5 w-3/5 bg-gradient-to-r from-bg-3 via-black/5 to-bg-3 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded mb-2" />
                    <div className="h-3.5 w-[45%] bg-gradient-to-r from-bg-3 via-black/5 to-bg-3 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] rounded" />
                </div>
            )}

            {notFound && !loading && (
                <div className="glass-card p-12 text-center flex flex-col items-center gap-3 animate-fade-in">
                    <Search size={48} className="text-text-muted opacity-50" />
                    <h3 className="text-lg text-text-heading font-bold">No Temple Found</h3>
                    <p className="text-sm text-text-muted">No temple registered with ID <strong className="text-text">{query}</strong>. Please check the ID and try again.</p>
                </div>
            )}

            {result && !loading && !showProfile && (
                <div className="glass-card p-6 md:p-8 flex flex-col gap-5 animate-fade-up">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 bg-bg-3 border border-border rounded-lg px-3 py-1.5 text-[13px] font-mono text-text-muted">
                            <Building2 size={16} className="text-text-muted" />
                            <span>{result.templeRegNo}</span>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border ${result.status === 'Approved' ? 'bg-green-500/10 text-green-400 border-green-500/25' : 'bg-accent-glow text-accent-light border-accent/30'}`}>
                            {result.status}
                        </span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-extrabold text-text-heading">{result.templeName}</h2>
                        <p className="text-base text-text-muted leading-tight mt-1" style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}>{result.tamilName}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <ResultField label={<><MapPin size={12} className="inline mr-1 mb-0.5" /> Address</>} value={result.address} />
                        <ResultField label={<><Map size={12} className="inline mr-1 mb-0.5" /> District</>} value={result.district} />
                        <ResultField label={<><Landmark size={12} className="inline mr-1 mb-0.5" /> DS Division</>} value={result.dsDivision} />
                        <ResultField label={<><Phone size={12} className="inline mr-1 mb-0.5" /> Phone</>} value={result.phone ?? '—'} />
                        <ResultField label={<><User size={12} className="inline mr-1 mb-0.5" /> President</>} value={result.committee?.presidentName ?? '—'} />
                        <ResultField label={<><User size={12} className="inline mr-1 mb-0.5" /> Secretary</>} value={result.committee?.secretaryName ?? '—'} />
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                        <button className="btn-primary" onClick={() => setShowProfile(true)}>View Full Profile →</button>
                        <button className="btn-secondary" onClick={() => { setResult(null); setQuery(''); }}>New Search</button>
                    </div>
                </div>
            )}

            {showProfile && result && (
                <TempleFullProfile temple={result} onBack={() => setShowProfile(false)} />
            )}
        </div>
    );
}

function ResultField({ label, value }: { label: React.ReactNode; value: string }) {
    return (
        <div className="flex flex-col gap-1 p-3 px-4 bg-bg-3 rounded-lg border border-border">
            <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">{label}</span>
            <span className="text-sm text-text-heading font-medium">{value}</span>
        </div>
    );
}

function TempleFullProfile({ temple, onBack }: { temple: TempleProfile; onBack: () => void }) {
    return (
        <div className="flex flex-col gap-4 animate-fade-up">
            <div className="flex items-center justify-between">
                <button className="btn-secondary" onClick={onBack}><ArrowLeft size={16} /> Back to Results</button>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border ${temple.status === 'Approved' ? 'bg-green-500/10 text-green-400 border-green-500/25' : 'bg-accent-glow text-accent-light border-accent/30'}`}>{temple.status}</span>
            </div>

            <div className="glass-card p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
                <div className="w-[72px] h-[72px] rounded-2xl bg-primary-glow border border-primary/30 flex items-center justify-center text-primary shrink-0"><Building2 size={32} strokeWidth={1.5} /></div>
                <div>
                    <h2 className="text-[22px] font-extrabold text-text-heading mb-1">{temple.templeName}</h2>
                    <p className="text-[15px] text-text-muted mb-1" style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}>{temple.tamilName}</p>
                    <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap text-xs text-text-muted mt-1.5">
                        <span>{temple.templeRegNo}</span><span>•</span><span>{temple.district}</span><span>•</span><span>Registered: {new Date(temple.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProfileSection title={<><FileText size={16} className="inline mr-1.5 mb-0.5" /> Temple Details</>}>
                    <div className="grid grid-cols-1 gap-2.5"><InfoRow label="Address" value={temple.address} /><InfoRow label="District" value={temple.district} /><InfoRow label="DS Division" value={temple.dsDivision} /><InfoRow label="GN Division" value={temple.gnDivision} /><InfoRow label="Telephone" value={temple.phone ?? '—'} /><InfoRow label="Email" value={temple.email ?? '—'} /><InfoRow label="Website" value={temple.website ?? '—'} /></div>
                </ProfileSection>

                <ProfileSection title={<><Users size={16} className="inline mr-1.5 mb-0.5" /> Administration</>}>
                    <div className="grid grid-cols-1 gap-2.5"><InfoRow label="President" value={temple.committee?.presidentName ?? '—'} /><InfoRow label="Secretary" value={temple.committee?.secretaryName ?? '—'} /></div>
                </ProfileSection>

                <ProfileSection title={<><Landmark size={16} className="inline mr-1.5 mb-0.5" /> Bank Details</>}>
                    <div className="grid grid-cols-1 gap-2.5"><InfoRow label="Bank Name" value={temple.bankName ?? '—'} /><InfoRow label="Branch" value={temple.bankBranch ?? '—'} /><InfoRow label="Account Name" value={temple.accountName ?? '—'} /><InfoRow label="Account No" value={temple.accountNo ?? '—'} /></div>
                </ProfileSection>

                <ProfileSection title={<><History size={16} className="inline mr-1.5 mb-0.5" /> Temple History</>} wide>
                    <p className="text-[13px] text-text leading-relaxed">{temple.history}</p>
                </ProfileSection>

                <ProfileSection title={<><Flame size={16} className="inline mr-1.5 mb-0.5" /> Festivals & Poojas</>} wide>
                    <div className="flex flex-wrap gap-2">
                        {toArray(temple.festivals).map((f) => <span key={f} className="text-xs px-2.5 py-1 bg-primary-glow text-primary-light border border-primary/30 rounded-full">{f}</span>)}
                    </div>
                </ProfileSection>

                <ProfileSection title={<><User size={16} className="inline mr-1.5 mb-0.5" /> Temple Idols</>} wide>
                    <div className="flex flex-wrap gap-2">
                        {toArray(temple.idols).map((i) => <span key={i} className="text-xs px-2.5 py-1 bg-accent-glow text-accent-light border border-accent/30 rounded-full">{i}</span>)}
                    </div>
                </ProfileSection>

                <ProfileSection title={<><HeartHandshake size={16} className="inline mr-1.5 mb-0.5" /> Social Activities</>} wide>
                    <ul className="pl-4 flex flex-col gap-1.5 list-disc text-[13px] text-text">
                        {toArray(temple.socialActivities).map((a) => <li key={a}>{a}</li>)}
                    </ul>
                </ProfileSection>

                <ProfileSection title={<><File size={16} className="inline mr-1.5 mb-0.5" /> Documents</>} wide>
                    <div className="flex flex-col gap-2">
                        {temple.documents.map((d) => (
                            <div key={d.id} className="flex items-center gap-2.5 p-2.5 bg-bg-3 rounded-lg border border-border">
                                <FileText size={20} className="text-text-muted shrink-0" />
                                <span className="flex-1 text-[13px] text-text font-medium">{d.documentType}</span>
                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide border ${d.status === 'Verified' ? 'bg-green-500/10 text-green-400 border-green-500/25' : 'bg-accent-glow text-accent-light border-accent/30'}`}>{d.status}</span>
                            </div>
                        ))}
                    </div>
                </ProfileSection>
            </div>
        </div>
    );
}

function ProfileSection({ title, children, wide = false }: { title: React.ReactNode; children: React.ReactNode; wide?: boolean }) {
    return (
        <div className={`glass-card p-5 md:p-6 ${wide ? 'col-span-1 md:col-span-2' : ''}`}>
            <h3 className="text-sm font-bold text-text-heading mb-3">{title}</h3>
            <div className="h-px bg-border mb-3" />
            {children}
        </div>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">{label}</span>
            <span className="text-[13px] text-text-heading font-medium">{value}</span>
        </div>
    );
}
