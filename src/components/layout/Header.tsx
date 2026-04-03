import React from 'react';
import { Link, useLocation } from 'wouter';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/insights', label: 'Insights' },
  { href: '/settings', label: 'Settings' },
];

export const Header: React.FC = () => {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-gray-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard">
            <a className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
              <span className="text-violet-400">Zero</span>
              <span>Vault</span>
            </a>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href}>
                <a
                  className={[
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    location === href
                      ? 'bg-violet-600/20 text-violet-400'
                      : 'text-gray-400 hover:text-white hover:bg-white/5',
                  ].join(' ')}
                >
                  {label}
                </a>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
