import React, { useEffect, useRef, useState } from "react";
// import { useMoralis } from "react-moralis";
// import Moralis from "moralis";
import { ethers } from "ethers";
// import Web3 from "web3";
import { toast } from "react-toastify";
import swal from "sweetalert";

const useMetamask = () => {
  // const { isWeb3EnableLoading, isWeb3Enabled } = useMoralis();
  const [account, setAccount] = useState();
  const [userBalance, setUserBalance] = useState(0);
  const [currentAddress, setCurrentAddress] = useState("");
  const [isPolygon, setIsPolygon] = useState(false);
  const [currentNetwork, setCurrentNetwork] = useState();
  // let web3;
  // if (window.ethereum) {
  //   // web3 = new Web3(window.ethereum);
  // }
  // const rpcUrl = "https://polygon-rpc.com/"
  // const matic = "0x89"
  const rpcUrl = "https://rpc-mumbai.maticvigil.com/";
  const matic = "0x13881";

  const getChainId = async () => {
    if (!window.ethereum) {
      return null;
    }
    // const id = 80001;
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const { chainId: id } = await provider.getNetwork();
    console.log(id);
    if (id == parseInt(matic, 16)) {
      setIsPolygon(true);
    } else if (id == parseInt(matic, 16)) {
      // infoHandler("Please change your Metamask Network to Polygon.", "Metamask")
    }

    return id;
  };

  if (window.ethereum) {
    window.ethereum.on("chainChanged", (chainId) => {
      if (chainId == matic) {
        setIsPolygon(true);
        setCurrentNetwork(chainId);
      } else if (chainId != matic) {
        setIsPolygon(false);
        setCurrentNetwork(chainId);
        // infoHandler(
        // 	"Please change your Metamask Network to Polygon.",
        // 	"Metamask"
        // )
      }
    });
  }

  const changeNetwork = async () => {
    try {
      const chainId = getChainId();

      if (chainId != parseInt(matic, 16)) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: matic,
              rpcUrls: [rpcUrl],
              chainName: "Polygon Mumbai",
              nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18,
              },
              blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
            },
          ],
        });
        if (chainId == parseInt(matic, 16)) setIsPolygon(true);
      }
    } catch (e) {
      // console.log(e)
    }
  };

  // useEffect(() => {
  //   const func = async () => {
  //     let accounts;
  //     if (!window.ethereum) {
  //       return;
  //       // infoHandler("No Metamask Installed", "Metamask")
  //     } // web3.eth.getAccounts(function (err, accoun) {
  //     // 	if (err != null)
  //     // 		errorHandler(
  //     // 			"Something went wrong please reload the page.",
  //     // 			"Metamask"
  //     // 		)
  //     // 	else if (accoun.length == 0)
  //     // 		infoHandler("Please login using metamask.", "Metamask")
  //     // 	else if (accoun.length > 0) {
  //     // 		accounts = accoun
  //     // 	}
  //     // })
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     accounts = await provider.listAccounts();
  //     let currentAccount;
  //     let isCurrentAccount;
  //     if (accounts) {
  //       if (accounts[0]) {
  //         currentAccount = accounts[0];
  //         isCurrentAccount = currentAccount.length != 0;
  //       }
  //     }
  //     // console.log(accounts, isWeb3EnableLoading, isWeb3Enabled)
  //     try {
  //       if (isCurrentAccount) {
  //         console.log("hi");
  //         window.ethereum.enable().then(async () => {});
  //         await changeNetwork();
  //         await getChainId();
  //         const account_s = await provider.listAccounts();
  //         setAccount(account_s[0]);
  //         // await getUserData();
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       toast.error("Please Connect Metamask using Continue button!", {
  //         position: "top-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //     }
  //   };
  //   func();
  // }, [account]);

  // const getUserData = async () => {
  //   try {
  //     // console.log("his")
  //     if (account) {
  //       // await Moralis.enableWeb3();
  //       console.log("hi");
  //       const bal = await web3.eth.getBalance(account);
  //       const balance = web3.utils.fromWei(bal, "ether");

  //       // console.log(balance)
  //       setCurrentAddress(account);
  //       setUserBalance(balance);
  //       const userAddress = account;

  //       return {
  //         balance,
  //         userAddress,
  //       };
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  const connectHandler = async () => {
    try {
      if (!window.ethereum) {
        // return toast.error("MetaMask not Found!", {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
        return swal("Metamask not installed", "Metamask", "error");
      }

      let accounts;
      let provider;
      if (!account || true) {
        // console.log(account);
        await window.ethereum.enable();
        await changeNetwork();
        provider = new ethers.providers.Web3Provider(window.ethereum);
        accounts = await provider.listAccounts();
        setAccount(accounts[0]);
      } else if (!isPolygon && account) {
        await changeNetwork().catch((e) => {
          console.log(e);
        });
      } else if (account && isPolygon) {
        toast.success("MetaMask Connected", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return account;
      }

      // const { balance, userAddress, createdAt, updatedAt } = await getUserData();
      // return await getUserData();
      return { address: accounts[0], provider };
    } catch (e) {
      console.log(e);
    }
  };
  const logOut = async () => {
    // await logout();
    console.log("logged out");
  };

  const getConnectedAccounts = async () => {
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();
    return accounts;
  };
  return {
    logOut,
    connectHandler,
    currentAddress,
    userBalance,
    account,
    isPolygon,
    changeNetwork,
    currentNetwork,
    getConnectedAccounts,
  };
};
export default useMetamask;
