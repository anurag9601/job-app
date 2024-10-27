import React from "react";
import styles from "./RecentSearch.module.css";

interface recentSearchPropsType {
  startSearchFunction: () => void;
}

const RecentSearch = ({ startSearchFunction }: recentSearchPropsType) => {
  return (
    <div className={styles.recentSearchContainer}>
      <div className={styles.noRecentSearchMessage}>
        <h4>No recent searches yet</h4>
        <p>After you run a search, your recent searches will live here.</p>
        <button onClick={startSearchFunction}>Start a search</button>
      </div>
    </div>
  );
};

export default RecentSearch;
