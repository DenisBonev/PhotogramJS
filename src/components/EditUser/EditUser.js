import {useNavigate, useParams} from "react-router-dom";
import * as userService from "../../services/userService";
import styles from "./EditUser.module.css";
import {useContext, useEffect, useState} from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import * as validator from "./EditUserHelpers";
import {AuthContext} from "../../contexts/AuthContext";
import {isAuthorized} from "../../hoc/isAuthorized";

function EditUser() {
    const {userData: userContext} = useContext(AuthContext);
    const [userData, setUserData] = useState({});
    const [selectedFileSrc, setSelectedFileSrc] = useState(null);
    const {userId} = useParams();
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        repeatPassword: '',
        description: ''
    });
    const navigate = useNavigate();
    useEffect(() => {
        userService.getById(userId)
            .then(res => {
                setUserData(res);
                setSelectedFileSrc(`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/${res.profilePicPublicId}`);
            });
    }, [])

    const onImageLoad = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            setSelectedFileSrc(window.URL.createObjectURL(e.target.files[0]));
        }
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        for (let error in errors) {
            if (!error) {
                return;
            }
        }
        let editData = Object.fromEntries(new FormData(e.currentTarget));
        if (editData.password !== editData['repeat-password']) {
            setErrors({...errors, repeatPassword: "Passwords don't match!"});
            return;
        }
        delete editData['repeat-password'];
        userService.editUser(editData, userData.objectId, userContext.userToken)
            .then(() => {
                navigate(`/profile/${userId}`);
            });
    }

    return (

        <section className={styles.formWrapper}>
            <form className={styles.loginForm} method="POST" onSubmit={onSubmitHandler}>
                <h2>Edit Profile</h2>
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
                            <input className={styles.formInput} type="text" name="firstName" id="firstName"
                                   onBlur={(e) => validator.validateInput(e, errors, setErrors)}
                                   onSubmit={(e) => validator.validateInput(e, errors, setErrors)}
                                   defaultValue={userData.firstName}/>
                            {errors.firstName &&
                            <ErrorMessage message={errors.firstName}/>}
                        </li>
                        <li className={styles.inputLi}>
                            <label className="text-danger" htmlFor="lastName">Last Name</label>
                            <input className={styles.formInput} type="text" name="lastName" id="lastName"
                                   onBlur={(e) => validator.validateInput(e, errors, setErrors)}
                                   onSubmit={(e) => validator.validateInput(e, errors, setErrors)}
                                   defaultValue={userData.lastName}/>
                            {errors.lastName && <ErrorMessage message={errors.lastName}/>}
                        </li>
                    </section>
                    <section className={styles.formSection}>
                        <li className={styles.inputLi}>
                            <label className="text-danger" htmlFor="email">Email</label>
                            <input className={styles.formInput} type="email" name="email" id="email"
                                   onBlur={(e) => validator.validateEmail(e, errors, setErrors)}
                                   onSubmit={(e) => validator.validateEmail(e, errors, setErrors)}
                                   defaultValue={userData.email}/>
                            {errors.email && <ErrorMessage message={errors.email}/>}
                        </li>
                        <li className={styles.inputLi}>
                            <label className="text-danger" htmlFor="username">Username</label>
                            <input className={styles.formInput} type="text" name="username" id="username"
                                   onBlur={(e) => validator.validateUsername(e, errors, setErrors)}
                                   onSubmit={(e) => validator.validateUsername(e, errors, setErrors)}
                                   defaultValue={userData.username}/>
                            {errors.username && <ErrorMessage message={errors.username}/>}
                        </li>
                    </section>
                    <section className={styles.formSection}>
                        <li className={styles.inputLi}>
                            <label className="text-danger" htmlFor="=password">New Password</label>
                            <input className={styles.formInput} type="password" name="password" id="password"
                                   onBlur={(e) => validator.validatePassword(e, errors, setErrors)}
                                   onSubmit={(e) => validator.validatePassword(e, errors, setErrors)}/>
                            {errors.password && <ErrorMessage message={errors.password}/>}
                        </li>
                        <li className={styles.inputLi}>
                            <label className="text-danger" htmlFor="repeat-password">Repeat Password</label>
                            <input className={styles.formInput} type="password" name="repeat-password"
                                   id="repeat-password"/>
                            {errors.repeatPassword && <ErrorMessage message={errors.repeatPassword}/>}
                        </li>
                    </section>
                    <section className={styles.formSection}>
                        <li className={styles.inputLi}>
                            <label htmlFor="description" className="text-danger">Description*</label>
                            <textarea className={styles.formTextArea} id="description" name="description"
                                      placeholder="Tell people something about you..."
                                      onChange={(e) => validator.validateTextArea(e, errors, setErrors)}
                                      onSubmit={(e) => validator.validateTextArea(e, errors, setErrors)}
                                      defaultValue={userData.description}/>
                            {errors.description &&
                            <ErrorMessage message={errors.description}/>}
                        </li>
                    </section>
                    <section className={styles.formSection}>
                        <li className={styles.inputLi}>
                            <button className={styles.formSubmitBtn}>Register</button>
                        </li>
                    </section>
                </ul>
            </form>
        </section>
    );
}

export default isAuthorized(EditUser);