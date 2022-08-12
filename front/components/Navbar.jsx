import React, { useState } from 'react'
import Link from 'next/link'
import ModalLogin from './ModalLogin'
import { BsChevronUp } from 'react-icons/bs'


const Navbar = () => {
  const [modalLogin, setModalLogin] = useState(false)

  // Affiche le modal de connexion au clic du bouton "Se connecter"
  const handleModalLogin = () => {
    setModalLogin(!modalLogin)
  }

  return (
    <>
      <div className='relative flex items-center w-11/12 md:w-9/12 mx-auto mt-4'>
        <Link href='/'>
         <h1 className='font-bold text-lg md:text-xl cursor-pointer hover:underline hover:underline-offset-2'>Influencer Business</h1>
        </Link>
        <div className='flex-1 flex justify-end gap-x-5 md:gap-x-20 md:font-semibold'>
          {/* 
            Pour plus tard : si l'utilisateur est connecté alors sont affichés les 3 boutons ci-dessous, sinon est affiché le bouton de connexion. 
              {
                userConnected ? (
                  <Link href='/'>
                    <a>Actualité</a>
                  </Link>
                  <Link href='/'>
                    <a>Inbox</a>
                  </Link> 
                  <Link href='/'>
                    <a>Profil</a>
                  </Link> 
                  ) :   
                <Link href='/'>
                  <a className='px-4 py-2 border border-black rounded-md hover:bg-blue-400/40' onClick={handleModalLogin}>Se connecter</a>
                </Link>
              }
          */}
          <button className='px-4 py-2 border border-black rounded-md hover:bg-blue-400/40' onClick={handleModalLogin}>Se connecter</button>

          {/* S'il y a modalLogin actif alors ça affiche le component <ModalLogin /> sinon retourn null, donc affiche rien */}
          {
            modalLogin ? (
              <>
                <BsChevronUp className='text-4xl absolute right-[46px] top-12' />
                <div className='absolute right-0 top-14'>
                  <ModalLogin />
                </div>
              </>
            ) : null
          }
        </div>
      </div>
    </>
  )
}

export default Navbar