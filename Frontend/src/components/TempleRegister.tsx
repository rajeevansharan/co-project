import { useState } from 'react';
import { Building2, Users, FileText, FolderOpen, CheckCircle, Info, AlertTriangle, Paperclip, Send, Landmark } from 'lucide-react';

type FormSection = 'details' | 'admin' | 'info' | 'docs';

export default function TempleRegister() {
    const [section, setSection] = useState<FormSection>('details');
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        templeName: '', address: '', telephone: '', email: '', website: '', gnDivision: '', dsDivision: '', district: '',
        bankName: '', bankBranch: '', accountNo: '', accountName: '', presidentName: '', secretaryName: '',
        history: '', festivals: '', specialPoojas: '', idols: '', socialActivities: '',
    });

    const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const sections: { id: FormSection; label: string; icon: React.ReactNode }[] = [
        { id: 'details', label: 'Temple Details', icon: <Building2 className="inline mr-1 mb-0.5" size={16} /> },
        { id: 'admin', label: 'Administration', icon: <Users className="inline mr-1 mb-0.5" size={16} /> },
        { id: 'info', label: 'Temple Info', icon: <FileText className="inline mr-1 mb-0.5" size={16} /> },
        { id: 'docs', label: 'Documents', icon: <FolderOpen className="inline mr-1 mb-0.5" size={16} /> },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        const fakeId = `TMP-2026-${Math.floor(Math.random() * 900 + 100)}`;
        return (
            <div className="p-5 md:p-8 flex flex-col gap-6 max-w-5xl w-full">
                <div className="glass-card p-12 flex flex-col items-center text-center gap-4 animate-fade-up">
                    <div className="w-20 h-20 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center border-2 border-green-500/30 mb-2"><CheckCircle size={40} /></div>
                    <h2 className="text-2xl font-bold text-text-heading">Registration Submitted!</h2>
                    <p className="text-text-muted">Your temple registration has been submitted for review.</p>
                    <div className="bg-bg-3 border border-border rounded-xl px-8 py-4 flex flex-col gap-1 my-3">
                        <span className="text-xs text-text-muted uppercase tracking-wider">Your Temple Register ID</span>
                        <span className="text-2xl md:text-3xl font-mono font-extrabold text-primary-light">{fakeId}</span>
                    </div>
                    <p className="text-[13px] text-text-muted max-w-[400px] mb-3">Please keep this ID for future reference. You will be notified once approved.</p>
                    <button className="btn-primary" onClick={() => { setSubmitted(false); setForm({ templeName: '', address: '', telephone: '', email: '', website: '', gnDivision: '', dsDivision: '', district: '', bankName: '', bankBranch: '', accountNo: '', accountName: '', presidentName: '', secretaryName: '', history: '', festivals: '', specialPoojas: '', idols: '', socialActivities: '' }); setSection('details'); }}>
                        Register Another Temple
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-5 md:p-8 flex flex-col gap-6 max-w-5xl w-full">
            <div className="animate-fade-up">
                <h1 className="text-2xl md:text-[26px] font-extrabold bg-gradient-to-br from-text-heading to-slate-100/70 bg-clip-text text-transparent mb-1 flex items-center gap-2">
                    <Building2 className="text-primary" size={28} /> Temple Registration
                </h1>
                <p className="text-[13px] text-text-muted">Register a Hindu Temple with the Department of Cultural Affairs</p>
            </div>

            {/* Tabs */}
            <div className="glass-card flex p-2 gap-2 overflow-x-auto animate-fade-up">
                {sections.map((s, i) => (
                    <button
                        key={s.id}
                        className={`flex-1 flex items-center justify-center gap-2.5 px-5 py-3.5 bg-transparent border border-transparent rounded-lg text-[14px] font-semibold cursor-pointer transition-all whitespace-nowrap ${section === s.id ? 'bg-primary-glow border-primary/30 text-primary-light' : 'text-text-muted hover:bg-black/5 hover:text-text'}`}
                        onClick={() => setSection(s.id)}
                    >
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border transition-colors ${section === s.id ? 'bg-primary border-primary text-white' : 'bg-bg-3 border-border text-text-muted'}`}>{i + 1}</span>
                        <span className="flex items-center gap-1">{s.icon} {s.label}</span>
                    </button>
                ))}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col">
                {/* Temple Details */}
                {section === 'details' && (
                    <div className="glass-card p-6 md:p-8 animate-fade-up">
                        <h3 className="text-lg font-bold text-text-heading flex items-center gap-2"><FileText size={20} /> Temple Details</h3>
                        <div className="h-px bg-border my-6" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                            <FormField label="Temple Name *" id="templeName" value={form.templeName} onChange={set('templeName')} placeholder="e.g. Sri Murugan Kovil" required />
                            <FormField label="Telephone" id="telephone" value={form.telephone} onChange={set('telephone')} placeholder="021-XXX-XXXX" />
                            <FormField label="Email" id="email" type="email" value={form.email} onChange={set('email')} placeholder="temple@example.lk" />
                            <FormField label="Website" id="website" value={form.website} onChange={set('website')} placeholder="www.temple.lk" />
                            <div className="col-span-1 md:col-span-2">
                                <FormField label="Address *" id="address" value={form.address} onChange={set('address')} placeholder="Full temple address" required />
                            </div>
                            <FormField label="GN Division *" id="gnDivision" value={form.gnDivision} onChange={set('gnDivision')} placeholder="GN Division" required />
                            <FormField label="DS Division *" id="dsDivision" value={form.dsDivision} onChange={set('dsDivision')} placeholder="DS Division" required />
                            <FormFieldSelect label="District *" id="district" value={form.district} onChange={set('district')} required options={['Jaffna', 'Kilinochchi', 'Mannar', 'Mullaitivu', 'Vavuniya', 'Trincomalee', 'Batticaloa', 'Ampara', 'Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya', 'Galle', 'Matara', 'Hambantota', 'Kurunegala', 'Puttalam', 'Anuradhapura', 'Polonnaruwa', 'Badulla', 'Monaragala', 'Ratnapura', 'Kegalle']} />
                        </div>

                        <h3 className="text-lg font-bold text-text-heading mt-8 flex items-center gap-2"><Landmark size={20} /> Bank Details</h3>
                        <div className="h-px bg-border my-6" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                            <FormField label="Bank Name" id="bankName" value={form.bankName} onChange={set('bankName')} placeholder="e.g. Bank of Ceylon" />
                            <FormField label="Bank Branch" id="bankBranch" value={form.bankBranch} onChange={set('bankBranch')} placeholder="Branch name" />
                            <FormField label="Account Number" id="accountNo" value={form.accountNo} onChange={set('accountNo')} placeholder="Account number" />
                            <FormField label="Account Name" id="accountName" value={form.accountName} onChange={set('accountName')} placeholder="Account holder name" />
                        </div>

                        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border">
                            <button type="button" className="btn-primary" onClick={() => setSection('admin')}>Next: Administration →</button>
                        </div>
                    </div>
                )}

                {/* Administration */}
                {section === 'admin' && (
                    <div className="glass-card p-6 md:p-8 animate-fade-up">
                        <h3 className="text-lg font-bold text-text-heading flex items-center gap-2"><Users size={20} /> Temple Administration</h3>
                        <div className="h-px bg-border my-6" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                            <FormField label="President Name *" id="presidentName" value={form.presidentName} onChange={set('presidentName')} placeholder="Full name of President" required />
                            <FormField label="Secretary Name *" id="secretaryName" value={form.secretaryName} onChange={set('secretaryName')} placeholder="Full name of Secretary" required />
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-black/5 border-l-4 border-primary rounded mt-6">
                            <Info size={18} className="text-primary shrink-0" /><p className="text-[13px] text-text-muted leading-relaxed">Constitution document and committee details will be uploaded in the Documents section.</p>
                        </div>
                        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border flex-col md:flex-row">
                            <button type="button" className="btn-secondary w-full md:w-auto" onClick={() => setSection('details')}>← Back</button>
                            <button type="button" className="btn-primary" onClick={() => setSection('info')}>Next: Temple Info →</button>
                        </div>
                    </div>
                )}

                {/* Info */}
                {section === 'info' && (
                    <div className="glass-card p-6 md:p-8 animate-fade-up">
                        <h3 className="text-lg font-bold text-text-heading flex items-center gap-2"><FileText size={20} /> Temple Information</h3>
                        <div className="h-px bg-border my-6" />
                        <div className="flex flex-col gap-5">
                            <FormTextarea label="Temple History" id="history" value={form.history} onChange={set('history')} placeholder="Brief history of the temple..." rows={4} />
                            <FormTextarea label="Temple Festivals" id="festivals" value={form.festivals} onChange={set('festivals')} placeholder="e.g. Skanda Sashti, Thai Pusam..." rows={3} />
                            <FormTextarea label="Special Poojas" id="specialPoojas" value={form.specialPoojas} onChange={set('specialPoojas')} placeholder="e.g. Thiruvannamalai Deepam..." rows={3} />
                            <FormTextarea label="Temple Idols / Deities" id="idols" value={form.idols} onChange={set('idols')} placeholder="e.g. Lord Murugan, Goddess Valli..." rows={2} />
                            <FormTextarea label="Social Activities" id="socialActivities" value={form.socialActivities} onChange={set('socialActivities')} placeholder="e.g. Free medical camps, scholarships..." rows={2} />
                        </div>
                        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border flex-col md:flex-row">
                            <button type="button" className="btn-secondary w-full md:w-auto" onClick={() => setSection('admin')}>← Back</button>
                            <button type="button" className="btn-primary" onClick={() => setSection('docs')}>Next: Documents →</button>
                        </div>
                    </div>
                )}

                {/* Docs */}
                {section === 'docs' && (
                    <div className="glass-card p-6 md:p-8 animate-fade-up">
                        <h3 className="text-lg font-bold text-text-heading flex items-center gap-2"><FolderOpen size={20} /> Required Documents</h3>
                        <div className="h-px bg-border my-6" />
                        <div className="flex flex-col gap-4">
                            {[
                                { label: 'Temple Land Document', required: true, hint: 'Official land deed or ownership certificate' },
                                { label: 'Temple Constitution', required: true, hint: 'Signed copy of the temple constitution' },
                                { label: 'Annual Financial Report', required: false, hint: 'Last year\'s accounts and financial statement' },
                                { label: 'GN Recommendation Letter', required: true, hint: 'Signed letter from GN Officer' },
                                { label: 'DS Certification', required: true, hint: 'Certified letter from DS Office' },
                                { label: 'Cultural Officer Recommendation', required: false, hint: 'Recommendation from Cultural Officer' },
                            ].map((doc) => (
                                <UploadField key={doc.label} label={doc.label} required={doc.required} hint={doc.hint} />
                            ))}
                        </div>
                        <div className="flex items-start gap-3 p-4 bg-black/5 border-l-4 border-primary rounded mt-6">
                            <AlertTriangle size={18} className="text-primary shrink-0" /><p className="text-[13px] text-text-muted leading-relaxed">All documents must be scanned clearly. Maximum file size: 5MB per file. Accepted formats: PDF, JPG, PNG.</p>
                        </div>
                        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-border flex-col md:flex-row">
                            <button type="button" className="btn-secondary w-full md:w-auto" onClick={() => setSection('info')}>← Back</button>
                            <button type="submit" className="btn-primary w-full md:w-auto bg-gradient-to-br from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 shadow-[0_4px_20px_rgba(34,197,94,0.3)] border-0">
                                <Send size={18} className="inline mr-1.5" /> Submit Registration
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}

function FormField({ label, id, type = 'text', value, onChange, placeholder, required }: {
    label: string; id: string; type?: string; value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string; required?: boolean;
}) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="text-[13px] font-semibold text-text">{label}</label>
            <input id={id} type={type} className="w-full px-4 py-3 bg-bg-2 border border-border rounded-lg text-text-heading text-sm transition-all focus:border-primary-light focus:bg-bg-3 focus:ring-[3px] focus:ring-primary-glow outline-none placeholder-text-muted" value={value} onChange={onChange} placeholder={placeholder} required={required} />
        </div>
    );
}

function FormFieldSelect({ label, id, value, onChange, options, required }: {
    label: string; id: string; value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: string[]; required?: boolean;
}) {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={id} className="text-[13px] font-semibold text-text">{label}</label>
            <select id={id} className="w-full px-4 py-3 bg-bg-2 border border-border rounded-lg text-text-heading text-sm transition-all focus:border-primary-light focus:bg-bg-3 focus:ring-[3px] focus:ring-primary-glow outline-none appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg_xmlns=%22http://www.w3.org/2000/svg%22_viewBox=%220_0_24_24%22_fill=%22none%22_stroke=%22%2364748b%22_stroke-width=%222%22_stroke-linecap=%22round%22_stroke-linejoin=%22round%22%3e%3cpolyline_points=%226_9_12_15_18_9%22%3e%3c/polyline%3e%3c/svg%3e')] bg-no-repeat bg-[center_right_12px] bg-[length:16px] pr-10" value={value} onChange={onChange} required={required}>
                <option value="">Select District</option>
                {options.map((o) => <option className="bg-bg-2 text-text" key={o} value={o}>{o}</option>)}
            </select>
        </div>
    );
}

function FormTextarea({ label, id, value, onChange, placeholder, rows }: {
    label: string; id: string; value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string; rows?: number;
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
