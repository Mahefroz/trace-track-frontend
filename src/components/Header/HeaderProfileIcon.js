import $ from "jquery";
import "./HeaderProfileIcon.css";
import Cookies from "js-cookie";

const HeaderProfileIcon = () => {
  $(".header-profile-wrapper").hover(
    function () {
      // Code to execute when the element is hovered over
      console.log("hi");
      $(".profile-option-box").removeClass("d-none");
    },
    function () {
      $(".profile-option-box").addClass("d-none");
      // Code to execute when the mouse leaves the element
    }
  );
  const logout = () => {
    Cookies.remove("jwtToken");
    window.location.href = "/";
  };
  return (
    <div className="header-profile-wrapper">
      <div className="header-profile">
        <img
          src="user-icon.webp"
          height="32px"
          className="border-0 rounded-circle p-0"
        />
      </div>
      <div className="profile-option-box d-none translate-middle-x start-50 border-0 border rounded-2  shadow-lg">
        <div className="box-arrow start-50"></div>
        <div className="mx-2 my-0 ">
          <button className="btn ">Profile</button>
        </div>
        <div className="mx-2 my-0 ">
          <button className="btn " onClick={logout}>
            logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderProfileIcon;
