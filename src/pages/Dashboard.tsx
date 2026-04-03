import { useState, useEffect } from 'react';
import { Search, Plus, Copy, Trash2, Edit, Eye, EyeOff, Star, Check, AlertTriangle, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EntryModal from '../components/EntryModal';
import DeleteConfirm from '../components/DeleteConfirm';
import { useToast } from '../contexts/ToastContext';
import { calculatePasswordStrength, isCommonPassword } from '../utils/passwordStrength';

interface VaultEntry {
    id: number;
    website: string;
    username: string;
    password: string;
    notes?: string;
    isFavorite: boolean;
    category?: string;
    passwordHistory?: Array<{ password: string; changedAt: string }>;
}

export default function Dashboard() {
    const { showToast } = useToast();
    const [search, setSearch] = useState('');
    const [copiedId, setCopiedId] = useState<number | null>(null);
    const [revealedId, setRevealedId] = useState<number | null>(null);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [entries, setEntries] = useState<VaultEntry[]>(() => {
        const saved = localStorage.getItem('vaultEntries');
        return saved ? JSON.parse(saved) : [];
    });

    // Persist entries
    useEffect(() => {
        localStorage.setItem('vaultEntries', JSON.stringify(entries));
    }, [entries]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEntry, setEditingEntry] = useState<VaultEntry | undefined>(undefined);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [entryToDelete, setEntryToDelete] = useState<VaultEntry | null>(null);
    // const [clipboardTimeRemaining, setClipboardTimeRemaining] = useState<number | null>(null);
    const clearClipboardSeconds = 30;

    const categories = ['all', ...Array.from(new Set(entries.map(e => e.category).filter(Boolean)))];

    const filteredEntries = entries.filter(e => {
        const matchesSearch = e.website.toLowerCase().includes(search.toLowerCase()) ||
            e.username.toLowerCase().includes(search.toLowerCase());
        const matchesFavorite = showFavoritesOnly ? e.isFavorite : true;
        const matchesCategory = selectedCategory === 'all' || e.category === selectedCategory;
        return matchesSearch && matchesFavorite && matchesCategory;
    });

    const handleCopy = (id: number, password: string) => {
        navigator.clipboard.writeText(password);
        setCopiedId(id);
        showToast(`Password copied! Will clear in ${clearClipboardSeconds}s`, 'success');

        setTimeout(() => {
            navigator.clipboard.writeText('');
            setCopiedId(null);
        }, 30000);
    };

    const handleReveal = (id: number) => {
        setRevealedId(id);
        setTimeout(() => setRevealedId(null), 10000);
    };

    const toggleFavorite = (id: number) => {
        setEntries(entries.map(e => e.id === id ? { ...e, isFavorite: !e.isFavorite } : e));
    };

    const handleAddNew = () => {
        setModalMode('add');
        setEditingEntry(undefined);
        setIsModalOpen(true);
    };

    const handleEdit = (entry: VaultEntry) => {
        setModalMode('edit');
        setEditingEntry(entry);
        setIsModalOpen(true);
    };

    const handleSaveEntry = (entryData: Omit<VaultEntry, 'id'> & { id?: number }) => {
        if (modalMode === 'edit' && entryData.id) {
            // Track password history if password changed
            const existingEntry = entries.find(e => e.id === entryData.id);
            let passwordHistory = existingEntry?.passwordHistory || [];

            if (existingEntry && existingEntry.password !== entryData.password) {
                passwordHistory = [
                    { password: existingEntry.password, changedAt: new Date().toISOString() },
                    ...passwordHistory.slice(0, 4) // Keep last 5 passwords
                ];
            }

            setEntries(entries.map(e => e.id === entryData.id ? {
                ...entryData,
                id: e.id,
                passwordHistory
            } as VaultEntry : e));
            showToast('Entry updated successfully', 'success');
        } else {
            const newEntry: VaultEntry = {
                ...entryData,
                id: Math.max(...entries.map(e => e.id), 0) + 1,
                isFavorite: entryData.isFavorite || false,
                passwordHistory: []
            };
            setEntries([...entries, newEntry]);
            showToast('Entry added successfully', 'success');
        }
    };

    const handleDeleteClick = (entry: VaultEntry) => {
        setEntryToDelete(entry);
        setDeleteConfirmOpen(true);
    };

    const handleDeleteConfirm = () => {
        if (entryToDelete) {
            setEntries(entries.filter(e => e.id !== entryToDelete.id));
            showToast(`"${entryToDelete.website}" deleted`, 'success');
            setEntryToDelete(null);
        }
    };



    useEffect(() => {
        const handleKeyboard = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                document.querySelector<HTMLInputElement>('input[type="text"]')?.focus();
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                handleAddNew();
            }
        };

        window.addEventListener('keydown', handleKeyboard);
        return () => window.removeEventListener('keydown', handleKeyboard);
    }, []);

    // ... existing imports ...

    const getFavicon = (url: string) => {
        try {
            let domain = url;
            if (!url.includes('.')) {
                domain = `${url}.com`;
            }
            domain = new URL(domain.startsWith('http') ? domain : `https://${domain}`).hostname;
            return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
        } catch {
            return null;
        }
    };

    const securityScore = entries.length > 0
        ? Math.round((entries.reduce((acc, entry) => acc + calculatePasswordStrength(entry.password).score, 0) / (entries.length * 4)) * 100)
        : 100;

    return (
        <div className="min-h-screen bg-background pb-24">
            <div className="border-b border-white/5 glass-panel sticky top-0 z-10 transition-all backdrop-blur-xl bg-black/40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    {/* Header Top Row */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Your Vault</h1>
                            <p className="text-sm text-muted-foreground flex items-center mt-1">
                                <span className={`w-2 h-2 rounded-full mr-2 animate-pulse ${securityScore > 70 ? 'bg-emerald-500' : securityScore > 40 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                                Security Score: {securityScore}% • {entries.length} Entries
                            </p>
                        </div>

                        {/* Vault Health Bar */}
                        <div className="flex-1 max-w-md hidden md:block px-6">
                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                <span>Vault Health</span>
                                <span>{securityScore}%</span>
                            </div>
                            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${securityScore}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className={`h-full rounded-full ${securityScore > 70 ? 'bg-gradient-to-r from-emerald-500 to-emerald-400' : securityScore > 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                />
                            </div>
                        </div>

                        <div className="flex gap-2">
                            {/* ... Actions ... */}
                            <button
                                onClick={handleAddNew}
                                className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition-all glow-on-hover ripple shadow-lg shadow-primary/20"
                            >
                                <Plus className="w-5 h-5" />
                                <span className="hidden sm:inline">Add Entry</span>
                            </button>
                        </div>
                    </div>

                    {/* Filters Row */}
                    <div className="flex gap-2 flex-wrap items-center">
                        {/* ... Filters ... */}
                        <div className="relative flex-1 min-w-[200px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search vault... (Ctrl+K)"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl focus:ring-1 focus:ring-primary/50 outline-none transition-all text-sm"
                            />
                        </div>
                        <button
                            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                            className={`px-3 py-2 rounded-xl font-medium flex items-center gap-2 transition-all text-sm border ${showFavoritesOnly
                                ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                                : 'bg-white/5 text-muted-foreground border-white/5 hover:bg-white/10'
                                } `}
                        >
                            <Star className={`w-4 h-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
                        </button>

                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-3 py-2 rounded-xl font-medium bg-white/5 hover:bg-white/10 border border-white/10 outline-none transition-all text-sm appearance-none cursor-pointer min-w-[120px]"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat} className="bg-gray-900">
                                    {cat === 'all' ? 'All Categories' : cat}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {filteredEntries.length === 0 ? (
                    // ... Empty State ...
                    <div className="text-center py-20 rounded-3xl border border-dashed border-white/10 bg-card/30 backdrop-blur-sm">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="w-10 h-10 text-muted-foreground/50" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-foreground">No entries found</h3>
                        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                            {search || showFavoritesOnly ? 'Try adjusting your filters to find what you need.' : 'Your vault is empty. Secure you first password now.'}
                        </p>
                        {!search && !showFavoritesOnly && (
                            <button
                                onClick={handleAddNew}
                                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2 transition-all shadow-lg hover:translate-y-[-2px]"
                            >
                                <Plus className="w-5 h-5" />
                                Add First Entry
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {filteredEntries.map((entry, index) => {
                                const strength = calculatePasswordStrength(entry.password);
                                const isWeak = isCommonPassword(entry.password);
                                const favicon = getFavicon(entry.website);

                                return (
                                    <motion.div
                                        key={entry.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: index * 0.05, duration: 0.3 }}
                                        className="glass-panel p-5 rounded-2xl transition-all group hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                                <div className="w-10 h-10 rounded-xl bg-white/5 p-2 flex items-center justify-center border border-white/10 flex-shrink-0">
                                                    {favicon ? (
                                                        <img
                                                            src={favicon}
                                                            alt=""
                                                            className="w-6 h-6 object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).style.display = 'none';
                                                                (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                                            }}
                                                        />
                                                    ) : null}
                                                    <div className={`${favicon ? 'hidden' : ''} w-full h-full flex items-center justify-center`}>
                                                        <span className="text-lg font-bold text-muted-foreground uppercase">{entry.website.charAt(0)}</span>
                                                    </div>
                                                </div>
                                                <div className="min-w-0">
                                                    <h3 className="font-semibold text-lg truncate group-hover:text-primary transition-colors">{entry.website}</h3>
                                                    <p className="text-sm text-muted-foreground truncate">{entry.username}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => toggleFavorite(entry.id)}
                                                className="text-muted-foreground hover:text-yellow-500 transition-colors p-1"
                                            >
                                                <Star className={`w-5 h-5 ${entry.isFavorite ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                                            </button>
                                        </div>

                                        <div className="mb-4 flex flex-wrap items-center gap-2">

                                            {isWeak ? (
                                                <div className="px-2.5 py-1 rounded-md text-xs font-semibold text-red-500 bg-red-500/10 border border-red-500/20 flex items-center gap-1.5 animate-pulse">
                                                    <AlertTriangle className="w-3 h-3" />
                                                    Breach Risk
                                                </div>
                                            ) : (
                                                <div className={`px-2.5 py-1 rounded-md text-xs font-medium border ${strength.score >= 3 ? 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' :
                                                    strength.score >= 2 ? 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20' :
                                                        'text-red-500 bg-red-500/10 border-red-500/20'
                                                    }`}>
                                                    {strength.label}
                                                </div>
                                            )}

                                            {entry.category && (
                                                <div className="px-2.5 py-1 rounded-md text-xs text-muted-foreground bg-white/5 border border-white/5 flex items-center gap-1">
                                                    <Tag className="w-3 h-3" />
                                                    {entry.category}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-4 bg-black/40 rounded-xl p-3 font-mono text-sm border border-white/5 flex items-center gap-2 group/pass">
                                            <span className="flex-1 truncate tracking-wider text-muted-foreground/70 group-hover/pass:text-foreground transition-colors">
                                                {revealedId === entry.id ? entry.password : '••••••••••••'}
                                            </span>
                                            <button
                                                onClick={() => revealedId === entry.id ? setRevealedId(null) : handleReveal(entry.id)}
                                                className="text-muted-foreground hover:text-primary transition-colors p-1"
                                            >
                                                {revealedId === entry.id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>

                                        <div className="flex gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => handleCopy(entry.id, entry.password)}
                                                className="flex-1 bg-white/5 hover:bg-primary/20 hover:text-primary hover:border-primary/30 border border-white/5 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all text-sm"
                                            >
                                                {copiedId === entry.id ? (
                                                    <>
                                                        <Check className="w-4 h-4" />
                                                        Copied
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy className="w-4 h-4" />
                                                        Copy
                                                    </>
                                                )}
                                            </button>
                                            <div className="flex gap-1">
                                                <button
                                                    onClick={() => handleEdit(entry)}
                                                    className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-muted-foreground hover:text-foreground"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteClick(entry)}
                                                    className="p-2.5 bg-white/5 hover:bg-red-500/20 hover:text-red-500 rounded-xl transition-colors text-muted-foreground"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            <EntryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveEntry}
                entry={editingEntry}
                mode={modalMode}
            />

            <DeleteConfirm
                isOpen={deleteConfirmOpen}
                onClose={() => setDeleteConfirmOpen(false)}
                onConfirm={handleDeleteConfirm}
                entryName={entryToDelete?.website || ''}
            />
        </div>
    );
}
