import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-gray-950/80 py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Zero-Vault. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Built with React · TypeScript · Vite
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
