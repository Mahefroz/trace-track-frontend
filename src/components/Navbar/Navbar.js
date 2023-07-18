import React, { useEffect } from "react";
import { BsFillHouseDoorFill } from "react-icons/bs";
import { BiTag } from "react-icons/bi";
import { CgData } from "react-icons/cg";
import { MdOutlineProductionQuantityLimits, MdWebAsset } from "react-icons/md";
import { IoIosBusiness } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useState } from "react";
import NavDropdown from "react-bootstrap/NavDropdown";

import DropdownButton from "react-bootstrap/DropdownButton";

import "./Navbar.css";

const Navbar = (props) => {
  console.log("props", props);
  const [display, setDisplay] = useState(false);
  // const [loc, setLoc] = useState("");
  // const loc = useLocation();
  // console.log("loc", loc);

  const handleTag = () => {
    setDisplay((display) => !display);
  };
  // const url = () => {
  //   const loc = useLocation();
  //   console.log(loc);
  //   // setLoc(loc);
  // };
  useEffect(() => {
    // url();
  }, []);
  return (
    <div className=" d-flex flex-row">
      <div class="nav-bar  col-2  ">
        <div className="vertical-nav" id="sidebar">
          {/* <div className="d-flex mt-4 mb-3 mx-3 p-2   ">
            <img src="logo.jpg" height="30px" />

            <h4 className=" px-2">Trace N Track</h4>
          </div> */}

          <ul class="nav flex-column mt-3  mb-0 mr-3 ">
            <li class="nav-item d-flex align-items-center mx-2 ">
              <a href="#" className="nav-link   ">
                <NavLink
                  to="/dashboard"
                  className={({ isActive, isPending }) =>
                    isActive ? "active " : "inactive"
                  }
                >
                  <i class="fa fa-th-large mr-3  fa-fw p-2 mb-2">
                    <BsFillHouseDoorFill
                      className={({ isActive }) =>
                        isActive ? "mb-0 mt-0 dark mb-1 " : "mb-1"
                      }
                    />
                  </i>
                  Dashboard
                </NavLink>
              </a>
            </li>
            {/* <div class=" d-flex mx-4 " onClick={handleTag}>
              <li class="nav-item d-flex align-items-center  ml-4 ">
                <i class="fa fa-th-large  fa-fw p-2 pb-1 mb-1">
                  <BiTag
                    className={({ isActive }) =>
                      isActive ? "mb-0 mt-0 dark mb-1 " : "mb-1"
                    }
                  />
                </i>
                Tag
              </li>
            </div> */}

            <li
              class="nav-item d-flex align-items-center mx-2   "
              onClick={handleTag}
            >
              <a href="#" className="nav-link   ">
                {console.log(useLocation().pathname)}
                <NavLink
                  to=""
                  className={
                    useLocation().pathname === "/tagProduct"
                      ? "active "
                      : "inactive"
                  }
                >
                  <i class="fa fa-th-large mr-3  fa-fw p-2 mb-2">
                    <BiTag
                    // className={
                    //   useLocation().pathname === "/tagProduct"
                    //     ? "mb-0 mt-0 dark mb-1 "
                    //     : "mb-1"
                    // }
                    // className={({ isActive }) =>
                    //   isActive ? "mb-0 mt-0 dark mb-1 " : "mb-1"
                    // }
                    />
                  </i>
                  Tag
                  {/* <div class="mx-2 mb-0" onClick={handleTag}>
                <p>
                  <i class="fa fa-th-large fa-fw px-1 ">
                    <BiTag className={display ? "active " : "inactive"} />
                  </i>
                  &nbsp; Tag
                </p>
              </div> */}
                  <div
                    className={display ? "d-flex col-lg m-1 " : "hide"}
                    //  className="d-flex col"
                  >
                    <ul className="list ml-0 mt-3 ">
                      <li>
                        {/* <a href="#" className="nav-link   "> */}
                        <NavLink
                          to="/tagProduct"
                          className={({ isActive, isPending }) =>
                            isActive ? "active " : "inactive"
                          }
                        >
                          <p className="list-items my-1">
                            {" "}
                            <i class="fa fa-th-large mr-3  fa-fw p-2 mb-2">
                              <MdOutlineProductionQuantityLimits
                                className={({ isActive }) =>
                                  isActive ? "mb-0 mt-0 dark mb-1 " : "mb-1"
                                }
                              />
                            </i>
                            Tag Product
                          </p>
                        </NavLink>
                        {/* </a> */}
                      </li>
                      <li>
                        {/* <a href="#" className="nav-link   "> */}
                        <NavLink
                          to="/tagBusiness"
                          className={({ isActive, isPending }) =>
                            isActive ? "active " : "inactive"
                          }
                        >
                          <p className="list-items my-1">
                            {" "}
                            <i class="fa fa-th-large mr-3  fa-fw p-2 mb-2">
                              <IoIosBusiness
                                className={({ isActive }) =>
                                  isActive ? "mb-0 mt-0 dark mb-1 " : "mb-1"
                                }
                              />
                            </i>
                            Tag Business Location
                          </p>
                        </NavLink>
                        {/* </a> */}
                      </li>
                      <li>
                        {/* <a href="#" className="nav-link   "> */}
                        <NavLink
                          to="/tagAsset"
                          className={({ isActive, isPending }) =>
                            isActive ? "active " : "inactive"
                          }
                        >
                          <p className="list-items my-1">
                            <i class="fa fa-th-large mr-3  fa-fw p-2 mb-2">
                              <MdWebAsset
                                className={({ isActive }) =>
                                  isActive ? "mb-0 mt-0 dark mb-1 " : "mb-1"
                                }
                              />
                            </i>
                            Tag Asset
                          </p>
                        </NavLink>
                        {/* </a> */}
                      </li>
                    </ul>
                  </div>
                </NavLink>
              </a>
            </li>

            <li class="nav-item d-flex align-items-center mx-2 ">
              <a href="#" className="nav-link ">
                <NavLink
                  to="/trace"
                  className={({ isActive, isPending }) =>
                    isActive ? "active " : "inactive"
                  }
                >
                  <i class="fa fa-th-large mr-3  fa-fw p-2 mb-2">
                    <CgData
                      className={({ isActive }) =>
                        isActive ? "mb-0 mt-0 dark mb-1 " : "mb-1"
                      }
                    />
                  </i>
                  Trace
                </NavLink>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="p-3 w-100">{props.children}</div>
    </div>
  );
};

export default Navbar;
