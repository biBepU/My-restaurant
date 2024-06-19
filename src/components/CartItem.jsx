import React, { useEffect, useState } from 'react'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { motion } from 'framer-motion'
import { useStateValue } from '../contexts/StateProvider';
import { actionType } from '../contexts/Reducer';


export default function CartItem({c,setFlag,flag}) {
  const [qty,setQty] = useState(1);
  const [{cartItems},dispatch] = useStateValue();
  const [items,setItems] = useState([]);
 

  const cartDispatch =()=>{
      localStorage.setItem('cartItems',JSON.stringify(items));
      dispatch({
          type :actionType.SET_CART_ITEMS,
          cartItems : items
      })
  }
  const updateQty =(action,id)=>{
    if(action=='add'){
      setQty (qty + 1);
      cartItems.map(items=>{
        if(items.id==id){
          items.qty += 1;
          setFlag(flag+1)
        } 
       
      });
      cartDispatch();
    }
    else{
      if(qty==1){
        setItems(cartItems.filter(item=> item.id!==id))
        setFlag(flag+1)
        cartDispatch();
      }else{
        setQty(qty-1);
        cartItems.map(items=>{
          if(items.id==id){
            items.qty -= 1;
            setFlag(flag+1)
          }
          
        });
        cartDispatch();
      }
    }
  
     
    
  }
  useEffect(()=>{
setItems(cartItems)
  },[qty])
  return (
    <div className='w-full p-1 px2 rounded-lg bg-gray-600 flex items-center gap-2'>
    <img src={c?.imageURL} className='w-20 h-20 max-w-[60px] rounded-full object-contain'></img>
    <div className='flex flex-col gap-2'>
        <p className='text-base text-gray-50'>
            {c?.title}
        </p>
        <p className='text-sm block text-gray-300 font-semibold'>{parseFloat(c?.price) * qty} $

        </p>


    </div>
   <div  className='grop flex items-center gap-2 ml-auto cursor-pointer'> 
   <motion.div 
   whileTap={{scale:0.75}} className=''>
    <BiMinus  className='text-gray-50' onClick={()=> updateQty('minus',c?.id)}/>
        
    </motion.div>
    <p className='w-5 h-5 rounded-sm bg-gray-600 text-gray-50 flex items-center justify-center'>{qty}</p>
    <motion.div 
    whileTap={{scale:0.75}} className=''>
        <BiPlus className='text-gray-50' onClick={()=> updateQty('add',c?.id)}/>
        
    </motion.div>
   </div>

    </div>
  )
}
