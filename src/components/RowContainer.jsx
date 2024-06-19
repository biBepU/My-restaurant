import React, {useEffect, useRef, useState } from 'react'

import { LiaShoppingBasketSolid } from "react-icons/lia";
import { motion } from 'framer-motion';
import NotFound from '../assets/img/NotFound.svg'
import { useStateValue } from '../contexts/StateProvider';
import { actionType } from '../contexts/Reducer';

export default function RowContainer({flag,scrollPosition,datas}) {

    let [items,setItems]=useState([]);

    const [{ cartItems},dispatch] = useStateValue()
  
    
    const scrollContainerRef = useRef(null);
    useEffect(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft = scrollPosition;
        }
      }, [scrollPosition]);
    
      const addBaskect =()=>{
       
        
        dispatch({
            type : actionType.SET_CART_ITEMS,
            cartItems : items
          });
     localStorage.setItem('cartItems',JSON.stringify(items))
    
      }
      useEffect(()=>{
        addBaskect()

      },[items])
  
  return (
    <div    
    ref={scrollContainerRef}
        className={`w-full my-12 flex items-center  gap-8 h-[300px]
        ${flag ? 'overflow-x-scroll scrollbar-none scroll-smooth': ' flex-wrap'}`}>
        {datas.length>0 ?( datas.map(d=>(
            <div  className='min-w-[300px] h-[220px] md:w-[300px] backdrop-blur-lg bg-gray-100 hover:bg-gray-200 
            rounded-md 
            hover:drop-shadow-2xl  p-2' key={d?.id}>
            <div className='w-full flex items-center justify-between' >
                <div className='w-40 h-40 -mt-12'>
                <motion.img whileTap={{scale : 1.2}} src={d?.imageURL} className=' w-full h-auto drop-shadow-2xl'/>
                </div>
              
                <motion.div whileTap={{scale : 0.75}} className='w-8 h-8 rounded-full bg-red-400 flex items-center justify-center
                 text-white text-2xl
                hover:shadow-md cursor-pointer'
                onClick={()=> setItems([...cartItems,d])}
                ><LiaShoppingBasketSolid/></motion.div>
            </div>
            <div className='w-full flex flex-col items-end justify-end'>
               
                <p className='font-semibold text-gray-700 texxt-base md:text-lg'>{d?.title}</p>
                <p className='mt-1 text-sm text-gray-500'> {d?.calories} calories</p>
                <div className='flex items-center gap-8'>
                    <p className='text-lg text-gray-400 font-semibold'><span className='text-sm text-red-500'>$</span>{d?.price}</p>

                </div>
            </div>
        </div>
        ))):
        <div className='w-full h-auto flex flex-col justify-center items-center'>
             <h1 className='text-2xl font-semibold'>No Foods Found</h1>
            <img className='' src={NotFound}></img>
           
            
        </div>
        
        }
    </div>
  )
}
