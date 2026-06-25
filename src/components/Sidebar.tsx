import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export type Page = 'dashboard' | 'temple-search' | 'artist-search' | 'temple-register' | 'artist-register';

const navItems: { id: Page; route: string; icon: string; label: string; group?: string }[] = [
    { id: 'dashboard', route: '/', icon: '⊞', label: 'Dashboard' },
    { id: 'temple-search', route: '/temple-search', icon: '🔍', label: 'Temple Search', group: 'Temples' },
    { id: 'temple-register', route: '/temple-register', icon: '📝', label: 'Register Temple', group: 'Temples' },
    { id: 'artist-search', route: '/artist-search', icon: '🔍', label: 'Artist Search', group: 'Artists' },
    { id: 'artist-register', route: '/artist-register', icon: '📝', label: 'Register Artist', group: 'Artists' },
];

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const groups = ['', 'Temples', 'Artists'];

    // Match the active page based on the current location.pathname
    const getActiveItem = () => navItems.find((i) => i.route === location.pathname) || navItems[0];
    const activePage = getActiveItem().id;

    return (
        <aside className={`bg-bg-2 border-r border-border flex flex-col transition-all duration-300 sticky top-0 md:h-screen shrink-0 ${collapsed ? 'w-[68px]' : 'w-[260px]'}`}>
            <div className="flex items-center justify-between p-5 border-b border-border gap-2">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center text-lg shrink-0 shadow-primary cursor-pointer" onClick={() => navigate('/')}>
                        <span>🕉</span>
                    </div>
                    {!collapsed && (
                        <div className="flex flex-col overflow-hidden cursor-pointer" onClick={() => navigate('/')}>
                            <span className="text-[15px] font-bold text-text-heading whitespace-nowrap">CO Portal</span>
                            <span className="text-[11px] text-text-muted whitespace-nowrap">Cultural Affairs</span>
                        </div>
                    )}
                </div>
                <button
                    className="w-7 h-7 bg-bg-3 border border-border rounded-md text-text-muted cursor-pointer flex items-center justify-center text-base transition-colors hover:border-primary hover:text-primary-light hover:bg-primary-glow shrink-0 hidden md:flex"
                    onClick={() => setCollapsed(!collapsed)}
                    title="Toggle sidebar"
                >
                    <span>{collapsed ? '›' : '‹'}</span>
                </button>
            </div>

            <nav className="flex-1 p-3 flex flex-col gap-1 overflow-y-auto">
                {groups.map((group) => {
                    const items = navItems.filter((i) => (i.group ?? '') === group);
                    if (!items.length) return null;
                    return (
                        <div key={group} className="flex flex-col gap-0.5 mb-2">
                            {group && !collapsed && <span className="text-[10px] font-bold uppercase tracking-wider text-text-muted px-2 pt-1 pb-1">{group}</span>}
                            {items.map((item) => (
                                <button
                                    key={item.id}
                                    className={`flex items-center gap-2.5 p-2.5 rounded-lg border-0 bg-transparent text-text-muted cursor-pointer transition-colors font-sans text-sm font-medium text-left w-full relative whitespace-nowrap overflow-hidden
                    ${activePage === item.id
                                            ? 'bg-primary-glow text-primary-light border border-primary/25'
                                            : 'hover:bg-primary/10 hover:text-text'}`}
                                    onClick={() => navigate(item.route)}
                                    title={collapsed ? item.label : undefined}
                                >
                                    <span className="text-base w-5 text-center shrink-0">{item.icon}</span>
                                    {!collapsed && <span className="flex-1 overflow-hidden overflow-ellipsis">{item.label}</span>}
                                    {activePage === item.id && <span className="w-1.5 h-1.5 rounded-full bg-primary-light shrink-0 animate-pulse" />}
                                </button>
                            ))}
                        </div>
                    );
                })}
            </nav>

            {!collapsed && (
                <div className="p-4 border-t border-border">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-text-muted leading-relaxed">Dept. of Hindu Religious</span>
                        <span className="text-[10px] text-text-muted leading-relaxed">&amp; Cultural Affairs</span>
                    </div>
                </div>
            )}
        </aside>
    );
}
