import { api } from "@/lib/middleware/apiInceptor";
import { SCHOOLS } from "..";
import { toast } from "react-toastify";
import { handleError } from "@/lib/helpers/handleErrors";
export const addSchool = async (payload) => {
  try {
    let res = await api.post(SCHOOLS, payload);
    toast.success(res.data.message);
    return res.data.payload;
  } catch (error) {
    handleError(error);
  }
};

export const getSchool = async ({ limit = 5, page = 1 }) => {
  try {
    let res = await api.get(SCHOOLS, {
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
