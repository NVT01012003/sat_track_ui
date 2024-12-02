import { useState } from "react";
import "../assets/styles/login.scss";
import Google from "../assets/imgs/google-logo.png";
import Facebook from "../assets/imgs/facebook-logo.png";

function Login() {
    const [signupActive, setSignupActive] = useState(null);

    return (
        <div className="login-page page">
            <div className="login-wrapper">
                <div className="login-form-background"></div>
                <div
                    className={
                        signupActive
                            ? "login-transform login-form"
                            : "login-form"
                    }
                >
                    <h2 className="form-header">Login</h2>
                    <div className="form-wrapper">
                        <div className="form">
                            <form className="form-login">
                                <div className="form-email-password">
                                    <div className="form-input">
                                        <span>User name</span>
                                        <input
                                            type="text"
                                            placeholder="Enter your user name..."
                                        ></input>
                                    </div>
                                    <div className="form-input">
                                        <span>Password</span>
                                        <input
                                            type="password"
                                            placeholder="Enter password..."
                                        ></input>
                                    </div>
                                    <div className="forgot-wrapper">
                                        <span className="forgot-btn">
                                            Forgot password?
                                        </span>
                                    </div>
                                </div>
                                <button className="submit-btn">LOGIN</button>
                            </form>
                            <span className="">Or login using</span>
                            <div className="oauth">
                                <div className="oauth-google-btn oauth-btn">
                                    <img src={Google} alt="google-logo" />
                                    <span>Google</span>
                                </div>
                                <div className="oauth-facebook-btn oauth-btn">
                                    <img src={Facebook} alt="facebook-logo" />
                                    <span>Facebook</span>
                                </div>
                            </div>
                            <div className="signup-link">
                                <span className="">
                                    If you don't have an account!
                                </span>{" "}
                                <span
                                    className="signup-btn"
                                    onClick={() => setSignupActive(true)}
                                >
                                    Sign up
                                </span>
                                .
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={
                        signupActive
                            ? "signup-form signup-active"
                            : "signup-form"
                    }
                >
                    <h2 className="form-header">Sign up</h2>
                    <div className="form-wrapper">
                        <div className="form">
                            <form className="form-login">
                                <div className="form-email-password">
                                    <div className="form-input">
                                        <span>User name</span>
                                        <input
                                            type="text"
                                            placeholder="Enter your user name..."
                                        ></input>
                                    </div>
                                    <div className="form-input">
                                        <span>Email</span>
                                        <input
                                            type="email"
                                            placeholder="Enter your email..."
                                        ></input>
                                    </div>
                                    <div className="form-input">
                                        <span>Password</span>
                                        <input
                                            type="password"
                                            placeholder="Enter password..."
                                        ></input>
                                    </div>
                                    <div className="form-input">
                                        <span>Confirm password</span>
                                        <input
                                            type="password"
                                            placeholder="Enter password..."
                                        ></input>
                                    </div>
                                </div>
                                <button className="submit-btn">SIGN UP</button>
                            </form>

                            <div className="signup-link">
                                <span className="">
                                    If you have an account!
                                </span>{" "}
                                <span
                                    className="signup-btn"
                                    onClick={() => setSignupActive(false)}
                                >
                                    Login now
                                </span>
                                .
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
