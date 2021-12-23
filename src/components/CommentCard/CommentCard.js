import {useEffect, useState} from "react";
import styles from "./CommentCard.module.css"
import * as userService from "../../services/userService"
import {Image, Transformation} from "cloudinary-react";
import {Link} from "react-router-dom";

export default function CommentCard({comment}) {

    const [user, setUser] = useState({
        profilePicPublicId: '',
        objectId: '',
        username: ''
    });

    useEffect(() => {
        userService.getCommentatorById(comment.ownerId)
            .then(res=>setUser(res));
    }, [])

    return (
        <article className={styles.commentCard}>
            <section className={styles.commentImgWrapper}>
                <Image cloudName={process.env.REACT_APP_CLOUDINARY_CLOUDNAME} publicId={user.profilePicPublicId}>
                    <Transformation gravity="face" height="700" width="700" crop="crop"/>
                    <Transformation radius="max"/>
                    <Transformation crop="scale" width="70"/>
                </Image>
            </section>
            <section>
                <Link to={user.objectId}>{user.username}</Link>
                <p>{comment.comment}</p>
            </section>
        </article>
    );
}