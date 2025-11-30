import React from 'react';

export const Spinner: React.FC = () => (
  <div className="flex justify-center items-center p-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
  </div>
);

export const ProductSkeleton: React.FC = () => (
  <div className="animate-pulse bg-white rounded-xl border border-gray-100 p-4 h-80">
    <div className="bg-gray-200 h-48 w-full rounded-md mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
  </div>
);