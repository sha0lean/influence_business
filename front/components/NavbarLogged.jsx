import React, { useState } from 'react'
import Link from 'next/link'
import { FaUserCircle } from 'react-icons/fa'

const Navbar = () => {
  return (
    <>
      <div className='relative flex items-center w-11/12 md:w-9/12 mx-auto mt-4 border-b pb-2 border-b-black'>
        <h1 className='font-bold text-lg md:text-xl cursor-pointer hover:underline hover:underline-offset-2'>Influencer Business</h1>
        <div className='flex-1 flex items-center justify-end gap-x-10 md:gap-x-20 md:font-semibold'>
          <Link href='/profile/projets'>
            <div className='flex items-center gap-x-2 cursor-pointer px-4 py-2 rounded-md'>
              <FaUserCircle className='text-3xl' title='Profil' />
              <span className='text-sm md:text-base'>Profil</span>
            </div>
          </Link> 
          <Link href='/'>
            <a className='px-4 py-2 border border-black rounded-md hover:bg-blue-400/40'>Se déconnecter</a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar