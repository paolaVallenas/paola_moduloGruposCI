import { useState } from 'react';

const DatosPagoCaja = ({ data, setData,montoIdioma, errors }) => {
    const [fieldErrors, setFieldErrors] = useState({});

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'nroComprobante':
                if (!value) {
                    error = 'El número de comprobante es obligatorio';
                } else if (value.length > 10) {
                    error = 'Máximo 10 caracteres';
                } else if (!/^[0-9-]+$/.test(value)) {
                    error = 'Solo números y guiones permitidos';
                }
                break;
            case 'fechaPago':
                if (!value) {
                    error = 'La fecha de pago es obligatoria';
                } else {
                    const fechaPago = new Date(value);
                    const hoy = new Date();
                    // Establecer horas a 0 para comparar solo fechas
                    fechaPago.setHours(0, 0, 0, 0);
                    hoy.setHours(0, 0, 0, 0);

                    if (fechaPago > hoy) {
                        error = 'La fecha no puede ser futura';
                    }
                    
                    // Validar que no sea más antigua que 7 días
                    const sevenDaysAgo = new Date(hoy);
                    sevenDaysAgo.setDate(hoy.getDate() - 7);
                    if (fechaPago < sevenDaysAgo) {
                        error = 'La fecha no puede ser más antigua que 7 días';
                    }
                }
                break;
            case 'medioPago':
                if (!value) {
                    error = 'Debe seleccionar un medio de pago';
                }
                break;
            case 'montoPago':
                if (!value || value === '0' || value === 0) {
                    error = 'Debe seleccionar un monto de pago';
                }
                break;
            case 'imgComprobante':
                if (!value) {
                    error = 'Debe adjuntar un comprobante';
                } else if (value instanceof File) {
                    if (!['image/jpeg', 'image/png'].includes(value.type)) {
                        error = 'Solo se permiten imágenes JPG o PNG';
                    } else if (value.size > 2 * 1024 * 1024) {
                        error = 'La imagen no debe superar 2MB';
                    }
                }
                break;
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Validación específica para nroComprobante
        if (name === 'nroComprobante') {
            if (!/^[0-9-]*$/.test(value)) {
                return; // No actualizar si contiene caracteres no permitidos
            }
            if (value.length > 10) {
                return; // No actualizar si excede longitud máxima
            }
        }

        const error = validateField(name, value);
        setFieldErrors(prev => ({
            ...prev,
            [name]: error
        }));

        setData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleVoucherChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const error = validateField('imgComprobante', file);
            setFieldErrors(prev => ({
                ...prev,
                imgComprobante: error
            }));
            
            if (!error) {
                setData(prev => ({ ...prev, imgComprobante: file }));
            } else {
                e.target.value = ''; // Limpiar input si hay error
                setData(prev => ({ ...prev, imgComprobante: null }));
            }
        } else {
            setFieldErrors(prev => ({
                ...prev,
                imgComprobante: 'Debe adjuntar un comprobante'
            }));
            setData(prev => ({ ...prev, imgComprobante: null }));
        }
    };

    const handleMontoChange = (e) => {
        const value = Number(e.target.value);
        const error = validateField('montoPago', value);
        setFieldErrors(prev => ({
            ...prev,
            montoPago: error
        }));
        setData(prev => ({
            ...prev,
            montoPago: value
        }));
    };

    return (
        <div className="datos-pago">
            <strong><h2>Información de Pagos - Caja del Instituto</h2></strong>
            
            <label>¿Cuál es el medio de Pago? *</label>
            <select 
                name="medioPago"
                value={data.medioPago || ''} 
                onChange={handleChange}
                className={fieldErrors.medioPago || errors?.medioPago ? 'error-input' : ''}
                required
            >
                <option value="">Seleccione...</option>
                <option value="CajaInstitucional">Caja Institucional</option>
                <option value="BancoNacion">Banco de la Nación</option>
            </select>
            {(fieldErrors.medioPago || errors?.medioPago) && 
                <span className="error-message">{fieldErrors.medioPago || errors?.medioPago}</span>}

            <label>Número de Operación/Recibo: *</label>
            <input 
                type="text" 
                name="nroComprobante"
                value={data.nroComprobante || ''} 
                onChange={handleChange}
                maxLength={10}
                className={fieldErrors.nroComprobante ? 'error-input' : ''}
                required
            />
            {fieldErrors.nroComprobante && <span className="error-message">{fieldErrors.nroComprobante}</span>}
            
            <label>Fecha de Pago: *</label>
            <input 
                type="date" 
                name="fechaPago"
                value={data.fechaPago || ''} 
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                className={fieldErrors.fechaPago ? 'error-input' : ''}
                required
            />
            {fieldErrors.fechaPago && <span className="error-message">{fieldErrors.fechaPago}</span>}

            <label>Monto de Pago: *</label>
            <select 
                name="montoPago"
                value={data.montoPago || ''} // Changed from 0 to ''
                onChange={handleMontoChange}
                className={fieldErrors.montoPago || errors?.montoPago ? 'error-input' : ''}
                required
            >
                <option value="">Seleccione...</option> {/* Changed from value={0} */}
                <option value={montoIdioma}>{montoIdioma} soles (Pago mes actual)</option>
            </select>
            {(fieldErrors.montoPago || errors?.montoPago) && 
                <span className="error-message">{fieldErrors.montoPago || errors?.montoPago}</span>}

            <label>Adjuntar Voucher: *</label>
            <input 
                type="file" 
                name="imgComprobante"
                accept="image/jpeg, image/png"
                onChange={handleVoucherChange}
                className={fieldErrors.imgComprobante || errors?.imgComprobante ? 'error-input' : ''}
                required
            />
            {(fieldErrors.imgComprobante || errors?.imgComprobante) && 
                <span className="error-message">{fieldErrors.imgComprobante || errors?.imgComprobante}</span>}
            <small>Importante: En la imagen del Voucher escribir de qué mes o meses está realizando el pago.</small>

            <style>{`
                .datos-pago .error-input {
                    border: 1px solid red;
                }
                .datos-pago .error-message {
                    color: red;
                    font-size: 0.8em;
                    margin-top: 2px;
                    display: block;
                }
            `}</style>
        </div>
    );
};

export default DatosPagoCaja;
