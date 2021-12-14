import { useNavigate } from "react-router-dom";
import * as userService from "../../services/userService";
import styles from "./Register.module.css";

export default function Register(){

    const navigate = useNavigate();

    const onSubmitHandler = (e) =>{
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        if (formData.get("password") === formData.get("repeat-password")){
            let userData = Object.fromEntries(formData);
            delete userData['repeat-password'];
            userService.registerUser(userData).then(r=>console.log(r));

            navigate("/");
        }
    }


    return(

        <section className={styles.formWrapper}>
            <form className={styles.loginForm} method="POST" onSubmit={onSubmitHandler}>
                <h2>Register</h2>
                <ul className={styles.inputList}>
                    <li className={styles.inputLi}>
                        <label className="text-danger" htmlFor="username">Username</label>
                        <input className={styles.formInput} type="text" name="username" id="username"/>
                    </li>
                    <li className={styles.inputLi}>
                        <label className="text-danger" htmlFor="name">Name</label>
                        <input className={styles.formInput} type="text" name="name" id="name"/>
                    </li>
                    <li className={styles.inputLi}>
                        <label className="text-danger" htmlFor="email">Email</label>
                        <input className={styles.formInput} type="email" name="email" id="email"/>
                    </li>
                    <li className={styles.inputLi}>
                        <label className="text-danger" htmlFor="password">Password</label>
                        <input className={styles.formInput} type="password" name="password" id="password"/>
                    </li>
                    <li className={styles.inputLi}>
                        <label className="text-danger" htmlFor="repeat-password">Repeat Password</label>
                        <input className={styles.formInput} type="password" name="repeat-password" id="repeat-password"/>
                        <p className={styles.alertMessage}>Password doesn't match!</p>
                    </li>
                    <li className={styles.inputLi}>
                        <button className={styles.formSubmitBtn}>Register</button>
                    </li>
                </ul>
            </form>
        </section>
    );
}