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
      description: "Reduce file size up to 90% without losing quality.",
      path: "/image-compressor",
      icon: <ImageIcon className="w-6 h-6" />,
      tag: "Popular"
    },
    {
      id: 2,
      name: "Image Resizer",
      description: "Quickly change image dimensions.",
      path: "#",
      icon: <Maximize className="w-6 h-6" />,
      tag: "Soon"
    },
    {
      id: 3,
      name: "Format Converter",
      description: "Convert between PNG, JPG, WEBP formats.",
      path: "#",
      icon: <Files className="w-6 h-6" />,
      tag: "Soon"
    }
  ];

  return (
    <div className="font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Hero Section */}
      <div className="relative pt-10 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center space-x-2 px-6 py-2 rounded-full mb-8 
              bg-[#EFEEEE] dark:bg-[#292D32] 
              shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff]
              dark:shadow-[inset_4px_4px_8px_#1e2226,inset_-4px_-4px_8px_#34383e]
            ">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-widest uppercase">Neumorphic Tools</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-slate-700 dark:text-slate-200 mb-6 tracking-tight">
              Tools that feel <br />
              <span className="text-blue-500">Real.</span>
            </h1>
            
            <p className="max-w-xl mx-auto text-lg text-slate-500 dark:text-slate-400 mb-12 font-medium">
              A collection of web utilities designed with Soft UI principles. 
              Simple, beautiful, and tactile.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link to="#tools" 
                  className="px-10 py-4 rounded-2xl font-bold text-blue-500 dark:text-blue-400 transition-all duration-300
                  bg-[#EFEEEE] dark:bg-[#292D32]
                  shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff]
                  dark:shadow-[8px_8px_16px_#1e2226,-8px_-8px_16px_#34383e]
                  hover:shadow-[inset_8px_8px_16px_#d1d9e6,inset_-8px_-8px_16px_#ffffff]
                  dark:hover:shadow-[inset_8px_8px_16px_#1e2226,inset_-8px_-8px_16px_#34383e]
                  flex items-center justify-center gap-2 group
                  "
                >
                    Explore Tools
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats - Pressed In Look */}
      <div className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 rounded-[30px]
          bg-[#EFEEEE] dark:bg-[#292D32]
          shadow-[inset_8px_8px_16px_#d1d9e6,inset_-8px_-8px_16px_#ffffff]
          dark:shadow-[inset_8px_8px_16px_#1e2226,inset_-8px_-8px_16px_#34383e]
        ">
            {[
              { icon: <Zap />, title: "Fast", desc: "Client-side only" },
              { icon: <ShieldCheck />, title: "Secure", desc: "No server uploads" },
              { icon: <Smartphone />, title: "Responsive", desc: "Mobile ready" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 text-blue-500
                    bg-[#EFEEEE] dark:bg-[#292D32]
                    shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff]
                    dark:shadow-[5px_5px_10px_#1e2226,-5px_-5px_10px_#34383e]
                  ">
                      {stat.icon}
                  </div>
                  <h4 className="font-bold text-slate-700 dark:text-slate-200 mb-1">{stat.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{stat.desc}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div id="tools" className="max-w-7xl mx-auto px-6 pb-24">
        <div className="mb-12 text-center">
            <h2 className="text-3xl font-black text-slate-700 dark:text-slate-200">Our Suite</h2>
        </div>

        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
                <Link 
                to={tool.path}
                className="group relative flex flex-col h-full rounded-[30px] p-8 transition-all duration-300
                  bg-[#EFEEEE] dark:bg-[#292D32]
                  shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff]
                  dark:shadow-[10px_10px_20px_#1e2226,-10px_-10px_20px_#34383e]
                  hover:translate-y-[-5px]
                "
                >
                    <div className="absolute top-6 right-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest 
                          ${tool.tag === 'Popular' ? 'text-blue-500' : 'text-slate-400'}
                          bg-[#EFEEEE] dark:bg-[#292D32]
                          shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff]
                          dark:shadow-[inset_2px_2px_4px_#1e2226,inset_-2px_-2px_4px_#34383e]
                        `}>
                            {tool.tag}
                        </span>
                    </div>

                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-blue-500
                      bg-[#EFEEEE] dark:bg-[#292D32]
                      shadow-[inset_5px_5px_10px_#d1d9e6,inset_-5px_-5px_10px_#ffffff]
                      dark:shadow-[inset_5px_5px_10px_#1e2226,inset_-5px_-5px_10px_#34383e]
                      group-hover:scale-110 transition-transform duration-300
                    ">
                        {tool.icon}
                    </div>

                    <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-3 group-hover:text-blue-500 transition-colors">
                        {tool.name}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6 text-sm">
                        {tool.description}
                    </p>
                    
                    <div className="mt-auto flex items-center text-sm font-bold text-blue-500 group-hover:translate-x-2 transition-transform">
                        Open Tool <ArrowRight className="w-4 h-4 ml-2" />
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