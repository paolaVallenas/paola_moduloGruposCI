import React from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />
            
                <div className="w-full max-w-md transform transition-all duration-300 hover:scale-105">
                    <div className="bg-[#F3F2C6] rounded-lg shadow-2xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-[#800020] p-6 text-center">
                            <h2 className="text-2xl font-bold text-[#F3F2C6] mb-2">Bienvenido</h2>
                            <p className="text-[#F3F2C6]/80">Inicia sesión en tu cuenta</p>
                        </div>

                        {/* Status Message */}
                        {status && (
                            <div className="mx-6 mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                                {status}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={submit} className="p-6 space-y-6">
                            <div className="space-y-2">
                                <InputLabel htmlFor="email" value="Email" className="text-[#800020] font-semibold" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="w-full px-4 py-2 border border-[#800020]/20 rounded-md focus:border-[#800020] focus:ring focus:ring-[#800020]/20 transition-colors bg-white"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="text-[#800020]" />
                            </div>

                            <div className="space-y-2">
                                <InputLabel htmlFor="password" value="Contraseña" className="text-[#800020] font-semibold" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="w-full px-4 py-2 border border-[#800020]/20 rounded-md focus:border-[#800020] focus:ring focus:ring-[#800020]/20 transition-colors bg-white"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="text-[#800020]" />
                            </div>

                            <div className="flex items-center">
                                <label className="flex items-center space-x-2 text-sm text-[#800020]">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="text-[#800020] border-[#800020]/30 focus:ring-[#800020]/20"
                                    />
                                    <span>Recordarme</span>
                                </label>
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-[#800020] hover:text-[#800020]/80 transition-colors underline"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                )}

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-6 py-2 bg-[#800020] text-[#F3F2C6] rounded-md hover:bg-[#800020]/90 transform transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#800020]/50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Procesando...
                                        </span>
                                    ) : (
                                        'Iniciar Sesión'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            
        </GuestLayout>
    );
}