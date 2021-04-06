import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Sidebar from "./components/SideBar/Sidebar";
import Video from "./components/Video/Video";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import "./_app.scss";

const App = () => {
  const [showSidebar, setShowSideBar] = useState(true);

  const toggleSidebarHandler = () => {
    setShowSideBar(!showSidebar);
  };  

  const user = useSelector(state=>state.auth.user);
  const dispatch=useDispatch();

  // useEffect(() => {
  //   dispatch({type:'LOGIN',payload:{name:'venugopal'}})
  // }, [dispatch])

  
  if(!user){
    return <LoginScreen />
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <HomeScreen showSidebar={showSidebar} toggleSidebarHandler={toggleSidebarHandler} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
