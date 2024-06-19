import React, { useContext } from 'react'
import delivery from'../assets/img/delivery.png'
import hero from '../assets/img/heroBg.png'

import { heroData } from '../utils/data'

import useFirestore from '../hook/useFireStore';


import { useStateValue } from '../contexts/StateProvider';
export default function home() {
  const [{user},dispatch]= useStateValue();




  let {getCollection} = useFirestore();

    let { error, data, loading } = getCollection('Foods');


 

  
  return (
    <>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full ' id='home'>
      <div className='py-2 flex-1 flex flex-col items-start  justify-start gap-6'>
    <div className='flex items-center gap-2 bg-orange-100 px-4 py-1 rounded-full'>
    <p className='text-base text-orange-500'>bike delivery</p>
        <div className='w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl'>
        <img src={delivery}></img>
        </div>
    </div>
    <p className='text-[3rem] lg:text-[4.5rem] font-bold tracking-wide  text-gray-800 '>
      The firstest delivery in <br></br>
      <span className='text-orange-600 text-[3.5rem] lg:text-[5rem]'>
        Your city</span></p>
        <p className='text-base text-gray-600 md:text-left'>
          La tombe dit à la rose : 
          – Des pleurs dont l’aube t’arrose
          Que fais-tu, fleur des amours ? 
          La rose dit à la tombe : 
          – Que fais-tu de ce qui tombe
          Dans ton gouffre ouvert toujours ? 

          La rose dit : – Tombeau sombre, 
          De ces pleurs je fais dans l’ombre
          Un parfum d’ambre et de miel. 
          La tombe dit : – Fleur plaintive, 
          De chaque âme qui m’arrive
          Je fais un ange du ciel ! </p>
          <button type='button' className='bg-gradient-to-br
           from-orange-400 to-orange-500
           w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all
            ease-in-out duration-100'>order Now</button>
      </div>
      <div className='py-2 flex-1 flex md:min-w-[400px] items-center relative '>
        
        <img src={hero} alt='hero-bg' className='ml-auto h-420 w-full h-full lg:w-auto 
        lg:h-650'/>

        <div className='w-full h-full gap-4 absolute top-0 left-0 flex items-center  
            justify-center px-5 py-4 flex-wrap drop-shadow-lg mt-[50px]'>

           {
            heroData && heroData.map(n=>(
              <div key={n.id} className='h-[180px] w-[150px] lg:w-[200px] lg:h-[250px]  p-2 b-1   bg-red-100 backdrop-blur-md  
              rounded-2xl flex flex-col items-center justify-center' >
              <img src={n.imgSrc} className='w-20 lg:w-40  -mt-[100px] '></img>
              <div className=' text-center '>
              <p className='text-base text-[15px] font-semibold text-gray-600 mt:2 lg:mt-4'>{n.name}</p>
              <p className='my-3 text-[15px] '>{n.decp}</p>
              <p className='text-base font-semibold text-[15px]  '><span className='text-red-500 '>$</span>{n.price}</p>
              </div>
            </div>
            ))
           }
        </div>
      </div>
      
    </div>

  

  
  </>
  )
}
