import { Link } from '@inertiajs/react';
import { FaEye } from 'react-icons/fa';
import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';

function HistorialPagos({ matriculas = [] }) {

    const [selectedPago, setSelectedPago] = useState(null);

    const handleViewDetailsClick = (pago) => {
        setSelectedPago(pago);
    };

    const closeDetailsModal = () => {
        setSelectedPago(null);
    };
    return (
        <div className="mt-12 flex justify-center min-h-screen">
            <div className="w-full max-w-5xl">

                {/* Modal de detalles */}
                {selectedPago && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg relative w-[900px] h-[600px] flex"> {/* Aumenté el ancho y alto del modal */}
                            <MdClose
                                className="absolute top-2 right-2 text-2xl text-[#800020] cursor-pointer"
                                onClick={closeDetailsModal}
                            />

                            {/* Columna para los datos (reducida para dar más espacio a la imagen) */}
                            <div className="w-1/3 flex flex-col justify-center">
                                <h3 className="text-2xl font-semibold mb-4">Comprobante de Pago</h3>
                                <p><strong>Nro Voucher:</strong> {selectedPago?.pago?.nroComprobante || 'No disponible'}</p>
                                <p><strong>Matricula al Grupo:</strong> {selectedPago.grupo.periodo} {selectedPago.grupo.ciclo.idioma.nombre} {selectedPago.grupo.ciclo.nombre} {selectedPago.grupo.ciclo.nivel}</p>
                            </div>

                            {/* Columna para la imagen (más grande y centrada) */}
                            <div className="w-2/3 flex justify-center items-center pl-8">
                                {selectedPago?.pago?.imgComprobante ? (
                                    <div className="relative w-full h-full flex justify-center items-center">
                                        <img
                                            src={selectedPago.pago.imgComprobante}
                                            alt="Foto del Voucher"
                                            className="max-w-[500px] max-h-[500px] object-contain rounded-md" /* Imagen más grande */
                                        />
                                    </div>
                                ) : (
                                    <p className="text-gray-500">Foto del voucher no disponible</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                {/* Si no hay matrículas */}
                {(!matriculas || matriculas.data.length === 0) ? (
                    <p className="text-white text-center">No hay pagos registradas en el historial.</p>
                ) : (
                    <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6">
                        <table className="min-w-full table-auto border-collapse">
                            <thead>
                                <tr className="bg-[#700303] text-white text-center">
                                    <th className="p-3">Fecha de Pago </th>
                                    <th className="p-3">Monto</th>
                                    <th className="p-3">Medio de Pago</th>
                                    <th className="p-3">Comprobante</th>
                                </tr>
                            </thead>
                            <tbody>
                                {matriculas.data.map((ma) => (
                                    <tr key={ma.id} className="border-b hover:bg-[#F4D6C5] items-center text-center">
                                        <td className="p-3">{ma.pago.fecha}</td>
                                        <td className="p-3">{ma.pago.monto}</td>
                                        <td className="p-3">{ma.pago.medioPago}</td>
                                        <td className="px-6 py-3">
                                            <button
                                                onClick={() => handleViewDetailsClick(ma)}
                                                className="text-[#800020] hover:text-[#6A4E3C]"
                                            >
                                                <FaEye className="text-xl" />
                                            </button>
                                        </td>
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

export default HistorialPagos;