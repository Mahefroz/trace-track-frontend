import axios, { all } from "axios";
import { Web3Storage } from "web3.storage";
import CryptoJS from "crypto-js";

const useHelperFunctions = () => {
  const client = new Web3Storage({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEQ2OWE0QWZiN0EyNEJDYjVkODg4NDkyNjdhMTU0Mzk2MEM4MDMzZEYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODA1MDMyOTk0NDQsIm5hbWUiOiJPQ1kifQ.zTK24kuzpAKETN4bn27FQGkgkta0RZ-daj93QoAEJYs",
  });

  const truncateStr = (fullStr, strLen) => {
    if (fullStr.length <= strLen) return fullStr;

    const separator = "...";
    const seperatorLength = separator.length;
    const charsToShow = strLen - seperatorLength;
    const frontChars = Math.ceil(charsToShow / 2);
    const backChars = Math.floor(charsToShow / 2);
    return (
      fullStr.substring(0, frontChars) +
      separator +
      fullStr.substring(fullStr.length - backChars)
    );
  };

  function copy(that, id) {
    var str = document.getElementById(id);
    window.getSelection().selectAllChildren(str);
    var inp = document.createElement("input");
    document.body.appendChild(inp);
    inp.value = that;
    inp.select();
    document.execCommand("copy", false);
    inp.remove();
    var str = document.getElementById(id);
    window.getSelection().selectAllChildren(str);
  }

  const handleSearch = (str, allRows) => {
    const allRowObj = allRows;
    //  setAllRows(allRows);
    console.log("All rows", allRows);
    if (str.length > 0) {
      const temp = allRowObj.filter(
        (i) =>
          i.order.id.toString().includes(str.toString()) ||
          i.Name.toLowerCase().includes(str.toLowerCase()) ||
          i.user.first_name.toLowerCase().includes(str.toLowerCase()) ||
          i.user.last_name.toLowerCase().includes(str.toLowerCase()) ||
          i.order.investment_period.toLowerCase().includes(str.toLowerCase()) ||
          i.order.amount.toLowerCase().includes(str.toLowerCase()) ||
          (i?.order?.payments?.payment_type == "stripe"
            ? i?.order?.payments?.data?.id
              ? i?.order?.payments?.data?.id
                  .toLowerCase()
                  .includes(str.toLowerCase())
              : i?.order?.payments?.data
                  .toLowerCase()
                  .includes(str.toLowerCase())
            : i?.order?.payments?.data?.hash
                .toLowerCase()
                .includes(str.toLowerCase()))

        //      i?.order?.payments?.data?.id
        //   ?.toLowerCase()
        //   ?.includes(str.toLowerCase()) ||
        // i?.order?.payments?.data
        //   ?.toLowerCase()
        //   ?.includes(str.toLowerCase()) ||
        // i?.order?.payments?.data?.hash
        //   ?.toLowerCase()
        //   ?.includes(str.toLowerCase())
      );

      console.log("Search", temp);
      return temp;
    } else if (str.length == 0) {
      return [];
    }
  };

  const handleVerifiedSearch = (str, allRows) => {
    const allRowObj = allRows;
    //  setAllRows(allRows);
    console.log("All rows", allRows);
    if (str.length > 0) {
      const temp = allRowObj.filter(
        (i) =>
          i?.order?.id.toString().includes(str.toString()) ||
          i?.order?.created_at?.toLowerCase().includes(str.toLowerCase()) ||
          i?.order?.investment_period
            .toLowerCase()
            .includes(str.toLowerCase()) ||
          i?.order?.amount.toLowerCase().includes(str.toLowerCase()) ||
          i?.hash.toLowerCase().includes(str.toLowerCase())
      );

      console.log("Search", temp);
      return temp;
    } else if (str.length == 0) {
      return [];
    }
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  function makeFileObjects(
    metaDataHash,
    filename,
    name,
    image,
    description = ""
  ) {
    const obj = {
      metaData: metaDataHash,
      name,
      image,
      description,
    };
    const blob = new Blob([JSON.stringify(obj)], {
      type: "application/json",
    });

    const files = [new File([blob], `${filename}.json`)];
    return files;
  }

  async function uploadFile(content, params) {
    console.log(params);
    const res = await client.put(content, params);
    // console.log(`Uploaded file with CID: ${cid}`);
    console.log(res);
    return `${res}/${params.name}.json`;
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  function randomString(length, chars) {
    var result = "";
    for (var i = 0; i < length; i++) {
      var index = Math.floor(Math.random() * chars.length);
      result += chars.charAt(index);
    }
    return result;
  }

  async function getData(cid, key) {
    const data = await axios.get(`https://ipfs.io/ipfs/${cid}`);
    console.log(data);

    const dec = data.data.metaData;

    let all_files = [];

    for (let i = 0; i < dec.length; i++) {
      const byte = await CryptoJS.AES.decrypt(dec[i], key);

      const val = await byte.toString(CryptoJS.enc.Utf8);
      console.log({ val });

      all_files.push(val);
    }

    return { ...data.data, metaData: all_files };
  }

  async function decryptData(data, key) {
    const byte = await CryptoJS.AES.decrypt(data, key);
    const val = await byte.toString(CryptoJS.enc.Utf8);
    return val;
  }

  async function encryptData(data, key) {
    const encryptedMetadataString = await CryptoJS.AES.encrypt(
      data,
      key
    ).toString();
    return encryptedMetadataString;
  }

  return {
    truncateStr,
    copy,
    handleSearch,
    handleVerifiedSearch,
    makeFileObjects,
    convertBase64,
    uploadFile,
    getRandomArbitrary,
    randomString,
    getData,
    encryptData,
    decryptData,
  };
};

export default useHelperFunctions;
