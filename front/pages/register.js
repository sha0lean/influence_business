import Link from 'next/link'
import React from 'react'
import Navbar from '../components/Navbar'

const register = () => {
  const [first_name, setFirstName] = React.useState('')
  const [last_name, setlastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  // fetch les données de l'API pour s'inscrire
  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        password,
      }),
    })
    const data = await res.json()
    console.log(data)

    if (data.message === "Register successful") {
      window.location.href = '/profile'
    }
  }


  return (
    <div>
      <Navbar />      
      <div className='w-11/12 md:w-9/12 mx-auto flex justify-center items-center mt-52'>
        <div className='border-2 border-black mt-4 w-[500px] rounded-md modalChevron'>
          <form onSubmit={handleSubmit} className='flex flex-col px-6 justify-center my-10 gap-y-4'>
            <input onChange={(e) => setFirstName(e.target.value)} value={first_name} type="firstName" placeholder='Prénom' className='input'  />
            <input onChange={(e) => setlastName(e.target.value)} value={last_name} type="lastName" placeholder='Nom' className='input'  />
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='Email' className='input'  />
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='Mot de passe' className='input'  />
            <Link href='/profile'>
              <button type='submit' className='bg-black text-white rounded-md px-4 py-2 hover:bg-blue-900'>S'inscrire</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default register