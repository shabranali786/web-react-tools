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
      description: "Reduce file size efficiently.",
      path: "/image-compressor",
      icon: <ImageIcon className="w-5 h-5" />,
      tag: "Popular"
    },
    {
      id: 2,
      name: "Image Resizer",
      description: "Change dimensions instantly.",
      path: "#",
      icon: <Maximize className="w-5 h-5" />,
      tag: "Soon"
    },
    {
      id: 3,
      name: "Format Converter",
      description: "PNG, JPG, WEBP conversion.",
      path: "#",
      icon: <Files className="w-5 h-5" />,
      tag: "Soon"
    }
  ];

  return (
    <div className="font-sans selection:bg-blue-100 selection:text-blue-900 pt-8">
      {/* Hero Section */}
      <div className="relative pt-12 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full mb-6 
              bg-[#EFEEEE] dark:bg-[#292D32] 
              shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff]
              dark:shadow-[inset_2px_2px_4px_#1e2226,inset_-2px_-2px_4px_#34383e]
            ">
                <Sparkles className="w-3 h-3 text-blue-500" />
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase">Neumorphic 2.0</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-slate-700 dark:text-slate-200 mb-4 tracking-tight leading-tight">
              Essential Tools. <br />
              <span className="text-blue-500">Simply Elegant.</span>
            </h1>
            
            <p className="max-w-md mx-auto text-base text-slate-500 dark:text-slate-400 mb-8 font-normal leading-relaxed">
              Fast, secure, and client-side web utilities. No clutter, just function.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="#tools" 
                  className="px-8 py-3 rounded-xl text-sm font-bold text-blue-500 dark:text-blue-400 transition-all duration-300
                  bg-[#EFEEEE] dark:bg-[#292D32]
                  shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff]
                  dark:shadow-[6px_6px_12px_#1e2226,-6px_-6px_12px_#34383e]
                  hover:shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff]
                  dark:hover:shadow-[inset_4px_4px_8px_#1e2226,inset_-4px_-4px_8px_#34383e]
                  flex items-center justify-center gap-2 group
                  "
                >
                    Explore
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats - Slim Bar */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-3 gap-4 px-6 py-6 rounded-2xl
          bg-[#EFEEEE] dark:bg-[#292D32]
          shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff]
          dark:shadow-[inset_4px_4px_8px_#1e2226,inset_-4px_-4px_8px_#34383e]
        ">
            {[
              { icon: <Zap />, title: "Instant", desc: "No uploads" },
              { icon: <ShieldCheck />, title: "Secure", desc: "Private" },
              { icon: <Smartphone />, title: "Mobile", desc: "Ready" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                  <div className="mb-2 text-blue-500">
                      {React.cloneElement(stat.icon, { size: 20 })}
                  </div>
                  <h4 className="font-bold text-slate-700 dark:text-slate-200 text-sm">{stat.title}</h4>
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider hidden sm:block">{stat.desc}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Tools Grid - Compact */}
      <div id="tools" className="max-w-5xl mx-auto px-6 pb-20">
        <div className="mb-8 text-center">
            <h2 className="text-xl font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest">Select Tool</h2>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
                <Link 
                to={tool.path}
                className="group relative flex items-center p-5 rounded-2xl transition-all duration-300
                  bg-[#EFEEEE] dark:bg-[#292D32]
                  shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff]
                  dark:shadow-[6px_6px_12px_#1e2226,-6px_-6px_12px_#34383e]
                  hover:translate-y-[-2px]
                "
                >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4 text-blue-500 shrink-0
                      bg-[#EFEEEE] dark:bg-[#292D32]
                      shadow-[inset_3px_3px_6px_#d1d9e6,inset_-3px_-3px_6px_#ffffff]
                      dark:shadow-[inset_3px_3px_6px_#1e2226,inset_-3px_-3px_6px_#34383e]
                    ">
                        {tool.icon}
                    </div>

                    <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <h3 className="text-base font-bold text-slate-700 dark:text-slate-200 group-hover:text-blue-500 transition-colors">
                              {tool.name}
                          </h3>
                          {tool.tag === "Popular" && <span className="w-2 h-2 rounded-full bg-blue-500 block"></span>}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {tool.description}
                        </p>
                    </div>
                </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
