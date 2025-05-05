import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaUserGraduate} from 'react-icons/fa';
import React, { useState } from 'react';
import ListaUsuarios from './ListaUsuarios';



export default function Index({usuarios,estudiantes,certificados}) {
    const [view, setView] = useState(null); // Estado para controlar qué vista se muestra
    // Función para manejar clics en las tarjetas y cambiar de vista
    const handleCardClick = (value) => {
        setView(value); 
    };
    const renderContent = () => {
        // Verifica qué vista está seleccionada
        if (view === 'lista') {
            return (
                <>
                    <ListaUsuarios ListaUsuarios={usuarios}></ListaUsuarios>
                </>
            );
        }
        else {
            return (
                <div className="text-center p-6">
                    <h3 className="text-2xl text-[#800020]">Selecciona una opción para ver más detalles.</h3>
                </div>
            );
        }
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-3xl font-bold leading-tight text-white bg-gradient-to-r from-[#800020] to-[#6A4E3C] p-4 rounded-lg shadow-lg text-center">
                   Usuarios
                </h2>
            }
        >
            <Head title="SGMCI" />
            <div className="py-12 bg-gradient-to-b from-[#800020] to-[#F5D0A9] min-h-screen flex items-center justify-center">
                <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
                    {/* Card Principal - Bienvenida */}
                    <div className="overflow-hidden bg-amber-50 shadow-xl sm:rounded-lg mb-10">
                        <div className="p-8 text-gray-800 text-center">

                            {/* Cards Section - Centrado */}
                            <div className="flex justify-center sm:grid-cols-2 gap-6 mx-auto">

                                {/* Card Lista de usuarios */}
                                <div
                                    className="bg-[#800020] p-6 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#6A4E3C] transition-all cursor-pointer max-w-xs mx-auto"
                                    onClick={() => handleCardClick('lista')}
                                    aria-label="Lista Usuarios"
                                    tabIndex="0"
                                >
                                    <FaUserGraduate className="text-[#F5D0A9] text-4xl mb-4 transition-transform transform hover:scale-110 hover:text-[#F2C49B]" />
                                    <h4 className="text-lg font-semibold text-[#F5D0A9]">Lista Usuarios</h4>
                                    <p className="text-[#F5D0A9] text-sm">Ver los usuarios actuales del sistema</p>
                                </div>
                                
                            </div>

                            {/* Mostrar el contenido dependiendo de la vista seleccionada */}
                            {renderContent()}

                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
