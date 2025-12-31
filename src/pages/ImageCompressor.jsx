import React, { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import imageCompression from "browser-image-compression";
import JSZip from "jszip";
import {
  Upload,
  Download,
  X,
  Trash2,
  Zap,
  PieChart,
  FileImage,
  Check,
  Lock,
  Unlock,
  Maximize2,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

const ImageCompressor = () => {
  // --- States ---
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [quality, setQuality] = useState(70);
  const [isCompressing, setIsCompressing] = useState(false);
  const [globalStats, setGlobalStats] = useState({
    saved: 0,
    totalSize: 0,
    originalTotal: 0,
  });

  // Resize States
  const [resizeEnabled, setResizeEnabled] = useState(false);
  const [maintainAspect, setMaintainAspect] = useState(true);
  const [resizeWidth, setResizeWidth] = useState("");
  const [resizeHeight, setResizeHeight] = useState("");

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    show: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      x: -20,
      transition: { duration: 0.2 },
    },
  };

  const buttonHover = {
    scale: 1.02,
    boxShadow: "0px 10px 20px rgba(59, 130, 246, 0.2)",
    transition: { duration: 0.2 },
  };

  const buttonTap = { scale: 0.96 };

  // --- Handlers ---

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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  // UPDATE 1: Robust Unique ID Generation
  const handleFiles = (newFiles) => {
    const validFiles = newFiles
      .filter((file) => file.type.startsWith("image/"))
      .map((file, index) => ({
        // ID combination of Time + Name + Index + Random to prevent any collision
        id: `${Date.now()}-${file.name}-${index}-${Math.random()
          .toString(36)
          .substr(2, 9)}`,
        originalFile: file,
        preview: URL.createObjectURL(file),
        compressedFile: null,
        compressedUrl: null,
        status: "pending",
        originalSize: file.size,
        compressedSize: 0,
        savings: 0,
        progress: 0,
      }));
    setFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (id) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const downloadSingle = (file) => {
    if (!file.compressedUrl) return;
    const link = document.createElement("a");
    link.href = file.compressedUrl;
    link.download = `compressed_${file.originalFile.name}`;
    link.click();
  };

  const updateFileProgress = useCallback((id, progress) => {
    setFiles((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, progress: Math.round(progress) } : f
      )
    );
  }, []);

  const compressFile = async (fileObj) => {
    const options = {
      maxSizeMB: 2,
      useWebWorker: true,
      initialQuality: quality / 100,
      onProgress: (progress) => {
        updateFileProgress(fileObj.id, progress);
      },
    };

    if (resizeEnabled) {
      const width = parseInt(resizeWidth);
      const height = parseInt(resizeHeight);
      if (width || height) {
        options.maxWidthOrHeight = Math.max(width || 0, height || 0);
      }
    }

    try {
      const compressedBlob = await imageCompression(
        fileObj.originalFile,
        options
      );
      const url = URL.createObjectURL(compressedBlob);

      const savedPercent =
        fileObj.originalSize > 0
          ? Math.round(
              ((fileObj.originalSize - compressedBlob.size) /
                fileObj.originalSize) *
                100
            )
          : 0;

      return {
        ...fileObj,
        compressedFile: compressedBlob,
        compressedUrl: url,
        compressedSize: compressedBlob.size,
        savings: savedPercent,
        status: "done",
        progress: 100,
      };
    } catch (error) {
      console.error("Compression Error:", error);
      return { ...fileObj, status: "error", progress: 0 };
    }
  };

  const handleCompressAll = async () => {
    setIsCompressing(true);

    const filesToCompress = files.filter(
      (f) => f.status === "pending" || f.status === "error"
    );

    if (filesToCompress.length === 0) {
      setIsCompressing(false);
      return;
    }

    setFiles((prev) =>
      prev.map((f) =>
        filesToCompress.find((fc) => fc.id === f.id)
          ? { ...f, status: "processing", progress: 1 }
          : f
      )
    );

    const promises = filesToCompress.map(async (fileObj) => {
      const result = await compressFile(fileObj);
      setFiles((prev) => prev.map((f) => (f.id === result.id ? result : f)));
      return result;
    });

    await Promise.all(promises);
    setIsCompressing(false);
  };

  useEffect(() => {
    const processed = files.filter((f) => f.status === "done");
    const origTotal = processed.reduce(
      (acc, curr) => acc + curr.originalSize,
      0
    );
    const newTotal = processed.reduce(
      (acc, curr) => acc + curr.compressedSize,
      0
    );
    setGlobalStats({
      originalTotal: origTotal,
      totalSize: newTotal,
      saved:
        origTotal > 0
          ? Math.round(((origTotal - newTotal) / origTotal) * 100)
          : 0,
    });
  }, [files]);

  const downloadAll = async () => {
    const processed = files.filter((f) => f.status === "done");
    if (processed.length === 0) return;
    const zip = new JSZip();
    processed.forEach((file) => {
      zip.file(`compressed_${file.originalFile.name}`, file.compressedFile);
    });
    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "images_compressed.zip";
    link.click();
  };

  const formatBytes = (bytes) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // --- Styles ---
  const containerStyle = "bg-[#EFEEEE] dark:bg-[#292D32]";
  const textPrimary = "text-slate-700 dark:text-slate-200";
  const textMuted = "text-slate-500 dark:text-slate-400";

  const shadowOut =
    "shadow-[6px_6px_12px_#d1d9e6,-6px_-6px_12px_#ffffff] dark:shadow-[6px_6px_12px_#1e2226,-6px_-6px_12px_#34383e]";
  const shadowIn =
    "shadow-[inset_4px_4px_8px_#d1d9e6,inset_-4px_-4px_8px_#ffffff] dark:shadow-[inset_4px_4px_8px_#1e2226,inset_-4px_-4px_8px_#34383e]";

  return (
    <div
      className={`min-h-screen pt-24 pb-12 px-4 md:px-8 flex justify-center ${containerStyle} transition-colors duration-300`}
    >
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center md:text-left"
        >
          <h1
            className={`text-4xl font-extrabold ${textPrimary} tracking-tight mb-2`}
          >
            Image <span className="text-blue-500">Compressor</span>
          </h1>
          <p className={`text-sm ${textMuted}`}>
            Advanced AI-powered compression with privacy built-in.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT PANEL: Controls */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 space-y-6"
          >
            <div
              className={`rounded-3xl p-6 ${containerStyle} ${shadowOut} relative overflow-hidden`}
            >
              {/* Quality Slider */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`font-bold text-xs uppercase tracking-widest ${textMuted}`}
                  >
                    Quality Level
                  </span>
                  <motion.span
                    key={quality}
                    initial={{ scale: 1.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-blue-500 font-extrabold text-lg"
                  >
                    {quality}%
                  </motion.span>
                </div>
                <div
                  className={`h-6 rounded-full ${shadowIn} relative flex items-center px-1 cursor-pointer group`}
                >
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full h-full opacity-0 cursor-pointer z-20 absolute inset-0"
                  />
                  <motion.div
                    className="h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full absolute left-1 pointer-events-none z-10"
                    style={{
                      width: `${quality}%`,
                      maxWidth: "calc(100% - 8px)",
                    }}
                    layoutId="qualityBar"
                  />
                </div>
              </div>

              {/* Resize Toggle Section */}
              <div className="mb-8">
                <div
                  className="flex items-center justify-between mb-4 cursor-pointer group"
                  onClick={() => setResizeEnabled(!resizeEnabled)}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{
                        backgroundColor: resizeEnabled
                          ? "#3b82f6"
                          : "transparent",
                        borderColor: resizeEnabled ? "#3b82f6" : "currentColor",
                      }}
                      className={`w-5 h-5 rounded border ${textMuted} flex items-center justify-center shadow-sm`}
                    >
                      {resizeEnabled && (
                        <Check size={14} className="text-white" />
                      )}
                    </motion.div>
                    <span className={`text-sm font-bold ${textPrimary}`}>
                      Resize Image
                    </span>
                  </div>
                  {resizeEnabled && (
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMaintainAspect(!maintainAspect);
                      }}
                      className={`p-2 rounded-lg ${shadowOut} ${textMuted}`}
                      title="Toggle Aspect Ratio Lock"
                    >
                      {maintainAspect ? (
                        <Lock size={14} />
                      ) : (
                        <Unlock size={14} />
                      )}
                    </motion.button>
                  )}
                </div>

                <AnimatePresence>
                  {resizeEnabled && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="flex gap-4 pb-2">
                        <div className="flex-1 space-y-2">
                          <label className="text-[10px] uppercase font-bold text-slate-400 pl-2">
                            Width (px)
                          </label>
                          <input
                            type="number"
                            placeholder="Auto"
                            value={resizeWidth}
                            onChange={(e) => setResizeWidth(e.target.value)}
                            className={`w-full p-3 rounded-xl ${shadowIn} bg-transparent text-center text-sm font-mono outline-none focus:text-blue-500 ${textPrimary} transition-colors`}
                          />
                        </div>
                        <div className="flex-1 space-y-2">
                          <label className="text-[10px] uppercase font-bold text-slate-400 pl-2">
                            Height (px)
                          </label>
                          <input
                            type="number"
                            placeholder="Auto"
                            value={resizeHeight}
                            onChange={(e) => setResizeHeight(e.target.value)}
                            className={`w-full p-3 rounded-xl ${shadowIn} bg-transparent text-center text-sm font-mono outline-none focus:text-blue-500 ${textPrimary} transition-colors`}
                          />
                        </div>
                      </div>
                      <div className="text-[10px] text-blue-500/80 text-center mt-2 flex items-center justify-center gap-1">
                        <Maximize2 size={10} />
                        {maintainAspect
                          ? "Aspect Ratio Locked"
                          : "Free Resize Mode"}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-2">
                <motion.button
                  variants={buttonHover}
                  whileHover="hover"
                  whileTap={buttonTap}
                  onClick={handleCompressAll}
                  disabled={files.length === 0 || isCompressing}
                  className={`
                        w-full py-4 rounded-xl font-bold text-blue-500 flex items-center justify-center gap-3 transition-all cursor-pointer relative overflow-hidden group
                        ${isCompressing ? shadowIn : shadowOut} 
                        disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                >
                  <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors" />

                  <Zap
                    size={20}
                    className={isCompressing ? "animate-spin" : ""}
                    fill={isCompressing ? "currentColor" : "none"}
                  />
                  <span className="relative z-10">
                    {isCompressing ? "Processing..." : "Compress All Images"}
                  </span>
                </motion.button>

                <motion.button
                  variants={buttonHover}
                  whileHover="hover"
                  whileTap={buttonTap}
                  onClick={downloadAll}
                  disabled={globalStats.saved === 0}
                  className={`
                        w-full py-4 rounded-xl font-bold text-emerald-500 flex items-center justify-center gap-3 transition-all cursor-pointer relative overflow-hidden group
                        ${
                          globalStats.saved === 0
                            ? "opacity-50 cursor-not-allowed " + shadowOut
                            : shadowOut
                        }
                     `}
                >
                  <div className="absolute inset-0 bg-emerald-500/5 group-hover:bg-emerald-500/10 transition-colors" />
                  <Download size={20} />
                  <span className="relative z-10">Download ZIP</span>
                </motion.button>
              </div>
            </div>

            {/* Statistics Panel */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className={`rounded-3xl p-6 ${containerStyle} ${shadowOut} relative`}
            >
              <div className="flex items-center justify-between mb-6">
                <h3
                  className={`font-bold text-sm uppercase tracking-wider ${textPrimary}`}
                >
                  Real-time Stats
                </h3>
                <div className={`p-2 rounded-full ${shadowIn}`}>
                  <PieChart size={16} className={textMuted} />
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <span className={textMuted}>Files Loaded</span>
                  <span className={`font-mono font-bold ${textPrimary}`}>
                    {files.length}
                  </span>
                </div>

                {resizeEnabled && (
                  <div className="flex justify-between items-center p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <span className="text-blue-500 text-xs font-bold flex items-center gap-2">
                      <Maximize2 size={12} /> Resize Active
                    </span>
                    <span className="text-blue-500 text-xs font-mono">
                      {maintainAspect ? "Locked" : "Free"}
                    </span>
                  </div>
                )}

                <div className="h-px bg-slate-300 dark:bg-slate-700 my-2" />

                <div className="flex justify-between items-center">
                  <span className={textMuted}>Saved Space</span>
                  <div className="text-right">
                    <div className="font-mono font-bold text-emerald-500 text-lg">
                      {formatBytes(
                        globalStats.originalTotal - globalStats.totalSize
                      )}
                    </div>
                    <div className="text-[10px] text-emerald-500/70">
                      Total Reduction: {globalStats.saved}%
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT PANEL: Dropzone & List */}
          <div className="lg:col-span-8 space-y-8">
            {/* Drop Zone */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              whileHover={{ scale: 1.005 }}
              className={`
                    relative w-full h-72 rounded-3xl ${shadowIn} 
                    flex flex-col items-center justify-center overflow-hidden group cursor-pointer
                    ${
                      dragActive ? "border-2 border-blue-500 bg-blue-500/5" : ""
                    }
                `}
            >
              <input
                type="file"
                multiple
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFiles(Array.from(e.target.files));
                  }
                  e.target.value = null; // Important reset
                }}
                accept="image/*"
              />

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className={`
                        w-20 h-20 rounded-3xl ${shadowOut} flex items-center justify-center mb-6 
                        text-blue-500 z-10 bg-[#EFEEEE] dark:bg-[#292D32]
                    `}
              >
                <Upload size={36} />
              </motion.div>

              <div className="text-center z-10 px-4">
                <h3 className={`text-2xl font-bold mb-2 ${textPrimary}`}>
                  Drop images here
                </h3>
                <p className={`text-sm ${textMuted} mb-4`}>
                  or click anywhere to browse
                </p>
                <div className="inline-flex items-center gap-4 text-xs font-mono text-slate-400 bg-black/5 dark:bg-white/5 px-4 py-2 rounded-full">
                  <span>JPG</span>
                  <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                  <span>PNG</span>
                  <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                  <span>WEBP</span>
                </div>
              </div>

              <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
              </div>
            </motion.div>

            {/* Files List */}
            {files.length > 0 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                <div className="flex items-center justify-between mb-4 px-2">
                  <h3 className={`font-bold ${textPrimary}`}>
                    Queue ({files.length})
                  </h3>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFiles([])}
                    className="text-xs text-red-500 flex items-center gap-1 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Trash2 size={12} /> Clear All
                  </motion.button>
                </div>

                {/* UPDATE 2: Added max-height and overflow for scrolling */}
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                  <AnimatePresence mode="popLayout">
                    {files.map((file) => (
                      <motion.div
                        key={file.id}
                        layout
                        variants={itemVariants}
                        // UPDATE 3: Explicitly forcing start animation state
                        initial="hidden"
                        animate="show"
                        exit="exit"
                        className={`relative p-4 rounded-2xl ${containerStyle} ${shadowOut} flex flex-col sm:flex-row items-center gap-4 sm:gap-6 overflow-hidden`}
                      >
                        {/* Thumbnail */}
                        <div className="relative">
                          <div
                            className={`w-16 h-16 rounded-xl overflow-hidden bg-slate-200 dark:bg-slate-800 flex-shrink-0 border-2 ${
                              file.status === "done"
                                ? "border-emerald-500"
                                : "border-transparent"
                            } transition-colors duration-500`}
                          >
                            <img
                              src={file.preview}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {file.status === "done" && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full shadow-md"
                            >
                              <Check size={10} strokeWidth={4} />
                            </motion.div>
                          )}
                        </div>

                        {/* Info Area */}
                        <div className="flex-1 min-w-0 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                          <div className="space-y-1">
                            <h4
                              className={`font-bold text-sm truncate ${textPrimary}`}
                              title={file.originalFile.name}
                            >
                              {file.originalFile.name}
                            </h4>
                            <div className="flex items-center gap-2 text-xs">
                              <span className={`${textMuted}`}>
                                {formatBytes(file.originalSize)}
                              </span>
                              {file.status === "done" && (
                                <>
                                  <ArrowRight size={10} className={textMuted} />
                                  <span className="font-bold text-emerald-500">
                                    {formatBytes(file.compressedSize)}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Dynamic Progress Bar */}
                          <div className="w-full">
                            {file.status === "processing" ||
                            file.status === "pending" ? (
                              <div className="relative pt-1">
                                <div
                                  className={`overflow-hidden h-2.5 text-xs flex rounded-full ${shadowIn}`}
                                >
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${file.progress}%` }}
                                    transition={{
                                      type: "spring",
                                      stiffness: 50,
                                    }}
                                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                                  />
                                </div>
                                <div className="flex justify-between mt-1">
                                  <span className="text-[10px] text-blue-500 font-bold">
                                    {file.status === "pending"
                                      ? "Ready"
                                      : "Processing"}
                                  </span>
                                  <span className="text-[10px] text-blue-500">
                                    {Math.round(file.progress)}%
                                  </span>
                                </div>
                              </div>
                            ) : file.status === "done" ? (
                              <div className="flex items-center justify-between sm:justify-end gap-3">
                                <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-xs font-bold border border-emerald-500/20">
                                  Saved {file.savings}%
                                </span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-red-500 bg-red-500/10 px-2 py-1 rounded">
                                <AlertCircle size={12} />
                                <span className="text-xs font-bold">Error</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 border-slate-200 dark:border-slate-700 pt-3 sm:pt-0 mt-1 sm:mt-0">
                          {file.status === "done" && (
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() => downloadSingle(file)}
                              className={`p-2.5 rounded-xl text-emerald-600 hover:text-emerald-500 transition-colors ${shadowOut} active:${shadowIn}`}
                              title="Download this image"
                            >
                              <Download size={16} />
                            </motion.button>
                          )}
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFile(file.id)}
                            className={`p-2.5 rounded-xl text-red-400 hover:text-red-500 transition-colors ${shadowOut} active:${shadowIn}`}
                            title="Remove"
                          >
                            <X size={16} />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {files.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-10 opacity-40 pointer-events-none"
              >
                <FileImage
                  size={48}
                  className={`mx-auto mb-2 ${textPrimary}`}
                />
                <p className={textMuted}>No images in queue</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCompressor;
