import Header from "../components/Header/Header";
import useToken from "../components/custom-hooks/use-Token";
import Page404 from "./Page404";

const ProtectedRoutes = ({ Comp }) => {
  const { getToken } = useToken();
  console.log("Token", getToken);
  return (
    <>
      {" "}
      {getToken() != undefined ? (
        <div>
          {/* <Header /> */}
          {Comp}
        </div>
      ) : (
        <Page404 />
      )}
    </>
  );
};
export default ProtectedRoutes;
