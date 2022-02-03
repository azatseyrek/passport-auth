import React, { useContext } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import "./main.css";
import AdminPage from "./pages/AdminPage";
import { myContext } from "./pages/Context";


function App() {
  const user = useContext(myContext)
  return (
    <BrowserRouter>

        <Navbar />
        <Routes>
          <Route index element={<HomePage />} />
          {user ? (
            <>
              {user.isAdmin ? <Route path="admin" element={<AdminPage />} /> : null}
              <Route path="profile" element={<Profile />} />
            </>
          ) : (
            <>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </>
          )}

        </Routes>

    </BrowserRouter>
  );
}

export default App;
