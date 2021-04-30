import React from "react";
import Header from '../components/Header/Header'
import Sidebar from "../components/SideBar/Sidebar";
import Videos from "../components/Video/Video";
import Category from '../components/Category/Category'
import { Helmet } from "react-helmet";

const HomeScreen = ({showSidebar,toggleSidebarHandler}) => {
  return (
    <>
      <div>
        <Helmet>
          <title>{"Youtube"}</title>
        </Helmet>
        <Category />
        <Videos />
      </div>
    </>
  );
};

export default HomeScreen;
