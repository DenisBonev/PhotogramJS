import styles from "./AddPost.module.css";
import {useState} from "react";
import * as imageService from "../../services/imageService";
import { useNavigate } from "react-router-dom";

export default function AddPost() {
    const [selectedFileSrc, setSelectedFileSrc] = useState(null);
    const navigate = useNavigate();

    const onImageLoad = (e) => {
        e.preventDefault();
        setSelectedFileSrc(window.URL.createObjectURL(e.target.files[0]));
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.currentTarget));
        imageService.uploadImagePost(formData)
            .then(()=>{
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
                        <input className={styles.formInput} type="text" name="title" id="title"/>
                    </li>
                    <li className={styles.inputLi}>
                        <label className="text-danger" htmlFor="description">Caption</label>
                        <textarea className={styles.formTextArea} name="description" id="description"/>
                    </li>
                    <li className={styles.inputLi}>
                        <button className={styles.formSubmitBtn}>Post</button>
                    </li>
                </ul>
            </form>
        </section>
    )
}