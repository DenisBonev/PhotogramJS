import {useNavigate} from "react-router-dom";
import * as userService from "../../services/userService";
import styles from "./Register.module.css";
import {useState} from "react";

export default function Register() {

    const [selectedFileSrc, setSelectedFileSrc] = useState(null);
    const navigate = useNavigate();

    const onImageLoad = (e) => {
        e.preventDefault();
        setSelectedFileSrc(window.URL.createObjectURL(e.target.files[0]));
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        if (formData.get("password") === formData.get("repeat-password")) {
            let userData = Object.fromEntries(formData);
            delete userData['repeat-password'];
            userService.registerUser(userData);

            navigate("/");
        }
    }


    return (

        <section className={styles.formWrapper}>
            <form className={styles.loginForm} method="POST" onSubmit={onSubmitHandler}>
                <h2>Register</h2>
                <ul className={styles.inputList}>
                    <section className={styles.formSection}>
                        <li className={styles.inputLi}>
                            {selectedFileSrc &&
                            <div className={styles.loadedImageWrapper}>
                                <img src={selectedFileSrc} className={styles.loadedImage} alt="Your image"/>
                            </div>}
                            <label className={styles.fileLabel} htmlFor="image">
                                {selectedFileSrc
                                    ? "Change Selected Image"
                                    : "Upload Image"
                                }</label>
                            <input className={styles.formFileInput} type="file" accept="image/png, image/jpeg"
                                   name="image"
                                   id="image" onChange={onImageLoad}/>
                        </li>
                    </section>
                    <section className={styles.formSection}>
                        <li className={styles.inputLi}>
                            <label className="text-danger" htmlFor="firstName">First Name</label>
                            <input className={styles.formInput} type="text" name="firstName" id="firstName"/>
                        </li>
                        <li className={styles.inputLi}>
                            <label className="text-danger" htmlFor="lastName">Last Name</label>
                            <input className={styles.formInput} type="text" name="lastName" id="lastName"/>
                        </li>
                    </section>
                    <section className={styles.formSection}>
                        <li className={styles.inputLi}>
                            <label className="text-danger" htmlFor="email">Email</label>
                            <input className={styles.formInput} type="email" name="email" id="email"/>
                        </li>
                        <li className={styles.inputLi}>
                            <label className="text-danger" htmlFor="username">Username</label>
                            <input className={styles.formInput} type="text" name="username" id="username"/>
                        </li>
                    </section>
                    <section className={styles.formSection}>
                        <li className={styles.inputLi}>
                            <label className="text-danger" htmlFor="password">Password</label>
                            <input className={styles.formInput} type="password" name="password" id="password"/>
                        </li>
                        <li className={styles.inputLi}>
                            <label className="text-danger" htmlFor="repeat-password">Repeat Password</label>
                            <input className={styles.formInput} type="password" name="repeat-password"
                                   id="repeat-password"/>
                            <p className={styles.alertMessage}>Password doesn't match!</p>
                        </li>
                    </section>
                    <section className={styles.formSection}>
                        <li className={styles.inputLi}>
                            <label htmlFor="description" className="text-danger">Description</label>
                            <textarea className={styles.formTextArea} id="description" name="description" placeholder="Tell people something about you..."/>
                        </li>
                    </section><section className={styles.formSection}>
                        <li className={styles.inputLi}>
                            <button className={styles.formSubmitBtn}>Register</button>
                        </li>
                    </section>
                </ul>
            </form>
        </section>
    );
}