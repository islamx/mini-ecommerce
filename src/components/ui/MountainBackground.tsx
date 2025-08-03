function MountainBackground() {
  return (
    <div className="absolute inset-0 opacity-20">
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-gray-300 to-transparent rounded-t-full transform scale-x-150"></div>
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-gray-400 to-transparent rounded-t-full transform scale-x-200 translate-x-1/4"></div>
    </div>
  );
}

export default MountainBackground; 