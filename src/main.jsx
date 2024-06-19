import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router-dom'
import  router  from './router'
import { StateProvider } from './contexts/StateProvider'
import { initialState } from './contexts/InitialState'
import reducer from './contexts/Reducer'
import AuthContextProvider, { AuthContext } from './contexts/authContext'




ReactDOM.createRoot(document.getElementById('root')).render(
  
<AuthContextProvider>
<StateProvider initialState={initialState} reducer={reducer} >
<RouterProvider router={router} />
</StateProvider >
</AuthContextProvider>
 


)
