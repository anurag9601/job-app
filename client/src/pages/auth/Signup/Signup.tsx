import React, { FormEvent } from "react";
import styles from "./Signup.module.css";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dispatchType } from "../../../redux/store";
import { setUser } from "../../../redux/slice/user.slice";
import Loading from "../../../components/Loading/Loading";

const Signup = () => {
  const navigate = useNavigate();

  const dispatch: dispatchType = useDispatch();

  const fullNameRef = React.useRef<HTMLInputElement | null>(null);
  const emailRef = React.useRef<HTMLInputElement | null>(null);
  const passwordRef = React.useRef<HTMLInputElement | null>(null);
  const confirmPasswordRef = React.useRef<HTMLInputElement | null>(null);

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

  const handleUserManualSignup = async (e: FormEvent) => {
    e.preventDefault();

    if (passwordRef.current!.value.length < 6) {
      alert("Length of password must be 6 or more than 6.");
      return;
    }

    if (passwordRef.current!.value !== confirmPasswordRef.current!.value) {
      alert("Passwords are not matched.");
      return;
    }

    setLoading(true);

    const request = await fetch("/api/user/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: fullNameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      }),
    });

    const response = request.json();

    response.then((e) => {
      if (e.success === true) {
        dispatch(setUser(e.data));
        setLoading(false);
        navigate("/");
      } else {
        setLoading(false);
        console.log(e);
      }
    });
  };

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.signUpFormContainer}>
        <h3>Sign up</h3>
        <button onClick={() => login()} className={styles.googleSignupBtn}>
          <FaGoogle className={styles.googleIcon} />
          Sign up with Google
        </button>
        <p>or</p>
        <form
          className={styles.manualSignupForm}
          onSubmit={handleUserManualSignup}
        >
          <input
            type="text"
            placeholder="full name"
            ref={fullNameRef}
            required
          />
          <input type="email" placeholder="email" ref={emailRef} required />
          <input
            type="password"
            placeholder="password"
            ref={passwordRef}
            required
          />
          <input
            type="password"
            placeholder="confirm password"
            ref={confirmPasswordRef}
            required
          />
          <button type="submit" disabled={loading}>
            {loading === true ? <Loading /> : "Sign up"}
          </button>
        </form>
        <span onClick={() => navigate("/sign-in")}>
          Already have an account?
        </span>
      </div>
    </div>
  );
};

export default Signup;
