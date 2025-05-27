export const Button = ({ children, className = "", ...props}) => (
    <button
    className={`bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition ${className}`}
    {...props}
  >
    {children}
    </button>
);