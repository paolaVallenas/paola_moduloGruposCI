import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';  // Importar FaEye desde react-icons
import { Link } from '@inertiajs/react';

const TablaInscripciones = ({ inscripciones = [], setIns ,setVerForm}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedInscripcion, setSelectedInscripcion] = useState(null);
    const [aceptadas, setAceptadas] = useState(new Set());

    const handleInscripcionStatus = (id, status) => {
        if (status === 'aceptado') {
            setAceptadas(prev => new Set([...prev, id]));
        } else if (status === 'rechazado') {
            setAceptadas(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
        }
    };
    const handleRowClick = (inscripcion) => {
        setIns(inscripcion);  // Establecer la inscripción seleccionada
        setVerForm(true);      // Cambiar a la vista de formulario
    };

    const filteredInscripciones = inscripciones.data;

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6 mb-6">
            <table className="min-w-full table-auto">
                <thead className="bg-[#800020] text-white">
                    <tr>
                        <th className="px-6 py-3 text-center">Nombres</th>
                        <th className="px-6 py-3 text-center">Apellido Paterno</th>
                        <th className="px-6 py-3 text-center">Estado</th>
                        <th className="px-6 py-3 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredInscripciones.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="px-6 py-2 text-gray-700 text-center">
                                No hay inscripciones pendientes
                            </td>
                        </tr>
                    ) : (
                        filteredInscripciones.map((inscripcion) => (
                            <tr
                                key={inscripcion.id}
                                className={`border-t hover:bg-[#F4D6C5] ${inscripcion.estado === 'Aceptado' ? 'bg-green-200' : ''}`}
                            >
                                <td className="px-6 py-3text-center">{inscripcion.nombres}</td>
                                <td className="px-6 py-3">{inscripcion.aPaterno}</td>
                                <td className="px-6 py-3">{inscripcion.estado}</td>
                                <td className="px-6 py-3  text-[#800020] flex justify-center items-center">
                                    <button
                                        onClick={() => {
                                            handleRowClick(inscripcion);
                                        }}
                                        className={`flex items-center gap-2 px-3 py-1 rounded ${inscripcion.estado === 'Aceptado'
                                                ? 'text-[#800020]'
                                                : ''
                                            }`}
                                    >
                                        <FaEye className="w-5 h-5" /> {/* Aquí se usa el ícono FaEye */}
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {/* Paginación */}
            <div className="mt-4 flex justify-center">
                {inscripciones.links?.map((link, index) => (
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
    );
};

export default TablaInscripciones;
