import React from 'react'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    

<footer class="bg-white rounded-lg shadow m-4">
    <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center ">© 2024 <a href="https://flowbite.com/" class="hover:underline">EMS</a>. All Rights Reserved.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500  sm:mt-0">
        <li>
            <a href="https://github.com/March-Madnes" class="hover:underline me-4 md:me-6">About</a>
        </li>
        <li>
            <Link to="/tools" class="hover:underline">Tools</Link>
        </li>
    </ul>
    </div>
</footer>

  )
}
