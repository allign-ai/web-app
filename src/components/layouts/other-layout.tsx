import { Link, Outlet } from 'react-router-dom'
import { OrganizationSwitcher, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react'

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