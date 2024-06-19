import React, { useEffect, useState } from 'react'
import { IoFastFoodSharp } from "react-icons/io5";
import { categories } from '../utils/data';
import Rawcontainer from './RowContainer'
import { motion } from 'framer-motion';
import { LiaShoppingBasketSolid } from 'react-icons/lia';
import NotFound from '../assets/img/NotFound.svg'
import useFirestore from '../hook/useFireStore';


export default function MenuContainer({flag}) {

   
    let {getCollection}=useFirestore()
    let {error,data,loading} = getCollection('Foods');

    const[filters ,setFilters]=useState('chicken');
    
    useEffect(()=>{

    },[filters])
    
    
   
  return (
    <section>
        <div className='w-full flex items-center justify-between mt-10'>
        <p className='text-2xl font-semibold capitalize text-gray-500 relative
          before:absolute before:rounded-lg before:content before:w-[60px] before:h-1 before:-bottom-4
          before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all
          ease-in-out duration-100'
          >
              Main Dish
          </p>
       


        </div>
        <div 
    className={`w-full flex items-center justify-center  gap-8 h-[300px]
    ${flag ? 'overflow-x-scroll scrollbar-none scroll-smooth': 'overflow-x-hidden flex-wrap'}`}>
        {
            categories.map(c=>(
                <motion.div 
                whileTap={{scale : 0.75}}
                onClick={()=>setFilters(c.urlParamName)}
                key={c.id} className={`${filters === c.urlParamName ? 'bg-red-400' : 'bg-white'} w-[100px] h-[150px] cursor-pointer  
                 rounded-xl hover:text-white  hover:bg-red-400  hover:shadow-2xl flex flex-col
                  items-center justify-center`}> 
            <div className={`text-2xl font-semibold mb-12 ${filters === c.urlParamName ? 'text-white' : 'text-gray-600'}`}><IoFastFoodSharp /></div>
            <p className={`text-md font-semibold ${filters === c.urlParamName ? 'text-white' : 'text-gray-600'}`}>{c.name}</p>
        </motion.div>
            ))
        }

    </div>
    <div className='w-full'>
        <Rawcontainer flag={false} datas={data ?.filter(n=>n.category === filters)}
            />
    </div>


    </section>

  )
}
