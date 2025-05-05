import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaUserGraduate, FaCreditCard, FaRegListAlt, FaPen } from 'react-icons/fa';
import React, { useState } from 'react';
import VistaMatriculas from './VistaMatriculas';
import VistaFormularios from './VistaFormularios';
import VistaPagos from './VistaPagos';
import IndexFormulario from '../Formulario/IndexFormulario';

export default function Index({ ListaMatriculas, ListaFormulariosMatricula, ListaFormularios }) {
    const [view, setView] = useState(null); // Estado para controlar qué vista se muestra

    // Función para manejar clics en las tarjetas y cambiar de vista
    const handleCardClick = (value) => {
        setView(value); // Establece la vista de la tarjeta que fue clickeada
    };

    const renderContent = () => {
        // Verifica qué vista está seleccionada y renderiza el contenido adecuado
        switch (view) {
            case 'Gestión Matriculas':
                return <VistaMatriculas matriculas={ListaMatriculas} />;
            case 'Verificacion Mensualidad':
                return <VistaFormularios ListaFormularios={ListaFormulariosMatricula} />;
            case 'Gestion Pagos':
                return <VistaPagos pagos={ListaMatriculas} />;
            case 'Verificacion Formularios':
                return <IndexFormulario ListaFormularios={ListaFormularios} />;
            default:
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
                    Gestion de Matriculas y Pagos
                </h2>
            }
        >
            <Head title="Panel de Control - Centro de Idiomas" />

            {/* Fondo con gradiente suave de granate a color piel */}
            <div className="py-12 bg-gradient-to-b from-[#800020] to-[#F5D0A9] min-h-screen flex items-center justify-center">
                <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
                    {/* Card Principal - Bienvenida */}
                    <div className="overflow-hidden bg-amber-50 shadow-xl sm:rounded-lg mb-10">
                        <div className="p-8 text-gray-800 text-center">

                            {/* Cards Section - Centrado */}
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 justify-center mx-auto">
                                {/* Card Verificacion Mensualidad */}
                                <div
                                    className="bg-[#800020] p-6 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#6A4E3C] transition-all cursor-pointer max-w-xs mx-auto"
                                    onClick={() => handleCardClick('Verificacion Mensualidad')}
                                    aria-label="Verificacion"
                                    tabIndex="0"
                                >
                                    <FaUserGraduate className="text-[#F5D0A9] text-4xl mb-4 transition-transform transform hover:scale-110 hover:text-[#F2C49B]" />
                                    <h4 className="text-lg font-semibold text-[#F5D0A9]">Verificación de Formulario de Mensualidades</h4>
                                    <p className="text-[#F5D0A9] text-sm">Verifica y aprueba los formularios de matrículas-mensualidades realizados por los estudiantes, incluyendo los comprobantes de pago.</p>
                                </div>
                                {/* Card Gestión de Matrículas */}
                                <div
                                    className="bg-[#800020] p-6 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#6A4E3C] transition-all cursor-pointer max-w-xs mx-auto"
                                    onClick={() => handleCardClick('Gestión Matriculas')}
                                    aria-label="Gestión Matriculas"
                                    tabIndex="0"
                                >
                                    <FaUserGraduate className="text-[#F5D0A9] text-4xl mb-4 transition-transform transform hover:scale-110 hover:text-[#F2C49B]" />
                                    <h4 className="text-lg font-semibold text-[#F5D0A9]">Gestión de Matrículas</h4>
                                    <p className="text-[#F5D0A9] text-sm">Gestiona y visualiza las matrículas de los estudiantes, junto con toda la información asociada.</p>
                                </div>

                                {/* Card Gestión de Pagos */}
                                <div
                                    className="bg-[#800020] p-6 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#6A4E3C] transition-all cursor-pointer max-w-xs mx-auto"
                                    onClick={() => handleCardClick('Gestion Pagos')}
                                    aria-label="Gestión Matriculas"
                                    tabIndex="0"
                                >
                                    <FaCreditCard className="text-[#F5D0A9] text-4xl mb-4 transition-transform transform hover:scale-110 hover:text-[#F2C49B]" />
                                    <h4 className="text-lg font-semibold text-[#F5D0A9]">Gestión de Pagos</h4>
                                    <p className="text-[#F5D0A9] text-sm">Gestiona y visualiza los pagos de los estudiantes, junto con toda la información asociada.</p>
                                </div>
                                {/* Card Gestión de Formularios */}
                                <div
                                    className="bg-[#800020] p-6 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#6A4E3C] transition-all cursor-pointer max-w-xs mx-auto"
                                    onClick={() => handleCardClick('Verificacion Formularios')}
                                    aria-label="Verificacion Formularios"
                                    tabIndex="0"
                                >
                                    <FaRegListAlt className="text-[#F5D0A9] text-4xl mb-4 transition-transform transform hover:scale-110 hover:text-[#F2C49B]" />
                                    <h4 className="text-lg font-semibold text-[#F5D0A9]">Verificación de Formulario de Matricula</h4>
                                    <p className="text-[#F5D0A9] text-sm">Verifica y aprueba los formularios de matriculas realizados por los estudiantes.</p>
                                </div>

                            </div>
                        </div>
                        {/* Mostrar el contenido dependiendo de la vista seleccionada */}
                        {renderContent()}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
