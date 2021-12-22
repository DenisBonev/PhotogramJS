import {Link, useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";

import styles from "./LikeSection.module.css";
import * as imageService from "../../services/imageService";
import {AuthContext} from "../../contexts/AuthContext";

export default function LikeSection({postOwnerId}) {

    const navigate = useNavigate();
    const {userData} = useContext(AuthContext);
    const {postId} = useParams();
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        imageService.getIfUserLikedPost(postId, userData.userId).then(res => setLiked(res.length > 0));
    }, []);

    const onLike = (e) => {
        e.preventDefault();
        if (!userData.userId) {
            navigate("/login");
        }
        if (!liked) {
            imageService.likePost(postId, userData.userId);
        } else {
            imageService.unlikePost(postId, userData.userId);
        }
        setLiked(!liked);
    }

    const onEdit = (e) => {
        e.preventDefault();
    }
    const onDelete = (e) => {
        e.preventDefault();
        imageService.deletePostById(postId, userData.userToken)
            .then(() => navigate("/"))
    }

    return (
        <section className={styles.likeSection}>
            {liked
                ? <Link className={styles.likeButton} onClick={onLike} to={`/post/${postId}/like`}><i
                    className="fas fa-heart">10</i></Link>
                : <Link className={styles.likeButton} onClick={onLike} to="#"><i className="far fa-heart"></i></Link>
                //TODO: Display likes count
            }
            {postOwnerId === userData.userId &&
            <>
                <Link className={styles.editButton} to={`/post/${postId}/edit`} onClick={onEdit}><i
                    className="far fa-edit"></i></Link>
                <Link className={styles.deleteButton} to={`/post/${postId}/delete`} onClick={onDelete}><i
                    className="far fa-trash-alt"></i></Link>
            </>}
        </section>
    )
}