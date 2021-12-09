import styles from "./Register.module.css";

export default function Register(){
    return(

        <section className={styles.formWrapper}>
            <form className={styles.loginForm} action="#">
                <h2>Register</h2>
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
                        <label className="text-danger" htmlFor="repeat-password">Repeat Password</label>
                        <input className={styles.formInput} type="password" name="repeat-password" id="repeat-password"/>
                    </li>
                    <li className={styles.inputLi}>
                        <button className={styles.formSubmitBtn}>Register</button>
                    </li>
                </ul>
            </form>
        </section>
    );
}