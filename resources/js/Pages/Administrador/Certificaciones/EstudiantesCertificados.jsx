
import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { Link, useForm } from '@inertiajs/react';

const EstudiantesCertificados = ({ certificados = [] }) => {
    const [estudiantes, setEstudiantes] = useState(certificados.data);
    const Mostrar = (id) => {
        window.open(`/mostrarQR/${id}`, '_blank');
    }
    return (
        <div className="min-h-auto py-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6 mb-6">

                    <table className="table-auto w-full border-collapse border">
                        <thead className="bg-[#700303] text-white">
                            <tr>
                                <th className="border border-[#700303] px-6 py-3 text-center">Estudiante</th>
                                <th className="border border-[#700303] px-6 py-3 text-center">Ciclo Certificado</th>
                                <th className="border border-[#700303] px-6 py-3 text-center">Codigo de Certificado </th>
                                <th className="border border-[#700303] px-6 py-3 text-center">Accion</th>

                            </tr>
                        </thead>
                        <tbody>
                            {certificados.data.length > 0 ? (
                                certificados.data.map((est, index) => (
                                    <tr
                                        key={est.id}
                                        index={index}
                                        className={
                                            'bg-gray-100 hover:bg-red-200'
                                        }
                                    >
                                        <td className=" px-6 py-3 text-black">
                                            {est.nombre}
                                        </td>
                                        <td className=" px-6 py-3 text-black">
                                            {est.cicloCert}
                                        </td>
                                        <td className=" px-6 py-3 text-center  text-black">
                                            {est.codigo}
                                        </td>
                                        <td className=" px-6 py-3  text-black">
                                            <button
                                                onClick={() => Mostrar(est.id)}>
                                                Mostrar
                                            </button>

                                        </td>
                                    </tr>
                                ))) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-3 text-center text-gray-500">
                                        No se encontraron estudianbtes certificados.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {/* Paginación */}
                    <div className="mt-4 flex justify-center">
                        {certificados.links.map((link, index) => (
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

export default EstudiantesCertificados;
