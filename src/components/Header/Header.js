import { useState, useEffect } from "react";
import useMetamask from "../custom-hooks/use-Metamask";
import useHelperFunctions from "../custom-hooks/use-HelperFunctions";
import useServices from "../custom-hooks/use-Services";
import "./Header.css";
import HeaderProfileIcon from "./HeaderProfileIcon";

const Header = () => {
  const { connectHandler, getConnectedAccounts } = useMetamask();
  const [accounts, setAccounts] = useState([]);
  const { logout } = useServices();
  const { truncateStr } = useHelperFunctions();

  useEffect(() => {
    const func = async () => {
      const res = await getConnectedAccounts();
      setAccounts(res);
    };
    func();
  }, []);

  if (window?.ethereum) {
    window.ethereum.on("accountsChanged", async function (accounts) {
      const res = await getConnectedAccounts();
      setAccounts(res);
    });
  }

  return (
    <div className="px-5 py-3 d-flex justify-content-between border-1px bg-gradient header">
      <div className="d-flex   ">
        <img src="logo.jpg" height="30px" />

        <h4 className="text-light px-2">Trace N Track</h4>
      </div>

      <HeaderProfileIcon />
    </div>
  );
};

export default Header;
