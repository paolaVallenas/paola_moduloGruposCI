import React, { useState } from 'react';

const RegistrarAsistencias = ({ selectedGrupo }) => {
  // Define el estado de la asistencia
  const [estadoAsistencia, setEstadoAsistencia] = useState('Falta');

  // Función para cambiar el estado de la asistencia
  const cambiarEstadoAsistencia = () => {
    switch (estadoAsistencia) {
      case 'Presente':
        setEstadoAsistencia('Justificado');
        break;
      case 'Falta':
        setEstadoAsistencia('Presente');
        break;
      case 'Justificado':
        setEstadoAsistencia('Falta');
        break;
      default:
        setEstadoAsistencia('Falta');
    }
  };

  // Determina el estilo y el texto del botón según el estado
  const obtenerEstiloYTexto = () => {
    switch (estadoAsistencia) {
      case 'Presente':
        return { bgColor: 'bg-green-500', texto: 'Presente' };
      case 'Falta':
        return { bgColor: 'bg-red-500', texto: 'Falta' };
      case 'Justificado':
        return { bgColor: 'bg-blue-500', texto: 'Justificado' };
      default:
        return { bgColor: 'bg-gray-500', texto: 'Indefinido' };
    }
  };

  const { bgColor, texto } = obtenerEstiloYTexto();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4 text-center">Registro de Asistencias de ${new Date()}</h2>
      <table className="min-w-full bg-white border border-gray-300 shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Nombre</th>
            <th className="px-4 py-2 text-left">Asistencia</th>
          </tr>
        </thead>
        <tbody>
          {selectedGrupo.estudiantes?.map((estudiante) => {
            const matricula = selectedGrupo.matriculas?.find(
              m => m.estudiante_id === estudiante.id
            );
            return (
              <tr key={estudiante.id} className="hover:bg-[#F4D6C5]">
                <td className="px-4 py-2">{`${estudiante.nombres} ${estudiante.aPaterno} ${estudiante.aMaterno}`}</td>
                <td className="px-4 py-2">{estudiante.emailInstitucional}</td>
                <button
                  className={`text-white font-semibold py-2 px-4 rounded ${bgColor}`}
                  onClick={cambiarEstadoAsistencia}
                >
                  {texto}
                </button>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RegistrarAsistencias;
