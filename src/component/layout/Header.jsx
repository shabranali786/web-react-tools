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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-[#EFEEEE]/80 dark:bg-[#292D32]/80 backdrop-blur-lg shadow-sm py-3" 
        : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
              bg-[#EFEEEE] dark:bg-[#292D32]
              shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff]
              dark:shadow-[5px_5px_10px_#1e2226,-5px_-5px_10px_#34383e]
              group-hover:translate-y-[-2px]
            ">
              <Sparkles className="w-5 h-5 text-blue-500" />
            </div>
            <span className="text-2xl font-black text-slate-700 dark:text-slate-200 tracking-tight">
              Web<span className="text-blue-500">Tools</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm font-bold transition-all duration-300 ${
                location.pathname === "/" 
                  ? "text-blue-500 scale-105" 
                  : "text-slate-500 dark:text-slate-400 hover:text-blue-500"
              }`}
            >
              Home
            </Link>
            <Link
              to="/image-compressor"
              className={`text-sm font-bold transition-all duration-300 ${
                location.pathname === "/image-compressor" 
                  ? "text-blue-500 scale-105" 
                  : "text-slate-500 dark:text-slate-400 hover:text-blue-500"
              }`}
            >
              Image Compressor
            </Link>
            
            {/* Theme Toggle Button (Neumorphic) */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                bg-[#EFEEEE] dark:bg-[#292D32] text-slate-600 dark:text-slate-300
                shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff]
                dark:shadow-[5px_5px_10px_#1e2226,-5px_-5px_10px_#34383e]
                active:shadow-[inset_5px_5px_10px_#d1d9e6,inset_-5px_-5px_10px_#ffffff]
                dark:active:shadow-[inset_5px_5px_10px_#1e2226,inset_-5px_-5px_10px_#34383e]
                hover:text-blue-500
              "
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* CTA Button */}
            <Link
              to="/image-compressor"
              className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300
                text-blue-500 dark:text-blue-400
                bg-[#EFEEEE] dark:bg-[#292D32]
                shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff]
                dark:shadow-[6px_6px_12px_#1e2226,-6px_-6px_12px_#34383e]
                hover:shadow-[inset_6px_6px_12px_#d1d9e6,inset_-6px_-6px_12px_#ffffff]
                dark:hover:shadow-[inset_6px_6px_12px_#1e2226,inset_-6px_-6px_12px_#34383e]
                hover:scale-[0.98]
              "
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center gap-4">
             <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-[#EFEEEE] dark:bg-[#292D32] text-slate-600 dark:text-slate-300 shadow-neu-sm dark:shadow-neu-dark-sm"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button className="p-2 text-slate-600 dark:text-slate-300">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
