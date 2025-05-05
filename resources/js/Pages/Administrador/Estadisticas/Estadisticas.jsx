import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { FaUserGraduate, FaBullhorn } from 'react-icons/fa';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
import axios from 'axios';

// Registro de los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, LineElement, PointElement);

const Estadisticas = ({ tiposAlumnos = [], medioPublicitario = [] }) => {
  const [dataTiposAlumnos, setDataTiposAlumnos] = useState([]);
  const [datamedioPublicitario, setDataMedioPublicitario] = useState([]);
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGraph, setSelectedGraph] = useState('pie');

  const handleFilterChange = async () => {
    if (!month || !year) {
      setError('Por favor, selecciona un mes y un año válidos.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/estadisticas/filtrar', {
        month: parseInt(month),
        year: parseInt(year),
        type: selectedCard,
      });

      if (response.data.error) {
        setError(response.data.error);
        return;
      }

      if (selectedCard === 'tiposAlumnos') {
        setDataTiposAlumnos(response.data.tiposAlumnos || []);
      } else if (selectedCard === 'medioPublicitario') {
        setDataMedioPublicitario(response.data.medioPublicitario || []);
      } else {
        setError('Error al obtener los datos.');
      }
    } catch (error) {
      if (error.response) {
        setError(`Error en el servidor: ${error.response.data.message || 'No se pudieron obtener los datos.'}`);
      } else {
        setError('Error en la conexión o solicitud al servidor.');
      }
    } finally {
      setLoading(false);
    }
  };

  const tiposAlumnosData = {
    labels: dataTiposAlumnos.map((item) => item.tipoAlumno),
    datasets: [
      {
        data: dataTiposAlumnos.map((item) => item.cantidad),
        backgroundColor: ['#40E0D0', '#FFD700', '#50C878'],
      },
    ],
  };

  const tiposAlumnosOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const total = tooltipItem.dataset.data.reduce((acc, value) => acc + value, 0);
            const percentage = Math.round((tooltipItem.raw / total) * 100);
            return `${tooltipItem.label}: ${Math.round(tooltipItem.raw)} (${percentage}%)`;
          },
        },
      },
    },
  };

  const medioPublicitarioData = {
    labels: datamedioPublicitario.map((item) => item.medioPublicitario),
    datasets: [
      {
        label: 'Medios Publicitarios',
        data: datamedioPublicitario.map((item) => item.cantidad),
        backgroundColor: ['#D6A8E4', '#6C1C2C', '#A3C6D8', '#F5D679', '#C8E6C9', '#F5A6B1'],
      },
    ],
  };

  const medioPublicitarioOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${Math.round(tooltipItem.raw)}`;
          },
        },
      },
    },
  };

  useEffect(() => {
    if (selectedCard) {
      handleFilterChange();
    }
  }, [month, year, selectedCard]);

  const handleCardClick = (cardType) => {
    setSelectedCard(cardType);
  };

  const renderTitle = () => {
    switch (selectedCard) {
      case 'tiposAlumnos':
        return 'Estadísticas de los Tipos de Estudiantes';
      case 'medioPublicitario':
        return 'Estadísticas de los Medios Publicitarios';
      default:
        return '';
    }
  };

  const handleGraphChange = (graphType) => {
    setSelectedGraph(graphType);
  };

  // Verifica si los datos están vacíos
  const isDataEmpty = selectedCard === 'tiposAlumnos' ? dataTiposAlumnos.length === 0 : datamedioPublicitario.length === 0;

  return (
    <AuthenticatedLayout
      header={<h2 className="text-3xl font-bold leading-tight text-white bg-gradient-to-r from-[#800020] to-[#6A4E3C] p-4 rounded-lg shadow-lg text-center">Estadísticas</h2>}
    >
      <Head title="Estadísticas" />
      <div className="py-12 bg-gradient-to-b from-[#800020] to-[#F5D0A9]">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="bg-amber-50 p-8 rounded-lg shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center items-center">
              <div
                className="bg-[#800020] p-6 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#6A4E3C] transition-all cursor-pointer max-w-xs mx-auto"
                onClick={() => handleCardClick('tiposAlumnos')}
                aria-label="tiposAlumnos"
              >
                <div className="flex justify-center items-center mb-4">
                  <FaUserGraduate className="text-[#F5D0A9] text-4xl mb-4 transition-transform transform hover:scale-110 hover:text-[#F2C49B]" />
                </div>
                <h4 className="text-2xl text-center font-semibold text-[#F5D0A9]">Tipos de Estudiante</h4>
                <p className="text-[#F5D0A9]">Información sobre los diferentes tipos de estudiantes en el sistema.</p>
              </div>

              <div
                className="bg-[#800020] p-6 rounded-lg shadow-lg hover:shadow-2xl hover:bg-[#6A4E3C] transition-all cursor-pointer max-w-xs mx-auto"
                onClick={() => handleCardClick('medioPublicitario')}
                aria-label="medioPublicitario"
              >
                <div className="flex justify-center items-center mb-4">
                  <FaBullhorn className="text-[#F5D0A9] text-4xl mb-4 transition-transform transform hover:scale-110 hover:text-[#F2C49B]" />
                </div>
                <h4 className="text-2xl text-center font-semibold text-[#F5D0A9]">Medios Publicitarios</h4>
                <p className="text-[#F5D0A9]">Estadísticas sobre las campañas publicitarias y su rendimiento.</p>
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <h3 className="text-3xl font-semibold text-white bg-gradient-to-r from-[#3E0B10] to-[#6B0F00] p-3 rounded-lg shadow-md">
              {renderTitle()}
            </h3>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-6 mb-6 justify-center items-center sm:items-start">
            <div className="text-center sm:text-left mb-6 sm:mb-0 w-full">
              <h2 className="text-2xl font-semibold text-[#33333]">Filtrar por mes y año</h2>
              <p className="text-sm text-gray-50 mt-2">Selecciona el mes y el año para filtrar los resultados.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center sm:items-start w-full">
              <div className="w-full sm:w-auto">
                <label htmlFor="month" className="block text-sm font-medium text-[#3333332]">Mes</label>
                <select
                  id="month"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="mt-1 px-4 py-3 bg-white text-black rounded-md w-full sm:w-56 border border-gray-300 focus:ring-2 focus:ring-[#3E0B10]"
                  aria-label="Mes de filtro"
                >
                  <option value="">Selecciona un mes</option>
                  {[...Array(12)].map((_, index) => (
                    <option key={index} value={index + 1}>
                      {new Date(2024, index).toLocaleString('default', { month: 'long' })}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full sm:w-auto">
  <label htmlFor="year" className="block text-sm font-medium text-[#3333331]">Año</label>
  <select
    id="year"
    value={year}
    onChange={(e) => setYear(e.target.value)}
    className="mt-1 px-4 py-3 bg-white text-black rounded-md w-full sm:w-56 border border-gray-300 focus:ring-2 focus:ring-[#3E0B10]"
    aria-label="Año de filtro"
  >
    <option value="">Selecciona un año</option>
    {
      // Generar un rango de años desde 2020 hasta el año actual
      [...Array(new Date().getFullYear() - 2020 + 1)].map((_, index) => {
        const yearOption = 2020 + index; // Año empieza en 2020 y se incrementa
        return (
          <option key={yearOption} value={yearOption}>
            {yearOption}
          </option>
        );
      })
    }
  </select>
</div>


              <div className="w-full sm:w-auto">
             
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-6">
            <button
              onClick={() => handleGraphChange('pie')}
              className={`py-2 px-4 mr-4 rounded-lg ${selectedGraph === 'pie' ? 'bg-[#800020] text-white' : 'bg-white text-gray-700'}`}
            >
              Gráfico de Torta
            </button>
            <button
              onClick={() => handleGraphChange('bar')}
              className={`py-2 px-4 mr-4 rounded-lg ${selectedGraph === 'bar' ? 'bg-[#800020] text-white' : 'bg-white text-gray-700'}`}
            >
              Gráfico de Barras
            </button>
            <button
              onClick={() => handleGraphChange('line')}
              className={`py-2 px-4 rounded-lg ${selectedGraph === 'line' ? 'bg-[#800020] text-white' : 'bg-white text-gray-700'}`}
            >
              Gráfico de Línea
            </button>
          </div>

          {selectedCard === 'tiposAlumnos' && (
            <div className="bg-amber-50 p-6 rounded-lg shadow-lg">
              {loading && <div>Loading...</div>}
              {error && <div className="text-red-600">{error}</div>}
              {isDataEmpty ? (
  <div className="flex justify-center items-center p-6 bg-[#800020] border-2 border-black rounded-lg shadow-lg text-white font-semibold text-lg">
    <span className="mr-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text- white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </span>
    <span>No hay datos disponibles para este filtro. ¡Intenta con otro mes o año!</span>
  </div>
              ) : (
                <>
                  {selectedGraph === 'pie' && <Pie data={tiposAlumnosData} options={tiposAlumnosOptions} />}
                  {selectedGraph === 'bar' && <Bar data={tiposAlumnosData} options={tiposAlumnosOptions} />}
                  {selectedGraph === 'line' && <Line data={tiposAlumnosData} options={tiposAlumnosOptions} />}
                </>
              )}
            </div>
          )}

          {selectedCard === 'medioPublicitario' && (
            <div className="bg-amber-50 p-6 rounded-lg shadow-md">
              {loading && <div>Loading...</div>}
              {error && <div className="text-red-600">{error}</div>}
              {isDataEmpty ? (
  <div className="flex justify-center items-center p-6 bg-[#800020] border-2 border-black rounded-lg shadow-lg text-white font-semibold text-lg">
    <span className="mr-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </span>
    <span>No hay datos disponibles para este filtro. ¡Intenta con otro mes o año!</span>
  </div>
              ) : (
                <>
                  {selectedGraph === 'pie' && <Pie data={medioPublicitarioData} options={medioPublicitarioOptions} />}
                  {selectedGraph === 'bar' && <Bar data={medioPublicitarioData} options={medioPublicitarioOptions} />}
                  {selectedGraph === 'line' && <Line data={medioPublicitarioData} options={medioPublicitarioOptions} />}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Estadisticas;
