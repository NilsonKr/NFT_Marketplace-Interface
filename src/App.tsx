import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Home } from "./Pages/Home";

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
);
