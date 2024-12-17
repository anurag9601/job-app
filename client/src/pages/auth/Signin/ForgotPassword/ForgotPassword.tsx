import React, { FormEvent } from "react";
import styles from "./ForgotPassword.module.css";
import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Loading from "../../../../components/Loading/Loading";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const emailRef = React.useRef<HTMLInputElement | null>(null);

  const [emailSend, setEmailSend] = React.useState<boolean>(false);

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSendUserNewPasswordMail = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const request = await fetch("/api/user/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailRef.current?.value,
      }),
    });

    const response = request.json();

    response.then((e) => {
      if (e.success === true) {
        setEmailSend(true);
        setLoading(false);
      } else {
        console.log(e);
      }
    });
  };

  return (
    <div className={styles.forgotPasswordContainer}>
      {emailSend == false ? (
        <div className={styles.forgotPasswordFormContainer}>
          <h3>Forgot password</h3>
          <span className={styles.impNote}>
            Please enter your valid email address carefully, as we will send a
            password reset link to this email. Make sure the email you provide
            is correct to regain access to your account
          </span>
          <form
            className={styles.forgotPasswordForm}
            onSubmit={handleSendUserNewPasswordMail}
          >
            <input
              type="email"
              placeholder="enter your email"
              ref={emailRef}
              required
            />
            <button type="submit" disabled={loading}>
              {loading === true ? <Loading /> : "Confirm"}
            </button>
          </form>
        </div>
      ) : (
        <div className={styles.successMessageContainer}>
          <FaCircleCheck className={styles.checkIcon} />
          <h4>Mail sent successfully.</h4>
          <span onClick={() => navigate("/sign-in")}>Back to signin</span>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
