export default function ApplicationLogo(props) {
    return (
        <div className="relative flex justify-center items-center w-50 h-50 p-1">
            {/* Imagen del Logo con transiciones suaves */}
            <img
                src="/imagenes/logo.png" // Ruta de tu imagen
                alt="Logo"
                className="w-50 h-20 object-contain rounded-full shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-130"
                {...props}
            />
        </div>
    );
}
