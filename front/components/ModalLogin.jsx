import Link from 'next/link'
import React from 'react'

const ModalLogin = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  // fetch les données de l'API pour se connecter
  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    const data = await res.json()
    console.log(data)

    // if (data.message === "Your credentials are correct") {
    //   window.location.href = '/profile'
    // }
  }


  return (
    <div className='border-2 border-black mt-4 w-96 h-60 rounded-md modalChevron'>
      <form onSubmit={handleSubmit} className='flex flex-col px-6 justify-center mt-10 gap-y-4'>
        <input type="email" placeholder='Email' className='input' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='Mot de passe' className='input' value={password} onChange={(e) => setPassword(e.target.value)} />
        <Link href='/profile/projets'>
         <button type='submit' className='bg-black text-white rounded-md px-4 py-2 hover:bg-blue-900'>Se connecter</button>
        </Link>
        <small className='text-center'>Vous n'avez pas de compte ? <a href='/register' className='text-blue-900'>S'inscrire</a></small>
      </form>
    </div>
  )
}

export default ModalLogin