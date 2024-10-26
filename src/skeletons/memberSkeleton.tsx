import { ButtonSkeleton } from "./buttonSkeleton";

export const MemberSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array(8)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="animate-pulse flex items-center space-x-8">
            <div className="bg-gray-600 w-10 h-10 rounded-full"></div>
            <div className="bg-gray-600 h-6 rounded mr-6 flex-1"></div>
            <div className="bg-gray-600 h-6 rounded w-1/5 md:w-1/6 lg:w-1/8"></div>
            <div className="bg-gray-600 h-6 rounded w-1/5 md:w-1/8 lg:w-1/8"></div>
            <div className="bg-gray-600 h-6 rounded w-1/5 md:w-1/8 lg:w-1/8"></div>
          </div>
        ))}
    </div>
  );
};
