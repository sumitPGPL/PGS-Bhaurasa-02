import { api } from "@/lib/middleware/apiInceptor"
import { ADD_NEWS } from ".."
import { toast } from "react-toastify";
import { handleError } from "@/lib/helpers/handleErrors";

export const addNews =async(payload) =>{
    const res = await api.post(ADD_NEWS, payload)
    if(res){
      return res
    }
}

export const getAllNews = async ()=>{
    const res = await api.get(ADD_NEWS)
    if(res){
        return res.data.payload.data
    }else{
        return {}
    }
}

export const updateNews = async (payload) => {
    try {
      delete payload.Roles;
      const res = await api.put(`${ADD_NEWS}/${payload.uuid}`, payload);
      toast.success(res.data.message);
      return res.data.payload;
    } catch (err) {
      console.log('error')
    }
  };

  
export const deleteNews = async (uuid) => {
    try {
      const res = await api.delete(`${ADD_NEWS}/${uuid}`);
      toast.success(res.data.message);
    } catch (err) {
      // handleError(error);
      console.log('error')
    }
  };
  
  export const getNewsDetails =async(uuid)=>{
    try {
      const res = await api.get(`${ADD_NEWS}/${uuid}`);
      return res.data.payload
    } catch (error) {
      handleError(error);
    }
  }