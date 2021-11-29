import React from "react";
import './styles.css';

function login() {
    return (
        <>
            <h1>LOGIN</h1>
            <div class="loginbox">

                <form>
                    <p>Username</p>
                    <input type="text" name="" placeholder="EmailAdress" />
                   
                    <input type="password" name="" placeholder="Password" />
                    <input type="submit" name="" value="Continue" /> <br />
                    <a href="#">Forgot your password?</a> <br />
                    <a href="#">Don't have an account? Register now</a>
                </form>
            </div>
        </>
    )

}
export default login
