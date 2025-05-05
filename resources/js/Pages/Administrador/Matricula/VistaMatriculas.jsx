import { Link } from '@inertiajs/react';
import React, { useState } from 'react';
import { FaFileAlt, FaSearch, FaEye, FaTimesCircle } from 'react-icons/fa';
import { MdClose } from 'react-icons/md'; // Ícono de cerrar

const VistaMatriculas = ({ matriculas }) => {

    const [search, setSearch] = useState(''); // Estado para el buscador
    const [selectedMatricula, setSelectedMatricula] = useState(null);

    // Filtrar matrículas por apellido
    const filteredMatriculas = matriculas.data.filter(ma =>
        ma.estudiante.aPaterno.toLowerCase().includes(search.toLowerCase())
    );

    const handleViewDetailsClick = (matricula) => {
        setSelectedMatricula(matricula);
    };

    const closeDetailsModal = () => {
        setSelectedMatricula(null);
    };


    return (
        <div className="min-h-screen bg- py-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Buscador */}
                <div className="mb-4 flex justify-center">
                    <div className="relative max-w-sm w-full">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Buscar por Apellido del Estudiante"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#800020]"
                        />
                        <FaSearch className="absolute right-3 top-2 text-gray-500" />
                    </div>
                </div>

                {/* Modal de detalles */}
                {selectedMatricula && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-[400px] max-h-[40vh] w-full h-full flex overflow-auto">
                            <MdClose
                                className="absolute top-2 right-2 text-2xl text-[#800020] cursor-pointer"
                                onClick={closeDetailsModal}
                            />

                            {/* Columna para los datos (reducida para dar más espacio a la imagen) */}
                            <div className="w-full flex flex-col justify-center items-center text-center">
                                <h3 className="text-2xl font-semibold mb-4">Datos de Matrícula</h3>
                                <p><strong>Nombre:</strong> {selectedMatricula.estudiante.nombres} {selectedMatricula.estudiante.aPaterno} {selectedMatricula.estudiante.aMaterno}</p>
                                <p><strong>Fecha de Matrícula:</strong> {new Date(selectedMatricula.fecha).toLocaleDateString()}</p>
                                <p><strong>Grupo:</strong> {selectedMatricula.grupo.periodo} {selectedMatricula.grupo.ciclo.idioma.nombre} {selectedMatricula.grupo.ciclo.nombre} {selectedMatricula.grupo.ciclo.nivel}</p>
                                <p><strong>Nota Estudiante:</strong> {selectedMatricula.nota || 'No disponible'}</p>
                                <br />
                            </div>
                        </div>
                    </div>

                )}

                {/* Tabla de Matrículas */}
                <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6 mb-6">
                    <table className="min-w-full table-auto">
                        <thead className="bg-[#800020] text-white">
                            <tr>
                                <th className="px-6 py-3 text-center">Nombres Estudiante</th>
                                <th className="px-6 py-3 text-center">Fecha de Matrícula</th>
                                <th className="px-6 py-3 text-center">Grupo</th>
                                <th className="px-6 py-3 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredMatriculas.length > 0 ? (
                                filteredMatriculas.map((ma, index) => (
                                    <tr key={index} className="border-b hover:bg-[#F4D6C5]">
                                        <td className="px-6 py-3 text-center">{ma.estudiante.nombres} {ma.estudiante.aPaterno} {ma.estudiante.aMaterno}</td>
                                        <td className="px-6 py-3 text-center">{new Date(ma.fecha).toLocaleDateString()}</td>
                                        <td className="px-6 py-3 text-center">{ma.grupo.periodo} {ma.grupo.ciclo.idioma.nombre} {ma.grupo.ciclo.nombre} {ma.grupo.ciclo.nivel}</td>
                                        <td className="px-6 py-3 text-center">
                                            <button
                                                onClick={() => handleViewDetailsClick(ma)}
                                                className="text-[#800020] hover:text-[#6A4E3C]"
                                            >
                                                <FaEye className="text-xl" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-3 text-center text-gray-500">
                                        No se encontraron matrículas.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {/* Paginación */}
                    <div className="mt-4 flex justify-center">
                        {matriculas.links.map((link, index) => (
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
        </div>
    );
};

export default VistaMatriculas;
