import React, { useState } from 'react'
import { FaBasketShopping} from "react-icons/fa6";
import { MdAddCircle,MdLogout } from "react-icons/md";
import logo from '../assets/img/logo.png'
import avatar from '../assets/img/avatar.png'

import { animate, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { GoogleAuthProvider } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { useStateValue } from '../contexts/StateProvider';
import { actionType } from '../contexts/Reducer';

export default function Header() {
const provider = new GoogleAuthProvider();

const [{user,cartShow,cartItems},dispatch]= useStateValue();


let[isMenu,SetIsMenu]=useState(false);

const login =async()=>{
 if(!user){
  const {
    user:{refreshToken,providerData},
  } = await signInWithPopup(auth,provider);

  dispatch({
    type : actionType.SET_USER,
    user : providerData[0]
  });

 
  localStorage.setItem('user',JSON.stringify(providerData[0]))
 }else{
  
    SetIsMenu(!isMenu);
 
}

}

const logOut =()=>{
  SetIsMenu(false);

  localStorage.clear();

  dispatch({
    type : actionType.SET_USER,
    user : null
  })
}

const showCart =()=>{

  dispatch({
    type : actionType.SET_CART_SHOW,
    cartShow : !cartShow
  });
}

 
  return (  
    <header className='fixed bg-white z-50 w-screen p-3 px-4 md:p-6 md:px-16'>
        {/* for desktop and tablet */}
        <div className='hidden md:flex w-full h-full justify-between items-center'>
            <Link to = {'/'} className='flex items-center gap-3'>
                <img className='w-8 object-cover' src={logo} alt='logo'></img>
                <p className='text-headingColor text-xl font-bold'>City</p>
            </Link>
           <div className='flex items-center gap-8'>
           <motion.ul
            initial={{opacity:0,x:200,}}
            animate={{opacity:1,x:0,}}
            exit={{opacity:0,x:200,}}

            className='flex items-center gap-8'>
                <Link to={'/home'} className='text-base text-gray-600 hover:text-headingColor 
                duration-100 transition-all ease-in-out cursor-pointer'>Home</Link>
                <li className='text-base text-gray-600 hover:text-headingColor 
                duration-100 transition-all ease-in-out cursor-pointer'>Menu</li>
                <li className='text-base text-gray-600 hover:text-headingColor 
                duration-100 transition-all ease-in-out cursor-pointer'>About Us</li>
                <li className='text-base text-gray-600 hover:text-headingColor 
                duration-100 transition-all ease-in-out cursor-pointer'>Service</li>
            </motion.ul>
            <div onClick={showCart} className='ralative flex items-center justify-center' >
            <FaBasketShopping className='text-gray-600 text-2xl ml-8 cursor-pointer' />
            {cartItems && cartItems.length>0 &&(
              <div className='w-5 h-5 rounded-full  bg-red-600 flex items-center justify-center'>
              <p className='text-xs text-white font-semibold'>{cartItems.length}</p>
            </div>
            )}
           
            </div>
           <div className='relative'>
           <motion.img whileTap={{scale:0.6}}
             className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
              src={user?user.photoURL:avatar} alt="" onClick={login} />
             {isMenu &&
              <motion.div 
              initial={{opacity:0,scale:0.6}}
              animate={{opacity:1,scale:1}}
              exit={{opacity:0,scale:2}}
              
              className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 '>
              {user && user.email ==='zerofill.sg@gmail.com'&&
              <Link to={'/create'}>
                <p className="px-4 py-2 flex items-center gap-3 cursor-pointer
               hover:bg-slate-200 transition-all duration-100 ease-in-out text-gray-600 text-base">New Item<MdAddCircle /></p>
               </Link>
              }
            
              <p className="px-4 py-2 flex items-center gap-3 cursor-pointer
               hover:bg-slate-200 transition-all duration-100 ease-in-out text-gray-600 text-base"
               onClick={logOut}
               >Log Out<MdLogout /> </p>

            </motion.div>}
           </div>
           </div>
        </div>
 

        {/* for phone */}
        <div className='flex items-center justify-between md:hidden w-full h-full'>
        <div className='ralative flex items-center justify-center'>
            <FaBasketShopping onClick={showCart} className='text-gray-600 text-2xl ml-8 cursor-pointer'/>
            {cartItems && cartItems.length >0 &&(
              <div className='w-5 h-5 rounded-full  bg-red-600 flex items-center justify-center'>
              <p className='text-xs text-white font-semibold'>{cartItems.length}</p>
            </div>
            )}
           
            </div>
        <Link to = {'/'} className='flex items-center gap-3'>
                <img className='w-8 object-cover' src={logo} alt='logo'></img>
                <p className='text-headingColor text-xl font-bold'>City</p>
            </Link>
            
            <div className='relative'>
           <motion.img whileTap={{scale:0.6}}
             className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full'
              src={user?user.photoURL:avatar} alt="" onClick={login} />
             {isMenu &&
              <motion.div 
              initial={{opacity:0,scale:0.6}}
              animate={{opacity:1,scale:1}}
              exit={{opacity:0,scale:2}}
              
              className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 '>
              {user && user.email ==='zerofill.sg@gmail.com'&& (
              <Link to={'/create'}>
                <p className="px-4 py-2 flex items-center gap-3 cursor-pointer
               hover:bg-slate-200 transition-all duration-100 ease-in-out
                text-gray-600 text-base">New Item<MdAddCircle /></p>
               </Link>)
               
              }
              
                 <ul
           

            className=' flex flex-col gap-8'>
                <li className='px-4 py-2 text-base text-gray-600 hover:text-headingColor 
                  hover:bg-slate-200 transition-all duration-100 ease-in-out cursor-pointer'>Home</li>
                <li className='px-4 py-2 text-base text-gray-600 hover:text-headingColor 
                  hover:bg-slate-200 transition-all duration-100 ease-in-out cursor-pointer'>Menu</li>
                <li className='px-4 py-2 text-base text-gray-600 hover:text-headingColor 
                  hover:bg-slate-200 transition-all duration-100 ease-in-out cursor-pointer'>About Us</li>
                <li className='px-4 py-2 text-base text-gray-600 hover:text-headingColor 
                  hover:bg-slate-200 transition-all duration-100 ease-in-out cursor-pointer'>Service</li>
            </ul>
            
              <p className="px-4 py-2 flex items-center gap-3 cursor-pointer m-2 p-2 rounded-md shadow-md
               hover:bg-gray-300 transition-all duration-100 ease-in-out text-gray-600 text-base bg-gray-200 "
               onClick={logOut}
               >Log Out<MdLogout /> </p>



            </motion.div>}
           </div>
        </div>
    </header>

    
  )
}
