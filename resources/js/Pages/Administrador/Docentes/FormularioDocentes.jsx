import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import { FaUserGraduate, FaCreditCard, FaRegListAlt, FaPen } from 'react-icons/fa';

const FormularioDocentes = ({ Docente, closeModal }) => {

    const [editingDocente, setEditingDocente] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const isEdit = Boolean(editingDocente);
    const { data, setData, post, errors, processing, reset } = useForm({
        nombres: '',
        aPaterno: '',
        aMaterno: '',
        sexo: 'MASCULINO',
        dni: '',
        celular: '',
        fechaNacimiento: '',
        emailInstitucional: '',
        fotoDocente: null,
    });

    const handleEdit = (docente) => {

        setEditingDocente(docente);
        setData({
            ...docente,
            fotoDocente: null,  // Esto elimina la foto cuando editas
            _method: 'PUT',     // Asegúrate de enviar el método PUT si estás editando
        });
        setPreviewImage(docente.fotoDocente);  // Mantener la imagen previa
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    useEffect(() => {
        if (Docente != null) {
            handleEdit(Docente)
            console.log(Docente);

        }

    }, [Docente]);


    const validarFecha = (fecha) => {
        const fechaIngresada = new Date(fecha);
        const hoy = new Date();
        const edadMinima = 18; // Edad mínima requerida
        const fechaMinima = new Date(
            hoy.getFullYear() - edadMinima,
            hoy.getMonth(),
            hoy.getDate()
        );

        if (fechaIngresada > hoy) {
            return 'La fecha no puede estar en el futuro.';
        } else if (fechaIngresada > fechaMinima) {
            return `Debes tener al menos ${edadMinima} años.`;
        }
        return '';
    };


    const handleChange = (e) => {
        const key = e.target.name;
        const value = e.target.type === 'file'
            ? e.target.files[0]
            : e.target.name === 'emailInstitucional'
                ? e.target.value
                : e.target.value.toUpperCase();


        // Validación de email institucional
        if (key === 'emailInstitucional') {
            if (value && !value.endsWith('@istta.edu.pe')) {
                // Si no tiene el dominio correcto, agregarlo automáticamente
                setData({
                    ...data,
                    [key]: value.split('@')[0] + '@istta.edu.pe', // Mantiene el nombre antes del arroba y agrega el dominio
                });
            } else {
                setData({
                    ...data,
                    [key]: value,
                });
            }
        }
        // Validación de teléfono
        else if (key === 'celular' || key === 'dni') {
            // Verifica si el valor contiene solo números y no está vacío
            const numericValue = value.replace(/\D/g, ''); // Elimina cualquier carácter que no sea un número
            if (numericValue === value) {
                setData({
                    ...data,
                    [key]: numericValue, // Solo permite valores numéricos
                });
            } else {
                // Puedes mostrar un mensaje de error si lo deseas, por ejemplo:
                console.log("Este campo debe contener solo números.");
            }
        }
        else {
            setData({
                ...data,
                [key]: value,
            });
        }

        // Validación de fecha de nacimiento
        if (key === 'fechaNacimiento' && e.target.value) {
            errors['fechaNacimiento'] = validarFecha(value);
        }

        // Validación de foto docente (preview)
        if (key === 'fotoDocente' && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        // Validación para verificar si todos los campos están completos
        const requiredFields = ['nombres', 'aPaterno', 'aMaterno', 'dni', 'celular', 'fechaNacimiento', 'emailInstitucional', 'fotoDocente'];

        if (isEdit) {
            const formData = new FormData();
            Object.keys(data).forEach(key => {
                if (data[key] !== null) {
                    formData.append(key, data[key]);
                }
            });

            formData.append('_method', 'PUT');

            post(route('docente.update', editingDocente.id), {
                forceFormData: true,
                data: formData,
                onSuccess: () => {
                    reset();
                    setEditingDocente(null);
                    setPreviewImage(null);
                    closeModal();
                    setSuccessMessage('Docente actualizado con éxito.');
                },
                onError: (errors) => {
                    console.log('Errores:', errors);
                    setErrorMessage('Hubo un error al actualizar el docente.');
                },
            });
        } else {
            const formData = new FormData();
            Object.keys(data).forEach(key => {
                if (data[key] !== null && key !== '_method') {
                    formData.append(key, data[key]);
                }
            });

            post(route('docente.store'), {
                forceFormData: true,
                data: formData,
                onSuccess: () => {
                    reset();
                    setPreviewImage(null);
                    setSuccessMessage('Docente registrado con éxito.');
                },
                onError: (errors) => {
                    console.log('Errores:', errors);
                    setErrorMessage('Hubo un error al registrar el docente.');
                },
            });
        }
    };

    return (
        <div className="container mx-auto p-4 space-y-6">
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{successMessage}</span>
                </div>
            )}
            {errorMessage && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <span className="block sm:inline">{errorMessage}</span>
                </div>
            )}
            <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-white p-6 rounded-lg shadow"
                encType="multipart/form-data"
            >
                {/* Fila con dos columnas */}
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label>Nombres</label>
                        <input
                            type="text"
                            name="nombres"
                            value={data.nombres || ''}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                        {errors.nombres && (
                            <span className="text-red-500">{errors.nombres}</span>
                        )}
                    </div>
                    <div>
                        <label>Apellido Paterno</label>
                        <input
                            type="text"
                            name="aPaterno"
                            value={data.aPaterno || ''}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                        {errors.aPaterno && (
                            <span className="text-red-500">{errors.aPaterno}</span>
                        )}
                    </div>
                    <div>
                        <label>Apellido Materno</label>
                        <input
                            type="text"
                            name="aMaterno"
                            value={data.aMaterno || ''}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                        {errors.aMaterno && (
                            <span className="text-red-500">{errors.aMaterno}</span>
                        )}
                    </div>

                </div>

                {/* Fila con dos columnas */}
                <div className="grid grid-cols-3 gap-4">

                    <div>
                        <label>Sexo</label>
                        <select
                            name="sexo"
                            value={data.sexo || 'MASCULINO'}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        >
                            <option value="MASCULINO">Masculino</option>
                            <option value="FEMENINO">Femenino</option>
                        </select>
                        {errors.sexo && (
                            <span className="text-red-500">{errors.sexo}</span>
                        )}
                    </div>
                    <div>
                        <label>DNI</label>
                        <input
                            type="text"
                            name="dni"
                            value={data.dni || ''}
                            onChange={handleChange}
                            className="border p-2 w-full"
                            maxLength={8} // Limita la cantidad de caracteres a 9
                        />
                        {errors.dni && (
                            <span className="text-red-500">{errors.dni}</span>
                        )}
                    </div>
                    <div>
                        <label>Celular</label>
                        <input
                            type="text"
                            name="celular"
                            value={data.celular || ''}
                            onChange={handleChange}
                            className="border p-2 w-full"
                            maxLength={9} // Limita la cantidad de caracteres a 9
                        />
                        {errors.celular && (
                            <span className="text-red-500">{errors.celular}</span>
                        )}
                    </div>

                </div>

                {/* Fila con dos columnas */}
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label>Foto del Docente</label>
                        <input
                            type="file"
                            name="fotoDocente"
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                    </div>
                    <div>
                        <label>Fecha de Nacimiento</label>
                        <input
                            type="date"
                            name="fechaNacimiento"
                            value={data.fechaNacimiento || ''}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                        {errors.fechaNacimiento && (
                            <span className="text-red-500">{errors.fechaNacimiento}</span>
                        )}
                    </div>

                    <div>
                        <label>Email Institucional</label>
                        <input
                            type="email"
                            name="emailInstitucional"
                            value={data.emailInstitucional || ''}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        />
                        {errors.emailInstitucional && (
                            <span className="text-red-500">{errors.emailInstitucional}</span>
                        )}
                    </div>

                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>

                        {errors.fotoDocente && (
                            <span className="text-red-500">{errors.fotoDocente}</span>
                        )}
                        {previewImage && (
                            <div className="mt-2">
                                <img
                                    src={previewImage}
                                    alt="Vista previa"
                                    className="w-32 h-32 object-cover rounded"
                                />
                            </div>
                        )}
                    </div>

                </div>

                <div className="flex gap-2">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        disabled={processing}
                    >
                        {processing
                            ? 'Guardando...'
                            : isEdit
                                ? 'Actualizar'
                                : 'Registrar'}
                    </button>
                </div>
            </form>

        </div>
    );
};

export default FormularioDocentes;