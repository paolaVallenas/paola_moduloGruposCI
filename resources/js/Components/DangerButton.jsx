export default function DangerButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-6 py-3 text-sm font-semibold text-white uppercase tracking-wide transition-all duration-200 ease-in-out transform hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg focus:shadow-lg ${className}`
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
