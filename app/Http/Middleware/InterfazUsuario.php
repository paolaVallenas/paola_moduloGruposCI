<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class InterfazUsuario
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (Auth::user()->tipoUsuario == 'admin') {
          
            return redirect()->route('DUsuario');
            /*return redirect()->route('DUsuario',['rol' => 'admin']);*/
           
        }else if (Auth::user()->tipoUsuario == 'est') {
            return redirect()->route('DUsuario');
        }else if (Auth::user()->tipoUsuario == 'doc') {
            return redirect()->route('DUsuario');
        }

        // Si no es un usuario autenticado redirigir al inicio
        return redirect('/inicio')->with('error', 'No tienes acceso a esta página.');
    }
}
