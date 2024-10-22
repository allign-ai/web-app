import { Link, Outlet } from 'react-router-dom'
import { OrganizationSwitcher, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

export default function OtherLayout() {

  return (
    <>
      <header className="header">
        <div>
          <div>
            <p>Clerk + React + React Router App</p>
          </div>
          <SignedIn>
            <OrganizationSwitcher hidePersonal={true}/>
            <UserButton/>
          </SignedIn>
          <SignedOut>
            <Link to="/sign-in">Sign In</Link>
          </SignedOut>
        </div>
      </header>
      <main>
        <Outlet/>
      </main>
    </>
  )
}