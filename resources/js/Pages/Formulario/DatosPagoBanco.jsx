import React, { useState } from 'react';

const DatosPagosBanco = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div>
            <button onClick={openModal} style={openButtonStyle}>Ver Información de Pagos</button>

            {isOpen && (
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        <button onClick={closeModal} style={closeButtonStyle}>✕</button>
                        <h2>Información de Pagos - Banco de la Nación</h2>
                        <p>Cuenta corriente IESTP Tupac Amaru - Cusco</p>
                        <img src="imagenes/cuenta.jpg" alt="Banco de la Nación" style={imageStyle} />
                        <p>Notas adicionales: Al momento de realizar el depósito, se deberá indicar el DNI y nombre completo del estudiante.</p>
                        <p>En caso de que el estudiante sea menor de edad y/o el pago sea realizado por el apoderado, se deberá escribir el Nro. de DNI y nombre completo del estudiante con lapicero y de forma legible, en una parte blanca del Voucher.</p>
                        <img src="imagenes/modelo.png" alt="Modelo 1" style={imageStyle} />
                        <img src="imagenes/modeloo.png" alt="Modelo 2" style={imageStyle} />
                        <p>Datos del voucher del Banco de la Nación:</p>
                        <ul>
                            <li>1.- Nombre del Postulante</li>
                            <li>2.- DNI del Postulante o Apoderado</li>
                            <li>3.- Número de Operación del voucher (7 DÍGITOS)</li>
                            <li>4.- Fecha del Depósito</li>
                            <li>5.- Monto del Depósito</li>
                        </ul>
                        <img src="imagenes/voucher.jpg" alt="Modelo del Voucher" style={imageStyle} />
                    </div>
                </div>
            )}
        </div>
    );
};

// Estilos para el modal más pequeño
const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '60%', // Ajuste a un ancho máximo más pequeño
    maxHeight: '70%', // Ajuste a un alto máximo más pequeño
    overflowY: 'auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    textAlign: 'center',
};

const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    color: '#666', // Botón sutil
};

const openButtonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#800020', // Plomo claro (para granate usa #800020)
    color: 'white',
    border: 'none',
    borderRadius: '5px',
};

const imageStyle = {
    width: '100%',
    borderRadius: '5px',
    margin: '10px 0',
};

export default DatosPagosBanco;
