import React from "react";
import styles from "./HomeNav.module.css";
import logo from "../../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { setSelected } from "../../redux/slice/homeNavOptions.slice";
import { Outlet, useNavigate } from "react-router-dom";

const HomeNav: React.FC = () => {
  const dispatch = useDispatch();
  const selected = useSelector((state: any) => state.homeNav.selected);
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.homenavContainer}>
        <div className={styles.homenavLeft}>
          <div className={styles.logoContainer}>
            <img
              src={logo}
              alt=""
              className={styles.homenavLogo}
              onClick={() => navigate("/")}
            />
          </div>
          <ul className={styles.homenavOptions}>
            <li
              className={selected == "home" ? styles.selectedOption : ""}
              onClick={() => {
                dispatch(setSelected("home"));
                navigate("/");
              }}
            >
              Home
            </li>
            <li
              className={selected == "customer" ? styles.selectedOption : ""}
              onClick={() => {
                dispatch(setSelected("customer"));
                navigate("/customer-reviews");
              }}
            >
              Customer reviews
            </li>
            <li
              className={selected == "earning" ? styles.selectedOption : ""}
              onClick={() => {
                dispatch(setSelected("earning"));
                navigate("/earning");
              }}
            >
              Your earning
            </li>
          </ul>
        </div>
        <div className={styles.homenavRight}>
          <button className={styles.signupBtn}>Sign up</button>
          <hr />
          <p>Employers / Post Job</p>
        </div>
      </div>
      <hr className={styles.navbarBottomLine}/>
      <Outlet />
    </>
  );
};

export default HomeNav;
