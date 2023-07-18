import axios from "axios";
import useToken from "./use-Token";

const useServices = () => {
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

  const login = async (payload) => {
    const res = await axios.post("/signin", payload);
    console.log("Sign in api call", res);
    return res;
  };
  const signup = async (payload) => {
    const res = await axios.post("/signup", payload);
    console.log("Sign in api call", res);
    return res;
  };
  const verifyOtp = async (payload) => {
    const res = await axios.post("/verifyOtp", payload);
    console.log("Sign in api call", res);
    return res;
  };

  const addProduct = async (payload) => {
    console.log("Payload", payload);
    return await axios
      .post("/product/addProductImg", payload, {
        "Content-Type": "multipart/form-data",
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return error.response.data;
      });
  };
  const addBusinessLoc = async (payload) => {
    console.log("Location tag api");
    return await axios
      .post("/location/addLocation", payload, headers)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const allBusinessLoc = async () => {
    return await axios
      .get("/location/allLocationTags", headers)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const addAsset = async (payload) => {
    //  console.log("Location tag api");
    return await axios
      .post("/asset/addAsset", payload, headers)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const addCategory = async (payload) => {
    //  console.log("Location tag api");
    return await axios
      .post("/category/addCategory", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };

  const addProductDetails = async (payload) => {
    return await axios
      .post("productDetail/addProducts", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const getAllProducts = async () => {
    //  console.log("Location tag api");
    return await axios
      .get("/productDetail/allProducts", headers)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const getSingleProduct = async (payload) => {
    console.log("Payload", payload);
    return await axios
      .post("/productDetail/getSingleProduct", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };

  const addAssetDetail = async (payload) => {
    return await axios
      .post("assetDetail/addAssetDetail", payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };
  const allAssetDetails = async () => {
    //  console.log("Location tag api");
    return await axios
      .get("/assetDetail/allAssetDetails", headers)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log("Error api", error.response.data);
        return error.response.data;
      });
  };

  return {
    signup,
    login,
    verifyOtp,
    addProduct,
    addBusinessLoc,
    addAsset,
    addCategory,

    addProductDetails,
    getAllProducts,
    getSingleProduct,

    allBusinessLoc,
    addAssetDetail,
    allAssetDetails,
  };
};

export default useServices;
