/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/SideBar/Sidebar";
import Video from "./components/Video/Video";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import "./_app.scss";
import WatchScreen from './Screens/WatchScreen/WatchScreen'
import LikedVideos from "./Screens/LikedVideos";

const App = () => {
  const [showSidebar, setShowSideBar] = useState(false);

  const toggleSidebarHandler = () => {
    setShowSideBar(!showSidebar);
  };

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  if (!user) {
    return <LoginScreen />;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <HomeScreen
            showSidebar={showSidebar}
            toggleSidebarHandler={toggleSidebarHandler}
          />
        </Route>
        <Route path="/watch/:videoId" component={WatchScreen} />
        <Route path="/likedVideos" component={LikedVideos} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
