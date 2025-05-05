import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { Link, useForm } from '@inertiajs/react';

const ListaCertificar = ({ estudiantesC = [] }) => {
    const [estudiantes, setEstudiantes] = useState(estudiantesC.data);
    const [modal, setModal] = useState(false);
    const [selectedEst, setSelectedEst] = useState(null);

    const { data, setData, post, errors, reset } = useForm({
        nombre: '',
        cicloCert: '',
        idMatricula: '',
    });

    // Maneja la acción de certificar
    const Certificar = (est) => {
        setModal(true);
        setSelectedEst(est);
        setData({
            ...data, // Mantenemos los datos existentes
            nombre: `${est.estudiante.nombres} ${est.estudiante.aPaterno} ${est.estudiante.aMaterno}`,
            cicloCert: `${est.grupo.ciclo.idioma.nombre} ${est.grupo.ciclo.nombre}`,
            idMatricula: est.id,
        });

    };

    // Cierra el modal y resetea los datos
    const closeDetailsModal = () => {
        setSelectedEst(null);
        setModal(false);
        reset(); // Se llama a reset como función
    };

    // Envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('generar.certificado')); // Enviar datos del formulario
        closeDetailsModal();
    };

    return (
        <div className="min-h-auto py-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Modal de certificación */}
                {selectedEst && modal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg relative w-[400px] h-[400px] flex">
                            {/* Aumenté el ancho y alto del modal */}
                            <MdClose
                                className="absolute top-2 right-2 text-2xl text-[#800020] cursor-pointer"
                                onClick={closeDetailsModal}
                            />
                            {/* Formulario de certificación */}
                            <div className="flex flex-col justify-center">
                                <h2 className="text-2xl font-bold text-[#800020] text-center mb-4">CERTIFICAR</h2>
                                <form onSubmit={handleSubmit}>
                                    <label>Nombre</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={`${selectedEst.estudiante.nombres} ${selectedEst.estudiante.aPaterno} ${selectedEst.estudiante.aMaterno}`}
                                        disabled
                                    />
                                    <label>Ciclo a Certificar</label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={`${selectedEst.grupo.ciclo.idioma.nombre} - ${selectedEst.grupo.ciclo.nombre}`}
                                        disabled
                                        className='mb-4'
                                    />
                                    <button type="submit">Generar certificado</button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}

                <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6 mb-6">
                    <table className="table-auto w-full border-collapse border ">
                        <thead className="bg-[#700303] text-white">
                            <tr>
                                <th className="border border-[#700303] px-6 py-3 text-center">Estudiante</th>
                                <th className="border border-[#700303] px-6 py-3 text-center">Certificar a</th>
                                <th className="border border-[#700303] px-6 py-3 text-center">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {estudiantes.length > 0 ? (
                                estudiantes.map((est) => (
                                    <tr key={est.id} className="bg-gray-100 hover:bg-red-200">
                                        <td className=" px-6 py-3 text-black">{est.estudiante.nombres}</td>
                                        <td className=" px-6 py-3 text-center text-black">{est.grupo.ciclo.nombre}</td>
                                        <td className=" px-6 py-3 text-black">
                                            <button onClick={() => Certificar(est)}>Certificar</button>
                                        </td>
                                    </tr>
                                ))) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-3 text-center text-gray-500">
                                        No se encontraron estudiantes a certificar.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {/* Paginación */}
                    <div className="mt-4 flex justify-center">
                        {estudiantesC.links.map((link, index) => (
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

export default ListaCertificar;