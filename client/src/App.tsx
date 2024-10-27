import React from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import CustomerReview from "./pages/Home/CustomerReveiws/CustomerReview";
import Earnings from "./pages/Home/Earnings/Earnings";
import HomeNav from "./components/HomeNav/HomeNav";
import { useDispatch } from "react-redux";
import { setSelected } from "./redux/slice/homeNavOptions.slice";

function App() {
  const dispatch = useDispatch();

  const location = useLocation();

  function setNavbar() {
    if (location.pathname == "/customer-reviews") {
      dispatch(setSelected("customer"));
    } else if (location.pathname == "/earning") {
      dispatch(setSelected("earning"));
    }else{
      dispatch(setSelected("home"));
    }
  }

  React.useEffect(() => {
    setNavbar();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomeNav />}>
        <Route path="/" element={<Home />} />
        <Route path="/customer-reviews" element={<CustomerReview />} />
        <Route path="/earning" element={<Earnings />} />
      </Route>
    </Routes>
  );
}

export default App;
