import React, { useState } from 'react';
import { FaEye, FaPen } from 'react-icons/fa';
import FormularioDocentes from './FormularioDocentes';
import { Link } from '@inertiajs/react';

const TablaDocentes = ({ docentes =[]}) => {
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [selectedDocente, setSelectedDocente] = useState(null);
    const [showCredentials, setShowCredentials] = useState(false);


    const handleShowModal = (docente) => {
        if (!docente) return;
        setSelectedDocente(docente);
        setShowModal(true);
    };

    const handleShowModalEdit = (docente) => {
        setSelectedDocente(docente);
        setShowModalEdit(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setShowModalEdit(false);
        setSelectedDocente(null);
        setShowCredentials(false);
    };

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6 mb-6">
            <table className="min-w-full table-auto">
                <thead className="bg-[#800020] text-white">
                    <tr>
                        <th className="px-6 py-3 text-left">Nombres</th>
                        <th className="px-6 py-3 text-left">Apellido Paterno</th>
                        <th className="px-6 py-3 text-left">Apellido Materno</th>
                        <th className="px-6 py-3 text-left">Celular</th>
                        <th className="px-6 py-3 text-left">Email</th>
                        <th className="px-6 py-3 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {docentes.data.length > 0 ? (
                        docentes.data.map((docente) => (
                            <tr
                                key={docente.id}
                                className="border-b hover:bg-[#F4D6C5] cursor-pointer"
                            >
                                <td className="px-6 py-3">{docente.nombres || 'No disponible'}</td>
                                <td className="px-6 py-3">{docente.aPaterno || 'No disponible'}</td>
                                <td className="px-6 py-3">{docente.aMaterno || 'No disponible'}</td>
                                <td className="px-6 py-3">{docente.celular || 'No disponible'}</td>
                                <td className="px-6 py-3">{docente.emailInstitucional || 'No disponible'}</td>
                                <td className="px-6 py-3">
                                    <button
                                        onClick={() => handleShowModalEdit(docente)}
                                        className="text-[#800020] hover:text-[#6A4E3C]"
                                    >
                                        <FaPen className="text-xl mr-3" />
                                    </button>
                                    <button
                                        onClick={() => handleShowModal(docente)}
                                        className="text-[#800020] hover:text-[#6A4E3C]"
                                    >
                                        <FaEye className="text-xl" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="px-6 py-3 text-center text-gray-500">
                                No hay docentes disponibles.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/* Paginación */}
            <div className="mt-4 flex justify-center">
                {docentes.links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url}
                        className={`px-3 py-1 mx-1 border rounded hover:bg-black ${link.active ? 'bg-red-900 text-white' : 'bg-red-900 text-white'
                            }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>

            {showModal && selectedDocente && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[600px] border-2 border-gray-300">
                        <div className="flex justify-between mb-4">
                            <h3 className="text-lg font-semibold">Detalles del Docente</h3>
                            <button
                                onClick={() => setShowCredentials(!showCredentials)}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                {showCredentials ? 'Ocultar Credenciales' : 'Ver Credenciales'}
                            </button>
                        </div>

                        <div className="flex">
                            <div className="flex-1 text-left pr-4">
                                <p><strong>Nombres:</strong> {selectedDocente.nombres || 'No disponible'}</p>
                                <p><strong>Apellido Paterno:</strong> {selectedDocente.aPaterno || 'No disponible'}</p>
                                <p><strong>Apellido Materno:</strong> {selectedDocente.aMaterno || 'No disponible'}</p>
                                <p><strong>DNI:</strong> {selectedDocente.dni || 'No disponible'}</p>
                                <p><strong>Celular:</strong> {selectedDocente.celular || 'No disponible'}</p>
                                <p><strong>Email Institucional:</strong> {selectedDocente.emailInstitucional || 'No disponible'}</p>
                                <p><strong>Fecha de Nacimiento:</strong> {selectedDocente.fechaNacimiento || 'No disponible'}</p>
                                <p><strong>Sexo:</strong> {selectedDocente.sexo || 'No disponible'}</p>
                            </div>

                            <div className="flex-shrink-0 ml-8 text-center">
                                <p className="font-semibold mb-2">Foto</p>
                                {selectedDocente.fotoDocente ? (
                                    <img
                                        src={selectedDocente.fotoDocente}
                                        alt="Foto del Docente"
                                        className="border rounded-lg"
                                        style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div
                                        className="border rounded-lg bg-gray-200 flex items-center justify-center"
                                        style={{ width: '200px', height: '200px' }}
                                    >
                                        <span className="text-gray-500">Sin Foto</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {showCredentials && selectedDocente.user && (
                            <div className="mt-4 p-4 bg-gray-100 rounded">
                                <h4 className="font-semibold mb-2">Credenciales de Usuario</h4>
                                <div className="space-y-2">
                                    <p><strong>Nombre de Usuario:</strong> {selectedDocente.user.email || 'No disponible'}</p>
                                    <p><strong>Contraseña:</strong> {selectedDocente.dni || 'No disponible'}</p>
                                    <p className="text-sm text-red-600 mt-2">
                                        * Por seguridad, la contraseña inicial es el DNI del docente.
                                    </p>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handleCloseModal}
                            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {showModalEdit && selectedDocente && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] border-2 border-gray-300">
                        <FormularioDocentes
                            Docente={selectedDocente}
                            closeModal={() => setShowModalEdit(false)}
                        />
                        <button
                            onClick={() => setShowModalEdit(false)}
                            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default TablaDocentes;
