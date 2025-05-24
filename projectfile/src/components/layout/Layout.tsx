import React from 'react';
import { Header } from './Header';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      <motion.main 
        className="flex-1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
      <footer className="py-6 border-t border-gray-200 dark:border-gray-700">
        <div className="px-4 sm:px-6 lg:px-8 mx-auto">
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            McKinsey 7S Model Simulator © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};