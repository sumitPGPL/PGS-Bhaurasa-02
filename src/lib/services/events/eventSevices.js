import { api } from "@/lib/middleware/apiInceptor";
import { EVENTS } from "..";
import { toast } from "react-toastify";
import { handleError } from "@/lib/helpers/handleErrors";
export const addEvent = async (payload) => {
  try {
    let res = await api.post(EVENTS, payload);
    toast.success(res.data.message);
    return res.data.payload;
  } catch (error) {
    handleError(error);
  }
};
export const updateEvent = async (payload) => {
  try {
    delete payload.Roles;
    const res = await api.put(`${EVENTS}/${payload.uuid}`, payload);
    toast.success(res.data.message);
    return res.data.payload;
  } catch (error) {
    handleError(error);
  }
};

export const getEvent = async ({ limit = 5, page = 1 }) => {
  try {
    let res = await api.get(EVENTS, {
      params: {
        limit: limit,
        page: page,
      },
    });
    return res.data.payload;
  } catch (error) {
    handleError(error);
  }
};

export const deleteEvent = async (uuid) => {
  try {
    const res = await api.delete(`${EVENTS}/${uuid}`);
    toast.success(res.data.message);
  } catch (error) {
    handleError(error);
  }
};

export const getEventDetails =async(uuid)=>{
  try {
    const res = await api.get(`${EVENTS}/${uuid}`);
    return res.data.payload
  } catch (error) {
    handleError(error);
  }
}