import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react'; 
import DatosGenerales from './Formulario/DatosGenerales';
import DatosAdicionales from './Formulario/DatosAdicionales';
import DatosPagoCaja from './Formulario/DatosPagoCaja';
import DatosPagoBanco from './Formulario/DatosPagoBanco';


export default function Welcome({ auth, ListaGrupos, ListaCiclos=[] }) {
    
    const [montoIdioma, setMontoIdioma] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { data, setData, post, errors: serverErrors, reset } = useForm({
        nombres: '',
        aPaterno: '',
        aMaterno: '',
        dni: '',
        sexo: '',
        celular: '',
        fechaNacimiento: '',
        tipoAlumno: '',
        programaEstudios: '',
        semestre: '',
        correoInstitucional: '',
        email: '',
        anioEgreso: '',
        institucionProviene: '',
        medioPublicitario: '',
        cicloIngles: '',
        horarioIngles: '',
        realizoInglesBasico: '',
        realizoInglesIntermedio: '',
        tienecertificadoIngles: '',
        tieneCertificadoIntermedio: '',
        medioPago: '',
        fechaPago: '',
        montoPago: 0,
        nroComprobante: '',
        imgComprobante: null,
        estado: 'Pendiente'
    });

    const [validationErrors, setValidationErrors] = useState({}); // Añadir estado local para errores

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        // Validar DNI
        if (!data.dni || data.dni.length !== 8 || !/^\d+$/.test(data.dni)) {
            formErrors.dni = 'DNI debe tener 8 dígitos';
            isValid = false;
        }

        // Validar campos obligatorios
        const requiredFields = {
            nombres: 'Nombres',
            aPaterno: 'Apellido Paterno',
            aMaterno: 'Apellido Materno',
            sexo: 'Sexo',
            celular: 'Celular',
            fechaNacimiento: 'Fecha de Nacimiento',
            tipoAlumno: 'Tipo de Alumno',
            cicloIngles: 'Ciclo de Inglés',
            horarioIngles: 'Horario',
            medioPago: 'Medio de Pago',
            nroComprobante: 'Número de Comprobante',
            fechaPago: 'Fecha de Pago',
            montoPago: 'Monto de Pago'
        };

        Object.entries(requiredFields).forEach(([field, label]) => {
            if (!data[field]) {
                formErrors[field] = `${label} es obligatorio`;
                isValid = false;
            }
        });

        // Validar celular
        if (data.celular && data.celular.length !== 9) {
            formErrors.celular = 'El celular debe tener 9 dígitos';
            isValid = false;
        }

        // Validar correos según tipo de alumno
        if (data.tipoAlumno === 'alumno') {
            if (!data.correoInstitucional || !data.correoInstitucional.endsWith('@istta.edu.pe')) {
                formErrors.correoInstitucional = 'Correo institucional inválido';
                isValid = false;
            }
        } else if (data.tipoAlumno === 'no_alumno' && !data.email) {
            formErrors.email = 'Correo personal es obligatorio';
            isValid = false;
        }

        // Validar comprobante de pago
        if (!data.imgComprobante) {
            formErrors.imgComprobante = 'Debe adjuntar un comprobante';
            isValid = false;
        }

        setValidationErrors(formErrors); // Usar setValidationErrors en lugar de setErrors
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessMessage('');
        /*
                if (!validateForm()) {
                    window.scrollTo(0, 0); // Opcional: scroll al inicio para ver errores
                    alert('Por favor, corrija los errores antes de enviar el formulario');
                    return;
                }*/

        // Crear un FormData si hay un archivo
        const formData = new FormData();

        // Agregar todos los campos al FormData
        Object.keys(data).forEach(key => {
            if (key === 'imgComprobante' && data[key] instanceof File) {
                formData.append(key, data[key]);
            } else if (data[key] !== null && data[key] !== undefined) {
                formData.append(key, data[key]);
            }
        });

        // Enviar el formulario usando post
        post(route('formulario.store'), {
            forceFormData: true,
            data: formData,
            onSuccess: () => {
                reset();
                setSuccessMessage('Formulario enviado correctamente.');
            },
            onError: (errors) => {
                console.error(errors);
                setErrors(errors);
                alert('Error al enviar el formulario');
            }
        });

    };



    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gradient-to-b from-[#800020] to-[#F5D0A9] min-h-screen text-black">
                <div className="fixed top-0 left-0 right-0 z-50 shadow-md">
                    <header className="flex items-center bg-white w-full px-4 py-2">
                        <div className="flex items-center space-x-4 ml-4">
                            <img
                                src="imagenes/logo.png"
                                alt="Logo de la Institución"
                                className="h-16 w-auto"
                            />
                            <h2 className="text-xl font-semibold text-black mt-4">
                                CENTRO DE IDIOMAS
                            </h2>
                        </div>
                        <nav className="flex items-center space-x-6 ml-auto">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-white hover:bg-[#800020] focus:outline-none focus-visible:ring-[#FF2D20]"
                                >
                                    Entrada
                                </Link>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-white hover:bg-[#800020] focus:outline-none focus-visible:ring-[#FF2D20]"
                                >
                                    Iniciar Sesión
                                </Link>
                            )}
                        </nav>
                    </header>
                </div>

                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white pt-20">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <main className="p-8">
                            <div className="welcome-container">
                                <h1 className="text-3xl font-bold text-white mb-6 text-center">Formulario de Inscripción</h1>

                                {successMessage && (
                                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                                        <span className="block sm:inline">{successMessage}</span>
                                    </div>
                                )}
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="triptico-container grid grid-cols-3 gap-6">
                                        <div className="triptico-section bg-white/90 p-4 rounded-lg shadow-md">
                                            <DatosGenerales data={data} setData={setData} errors={{ ...serverErrors, ...validationErrors }} />
                                        </div>
                                        <div className="triptico-section bg-white/90 p-4 rounded-lg shadow-md">
                                            <DatosAdicionales setMontoIdioma={setMontoIdioma} grupos={ListaGrupos} ciclos={ListaCiclos} data={data} setData={setData} />
                                        </div>
                                        <div className="triptico-section bg-white/90 p-4 rounded-lg shadow-md">
                                            <DatosPagoBanco />
                                            <DatosPagoCaja montoIdioma={montoIdioma} data={data} setData={setData} />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="text-center">
                                        <button
                                            type="submit"
                                            className="bg-[#800020] text-white px-6 py-2 rounded-md hover:bg-[#6A4E3C] transition-colors"
                                        >
                                            Enviar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </main>
                        <footer className="py-16 text-center text-sm text-white">
                            Copyright
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}