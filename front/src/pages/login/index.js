import React from "react";
import './styles.css';
import { Link } from "react-router-dom";

function login() {
    return (
        <>
            <h1>LOGIN</h1>
            <div class="loginbox">

                <form>
                    <input type="text" name="" placeholder="Email Address" />
                    <input type="password" name="" placeholder="Password" />
                    <input type="submit" name="" value="Continue" /> <br />
                    <a href="#">Forgot your password?</a> <br />
                    <a href="#">Don't have an account?</a>
                    <Link to="/register">    Register now</Link>
                </form>
            </div>
        </>
    )

}
export default login
