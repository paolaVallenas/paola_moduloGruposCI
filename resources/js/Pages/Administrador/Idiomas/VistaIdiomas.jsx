import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { FaEye, FaPen } from 'react-icons/fa';

const VistaIdiomas = ({ idiomas = [] }) => {
  const { data, setData, post, put, processing, errors } = useForm({
    nombre: '',
    montoMes: '',
    nivelCert: '',
  });//formulario para idiomas

  const [languages, setLanguages] = useState(Array.isArray(idiomas) ? idiomas : []);//lista de Idiomas

  const [selectedLanguage, setSelectedLanguage] = useState(null); // Idioma seleccionado para edición
  const [message, setMessage] = useState(''); // Mensaje de confirmación

  // Manejar el envío del formulario para registrar o editar un idioma
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedLanguage) {
      // Editar idioma en base de datos
      put(route('idioma.update', selectedLanguage), {
        onSuccess: () => setMessage('Idioma modificado exitosamente.')
      });

      // Limpiar selección de idioma
      setSelectedLanguage(null);

    } else {
      // Crear y registrar un nuevo idioma en la base de datos
      post(route('idioma.store'), {
        onSuccess: () => setMessage('Idioma agregado exitosamente.')
      });

    }
    // Limpiar el formulario
    setData({
      nombre: '',
      montoMes: '',
      nivelCert: ''
    });
  };

  // Manejar la edición de un idioma
  const handleEdit = (language) => {
    setSelectedLanguage(language.id);
    setData({
      nombre: language.nombre,
      montoMes: language.montoMes,
      nivelCert: language.nivelCert
    });
  };
  const handleCancel = () => {
    setSelectedLanguage(null);
    setData({
      nombre: '',
      montoMes: '',
      nivelCert: ''
    });
  };

  return (
    <div className="min-h-screen bg- py-12">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6 mb-6">
          <h3 className="text-xl font-semibold mb-2 text-center md:text-left">Registrar</h3>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center w-full space-x-6">
            <div className="flex flex-col w-full md:w-auto">
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                Idioma
              </label>
              <input
                type="text"
                id="nombre"
                value={data.nombre}
                onChange={(e) => setData('nombre', e.target.value.toUpperCase())}
                required
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <div className="flex flex-col w-full md:w-auto">
              <label htmlFor="montoMes" className="block text-sm font-medium text-gray-700 mb-1">
                Monto del Mes
              </label>
              <input
                id="montoMes"
                type="number"
                value={data.montoMes}
                onChange={(e) => setData('montoMes', Number(e.target.value))}
                min="1"
                required
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>

            <div className="flex flex-col w-full md:w-auto">
              <label htmlFor="nivelCert" className="block text-sm font-medium text-gray-700 mb-1">
                Nivel de Certificación
              </label>
              <input
                id="nivelCert"
                type="number"
                value={data.nivelCert}
                onChange={(e) => setData('nivelCert', Number(e.target.value))}
                min="1"
                required
                className="p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className={`text-white px-4 py-2 rounded ${selectedLanguage ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}`}
              >
                {selectedLanguage ? 'Modificar' : 'Agregar'}
              </button>

              {errors.nombre && <span className="text-red-500 text-sm">{errors.nombre}</span>}

              {selectedLanguage && (
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded w-full md:w-auto hover:bg-black-600"
                >
                  Cancelar
                </button>
              )}
            </div>

          </form>

        </div>
        {message && <div className="text-green-500 text-center mb-4">{message}</div>}
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse bg-white shadow-lg rounded-lg">
              <thead className="bg-[#800020] text-white">
                <tr >
                  <th className="border-b-2 border-gray-300 px-4 py-2" >Nombre</th>
                  <th className="border-b-2 border-gray-300 px-4 py-2" >Monto de Mes</th>
                  <th className="border-b-2 border-gray-300 px-4 py-2" >Nivel de Certificacion</th>
                  <th className="border-b-2 border-gray-300 px-4 py-2" >Acciones</th>
                </tr>
              </thead>
              <tbody>
                {languages && languages.length > 0 ? (languages.map((language, index) => (
                  <tr key={index} className="text-center border-b hover:bg-[#F4D6C5]">
                    <td className="border-b border-gray-300 px-4 py-2">{language.nombre}</td>
                    <td className="border-b border-gray-300 px-4 py-2">{language.montoMes}</td>
                    <td className="border-b border-gray-300 px-4 py-2">{language.nivelCert}</td>
                    <td className="border-b border-gray-300 px-4 py-2">
                      <button
                        onClick={() => handleEdit(language)}
                        className="text-[#800020] hover:text-[#6A4E3C]"
                      >
                        <FaPen className="text-xl mr-3" />
                      </button>
                    </td>
                  </tr>
                ))) : (
                  <tr>
                    <td colSpan="5" className="border-b border-gray-300 px-4 py-2 text-center">
                      No hay registros
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VistaIdiomas;
