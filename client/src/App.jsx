import React from "react";
import { Button } from "./components/ui/button";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import { RouteIndex,RouterProfile,RouteSignin,RouteSignup} from './helper/RouteName'
import Index from "./pages/Index";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>} path={RouteIndex} >
          <Route index element={<Index/>} />
          <Route path={RouterProfile} element={<Profile/>} />
        </Route>
        <Route path={RouteSignin} element={<Signin/>} />
        <Route path={RouteSignup} element={<Signup/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
