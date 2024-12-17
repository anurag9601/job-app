import React, { FormEvent, useEffect } from "react";
import styles from "./NewPassword.module.css";
import Loading from "../../../../components/Loading/Loading";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const NewPassword = () => {
  const navigate = useNavigate();

  const newPasswordRef = React.useRef<HTMLInputElement | null>(null);
  const confirmNewPasswordRef = React.useRef<HTMLInputElement | null>(null);

  const [newPasswordVisibility, setNewPasswordVisibility] =
    React.useState<boolean>(false);

  const [confirmNewPasswordVisiblity, setConfirmNewPasswordVisiblity] =
    React.useState<boolean>(false);

  const [loading, setLoading] = React.useState<boolean>(false);

  const { userId } = useParams();

  async function handleCheckValidUserLink() {
    const request = await fetch(`/api/user/valid-link/${userId}`);

    const response = request.json();

    response.then((e) => {
      if (e.error) {
        navigate("*");
      }
    });
  }

  function handleNewPasswordVisibilityClick() {
    if (!newPasswordRef.current) return;

    setNewPasswordVisibility((prev) => !prev);
    if (newPasswordRef.current.type === "password") {
      newPasswordRef.current.type = "text";
    } else {
      newPasswordRef.current.type = "password";
    }
  }

  function handleConfirmNewPasswordVisibilityClick() {
    if (!confirmNewPasswordRef.current) return;

    setConfirmNewPasswordVisiblity((prev) => !prev);
    if (confirmNewPasswordRef.current.type === "password") {
      confirmNewPasswordRef.current.type = "text";
    } else {
      confirmNewPasswordRef.current.type = "password";
    }
  }

  async function handleSetNewPassword(e: FormEvent) {
    e.preventDefault();

    if (!newPasswordRef.current || !confirmNewPasswordRef.current) return;

    if (newPasswordRef.current.value.length < 6) {
      alert("Lenght of password must be 6 or more than 6");
      return;
    }

    if (newPasswordRef.current.value !== confirmNewPasswordRef.current.value) {
      alert("Passwords are not matched.");
      return;
    }

    setLoading(true);

    const request = await fetch(`/api/user/new-password/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        password: newPasswordRef.current.value,
      }),
    });

    const response = request.json();

    response.then((e) => {
      if (e.success === true) {
        setLoading(false);
        navigate("/sign-in");
      } else {
        console.log(e);
        setLoading(false);
      }
    });
  }

  useEffect(() => {
    handleCheckValidUserLink();
  }, []);

  return (
    <div className={styles.newPasswordContainer}>
      <div className={styles.newPasswordFormContainer}>
        <h3>New password</h3>
        <span className={styles.impNote}>
          Important: Please ensure you remember this password, as it will serve
          as your main login password. You’ll use it to access your account in
          the future.
        </span>
        <form
          className={styles.newPasswordForm}
          onSubmit={handleSetNewPassword}
        >
          <div className={styles.newPasswordInput}>
            <input
              type="password"
              placeholder="new password"
              ref={newPasswordRef}
              required
            />
            {newPasswordVisibility === true ? (
              <FaEye
                className={styles.eyeIcon}
                onClick={handleNewPasswordVisibilityClick}
              />
            ) : (
              <FaEyeSlash
                className={styles.eyeIcon}
                onClick={handleNewPasswordVisibilityClick}
              />
            )}
          </div>
          <div className={styles.confirmNewPasswordContainer}>
            <input
              type="password"
              placeholder="confirm new password"
              ref={confirmNewPasswordRef}
              required
            />
            {confirmNewPasswordVisiblity === true ? (
              <FaEye
                className={styles.eyeIcon}
                onClick={handleConfirmNewPasswordVisibilityClick}
              />
            ) : (
              <FaEyeSlash
                className={styles.eyeIcon}
                onClick={handleConfirmNewPasswordVisibilityClick}
              />
            )}
          </div>
          <button type="submit" disabled={loading}>
            {loading == true ? <Loading /> : "Confirm"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
