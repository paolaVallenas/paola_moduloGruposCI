import React, { useState } from 'react';

const DatosGenerales = ({ data, setData, errors }) => {
    const [fieldErrors, setFieldErrors] = useState({});

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'nombres':
            case 'aPaterno':
            case 'aMaterno':
                if (!value.trim()) {
                    error = 'Este campo es obligatorio';
                } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value)) {
                    error = 'Solo se permiten letras';
                }
                break;
            case 'dni':
                if (!value) {
                    error = 'El DNI es obligatorio';
                } else if (!/^\d{8}$/.test(value)) {
                    error = 'El DNI debe tener 8 dígitos';
                }
                break;
            case 'celular':
                if (!value) {
                    error = 'El celular es obligatorio';
                } else if (!/^\d{9}$/.test(value)) {
                    error = 'El celular debe tener 9 dígitos';
                }
                break;
            case 'sexo':
                if (!value) {
                    error = 'Seleccione un género';
                }
                break;
            case 'fechaNacimiento':
                if (!value) {
                    error = 'La fecha de nacimiento es obligatoria';
                } else {
                    const fechaNac = new Date(value);
                    const hoy = new Date();

                    // Establecer la hora a 0 para comparar solo fechas
                    fechaNac.setHours(0, 0, 0, 0);
                    hoy.setHours(0, 0, 0, 0);

                    // Calcular edad
                    let edad = hoy.getFullYear() - fechaNac.getFullYear();
                    const mes = hoy.getMonth() - fechaNac.getMonth();
                    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
                        edad--;
                    }

                    if (fechaNac >= hoy) {
                        error = 'La fecha de nacimiento no puede ser hoy ni una fecha futura';
                    } else if (fechaNac.getFullYear() < 1900) {
                        error = 'Por favor ingrese una fecha válida';
                    } else if (edad < 18) {
                        error = 'Debe ser mayor de edad (18 años)';
                    }
                }
                break;
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validación específica para DNI y celular - solo permitir números
        if (name === 'dni' || name === 'celular') {
            if (!/^\d*$/.test(value)) {
                return; // No actualizar si contiene caracteres no numéricos
            }
            if ((name === 'dni' && value.length > 8) || 
                (name === 'celular' && value.length > 9)) {
                return; // No actualizar si excede la longitud máxima
            }
        }

        // Para campos de solo letras, filtrar entrada
        if (['nombres', 'aPaterno', 'aMaterno'].includes(name)) {
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) {
                return; // No actualizar si contiene caracteres no permitidos
            }
        }

        // Validar el campo
        const error = validateField(name, value);
        setFieldErrors(prev => ({
            ...prev,
            [name]: error
        }));

        // Actualizar el valor
        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="datos-generales">
            <strong><h2>Datos Generales</h2></strong>

            <label>Nombres: *</label>
            <input
                type="text"
                name="nombres"
                value={data.nombres}
                onChange={handleChange}
                className={fieldErrors.nombres ? 'error-input' : ''}
                required
            />
            {fieldErrors.nombres && <span className="error-message">{fieldErrors.nombres}</span>}

            <label>Apellido Paterno: *</label>
            <input
                type="text"
                name="aPaterno"
                value={data.aPaterno}
                onChange={handleChange}
                className={fieldErrors.aPaterno ? 'error-input' : ''}
                required
            />
            {fieldErrors.aPaterno && <span className="error-message">{fieldErrors.aPaterno}</span>}

            <label>Apellido Materno: *</label>
            <input
                type="text"
                name="aMaterno"
                value={data.aMaterno}
                onChange={handleChange}
                className={fieldErrors.aMaterno ? 'error-input' : ''}
                required
            />
            {fieldErrors.aMaterno && <span className="error-message">{fieldErrors.aMaterno}</span>}

            <label>DNI: *</label>
            <input
                type="text"
                name="dni"
                value={data.dni}
                onChange={handleChange}
                maxLength={8}
                pattern="\d*"
                inputMode="numeric"
                className={fieldErrors.dni ? 'error-input' : ''}
                required
            />
            {fieldErrors.dni && <span className="error-message">{fieldErrors.dni}</span>}

            <label>Sexo: *</label>
            <select
                name="sexo"
                value={data.sexo}
                onChange={handleChange}
                className={fieldErrors.sexo ? 'error-input' : ''}
                required
            >
                <option value="">Seleccione...</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
            </select>
            {fieldErrors.sexo && <span className="error-message">{fieldErrors.sexo}</span>}

            <label>Celular: *</label>
            <input
                type="text"
                name="celular"
                value={data.celular}
                onChange={handleChange}
                maxLength={9}
                pattern="\d*"
                inputMode="numeric"
                className={fieldErrors.celular ? 'error-input' : ''}
                required
            />
            {fieldErrors.celular && <span className="error-message">{fieldErrors.celular}</span>}

            <label>Fecha de Nacimiento: *</label>
            <input
                type="date"
                name="fechaNacimiento"
                value={data.fechaNacimiento}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                className={fieldErrors.fechaNacimiento ? 'error-input' : ''}
                required
            />
            {fieldErrors.fechaNacimiento && <span className="error-message">{fieldErrors.fechaNacimiento}</span>}

            <style>{`
                .datos-generales .error-input {
                    border: 1px solid red;
                }
                .datos-generales .error-message {
                    color: red;
                    font-size: 0.8em;
                    margin-top: 2px;
                    display: block;
                }
            `}</style>
        </div>
    );
};

export default DatosGenerales;
