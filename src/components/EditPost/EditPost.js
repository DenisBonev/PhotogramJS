import styles from "./EditPost.module.css";
import {useContext, useEffect, useState} from "react";
import * as imageService from "../../services/imageService";
import {useNavigate, useParams} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext";
import * as validator from "./EditPostHelpers";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import {isAuthorized} from "../../hoc/isAuthorized";

function EditPost() {
    const {userData} = useContext(AuthContext);
    const [selectedFileSrc, setSelectedFileSrc] = useState(null);
    const [errors, setErrors] = useState({
        title: '',
        description: ''
    });
    const [postData, setPostData] = useState({});
    const navigate = useNavigate();
    const {postId} = useParams();

    useEffect(() => {
        imageService.getById(postId)
            .then(res => {
                setPostData(res);
                setSelectedFileSrc(`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/${res.publicId}`);
            });
    }, [])


    const onSubmit = (e) => {
        e.preventDefault();
        for (let error in errors) {
            if (error) {
                return;
            }
        }
        const formData = Object.fromEntries(new FormData(e.currentTarget));
        imageService.editImageData(formData, userData.userToken,postId)
            .then(() => {
                navigate(`/details/${postId}`);
            })
            .catch(err => console.log(err));
    }
    return (
        <section className={styles.formWrapper}>
            <form className={styles.loginForm} method="POST" onSubmit={onSubmit}>
                <h2>Post</h2>
                <ul className={styles.inputList}>
                    <li className={styles.inputLi}>
                        {selectedFileSrc &&
                        <img src={selectedFileSrc} className={styles.loadedImage} alt="Your image"/>}
                    </li>
                    <li className={styles.inputLi}>
                        <label className="text-danger" htmlFor="title">Title</label>
                        <input className={styles.formInput} type="text" name="title" id="title"
                               defaultValue={postData.title}
                               onBlur={(e) => validator.validateInput(e, errors, setErrors)}/>
                        {errors.title && <ErrorMessage message={errors.title}/>}
                    </li>
                    <li className={styles.inputLi}>
                        <label className="text-danger" htmlFor="description">Caption</label>
                        <textarea className={styles.formTextArea} name="description" id="description"
                                  defaultValue={postData.description}
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

export default isAuthorized(EditPost);