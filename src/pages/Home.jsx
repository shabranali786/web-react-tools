import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Image as ImageIcon, 
  Maximize, 
  Files, 
  ArrowRight, 
  Sparkles,
  Zap,
  ShieldCheck,
  Smartphone
} from 'lucide-react';

const Home = () => {
  const tools = [
    {
      id: 1,
      name: "Image Compressor",
      description: "Reduce file size up to 90% without losing quality. Optimized for web performance.",
      path: "/image-compressor",
      icon: <ImageIcon className="w-6 h-6 text-blue-600" />,
      color: "blue",
      tag: "Popular"
    },
    {
      id: 2,
      name: "Image Resizer",
      description: "Quickly change image dimensions for social media, web, or print.",
      path: "#",
      icon: <Maximize className="w-6 h-6 text-purple-600" />,
      color: "purple",
      tag: "Coming Soon"
    },
    {
      id: 3,
      name: "Format Converter",
      description: "Convert between PNG, JPG, WEBP and SVG formats instantly.",
      path: "#",
      icon: <Files className="w-6 h-6 text-orange-600" />,
      color: "orange",
      tag: "Coming Soon"
    }
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/40 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-100/40 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white border border-slate-200 px-4 py-2 rounded-full mb-8 shadow-sm">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-semibold text-slate-600 tracking-wide">THE ULTIMATE WEB UTILITIES</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-tight">
              Professional Tools <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Simplified.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-12 leading-relaxed">
              Fast, secure, and free browser-based tools for developers and creators. No registration required.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <a href="#tools" className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl hover:bg-slate-800 transition-all flex items-center gap-2 group">
                    Explore Tools
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <button className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold shadow-sm hover:bg-slate-50 transition-all">
                    How it works
                </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats/Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-12 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white">
            <div className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">Ultra Fast</h4>
                <p className="text-sm text-slate-500">Processing happens directly in your browser.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                    <ShieldCheck className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">100% Private</h4>
                <p className="text-sm text-slate-500">Files never leave your computer. Privacy first.</p>
            </div>
            <div className="flex flex-col items-center text-center p-4">
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
                    <Smartphone className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2">No Install</h4>
                <p className="text-sm text-slate-500">Works on any device with a modern browser.</p>
            </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div id="tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Available Tools</h2>
            <p className="text-slate-500">Select a tool to start optimizing your workflow.</p>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
                <Link 
                to={tool.path}
                className="group relative flex flex-col h-full bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500 overflow-hidden"
                >
                    {/* Tool Tag */}
                    <div className="absolute top-6 right-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                            tool.tag === "Popular" ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"
                        }`}>
                            {tool.tag}
                        </span>
                    </div>

                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 ${
                        tool.color === 'blue' ? 'bg-blue-50' : tool.color === 'purple' ? 'bg-purple-50' : 'bg-orange-50'
                    }`}>
                        {tool.icon}
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                        {tool.name}
                    </h3>
                    <p className="text-slate-500 leading-relaxed mb-8 flex-grow">
                        {tool.description}
                    </p>
                    
                    <div className="flex items-center text-sm font-bold text-blue-600 group-hover:translate-x-2 transition-transform">
                        Get Started <ArrowRight className="w-4 h-4 ml-2" />
                    </div>

                    {/* Hover Decoration */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-slate-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
          <div className="bg-blue-600 rounded-[3rem] p-16 text-center text-white relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-black mb-6">Ready to optimize your workflow?</h2>
                <p className="text-blue-100 text-lg mb-12 max-w-xl mx-auto font-medium">
                    Join thousands of developers using WebTools every day. No strings attached.
                </p>
                <Link to="/image-compressor" className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-black shadow-xl hover:scale-105 transition-transform inline-block">
                    Start Compressing Now
                </Link>
              </div>
              <div className="absolute top-0 left-0 w-full h-full opacity-10">
                  <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3" />
              </div>
          </div>
      </div>
    </div>
  );
};

export default Home;
