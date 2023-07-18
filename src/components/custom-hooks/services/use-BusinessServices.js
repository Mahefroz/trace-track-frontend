import axios from "axios";
import useToken from "../use-Token";

const useBusinessServices = () => {
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
  const addBusinessType = async (payload) => {
    return await axios
      .post("business/addBusinessType", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const deleteBusinessType = async (payload) => {
    return await axios
      .post("business/deleteBusinessType", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const allBusinessTypes = async () => {
    //  console.log("Location tag api");
    return await axios
      .get("/business/allBusinessTypes", headers)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const updateBusinessType = async (payload) => {
    return await axios
      .post("business/updateBusinessType", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const addBusinessMethod = async (payload) => {
    return await axios
      .post("business/addBusinessMethod", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const updateBusinessMethod = async (payload) => {
    return await axios
      .post("business/updateBusinessMethod", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const addBusinessTemplate = async (payload) => {
    return await axios
      .post("business/addBusinessTemplate", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const updateBusinessTemplate = async (payload) => {
    return await axios
      .post("business/updateBusinessTemplate", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const allBusinessMethods = async () => {
    return await axios
      .get("business/allBusinessMethods", headers)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const deleteBusinessTemplate = async (payload) => {
    return await axios
      .post("business/deleteBusinessTemplate", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };

  const deleteBusinessMethod = async (payload) => {
    return await axios
      .post("business/deleteBusinessMethod", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };

  return {
    addBusinessType,
    deleteBusinessType,
    updateBusinessType,
    allBusinessTypes,
    addBusinessMethod,
    updateBusinessMethod,
    allBusinessMethods,
    deleteBusinessMethod,
    addBusinessTemplate,
    updateBusinessTemplate,
    deleteBusinessTemplate,
  };
};

export default useBusinessServices;
