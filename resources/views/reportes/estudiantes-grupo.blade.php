<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Reporte de Estudiantes por Grupo</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            font-size: 12px; /* Reducir tamaño de fuente base */
        }
        
        .header { 
            margin-bottom: 20px;
            border-bottom: 2px solid #800020;
            padding-bottom: 10px;
        }
        
        .header h1 {
            color: #800020;
            font-size: 18px;
            margin: 0;
        }
        
        .grupo-info { 
            margin-bottom: 20px;
            display: block;
            width: 100%;
        }
        
        .grupo-info h3 {
            color: #800020;
            font-size: 14px;
            margin-bottom: 10px;
        }
        
        .grupo-info p {
            margin: 5px 0;
            font-size: 12px;
        }
        
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 20px;
            table-layout: fixed; /* Forzar ancho fijo de columnas */
        }
        
        th, td { 
            border: 1px solid #ddd; 
            padding: 6px 4px; /* Reducir padding */
            font-size: 11px;
            overflow: hidden;
            text-overflow: ellipsis; /* Agregar ... si el texto es muy largo */
        }
        
        th { 
            background-color: #800020; 
            color: white;
            font-weight: bold;
        }

        /* Definir anchos específicos para cada columna */
        .col-nombre { 
            width: 25%; 
            white-space: nowrap; 
        }
        .col-dni { 
            width: 10%; 
            white-space: nowrap; 
        }
        .col-celular { 
            width: 10%; 
            white-space: nowrap; 
        }
        .col-email { 
            width: 20%; 
            white-space: normal; /* Permitir saltos de línea */
            word-wrap: break-word; /* Romper palabras largas */
            min-height: 40px; /* Altura mínima para emails largos */
        }
        .col-email-ci { 
            width: 20%; 
            white-space: normal; /* Permitir saltos de línea */
            word-wrap: break-word; /* Romper palabras largas */
            min-height: 40px; /* Altura mínima para emails largos */
        }
        .col-programa { 
            width: 15%; 
            white-space: nowrap; 
        }

        /* Estilos para las celdas de correo específicamente */
        .email-cell {
            white-space: normal !important;
            word-wrap: break-word;
            word-break: break-word;
            height: auto;
            min-height: 40px;
        }

        /* Alternar colores en las filas */
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Reporte de Estudiantes - {{ $grupo->periodo }} {{ $grupo->modalidad }}</h1>
    </div>

    <div class="grupo-info">
        <h3>Información del Grupo</h3>
        <div style="columns: 2;">
            <p><strong>Periodo:</strong> {{ $grupo->periodo }}</p>
            <p><strong>Modalidad:</strong> {{ $grupo->modalidad }}</p>
            <p><strong>Horario:</strong> {{ $grupo->horario }}</p>
            <p><strong>Docente:</strong> {{ $grupo->docente->nombres }} {{ $grupo->docente->aPaterno }}</p>
            <p><strong>Ciclo:</strong> {{ $grupo->ciclo->idioma->nombre }} - {{ $grupo->ciclo->nombre }}</p>
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th class="col-nombre">Nombres y Apellidos</th>
                <th class="col-dni">DNI</th>
                <th class="col-celular">Celular</th>
                <th class="col-email">Email</th>
                <th class="col-email-ci">Email CI</th>
                <th class="col-programa">Programa</th>
            </tr>
        </thead>
        <tbody>
            @forelse($estudiantes as $estudiante)
                <tr>
                    <td>{{ $estudiante->nombres }} {{ $estudiante->aPaterno }} {{ $estudiante->aMaterno }}</td>
                    <td>{{ $estudiante->dni }}</td>
                    <td>{{ $estudiante->celular }}</td>
                    <td class="email-cell">{{ $estudiante->email }}</td>
                    <td class="email-cell">{{ $estudiante->emailInstitucional }}</td>
                    <td>{{ $estudiante->programaEstudios }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="6" style="text-align: center;">No hay estudiantes registrados</td>
                </tr>
            @endforelse
        </tbody>
    </table>

    <div style="margin-top: 20px; font-size: 10px; color: #666; text-align: right;">
        Fecha de generación: {{ now()->timezone('America/Lima')->format('d/m/Y H:i:s') }}
    </div>
</body>
</html>