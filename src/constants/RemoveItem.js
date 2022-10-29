import axios from "axios";

export const RemoveItem = (id) => {
    axios.delete(`http://localhost:4000/api/jobs/delete/${id}`,{
          withCredentials:true});
}

