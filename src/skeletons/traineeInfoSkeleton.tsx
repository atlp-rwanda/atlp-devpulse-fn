import React from 'react';
import { ButtonSkeleton } from './buttonSkeleton';

const SkeletonRow = () => (
  <div className="flex flex-row gap-4 w-full">
    {[...Array(2)].map((_, i) => (
      <div key={i} className="w-1/2">
        <div className="bg-gray-600 h-4 mb-2 rounded"></div>
        <div className="bg-gray-600 h-10 rounded"></div>
      </div>
    ))}
  </div>
);

const SkeletonProfile = () => (
  <div className="flex flex-row gap-4 w-full">
    {[...Array(2)].map((_, i) => (
      <div key={i} className="w-1/2">
        <div className="bg-gray-600 h-3 mb-2 rounded"></div>
        <div className="flex flex-row">
          {[...Array(2)].map((_, j) => (
            <div key={j} className="flex flex-row items-center mr-2">
              <div className="bg-gray-600 h-10 w-10 rounded-full"></div>
              <div className="bg-gray-600 h-2 w-16 mb-2 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const ApplicantInfoSkeleton = () => (
  <div className="space-y-6 p-4 animate-pulse w-[80%] mx-20">
    {[...Array(4)].map((_, i) => (
      <div key={i} className='bg-gray-900 p-4 mb-10'>
        <div className="bg-gray-600 h-4 mb-2 rounded"></div>
        <div className="animate-pulse flex flex-col gap-4">
          <SkeletonRow />
          <SkeletonRow />
        </div>
      </div>
    ))}

    <div className='bg-gray-900 p-4 mb-10'>
      <div className="bg-gray-600 h-4 mb-2 rounded"></div>
      <div className="animate-pulse flex flex-col gap-4">
        <SkeletonProfile />
        <SkeletonProfile />
      </div>
    </div>

    <div className="bg-gray-900 flex items-start h-10 p-4 w-full mb-10 rounded">
      <div className="bg-gray-600 h-3 mb-2 rounded"></div>
      <div className='flex flex-row items-start'>
        <div className="bg-gray-600 h-10 w-1/5 mb-2 rounded"></div>
        <div className="bg-gray-600 h-10 w-1/5 mb-2 rounded ml-4"></div>
      </div>
    </div>
  </div>
);
