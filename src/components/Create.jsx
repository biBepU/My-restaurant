import React, { useState } from 'react'
import { motion, useInView } from 'framer-motion';

import  {MdCloudUpload, MdFastfood, MdDelete, MdFoodBank, MdPriceChange} from 'react-icons/md'
import { categories } from '../utils/data';
import { Loader } from '.';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase';
import useFirestore from '../hook/useFireStore';
import { useNavigate } from 'react-router-dom';


export default function Create() {
  const nevigate = useNavigate();

  const [title,setTitle] = useState('');
  const [calories,setCalories] = useState('');
  const [price,setPrice] = useState('');
  const [category,setCategory] = useState(null);
  const [alertStatus,setAlertStatus] = useState('danger');
  const [fields,setFields] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [imageAsset,setImageAsset] = useState(null)
  const [msg,setMsg] = useState('')
 

  let {addCollection} = useFirestore();
 

  const uploadImage =(e)=>{
      setIsLoading(true);
      const imageFile = e.target.files[0]
      console.log(imageFile)
      const storageRef = ref(storage,`images/${Date.now()}-${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef,imageFile);
      uploadTask.on('state_changed',(snapshot)=>{
          const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes)* 100;
      },(error)=>{
        console.log(error);
        setFields(true);
        setMsg('Error While uploading : Try Again');
        setAlertStatus('danger');
        setTimeout(() => {
          setFields(false);
          setIsLoading(false)
        }, 4000);
      },()=>{

        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL=>{
          setImageAsset(downloadURL);
          setIsLoading(false)
          setFields(true)
          setMsg('Image Uploaded')
          setAlertStatus('success')
          setTimeout(() => {
        
            setFields(false);

            
          }, 4000);
        })
      })
  }

  const deleteImage =()=>{
    setIsLoading(true);
    const deleteRef =ref(storage,imageAsset);
    deleteObject(deleteRef).then(()=>{
      setImageAsset(null)
      setIsLoading(false)
      setFields(true)
          setMsg('Image Delete')
          setAlertStatus('success')
          setTimeout(() => {
        
            setFields(false);

            
          }, 4000);

    })

  }


  const saveDetails =()=>{
    setIsLoading(true);
    try{
      if(!title || !calories || !imageAsset || !price || ! categories){
        setFields(true);
        setMsg('Requit Field cnat be empty');
        setAlertStatus('danger');
        setTimeout(() => {
          setFields(false);
          setIsLoading(false)
        }, 4000);

      }else{
        const data ={
          id : `${Date.now()}`,
          title : title,
          imageURL : imageAsset,
          category :category,
          calories : calories,
          qty :1,
          price : price
        }

       addCollection('Foods',data);
       setIsLoading(false)
       setFields(true)
       setMsg('Image Uploaded')
       setAlertStatus('success')
       setTimeout(() => {
     
         setFields(false);
         clearData();

         
       }, 4000);
        
      }

    }catch(error){
      console.log(error);
        setFields(true);
        setMsg('Error While uploading : Try Again');
        setAlertStatus('danger');
        setTimeout(() => {
          setFields(false);
          setIsLoading(false)
        }, 4000);

    }

  }
  const clearData =()=>{
    setTitle('');
    setImageAsset(null);
    setCalories('');
    setPrice('');
    setCategory('select categories')
  }
  return (
    <div className='w-full min-h-screen h-auto p-4 flex items-center justify-center'> 
    <div className='w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center'>

    {
        fields && (
          <motion.p initial={{opacity:0}} 
                    animate={{opacity:1}}
                    exit={{opacity:0}}
          className={`w-full p-2 rounded-lg text-center text-lg font-semibold
           ${alertStatus === 'danger' ? 'bg-red-400 text-red-800' : 'bg-emerald-400 text-eamrald-800'}`}>
            Something Wrong
          </motion.p>
        )
      }
      <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
          <MdFastfood className='text-xl text-gray-500'/>
          <input 
          onChange={e=>setTitle(e.target.value)} 
          type='text' 
          required value={title} 
          placeholder='Give me a title..'
           className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-500'>

           </input>
      </div>
      <div className='w-full'>
        <select onChange={e=>setCategory(e.target.value)}>
          <option value='other' className='bg-white w-full'>Select Categories</option>
          {categories && categories.map(items=>(
            <option key={items.id} className='text-base border-0 outline-none capitalize bg-white text-gray-800'
            value={items.urlParamName}>
              {items.name}
            </option>
          ))}
        </select>

      </div>
      <div className='group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-[200px] md:h-[420]px
      cursor-pointer rounded-lg'>
        {isLoading ? <Loader/> : <>
          {!imageAsset ? <>
          <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
            <div  className='w-full h-full flex flex-col items-center justify-center gap-2'>
              <MdCloudUpload className='text-gray-500 text-3xl hover:text-gray-700'/>
              <p>click here to upload</p>
            </div>
            <input type='file' name='uploadimage' accept='imgae/*' onChange={uploadImage} className='w-0 h-0'></input>
          </label>
          </>:<>
          <div className='relative h-full'>
            <img src={imageAsset} alt='upload image' className='w-full h-full object-cover'></img>
            <button type='button' className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none
            hover:shadow-md duration-100 transition-all ease-in-out' onClick={deleteImage}>
              <MdDelete className='text-white'/>
            </button>

            </div>
            </> }
          
        </>}
        
      </div>
      <div className='w-full flex flex-col md:flex-row items-center gap-3'>
        <div className='w-full py-2 border-gray-300 flex items-center gap-2'>
          <MdFoodBank className='text-gray-700 text-2xl'/>
          <input type='text' 
          value={calories}
          onChange={e=>setCalories(e.target.value)}
            required placeholder='Calories' 
            className='w-full h-full text-lg bg-transparent outline-none border-none
            placeholder:text-gray-400'>

          </input>
        </div>
        <div className='w-full py-2 border-gray-300 flex items-center gap-2'>
          <MdPriceChange className='text-gray-700 text-2xl'/>
          <input type='text' 
          value={price}
          onChange={e=>setPrice(e.target.value)}
            required placeholder='Price' 
            className='w-full h-full text-lg bg-transparent outline-none border-none
            placeholder:text-gray-400'>

          </input>
        </div>
        
      </div>
      
      <div className='flex items-center w-full'>
        <button type='button' className='ml-0 md:ml-auto w-full  md:w-auto border-none outline-none bg-emerald-500
        px-12 py-2 rounded-lg text-lg text-white font-semibold' onClick={saveDetails}>save</button>
      </div>
            
    </div>
     
    </div>
  )
}
