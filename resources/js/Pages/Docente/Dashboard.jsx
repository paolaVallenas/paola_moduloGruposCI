import AuthenticatedLayoutDoc from '@/Layouts/AuthenticatedLayoutDoc';
import { Head } from '@inertiajs/react';
import { FaUsers, FaFileAlt, FaEdit, FaFilePdf , FaClipboardList } from 'react-icons/fa';
import { router } from '@inertiajs/react';

export default function Dashboard() {
    // Function to handle navigation to different sections
    

    return (
        <AuthenticatedLayoutDoc
            header={
                <h2 className="text-3xl font-bold leading-tight text-white bg-gradient-to-r from-[#800020] to-[#6A4E3C] p-4 rounded-lg shadow-lg text-center">
                    ¡ Bienvenido Docente !
                </h2>
            }
        >
            <Head title="Panel de Control - Centro de Idiomas" />

            {/* Fondo con gradiente suave de granate a color piel */}
            <div className="py-12 bg-gradient-to-b from-[#800020] to-[#F5D0A9] min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Card Principal - Bienvenida */}
                    <div className="overflow-hidden bg-amber-50 shadow-xl sm:rounded-lg mb-10">
                        <div className="p-8 text-gray-800 text-center">
                            {/* Sección de imágenes */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                                {/* Imagen 1 - Logo */}
                                <div className="overflow-hidden rounded-lg shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105">
                                    <img
                                        src="/imagenes/profe.jpg"
                                        alt="Logo de la aplicación"
                                        className="w-full h-40 object-contain"
                                    />
                                </div>

                                {/* Imagen 2 - Idiomas */}
                                <div className="overflow-hidden rounded-lg shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105">
                                    <img
                                        src="/imagenes/profe2.jpg"
                                        alt="Idiomas"
                                        className="w-full h-40 object-contain"
                                    />
                                </div>

                                {/* Imagen 3 - Curso de Inglés */}
                                <div className="overflow-hidden rounded-lg shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105">
                                    <img
                                        src="/imagenes/profesor.jpg"
                                        alt="Curso de Inglés"
                                        className="w-full h-40 object-contain"
                                    />
                                </div>
                            </div>

                            <h3 className="text-2xl font-semibold mb-4 text-[#6A4E3C]">
                                Funciones del Docente
                            </h3>
                            <p className="mb-6 text-[#4B4B4B]">
                                Accede a las principales funcionalidades para gestionar tus cursos y estudiantes.
                            </p>

                            {/* Cards Section - Funciones */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                                {/* Card Lista de Estudiantes */}
                                <div
                                    className="bg-[#800020] p-4 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#6A4E3C] transition-all cursor-pointer"
                                    
                                    aria-label="Lista de Estudiantes"
                                    tabIndex="0"
                                >
                                    <FaUsers className="text-[#F5D0A9] text-4xl mb-4 transition-transform transform hover:scale-110 hover:text-[#F2C49B]" />
                                    <h4 className="text-lg font-semibold text-[#F5D0A9]">Lista de Estudiantes</h4>
                                    <p className="text-[#F5D0A9] text-sm">Consulta y administra los estudiantes de tus grupos.</p>
                                </div>

                                {/* Card Generar Reportes */}
                                <div
                                    className="bg-[#800020] p-4 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#6A4E3C] transition-all cursor-pointer"
                                    
                                    aria-label="Generar Reportes"
                                    tabIndex="0"
                                >
                                    <FaFileAlt className="text-[#F5D0A9] text-4xl mb-4 transition-transform transform hover:scale-110 hover:text-[#F2C49B]" />
                                    <h4 className="text-lg font-semibold text-[#F5D0A9]">Generar Reportes</h4>
                                    <p className="text-[#F5D0A9] text-sm">Crea informes sobre la lista de estudiantes de cada grupo.</p>
                                </div>

                                {/* Card Registrar Notas */}
                                <div
                                    className="bg-[#800020] p-4 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#6A4E3C] transition-all cursor-pointer"
                                   
                                    aria-label="Registrar Notas"
                                    tabIndex="0"
                                >
                                    <FaEdit className="text-[#F5D0A9] text-4xl mb-4 transition-transform transform hover:scale-110 hover:text-[#F2C49B]" />
                                    <h4 className="text-lg font-semibold text-[#F5D0A9]">Registrar Calificaciones</h4>
                                    <p className="text-[#F5D0A9] text-sm">Ingresa calificaciones finales de los estudiantes.</p>
                                </div>
                            </div>

                            {/* Additional Cards Section */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
                                {/* Card Estadísticas */}
                                <div
                                    className="bg-[#800020] p-4 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#6A4E3C] transition-all cursor-pointer"
                                    
                                    aria-label="Estadísticas"
                                    tabIndex="0"
                                >
                                    <FaFilePdf className="text-[#F5D0A9] text-4xl mb-4 transition-transform transform hover:scale-110 hover:text-[#F2C49B]"  /> 
                                   
                                    <h4 className="text-lg font-semibold text-[#F5D0A9]">Generación de PDF</h4>
                                    <p className="text-[#F5D0A9] text-sm">Visualiza e imprime la lista de estudiantes de cada grupo.</p>
                                </div>

                                {/* Card Gestión de Cursos */}
                                <div
                                    className="bg-[#800020] p-4 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#6A4E3C] transition-all cursor-pointer"
                                    onClick={() => handleCardClick('/gestion-cursos')}
                                    aria-label="Gestión de Cursos"
                                    tabIndex="0"
                                >
                                    <FaClipboardList className="text-[#F5D0A9] text-4xl mb-4 transition-transform transform hover:scale-110 hover:text-[#F2C49B]" />
                                    <h4 className="text-lg font-semibold text-[#F5D0A9]">Gestión de Grupos</h4>
                                    <p className="text-[#F5D0A9] text-sm">Administra los grupos que estas a cargo.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayoutDoc>
    );
}