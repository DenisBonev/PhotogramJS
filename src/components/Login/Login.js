import styles from "./Login.module.css";
import * as userService from "../../services/userService"
import { useNavigate } from "react-router-dom";

export default function Login({onLogin:callback}){

    const navigate = useNavigate();

    const onLogin = (e) =>{
        e.preventDefault();
        let {username,password} = Object.fromEntries(new FormData(e.currentTarget));
        userService.login({username,password})
            .then(r=>{
                callback({
                    username:r.username,
                    'user-token':r['user-token'],
                    objectId:r.objectId
                })
                navigate('/');
            })
            .catch(ex=>{
                console.log(ex.message);
            });
    }

    return(
        <section className={styles.formWrapper}>
            <form className={styles.loginForm} method="POST" onSubmit={onLogin}>
                <h2>Login</h2>
                <ul className={styles.inputList}>
                    <li className={styles.inputLi}>
                        <label className="text-danger" htmlFor="username">Username</label>
                        <input className={styles.formInput} type="text" name="username" id="username"/>
                    </li>
                    <li className={styles.inputLi}>
                        <label className="text-danger" htmlFor="password">Password</label>
                        <input className={styles.formInput} type="password" name="password" id="password"/>
                    </li>
                    <li className={styles.inputLi}>
                        <button className={styles.formSubmitBtn}>Login</button>
                    </li>
                </ul>
            </form>
        </section>
    );
}