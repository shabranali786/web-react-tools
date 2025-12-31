import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sparkles, Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-[#EFEEEE]/90 dark:bg-[#292D32]/90 backdrop-blur-md shadow-sm py-2" 
        : "bg-transparent py-4"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300
              bg-[#EFEEEE] dark:bg-[#292D32]
              shadow-[3px_3px_6px_#d1d9e6,-3px_-3px_6px_#ffffff]
              dark:shadow-[3px_3px_6px_#1e2226,-3px_-3px_6px_#34383e]
              group-hover:scale-105
            ">
              <Sparkles className="w-4 h-4 text-blue-500" />
            </div>
            <span className="text-lg font-bold text-slate-700 dark:text-slate-200 tracking-tight">
              Web<span className="text-blue-500">Tools</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-all duration-300 ${
                location.pathname === "/" 
                  ? "text-blue-500" 
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              Home
            </Link>
            <Link
              to="/image-compressor"
              className={`text-sm font-medium transition-all duration-300 ${
                location.pathname === "/image-compressor" 
                  ? "text-blue-500" 
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              Image Compressor
            </Link>
            
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-600 mx-2"></div>

            {/* Theme Toggle Button (Compact) */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                bg-[#EFEEEE] dark:bg-[#292D32] text-slate-500 dark:text-slate-400
                shadow-[3px_3px_6px_#d1d9e6,-3px_-3px_6px_#ffffff]
                dark:shadow-[3px_3px_6px_#1e2226,-3px_-3px_6px_#34383e]
                active:shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff]
                dark:active:shadow-[inset_2px_2px_4px_#1e2226,inset_-2px_-2px_4px_#34383e]
                hover:text-blue-500
              "
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* CTA Button (Slim) */}
            <Link
              to="/image-compressor"
              className="px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300
                text-blue-500 dark:text-blue-400
                bg-[#EFEEEE] dark:bg-[#292D32]
                shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff]
                dark:shadow-[4px_4px_8px_#1e2226,-4px_-4px_8px_#34383e]
                hover:shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff]
                dark:hover:shadow-[inset_4px_4px_8px_#1e2226,inset_-4px_-4px_8px_#34383e]
                hover:scale-[0.98]
              "
            >
              Start Now
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center gap-3">
             <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-[#EFEEEE] dark:bg-[#292D32] text-slate-600 dark:text-slate-300 shadow-sm"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
            <button className="p-1 text-slate-600 dark:text-slate-300">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;