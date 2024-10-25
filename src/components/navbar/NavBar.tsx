import React from 'react'
import SignInButton from '../signin_button/SignInButton'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import SignOutBtn from '../buttons/SignOutBtn'
const NavBar = async() => {
  const session = await getServerSession(authOptions)
  return (
    <div className="navbar bg-base-100">
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
      </div>
      {session?.user ? (<Link href="/admin" className="btn btn-ghost text-xl">Admin Dashboad</Link>):(<a className="btn btn-ghost text-xl">Sample NExt Auth App</a>)}   
    </div>
    <div className="navbar-end">
      {session?.user ? (<SignOutBtn/>):(
        <SignInButton/>
      )}
    </div>
  </div>
  )
}

export default NavBar