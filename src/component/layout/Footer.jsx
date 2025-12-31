import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Github, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tight">
                Web<span className="text-blue-600">Tools</span>
              </span>
            </Link>
            <p className="text-slate-500 max-w-sm leading-relaxed mb-6">
              Your one-stop destination for high-quality, secure, and fast web utilities. Built for developers, by developers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-slate-50 text-slate-400 hover:text-blue-400 hover:bg-blue-50 rounded-lg transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-slate-50 text-slate-400 hover:text-red-400 hover:bg-red-50 rounded-lg transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Tools</h4>
            <ul className="space-y-4">
              <li><Link to="/image-compressor" className="text-slate-500 hover:text-blue-600 transition-colors">Image Compressor</Link></li>
              <li><Link to="#" className="text-slate-400 cursor-not-allowed">Image Resizer (Soon)</Link></li>
              <li><Link to="#" className="text-slate-400 cursor-not-allowed">Format Converter (Soon)</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Platform</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-slate-500 hover:text-blue-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-500 hover:text-blue-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-slate-500 hover:text-blue-600 transition-colors">About Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-50 pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} WebTools. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-sm text-slate-400">
            <span>Made with</span>
            <span className="text-red-500">❤️</span>
            <span>for the web community</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;