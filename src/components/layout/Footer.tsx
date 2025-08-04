"use client";

import Link from "next/link";
import { HeartHandshake } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 mt-auto relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-dot-pattern"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center">
          {/* App Branding Section */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              <h3 className="text-3xl font-bold">Minierce</h3>
            </div>
            <div className="mt-3">
              <span className="inline-block px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full text-orange-300 text-sm font-medium">
                Mini eCommerce - A fullstack web application
              </span>
            </div>
          </div>
          
          {/* Tech Stack Section */}
          <div className="mb-8">
            <p className="text-gray-300 mb-4 text-lg">
              This fullstack project is built with modern web technologies and best practices
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {['Next.js', 'TypeScript', 'MongoDB', 'Tailwind CSS', 'Zustand'].map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1 bg-gray-800/50 border border-gray-700 rounded-md text-gray-300 text-sm font-medium hover:bg-gray-700/50 transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          {/* Credit Section */}
          <div className="border-t border-gray-700 pt-6">
            <p className="text-gray-300 flex items-center justify-center gap-2">
              <span>Made with</span>
              <HeartHandshake size={18} className="text-orange-400" />
              <span>by</span>
              <Link 
                href="https://islamz.me" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-300 transition-colors duration-200 font-medium hover:underline decoration-orange-400 underline-offset-2"
              >
                islamz
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 