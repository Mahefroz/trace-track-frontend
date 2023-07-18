// rpc = await new ethers.providers.Web3Provider(window.etherium);
// wallet = new Wallet(
//   "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
//   rpc
// );
// contract = new Contract(contractAddress, contractAbi,);

// const tokenURI = await contract.tokenURI(tokenId);

// let params = {
//   contractAddress: contractAddress,
//   functionName: "tokenURI",
//   abi: contractAbi,
//   params: {
//     tokenId: 123,
//   },
// };

// await contractProcessor.fetch({
//   params,
//   onSuccess: (tx) => {
//     console.log(tx);
//   },
//   onError: (error) => {
//     throw error;
//   },
// });

// const data = await runContractFunction({
//   onSuccess: () => {
//     console.log("HI");
//   },
// });
// console.log(tokenURI);

// const { cid: updatedCid } = await storage.put(files, {
//   cid,
//   wrapWithDirectory: false,
//   metadata: {
//     name: metadata.name,
//   },
// });

e.preventDefault();

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");

const daiContract = new ethers.Contract(contractAddress, contractAbi, provider);

const data = await daiContract.tokenURI(123);
