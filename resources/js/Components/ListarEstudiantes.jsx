import React, { useState } from 'react';

const ListarEstudiantes = ({ estudiantes }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEstudiante, setSelectedEstudiante] = useState(null);
    const [nota, setNota] = useState('');

    // Función para abrir el modal
    const openModal = (estudiante) => {
        setSelectedEstudiante(estudiante);
        setIsModalOpen(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setIsModalOpen(false);
        setNota('');
    };

    // Función para manejar el cambio de la nota
    const handleNotaChange = (e) => {
        setNota(e.target.value);
    };

    // Función para guardar la nota
    const saveNota = () => {
        if (nota !== '') {
            // Aquí podrías agregar la lógica para guardar la nota
            alert(`Nota para ${selectedEstudiante.nombre}: ${nota}`);
            closeModal();
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-2xl font-semibold text-[#9b1c31] mb-4">Lista de Estudiantes del Grupo</h3>
            {estudiantes.length > 0 ? (
                <table className="w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-[#9b1c31] text-white">
                            <th className="px-4 py-2">Nombre</th>
                            <th className="px-4 py-2">Ciclo</th>
                            <th className="px-4 py-2">Nivel</th>
                            <th className="px-4 py-2">Modalidad</th>
                            <th className="px-4 py-2">Horario</th>
                            <th className="px-4 py-2">Nota</th>
                            <th className="px-4 py-2">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {estudiantes.map(estudiante => (
                            <tr key={estudiante.id} className="border-t border-[#9b1c31]">
                                <td className="px-4 py-2">{estudiante.nombre}</td>
                                <td className="px-4 py-2">{estudiante.ciclo}</td>
                                <td className="px-4 py-2">{estudiante.nivel}</td>
                                <td className="px-4 py-2">{estudiante.modalidad}</td>
                                <td className="px-4 py-2">{estudiante.horario}</td>
                                <td className="px-4 py-2">{estudiante.nota || 'N/A'}</td>
                                <td className="px-4 py-2">
                                    <button
                                        className="bg-[#9b1c31] text-white px-4 py-2 rounded"
                                        onClick={() => openModal(estudiante)}
                                    >
                                        Asignar Nota
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay estudiantes que coincidan con el filtro.</p>
            )}

            {/* Modal para ingresar la nota */}
            {isModalOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md w-1/3">
                        <h4 className="text-xl font-semibold mb-4">Asignar Nota a {selectedEstudiante?.nombre}</h4>
                        <input
                            type="number"
                            value={nota}
                            onChange={handleNotaChange}
                            className="w-full p-2 border border-[#9b1c31] rounded mb-4"
                            placeholder="Ingrese la nota"
                        />
                        <div className="flex justify-between">
                            <button
                                className="bg-[#9b1c31] text-white px-4 py-2 rounded"
                                onClick={saveNota}
                            >
                                Guardar
                            </button>
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={closeModal}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListarEstudiantes;
