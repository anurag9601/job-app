import React from "react";
import Home from "./pages/Home/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import CustomerReview from "./pages/Home/CustomerReveiws/CustomerReview";
import Earnings from "./pages/Home/Earnings/Earnings";
import HomeNav from "./components/HomeNav/HomeNav";
import { useDispatch, useSelector } from "react-redux";
import { setSelected } from "./redux/slice/homeNavOptions.slice";
import styles from "./App.module.css";
import { dispatchType, stateType } from "./redux/store";
import Signup from "./pages/auth/Signup/Signup";
import Signin from "./pages/auth/Signin/Signin";
import Postjob from "./pages/Postjob/Postjob";
import { setUser } from "./redux/slice/user.slice";
import ForgotPassword from "./pages/auth/Signin/ForgotPassword/ForgotPassword";

function App() {
  const dispatch: dispatchType = useDispatch();

  const location = useLocation();

  const appMode = useSelector((state: stateType) => state.appContainer.appMode);

  const user = useSelector((state: stateType) => state.userData.user);

  function setNavbar() {
    if (location.pathname == "/customer-reviews") {
      dispatch(setSelected("customer"));
    } else if (location.pathname == "/earning") {
      dispatch(setSelected("earning"));
    } else {
      dispatch(setSelected("home"));
    }
  }

  async function getAuthenticatedUserData() {
    const request = await fetch("/api/user/authentication");

    const response = request.json();
    response.then((e) => {
      if (e.success === true) {
        dispatch(setUser(e.data));
      } else {
        console.log(e);
      }
    });
  }

  React.useEffect(() => {
    setNavbar();
    getAuthenticatedUserData();
  }, []);

  return (
    <div
      className={`${styles.appContainer} ${
        appMode === "light" ? styles.lightMode : styles.darkMode
      }`}
    >
      <Routes>
        <Route path="/" element={<HomeNav />}>
          <Route path="/sign-up" element={user ? <Home /> : <Signup />} />
          <Route path="/sign-in" element={user ? <Home /> : <Signin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<Home />} />
          <Route path="/customer-reviews" element={<CustomerReview />} />
          <Route path="/earning" element={<Earnings />} />
        </Route>
        <Route path="/post-job" element={<Postjob />}></Route>
      </Routes>
    </div>
  );
}

export default App;
