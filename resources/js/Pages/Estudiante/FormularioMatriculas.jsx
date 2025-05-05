import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';

function FormularioMatriculas({ grupos }) {
  const { flash } = usePage().props;
  const [montoIdioma, setMontoIdioma] = useState('');
  const [message, setMessage] = useState(''); // Mensaje de confirmación
  const [voucherPreview, setVoucherPreview] = useState(null); // Estado para la vista previa de la imagen

  const { data, setData, post, processing, errors } = useForm({
    fechaMatricula: new Date().toLocaleDateString('en-CA', { timeZone: 'America/Lima' }), // Fecha actual
    cicloIngles: '',
    horarioIngles: '',
    fechaPago: new Date().toLocaleDateString('en-CA', { timeZone: 'America/Lima' }), // Fecha actual
    nroComprobante: '',
    montoPago: 100,
    medioPago: '',
    imgComprobante: null,
  });
  const validarFecha = (fecha) => {
    const fechaIngresada = new Date(fecha);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    if (fechaIngresada > hoy) {
      return 'La fecha no puede estar en el futuro.';
    }
    return '';
  };
  // Manejador de cambio de fecha
  const handleFechaChange = (e) => {
    const nuevaFecha = e.target.value;
    setData('fechaPago', nuevaFecha); // Actualizar la fecha en el estado

    // Validar la nueva fecha
    const error = validarFecha(nuevaFecha);
    if (error) {
      // Si hay error, establecerlo usando setErrors de Inertia
      errors.fechaPago = error;
    } else {
      // Si no hay error, eliminar el error
      errors.fechaPago = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(data);

    post(route('estudiante.enviar'), {
      onSuccess: () => setMessage('Formulario de Matricula enviado correctamente.')
    });
    // Limpiar los campos (excepto los no mostrados)
    setData({
      fechaMatricula: new Date().toLocaleDateString('en-CA', { timeZone: 'America/Lima' }),// Fecha actual
      cicloIngles: '',
      horarioIngles: '',
      fechaPago: new Date().toLocaleDateString('en-CA', { timeZone: 'America/Lima' }),
      nroComprobante: '',
      montoPago: 100,
      medioPago: '',
      imgComprobante: null,
    });
    setVoucherPreview(null);
    setMontoIdioma('');
  };

  // Función para manejar la selección de la imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setData({ ...data, imgComprobante: e.target.files[0] || null });
    if (file) {
      // Crear una URL temporal para mostrar la vista previa
      const imageUrl = URL.createObjectURL(file);
      setVoucherPreview(imageUrl); // Establecer la URL para la vista previa


    } else {
      setVoucherPreview(null);
      setData('imgComprobante', null);
    }
  };


  // Limpieza de URLs temporales para liberar memoria
  React.useEffect(() => {
    return () => {
      if (voucherPreview) {
        URL.revokeObjectURL(voucherPreview);
      }

    };
  }, [voucherPreview]);
  // Filtra los horarios basados en el ciclo seleccionado 
  const horariosFiltrados = grupos.filter((grupo) => grupo.ciclo.id === parseInt(data.cicloIngles));

  // Función para actualizar el montoIdioma al seleccionar un ciclo
  const handleCicloChange = (e) => {
    const cicloId = e.target.value;
    setData('cicloIngles', cicloId); // Actualizar el ciclo

    // Buscar el montoMes del ciclo seleccionado
    const grupoSeleccionado = grupos.find(grupo => grupo.ciclo.id === parseInt(cicloId));
    if (grupoSeleccionado) {
      setMontoIdioma(grupoSeleccionado.ciclo.idioma.montoMes); // Establecer el monto
    } else {
      setMontoIdioma(''); // Si no se encuentra el ciclo, establecer monto en blanco
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-10 bg-white shadow-lg rounded-lg border border-gray-200" // Aumentar el max-width y padding
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-[#700303]">Formulario de Matriculas - Mensualidades</h2>
      {message && (<div className="bg-green-100 border border-green-400 text-green-700 px-4 text-center py-3 rounded relative">{message}</div>)}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-[#700303] mb-1">Ciclo:</label>
          <select
            id="cicloIngles"
            value={data.cicloIngles}
            onChange={handleCicloChange}
            required
            className="border border-[#700303] p-2 w-full max-w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#700303]"
          >
            <option value="">Seleccione Ciclo</option>
            {[...new Set(grupos.map(grupo => grupo.ciclo.id))].map((cicloId) => {
              const grupo = grupos.find(g => g.ciclo.id === cicloId);
              const ciclo = grupo?.ciclo;
              return (
                <option key={cicloId} value={cicloId}>
                  {/* Si ciclo o idioma son indefinidos, muestra una cadena vacía */}
                  {`${ciclo?.nombre || ''} - ${ciclo?.idioma?.nombre || ''} - ${ciclo?.nivel || ''}`}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#700303] mb-1">Horario:</label>
          <select
            id="horarioIngles"
            value={data.horarioIngles}
            onChange={(e) => setData('horarioIngles', e.target.value)}
            required
            className="border border-[#700303] p-2 w-full max-w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#700303] text-ellipsis overflow-hidden"
          >
            <option value="">Selecciona un horario</option>
            {horariosFiltrados.map((grupo) => (<option key={grupo.id} value={grupo.id}> {`${grupo.modalidad} - ${grupo.horario} (Vacantes: ${grupo.nroVacantes})`} </option>))}

          </select>
          {errors.horarioIngles && <p className="text-red-500 text-sm mt-1">{errors.horarioIngles}</p>}
        </div>


        <div>
          <label className="block text-sm font-medium text-[#700303] mb-1">Fecha de Pago:</label>
          <input
            id="fechaPago"
            type="date"
            value={data.fechaPago}
            onChange={handleFechaChange}
            required
            className="border border-[#700303] p-2 w-full rounded-md bg-gray-100"
          />
          {errors.fechaPago && (
            <span className="text-red-500 text-sm">{errors.fechaPago}</span>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#700303] mb-1">Monto Pagado:</label>
          <input
            type="text"
            value={montoIdioma} // Fijo
            disabled
            className="border border-[#700303] p-2 w-full rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#700303] mb-1">Medio de Pago:</label>
          <select
            id="medioPago"
            value={data.medioPago}
            onChange={(e) => setData('medioPago', e.target.value)}
            required
            className="border border-[#700303] p-2 w-full max-w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#700303]"
          >
            <option value="">Seleccione...</option>
            <option value="Caja Institucional">Caja Institucional</option>
            <option value="Banco de la Nación">Banco de la Nación</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#700303] mb-1">Nro Voucher:</label>
          <input
            id="nroComprobante"
            type="text"
            value={data.nroComprobante}
            onChange={(e) => setData('nroComprobante', e.target.value)}
            required
            className="border border-[#700303] p-2 w-full max-w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#700303]"
          />
          {errors.nroVoucher && <p className="text-red-500 text-sm mt-1">{errors.nroVoucher.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#700303] mb-1">Foto de Voucher:</label>
          <input
            id="imgComprobante"
            type="file"
            required
            accept="image/*" // Aceptar solo imágenes
            onChange={handleImageChange} // Capturar la imagen seleccionada
            className="border border-[#700303] p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-[#700303]"
          />

          {/* Mostrar la vista previa de la imagen si hay una */}
          {voucherPreview && (
            <div className="mt-2">
              <label className="block text-sm font-medium text-[#700303]">Vista Previa:</label>
              <img
                src={voucherPreview}
                alt="Voucher Preview"
                className="border border-[#700303] p-1 mt-1 rounded-md"
                style={{ width: '120px', height: '120px', objectFit: 'cover' }} // Tamaño pequeño
              />
            </div>
          )}
        </div>
      </div>
      {flash && flash.message && (
        <span className="text-red-500 text-sm">{flash.message}</span>
      )}

      <div className="text-right mt-8">
        <button
          type="submit"
          className="bg-[#700303] hover:bg-[#8c1010] text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-300"
        >
          Enviar
        </button>
      </div>

    </form>
  );
}

export default FormularioMatriculas;   
