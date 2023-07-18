import ArtifactsAbi from "../constants/ArtifactsAbi.json";
import ArtifactsAddress from "../constants/ArtifactsAddress.json";
import GreenHillsAbi from "../constants/GreenHillsAbi.json";
import GreenHillsAddress from "../constants/GreenHillsAddress.json";
import useMetamask from "./use-Metamask";
import { ethers } from "ethers";

export const useArtifacts = () => {
  const { connectHandler } = useMetamask();

  const getContract = async () => {
    if (!window.ethereum) {
      throw new Error("MetaMask not Found");
    }
    const { address, provider } = await connectHandler();
    const signer = await provider.getSigner();
    const Contract = new ethers.Contract(
      ArtifactsAddress,
      ArtifactsAbi,
      signer
    );
    return Contract;
  };

  const transferNft = async (
    token_id,
    order_id,
    booking_id,
    to,
    amount,
    pre_minted,
    files,
    key
  ) => {
    const Contract = await getContract();
    const issue_date = new Date().toLocaleString();

    const result = await Contract.transferNft(
      token_id,
      order_id,
      booking_id,
      to,
      amount,
      pre_minted,
      issue_date.toString()
    );
    console.log({ result });
    const txn = await result.wait();
    return txn;
  };

  const mintToken = async (id, to, amount, nft_price, desc, metadata) => {
    const Contract = await getContract();
    const issue_date = new Date().toLocaleString();

    const result = await Contract.transferNft(
      token_id,
      order_id,
      booking_id,
      to,
      amount,
      pre_minted,
      issue_date.toString()
    );
    console.log({ result });
    const txn = await result.wait();
    return txn;
  };

  const transferUtility = async (token_id, tokens, booking_id, to) => {
    const Contract = await getContract();
    const result = await Contract.transferUtilityToken(
      token_id,
      tokens,
      booking_id,
      to
    );
    console.log({ result });
    const txn = await result.wait();
    return txn;
  };
  return {
    transferNft,
    transferUtility,
  };
};

export const useGreenHills = () => {
  const { connectHandler } = useMetamask();

  const getContract = async () => {
    if (!window.ethereum) {
      throw new Error("MetaMask not Found");
    }
    const { address, provider } = await connectHandler();
    const signer = await provider.getSigner();
    const Contract = new ethers.Contract(
      GreenHillsAddress,
      GreenHillsAbi,
      signer
    );
    return Contract;
  };

  const mintLand = async (id, country, region, latlong, metadata) => {
    const Contract = await getContract();

    const result = await Contract.mintLand(
      id,
      country,
      region,
      latlong,
      "0",
      metadata
    );
    console.log({ result });
    const txn = await result.wait();
    return txn;
  };

  const mintServices = async (amount) => {
    const Contract = await getContract();

    const result = await Contract.mintServices(amount);
    console.log({ result });
    const txn = await result.wait();
    return txn;
  };

  const transferAndUpdateCid = async (to, land_id, issueDate, newCid) => {
    const Contract = await getContract();

    const result = await Contract.transfer(to, land_id, issueDate, newCid);
    console.log({ result });
    const txn = await result.wait();
    return txn;
  };

  const getDataForLand = async (land_id) => {
    const Contract = await getContract();

    const result = await Contract.viewToken(land_id);

    return result;
  };

  return {
    mintLand,
    mintServices,
    transferAndUpdateCid,
    getDataForLand,
  };
};
