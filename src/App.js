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
import WatchScreen from "./Screens/WatchScreen/WatchScreen";
import LikedVideos from "./Screens/LikedVideos";
import ChannelScreen from "./Screens/ChannelScreen/ChannelScreen";
import SearchScreen from "./Screens/SearchScreen/SearchScreen";
import Subscriptions from "./Screens/Subscriptions";

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
    <>
      <BrowserRouter>
        <Header toggleSidebarHandler={toggleSidebarHandler} />
        <div className="main__body">
          {showSidebar && <Sidebar />}
          <div style={{backgroundColor:'#111',width:showSidebar?'86.4%':'100%'}}>
            <Switch>
              <Route path="/" exact>
                <HomeScreen
                  showSidebar={showSidebar}
                  toggleSidebarHandler={toggleSidebarHandler}
                />
              </Route>
              <Route path="/watch/:videoId" component={WatchScreen} />
              <Route path="/likedVideos" component={LikedVideos} />
              <Route path="/search/:keyword" component={SearchScreen} />
              <Route path="/subscriptins" component={Subscriptions} />
              {/* <Route path="/channel/:channelId" component={ChannelScreen} /> */}
              <Route path="/">
                <h3 className="text-center my-5">Thanks for coming! this page has not been Created yet!</h3>
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
