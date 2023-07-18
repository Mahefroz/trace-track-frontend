import "./Navbar.css";
import { MdTrackChanges } from "react-icons/md";
import { GrHomeRounded, GrTag } from "react-icons/gr";
import { NavLink } from "react-router-dom";

import React, { useState, useEffect } from "react";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBinLine } from "react-icons/ri";
import { BsGrid3X3GapFill, BsPlusLg } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";
import "./Navigation.css";

const Navbar = (props) => {
  console.log("props", props);
  const navigate = useNavigate();

  const user = true;

  function dropdownOpenFunc(e) {
    if ($(e.target).parent().hasClass("main-link")) {
      if ($(e.target).parent().children("i.plus-icon").hasClass("d-none")) {
        $(e.target).parent().children("i.plus-icon").removeClass("d-none");
        $(e.target).parent().children("i.minues-icon").addClass("d-none");
        $(e.target).parent().next().toggleClass("d-none");
      } else {
        $(e.target).parent().children("i.plus-icon").addClass("d-none");
        $(e.target).parent().children("i.minues-icon").removeClass("d-none");
        $(e.target).parent().next().toggleClass("d-none");
      }
    }
    if ($(e.target).closest(".icon").parent().hasClass("main-link")) {
      if (
        $(e.target)
          .closest(".icon")
          .parent()
          .children("i.plus-icon")
          .hasClass("d-none")
      ) {
        $(e.target)
          .closest(".icon")
          .parent()
          .children("i.plus-icon")
          .removeClass("d-none");
        $(e.target)
          .closest(".icon")
          .parent()
          .children("i.minues-icon")
          .addClass("d-none");
        $(e.target).closest(".icon").parent().next().toggleClass("d-none");
      } else {
        $(e.target)
          .closest(".icon")
          .parent()
          .children("i.plus-icon")
          .addClass("d-none");
        $(e.target)
          .closest(".icon")
          .parent()
          .children("i.minues-icon")
          .removeClass("d-none");
        $(e.target).closest(".icon").parent().next().toggleClass("d-none");
      }
    }
    if ($(e.target).hasClass("main-link")) {
      if ($(e.target).children("i.plus-icon").hasClass("d-none")) {
        $(e.target).children("i.plus-icon").removeClass("d-none");
        $(e.target).children("i.minues-icon").addClass("d-none");
        $(e.target).next().toggleClass("d-none");
      } else {
        $(e.target).children("i.plus-icon").addClass("d-none");
        $(e.target).children("i.minues-icon").removeClass("d-none");
        $(e.target).next().toggleClass("d-none");
      }
    }
  }

  // const logoutFunc = async () => {};

  return (
    <div className="d-flex flex-row ">
      {/* <div className="navbar border-2 shadow-lg col-2 bg-light rounded-end text-dark bg-gradient border-end align-items-start p-3">
        <nav className="text-start mt-4 " id="sidebar">
          <li className="mb-2">
            <NavLink
              to="/dashboard"
              className={({ isActive, isPending }) =>
                !isActive ? "pending" : isActive ? "active" : ""
              }
            >
              <GrHomeRounded color="black" className="mb-1" />
              &nbsp;&nbsp;Dashboard
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/tag"
              className={({ isActive, isPending }) =>
                !isActive ? "pending" : isActive ? "active" : ""
              }
            >
              <GrTag color="black" className="mb-1" />
              &nbsp;&nbsp;Tag
            </NavLink>
          </li>
          <li className="mb-2">
            <NavLink
              to="/trace"
              className={({ isActive, isPending }) =>
                !isActive ? "pending" : isActive ? "active" : ""
              }
            >
              <MdTrackChanges color="black" className="mb-1" />
              &nbsp;&nbsp;Trace
            </NavLink>
          </li>
        </nav>
      </div> */}
      <div className="navbar border-2 shadow-lg col-2 bg-light rounded-end text-dark bg-gradient border-end align-items-start p-3">
        <div className="text-start mt-4 " id="sidebar">
          <ul className="nav-links ps-0 mb-0">
            <li className="mb-2">
              <a
                href="#"
                className="nav-link main-link fs-20 fw-500 d-flex align-items-center"
              >
                {/* <i className="d-flex me-2 icon minues-icon">
                  <AiOutlineMinus />
                </i> */}
                <span>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive, isPending }) =>
                      !isActive ? "pending" : isActive ? "active" : ""
                    }
                  >
                    <GrHomeRounded color="black" className="mb-1" />
                    &nbsp;&nbsp;Dashboard
                  </NavLink>
                </span>
              </a>
            </li>

            <li className="mb-2">
              <a
                href="#"
                className="nav-link main-link fs-20 fw-500 d-flex align-items-center"
              >
                <i className="d-flex me-2 icon minues-icon">
                  <AiOutlineMinus />
                </i>
                <span>
                  <NavLink
                    to="/trace"
                    className={({ isActive, isPending }) =>
                      !isActive ? "pending" : isActive ? "active" : ""
                    }
                  >
                    <MdTrackChanges color="black" className="mb-1" />
                    &nbsp;&nbsp;Trace
                  </NavLink>
                </span>
              </a>
            </li>

            <li>
              <a
                href="#"
                className="nav-link main-link fs-20 fw-500 d-flex align-items-center"
                onClick={(e) => {
                  dropdownOpenFunc(e);
                }}
              >
                <i className="d-flex me-2 icon plus-icon">
                  <BsPlusLg />
                </i>

                <i className="d-flex me-2 icon minues-icon d-none">
                  <AiOutlineMinus />
                </i>

                <GrTag color="black" className="" />

                <span>&nbsp;&nbsp;Tag</span>
              </a>

              <ul className="dropdown-items mb-0 d-none">
                <li>
                  <NavLink
                    to="/tag"
                    className={({ isActive, isPending }) =>
                      !isActive ? "pending" : isActive ? "active" : ""
                    }
                  >
                    &nbsp;&nbsp;Product
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/tag"
                    className={({ isActive, isPending }) =>
                      !isActive ? "pending" : isActive ? "active" : ""
                    }
                  >
                    &nbsp;&nbsp;Business
                  </NavLink>
                </li>

                <li className="mb-2">
                  <NavLink
                    to="/tag"
                    className={({ isActive, isPending }) =>
                      !isActive ? "pending" : isActive ? "active" : ""
                    }
                  >
                    &nbsp;&nbsp;Asset
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div>{props.children}</div>
    </div>
  );
};

export default Navbar;
