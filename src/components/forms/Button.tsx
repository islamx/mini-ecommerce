"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="bg-orange-600 text-white py-2 px-4 rounded hover:bg-orange-700 transition-colors disabled:opacity-50"
    >
      {children}
    </button>
  );
}
