import React, { useState } from 'react'
import Home from './home'
import MenuContainer from './MenuContainer'
import { motion } from 'framer-motion'
import { MdChevronLeft, MdChevronRight} from 'react-icons/md'
import RowContainer from './RowContainer'
import useFirestore from '../hook/useFireStore'
import Cartcontainer from './Cartcontainer'
import { useStateValue } from '../contexts/StateProvider'
export default function Maincontainer() {

  const [{user,cartShow},dispatch] = useStateValue();

  
  let{getCollection}=useFirestore();
  let {error,data,loading} = getCollection('Foods');

  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollChildLeft = () => {
    setScrollPosition((prev) => Math.max(prev - 200, 0));
  };

  const scrollChildRight = () => {
    setScrollPosition((prev) => prev + 200);
  };


  return (
    <div className='w-full h-auto flex flex-col items-center justify-center'>
       <Home/>

       <section className='w-full'>
        <div className='w-full flex items-center justify-between mt-20'>
          <p className='text-2xl font-semibold capitalize text-gray-500 relative
          before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-4
          before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all
          ease-in-out duration-100'
          >
              Our Fresh & Healthy Food
          </p>
          <div className='hidden md:flex gap-3 items-center'>
            <motion.div whileTap={{scale :0.75}}
            onClick={scrollChildLeft}
             className='w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 transition-all duration-100 ease-in-out
            hover:shadow-lg flex items-center justify-center cursor-pointer'>
              <MdChevronLeft className='text-white text-2xl'></MdChevronLeft>
            </motion.div>
            <motion.div whileTap={{scale :0.75}} 
            onClick={scrollChildRight}
            className='w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500  transition-all duration-100 ease-in-out
            hover:shadow-lg flex items-center justify-center cursor-pointer'>
              <MdChevronRight className='text-white text-2xl'></MdChevronRight>
            </motion.div>
           
          </div> 
        

        </div>
       
      <RowContainer flag={true} 
      scrollPosition={scrollPosition}
      datas={data ?.filter(n=>n.category ==='icecream')}
      />
       </section>
       
       <MenuContainer flag={false}
   
     
       />
       {cartShow &&   <Cartcontainer/> }
    

       
      

    </div>
   
    
  )
}
