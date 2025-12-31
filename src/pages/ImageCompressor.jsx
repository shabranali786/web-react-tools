import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import imageCompression from 'browser-image-compression';
import { 
  Upload, 
  Image as ImageIcon, 
  Settings, 
  Download, 
  CheckCircle, 
  Info, 
  Zap, 
  ShieldCheck, 
  RefreshCw,
  X,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const ImageCompressor = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [quality, setQuality] = useState(80);
  const [isCompressing, setIsCompressing] = useState(false);
  const [result, setResult] = useState(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFile = (selectedFile) => {
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
    }
  };

  const handleCompress = async () => {
    if (!file) return;
    setIsCompressing(true);
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      initialQuality: quality / 100,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      const downloadUrl = URL.createObjectURL(compressedFile);
      setResult({
        file: compressedFile,
        url: downloadUrl,
        size: compressedFile.size,
        savings: Math.round(((file.size - compressedFile.size) / file.size) * 100)
      });
    } catch (error) {
      console.error("Compression error:", error);
      alert("Something went wrong during compression.");
    } finally {
      setIsCompressing(false);
    }
  };

  const downloadImage = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.href = result.url;
    link.download = `compressed-${file.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen py-10 px-4 font-sans text-slate-700 dark:text-slate-200">
      
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 
            bg-[#EFEEEE] dark:bg-[#292D32]
            shadow-[inset_3px_3px_6px_#d1d9e6,inset_-3px_-3px_6px_#ffffff]
            dark:shadow-[inset_3px_3px_6px_#1e2226,inset_-3px_-3px_6px_#34383e]
          ">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Premium Tool</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-slate-800 dark:text-slate-100">
            Image <span className="text-blue-500">Compressor</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Soft UI meets powerful compression. Optimize your images without leaving your browser.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Main Container - Neumorphic OUT */}
            <div className="rounded-[40px] p-8 md:p-10 transition-colors duration-300
              bg-[#EFEEEE] dark:bg-[#292D32]
              shadow-[12px_12px_24px_#d1d9e6,-12px_-12px_24px_#ffffff]
              dark:shadow-[12px_12px_24px_#1e2226,-12px_-12px_24px_#34383e]
            ">
              <AnimatePresence mode="wait">
                {!file ? (
                  <motion.div
                    key="upload-zone"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`relative rounded-[30px] p-16 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer
                      ${dragActive 
                        ? "shadow-[inset_8px_8px_16px_#d1d9e6,inset_-8px_-8px_16px_#ffffff] dark:shadow-[inset_8px_8px_16px_#1e2226,inset_-8px_-8px_16px_#34383e] scale-[0.99]" 
                        : "shadow-[inset_6px_6px_12px_#d1d9e6,inset_-6px_-6px_12px_#ffffff] dark:shadow-[inset_6px_6px_12px_#1e2226,inset_-6px_-6px_12px_#34383e] hover:shadow-[inset_8px_8px_16px_#d1d9e6,inset_-8px_-8px_16px_#ffffff] dark:hover:shadow-[inset_8px_8px_16px_#1e2226,inset_-8px_-8px_16px_#34383e]"
                      }
                    `}
                  >
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => handleFile(e.target.files[0])}
                      accept="image/*"
                    />
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 text-blue-500
                      bg-[#EFEEEE] dark:bg-[#292D32]
                      shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff]
                      dark:shadow-[6px_6px_12px_#1e2226,-6px_-6px_12px_#34383e]
                    ">
                      <Upload className="w-8 h-8" />
                    </div>
                    <p className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">
                      Drop image here
                    </p>
                    <p className="text-slate-500 dark:text-slate-400">or click to browse</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="preview-zone"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 rounded-lg bg-[#EFEEEE] dark:bg-[#292D32] shadow-[3px_3px_6px_#d1d9e6,-3px_-3px_6px_#ffffff] dark:shadow-[3px_3px_6px_#1e2226,-3px_-3px_6px_#34383e]">
                              <ImageIcon className="w-5 h-5 text-blue-500" />
                            </div>
                            <span className="font-bold text-slate-700 dark:text-slate-200 truncate max-w-[200px]">{file.name}</span>
                        </div>
                        <button 
                            onClick={reset}
                            className="p-3 rounded-full text-slate-400 hover:text-red-500 transition-colors
                            bg-[#EFEEEE] dark:bg-[#292D32]
                            shadow-[5px_5px_10px_#d1d9e6,-5px_-5px_10px_#ffffff]
                            dark:shadow-[5px_5px_10px_#1e2226,-5px_-5px_10px_#34383e]
                            active:shadow-[inset_5px_5px_10px_#d1d9e6,inset_-5px_-5px_10px_#ffffff]
                            dark:active:shadow-[inset_5px_5px_10px_#1e2226,inset_-5px_-5px_10px_#34383e]
                            "
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Original */}
                        <div className="space-y-4">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Original</span>
                            <div className="relative aspect-square rounded-[20px] p-2 overflow-hidden
                              bg-[#EFEEEE] dark:bg-[#292D32]
                              shadow-[inset_6px_6px_12px_#d1d9e6,inset_-6px_-6px_12px_#ffffff]
                              dark:shadow-[inset_6px_6px_12px_#1e2226,inset_-6px_-6px_12px_#34383e]
                            ">
                                <img 
                                    src={preview} 
                                    alt="Original" 
                                    className="w-full h-full object-contain rounded-[15px]"
                                />
                                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold text-slate-500
                                  bg-[#EFEEEE] dark:bg-[#292D32] opacity-90
                                  shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff]
                                  dark:shadow-[2px_2px_4px_#1e2226,-2px_-2px_4px_#34383e]
                                ">
                                    {(file.size / 1024).toFixed(1)} KB
                                </div>
                            </div>
                        </div>

                        {/* Result */}
                        <div className="space-y-4">
                            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest pl-2">Optimized</span>
                            <div className="relative aspect-square rounded-[20px] p-2 overflow-hidden flex items-center justify-center
                              bg-[#EFEEEE] dark:bg-[#292D32]
                              shadow-[inset_6px_6px_12px_#d1d9e6,inset_-6px_-6px_12px_#ffffff]
                              dark:shadow-[inset_6px_6px_12px_#1e2226,inset_-6px_-6px_12px_#34383e]
                            ">
                                {result ? (
                                    <img 
                                        src={result.url} 
                                        alt="Compressed" 
                                        className="w-full h-full object-contain rounded-[15px]"
                                    />
                                ) : isCompressing ? (
                                    <div className="flex flex-col items-center">
                                        <RefreshCw className="w-10 h-10 text-blue-500 animate-spin mb-4" />
                                        <p className="text-sm font-bold text-blue-500">Working magic...</p>
                                    </div>
                                ) : (
                                    <div className="text-center p-6 opacity-50">
                                        <p className="text-sm text-slate-400">Waiting for command...</p>
                                    </div>
                                )}
                                
                                {result && (
                                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold text-green-500
                                      bg-[#EFEEEE] dark:bg-[#292D32] opacity-90
                                      shadow-[2px_2px_4px_#d1d9e6,-2px_-2px_4px_#ffffff]
                                      dark:shadow-[2px_2px_4px_#1e2226,-2px_-2px_4px_#34383e]
                                    ">
                                        -{result.savings}%
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {result && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-6 rounded-[20px] flex flex-col md:flex-row items-center justify-between gap-4
                              bg-[#EFEEEE] dark:bg-[#292D32]
                              shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff]
                              dark:shadow-[inset_4px_4px_8px_#1e2226,inset_-4px_-4px_8px_#34383e]
                            "
                        >
                            <div>
                                <h4 className="text-green-600 font-bold mb-1 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" /> Optimization Complete
                                </h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">New size: {(result.size / 1024).toFixed(1)} KB</p>
                            </div>
                            <button 
                                onClick={downloadImage}
                                className="px-8 py-3 rounded-xl font-bold text-blue-500 transition-all active:scale-95
                                  bg-[#EFEEEE] dark:bg-[#292D32]
                                  shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff]
                                  dark:shadow-[6px_6px_12px_#1e2226,-6px_-6px_12px_#34383e]
                                  hover:text-blue-600
                                  active:shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff]
                                  dark:active:shadow-[inset_4px_4px_8px_#1e2226,inset_-4px_-4px_8px_#34383e]
                                  flex items-center gap-2
                                "
                            >
                                <Download className="w-5 h-5" />
                                Save Image
                            </button>
                        </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-8">
            {file && !result && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-[30px] p-6
                  bg-[#EFEEEE] dark:bg-[#292D32]
                  shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff]
                  dark:shadow-[8px_8px_16px_#1e2226,-8px_-8px_16px_#34383e]
                "
              >
                <div className="flex items-center gap-2 mb-8">
                  <div className="p-2 rounded-lg bg-[#EFEEEE] dark:bg-[#292D32] shadow-[3px_3px_6px_#d1d9e6,-3px_-3px_6px_#ffffff] dark:shadow-[3px_3px_6px_#1e2226,-3px_-3px_6px_#34383e]">
                    <Settings className="w-5 h-5 text-blue-500" />
                  </div>
                  <h3 className="font-bold uppercase tracking-wider text-sm text-slate-600 dark:text-slate-300">Settings</h3>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between mb-4">
                      <label className="text-sm font-bold text-slate-500 dark:text-slate-400">Quality</label>
                      <span className="text-sm font-black text-blue-500">{quality}%</span>
                    </div>
                    {/* Neumorphic Slider */}
                    <div className="relative w-full h-4 rounded-full
                      bg-[#EFEEEE] dark:bg-[#292D32]
                      shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff]
                      dark:shadow-[inset_2px_2px_4px_#1e2226,inset_-2px_-2px_4px_#34383e]
                    ">
                        <div 
                            className="absolute top-0 left-0 h-full bg-blue-500 rounded-full opacity-20"
                            style={{ width: `${quality}%` }}
                        />
                        <input
                            type="range"
                            min="1"
                            max="100"
                            value={quality}
                            onChange={(e) => setQuality(e.target.value)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        {/* Custom Thumb handle visual */}
                        <div 
                            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#EFEEEE] dark:bg-[#292D32] shadow-[3px_3px_6px_#d1d9e6,-3px_-3px_6px_#ffffff] dark:shadow-[3px_3px_6px_#1e2226,-3px_-3px_6px_#34383e] border border-slate-100 dark:border-slate-700 pointer-events-none"
                            style={{ left: `calc(${quality}% - 12px)` }}
                        >
                            <div className="w-2 h-2 bg-blue-500 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleCompress}
                    disabled={isCompressing}
                    className="w-full py-4 rounded-xl font-black text-blue-500 transition-all
                      bg-[#EFEEEE] dark:bg-[#292D32]
                      shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff]
                      dark:shadow-[6px_6px_12px_#1e2226,-6px_-6px_12px_#34383e]
                      hover:shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff]
                      dark:hover:shadow-[8px_8px_16px_#1e2226,-8px_-8px_16px_#34383e]
                      active:shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff]
                      dark:active:shadow-[inset_4px_4px_8px_#1e2226,inset_-4px_-4px_8px_#34383e]
                      active:scale-[0.98]
                      flex items-center justify-center gap-3
                    "
                  >
                    {isCompressing ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <span>COMPRESS</span>
                        <Zap className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Info Card */}
            <div className="rounded-[30px] p-6
              bg-[#EFEEEE] dark:bg-[#292D32]
              shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff]
              dark:shadow-[inset_4px_4px_8px_#1e2226,inset_-4px_-4px_8px_#34383e]
            ">
                <h3 className="text-sm font-bold mb-4 flex items-center gap-2 text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    <Info className="w-4 h-4" /> Privacy Note
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Your photos are processed entirely within your browser. 
                    No data is ever sent to our servers. It's 100% private and secure.
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCompressor;