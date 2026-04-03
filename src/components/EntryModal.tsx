import { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PasswordGenerator from './PasswordGenerator';

interface VaultEntry {
    id?: number;
    website: string;
    username: string;
    password: string;
    notes?: string;
    isFavorite: boolean;
    category?: string;
    passwordHistory?: Array<{ password: string; changedAt: string }>;
}

interface EntryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (entry: VaultEntry) => void;
    entry?: VaultEntry;
    mode: 'add' | 'edit';
}

export default function EntryModal({ isOpen, onClose, onSave, entry, mode }: EntryModalProps) {
    const [formData, setFormData] = useState<VaultEntry>(
        entry || { website: '', username: '', password: '', notes: '', isFavorite: false }
    );
    const [errors, setErrors] = useState<Partial<Record<keyof VaultEntry, string>>>({});
    const [showPassword, setShowPassword] = useState(false);

    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof VaultEntry, string>> = {};

        if (!formData.website.trim()) {
            newErrors.website = 'Website/App name is required';
        }

        if (!formData.username.trim()) {
            newErrors.username = 'Username/Email is required';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 4) {
            newErrors.password = 'Password must be at least 4 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validate()) {
            onSave(formData);
            handleClose();
        }
    };

    const handleClose = () => {
        setFormData({ website: '', username: '', password: '', notes: '', isFavorite: false });
        setErrors({});
        setShowPassword(false);
        onClose();
    };

    const handleChange = (field: keyof VaultEntry, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error for this field when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 300
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="glass-panel p-6 rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-white/10"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-display font-bold">
                                    {mode === 'add' ? 'Add New Entry' : 'Edit Entry'}
                                </h2>
                                <button
                                    onClick={handleClose}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Website/App Name */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Website / App Name <span className="text-destructive">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.website}
                                        onChange={(e) => handleChange('website', e.target.value)}
                                        placeholder="e.g., Netflix, GitHub"
                                        className={`w-full px-4 py-3 bg-secondary/30 border rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-all ${errors.website ? 'border-destructive' : 'border-white/10'
                                            }`}
                                    />
                                    {errors.website && (
                                        <p className="text-destructive text-sm mt-1">{errors.website}</p>
                                    )}
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Category <span className="text-muted-foreground">(Optional)</span>
                                    </label>
                                    <select
                                        value={formData.category || ''}
                                        onChange={(e) => handleChange('category', e.target.value)}
                                        className="w-full px-4 py-3 bg-secondary/30 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                                    >
                                        <option value="">No category</option>
                                        <option value="Work">🏢 Work</option>
                                        <option value="Personal">👤 Personal</option>
                                        <option value="Finance">💰 Finance</option>
                                        <option value="Social">💬 Social</option>
                                        <option value="Entertainment">🎬 Entertainment</option>
                                        <option value="Shopping">🛒 Shopping</option>
                                    </select>
                                </div>

                                {/* Username/Email */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Username / Email <span className="text-destructive">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) => handleChange('username', e.target.value)}
                                        placeholder="user@example.com"
                                        className={`w-full px-4 py-3 bg-secondary/30 border rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-all ${errors.username ? 'border-destructive' : 'border-white/10'
                                            }`}
                                    />
                                    {errors.username && (
                                        <p className="text-destructive text-sm mt-1">{errors.username}</p>
                                    )}
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Password <span className="text-destructive">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={formData.password}
                                            onChange={(e) => handleChange('password', e.target.value)}
                                            placeholder="••••••••••••"
                                            className={`w-full px-4 py-3 pr-12 bg-secondary/30 border rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-all ${errors.password ? 'border-destructive' : 'border-white/10'
                                                }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-destructive text-sm mt-1">{errors.password}</p>
                                    )}

                                    {/* Password Generator Collapsible */}
                                    <details className="mt-3 bg-white/5 rounded-xl overflow-hidden">
                                        <summary className="px-4 py-2 cursor-pointer hover:bg-white/10 transition-colors text-sm font-medium text-primary">
                                            🎲 Generate Strong Password
                                        </summary>
                                        <div className="p-4 border-t border-white/10">
                                            <PasswordGenerator onGenerate={(pwd) => handleChange('password', pwd)} />
                                        </div>
                                    </details>
                                </div>

                                {/* Notes (Optional) */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Notes <span className="text-muted-foreground">(Optional)</span>
                                    </label>
                                    <textarea
                                        value={formData.notes || ''}
                                        onChange={(e) => handleChange('notes', e.target.value)}
                                        placeholder="Security questions, recovery codes, etc."
                                        rows={3}
                                        className="w-full px-4 py-3 bg-secondary/30 border border-white/10 rounded-xl focus:ring-2 focus:ring-primary/50 outline-none transition-all resize-none"
                                    />
                                </div>

                                {/* Favorite Toggle */}
                                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                                    <input
                                        type="checkbox"
                                        id="favorite"
                                        checked={formData.isFavorite || false}
                                        onChange={(e) => handleChange('isFavorite', e.target.checked)}
                                        className="w-5 h-5 rounded accent-primary cursor-pointer"
                                    />
                                    <label htmlFor="favorite" className="text-sm cursor-pointer">
                                        Mark as favorite
                                    </label>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        className="flex-1 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-semibold transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-4 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold transition-all"
                                    >
                                        {mode === 'add' ? 'Add Entry' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
