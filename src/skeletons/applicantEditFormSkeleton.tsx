import React from 'react';
import { ButtonSkeleton } from './buttonSkeleton'; 

const SkeletonInput = () => (
  <div className="w-1/2">
    <div className="bg-gray-600 h-4 mb-2 rounded"></div>
    <div className="bg-gray-600 h-10 rounded"></div>
  </div>
);

const SkeletonRow = () => (
  <div className="flex flex-row gap-4 w-full">
    <SkeletonInput />
    <SkeletonInput />
  </div>
);

const SkeletonOption = () => (
  <div className="flex flex-row items-center">
    <div className="bg-gray-600 h-4 w-4 rounded-full mr-2"></div>
    <div className="bg-gray-600 h-2 w-16 mb-2 rounded"></div>
  </div>
);

const SkeletonOptionGroup = () => (
  <div className="flex flex-row">
    <SkeletonOption />
    <div className="flex flex-row items-center ml-10">
      <SkeletonOption />
    </div>
  </div>
);

export const EditApplicantInfoSkeleton = () => {
  return (
    <div className="space-y-6 p-4 animate-pulse">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="animate-pulse flex flex-col gap-4">
          <SkeletonRow />
          <SkeletonRow />
        </div>
      ))}

      <div className="animate-pulse flex flex-col gap-4">
        <SkeletonRow />
        <SkeletonRow />
      </div>

      <div className="animate-pulse flex flex-col gap-4">
        {[...Array(2)].map((_, index) => (
          <div key={index} className="flex flex-row gap-4 w-full">
            <div className="w-1/2">
              <div className="bg-gray-600 h-3 mb-2 rounded"></div>
              <SkeletonOptionGroup />
            </div>
            <div className="w-1/2">
              <div className="bg-gray-600 h-3 mb-2 rounded"></div>
              <SkeletonOptionGroup />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-row items-start">
        <div className="bg-gray-600 h-10 w-1/5 mb-2 rounded"></div>
        <div className="bg-gray-600 h-10 w-1/5 mb-2 rounded ml-4"></div>
      </div>
    </div>
  );
};
