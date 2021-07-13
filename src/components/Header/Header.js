/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, useState } from "react";
import "./_header.scss";
import { IoNotificationsSharp } from "react-icons/io5";
import { MdApps, BsSearch, FaVideo, GiHamburgerMenu } from "react-icons/all";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import { useHistory } from "react-router";
import LogoLaptop from '../../images/image1.png'
import LogoMobile from '../../images/zedtube-logo.png';

const Header = ({ toggleSidebarHandler }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchVal, setSearchVal] = useState("");
  const logoutHandler = () => {
    dispatch(logout());
  };

  const photoURL=useSelector(state=>state.auth.user.photoURL);
  const searchSubmitHandler = (e) => {
      e.preventDefault();
    //   console.log(e.keyCode)
    if (e.keyCode === 13) {
      history.push(`/search/${searchVal}`);
    }
  };
  return (
    <div className="navbar__container">
    <nav className="navbar navbar-expand btm-line">
      <div
        className="mr-3 text-large"
        style={{ cursor: "pointer" }}
        onClick={toggleSidebarHandler}
      >
        <GiHamburgerMenu />
      </div>
      <a
        className="navbar-brand cursor-pointer" style={{marginLeft:10}}
        onClick={() => {
          history.push("/");
        }}
      >
        <img className="laptop-logo"
          src={LogoLaptop}
          alt="home"
          width="100px"
        />
        <img className="mobile-logo"
          src={LogoMobile}
          alt="home"
          width="35px"
        />
        {/* <p className="home__btn">YOUTUBE</p> */}
      </a>

      <div className="search__bar">
        {/* <form className="my-2 my-lg-0" > */}
          <input
            className="bar mr-sm-2"
            type="search"
            placeholder="Search"
            value={searchVal}
            onKeyUp={searchSubmitHandler}
            onChange={(e) => {
              setSearchVal(e.target.value);
            }}
            aria-label="Search"
          />
        {/* </form> */}
      </div>
      <ul className="navbar-nav ml-auto align-items-center mr-3">
        
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle cursor-pointer"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
          >
            <img
              src={photoURL}
              alt="dp"
              width="40"
              height="40"
            />
          </a>
          <div
            className="dropdown-menu dropdown-menu-right"
            aria-labelledby="navbarDropdown"
          >
            <a className="dropdown-item cursor-pointer" onClick={logoutHandler}>
              Logout
            </a>
          </div>
        </li>
      </ul>
    </nav>
    </div>
  );
};

export default Header;
