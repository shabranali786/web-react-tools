import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import imageCompression from 'browser-image-compression';
import JSZip from 'jszip';
import { 
  Upload, 
  Image as ImageIcon, 
  Settings, 
  Download, 
  CheckCircle, 
  Info, 
  Zap, 
  RefreshCw,
  X,
  Trash2,
  Sparkles,
  Archive
} from 'lucide-react';

const ImageCompressor = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [quality, setQuality] = useState(80);
  const [isCompressing, setIsCompressing] = useState(false);
  const [globalStats, setGlobalStats] = useState({ saved: 0, totalSize: 0, originalTotal: 0 });

  // Handle Drag Events
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  // Handle Drop
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  // Process New Files
  const handleFiles = (newFiles) => {
    const validFiles = newFiles
      .filter(file => file.type.startsWith('image/'))
      .map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        originalFile: file,
        preview: URL.createObjectURL(file),
        compressedFile: null,
        compressedUrl: null,
        status: 'pending', // pending, processing, done, error
        originalSize: file.size,
        compressedSize: 0,
        savings: 0
      }));
    
    setFiles(prev => [...prev, ...validFiles]);
  };

  // Remove File
  const removeFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  // Compress Single File
  const compressFile = async (fileObj) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      initialQuality: quality / 100,
    };

    try {
      const compressedBlob = await imageCompression(fileObj.originalFile, options);
      const url = URL.createObjectURL(compressedBlob);
      
      return {
        ...fileObj,
        compressedFile: compressedBlob,
        compressedUrl: url,
        compressedSize: compressedBlob.size,
        savings: Math.round(((fileObj.originalSize - compressedBlob.size) / fileObj.originalSize) * 100),
        status: 'done'
      };
    } catch (error) {
      console.error(error);
      return { ...fileObj, status: 'error' };
    }
  };

  // Compress All
  const handleCompressAll = async () => {
    setIsCompressing(true);
    
    // Mark all pending as processing
    setFiles(prev => prev.map(f => f.status === 'pending' || f.status === 'done' ? { ...f, status: 'processing' } : f));

    // Process sequentially to not freeze browser
    const newFiles = [...files];
    for (let i = 0; i < newFiles.length; i++) {
        if (newFiles[i].status !== 'error') {
            newFiles[i] = await compressFile(newFiles[i]);
            // Update state incrementally to show progress
            setFiles([...newFiles]); 
        }
    }
    
    setIsCompressing(false);
  };

  // Update Global Stats
  useEffect(() => {
    const processed = files.filter(f => f.status === 'done');
    const origTotal = processed.reduce((acc, curr) => acc + curr.originalSize, 0);
    const newTotal = processed.reduce((acc, curr) => acc + curr.compressedSize, 0);
    
    setGlobalStats({
        originalTotal: origTotal,
        totalSize: newTotal,
        saved: origTotal > 0 ? Math.round(((origTotal - newTotal) / origTotal) * 100) : 0
    });
  }, [files]);

  // Download All as Zip
  const downloadAll = async () => {
    const zip = new JSZip();
    const processed = files.filter(f => f.status === 'done');
    
    if (processed.length === 0) return;

    processed.forEach(file => {
        zip.file(`compressed_${file.originalFile.name}`, file.compressedFile);
    });

    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "images_compressed.zip";
    link.click();
  };

  return (
    <div className="min-h-screen py-10 px-4 font-sans text-slate-700 dark:text-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
           <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full mb-6 
            bg-[#EFEEEE] dark:bg-[#292D32]
            shadow-[inset_3px_3px_6px_#d1d9e6,inset_-3px_-3px_6px_#ffffff]
            dark:shadow-[inset_3px_3px_6px_#1e2226,inset_-3px_-3px_6px_#34383e]
          ">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Multi-File Support</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 text-slate-800 dark:text-slate-100">
            Bulk Image <span className="text-blue-500">Compressor</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar Controls */}
            <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-28 h-fit order-2 lg:order-1">
                {/* Global Settings */}
                <div className="rounded-[30px] p-6
                  bg-[#EFEEEE] dark:bg-[#292D32]
                  shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff]
                  dark:shadow-[8px_8px_16px_#1e2226,-8px_-8px_16px_#34383e]
                ">
                    <div className="flex items-center gap-2 mb-6">
                        <Settings className="w-5 h-5 text-blue-500" />
                        <h3 className="font-bold uppercase tracking-wider text-sm text-slate-600 dark:text-slate-300">Global Settings</h3>
                    </div>
                    
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between mb-4">
                                <label className="text-sm font-bold text-slate-500 dark:text-slate-400">Quality Level</label>
                                <span className="text-sm font-black text-blue-500">{quality}%</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="100"
                                value={quality}
                                onChange={(e) => setQuality(e.target.value)}
                                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-200 dark:bg-slate-700 accent-blue-500"
                            />
                        </div>

                        <button 
                            onClick={handleCompressAll}
                            disabled={files.length === 0 || isCompressing}
                            className="w-full py-4 rounded-xl font-black text-blue-500 transition-all
                            bg-[#EFEEEE] dark:bg-[#292D32]
                            shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff]
                            dark:shadow-[6px_6px_12px_#1e2226,-6px_-6px_12px_#34383e]
                            hover:shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff]
                            dark:hover:shadow-[8px_8px_16px_#1e2226,-8px_-8px_16px_#34383e]
                            active:shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff]
                            dark:active:shadow-[inset_4px_4px_8px_#1e2226,inset_-4px_-4px_8px_#34383e]
                            disabled:opacity-50 disabled:cursor-not-allowed
                            flex items-center justify-center gap-3
                            "
                        >
                            {isCompressing ? (
                                <RefreshCw className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>COMPRESS ALL</span>
                                    <Zap className="w-4 h-4" />
                                </>
                            )}
                        </button>

                         {globalStats.saved > 0 && (
                            <button 
                                onClick={downloadAll}
                                className="w-full py-4 rounded-xl font-black text-green-600 transition-all
                                bg-[#EFEEEE] dark:bg-[#292D32]
                                shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff]
                                dark:shadow-[6px_6px_12px_#1e2226,-6px_-6px_12px_#34383e]
                                hover:shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff]
                                dark:hover:shadow-[8px_8px_16px_#1e2226,-8px_-8px_16px_#34383e]
                                active:shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff]
                                dark:active:shadow-[inset_4px_4px_8px_#1e2226,inset_-4px_-4px_8px_#34383e]
                                flex items-center justify-center gap-3
                                "
                            >
                                <Archive className="w-5 h-5" />
                                DOWNLOAD ZIP
                            </button>
                        )}
                    </div>
                </div>

                {/* Stats Summary */}
                {globalStats.saved > 0 && (
                    <div className="rounded-[30px] p-6 text-center
                        bg-[#EFEEEE] dark:bg-[#292D32]
                        shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff]
                        dark:shadow-[inset_4px_4px_8px_#1e2226,inset_-4px_-4px_8px_#34383e]
                    ">
                        <p className="text-xs uppercase font-bold text-slate-500 mb-2">Total Savings</p>
                        <p className="text-3xl font-black text-green-500">{globalStats.saved}%</p>
                        <p className="text-xs text-slate-400 mt-2">
                            {(globalStats.originalTotal / 1024 / 1024).toFixed(2)} MB ➔ {(globalStats.totalSize / 1024 / 1024).toFixed(2)} MB
                        </p>
                    </div>
                )}
            </div>

            {/* Main Area */}
            <div className="lg:col-span-3 space-y-6 order-1 lg:order-2">
                
                {/* Upload Zone */}
                <div 
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`relative rounded-[40px] p-10 flex flex-col items-center justify-center transition-all duration-300 min-h-[300px] border-2 border-transparent
                      bg-[#EFEEEE] dark:bg-[#292D32]
                      shadow-[inset_8px_8px_16px_#d1d9e6,inset_-8px_-8px_16px_#ffffff]
                      dark:shadow-[inset_8px_8px_16px_#1e2226,inset_-8px_-8px_16px_#34383e]
                      ${dragActive ? "border-blue-500" : ""}
                    `}
                >
                    <input
                      type="file"
                      multiple
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                      onChange={(e) => handleFiles(Array.from(e.target.files))}
                      accept="image/*"
                    />
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 text-blue-500
                      bg-[#EFEEEE] dark:bg-[#292D32]
                      shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff]
                      dark:shadow-[8px_8px_16px_#1e2226,-8px_-8px_16px_#34383e]
                    ">
                      <Upload className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-2">
                        {files.length > 0 ? "Add more images" : "Drop images here"}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400">Supports JPG, PNG, WEBP</p>
                </div>

                {/* File Grid */}
                <AnimatePresence>
                    {files.length > 0 && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {files.map((file) => (
                                <motion.div
                                    key={file.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="relative rounded-[30px] p-4 flex gap-4 overflow-hidden
                                        bg-[#EFEEEE] dark:bg-[#292D32]
                                        shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_16px_#ffffff]
                                        dark:shadow-[8px_8px_16px_#1e2226,-8px_-8px_16px_#34383e]
                                    "
                                >
                                    {/* Preview Image */}
                                    <div className="w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800">
                                        <img src={file.preview} alt="preview" className="w-full h-full object-cover" />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-grow flex flex-col justify-center min-w-0">
                                        <h4 className="font-bold text-slate-700 dark:text-slate-200 truncate text-sm mb-1">{file.originalFile.name}</h4>
                                        <p className="text-xs text-slate-500 mb-3">{(file.originalSize / 1024).toFixed(1)} KB</p>
                                        
                                        {file.status === 'processing' && (
                                             <div className="flex items-center gap-2 text-blue-500 text-xs font-bold animate-pulse">
                                                <RefreshCw className="w-3 h-3 animate-spin" /> Processing...
                                             </div>
                                        )}

                                        {file.status === 'done' && (
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-green-600 text-xs font-bold">
                                                    <CheckCircle className="w-3 h-3" /> Saved {file.savings}%
                                                </div>
                                                <p className="text-xs text-slate-400">{(file.compressedSize / 1024).toFixed(1)} KB</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col justify-between items-end">
                                        <button 
                                            onClick={() => removeFile(file.id)}
                                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>

                                        {file.status === 'done' && (
                                            <a 
                                                href={file.compressedUrl} 
                                                download={`compressed_${file.originalFile.name}`}
                                                className="p-2 rounded-xl text-blue-500
                                                    bg-[#EFEEEE] dark:bg-[#292D32]
                                                    shadow-[3px_3px_6px_#d1d9e6,-3px_-3px_6px_#ffffff]
                                                    dark:shadow-[3px_3px_6px_#1e2226,-3px_-3px_6px_#34383e]
                                                    active:shadow-[inset_2px_2px_4px_#d1d9e6,inset_-2px_-2px_4px_#ffffff]
                                                    dark:active:shadow-[inset_2px_2px_4px_#1e2226,inset_-2px_-2px_4px_#34383e]
                                                "
                                            >
                                                <Download className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCompressor;
