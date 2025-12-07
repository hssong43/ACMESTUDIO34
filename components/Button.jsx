import Link from 'next/link';

export default function Button({ children, href, variant = 'primary', className = '', ...props }) {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2";
  
  const variants = {
    primary: "bg-accent text-dark hover:bg-yellow-400 shadow-lg",
    secondary: "bg-transparent border-2 border-white text-white hover:bg-white hover:text-dark",
    outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white",
  };

  if (href) {
    return (
      <Link href={href} className={`${baseStyle} ${variants[variant]} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}