import React, { useRef, useState } from "react";
import styles from "./Home.module.css";
import { HiOutlineSearch } from "react-icons/hi";
import { MdLocationPin } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setHomeSelectedOption } from "../../redux/slice/home.slice";
import SearchJobs from "./HomeOptions/SearchJobs/SearchJobs";
import RecentSearch from "./HomeOptions/RecentSearches/RecentSearch";

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const jobSearchRef = useRef<HTMLInputElement | null>(null);
  const [activeJobSearchInputBox, setActiveJobSearchInputBox] =
    useState<boolean>(false);

  const selectedOption = useSelector(
    (state: any) => state.home.homeSelectedOption
  );

  async function startSearchInputBoxBtn() {
    jobSearchRef.current?.focus();
    setActiveJobSearchInputBox(true);
    setTimeout(() => {
      setActiveJobSearchInputBox(false);
    }, 2000);
  }

  return (
    <div className={styles.homeContainer}>
      <form className={styles.searchArea}>
        <div className={styles.jobtitle}>
          <div
            className={
              activeJobSearchInputBox === true
                ? styles.animation
                : styles.searchIcon
            }
          >
            <HiOutlineSearch className={styles.jobtitleSearchIcon} />
          </div>
          <input type="text" placeholder="Job title" ref={jobSearchRef} />
        </div>
        <hr />
        <div className={styles.yourLocation}>
          <MdLocationPin className={styles.locationIcon} />
          <input type="text" placeholder="Location" />
        </div>
        <button type="submit" className={styles.findjobBtn}>
          find jobs
        </button>
      </form>
      <p className={styles.employeMessage}>
        <span>There is no need of resume</span> - Just apply for jobs as per your
        interest
      </p>
      <p className={styles.hiresMessage}>
        <span>Post a job today</span> and connect with quality candidates
      </p>
      <div className={styles.homepageOptions}>
        <p
          className={selectedOption == "jobs" ? styles.selected : ""}
          onClick={() => dispatch(setHomeSelectedOption("jobs"))}
        >
          Jobs for you
        </p>
        <p
          className={selectedOption == "recents" ? styles.selected : ""}
          onClick={() => dispatch(setHomeSelectedOption("recents"))}
        >
          Recent searches
        </p>
      </div>
      <hr className={styles.homeOptionsHr} />
      {selectedOption === "jobs" ? (
        <SearchJobs />
      ) : (
        <RecentSearch startSearchFunction={startSearchInputBoxBtn} />
      )}
    </div>
  );
};

export default Home;
