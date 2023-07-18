import axios from "axios";
import useToken from "../use-Token";

const useLocationServices = () => {
  const { setToken, getToken } = useToken();
  axios.defaults.withCredentials = true;
  const auth = getToken();

  const headers = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  const addLocation = async (payload) => {
    return await axios
      .post("location/addLocation", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const getExcelTemplate = async () => {
    return await axios
      .get("location/getExcelTemplate", headers)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };

  return {
    addLocation,
    getExcelTemplate,
  };
};

export default useLocationServices;
