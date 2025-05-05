import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import FormularioDocentes from './FormularioDocentes';
import TablaDocentes from './TablaDocentes';
import { FaUsers, FaLayerGroup, FaEye, FaPen } from 'react-icons/fa';

export default function Index({ ListaDocentes }) {
    const [view, setView] = useState(null); // Estado para controlar qué vista se muestra

    // Función para manejar clics en las tarjetas y cambiar de vista
    const handleCardClick = (value) => {
        setView(value); // Cambia la vista según la tarjeta seleccionada
    };

    const renderContent = () => {
        // Renderiza el contenido basado en la vista seleccionada
        if (view === 'agregar') {
            return (
                <>
                    <FormularioDocentes editingDocente={null}  ></FormularioDocentes>
                </>

            );
        } else if (view === 'lista') {

            return (
                <>
                    <TablaDocentes docentes={ListaDocentes}></TablaDocentes>
                </>

            );


        } else {
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
                    Docentes
                </h2>
            }
        >
            <Head title="SGMCI" />

            {/* Fondo con gradiente suave */}
            <div className="py-12 bg-gradient-to-b from-[#800020] to-[#F5D0A9] min-h-screen flex items-center justify-center">
                <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
                    {/* Card Principal - Opciones */}
                    <div className="overflow-hidden bg-amber-50 shadow-xl sm:rounded-lg mb-10">
                        <div className="p-8 text-gray-800 text-center">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 justify-center mx-auto">
                                {/* Card Agregar Docente */}
                                <div
                                    className="bg-[#800020] p-6 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#6A4E3C] transition-all cursor-pointer "
                                    onClick={() => handleCardClick('agregar')}
                                    aria-label="Agregar Docente"
                                    tabIndex="0"
                                >
                                    <FaUsers className="text-3xl md:text-4xl text-[#F5D0A9] mb-2 md:mb-4 mx-auto transition-transform transform hover:scale-110" />
                                    <h4 className="text-lg font-semibold text-[#F5D0A9]">Agregar Docente</h4>
                                    <p className="text-[#F5D0A9] text-sm">Llena el formulario para agregar un nuevo docente.</p>
                                </div>

                                {/* Card Lista de Docentes */}
                                <div
                                    className="bg-[#800020] p-6 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#6A4E3C] transition-all cursor-pointer "
                                    onClick={() => handleCardClick('lista')}
                                    aria-label="Lista Docentes"
                                    tabIndex="0"
                                >
                                    <FaLayerGroup className="text-3xl md:text-4xl text-[#F5D0A9] mb-2 md:mb-4 mx-auto transition-transform transform hover:scale-110" />
                                    <h4 className="text-lg font-semibold text-[#F5D0A9]">Lista de Docentes</h4>
                                    <p className="text-[#F5D0A9] text-sm">Consulta y administra la lista de docentes registrados.</p>
                                </div>
                            </div>

                            {/* Mostrar el contenido dependiendo de la vista seleccionada */}
                            <div className="mt-8">
                                {renderContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}