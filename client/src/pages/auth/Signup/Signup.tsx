import React from "react";
import styles from "./Signup.module.css";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.signUpFormContainer}>
        <h3>Sign up</h3>
        <button onClick={() => login()} className={styles.googleSignupBtn}>
          <FaGoogle className={styles.googleIcon} />
          Sign up with Google
        </button>
        <p>or</p>
        <form className={styles.manualSignupForm}>
          <input type="text" placeholder="full name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input type="password" placeholder="confirm password" />
          <button type="submit">Sign up</button>
        </form>
        <span onClick={() => navigate("/sign-in")}>Already have an account?</span>
      </div>
    </div>
  );
};

export default Signup;
