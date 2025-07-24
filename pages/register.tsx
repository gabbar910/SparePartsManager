import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';

const registerSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Please enter a valid email address').min(1, 'Email Address is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState<{ success: boolean; message: string } | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        setIsLoading(true);
        setApiResponse(null);

        try {
            const response = await axios.post('http://localhost:5189/api/Auth/register', {
                username: data.username,
                email: data.email,
                password: data.password,
            });

            setApiResponse({
                success: true,
                message: response.data.message || 'Registration successful! You can now login with your credentials.',
            });

            // Reset form on successful registration
            reset();

            // Optionally redirect to login page after a delay
            setTimeout(() => {
                router.push('/login');
            }, 2000);

        } catch (error: any) {
            console.error('Registration error:', error);
            setApiResponse({
                success: false,
                message: error.response?.data?.message || 'Registration failed. Please try again.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoginRedirect = () => {
        router.push('/login');
    };

    return (
        <div className="auth-container">
            <Head>
                <title>Register - Spare Parts Manager</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
        
            <div className="login form">
                <header>Register</header>
                
                {/* API Response Message */}
                {apiResponse && (
                    <div className={`alert ${apiResponse.success ? 'alert-success' : 'alert-error'}`}>
                        {apiResponse.message}
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Enter your username"
                            autoComplete="username"
                            {...register('username')}
                            className={errors.username ? 'error' : ''}
                        />
                        {errors.username && (
                            <span className="error-message">{errors.username.message}</span>
                        )}
                    </div>

                    <div className="input-group">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            autoComplete="email"
                            {...register('email')}
                            className={errors.email ? 'error' : ''}
                        />
                        {errors.email && (
                            <span className="error-message">{errors.email.message}</span>
                        )}
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Enter your password"
                            autoComplete="new-password"
                            {...register('password')}
                            className={errors.password ? 'error' : ''}
                        />
                        {errors.password && (
                            <span className="error-message">{errors.password.message}</span>
                        )}
                    </div>

                    <input 
                        type="submit" 
                        className="button" 
                        value={isLoading ? "Registering..." : "Register"}
                        disabled={isLoading}
                    />
                </form>
                
                <div className="login">
                    <span className="login">Already have an account?
                        <label htmlFor="check" onClick={handleLoginRedirect} style={{ cursor: 'pointer', marginLeft: '5px' }}>
                            Login
                        </label>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
