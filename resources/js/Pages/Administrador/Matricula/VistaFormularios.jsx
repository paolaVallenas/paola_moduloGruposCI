import { Link, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { FaSearch, FaEye, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

const TablaFormularios = ({ formMatriculas = [], search }) => {

    const filteredForms = formMatriculas.data.filter(form =>
        form.estudiante.aPaterno.toLowerCase().includes(search.toLowerCase())
    );
    const [selectedForm, setSelectedForm] = useState(null);
    const [ver, setVer] = useState(null);
    const { data, setData, post, processing, errors, reset } = useForm({
        id: '',
        cicloIngles: '',
        horarioIngles: '',
    });

    const handleFormClick = (frm, ver) => {
        if (ver === '') {
            setSelectedForm(frm);
            setData({
                ...data, // Mantenemos los datos existentes
                cicloIngles: frm.cicloIngles,
                horarioIngles: frm.horarioIngles,
                id: frm.id,
            });
            setVer(false);
        } else {
            setSelectedForm(frm);
            setData({
                ...data, // Mantenemos los datos existentes
                cicloIngles: frm.cicloIngles,
                horarioIngles: frm.horarioIngles,
                id: frm.id,
            });
            setVer(true);
        }

    };

    const handleAceptar = (e) => {
        post(route('matricula.aprobar'));
        //console.log(data);
        setSelectedForm(null);
    };

    const handleRechazar = (e) => {
        post(route('matricula.rechazar'));
        //console.log(data);
        setSelectedForm(null);
    };

    const closeDetailsModal = () => {
        setSelectedForm(null);
        reset;
    };

    return (
        <div className="min-h-screen  py-1">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Formulario */}
                {selectedForm && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-[900px] w-full max-h-[90vh] overflow-auto flex flex-col">
                            <MdClose
                                className="absolute top-2 right-2 text-2xl text-[#800020] cursor-pointer"
                                onClick={closeDetailsModal}
                            />
                            <form className="space-y-6 flex-1 overflow-auto">
                                {/* Datos de Matrícula */}
                                <div className="border-b pb-4">
                                    <h2 className="text-2xl font-bold mb-4 text-[#800020]">Datos de Matrícula</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Estudiante</label>
                                            <input
                                                type="text"
                                                value={`${selectedForm.estudiante.nombres} ${selectedForm.estudiante.aPaterno} ${selectedForm.estudiante.aMaterno}`}
                                                readOnly
                                                className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Matrícula</label>
                                            <input
                                                type="text"
                                                value={selectedForm.fechaMatricula}
                                                readOnly
                                                className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Ciclo </label>
                                            <input
                                                type="text"
                                                value={selectedForm.cicloIngles}
                                                readOnly
                                                className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Grupo - Horario</label>
                                            <input
                                                type="text"
                                                value={selectedForm.horarioIngles}
                                                readOnly
                                                className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Datos de Pago */}
                                <div className="border-b pb-4">
                                    <h2 className="text-2xl font-bold mb-4 text-[#800020]">Datos de Pago</h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Pago</label>
                                            <input
                                                type="date"
                                                value={selectedForm.fechaPago}
                                                readOnly
                                                className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Monto</label>
                                            <input
                                                type="text"
                                                value={selectedForm.montoPago}
                                                readOnly
                                                className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Medio de Pago</label>
                                            <input
                                                type="text"
                                                value={selectedForm.medioPago}
                                                readOnly
                                                className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Nro Voucher - Comprobante</label>
                                            <input
                                                type="text"
                                                value={selectedForm.nroComprobante}
                                                readOnly
                                                className="w-full p-2 border border-gray-300 rounded-md bg-gray-50"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-gray-700 mb-">Comprobante de Pago:</label>
                                        {selectedForm.imgComprobante ? (
                                            <div className="mb-4 text-center">
                                                <img
                                                    src={selectedForm.imgComprobante}
                                                    alt="Comprobante"
                                                    className="max-w-full max-h-[500px] object-contain border border-gray-300 rounded inline-block"
                                                />
                                            </div>
                                        ) : (
                                            <p className="text-gray-500 italic">No se ha encontrado el comprobante</p>
                                        )}
                                    </div>
                                </div>
                                {/* Botones Aceptar y Rechazar*/}
                                <div className="flex justify-center space-x-4 mt-4" >
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (window.confirm("¿Estás seguro de aceptar este formulario?")) {
                                                handleAceptar();
                                            }
                                        }}
                                        className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded transition duration-200 ${ver ? "opacity-50 cursor-not-allowed" : ""
                                            }`}
                                        disabled={ver}
                                    >
                                        Aceptar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (window.confirm("¿Estás seguro de rechazar este formulario? Se eliminaran los datos de este formulario")) {
                                                handleRechazar();
                                            }
                                        }}
                                        className={`bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded transition duration-200 ${ver ? "opacity-50 cursor-not-allowed" : ""
                                            }`}
                                        disabled={ver}
                                    >
                                        Rechazar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}


                {/* Tabla de Formularios Matriculas - Mensualidades */}
                <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6">
                    <table className="min-w-full table-auto">
                        <thead className="bg-[#800020] text-white">
                            <tr>
                                <th className="px-6 py-3 text-center">Nombres Estudiante</th>
                                <th className="px-6 py-3 text-center">Estado</th>
                                <th className="px-6 py-3 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredForms.length > 0 ? (
                                filteredForms.map((form, index) => (
                                    <tr key={index} className="border-b hover:bg-[#F4D6C5] items-center">
                                        <td className="px-6 py-3 text-center">{form.estudiante.nombres} {form.estudiante.aMaterno} {form.estudiante.aPaterno}</td>
                                        <td className="px-6 py-3 text-center">
                                            {form.estado === 'aceptado' ? (
                                                <span className="text-green-500 flex items-center">
                                                    <FaCheckCircle className="mr-2" /> ACEPTADO
                                                </span>
                                            ) : form.estado === 'pendiente' ? (
                                                <span className="text-red-500 flex items-center">
                                                    <FaTimesCircle className="mr-2" /> PENDIENTE
                                                </span>
                                            ) : (
                                                <span className="text-red-500 flex items-center">
                                                    indefinido
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-3 text-center">
                                            {form.estado === 'pendiente' ? (
                                                <button
                                                    onClick={() => handleFormClick(form, '')}
                                                    className="text-[#800020] hover:text-[#6A4E3C]"
                                                >
                                                    <FaEye className="text-xl" />
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleFormClick(form, 'ver')}
                                                    className="text-gray-700 hover:text- gray-400"
                                                >
                                                    <FaEye className="text-xl" />
                                                </button>


                                            )}

                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-3 text-center text-gray-500">No se encontraron Formularios de Matricula.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {/* Paginación */}
                    <div className="mt-4 flex justify-center">
                        {formMatriculas.links.map((link, index) => (
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

const VistaFormularios = ({ ListaFormularios }) => {

    const [search, setSearch] = useState('');

    return (
        <div className="overflow-hidden bg py-12 min-h-screen">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Buscador */}
                <div className="mb-4 flex justify-center">
                    <div className="relative max-w-sm w-full">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Buscar por Apellido del estudiante"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#800020]"
                        />
                        <FaSearch className="absolute right-3 top-2 text-gray-500" />
                    </div>
                </div>

                {/* Vista de Formularios */}
                <TablaFormularios formMatriculas={ListaFormularios} search={search} />
            </div>
        </div>
    );
};

export default VistaFormularios;