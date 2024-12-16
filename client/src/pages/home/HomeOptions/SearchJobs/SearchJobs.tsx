import React from "react";
import styles from "./SearchJobs.module.css";
import { useNavigate } from "react-router-dom";

const SearchJobs = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.searchjobContainer}>
      <div className={styles.noRecentJobMessage}>
        <h4>Currently no job openings</h4>
        <p>Post a job and hire skilled empolyes from here.</p>
        <button onClick={() => navigate("/post-job")}>Post a job</button>
      </div>
    </div>
  );
};

export default SearchJobs;
