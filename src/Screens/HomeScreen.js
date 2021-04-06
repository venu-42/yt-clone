import React from "react";
import Header from '../components/Header/Header'
import Sidebar from "../components/SideBar/Sidebar";
import Video from "../components/Video/Video";


const HomeScreen = ({showSidebar,toggleSidebarHandler}) => {
  return (
    <>
      <Header toggleHandler={toggleSidebarHandler} />
      <div className="main__body">
        {showSidebar && <Sidebar toggleHandler={toggleSidebarHandler} />}
        <Video />
      </div>
    </>
  );
};

export default HomeScreen;
