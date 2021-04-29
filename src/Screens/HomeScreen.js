import React from "react";
import Header from '../components/Header/Header'
import Sidebar from "../components/SideBar/Sidebar";
import Videos from "../components/Video/Video";
import Category from '../components/Category/Category'


const HomeScreen = ({showSidebar,toggleSidebarHandler}) => {
  return (
    <>
      <div>
        <Category />
        <Videos />
      </div>
    </>
  );
};

export default HomeScreen;
