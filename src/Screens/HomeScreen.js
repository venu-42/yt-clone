import React from "react";
import Header from '../components/Header/Header'
import Sidebar from "../components/SideBar/Sidebar";
import Videos from "../components/Video/Video";
import Category from '../components/Category/Category'
import { Helmet } from "react-helmet";

const HomeScreen = ({showSidebar,toggleSidebarHandler}) => {
  return (
    <>
        <Helmet>
          <title>{"ZedTube"}</title>
        </Helmet>
        <Category />
        <Videos />
    </>
  );
};

export default HomeScreen;
