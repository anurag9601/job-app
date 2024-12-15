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

function App() {
  const dispatch: dispatchType = useDispatch();

  const location = useLocation();

  const appMode = useSelector((state: stateType) => state.appContainer.appMode);

  function setNavbar() {
    if (location.pathname == "/customer-reviews") {
      dispatch(setSelected("customer"));
    } else if (location.pathname == "/earning") {
      dispatch(setSelected("earning"));
    } else {
      dispatch(setSelected("home"));
    }
  }

  React.useEffect(() => {
    setNavbar();
  }, []);

  return (
    <div
      className={`${styles.appContainer} ${
        appMode === "light" ? styles.lightMode : styles.darkMode
      }`}
    >
      <Routes>
        <Route path="/" element={<HomeNav />}>
          <Route path="/" element={<Home />} />
          <Route path="/customer-reviews" element={<CustomerReview />} />
          <Route path="/earning" element={<Earnings />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
