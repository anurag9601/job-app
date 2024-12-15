import React, { useState, useEffect, useRef } from "react";
import styles from "./HomeNav.module.css";
import logo from "../../assets/images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { setSelected } from "../../redux/slice/homeNavOptions.slice";
import { Outlet, useNavigate } from "react-router-dom";
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";
import { stateType } from "../../redux/store";
import { setAppMode } from "../../redux/slice/app.container.slice";

const HomeNav: React.FC = () => {
  const dispatch = useDispatch();
  const selected = useSelector((state: stateType) => state.homeNav.selected);
  const navigate = useNavigate();

  const appMode = useSelector((state: stateType) => state.appContainer.appMode);

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsDropdownVisible((prev) => !prev);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
              className={selected === "home" ? styles.selectedOption : ""}
              onClick={() => {
                dispatch(setSelected("home"));
                navigate("/");
              }}
            >
              Home
            </li>
            <li
              className={selected === "customer" ? styles.selectedOption : ""}
              onClick={() => {
                dispatch(setSelected("customer"));
                navigate("/customer-reviews");
              }}
            >
              Customer reviews
            </li>
            <li
              className={selected === "earning" ? styles.selectedOption : ""}
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
          <div
            className={styles.lightDarkModeContainer}
            ref={dropdownRef}
            tabIndex={0}
            onClick={toggleDropdown}
          >
            {appMode === "light" ? (
              <CiLight className={styles.modeIcon} />
            ) : (
              <CiDark className={styles.modeIcon} />
            )}
            {isDropdownVisible && (
              <ul>
                <li
                  onClick={() => {
                    dispatch(setAppMode("system"));
                    setIsDropdownVisible(false);
                  }}
                >
                  System
                </li>
                <li
                  onClick={() => {
                    dispatch(setAppMode("light"));
                    setIsDropdownVisible(false);
                  }}
                >
                  Light
                </li>
                <li
                  onClick={() => {
                    dispatch(setAppMode("dark"));
                    setIsDropdownVisible(false);
                  }}
                >
                  Dark
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      <hr className={styles.navbarBottomLine} />
      <Outlet />
    </>
  );
};

export default HomeNav;
