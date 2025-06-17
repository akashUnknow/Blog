import React from "react";
import { Button } from "./components/ui/button";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import { RouteIndex } from './helper/RouteName'
import Index from "./pages/Index";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>} path={RouteIndex} >
          <Route index element={<Index/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
