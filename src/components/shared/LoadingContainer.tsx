interface LoadingContainerProps {
  text?: string;
  minHeight?: string;
}

export default function LoadingContainer({ 
  text = "Loading...", 
  minHeight = "400px" 
}: LoadingContainerProps) {
  return (
    <div className={`min-h-[${minHeight}] flex items-center justify-center`}>
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-amber-500 rounded-full animate-spin mx-auto"></div>
        {text && (
          <div className="mt-4 text-center">
            <p className="text-gray-600 font-medium">{text}</p>
          </div>
        )}
      </div>
    </div>
  );
} 