export const SidebarSkeleton = () => {
  return (
    <div className="w-64 h-screen p-4 bg-gray-800 space-y-4 fixed h-full">
      <div className="animate-pulse">
        <div className="bg-gray-600 h-8 w-10 rounded ml-48"></div>
      </div>

      {/* Pulse animation for 15 sidebar items */}
      <div className="space-y-4">
        {Array(15) 
          .fill(0)
          .map((_, i) => (
            <div key={i} className="animate-pulse flex items-center space-x-4">
              <div className="bg-gray-600 w-6 h-6 rounded-full"></div>
              <div className="bg-gray-600 w-40 h-4 rounded"></div>
            </div>
          ))}
      </div>
    </div>
  );
};
