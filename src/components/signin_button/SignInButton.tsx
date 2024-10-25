import React from 'react'
import Link from 'next/link'

const SignInButton = () => {
  return (
    <Link href="/sign-in" className="btn btn-neutral">Sign in</Link>
  )
}

export default SignInButton