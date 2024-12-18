import React from "react";
import styles from "./CustomerReview.module.css";
import { HiOutlineSearch } from "react-icons/hi";
import thankyou from "../../../assets/images/thankyou.png";

const CustomerReview = () => {
  return (
    <div className={styles.customerReviewContainer}>
      <h1>Find great place to work</h1>
      <p className={styles.searchMessage}>Customer name or job title</p>
      <form className={styles.searchAreaContainer}>
        <div className={styles.searchInput}>
          <input type="text" />
          <HiOutlineSearch className={styles.searchIcon} />
        </div>
        <button type="submit">Find customer</button>
      </form>
      <div className={styles.customersListContainer}>
        <div className={styles.noResult}>
          <p>
            Currently, there is no customer data available for this job role,
            but we anticipate updates soon. We appreciate your patience and
            understanding.
          </p>
          <img src={thankyou} alt="" />
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
