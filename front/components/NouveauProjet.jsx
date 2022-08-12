import React, { useState } from 'react'
import Slider from "react-input-slider";


const NouveauProjet = () => {
  const [state, setState] = useState({ x: 0 });

  return (
    <div>
      <div className='flex items-center justify-between mt-10 lg:mt-16 '>
        <h1 className='text-xl font-bold md:text-2xl lg:text-3xl underline'>Nouveau projet</h1>
      </div>
      <div className='flex flex-col lg:w-10/12 lg:flex-row mt-10 mx-auto'>
        <div className='flex flex-col gap-y-10 lg:w-[600px]'>
          <div className='flex justify-between'>
            <div className='flex flex-col'>
              <h2>Quel type de projet ?</h2>
              <div className='flex items-center gap-x-2 mt-2'>
                <input type="checkbox" name="type" />
                <label htmlFor='type'>Type de projet</label>
              </div>
              <div className='flex items-center gap-x-2 mt-2'>
                <input type="checkbox" name="type" />
                <label htmlFor='type'>Type de projet</label>
              </div>
            </div>
            <div className='flex flex-col'>
              <h2>Status de l'entreprise ?</h2>
              <div className='flex items-center gap-x-2 mt-2'>
                <input type="radio" name="status" />
                <label htmlFor='type'>status</label>
              </div>
              <div className='flex items-center gap-x-2 mt-2'>
                <input type="radio" name="status" />
                <label htmlFor='type'>status</label>
              </div>
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='flex flex-col'>
                <h2>Radio Buttons</h2>
                <div className='flex items-center gap-x-2 mt-2'>
                  <input type="radio" name="radio" />
                  <label htmlFor='type'>Radio Buttons</label>
                </div>
                <div className='flex items-center gap-x-2 mt-2'>
                  <input type="radio" name="radio" />
                  <label htmlFor='type'>Radio Buttons</label>
                </div>
              </div>
              <div className='flex flex-col'>
                <h2>Sliders ?</h2>
                <Slider
                  axis="x"
                  x={state.x}
                  onChange={({ x }) => setState(state => ({ ...state, x }))}
                />
                  {state.x}
              </div>
            </div>
        </div>
        <div className='flex flex-col mt-10 lg:mt-0 max-w-[350px] mx-auto'>
          <div className='flex flex-col'>
            <label htmlFor="">Où en êtes-vous sur votre projet ?</label>
            <textarea className='projectsInput' type="text" placeholder='Texte'/>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="">Description de votre projet</label>
            <textarea className='projectsInput' type="text" placeholder='Description'/>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="">Qu'est-ce que vous recherchez en accédant au réseau IB</label>
            <textarea className='projectsInput' type="text" placeholder='Texte' />
          </div>
          <button className='bg-blue-500 hover:bg-blue-900 text-white px-4 py-2 rounded-md'>Envoyer le formulaire</button>
        </div>
      </div>
    </div>
  )
}

export default NouveauProjet