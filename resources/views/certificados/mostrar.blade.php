<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificado de {{ $certificado->nombre }}</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            text-align: center;
            margin: 50px;
        }

        .certificado {
            border: 5px solid #800020;
            padding: 30px;
            background-color: #f4f4f4;
        }

        .header {
            font-size: 24px;
            font-weight: bold;
            color: #800020;
        }

        .subheader {
            font-size: 20px;
            margin: 20px 0;
        }

        .content {
            font-size: 16px;
            margin: 30px 0;
        }

        .qr-code {
            margin: 20px 0;
        }

        .footer {
            margin-top: 40px;
            font-size: 14px;
        }

        .signature {
            margin-top: 50px;
            text-align: left;
            margin-left: 100px;
        }

        .signature div {
            display: inline-block;
            text-align: center;
            width: 200px;
        }

        .signature-line {
            border-top: 1px solid black;
            margin-top: 10px;
        }
    </style>
</head>

<body>
    <div class="certificado">
        <div class="header">
            Centro de Idiomas
        </div>
        <div class="subheader">
            Certificado de {{ $certificado->cicloCert }}
        </div>
        <div class="content">
            Por medio de la presente, se certifica que: <strong>{{ $certificado->nombre }}</strong><br>
            Ha completado satisfactoriamente el curso de: <strong>{{ $certificado->cicloCert }}</strong><br>
            En el periodo de
            <strong>{{ 'DICIEMBRE' }}</strong> a
            <strong>{{ 'MAYO' }}</strong>
            </strong>del año <strong>{{ now()->year }}</strong>.
        </div>
        <div class="qr-code">
            <div>{!! $qrCode !!}</div>
        </div>
        <div class="footer">

            Fecha de emisión: <strong>{{ $certificado->created_at }}</strong>
        </div>
        <div class="signature">
            <div>
                <div class="signature-line"></div>
                Director del Centro
            </div>
            <div style="margin-left: 100px;">
                <div class="signature-line"></div>
                Coordinador Académico
            </div>
        </div>
    </div>
</body>

</html>
