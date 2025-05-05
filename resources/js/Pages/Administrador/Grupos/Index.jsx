import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { FaUsers, FaLayerGroup, FaEye, FaPen } from 'react-icons/fa';
import React, { useState } from 'react';
import GestionGrupos from './GestionGrupos';
import GestionEstudiantesGrupo from './GestionEstudiantesGrupo';

export default function Index({ auth, grupos, ciclos, docentes }) {
    const [view, setView] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGrupo, setSelectedGrupo] = useState(null);
    const [isEstudiantesModalOpen, setIsEstudiantesModalOpen] = useState(false);
    const [selectedGrupoEstudiantes, setSelectedGrupoEstudiantes] = useState(null);

    const handleCardClick = (value) => {
        setView(value);
    };

    const handleEdit = (grupo) => {
        setSelectedGrupo(grupo);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedGrupo(null);
    };

    const handleVerEstudiantes = (grupo) => {
        setSelectedGrupoEstudiantes(grupo);
        setIsEstudiantesModalOpen(true);
    };

    const handleCloseEstudiantesModal = () => {
        setIsEstudiantesModalOpen(false);
        setSelectedGrupoEstudiantes(null);
    };

    const renderContent = () => {
        if (view === 'formulario') {
            return <GestionGrupos grupos={grupos} ciclos={ciclos} docentes={docentes} />;
        } else if (view === 'lista') {
            return (
                <>
                    <br />
                    <div className="w-full overflow-x-auto shadow-lg rounded-lg bg-white p-4 md:p-6 mb-6">
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto whitespace-nowrap text-sm md:text-base">
                                <thead className="bg-[#800020] text-white text-center">
                                    <tr>
                                        <th className="px-2 md:px-4 py-2 ">Periodo</th>
                                        <th className="px-2 md:px-4 py-2 ">Modalidad</th>
                                        <th className="px-2 md:px-4 py-2 ">Estudiantes</th>
                                        <th className="px-2 md:px-4 py-2 ">Vacantes</th>
                                        <th className="px-2 md:px-4 py-2 ">Horario</th>
                                        <th className="px-2 md:px-4 py-2 ">Ciclo</th>
                                        <th className="px-2 md:px-4 py-2 ">Docente</th>
                                        <th className="px-2 md:px-4 py-2 ">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {grupos.data?.map((grupo) => (
                                        <tr key={grupo.id} className="border-b hover:bg-[#F4D6C5]">
                                            <td className="px-2 md:px-4 py-2">{grupo.periodo || 'N/D'}</td>
                                            <td className="px-2 md:px-4 py-2">{grupo.modalidad || 'N/D'}</td>
                                            <td className="px-2 md:px-4 py-2">{grupo.nroEstudiantes || 'N/D'}</td>
                                            <td className="px-2 md:px-4 py-2">{grupo.nroVacantes || 'N/D'}</td>
                                            <td className="px-2 md:px-4 py-2">{grupo.horario || 'N/D'}</td>
                                            <td className="px-2 md:px-4 py-2">{grupo.ciclo.idioma.nombre} {grupo.ciclo.nombre} {grupo.ciclo.nivel}</td>
                                            <td className="px-2 md:px-4 py-2">
                                                {grupo.docente ? `${grupo.docente.nombres} ${grupo.docente.aPaterno}` : 'N/A'}
                                            </td>
                                            <td className="px-2 md:px-4 py-2">
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(grupo)}
                                                        className="text-[#800020] hover:text-[#6A4E3C]"
                                                    >
                                                        <FaPen className="text-xl mr-3" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleVerEstudiantes(grupo)}
                                                        className="text-[#800020] hover:text-[#6A4E3C]"
                                                    >
                                                        <FaEye className="text-xl" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {/* Paginación */}
                            <div className="mt-4">
                                {grupos.links.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`px-3 py-1 mx-1 border rounded hover:bg-black ${link.active ? 'bg-red-900 text-white' : 'bg-red-900 text-white'
                                            }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </>

            );
        } else {
            return (
                <div className="text-center p-4 md:p-6">
                    <h3 className="text-xl md:text-2xl text-[#800020]">Selecciona una opción para ver más detalles.</h3>
                </div>
            );
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-[#800020] to-[#6A4E3C] p-4 rounded-lg shadow-lg">
                    {/* Texto alineado a la izquierda */}
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-0">
                        Gestión de Grupos
                    </h2>

                    {/* Contenedor de los botones alineados a la derecha */}
                    <div className="flex space-x-2 mt-2 md:mt-0">
                        <Link
                            href={route('ciclo.index')}
                            className="bg-white text-[#800020] px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base"
                        >
                            Ciclos e Idiomas
                        </Link>
                        <Link
                            href={route('docente.index')}
                            className="bg-white text-[#800020] px-3 py-1.5 md:px-4 md:py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm md:text-base"
                        >
                            Docentes
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="SGMCI - Gestión de Grupos" />

            <div className="py-6 md:py-12 bg-gradient-to-b from-[#800020] to-[#F5D0A9] min-h-screen flex items-center justify-center">
                <div className="max-w-7xl w-full px-2 sm:px-4 md:px-6 lg:px-8">
                    <div className="overflow-hidden bg-amber-50 shadow-xl rounded-lg mb-4 md:mb-10">
                        <div className="p-4 md:p-8 text-gray-800 text-center">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 justify-center mx-auto">
                                <div
                                    className="bg-[#800020] p-4 md:p-6 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#6A4E3C] transition-all cursor-pointer "
                                    onClick={() => handleCardClick('formulario')}
                                    aria-label="Gestión de Grupos"
                                    tabIndex="0"
                                >
                                    <FaUsers className="text-3xl md:text-4xl text-[#F5D0A9] mb-2 md:mb-4 mx-auto transition-transform transform hover:scale-110" />
                                    <h4 className="text-base md:text-lg font-semibold text-[#F5D0A9]">Agregar Grupo</h4>
                                    <p className="text-xs md:text-sm text-[#F5D0A9]">Gestiona los grupos, ciclos e idiomas asociados.</p>
                                </div>

                                <div
                                    className="bg-[#800020] p-4 md:p-6 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#6A4E3C] transition-all cursor-pointer"
                                    onClick={() => handleCardClick('lista')}
                                    aria-label="Ciclos e Idiomas"
                                    tabIndex="0"
                                >
                                    <FaLayerGroup className="text-3xl md:text-4xl text-[#F5D0A9] mb-2 md:mb-4 mx-auto transition-transform transform hover:scale-110" />
                                    <h4 className="text-base md:text-lg font-semibold text-[#F5D0A9]">Lista de Grupos</h4>
                                    <p className="text-xs md:text-sm text-[#F5D0A9]">Lista los grupos disponibles en tu sistema.</p>
                                </div>
                            </div>

                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals with responsive design */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-md md:max-w-4xl bg-white rounded-lg shadow-xl p-4 md:p-8">
                        <div className="flex justify-between items-center mb-4">
                            <button
                                onClick={handleCloseModal}
                                className="text-gray-500 hover:text-gray-700 ml-auto"
                            >
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <GestionGrupos
                            grupos={grupos}
                            ciclos={ciclos}
                            docentes={docentes}
                            editingGrupo={selectedGrupo}
                            onClose={handleCloseModal}
                        />
                    </div>
                </div>
            )}

            {isEstudiantesModalOpen && (
                <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-sm md:max-w-6xl bg-white rounded-lg shadow-xl p-4 md:p-8">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl md:text-2xl font-bold text-[#800020]">
                                Lista de Estudiantes - {selectedGrupoEstudiantes?.periodo} {selectedGrupoEstudiantes?.modalidad}
                            </h2>
                            <button
                                onClick={handleCloseEstudiantesModal}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <GestionEstudiantesGrupo
                            auth={auth}
                            grupos={selectedGrupoEstudiantes ? [selectedGrupoEstudiantes] : []}
                            isModal={true}
                        />
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}