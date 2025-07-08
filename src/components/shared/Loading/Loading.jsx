const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center transition-all duration-300">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#4C3AFF]"></div>
      <p className="mt-6 text-lg font-medium animate-pulse">
        Loading, please wait...
      </p>
    </div>
  );
};

export default Loading;
