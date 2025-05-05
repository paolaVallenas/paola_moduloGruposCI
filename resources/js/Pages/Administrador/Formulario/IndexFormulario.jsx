import { useState } from 'react';
import TablaInscripciones from './TablaInscripciones';
import ResumenInscripcion from './ResumenIncripcion';

export default function IndexFormulario({ ListaFormularios }) {
    const [verForm, setVerForm] = useState(false);  // Controla si se debe ver el formulario o la tabla
    const [ins, setIns] = useState(null);  // Información de la inscripción seleccionada

    // Función para mostrar la vista correspondiente (Tabla o Resumen)
    const renderContent = () => {
        if (verForm && ins) {
            return (
                <div className="text-center p-6">
                    <ResumenInscripcion inscripcion={ins} />
                </div>
            );
        } else {
            return (
                <div className="text-center p-6">
                    <TablaInscripciones inscripciones={ListaFormularios} setIns={setIns} setVerForm={setVerForm} />
                </div>
            );
        }
    };

    return (
        <div className="p-8 text-gray-800 text-center">
            {/* Mostrar el contenido dependiendo de la vista seleccionada */}
            {renderContent()}
        </div>
    );
}
