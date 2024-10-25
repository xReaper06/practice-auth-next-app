'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import EmailInput from '../inputs/EmailInput'
import PasswordInput from '../inputs/PasswordInput'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import FormAlerts from '../alerts/FormAlerts'

const SignInSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
})
type SignInFormData = z.infer<typeof SignInSchema>;

const SignInForm = () => {
  const [status,setStatus] = useState('')
  const [message,setMessage] = useState('')

  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
  });

  const handleSignInForm = async(data: SignInFormData) => {
    const signInData = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false, // Prevent automatic redirect
    });
    console.log(signInData);
    
    if (signInData?.error) {
      setMessage(signInData.error); // Use the error message returned from NextAuth
      setStatus('alert alert-error');
    } else {
      // Handle successful sign-in
      setMessage('Successfully signed in!');
      setStatus('alert alert-success');
      setTimeout(() => {
        router.push('/admin'); // Redirect to admin page
        router.refresh()
      }, 1000);
    }
  };
  return (
    <>
    <div className="card bg-base-100 w-96 shadow-lg">
  <div className="card-body">
    <h2 className="card-title justify-center">Sign In</h2>
    <form onSubmit={handleSubmit(handleSignInForm)}>

          <EmailInput styleName='input input-bordered flex items-center gap-2 mt-4'>
            <input type="email" className="grow" placeholder="Email" {...register('email')} />
          </EmailInput>

          {errors.email?.message && (
            <p className="text-red-500 text-sm">{String(errors.email?.message)}</p>
          )}

          <PasswordInput styleName='input input-bordered flex items-center gap-2 mt-4'>
            <input type="password" className="grow" placeholder="Password" {...register('password')} />
          </PasswordInput>

          {errors.password?.message && (
            <p className="text-red-500 text-sm">{String(errors.password?.message)}</p>
          )}
    </form>
    <div className="card-actions flex justify-between items-center mt-3">
        <p className='mr-3'>I don't have an <Link href="/auth/sign-up" className="link link-primary">account</Link> yet.</p>
      <button className="btn btn-neutral" onClick={handleSubmit(handleSignInForm)}>Sign in</button>
    </div>
  </div>
</div>
{status && message && (
  <FormAlerts className={status}>
    {message}
  </FormAlerts>
)}
    </>
  )
}

export default SignInForm