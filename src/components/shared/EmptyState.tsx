import { Search, Package, ShoppingCart, Heart, AlertCircle, Info } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  icon: "search" | "products" | "cart" | "favorites" | "error" | "info" | "custom";
  customIcon?: React.ReactNode;
  primaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export default function EmptyState({ 
  title, 
  description, 
  icon, 
  customIcon,
  primaryAction,
  secondaryAction 
}: EmptyStateProps) {
  const getIcon = () => {
    if (customIcon) return customIcon;
    
    const iconClasses = "w-8 h-8 text-gray-400";
    
    switch (icon) {
      case "search":
        return <Search className={iconClasses} />;
      case "products":
        return <Package className={iconClasses} />;
      case "cart":
        return <ShoppingCart className={iconClasses} />;
      case "favorites":
        return <Heart className={iconClasses} />;
      case "error":
        return <AlertCircle className={iconClasses} />;
      case "info":
        return <Info className={iconClasses} />;
      default:
        return <Package className={iconClasses} />;
    }
  };

  const renderAction = (action: { label: string; href?: string; onClick?: () => void }, isPrimary = false) => {
    const baseClasses = "inline-flex items-center justify-center px-4 py-2 rounded-lg transition-colors";
    const primaryClasses = "bg-orange-600 text-white hover:bg-orange-700";
    const secondaryClasses = "border border-gray-300 text-gray-700 hover:bg-gray-50";
    
    const className = `${baseClasses} ${isPrimary ? primaryClasses : secondaryClasses}`;
    
    if (action.href) {
      return (
        <Link href={action.href} className={className}>
          {action.label}
        </Link>
      );
    }
    
    return (
      <button onClick={action.onClick} className={className}>
        {action.label}
      </button>
    );
  };

  return (
    <div className="text-center py-12 px-4">
      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        {getIcon()}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {description}
      </p>
      {(primaryAction || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {primaryAction && renderAction(primaryAction, true)}
          {secondaryAction && renderAction(secondaryAction, false)}
        </div>
      )}
    </div>
  );
} 