import styles from "./AddPost.module.css";
import {useContext, useState} from "react";
import * as imageService from "../../services/imageService";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext";
import * as validator from "./AddPostHelpers";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import {isAuthorized} from "../../hoc/isAuthorized";

function AddPost() {
    const {userData} = useContext(AuthContext);
    const [selectedFileSrc, setSelectedFileSrc] = useState(null);
    const [errors, setErrors] = useState({
        title: '',
        description: ''
    });
    const navigate = useNavigate();

    const onImageLoad = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            setSelectedFileSrc(window.URL.createObjectURL(e.target.files[0]));
        } else {
            setSelectedFileSrc(null);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        for (let error in errors) {
            if (!error) {
                return;
            }
        }
        const formData = Object.fromEntries(new FormData(e.currentTarget));
        imageService.uploadImagePost(formData, userData['userToken'])
            .then(() => {
                navigate('/');
            })
            .catch(err => {
                console.log(err);
            });
    }
    return (
        <section className={styles.formWrapper}>
            <form className={styles.loginForm} method="POST" onSubmit={onSubmit}>
                <h2>Post</h2>
                <ul className={styles.inputList}>
                    <li className={styles.inputLi}>
                        {selectedFileSrc &&
                        <img src={selectedFileSrc} className={styles.loadedImage} alt="Your image"/>}
                        <label className={styles.fileLabel} htmlFor="image">
                            {selectedFileSrc
                                ? "Change Selected Image"
                                : "Upload Image"
                            }</label>
                        <input className={styles.formFileInput} type="file" accept="image/png, image/jpeg" name="image"
                               id="image" onChange={onImageLoad}/>
                    </li>
                    <li className={styles.inputLi}>
                        <label className="text-danger" htmlFor="title">Title</label>
                        <input className={styles.formInput} type="text" name="title" id="title"
                               onBlur={(e) => validator.validateInput(e, errors, setErrors)}/>
                        {errors.title && <ErrorMessage message={errors.title}/>}
                    </li>
                    <li className={styles.inputLi}>
                        <label className="text-danger" htmlFor="description">Caption</label>
                        <textarea className={styles.formTextArea} name="description" id="description"
                                  onChange={(e) => validator.validateTextArea(e, errors, setErrors)}/>
                        {errors.description && <ErrorMessage message={errors.description}/>}
                    </li>
                    <li className={styles.inputLi}>
                        <button className={styles.formSubmitBtn}>Post</button>
                    </li>
                </ul>
            </form>
        </section>
    )
}

export default isAuthorized(AddPost);