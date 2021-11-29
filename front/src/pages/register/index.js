import React from "react";
import './styles.css';
import { Link } from "react-router-dom";

function login() {
    return (
        <>
            <h1>REGISTER</h1>
            <div class="loginbox">

                <form>
                    <input type="text" name="" placeholder="First Name" />
                    <input type="text" name="" placeholder="Last Name" />
                    <input type="text" name="" placeholder="Email" />
                    <input type="password" name="" placeholder="Password" />
                    <input type="submit" name="" value="Create Account" /> <br />
                    <a href="#">Already have an account?</a> <br />
                    <Link to="/login">  Sign in here</Link>
                </form>
            </div>
        </>
    )

}
export default login
