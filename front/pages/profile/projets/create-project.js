import Link from 'next/link'
import React from 'react'
import NavbarLogged from '../../../components/NavbarLogged'
import NouveauProjet from '../../../components/NouveauProjet'

const create = () => {
  return (
    <>
      <NavbarLogged />
      <main className='w-11/12 md:w-9/12 mt-10 lg:mt-20 mx-auto'>
        <div className='flex justify-around text-center'>
          <Link href='/profile/projets'>
            <h1 className='profileCategories border-b-2 lg:border-b-4 pb-2 border-green-600'>Projets</h1>
          </Link>
          <Link href='/profile/suivis'>
            <h1 className='profileCategories border-b-2 lg:border-b-4 pb-2 border-black'>Suivis</h1>
          </Link>
          <Link href='/profile/documents'>
            <h1 className='profileCategories border-b-2 lg:border-b-4 pb-2 border-black'>Documents</h1>
          </Link>
          <Link href='/profile/parametres'>
            <h1 className='profileCategories border-b-2 lg:border-b-4 pb-2 border-black'>Paramètres</h1>
          </Link>
        </div>
        <div className=''>
         <NouveauProjet />
        </div>

      </main>
    </>
  )
}

export default create