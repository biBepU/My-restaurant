import App from '../App'
import {
    createBrowserRouter,
  
  } from "react-router-dom";
import Maincontainer from '../components/Maincontainer';
import Create from '../components/Create';
import Home from '../components/home'



  

const router = createBrowserRouter([
    {
      path: "/",
      element:   <App />,
      children :[
        {
          path : "",
          element : <Maincontainer/>
        },
       
        {
          path : "/create",
          element :  <Create/> 
        },
        {
          path : "/home",
          element :  <Maincontainer/> 
        },
        
     
      
      
      
      ]
    },
  ]);

  export default router;