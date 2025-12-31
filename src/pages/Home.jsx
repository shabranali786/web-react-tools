import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const tools = [
    {
      id: 1,
      name: "Image Compressor",
      description: "Reduce image file size while maintaining quality.",
      path: "/image-compressor",
      icon: (
        <svg className="w-8 h-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: "bg-blue-50 hover:bg-blue-100"
    },
    // Future tools can be added here
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Useful Developer Tools
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            A collection of free, browser-based utilities to help you with your daily tasks.
          </p>
        </div>

        <div className="mt-16 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link 
              key={tool.id} 
              to={tool.path}
              className={`relative group rounded-2xl p-6 ${tool.color} border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-white shadow-sm ring-1 ring-gray-200">
                    {tool.icon}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {tool.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Try it now &rarr;
              </div>
            </Link>
          ))}
          
          {/* Placeholder for "Coming Soon" */}
          <div className="relative rounded-2xl p-6 bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center">
            <h3 className="text-lg font-medium text-gray-400">More tools coming soon...</h3>
            <p className="mt-1 text-sm text-gray-400">Image Resizer, Converter, and more.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;