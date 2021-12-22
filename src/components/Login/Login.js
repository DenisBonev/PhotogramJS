import styles from "./Login.module.css";
import * as userService from "../../services/userService"
import { useNavigate } from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../../contexts/AuthContext";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function Login(){

    const {login} = useContext(AuthContext);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const onLogin = (e) =>{
        e.preventDefault();
        let {username,password} = Object.fromEntries(new FormData(e.currentTarget));
        userService.login({username,password})
            .then(res=>{
                login({
                    username:res.username,
                    userToken:res['user-token'],
                    userId:res.objectId,
                    profilePicPublicId:res.profilePicPublicId
                });
                navigate('/');
            })
            .catch(err=> setError(true));
    }

    return(
        <section className={styles.formWrapper}>
            <form className={styles.loginForm} method="POST" onSubmit={onLogin}>
                <h2>Login</h2>
                {error &&
                <ErrorMessage message="Invalid username or password"/>}
                <ul className={styles.inputList}>
                    <li className={styles.inputLi}>
                        <label className="text-danger" htmlFor="username">Username</label>
                        <input className={styles.formInput} type="text" name="username" id="username" required/>
                    </li>
                    <li className={styles.inputLi}>
                        <label className="text-danger" htmlFor="password">Password</label>
                        <input className={styles.formInput} type="password" name="password" id="password" required/>
                    </li>
                    <li className={styles.inputLi}>
                        <button className={styles.formSubmitBtn}>Login</button>
                    </li>
                </ul>
            </form>
        </section>
    );
}