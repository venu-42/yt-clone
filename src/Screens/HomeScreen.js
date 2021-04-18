import React from "react";
import Header from '../components/Header/Header'
import Sidebar from "../components/SideBar/Sidebar";
import Videos from "../components/Video/Video";
import Category from '../components/Category/Category'


const HomeScreen = ({showSidebar,toggleSidebarHandler}) => {
  return (
    <>
      <Header toggleHandler={toggleSidebarHandler} />
      <div className="main__body">
        {showSidebar && <Sidebar toggleHandler={toggleSidebarHandler} />}
        <div>
          <Category />
          <Videos />
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
