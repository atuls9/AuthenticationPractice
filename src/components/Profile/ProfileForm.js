import classes from "./ProfileForm.module.css";
import { useHistory } from "react-router-dom";
import React, { useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  const redirect = useHistory();
  const authCtx = useContext(AuthContext);
  const passwordRef = useRef("");
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredNewPassword = passwordRef.current.value;
    console.log(enteredNewPassword);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCX_lwO9B2S5q_WH3yCDXjFZHeOHUqlMMk",

      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        redirect.replace("/");
        console.log(res, authCtx.token, " data sent");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={passwordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
