

import { Outlet } from 'react-router-dom'
import './App.css'
import { Header } from './components'
import { AnimatePresence } from 'framer-motion';
function App() {
 

  return (
    <AnimatePresence wait>
    <div className='w-screen h-auto flex flex-col bg-purple-50'>
  
  
   <Header/>
   
    <main className='mt-16 md:mt-20 md:px-16 px-4 py-4 w-full'>
    <Outlet/>
    </main>

   

    </div>
    </AnimatePresence>
  )
}

export default App
