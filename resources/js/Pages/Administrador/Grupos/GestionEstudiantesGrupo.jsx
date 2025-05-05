import React from "react";
import { Head } from "@inertiajs/react";
import { router } from '@inertiajs/react';

export default function GestionEstudiantesGrupo({ auth, grupos, isModal = false }) {
    console.log('Grupos recibidos:', grupos); // Para depuración
    const estudiantesFiltrados = grupos.flatMap(grupo => grupo.estudiantes || []);
    console.log('Estudiantes filtrados:', estudiantesFiltrados); // Para depuración

    const handleGenerarReporte = (grupoId) => {
        window.open(`/reporte-estudiantes-grupo/${grupoId}`, '_blank');
    };

    const content = (
        <div className={isModal ? "" : "py-12"}>
            <div className={`${isModal ? "" : "max-w-7xl mx-auto sm:px-6 lg:px-8"}`}>
                <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6">
                    <div className="flex justify-between items-center mb-4">
                        <div></div> {/* Espaciador */}
                        {grupos[0] && (
                            <button
                                onClick={() => handleGenerarReporte(grupos[0].id)}
                                className="bg-[#800020] hover:bg-[#6A4E3C] text-white px-4 py-2 rounded-lg transition-colors duration-200"
                            >
                                Generar Reporte PDF
                            </button>
                        )}
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto whitespace-nowrap">
                            <thead className="bg-[#800020] text-white">
                                <tr>
                                    <th className="px-6 py-3 text-left" style={{ minWidth: '250px' }}>Nombres y Apellidos</th>
                                    <th className="px-6 py-3 text-left" style={{ minWidth: '100px' }}>DNI</th>
                                    <th className="px-6 py-3 text-left" style={{ minWidth: '120px' }}>Celular</th>
                                    <th className="px-6 py-3 text-left" style={{ minWidth: '200px' }}>Email</th>
                                    <th className="px-6 py-3 text-left" style={{ minWidth: '200px' }}>Email CI</th>
                                    <th className="px-6 py-3 text-left" style={{ minWidth: '200px' }}>Programa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {estudiantesFiltrados.length > 0 ? (
                                    estudiantesFiltrados.map((estudiante) => (
                                        <tr key={estudiante.id} className="border-b hover:bg-[#F4D6C5] cursor-pointer">
                                            <td className="px-6 py-3">
                                                {`${estudiante.nombres} ${estudiante.aPaterno} ${estudiante.aMaterno}` || 'No disponible'}
                                            </td>
                                            <td className="px-6 py-3">{estudiante.dni || 'No disponible'}</td>
                                            <td className="px-6 py-3">{estudiante.celular || 'No disponible'}</td>
                                            <td className="px-6 py-3">{estudiante.email || 'No disponible'}</td>
                                            <td className="px-6 py-3">{estudiante.emailInstitucional || 'No disponible'}</td>
                                            <td className="px-6 py-3">{estudiante.programaEstudios || 'No disponible'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-[#700303]">
                                            No hay estudiantes disponibles.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

    return isModal ? content : (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Gestión de Estudiantes por Grupo" />
            {content}
        </AuthenticatedLayout>
    );
}
