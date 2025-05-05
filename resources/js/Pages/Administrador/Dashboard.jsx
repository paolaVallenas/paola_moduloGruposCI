import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FaWpforms, FaChalkboardTeacher, FaLanguage, FaChartBar, FaUsers } from 'react-icons/fa';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
        header={
            <h2 className="text-3xl font-bold leading-tight text-white bg-gradient-to-r from-[#800020] to-[#6A4E3C] p-4 rounded-lg shadow-lg text-center">
                ¡ Bienvenido Administrador ! 
            </h2>
        }
        >
            <Head title="SGMCI" />

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
                                        src="/imagenes/2.jpg"
                                        alt="Logo de la aplicación"
                                        className="w-full h-40 object-contain"
                                    />
                                </div>

                                {/* Imagen 2 - Idiomas */}
                                <div className="overflow-hidden rounded-lg shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105">
                                    <img
                                        src="/imagenes/3.jpeg"
                                        alt="Idiomas"
                                        className="w-full h-40 object-contain"
                                    />
                                </div>

                                {/* Imagen 3 - Curso de Inglés */}
                                <div className="overflow-hidden rounded-lg shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-105">
                                    <img
                                        src="/imagenes/4.png"
                                        alt="Curso de Inglés"
                                        className="w-full h-40 object-contain"
                                    />
                                </div>
                            </div>

                            
                            
                            <h3 className="text-2xl font-semibold mb-4 text-[#800020]">
                                Estas serán tus funciones dentro del sistema :)
                            </h3>
                            <p className="mb-6 text-[#4B4B4B]">
                                Aquí podrás gestionar todas las configuraciones necesarias para el correcto funcionamiento de la aplicación.
                                Utiliza las opciones en el menú para navegar entre las distintas secciones y realizar las acciones que necesites.
                            </p>

                            {/* Cards Section - Funciones Administrativas */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                                {/* Card Verificar Formularios */}
                                <div
                                    className="bg-[#800020] p-4 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#6A4E3C] transition-all"
                                >
                                    <FaWpforms className="text-[#F5D0A9] text-4xl mb-4 transition-transform transform hover:scale-110 hover:text-[#F2C49B]" />
                                    <h4 className="text-lg font-semibold text-[#F5D0A9]">Verificar Formularios</h4>
                                    <p className="text-[#F5D0A9] text-sm">Revisar formularios de inscripción y matrícula</p>
                                </div>

                                {/* Card Registrar Docentes */}
                                <div
                                    className="bg-[#800020] p-4 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#6A4E3C] transition-all"
                                >
                                    <FaChalkboardTeacher className="text-[#F5D0A9] text-4xl mb-4 transition-transform transform hover:scale-110 hover:text-[#F2C49B]" />
                                    <h4 className="text-lg font-semibold text-[#F5D0A9]">Registrar Docentes</h4>
                                    <p className="text-[#F5D0A9] text-sm">Agregar y gestionar información de profesores</p>
                                </div>

                                {/* Card Ciclos e Idiomas */}
                                <div
                                    className="bg-[#800020] p-4 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#6A4E3C] transition-all"
                                >
                                    <FaLanguage className="text-[#F5D0A9] text-4xl mb-4 transition-transform transform hover:scale-110 hover:text-[#F2C49B]" />
                                    <h4 className="text-lg font-semibold text-[#F5D0A9]">Ciclos e Idiomas</h4>
                                    <p className="text-[#F5D0A9] text-sm">Crear nuevos ciclos, grupos e idiomas</p>
                                </div>
                            </div>

                            {/* Additional Cards Section */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-6">
                                {/* Card Estadísticas */}
                                <div
                                    className="bg-[#800020] p-4 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#6A4E3C] transition-all"
                                >
                                    <FaChartBar className="text-[#F5D0A9] text-4xl mb-4 transition-transform transform hover:scale-110 hover:text-[#F2C49B]" />
                                    <h4 className="text-lg font-semibold text-[#F5D0A9]">Estadísticas</h4>
                                    <p className="text-[#F5D0A9] text-sm">Consultar reportes y análisis de datos</p>
                                </div>

                                {/* Card Gestión de Usuarios */}
                                <div
                                    className="bg-[#800020] p-4 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#6A4E3C] transition-all"
                                >
                                    <FaUsers className="text-[#F5D0A9] text-4xl mb-4 transition-transform transform hover:scale-110 hover:text-[#F2C49B]" />
                                    <h4 className="text-lg font-semibold text-[#F5D0A9]">Gestión de Usuarios</h4>
                                    <p className="text-[#F5D0A9] text-sm">Administrar cuentas de usuarios del sistema</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}