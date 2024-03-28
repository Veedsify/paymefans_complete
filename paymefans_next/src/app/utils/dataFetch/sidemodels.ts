import axios from "axios";

export const sideModels = async () => {
  return axios.post(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/models/all`, {
    limit: 4,
  }, { withCredentials: true }).then((res) => {
    return res.data;
  }
  ).catch((err) => {
    return err;
  });
}