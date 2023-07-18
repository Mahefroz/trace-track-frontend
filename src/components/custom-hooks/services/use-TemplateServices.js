import axios from "axios";
import useToken from "../use-Token";

const useTemplateServices = () => {
  const { setToken, getToken } = useToken();
  axios.defaults.withCredentials = true;
  const auth = getToken();
  // console.log("Auth", auth);

  const headers = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };

  const createTemplate = async (payload, callback, errorCallBack) => {
    return await axios
      .post("template/addTemplate", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const updateTemplate = async (payload, callback, errorCallBack) => {
    return await axios
      .post("template/updateTemplate", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const updateTemplateDetails = async (payload, callback, errorCallBack) => {
    return await axios
      .post("template/updateTemplateDetails", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const getSingleTemplate = async (payload) => {
    return await axios
      .post("template/getSingleTemplate", payload, headers)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const deleteSingleTemplate = async (payload) => {
    return await axios
      .post("template/deleteSingleTemplate", payload, headers)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const allTemplates = async () => {
    return await axios
      .get("template/allTemplates", headers)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };

  return {
    createTemplate,
    updateTemplate,
    updateTemplateDetails,
    getSingleTemplate,
    deleteSingleTemplate,
    allTemplates,
  };
};
export default useTemplateServices;
