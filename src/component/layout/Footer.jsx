import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Github, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="pt-20 pb-10 
      bg-[#EFEEEE] dark:bg-[#292D32] text-slate-600 dark:text-slate-300 transition-colors duration-300
    ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Divider Line (Inset Shadow) */}
        <div className="h-0.5 w-full mb-16 rounded-full
          bg-[#EFEEEE] dark:bg-[#292D32]
          shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff]
          dark:shadow-[inset_2px_2px_4px_#1e2226,inset_-2px_-2px_4px_#34383e]
        " />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center
                bg-[#EFEEEE] dark:bg-[#292D32]
                shadow-[4px_4px_8px_#d1d9e6,-4px_-4px_8px_#ffffff]
                dark:shadow-[4px_4px_8px_#1e2226,-4px_-4px_8px_#34383e]
              ">
                <Sparkles className="w-4 h-4 text-blue-500" />
              </div>
              <span className="text-xl font-black text-slate-700 dark:text-slate-200 tracking-tight">
                Web<span className="text-blue-500">Tools</span>
              </span>
            </Link>
            <p className="max-w-sm leading-relaxed mb-8 text-sm text-slate-500 dark:text-slate-400">
              Handcrafted web utilities with a focus on privacy, speed, and modern aesthetics.
            </p>
            <div className="flex space-x-4">
              {[<Github />, <Twitter />, <Mail />].map((icon, i) => (
                <a key={i} href="#" className="p-3 rounded-xl transition-all
                  bg-[#EFEEEE] dark:bg-[#292D32]
                  text-slate-400 hover:text-blue-500
                  shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff]
                  dark:shadow-[5px_5px_10px_#1e2226,-5px_-5px_10px_#34383e]
                  hover:shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff]
                  dark:hover:shadow-[inset_4px_4px_8px_#1e2226,inset_-4px_-4px_8px_#34383e]
                ">
                  {React.cloneElement(icon, { size: 18 })}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-wider text-xs text-slate-400">Tools</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/image-compressor" className="hover:text-blue-500 transition-colors">Image Compressor</Link></li>
              <li><span className="text-slate-400 cursor-not-allowed">Image Resizer (Soon)</span></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} WebTools. Neumorphic Edition.</p>
          <div className="flex items-center space-x-2">
            <span>Designed with</span>
            <span className="text-red-400 animate-pulse">❤️</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
