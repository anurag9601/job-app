import React from "react";
import styles from "./Signin.module.css";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Signin = () => {
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
    <div className={styles.signInContainer}>
      <div className={styles.signInFormContainer}>
        <h3>Sign in</h3>
        <button onClick={() => login()} className={styles.googleSigninBtn}>
          <FaGoogle className={styles.googleIcon} />
          Sign in with Google
        </button>
        <p>or</p>
        <form className={styles.manualSigninForm}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button type="submit">Sign in</button>
        </form>
        <span onClick={() => navigate("/sign-up")}>Don't have an account?</span>
      </div>
    </div>
  );
};

export default Signin;
