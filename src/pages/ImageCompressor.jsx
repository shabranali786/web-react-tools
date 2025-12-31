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
      alert("Something went wrong during compression. Please try again.");
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

  const features = [
    { icon: <Zap className="w-5 h-5 text-yellow-500" />, title: "Lightning Fast", desc: "Compress images in seconds right in your browser." },
    { icon: <ShieldCheck className="w-5 h-5 text-green-500" />, title: "Secure & Private", desc: "Your photos never leave your device. We don't store anything." },
    { icon: <Info className="w-5 h-5 text-blue-500" />, title: "Smart Compression", desc: "Perfect balance between file size and image quality." }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] py-16 px-4">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-6 text-blue-600 font-medium text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Premium Web Tool</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Image <span className="text-blue-600">Compressor</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Optimize your images for the web without compromising on clarity. Fast, free, and completely secure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Tool Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white">
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
                    className={`relative group border-2 border-dashed rounded-2xl p-16 transition-all duration-300 flex flex-col items-center justify-center ${
                      dragActive 
                        ? "border-blue-500 bg-blue-50/50 scale-[1.01]" 
                        : "border-slate-200 hover:border-blue-400 hover:bg-slate-50/50"
                    }`}
                  >
                    <input
                      type="file"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => handleFile(e.target.files[0])}
                      accept="image/*"
                    />
                    <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Upload className="w-10 h-10 text-blue-600" />
                    </div>
                    <p className="text-xl font-semibold text-slate-800 mb-2">
                      Drop your image here
                    </p>
                    <p className="text-slate-500 mb-6">or click to browse files</p>
                    <div className="flex gap-4">
                      <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600">PNG</span>
                      <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600">JPG</span>
                      <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600">WEBP</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="preview-zone"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <ImageIcon className="w-5 h-5 text-blue-600" />
                            <span className="font-semibold text-slate-800 truncate max-w-[200px]">{file.name}</span>
                        </div>
                        <button 
                            onClick={reset}
                            className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <span className="text-xs font-bold text-slate-400 uppercase">Original</span>
                            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 shadow-inner group border border-slate-200">
                                <img 
                                    src={preview} 
                                    alt="Original" 
                                    className="w-full h-full object-contain"
                                />
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-slate-600">
                                    {(file.size / 1024).toFixed(1)} KB
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <span className="text-xs font-bold text-blue-400 uppercase">Result</span>
                            <div className="relative aspect-square rounded-2xl overflow-hidden bg-blue-50/50 shadow-inner group border-2 border-dashed border-blue-200 flex items-center justify-center">
                                {result ? (
                                    <img 
                                        src={result.url} 
                                        alt="Compressed" 
                                        className="w-full h-full object-contain"
                                    />
                                ) : isCompressing ? (
                                    <div className="flex flex-col items-center">
                                        <RefreshCw className="w-10 h-10 text-blue-600 animate-spin mb-3" />
                                        <p className="text-sm font-medium text-blue-600">Optimizing...</p>
                                    </div>
                                ) : (
                                    <div className="text-center p-6">
                                        <ArrowRight className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                                        <p className="text-sm text-slate-400">Click compress to see results</p>
                                    </div>
                                )}
                                {result && (
                                    <div className="absolute top-3 right-3 bg-green-500 px-2 py-1 rounded text-[10px] font-bold text-white shadow-lg">
                                        -{result.savings}% SAVED
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {result && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-6 bg-green-50 rounded-2xl border border-green-100 flex flex-col md:flex-row items-center justify-between gap-4"
                        >
                            <div>
                                <h4 className="text-green-800 font-bold mb-1 flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" /> Successfully Optimized
                                </h4>
                                <p className="text-sm text-green-600">New size: {(result.size / 1024).toFixed(1)} KB</p>
                            </div>
                            <button 
                                onClick={downloadImage}
                                className="w-full md:w-auto px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg shadow-green-200 flex items-center justify-center gap-2 transition-all"
                            >
                                <Download className="w-5 h-5" />
                                Download Now
                            </button>
                        </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Sidebar Controls & Info */}
          <div className="space-y-6">
            {file && !result && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100"
              >
                <div className="flex items-center gap-2 mb-6 text-slate-800">
                  <Settings className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold uppercase tracking-wider text-sm">Settings</h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-4">
                      <label className="text-sm font-medium text-slate-700">Compression Quality</label>
                      <span className="text-sm font-bold text-blue-600">{quality}%</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={quality}
                      onChange={(e) => setQuality(e.target.value)}
                      className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between mt-2">
                        <span className="text-[10px] text-slate-400">Smaller Size</span>
                        <span className="text-[10px] text-slate-400">Better Quality</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleCompress}
                    disabled={isCompressing}
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    {isCompressing ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <span>Compress Now</span>
                        <Zap className="w-4 h-4 group-hover:scale-125 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Feature Cards */}
            <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-400" /> Why use WebTools?
                </h3>
                <div className="space-y-6">
                    {features.map((f, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="flex-shrink-0 mt-1">{f.icon}</div>
                            <div>
                                <h4 className="text-sm font-bold text-slate-100">{f.title}</h4>
                                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-blue-600 rounded-3xl p-6 text-white overflow-hidden relative group">
                <div className="relative z-10">
                    <h3 className="font-bold text-xl mb-2 italic">Coming Soon</h3>
                    <p className="text-blue-100 text-sm">Image Resize & Bulk processing will be available soon!</p>
                </div>
                <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-blue-500 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
            </div>
          </div>
        </div>

        {/* How it works section */}
        <div className="mt-20 pt-20 border-t border-slate-200">
            <h2 className="text-3xl font-black text-center text-slate-900 mb-12">How it works?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                    { step: "01", title: "Upload", desc: "Drag and drop your image or click to select from your device." },
                    { step: "02", title: "Optimize", desc: "Adjust the quality slider to find your perfect balance." },
                    { step: "03", title: "Download", desc: "Get your optimized image instantly. No waiting, no watermarks." }
                ].map((s, i) => (
                    <div key={i} className="text-center group">
                        <span className="text-6xl font-black text-slate-100 group-hover:text-blue-50 transition-colors duration-300 block mb-4">{s.step}</span>
                        <h4 className="text-xl font-bold text-slate-800 mb-2">{s.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCompressor;
