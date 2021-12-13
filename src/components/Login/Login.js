import styles from "./Login.module.css";

export default function Login(){
    return(
        <section className={styles.formWrapper}>
            <form className={styles.loginForm} action="#">
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