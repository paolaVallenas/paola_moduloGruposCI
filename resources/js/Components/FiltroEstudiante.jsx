import React, { useState } from 'react';

const FiltroEstudiante = ({ onFilter, filterOptions }) => {
    const [filtros, setFiltros] = useState({
        modalidad: '',
        horario: '',
        periodo: '',
        ciclo: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFiltros(prev => ({
            ...prev,
            [name]: value
        }));
        onFilter({ ...filtros, [name]: value });
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h3 className="text-lg font-semibold mb-4">Filtros</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <select
                    name="modalidad"
                    value={filtros.modalidad}
                    onChange={handleChange}
                    className="border rounded p-2"
                >
                    <option value="">Todas las modalidades</option>
                    {filterOptions.modalidades?.map((modalidad, index) => (
                        <option key={index} value={modalidad}>{modalidad}</option>
                    ))}
                </select>

                <select
                    name="horario"
                    value={filtros.horario}
                    onChange={handleChange}
                    className="border rounded p-2"
                >
                    <option value="">Todos los horarios</option>
                    {filterOptions.horarios?.map((horario, index) => (
                        <option key={index} value={horario}>{horario}</option>
                    ))}
                </select>

                <select
                    name="periodo"
                    value={filtros.periodo}
                    onChange={handleChange}
                    className="border rounded p-2"
                >
                    <option value="">Todos los periodos</option>
                    {filterOptions.periodos?.map((periodo, index) => (
                        <option key={index} value={periodo}>{periodo}</option>
                    ))}
                </select>

                <select
                    name="ciclo"
                    value={filtros.ciclo}
                    onChange={handleChange}
                    className="border rounded p-2"
                >
                    <option value="">Todos los ciclos</option>
                    {filterOptions.ciclos?.map((ciclo, index) => (
                        <option key={index} value={ciclo}>{ciclo}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default FiltroEstudiante;
