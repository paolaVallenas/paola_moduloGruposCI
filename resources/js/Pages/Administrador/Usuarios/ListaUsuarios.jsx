import React, { useEffect, useState } from 'react';
import { useForm, Link } from '@inertiajs/react';

const ListaUsuarios = ({ ListaUsuarios = [] }) => {
    const [usuarios, setUsuarios] = useState(ListaUsuarios);

    return (
        <div className="min-h-auto py-12">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6 mb-6">
                    <table className="table-auto w-full border-collapse ">
                        <thead className="bg-[#700303] text-white">
                            <tr>
                                <th className="border-b-2 border-gray-300 px-4 py-2 ">Nombre</th>
                                <th className="border-b-2 border-gray-300 px-4 py-2 ">Email</th>
                                <th className="border-b-2 border-gray-300 px-4 py-2 ">Fecha de Registro</th>
                                <th className="border-b-2 border-gray-300 px-4 py-2 ">Tipo de Usuario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.data.map((usuario) => (
                                <tr key={usuario.id} className="bg-white hover:bg-red-200">
                                    <td className=" px-6 py-3 text-black">
                                        {usuario.tipoUsuario === 'admin' ? null : <span>{usuario.name}</span>}
                                    </td>
                                    <td className=" px-6 py-3 text-black">
                                        {usuario.tipoUsuario === 'admin' ? null : <span>{usuario.email}</span>}
                                    </td>
                                    <td className=" px-6 py-3 text-center text-black">
                                        {usuario.tipoUsuario === 'admin' ? null : <span>{new Date(usuario.created_at).toLocaleDateString()}</span>}
                                    </td>
                                    <td className=" px-6 py-3 text-black">
                                        {usuario.tipoUsuario === 'est' ? (
                                            <span>ESTUDIANTE</span>
                                        ) : usuario.tipoUsuario === 'doc' ? (
                                            <span>DOCENTE</span>
                                        ) : (
                                            <span>ADMIN</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Paginación */}
                    <div className="mt-4 flex justify-center">
                        {usuarios.links.map((link, index) => (
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

export default ListaUsuarios;
