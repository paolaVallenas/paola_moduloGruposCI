import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    icon: Icon, // Soporte para un icono opcional
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex items-center justify-between border-b-4 px-6 py-3 text-base font-medium transition duration-300 ease-in-out focus:outline-none rounded-lg
                ${active
                    ? 'border-indigo-600 text-gray-900 bg-indigo-100 shadow-lg hover:bg-indigo-200 focus:border-indigo-700' // Fondo al estar activo
                    : 'border-transparent text-gray-600 hover:border-red-900 hover:bg-[#9C4C4C]  hover:text-white focus:border-indigo-500 focus:bg-indigo-50 focus:text-gray-900'} 
                ${className}`}
            role="navigation" // Mejora de accesibilidad
            aria-current={active ? 'page' : undefined} // Indica la página activa
        >
            <span className={`flex-1 ${active ? 'font-bold' : 'font-normal'} flex items-center`}>
                {Icon && (
                    <Icon
                        className={`mr-5 h-10 w-10 ${active ? 'text-indigo-600' : 'text-gray-600'} transition-all duration-300`} 
                        aria-hidden="true"
                    />
                )}
                {children}
            </span>
            {active && (
                <span className="ml-2 text-xs text-indigo-600" aria-hidden="true">✓</span> // Icono de verificación al estar activo
            )}
        </Link>
    );
}