import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAuth } from '../contexts/auth';
import Link from 'next/link';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const router = useRouter();
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const [loginError, setLoginError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, authLoading, router]);

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    setLoginError('');

    const result = await login(data.username, data.password);

    if (result.success) {
      router.push('/');
    } else {
      setLoginError(result.error || 'Login failed');
    }

    setIsSubmitting(false);
  };

  // Show loading while checking auth status
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Don't render login form if already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="auth-container">
      <Head>
        <title>Spare Parts Manager</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      
      <div className="login form">
        <header>Login</header>
        
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
            {...register('username')}
            type="text"
            autoComplete="username"                
            placeholder="Enter your email"
            />
            {errors.username && (
            <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
            )}            
            <input
            {...register('password')}
            type="password"
            autoComplete="current-password"            
            placeholder="Enter your password"
            />
            {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
            <a href="#">Forgot password?</a>
          {loginError && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{loginError}</div>
            </div>
          )}
          <input type="submit" className="button" value="Login" />            
        </form>
        <div className="signup">
          <span className="signup">Don&apos;t have an account?
            <Link href="/register">Register</Link>            
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
