import axios from "axios";
import useToken from "../use-Token";

const useProductServices = () => {
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
  const getAllCategories = async () => {
    //  console.log("Location tag api");
    return await axios
      .get("/category/allCategories", headers)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const allProductCategoryMethods = async () => {
    //  console.log("Location tag api");
    return await axios
      .get("/category/allCategoryMethods", headers)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const updateCategoryMethod = async (payload) => {
    //  console.log("Location tag api");
    return await axios
      .post("/category/updateCategoryMethod", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const addCategoryMethod = async (payload) => {
    //  console.log("Location tag api");
    return await axios
      .post("/category/addCategoryMethod", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const addCategoryTemplate = async (payload) => {
    //  console.log("Location tag api");
    return await axios
      .post("/category/addCategoryTemplate", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const updateCategoryTemplate = async (payload) => {
    return await axios
      .post("/category/updateCategoryTemplate", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const updateSingleCategory = async (payload) => {
    return await axios
      .post("category/updateSingleCategory", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const deleteSingleCategory = async (payload) => {
    return await axios
      .post("category/deleteSingleCategory", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const deleteSingleProduct = async (payload) => {
    return await axios
      .post("productDetail/deleteSingleProduct", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const allProducts = async () => {
    return await axios
      .get("productDetail/allProducts", headers)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const deleteCategoryMethod = async (payload) => {
    return await axios
      .post("category/deleteCategoryMethod", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const deleteCategoryTemplate = async (payload) => {
    return await axios
      .post("category/deleteCategoryTemplate", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const addCategoryData = async (payload) => {
    return await axios
      .post("categoryData/addCategoryData", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const getAllProducts = async (payload) => {
    return await axios
      .post("categoryData/getAllProducts", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const getCurrentSerialNo = async (payload) => {
    return await axios
      .post("categoryData/getCurrentSerialNo", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const getCurrentBatchNo = async (payload) => {
    return await axios
      .post("categoryData/getCurrentBatchNo", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };

  return {
    getAllCategories,
    addCategoryMethod,
    updateCategoryMethod,
    addCategoryTemplate,
    allProductCategoryMethods,
    updateSingleCategory,
    deleteSingleCategory,
    deleteSingleProduct,
    allProducts,
    deleteCategoryMethod,
    deleteCategoryTemplate,
    updateCategoryTemplate,
    addCategoryData,
    getAllProducts,
    getCurrentSerialNo,
    getCurrentBatchNo,
  };
};

export default useProductServices;
