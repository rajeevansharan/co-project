import { useState } from 'react';

/* ── Mock Data ─────────────────── */
const mockArtists: Record<string, ArtistProfile> = {
    '199845623412': {
        nic: '199845623412', tamilName: 'இரவீந்திரன் சுரேஷ்', englishName: 'Ravindran Suresh', otherNames: 'Ravi', dob: '1998-03-14', age: 28, gender: 'Male', permanentAddress: '12, Raja Mawatha, Nallur, Jaffna', currentAddress: '45, Temple Road, Colombo 15', phone: '077-123-4567', education: 'B.A. (Fine Arts) — University of Jaffna\nDiploma in Classical Dance — Lalitha Kala Akademi', category: 'Classical Dance', literaryCategory: '', expertise: 'Bharatanatyam, Kuchipudi', servicePeriod: '2010 – Present (16 years)', biography: 'Ravindran Suresh is a distinguished classical dance artist from Jaffna who has dedicated over 16 years to preserving and promoting Bharatanatyam. He has performed at national and international stages promoting Sri Lankan Tamil cultural heritage.', publications: [], artisticWorks: ['Siva Thandavam (2015)', 'Murugan Leela (2018)', 'Shakti (2022)'], awards: [{ name: 'National Cultural Award', year: 2020 }, { name: 'Best Performer – Jaffna Arts Festival', year: 2019 }], recognitions: ['UNESCO Cultural Ambassador 2021', 'Presidential Award for Arts 2022'], status: 'Approved', registeredDate: '2026-06-21',
    },
    '200012346789': {
        nic: '200012346789', tamilName: 'மீனாட்சி பிரியா', englishName: 'Meenakshi Priya', otherNames: '', dob: '2000-08-22', age: 25, gender: 'Female', permanentAddress: '78, Main Street, Batticaloa', currentAddress: '78, Main Street, Batticaloa', phone: '065-234-5678', education: 'B.Mus. — Eastern University Sri Lanka\nGrade 8 Trinity College London (Carnatic Vocals)', category: 'Music', literaryCategory: 'Tamil Poetry', expertise: 'Carnatic Music, Tamil Devotional Songs', servicePeriod: '2015 – Present (11 years)', biography: 'Meenakshi Priya is a celebrated Carnatic vocalist from Batticaloa who has been performing since the age of 15. She is known for her soul-stirring devotional music.', publications: ['Swaramalai (Tamil Poetry Collection, 2023)'], artisticWorks: ['Divya Prabandham Renditions (2021)', 'Navratri Special Concert (2023)'], awards: [{ name: 'Eastern Province Youth Award', year: 2022 }], recognitions: ['Best Vocalist – Sri Lanka Tamil Music Awards 2023'], status: 'Pending', registeredDate: '2026-06-23',
    },
};

export interface ArtistProfile {
    nic: string; tamilName: string; englishName: string; otherNames: string; dob: string; age: number; gender: string; permanentAddress: string; currentAddress: string; phone: string; education: string; category: string; literaryCategory: string; expertise: string; servicePeriod: string; biography: string; publications: string[]; artisticWorks: string[]; awards: { name: string; year: number }[]; recognitions: string[]; status: string; registeredDate: string;
}

export default function ArtistSearch() {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState<ArtistProfile | null>(null);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const handleSearch = () => {
        if (!query.trim()) return;
        setLoading(true); setNotFound(false); setResult(null); setShowProfile(false);
        setTimeout(() => {
            const found = mockArtists[query.trim()];
            if (found) setResult(found); else setNotFound(true);
            setLoading(false);
        }, 700);
    };

    const handleKey = (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleSearch(); };

    return (
        <div className="p-5 md:p-8 flex flex-col gap-6 max-w-4xl w-full">
            <div className="animate-fade-up">
                <h1 className="text-2xl md:text-[26px] font-extrabold bg-gradient-to-br from-text-heading to-slate-100/70 bg-clip-text text-transparent mb-1">
                    🎨 Artist Search
                </h1>
                <p className="text-[13px] text-text-muted">Search registered artists, writers &amp; cultural personalities by NIC</p>
            </div>

            <div className="glass-card p-6 flex flex-col gap-4 animate-fade-up">
                <div className="flex flex-col gap-2.5">
                    <label className="text-[13px] font-bold text-text-muted uppercase tracking-wider">NIC Number</label>
                    <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                        <div className="flex-1 relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base pointer-events-none">🔍</span>
                            <input
                                className="w-full h-12 md:h-[52px] pl-11 pr-4 bg-bg-3 border border-border rounded-xl text-text-heading text-[15px] font-medium tracking-wide outline-none transition-all placeholder-text-muted/70 focus:border-primary focus:bg-bg-2 focus:ring-4 focus:ring-primary-glow"
                                type="text" placeholder="e.g. 199845623412" value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKey}
                            />
                        </div>
                        <button className="btn-primary h-12 md:h-[52px] px-7 shrink-0" onClick={handleSearch} disabled={loading}>
                            {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block" /> : 'Search'}
                        </button>
                    </div>
                    <p className="text-xs text-text-muted">Enter the 12-digit NIC number of the artist or writer</p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-text-muted">Try:</span>
                    {['199845623412', '200012346789'].map((id) => (
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
                    <span className="text-5xl opacity-50">🔎</span>
                    <h3 className="text-lg text-text-heading font-bold">No Artist Found</h3>
                    <p className="text-sm text-text-muted">No artist registered with NIC <strong className="text-text">{query}</strong>. Please verify the NIC number and try again.</p>
                </div>
            )}

            {result && !loading && !showProfile && (
                <div className="glass-card p-6 md:p-8 flex flex-col gap-5 animate-fade-up">
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 bg-bg-3 border border-border rounded-lg px-3 py-1.5 text-[13px] font-mono text-text-muted">
                            <span className="text-base">🎨</span>
                            <span>NIC: {result.nic}</span>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border ${result.status === 'Approved' ? 'bg-green-500/10 text-green-400 border-green-500/25' : 'bg-accent-glow text-accent-light border-accent/30'}`}>
                            {result.status}
                        </span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-extrabold text-text-heading">{result.englishName}</h2>
                        <p className="text-base text-text-muted leading-tight mt-1" style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}>{result.tamilName}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <ResultField label="📍 Address" value={result.currentAddress} />
                        <ResultField label="🎭 Category" value={result.category} />
                        <ResultField label="🎂 Age" value={`${result.age} years`} />
                        <ResultField label="📞 Phone" value={result.phone} />
                        <ResultField label="🏫 Education" value={result.education.split('\n')[0]} />
                        <ResultField label="⏱ Service Period" value={result.servicePeriod} />
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                        <button className="btn-primary" onClick={() => setShowProfile(true)}>View Full Profile →</button>
                        <button className="btn-secondary" onClick={() => { setResult(null); setQuery(''); }}>New Search</button>
                    </div>
                </div>
            )}

            {showProfile && result && (
                <ArtistFullProfile artist={result} onBack={() => setShowProfile(false)} />
            )}
        </div>
    );
}

function ResultField({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col gap-1 p-3 px-4 bg-bg-3 rounded-lg border border-border">
            <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">{label}</span>
            <span className="text-sm text-text-heading font-medium">{value}</span>
        </div>
    );
}

function ArtistFullProfile({ artist, onBack }: { artist: ArtistProfile; onBack: () => void }) {
    return (
        <div className="flex flex-col gap-4 animate-fade-up">
            <div className="flex items-center justify-between">
                <button className="btn-secondary" onClick={onBack}>← Back to Results</button>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border ${artist.status === 'Approved' ? 'bg-green-500/10 text-green-400 border-green-500/25' : 'bg-accent-glow text-accent-light border-accent/30'}`}>{artist.status}</span>
            </div>

            <div className="glass-card p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
                <div className="w-[72px] h-[72px] rounded-2xl bg-accent-glow border border-accent/30 flex items-center justify-center text-4xl shrink-0">🎨</div>
                <div>
                    <h2 className="text-[22px] font-extrabold text-text-heading mb-1">{artist.englishName}</h2>
                    <p className="text-[15px] text-text-muted mb-1" style={{ fontFamily: "'Noto Sans Tamil', sans-serif" }}>{artist.tamilName}</p>
                    {artist.otherNames && <p className="text-[13px] text-text-muted mb-1">Also known as: {artist.otherNames}</p>}
                    <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap text-xs text-text-muted mt-1.5">
                        <span>NIC: {artist.nic}</span><span>•</span><span>{artist.category}</span><span>•</span><span>Registered: {artist.registeredDate}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProfileSection title="👤 Personal Details">
                    <div className="grid grid-cols-1 gap-2.5"><InfoRow label="Full Name (Tamil)" value={artist.tamilName} /><InfoRow label="Full Name (English)" value={artist.englishName} /><InfoRow label="NIC Number" value={artist.nic} /><InfoRow label="Date of Birth" value={artist.dob} /><InfoRow label="Age" value={`${artist.age} years`} /><InfoRow label="Gender" value={artist.gender} /><InfoRow label="Telephone" value={artist.phone} /><InfoRow label="Permanent Address" value={artist.permanentAddress} /><InfoRow label="Current Address" value={artist.currentAddress} /></div>
                </ProfileSection>

                <ProfileSection title="🎓 Professional Information">
                    <div className="grid grid-cols-1 gap-2.5"><InfoRow label="Art Category" value={artist.category} />{artist.literaryCategory && <InfoRow label="Literary Category" value={artist.literaryCategory} />}<InfoRow label="Expertise" value={artist.expertise} /><InfoRow label="Service Period" value={artist.servicePeriod} /></div>
                    <div className="h-px bg-border my-3" />
                    <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider mb-2">Educational Qualifications</p>
                    <div className="flex flex-col gap-1 text-[13px] text-text">
                        {artist.education.split('\n').map((line) => <p key={line}>• {line}</p>)}
                    </div>
                </ProfileSection>

                <ProfileSection title="📝 Biography" wide>
                    <p className="text-[13px] text-text leading-relaxed">{artist.biography}</p>
                </ProfileSection>

                {artist.artisticWorks.length > 0 && (
                    <ProfileSection title="🎭 Artistic Works" wide>
                        <div className="flex flex-wrap gap-2">
                            {artist.artisticWorks.map((w) => <span key={w} className="text-xs px-2.5 py-1 bg-primary-glow text-primary-light border border-primary/30 rounded-full">{w}</span>)}
                        </div>
                    </ProfileSection>
                )}

                {artist.publications.length > 0 && (
                    <ProfileSection title="📚 Publications" wide>
                        <ul className="pl-4 flex flex-col gap-1.5 list-disc text-[13px] text-text">
                            {artist.publications.map((p) => <li key={p}>{p}</li>)}
                        </ul>
                    </ProfileSection>
                )}

                <ProfileSection title="🏆 Awards & Recognition" wide>
                    <div className="flex flex-col gap-2.5 mb-1">
                        {artist.awards.map((a) => (
                            <div key={a.name} className="flex items-center gap-3 p-2.5 bg-bg-3 border border-border rounded-lg">
                                <span className="text-xl shrink-0">🥇</span>
                                <div>
                                    <p className="text-[13px] font-semibold text-text-heading">{a.name}</p>
                                    <p className="text-xs text-text-muted">{a.year}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {artist.recognitions.length > 0 && (
                        <>
                            <div className="h-px bg-border my-3" />
                            <div className="flex flex-wrap gap-2">
                                {artist.recognitions.map((r) => <span key={r} className="text-xs px-2.5 py-1 bg-accent-glow text-accent-light border border-accent/30 rounded-full">{r}</span>)}
                            </div>
                        </>
                    )}
                </ProfileSection>
            </div>
        </div>
    );
}

function ProfileSection({ title, children, wide = false }: { title: string; children: React.ReactNode; wide?: boolean }) {
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
