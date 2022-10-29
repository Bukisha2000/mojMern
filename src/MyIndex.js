import React, { useRef, useState } from 'react'
import useGetApiHook from './hooks/useGetApiHook'
import { useEffect } from 'react';
function MyIndex() {
    const inputEl = useRef(0);
    const [timer,SetTimer] = useState(0);
    const data = useGetApiHook('https://dummyjson.com/products/');
    useEffect(() => {
      setInterval(()=> {
        SetTimer(prevValue => prevValue+1);
      },1000);
     }, []);

        const onButtonClick = () => {
            inputEl.current.value = "jesam kliknuo"
        }
  return (
    <div>
       
         <h1>{timer}</h1> 
        <button onClick={() => SetTimer(inputEl.current)}></button>
      
    </div>
  )
}

export default MyIndex