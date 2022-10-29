import React, { useEffect, useState } from 'react'
import axios from 'axios'
function useGetApiHook(url) {
  const [people,SetPeople] = useState([]);
    useEffect(() => {
        axios.get(url).then((response) => SetPeople(response.data.products)).catch((err)=> console.log(err));
       }, [url]);
       
       return people;
}

export default useGetApiHook