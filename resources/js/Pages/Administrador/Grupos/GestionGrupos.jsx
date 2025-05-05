import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';

const GestionGrupos = ({ grupos, ciclos, docentes, editingGrupo, onClose }) => {
    const { data, setData, processing, errors, reset } = useForm({
        periodo: '',
        modalidad: '',
        nroEstudiantes: 0,
        nroVacantes: '',
        horarioEntrada: '',
        horarioSalida: '',
        docente_id: '',
        ciclo_id: '',
    });

    const periodOptions = [
        'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
        'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE',
    ];

    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success'); // 'success' or 'error'
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'nroVacantes' && (value < 0 || value.includes('='))) {
            return;
        }
        setData(name, value);
    };

    const formatTo24Hour = (timeStr) => {
        if (!timeStr) return '';
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':');
        hours = parseInt(hours, 10);
        if (modifier === 'PM' && hours < 12) hours += 12;
        else if (modifier === 'AM' && hours === 12) hours = 0;
        return `${hours.toString().padStart(2, '0')}:${minutes}`;
    };

    const formatAMPM = (time) => {
        const [hours, minutes] = time.split(':');
        let hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;
        return `${hour}:${minutes} ${ampm}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let validationErrors = {};

        // Validación de campos
        if (!data.modalidad) validationErrors.modalidad = 'Por favor, seleccione una modalidad válida.';
        if (!data.ciclo_id) validationErrors.ciclo_id = 'Por favor, seleccione un ciclo válido.';
        if (!data.docente_id) validationErrors.docente_id = 'Por favor, seleccione un docente válido.';
        if (!data.nroVacantes || data.nroVacantes <= 0) validationErrors.nroVacantes = 'Ingrese un número válido de vacantes.';
        if (data.horarioEntrada && data.horarioSalida && data.horarioEntrada >= data.horarioSalida) {
            validationErrors.horario = 'La hora de entrada debe ser anterior a la hora de salida.';
        }

        if (Object.keys(validationErrors).length > 0) {
            // Mostrar errores
            setFormErrors(validationErrors);
            setAlertMessage('Corrige los errores antes de continuar.');
            setAlertType('error');
            return;
        }

        // Formateo de horas
        if (data.horarioEntrada && data.horarioSalida) {
            const horarioEntradaFormatted = formatAMPM(data.horarioEntrada);
            const horarioSalidaFormatted = formatAMPM(data.horarioSalida);
            data.horario = `${horarioEntradaFormatted} - ${horarioSalidaFormatted}`;
        }

        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (data[key] !== null) {
                formData.append(key, data[key]);
            }
        });

        // Enviar formulario
        if (editingGrupo) {
            formData.append('_method', 'PUT');
            router.post(`/grupo/${editingGrupo.id}`, formData, {
                forceFormData: true,
                onSuccess: () => {
                    setAlertMessage('¡Grupo actualizado exitosamente!');
                    setAlertType('success');
                    reset();
                    if (onClose) onClose();
                },
                onError: () => {
                    setAlertMessage('Ocurrió un error al actualizar el grupo.');
                    setAlertType('error');
                },
            });
        } else {
            router.post('/grupo', formData, {
                forceFormData: true,
                onSuccess: () => {
                    setAlertMessage('¡Grupo registrado exitosamente!');
                    setAlertType('success');
                    reset();
                },
                onError: () => {
                    setAlertMessage('Ocurrió un error al registrar el grupo.');
                    setAlertType('error');
                },
            });
        }
    };

    const handleCancelEdit = () => {
        reset();
        if (onClose) onClose();
        setAlertMessage('Edición cancelada.');
        setAlertType('info');
    };

    return (
        <div className="container mx-auto p-6">
            {alertMessage && (
                <div
                    className={`p-4 mb-4 text-sm rounded ${alertType === 'success' ? 'bg-green-100 text-green-700' :
                            alertType === 'error' ? 'bg-red-100 text-red-700' :
                                'bg-blue-100 text-blue-700'
                        }`}
                >
                    {alertMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                        <label>Periodo</label>
                        <select
                            value={data.periodo}
                            onChange={(e) => setData('periodo', e.target.value)}
                            required
                            className="p-2 border border-gray-300 rounded w-full"
                        >
                            <option value="" disabled>Selecciona un Período</option>
                            {periodOptions.map((month, index) => (
                                <option key={index} value={month}>{month}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Modalidad</label>
                        <select
                            name="modalidad"
                            value={data.modalidad}
                            onChange={handleChange}
                            className="w-full rounded-md border-gray-300 shadow-sm"
                        >
                            <option value="">Seleccione una modalidad</option>
                            <option value="PRESENCIAL">PRESENCIAL</option>
                            <option value="VIRTUAL">VIRTUAL</option>
                        </select>
                        {formErrors.modalidad && (
                            <div className="text-red-500 text-sm mt-1">{formErrors.modalidad}</div>
                        )}
                    </div>

                    <div>
                        <label>Número de Vacantes</label>
                        <input
                            type="number"
                            name="nroVacantes"
                            value={data.nroVacantes}
                            onChange={handleChange}
                            className="w-full rounded-md border-gray-300 shadow-sm"
                        />
                        {formErrors.nroVacantes && (
                            <div className="text-red-500 text-sm mt-1">{formErrors.nroVacantes}</div>
                        )}
                    </div>

                    <div>
                        <label>Horario de Entrada</label>
                        <input
                            type="time"
                            name="horarioEntrada"
                            value={data.horarioEntrada}
                            onChange={handleChange}
                            className="w-full rounded-md border-gray-300 shadow-sm"
                        />
                    </div>

                    <div>
                        <label>Horario de Salida</label>
                        <input
                            type="time"
                            name="horarioSalida"
                            value={data.horarioSalida}
                            onChange={handleChange}
                            className="w-full rounded-md border-gray-300 shadow-sm"
                        />
                        {formErrors.horario && (
                            <div className="text-red-500 text-sm mt-1">{formErrors.horario}</div>
                        )}
                    </div>

                    <div>
                        <label>Ciclo</label>
                        <select
                            name="ciclo_id"
                            value={data.ciclo_id}
                            onChange={handleChange}
                            className="w-full rounded-md border-gray-300 shadow-sm"
                        >
                            <option value="">Seleccione un ciclo</option>
                            {ciclos?.map((ciclo) => (
                                <option key={ciclo.id} value={ciclo.id}>
                                    {`${ciclo.idioma.nombre} - ${ciclo.nombre} - ${ciclo.nivel}`}
                                </option>
                            ))}
                        </select>
                        {formErrors.ciclo_id && (
                            <div className="text-red-500 text-sm mt-1">{formErrors.ciclo_id}</div>
                        )}
                    </div>

                    <div>
                        <label>Docente</label>
                        <select
                            name="docente_id"
                            value={data.docente_id}
                            onChange={handleChange}
                            className="w-full rounded-md border-gray-300 shadow-sm"
                        >
                            <option value="">Seleccione un docente</option>
                            {docentes?.map((docente) => (
                                <option key={docente.id} value={docente.id}>
                                    {`${docente.nombres} ${docente.aPaterno} ${docente.aMaterno}`}
                                </option>
                            ))}
                        </select>
                        {formErrors.docente_id && (
                            <div className="text-red-500 text-sm mt-1">{formErrors.docente_id}</div>
                        )}
                    </div>

                    <div>
                        <input
                            type="number"
                            name="nroEstudiantes"
                            value={data.nroEstudiantes}
                            hidden
                            readOnly
                        />
                    </div>

                    <div className="flex items-center justify-end mt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
                        >
                            {editingGrupo ? 'Actualizar' : 'Registrar'}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="ml-3 bg-gray-300 text-black px-4 py-2 rounded-md"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default GestionGrupos;
