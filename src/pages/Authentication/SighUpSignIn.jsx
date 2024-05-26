import React, { useContext, useState } from "react";
import authStyle from "./sighUpSignIn.module.css";
import { Link,useNavigate ,useLocation, redirect} from "react-router-dom";
import amazonLogo from "../../assets/images/amazonLogoAuthPage.png";
import { auth } from "../../Utility/firebase.jsx";
import { ClipLoader } from "react-spinners";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { Type } from "../../Utility/Action.type.jsx";
import { DataContext } from "../../App.jsx";

const SighUpSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ logIn: false, signUp: false });
  const navigate=useNavigate()
  const [{ user }, dispatch] = useContext(DataContext);
  // console.log(user);
  const {state} = useLocation()
  // console.log(state)
  const signInSignUpHandler = async (e) => {
    e.preventDefault();
    // console.log(e.target.name);
    if (e.target.name === "logIn") {
      setLoading({ ...loading, logIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, logIn: false });
          navigate(state?.redirect||'/')
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, logIn: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate(state?.redirect||'/')
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };
  return (
    <section className={authStyle.sighUpSignInConatiner}>
      <Link to="/">
        <img src={amazonLogo} alt="" width="" />
      </Link>
      <div className={authStyle.formContainer}>
        {state?.msg && <small>{ state?.msg}</small>}
        <h1>Sign in</h1>
        <form action="">
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              id="email"
              autoComplete="false"
            />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              id="password"
              autoComplete="false"
            />
          </div>
          <button
            type="submit"
            name="logIn"
            onClick={signInSignUpHandler}
            className={authStyle.signInBtn}
          >
            {loading.logIn ? (
              <ClipLoader color="#36d7b7" size={15} />
            ) : (
              "sign in"
            )}
          </button>
        </form>
        <p>
          by signing in you agree to the AMAZON FAKE CLONE Condition of Use &
          Sale. Please see our Privacy Notice ,our Cookies Notice and our
          Interest-Based ads Notice.{" "}
        </p>
        <button
          type="submit"
          name="sighUp"
          onClick={signInSignUpHandler}
          className={authStyle.signUpBtn}
        >
          {loading.signUp ? (
            <ClipLoader color="#36d7b7" size={15} />
          ) : (
            "Create New Account"
          )}
        </button>
        {error?(<small>{error.split('/')[1].split(')')[0]}</small>):"" }
      </div>
    </section>
  );
};

export default SighUpSignIn;
