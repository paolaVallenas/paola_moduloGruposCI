import React, { useState } from 'react';

const DatosAdicionales = ({ data, setData, setMontoIdioma, grupos = [], errors }) => {
    const [correoEgresado, setCorreoEgresado] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});

    const validateSelect = (value, fieldName) => {
        if (!value || value === "") {
            setFieldErrors(prev => ({
                ...prev,
                [fieldName]: 'Este campo es obligatorio'
            }));
            return false;
        }
        setFieldErrors(prev => ({
            ...prev,
            [fieldName]: ''
        }));
        return true;
    };

    const handleTipoAlumnoChange = (e) => {
        const { value } = e.target;
        validateSelect(value, 'tipoAlumno');

        // Clear all fields based on previous selection
        const baseData = {
            ...data,
            tipoAlumno: value,
            programaEstudios: '',
            email: '',
            correoInstitucional: '',
            cicloIngles: '',
            horarioIngles: '',
            cicloNombre: '',
            horarioTexto: '',
            modalidad: ''
        };

        // Clear specific fields based on new selection
        if (value === 'alumno') {
            setData({
                ...baseData,
                anioEgreso: '',
                institucionProviene: '',
                medioPublicitario: ''
            });
        } else if (value === 'egresado') {
            setData({
                ...baseData,
                semestre: '',
                institucionProviene: '',
                medioPublicitario: ''
            });
        } else if (value === 'no_alumno') {
            setData({
                ...baseData,
                semestre: '',
                anioEgreso: ''
            });
        } else {
            setData(baseData);
        }

        // Clear field errors
        setFieldErrors({});

        // Reset correoEgresado state if exists
        setCorreoEgresado('');
    };

    const handleProgramaEstudiosChange = (e) => {
        const { value } = e.target;
        validateSelect(value, 'programaEstudios');
        setData({ ...data, programaEstudios: value });
    };

    const handleSemestreChange = (e) => {
        const { value } = e.target;
        validateSelect(value, 'semestre');
        setData({ ...data, semestre: value });
    };

    const handleCicloInglesChange = (e) => {
        const { value } = e.target;
        validateSelect(value, 'cicloIngles');
        const selectedCiclo = grupos.find(g => g.ciclo.id === parseInt(value))?.ciclo;
        setData({
            ...data,
            cicloIngles: value,
            cicloNombre: selectedCiclo ? `${selectedCiclo.nombre} - ${selectedCiclo.idioma.nombre} - ${selectedCiclo.nivel}` : '',
            horarioIngles: ''
        });
        setMontoIdioma(selectedCiclo.idioma.montoMes);
    };

    const handleHorarioInglesChange = (e) => {
        const { value } = e.target;
        validateSelect(value, 'horarioIngles');
        const selectedGrupo = grupos.find(g => g.id === parseInt(value));
        setData({
            ...data,
            horarioIngles: value,
            horarioTexto: selectedGrupo?.horario || '',
            modalidad: selectedGrupo?.modalidad || ''
        });
    };

    const validateEmail = (email, type = 'personal') => {
        let error = '';
        if (!email) {
            error = 'El correo es obligatorio';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            error = 'Formato de correo inválido';
        } else if (type === 'institucional') {
            if (!email.endsWith('@istta.edu.pe')) {
                error = 'Debe ser un correo institucional (@istta.edu.pe)';
            }
        }
        return error;
    };

    const handleEmailChange = (e, type = 'personal') => {
        const { name, value } = e.target;
        const error = validateEmail(value, type);

        setFieldErrors(prev => ({
            ...prev,
            [name]: error
        }));

        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const renderEmailField = (type) => {
        if (type === 'institucional') {
            return (
                <div>
                    <label>Indique su correo institucional: *</label>
                    <input
                        type="email"
                        name="correoInstitucional"
                        value={data.correoInstitucional}
                        onChange={(e) => handleEmailChange(e, 'institucional')}
                        className={fieldErrors.correoInstitucional ? 'error-input' : ''}
                        required
                    />
                    {fieldErrors.correoInstitucional &&
                        <span className="error-message">{fieldErrors.correoInstitucional}</span>}
                </div>
            );
        } else {
            return (
                <div>
                    <label>Indique su correo personal: *</label>
                    <input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => handleEmailChange(e, 'personal')}
                        className={fieldErrors.email ? 'error-input' : ''}
                    />
                    {fieldErrors.email &&
                        <span className="error-message">{fieldErrors.email}</span>}
                </div>
            );
        }
    };

    // Add new validation handlers
    const handleMedioPublicitarioChange = (e) => {
        const { value } = e.target;
        validateSelect(value, 'medioPublicitario');
        setData({ ...data, medioPublicitario: e.target.value });
    };

    const handleInstitucionProvienChange = (e) => {
        const { value } = e.target;
        if (!value.trim()) {
            setFieldErrors(prev => ({
                ...prev,
                institucionProviene: 'Este campo es obligatorio'
            }));
        } else {
            setFieldErrors(prev => ({
                ...prev,
                institucionProviene: ''
            }));
        }
        setData({ ...data, institucionProviene: value });
    };

    const handleAnioEgresoChange = (e) => {
        const { value } = e.target;
        if (!value.trim()) {
            setFieldErrors(prev => ({
                ...prev,
                anioEgreso: 'Este campo es obligatorio'
            }));
        } else {
            setFieldErrors(prev => ({
                ...prev,
                anioEgreso: ''
            }));
        }
        setData({ ...data, anioEgreso: value });
    };

    const handleCorreoEgresadoChange = (e) => {
        const { value } = e.target;
        validateSelect(value, 'correoEgresado');
        setCorreoEgresado(value);
    };

    // Update the getCurrentMonthGroups helper function
    const getCurrentMonthGroups = () => {
        const currentMonth = new Date().toLocaleString('es-ES', { month: 'long' });
        return grupos.filter(grupo =>
            grupo.periodo.toLowerCase().includes(currentMonth.toLowerCase()) &&
            grupo.ciclo.nivel === 1
        );
    };

    return (
        <div className="datos-adicionales">
            <strong><h2>Datos Adicionales</h2></strong>
            <label>¿Usted es?</label>
            <div>
                <select
                    name="tipoAlumno"
                    value={data.tipoAlumno}
                    onChange={handleTipoAlumnoChange}
                    className={fieldErrors.tipoAlumno || errors?.tipoAlumno ? 'error-input' : ''}
                    required
                >
                    <option value="">Seleccione...</option>
                    <option value="alumno">Alumno del Instituto</option>
                    <option value="egresado">Egresado del Instituto</option>
                    <option value="no_alumno">No soy alumno del Instituto</option>
                </select>
                {(fieldErrors.tipoAlumno || errors?.tipoAlumno) &&
                    <span className="error-message">{fieldErrors.tipoAlumno || errors?.tipoAlumno}</span>}
            </div>

            {data.tipoAlumno === 'alumno' && (
                <div>
                    <label>Seleccione su programa de estudios:</label>
                    <select
                        value={data.programaEstudios}
                        onChange={handleProgramaEstudiosChange}
                        className={fieldErrors.programaEstudios ? 'error-input' : ''}
                        required
                    >
                        <option value="">Seleccione...</option>
                        <option value="dsi">Desarrollo de Sistemas de Informacion</option>
                        <option value="electronica">Electrónica Industrial</option>
                        <option value="ei">Electricidad Industrial</option>
                        <option value="ma">Mecanica Automotriz</option>
                        <option value="mpi">MPI</option>
                        <option value="contabilidad">Contabilidad</option>
                        <option value="got">Guia Oficial de Turismo</option>
                        <option value="ashr">ASHR</option>
                        <option value="lcap">LCAP</option>
                        <option value="et">ET</option>
                    </select>
                    {fieldErrors.programaEstudios &&
                        <span className="error-message">{fieldErrors.programaEstudios}</span>}

                    <label>Seleccione su semestre actual:</label>
                    <select
                        value={data.semestre}
                        onChange={handleSemestreChange}
                        className={fieldErrors.semestre ? 'error-input' : ''}
                        required
                    >
                        <option value="">Seleccione...</option>
                        <option value="I">I</option>
                        <option value="II">II</option>
                        <option value="III">III</option>
                        <option value="IV">IV</option>
                        <option value="V">V</option>
                        <option value="VI">VI</option>
                    </select>
                    {fieldErrors.semestre &&
                        <span className="error-message">{fieldErrors.semestre}</span>}

                    {renderEmailField('institucional')}
                </div>
            )}

            {data.tipoAlumno === 'egresado' && (
                <div>
                    <label>Seleccione su programa de estudios:</label>
                    <select
                        value={data.programaEstudios}
                        onChange={handleProgramaEstudiosChange}
                        className={fieldErrors.programaEstudios ? 'error-input' : ''}
                        required
                    >
                        <option value="">Seleccione...</option>
                        <option value="dsi">DSI</option>
                        <option value="electro">Electrónica I</option>
                        <option value="ei">EI</option>
                        <option value="ma">MA</option>
                        <option value="mpi">MPI</option>
                        <option value="conta">Conta</option>
                        <option value="got">GOT</option>
                        <option value="ashr">ASHR</option>
                        <option value="lcap">LCAP</option>
                        <option value="et">ET</option>
                    </select>
                    {fieldErrors.programaEstudios &&
                        <span className="error-message">{fieldErrors.programaEstudios}</span>}

                    <label>Año de Egreso: *</label>
                    <input
                        type="text"
                        value={data.anioEgreso}
                        onChange={handleAnioEgresoChange}
                        className={fieldErrors.anioEgreso ? 'error-input' : ''}
                        required
                    />
                    {fieldErrors.anioEgreso &&
                        <span className="error-message">{fieldErrors.anioEgreso}</span>}

                    <label>¿Cuenta con correo institucional? *</label>
                    <select
                        value={correoEgresado}
                        onChange={handleCorreoEgresadoChange}
                        className={fieldErrors.correoEgresado ? 'error-input' : ''}
                        required
                    >
                        <option value="">Seleccione...</option>
                        <option value="si">Sí</option>
                        <option value="no">No</option>
                    </select>
                    {fieldErrors.correoEgresado &&
                        <span className="error-message">{fieldErrors.correoEgresado}</span>}
                    {correoEgresado === 'si' && renderEmailField('institucional')}
                    {correoEgresado === 'no' && renderEmailField('personal')}
                </div>
            )}

            {data.tipoAlumno === 'no_alumno' && (
                <div>
                    <label>¿De qué institución proviene? *</label>
                    <input
                        type="text"
                        value={data.institucionProviene}
                        onChange={handleInstitucionProvienChange}
                        className={fieldErrors.institucionProviene ? 'error-input' : ''}
                        required
                    />
                    {fieldErrors.institucionProviene &&
                        <span className="error-message">{fieldErrors.institucionProviene}</span>}

                    <label>¿Dónde se enteró del centro de idiomas? *</label>
                    <select
                        value={data.medioPublicitario}
                        onChange={handleMedioPublicitarioChange}
                        className={fieldErrors.medioPublicitario ? 'error-input' : ''}
                        required
                    >
                        <option value="">Seleccione...</option>
                        <option value="pagina_web">Página web ISTTA</option>
                        <option value="facebook">Facebook</option>
                        <option value="anuncios">Anuncios</option>
                        <option value="folletos">Folletos</option>
                        <option value="amigos">Amigos</option>
                        <option value="familiar">Familiar</option>
                    </select>
                    {fieldErrors.medioPublicitario &&
                        <span className="error-message">{fieldErrors.medioPublicitario}</span>}

                    {renderEmailField('personal')}
                </div>
            )}

            {/* Ciclos de inglés */}
            <label>¿A qué ciclo de inglés desea matricularse?</label>
            <select
                value={data.cicloIngles}
                onChange={handleCicloInglesChange}
                className={fieldErrors.cicloIngles ? 'error-input' : ''}
                required
            >
                <option value="">Seleccione...</option>
                {getCurrentMonthGroups().map((grupo) => {
                    const ciclo = grupo.ciclo;
                    return (
                        <option key={grupo.id} value={ciclo.id}>
                            {`${ciclo?.nombre} - ${ciclo?.idioma?.nombre || ''} - ${ciclo?.nivel} - Periodo: ${grupo?.periodo}`}
                        </option>
                    );
                })}
            </select>
            {fieldErrors.cicloIngles &&
                <span className="error-message">{fieldErrors.cicloIngles}</span>}

            {/* Update the horarios filter logic */}
            {data.cicloIngles && (
                <div>
                    <label>Seleccione el horario disponible:</label>
                    <select
                        value={data.horarioIngles}
                        onChange={handleHorarioInglesChange}
                        className={fieldErrors.horarioIngles ? 'error-input' : ''}
                        required
                    >
                        <option value="">Seleccione...</option>
                        {grupos
                            .filter(grupo => {
                                const currentMonth = new Date().toLocaleString('es-ES', { month: 'long' });
                                return grupo.ciclo.id === parseInt(data.cicloIngles) &&
                                    grupo.periodo.toLowerCase().includes(currentMonth.toLowerCase());
                            })
                            .map((grupo) => (
                                <option key={grupo.id} value={grupo.id}>
                                    {`${grupo.modalidad} - ${grupo.horario} (Vacantes: ${grupo.nroVacantes})`}
                                </option>
                            ))}
                    </select>
                    {fieldErrors.horarioIngles &&
                        <span className="error-message">{fieldErrors.horarioIngles}</span>}

                    {/* Campos adicionales según el ciclo */}
                    {(() => {
                        const cicloSeleccionado = grupos.find(g => g.ciclo.id === parseInt(data.cicloIngles))?.ciclo;
                        const nombreCiclo = cicloSeleccionado?.nombre.toLowerCase() || '';

                        // Si es intermedio
                        if (nombreCiclo.includes('intermedio')) {
                            return (
                                <>
                                    <div className="mt-4">
                                        <label>¿Dónde realizó el ciclo básico?</label>
                                        <select
                                            value={data.realizoInglesBasico}
                                            onChange={(e) => setData({ ...data, realizoInglesBasico: e.target.value })}
                                        >
                                            <option value="">Seleccione...</option>
                                            <option value="istta">ISTTA</option>
                                            <option value="otro">Otro</option>
                                        </select>
                                    </div>
                                    <div className="mt-4">
                                        <label>¿Cuenta con certificado de básico?</label>
                                        <select
                                            value={data.tienecertificadoIngles}
                                            onChange={(e) => setData({ ...data, tienecertificadoIngles: e.target.value })}
                                        >
                                            <option value="">Seleccione...</option>
                                            <option value="si">Sí</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                </>
                            );
                        }

                        // Si es avanzado
                        if (nombreCiclo.includes('avanzado')) {
                            return (
                                <>
                                    <div className="mt-4">
                                        <label>¿Dónde realizó el ciclo intermedio?</label>
                                        <select
                                            value={data.realizoInglesIntermedio}
                                            onChange={(e) => setData({ ...data, realizoInglesIntermedio: e.target.value })}
                                        >
                                            <option value="">Seleccione...</option>
                                            <option value="istta">ISTTA</option>
                                            <option value="otro">Otro</option>
                                        </select>
                                    </div>
                                    <div className="mt-4">
                                        <label>¿Cuenta con certificado de intermedio?</label>
                                        <select
                                            value={data.tieneCertificadoIntermedio}
                                            onChange={(e) => setData({ ...data, tieneCertificadoIntermedio: e.target.value })}
                                        >
                                            <option value="">Seleccione...</option>
                                            <option value="si">Sí</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                </>
                            );
                        }

                        return null; // Si es básico, no mostrar campos adicionales
                    })()}
                </div>
            )}

            <style>{`
                .datos-adicionales .error-input {
                    border: 1px solid red;
                }
                .datos-adicionales .error-message {
                    color: red;
                    font-size: 0.8em;
                    margin-top: 2px;
                    display: block;
                }
            `}</style>
        </div>
    );
};

export default DatosAdicionales;