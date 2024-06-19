import React, { act, useEffect, useState } from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import EmptyCart from '../assets/img/emptyCart.svg'

import { motion } from 'framer-motion'
import { RiRefreshFill } from 'react-icons/ri'

import { useStateValue } from '../contexts/StateProvider'
import { actionType } from '../contexts/Reducer'
import CartItem from './CartItem'

export default function Cartcontainer({}) {
    const [{user,cartShow,cartItems},dispatch]= useStateValue();
    const [tot,setTot] =useState(0);
    const [flag,setFlag] = useState(0)
   

   

    const hideCart = ()=>{
        console.log(cartItems)
       
        dispatch({
            type : actionType.SET_CART_SHOW,
            cartShow : !cartShow
          });
    }
    useEffect(()=>{
        let totalPrice = cartItems.reduce(function (accumulator,item){
            return accumulator + item.qty * item.price;
        },0);
        setTot(totalPrice);

    },[tot,flag])
  return (
    <motion.div
    initial={{opacity:0, x:200}}
    animate={{opacity:1, x:0}}
    exit={{opacity:0, x:200}}
     className='fixed top-0 right-0 w-full md:w-[375px] h-screen bg-white drop-shadow-md flex flex-col z-[101]'>
        <div className='w-full flex items-center justify-between  p-4 cursor-pointer'>
            <motion.div 
            whileTap={{scale:0.75}}
            onClick={hideCart}
            
            >
            <MdOutlineKeyboardBackspace className='text-3xl '/>
            
            </motion.div>
            <p className='text-gray-600 text-lg font-semibold'>Cart</p>
            <motion.p
            whileTap={{scale:0.75}} className='flex items-center gap-2 px-1 py-2 my-2 bg-gray-100 rounded-md
            hover:shadow-md duration-100 ease-in-out transition-all cursor-pointer text-gray-600 text-base'>Clear
            <RiRefreshFill/>{" "}
            </motion.p>
        </div>
        { cartItems && cartItems.length>0 ?(
            <div className='w-full h-full bg-gray-800 rounded-t-[2em] flex flex-col'>
            <div className='w-full h-[340px]  md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none'>
              {
                cartItems && cartItems.map(c=>(
                    <CartItem key={c.id} c={c} flag={flag} setFlag={setFlag}/>
                ))
              }
                

            </div>
            <div className='w-full flex-1 bg-[#4B5563] rounded-t-[2em] flex flex-col items-center justify-evenly
            px-8 py-2'>
                <div className='w-full flex items-center justify-between'>
                    <p className='text-gray-400 text-lg'>Sub Total</p>
                    <p className='text-gray-400 text-lg'>$ {tot}</p>

                </div>
                <div className='w-full flex items-center justify-between'>
                    <p className='text-gray-400 text-lg'>Delivery</p>
                    <p className='text-gray-400 text-lg'>$ 2.5</p>

                </div>
                <div className='w-full border-b border-gray-600 my-2'>

                </div>
                <div className='w-full flex items-center justify-between'>
                <p className='text-gray-400 text-lg'>Total</p>
                <p className='text-gray-400 text-lg'>$ {tot+2.5}</p>
                </div>

                <motion.button
                whileTap={{scale : 0.8}}
                type='button'
                className='w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2
                hover:shadow-lg '
                
                >
                    Check Out
                </motion.button>

            </div>
            

        </div>

        ):(
            <div className='w-full h-full flex flex-col items-center justify-center gap-6 bg-whit'>
            <img src={EmptyCart}></img>
            <p className='text-xl text-gray-600 font-semibold'>Add Some items to Your List</p>
        </div>
        )}
        
    </motion.div>
  )
}
