import axios from "axios";
import useToken from "../use-Token";

const useAssetServices = () => {
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
  const addAssetCategory = async (payload) => {
    return await axios
      .post("assetCategory/addAssetCategory", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const updateAssetCategory = async (payload) => {
    return await axios
      .post("assetCategory/updateAssetCategory", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const allAssetCategory = async () => {
    return await axios
      .get("assetCategory/allAssetCategory", headers)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const deleteAssetCategory = async (payload) => {
    return await axios
      .post("assetCategory/deleteAssetCategory", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const addAssetMethod = async (payload) => {
    return await axios
      .post("assetCategory/addAssetMethod", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const addAssetTemplate = async (payload) => {
    return await axios
      .post("assetCategory/addAssetTemplate", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const updateAssetTemplate = async (payload) => {
    return await axios
      .post("assetCategory/updateAssetTemplate", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const updateAssetMethod = async (payload) => {
    return await axios
      .post("assetCategory/updateAssetMethod", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const deleteAssetMethod = async (payload) => {
    return await axios
      .post("assetCategory/deleteAssetMethod", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const deleteAssetTemplate = async (payload) => {
    return await axios
      .post("assetCategory/deleteAssetTemplate", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };

  return {
    addAssetCategory,
    allAssetCategory,
    updateAssetCategory,
    deleteAssetCategory,
    addAssetTemplate,
    updateAssetTemplate,
    addAssetMethod,
    updateAssetMethod,
    deleteAssetMethod,
    deleteAssetTemplate,
  };
};

export default useAssetServices;
