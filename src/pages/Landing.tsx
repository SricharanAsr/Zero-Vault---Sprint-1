import { useLocation } from 'wouter';
import { Shield, ArrowRight, Lock, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { SEO } from '../components/seo/SEO';
import { Button } from '../components/ui/Button';

export default function Landing() {
    const [, setLocation] = useLocation();

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
            <SEO title="Home" description="Zero-Vault — your zero-knowledge password vault. Encrypted locally, only you hold the key." />
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
                <div className="absolute w-96 h-96 bg-accent/10 rounded-full blur-3xl -bottom-20 -right-20 animate-pulse delay-1000"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl w-full text-center z-10"
            >
                {/* Logo / Icon */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-primary to-emerald-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/50"
                >
                    <Shield className="w-12 h-12 text-white" />
                </motion.div>

                {/* Hero Text */}
                <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
                    <span className="text-gradient">Zero-Knowledge</span>
                    <br />
                    Password Vault
                </h1>

                <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Your passwords, encrypted locally. Only you hold the key.
                    <br />
                    <span className="text-primary font-semibold">Not even we can access your data.</span>
                </p>

                {/* Feature Pills */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {[
                        { icon: Lock, text: 'End-to-End Encryption' },
                        { icon: Eye, text: 'Zero-Knowledge Architecture' },
                        { icon: Shield, text: 'Military-Grade Security' },
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + i * 0.1 }}
                            className="glass-panel px-4 py-2 rounded-full flex items-center gap-2"
                        >
                            <feature.icon className="w-4 h-4 text-primary" />
                            <span className="text-sm">{feature.text}</span>
                        </motion.div>
                    ))}
                </div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Button
                        id="cta-create-vault"
                        size="lg"
                        variant="primary"
                        onClick={() => setLocation('/register')}
                    >
                        Create Vault
                        <ArrowRight className="w-5 h-5" />
                    </Button>

                    <Button
                        id="cta-unlock-vault"
                        size="lg"
                        variant="secondary"
                        onClick={() => setLocation('/unlock')}
                    >
                        Unlock Existing Vault
                    </Button>
                </motion.div>

                {/* Trust Badge */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-16 text-sm text-muted-foreground"
                >
                    🔐 Your master password never leaves your device
                </motion.p>
            </motion.div>
        </div>
    );
}
