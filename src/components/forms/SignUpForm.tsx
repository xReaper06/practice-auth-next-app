'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import EmailInput from '../inputs/EmailInput'
import PasswordInput from '../inputs/PasswordInput'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FormAlerts from '../alerts/FormAlerts'
import * as z from 'zod';
import { useRouter } from 'next/navigation'

const SignUpSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords must match',
});

type SignUpFormData = z.infer<typeof SignUpSchema>;


const SignUpForm = () => {
const [status,setStatus] = useState('')
const [message,setMessage] = useState('')

const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
  });


  const handleSignUpForm = async(data: SignUpFormData) => {
    setStatus(''); // Reset the status before submission
    setMessage(''); // Reset the message before submission
    // Handle form submission logic here
    await fetch('/api/userRegistration',{
      'method':"POST",
      'headers':{'content-type':'application/json'},
      'body':JSON.stringify(data)
    }).then(async res =>{
      if(res.ok){
        const {message} = await res.json()
        setMessage(message)
        setStatus('alert alert-success')
        setTimeout(()=>{
          router.push('/auth/sign-in')
        },1000)
      }else{
        const errorData = await res.json();
        setMessage(errorData.message || 'An error occurred');
        setStatus('alert alert-error');
      }
    }).catch(err =>{
      console.log(err)
    })
  };

  return (
    <>
    <div className="card bg-base-100 w-96 shadow-lg">
      <div className="card-body">
        <h2 className="card-title justify-center">Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignUpForm)}>
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

          <PasswordInput styleName='input input-bordered flex items-center gap-2 mt-4'>
            <input type="password" className="grow" placeholder="Confirm Password" {...register('confirmPassword')} />
          </PasswordInput>
          {errors.confirmPassword?.message && (
            <p className="text-red-500 text-sm">{String(errors.confirmPassword?.message)}</p>
          )}
        </form>
        <div className="card-actions justify-between mt-3 items-center">
          <p className='mr-3'>
            I already have an{' '}
            <Link href="/auth/sign-in" className="link link-primary">account.</Link>
          </p>
          <button className="btn btn-neutral" type="submit" onClick={handleSubmit(handleSignUpForm)}>Sign Up</button>
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

export default SignUpForm;
