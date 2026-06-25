import { useState } from 'react';
import { Palette, User, Trophy, FolderOpen, CheckCircle, AlertTriangle, Paperclip, Send } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

type FormSection = 'personal' | 'professional' | 'achievements' | 'docs';

export default function ArtistRegister() {
    const [section, setSection] = useState<FormSection>('personal');
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [form, setForm] = useState({
        nic: '', tamilName: '', englishName: '', otherNames: '',
        dob: '', gender: '', permanentAddress: '', currentAddress: '', phone: '',
        education: '', category: '', literaryCategory: '', expertise: '', servicePeriod: '',
        publications: '', artisticWorks: '', awards: '', recognitions: '', biography: '',
    });

    const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const sections: { id: FormSection; label: string; icon: React.ReactNode }[] = [
        { id: 'personal', label: 'Personal Details', icon: <User className="inline mr-1 mb-0.5" size={16} /> },
        { id: 'professional', label: 'Professional Info', icon: <Palette className="inline mr-1 mb-0.5" size={16} /> },
        { id: 'achievements', label: 'Achievements', icon: <Trophy className="inline mr-1 mb-0.5" size={16} /> },
        { id: 'docs', label: 'Documents', icon: <FolderOpen className="inline mr-1 mb-0.5" size={16} /> },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
            const res = await fetch(`${API_URL}/api/artists`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nic: form.nic,
                    tamilName: form.tamilName,
                    englishName: form.englishName,
                    otherNames: form.otherNames || null,
                    dob: form.dob,
                    gender: form.gender,
                    permanentAddress: form.permanentAddress,
                    currentAddress: form.currentAddress || null,
                    phone: form.phone,
                    education: form.education,
                    category: form.category,
                    literaryCategory: form.literaryCategory || null,
                    expertise: form.expertise || null,
                    servicePeriod: form.servicePeriod || null,
                    biography: form.biography,
                    achievements: [
                        ...(form.publications ? [{ title: form.publications, type: 'Publication' }] : []),
                        ...(form.artisticWorks ? [{ title: form.artisticWorks, type: 'Artistic Work' }] : []),
                        ...(form.recognitions ? [{ title: form.recognitions, type: 'Recognition' }] : []),
                    ],
                    awards: form.awards
                        ? form.awards.split('\n').filter(Boolean).map(line => {
                            const match = line.match(/(.*?)\s*\((\d{4})\)/);
                            return match
                                ? { awardName: match[1].trim(), year: parseInt(match[2]) }
                                : { awardName: line.trim(), year: new Date().getFullYear() };
                        })
                        : [],
                }),
            });
            const json = await res.json();
            if (res.ok && json.success) {
                setSubmitted(true);
            } else {
                setError(json.message || 'Registration failed. Please try again.');
            }
        } catch {
            setError('Network error. Please check your connection.');
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="p-5 md:p-8 flex flex-col gap-6 max-w-5xl w-full">
                <div className="glass-card p-12 flex flex-col items-center text-center gap-4 animate-fade-up">
                    <div className="w-20 h-20 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center border-2 border-green-500/30 mb-2"><CheckCircle size={40} /></div>
                    <h2 className="text-2xl font-bold text-text-heading">Registration Submitted!</h2>
                    <p className="text-text-muted">Your artist / writer registration has been submitted for review.</p>
                    <div className="bg-bg-3 border border-border rounded-xl px-8 py-4 flex flex-col gap-1 my-3">
                        <span className="text-xs text-text-muted uppercase tracking-wider">Registered NIC</span>
                        <span className="text-2xl md:text-3xl font-mono font-extrabold text-primary-light">{form.nic || 'XXXXXXXXXXXX'}</span>
                    </div>
                    <p className="text-[13px] text-text-muted max-w-[400px] mb-3">You will be contacted once your registration is approved by the Department.</p>
                    <button className="btn-primary" onClick={() => { setSubmitted(false); setSection('personal'); }}>
                        Register Another Artist
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-5 md:p-8 flex flex-col gap-6 max-w-5xl w-full">
            <div className="animate-fade-up">
                <h1 className="text-2xl md:text-[26px] font-extrabold bg-gradient-to-br from-text-heading to-slate-100/70 bg-clip-text text-transparent mb-1 flex items-center gap-2">
                    <Palette className="text-accent" size={28} /> Artist Registration
                </h1>
                <p className="text-[13px] text-text-muted">Register Artists, Writers &amp; Cultural Personalities</p>
            </div>

            <div className="glass-card flex p-2 gap-2 overflow-x-auto animate-fade-up">
                {sections.map((s, i) => (
                    <button key={s.id} className={`flex-1 flex items-center justify-center gap-2.5 px-5 py-3.5 bg-transparent border border-transparent rounded-lg text-[14px] font-semibold cursor-pointer transition-all whitespace-nowrap ${section === s.id ? 'bg-primary-glow border-primary/30 text-primary-light' : 'text-text-muted hover:bg-black/5 hover:text-text'}`} onClick={() => setSection(s.id)}>
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border transition-colors ${section === s.id ? 'bg-primary border-primary text-white' : 'bg-bg-3 border-border text-text-muted'}`}>{i + 1}</span>
                        <span className="flex items-center gap-1">{s.icon} {s.label}</span>
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col">
                {section === 'personal' && (
                    <div className="glass-card p-6 md:p-8 animate-fade-up">
                        <h3 className="text-lg font-bold text-text-heading flex items-center gap-2"><User size={20} /> Personal Details</h3>
                        <div className="h-px bg-border my-6" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                            <FormField label="NIC Number *" id="nic" value={form.nic} onChange={set('nic')} placeholder="12-digit NIC number" required />
                            <FormFieldSelect label="Gender *" id="gender" value={form.gender} onChange={set('gender')} required options={['Male', 'Female', 'Other']} placeholder="Select Gender" />
                            <FormField label="Full Name (Tamil) *" id="tamilName" value={form.tamilName} onChange={set('tamilName')} placeholder="தமிழ் பெயர்" required />
                            <FormField label="Full Name (English) *" id="englishName" value={form.englishName} onChange={set('englishName')} placeholder="Full name in English" required />
                            <FormField label="Other Names / Pen Name" id="otherNames" value={form.otherNames} onChange={set('otherNames')} placeholder="Any other names used" />
                            <FormField label="Date of Birth *" id="dob" type="date" value={form.dob} onChange={set('dob')} required />
                            <FormField label="Telephone *" id="phone" value={form.phone} onChange={set('phone')} placeholder="07X-XXX-XXXX" required />
                            <div className="col-span-1 md:col-span-2">
                                <FormField label="Permanent Address *" id="permanentAddress" value={form.permanentAddress} onChange={set('permanentAddress')} placeholder="Permanent residential address" required />
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <FormField label="Current Address" id="currentAddress" value={form.currentAddress} onChange={set('currentAddress')} placeholder="Current residential address (if different)" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border">
                            <button type="button" className="btn-primary" onClick={() => setSection('professional')}>Next: Professional Info →</button>
                        </div>
                    </div>
                )}

                {section === 'professional' && (
                    <div className="glass-card p-6 md:p-8 animate-fade-up">
                        <h3 className="text-lg font-bold text-text-heading flex items-center gap-2"><Palette size={20} /> Professional Information</h3>
                        <div className="h-px bg-border my-6" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                            <FormFieldSelect label="Art Category *" id="category" value={form.category} onChange={set('category')} required placeholder="Select Category" options={['Classical Dance', 'Folk Dance', 'Carnatic Music', 'Folk Music', 'Drama / Theatre', 'Visual Arts / Painting', 'Sculpture', 'Tamil Literature', 'Social Service', 'Cultural Personality', 'Other']} />
                            <FormFieldSelect label="Literary Category" id="literaryCategory" value={form.literaryCategory} onChange={set('literaryCategory')} placeholder="Select (if applicable)" options={['Poetry', 'Novel', 'Short Stories', 'Essay', 'Drama', 'Children\'s Literature', 'Translation', 'Journalism', 'Other']} />
                            <FormField label="Expertise / Specialization" id="expertise" value={form.expertise} onChange={set('expertise')} placeholder="e.g. Bharatanatyam, Kuchipudi" />
                            <FormField label="Service Period" id="servicePeriod" value={form.servicePeriod} onChange={set('servicePeriod')} placeholder="e.g. 2005 – Present" />
                            <div className="col-span-1 md:col-span-2">
                                <FormTextarea label="Educational Qualifications *" id="education" value={form.education} onChange={set('education')} placeholder="List your educational qualifications, one per line..." rows={3} />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border flex-col md:flex-row">
                            <button type="button" className="btn-secondary w-full md:w-auto" onClick={() => setSection('personal')}>← Back</button>
                            <button type="button" className="btn-primary" onClick={() => setSection('achievements')}>Next: Achievements →</button>
                        </div>
                    </div>
                )}

                {section === 'achievements' && (
                    <div className="glass-card p-6 md:p-8 animate-fade-up">
                        <h3 className="text-lg font-bold text-text-heading flex items-center gap-2"><Trophy size={20} /> Achievements & Biography</h3>
                        <div className="h-px bg-border my-6" />
                        <div className="flex flex-col gap-5">
                            <FormTextarea label="Publications" id="publications" value={form.publications} onChange={set('publications')} placeholder="List publications (title, year), one per line..." rows={3} />
                            <FormTextarea label="Artistic Works / Performances" id="artisticWorks" value={form.artisticWorks} onChange={set('artisticWorks')} placeholder="List key works or performances, one per line..." rows={3} />
                            <FormTextarea label="Awards & Honors" id="awards" value={form.awards} onChange={set('awards')} placeholder="List awards received (award name, year), one per line..." rows={3} />
                            <FormTextarea label="Recognitions & Honors" id="recognitions" value={form.recognitions} onChange={set('recognitions')} placeholder="State titles, honorary degrees, recognitions..." rows={2} />
                            <FormTextarea label="Personal Biography *" id="biography" value={form.biography} onChange={set('biography')} placeholder="Write a brief biography of your life and career..." rows={5} />
                        </div>
                        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border flex-col md:flex-row">
                            <button type="button" className="btn-secondary w-full md:w-auto" onClick={() => setSection('professional')}>← Back</button>
                            <button type="button" className="btn-primary" onClick={() => setSection('docs')}>Next: Documents →</button>
                        </div>
                    </div>
                )}

                {section === 'docs' && (
                    <div className="glass-card p-6 md:p-8 animate-fade-up">
                        <h3 className="text-lg font-bold text-text-heading flex items-center gap-2"><FolderOpen size={20} /> Required Documents</h3>
                        <div className="h-px bg-border my-6" />
                        <div className="flex flex-col gap-4">
                            {[
                                { label: 'NIC Copy', required: true, hint: 'Clear scan of National Identity Card (front & back)' },
                                { label: 'Passport-size Photograph', required: true, hint: 'Recent photo in JPG or PNG format' },
                                { label: 'Educational Certificates', required: false, hint: 'Degree certificates, diplomas etc.' },
                                { label: 'Award Certificates', required: false, hint: 'Scanned copies of awards received' },
                                { label: 'Portfolio / Work Samples', required: false, hint: 'Images or PDFs of artistic works' },
                                { label: 'Recommendation Letter', required: false, hint: 'From a recognized cultural institution' },
                            ].map((doc) => (
                                <UploadField key={doc.label} label={doc.label} required={doc.required} hint={doc.hint} />
                            ))}
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-black/5 border-l-4 border-primary rounded mt-6">
                            <AlertTriangle size={18} className="text-primary shrink-0" /><p className="text-[13px] text-text-muted leading-relaxed">All documents must be clear and legible. Max 5MB per file. Accepted: PDF, JPG, PNG.</p>
                        </div>
                        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border flex-col md:flex-row">
                            <button type="button" className="btn-secondary w-full md:w-auto" onClick={() => setSection('achievements')}>← Back</button>
                            {error && <p className="text-sm text-red-400 self-center">{error}</p>}
                            <button type="submit" disabled={submitting} className="btn-primary w-full md:w-auto bg-gradient-to-br from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 shadow-[0_4px_20px_rgba(34,197,94,0.3)] border-0 disabled:opacity-60">
                                {submitting
                                    ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin inline-block mr-2" />
                                    : <Send size={18} className="inline mr-1.5" />}
                                {submitting ? 'Submitting…' : 'Submit Registration'}
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}

function FormField({ label, id, type = 'text', value, onChange, placeholder, required }: {
    label: string; id: string; type?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder?: string; required?: boolean;
}) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="text-[13px] font-semibold text-text">{label}</label>
            <input id={id} type={type} className="w-full px-4 py-3 bg-bg-2 border border-border rounded-lg text-text-heading text-sm transition-all focus:border-primary-light focus:bg-bg-3 focus:ring-[3px] focus:ring-primary-glow outline-none placeholder-text-muted" value={value} onChange={onChange} placeholder={placeholder} required={required} />
        </div>
    );
}

function FormFieldSelect({ label, id, value, onChange, options, required, placeholder }: {
    label: string; id: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: string[]; required?: boolean; placeholder?: string;
}) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="text-[13px] font-semibold text-text">{label}</label>
            <select id={id} className="w-full px-4 py-3 bg-bg-2 border border-border rounded-lg text-text-heading text-sm transition-all focus:border-primary-light focus:bg-bg-3 focus:ring-[3px] focus:ring-primary-glow outline-none appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg_xmlns=%22http://www.w3.org/2000/svg%22_viewBox=%220_0_24_24%22_fill=%22none%22_stroke=%22%2364748b%22_stroke-width=%222%22_stroke-linecap=%22round%22_stroke-linejoin=%22round%22%3e%3cpolyline_points=%226_9_12_15_18_9%22%3e%3c/polyline%3e%3c/svg%3e')] bg-no-repeat bg-[center_right_12px] bg-[length:16px] pr-10" value={value} onChange={onChange} required={required}>
                <option value="">{placeholder ?? 'Select...'}</option>
                {options.map((o) => <option className="bg-bg-2 text-text" key={o} value={o}>{o}</option>)}
            </select>
        </div>
    );
}

function FormTextarea({ label, id, value, onChange, placeholder, rows }: {
    label: string; id: string; value: string; onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; placeholder?: string; rows?: number;
}) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="text-[13px] font-semibold text-text">{label}</label>
            <textarea id={id} className="w-full px-4 py-3 bg-bg-2 border border-border rounded-lg text-text-heading text-sm transition-all focus:border-primary-light focus:bg-bg-3 focus:ring-[3px] focus:ring-primary-glow outline-none placeholder-text-muted resize-y min-h-[80px] leading-relaxed" value={value} onChange={onChange} placeholder={placeholder} rows={rows ?? 3} />
        </div>
    );
}

function UploadField({ label, required, hint }: { label: string; required: boolean; hint: string }) {
    const [fileName, setFileName] = useState<string | null>(null);
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 px-5 bg-bg-2 border border-border rounded-lg gap-4">
            <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-text-heading">{label} {required && <span className="text-red-500">*</span>}</span>
                <span className="text-xs text-text-muted">{hint}</span>
            </div>
            <label className="inline-flex items-center px-4 py-2 bg-bg-3 border border-dashed border-border rounded-lg text-text text-[13px] cursor-pointer transition-all hover:border-primary hover:text-primary-light hover:bg-primary-glow whitespace-nowrap">
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)} />
                {fileName ? <span className="text-green-400 font-medium flex items-center gap-1"><CheckCircle size={14} /> {fileName}</span> : <span className="flex items-center gap-1"><Paperclip size={14} /> Choose File</span>}
            </label>
        </div>
    );
}
