import React, { useState } from 'react';

const ImageCompressor = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState(80);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Image Compressor
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Compress your images efficiently without losing quality.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Upload Area */}
          <div className="p-8">
            <div
              className={`relative border-4 border-dashed rounded-xl p-12 text-center transition-colors duration-300 ${
                dragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleChange}
                accept="image/*"
              />
              <div className="space-y-4">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="text-gray-600">
                  <span className="font-medium text-blue-600 hover:text-blue-500">
                    Upload a file
                  </span>{" "}
                  or drag and drop
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          {/* Controls & Preview (Placeholder for logic) */}
          {file && (
            <div className="border-t border-gray-200 p-8 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Settings */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="quality" className="block text-sm font-medium text-gray-700">
                        Compression Quality: {quality}%
                      </label>
                      <input
                        type="range"
                        id="quality"
                        min="1"
                        max="100"
                        value={quality}
                        onChange={(e) => setQuality(e.target.value)}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-2"
                      />
                    </div>
                    <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
                        <span className="text-sm text-gray-500">Selected File:</span>
                        <span className="font-medium text-gray-900 truncate max-w-[150px]">{file.name}</span>
                    </div>
                  </div>
                </div>

                {/* Action */}
                <div className="flex flex-col justify-center items-center space-y-4">
                  <button className="w-full py-3 px-6 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105">
                    Compress Image
                  </button>
                  <p className="text-sm text-gray-500 text-center">
                    Estimated reduction: ~{(100 - quality) * 0.8}%
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCompressor;
