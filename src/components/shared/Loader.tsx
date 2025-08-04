interface LoaderProps {
  text?: string;
  size?: "sm" | "md" | "lg";
}

export default function Loader({ text = "Loading...", size = "md" }: LoaderProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  };

  return (
    <div className="flex flex-col justify-center items-center py-12 min-h-[200px]">
      <div className="flex flex-col items-center">
        <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-amber-500 rounded-full animate-spin`}></div>
        {text && (
          <div className="mt-4 text-center">
            <p className="text-gray-600 font-medium">{text}</p>
          </div>
        )}
      </div>
    </div>
  );
} 