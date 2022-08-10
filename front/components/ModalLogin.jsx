import React from 'react'

const ModalLogin = () => {
  return (
    <div className='border-2 border-black mt-4 w-96 h-52 rounded-md modalChevron'>
      <div className='flex flex-col px-6 justify-center mt-10 gap-y-4'>
        <input type="email" placeholder='Email' className='input'/>
        <input type="password" placeholder='Mot de passe' className='input' />
        <button type='button' className='bg-black text-white rounded-md px-4 py-2 hover:bg-blue-900'>Se connecter</button>
      </div>
    </div>
  )
}

export default ModalLogin