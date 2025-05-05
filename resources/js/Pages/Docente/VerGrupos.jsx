import React, { useState } from 'react';
import AuthenticatedLayoutDoc from '@/Layouts/AuthenticatedLayoutDoc';
import { Head, useForm } from '@inertiajs/react';

export default function VerGrupos({ docente = {}, grupos = [], error }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGrupo, setSelectedGrupo] = useState(null);
    const [editingStudentId, setEditingStudentId] = useState(null);
    const { data, setData, post, processing, reset } = useForm({
        matricula_id: '',
        nota: '',
    });

    const handleOpenModal = (grupo) => {
        setSelectedGrupo(grupo);
        setIsModalOpen(true);
    };

    const handleEditarNota = (matriculaId, estudianteId) => {
        setEditingStudentId(estudianteId);
        setData('matricula_id', matriculaId);
    };

    const handleGuardarNota = () => {
        post(route('docente.guardar-nota'), {
            onSuccess: () => {
                setSelectedGrupo(prevGrupo => ({
                    ...prevGrupo,
                    matriculas: prevGrupo.matriculas.map(m => {
                        if (m.id === data.matricula_id) {
                            return { ...m, nota: data.nota };
                        }
                        return m;
                    })
                }));
                reset();
                setEditingStudentId(null);
            },
            preserveScroll: true,
        });
    };

    const handleCancelarNota = () => {
        reset();
        setEditingStudentId(null);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingStudentId(null);
        reset();
    };

    const nombreCompleto = docente?.nombres && docente?.aPaterno && docente?.aMaterno
        ? `${docente.nombres} ${docente.aPaterno} ${docente.aMaterno}`
        : 'Docente no encontrado';

    return (
        <AuthenticatedLayoutDoc
            header={
                <h2 className="text-3xl font-bold leading-tight text-white bg-gradient-to-r from-[#800020] to-[#6A4E3C] p-6 rounded-lg shadow-xl text-center">
                    Panel de Control - Docente
                </h2>
            }
        >
            <Head title="Dashboard - Docente" />

            {/* Información del Docente */}
            <div className="py-12 bg-gradient-to-b from-[#800020] to-[#F5D0A9] min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-[#FCF8E8] shadow-sm sm:rounded-lg p-6 mb-6">
                        <h3 className="text-2xl font-bold text-black mb-4">
                            Información Personal
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-black"><span className="font-semibold">Nombre completo:</span> {nombreCompleto}</p>
                                <p className="text-black"><span className="font-semibold">DNI:</span> {docente.dni}</p>
                                <p className="text-black"><span className="font-semibold">Sexo:</span> {docente.sexo}</p>
                                <p className="text-black"><span className="font-semibold">Fecha de nacimiento:</span> {docente.fechaNacimiento}</p>
                            </div>
                            <div>
                                <p className="text-black"><span className="font-semibold">Email institucional:</span> {docente.emailInstitucional}</p>
                                <p className="text-black"><span className="font-semibold">Celular:</span> {docente.celular}</p>
                                {docente.fotoDocente && (
                                    <div className="mt-4">
                                        <img 
                                            src={docente.fotoDocente} 
                                            alt="Foto del docente"
                                            className="w-32 h-32 object-cover rounded-full border-4 border-[#F5D0A9]"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grupos del Docente */}
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-[#FCF8E8] shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-2xl font-bold  mb-4">
                            Mis Grupos Asignados
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto">
                                <thead className="bg-[#800020]">
                                    <tr>
                                        {['Periodo', 'Modalidad', 'Horario', 'Estudiantes', 'Vacantes', 'Ciclo', 'Acciones'].map((header) => (
                                            <th key={header} className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-amber-50 divide-y divide-gray-200">
                                    {grupos.map((grupo) => (
                                        <tr key={grupo.id} className="hover:bg-[#F4D6C5]">
                                            {[
                                                grupo.periodo, 
                                                grupo.modalidad, 
                                                grupo.horario, 
                                                grupo.nroEstudiantes, 
                                                grupo.nroVacantes, 
                                                grupo.ciclo?.nombre
                                            ].map((value, index) => (
                                                <td key={index} className="px-6 py-4 whitespace-nowrap">{value}</td>
                                            ))}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => handleOpenModal(grupo)}
                                                    className="bg-[#800020] hover:bg-[#6A4E3C] text-[#F5D0A9] font-bold py-2 px-4 rounded"
                                                >
                                                    Ver Detalles
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {grupos.length === 0 && (
                                <p className="text-center text-gray-500 py-4">No hay grupos asignados</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Resto del código permanece igual */}
                {/* ... */}
            </div>
             {/* Modal */}
             {isModalOpen && selectedGrupo && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="p-8 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto" style={{ backgroundColor: "#FBF7E7" }}>

                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Lista de Estudiantes - {selectedGrupo.periodo}</h2>
                            <button
                                onClick={() => window.open(route('docente.reporte.grupo', { grupoId: selectedGrupo.id }), '_blank')}
                                className="bg-[#800020] hover:bg-[#6A4E3C] text-white px-4 py-2 rounded-lg transition-colors duration-200"
                            >
                                Generar Reporte PDF
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto">
                                <thead className="bg-[#6A1C1C]">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-white">Nombres</th>
                                        <th className="px-4 py-2 text-left text-white">Apellidos</th>
                                        <th className="px-4 py-2 text-left text-white">Email Institucional</th>
                                        <th className="px-4 py-2 text-left text-white">Nota</th>
                                        <th className="px-4 py-2 text-left text-white">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedGrupo.estudiantes?.map((estudiante) => {
                                        const matricula = selectedGrupo.matriculas?.find(
                                            m => m.estudiante_id === estudiante.id
                                        );
                                        const isEditing = editingStudentId === estudiante.id;

                                        return (
                                            <tr key={estudiante.id} className="hover:bg-[#F4D6C5]">
                                                <td className="px-4 py-2">{estudiante.nombres}</td>
                                                <td className="px-4 py-2">{`${estudiante.aPaterno} ${estudiante.aMaterno}`}</td>
                                                <td className="px-4 py-2">{estudiante.emailInstitucional}</td>
                                                <td className="px-4 py-2">
                                                    {isEditing ? (
                                                        <input
                                                            type="number"
                                                            min="0"
                                                            max="20"
                                                            className="border rounded px-2 py-1 w-20"
                                                            defaultValue={matricula?.nota || ''}
                                                            onChange={(e) => setData('nota', e.target.value)}
                                                        />
                                                    ) : (
                                                        <span>{matricula?.nota || '-'}</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {isEditing ? (
                                                        <div className="flex space-x-2">
                                                            <button  
                                                                onClick={handleGuardarNota}
                                                                className="bg-[#6A4E3C] hover:bg-[#F4D6C5] text-white font-bold py-1 px-3 rounded text-sm inline-flex"
                                                                disabled={processing}
                                                            >
                                                                Guardar
                                                            </button>
                                                            <button
                                                                onClick={handleCancelarNota}
                                                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 rounded text-sm inline-flex"
                                                            >
                                                                Cancelar
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleEditarNota(matricula?.id, estudiante.id)}
                                                            className="bg-[#800020] hover:bg-[#6A4E3C] text-white font-bold py-1 px-3 rounded text-sm"
                                                        >
                                                            Ingresar Nota
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={handleCloseModal}
                                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Mostrar error si existe */}
            {error && (
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mb-6">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                </div>
            )}
        </AuthenticatedLayoutDoc>
    );
};
