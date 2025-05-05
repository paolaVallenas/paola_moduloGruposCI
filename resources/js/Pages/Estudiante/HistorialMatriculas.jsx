import { Link } from '@inertiajs/react';
import React from 'react';

function HistorialMatriculas({ matriculas = [] }) {
    return (
        <div className="mt-12 flex justify-center min-h-screen">
            <div className="w-full max-w-5xl">
                {/* Si no hay matrículas */}
                {(!matriculas || matriculas.data.length === 0) ? (
                    <p className="text-white text-center">No hay matrículas registradas en el historial.</p>
                ) : (
                    <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6" >
                        <table className="min-w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-[#700303] text-white">
                                    <th className="p-3">Fecha de Matricula </th>
                                    <th className="p-3">Ciclo</th>
                                    <th className="p-3">Horario</th>
                                    <th className="p-3">Calificación</th>
                                </tr>
                            </thead>
                            <tbody>
                                {matriculas.data.map((matricula) => (
                                    <tr key={matricula.id} className="border-b hover:bg-[#F4D6C5] items-center text-center">
                                        <td className="p-3">{matricula.fecha}</td>
                                        <td className="p-3">{matricula.grupo.periodo} {matricula.grupo.ciclo.idioma.nombre} {matricula.grupo.ciclo.nombre} {matricula.grupo.ciclo.nivel}</td>
                                        <td className="p-3">{matricula.grupo.horario}</td>
                                        <td className="p-3">{matricula.nota}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Paginación */}
                        <div className="mt-4">
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
                )}
            </div>
        </div>
    );
}

export default HistorialMatriculas;