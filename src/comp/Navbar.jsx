import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <nav className="border-b bg-white shadow">
      <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold">
          EMS
        </Link>
        <div className="flex items-center">
          <Link to="/tools" className="text-md text-gray-800 mx-3">
            Tools
          </Link>
          <Link to="/login" className="text-md text-gray-800 mx-3 font-medium">
            Log In
          </Link>
        </div>
      </div>
    </nav>
  );
}
