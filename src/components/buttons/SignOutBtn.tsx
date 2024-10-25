'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

const SignOutBtn = () => {
  return (
    <button className='btn btn-error' onClick={()=> signOut({
        redirect:true,
        callbackUrl:`${window.location.origin}/sign-in`
    })}>Sign Out</button>
  )
}

export default SignOutBtn