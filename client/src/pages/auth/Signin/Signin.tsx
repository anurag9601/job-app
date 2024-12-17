import React, { FormEvent } from "react";
import styles from "./Signin.module.css";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dispatchType } from "../../../redux/store";
import { setUser } from "../../../redux/slice/user.slice";
import Loading from "../../../components/Loading/Loading";

const Signin = () => {
  const navigate = useNavigate();

  const dispatch: dispatchType = useDispatch();

  const emailRef = React.useRef<HTMLInputElement | null>(null);
  const passwordRef = React.useRef<HTMLInputElement | null>(null);

  const [loading, setLoading] = React.useState<boolean>(false);

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

  async function handleUserManualSignin(e: FormEvent) {
    e.preventDefault();

    setLoading(true);

    const request = await fetch("/api/user/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      }),
    });

    const response = request.json();

    response.then((e) => {
      if (e.success) {
        setLoading(false);
        dispatch(setUser(e.data));
        navigate("/");
      } else {
        setLoading(false);
        console.log(e);
      }
    });
  }

  return (
    <div className={styles.signInContainer}>
      <div className={styles.signInFormContainer}>
        <h3>Sign in</h3>
        <button onClick={() => login()} className={styles.googleSigninBtn}>
          <FaGoogle className={styles.googleIcon} />
          Sign in with Google
        </button>
        <p>or</p>
        <form
          className={styles.manualSigninForm}
          onSubmit={handleUserManualSignin}
        >
          <input type="email" placeholder="email" ref={emailRef} required />
          <input
            type="password"
            placeholder="password"
            ref={passwordRef}
            required
          />
          <span
            className={styles.forgotPasswordBtn}
            onClick={() => navigate("/forgot-password")}
          >
            Forgot password?
          </span>
          <button type="submit" disabled={loading}>
            {loading === true ? <Loading /> : "Sign in"}
          </button>
        </form>
        <span onClick={() => navigate("/sign-up")}>Don't have an account?</span>
      </div>
    </div>
  );
};

export default Signin;
