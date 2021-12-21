import {Image, Transformation} from "cloudinary-react";
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";

import styles from "../CommentSection/CommentSection.module.css";
import CommentCard from "../CommentCard/CommentCard";
import {AuthContext} from "../../contexts/AuthContext";
import * as commentService from "../../services/commentService"

export default function CommentSection({postId}) {

    const {userData} = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [commentsPosted, setCommentsPosted] = useState(0);
    useEffect(() => {
        commentService.getCommentsByPostId(postId)
            .then(res => setComments(res));
    }, [commentsPosted]);

    const onCommentPost = (e) => {
        e.preventDefault();
        const {comment} = Object.fromEntries(new FormData(e.currentTarget));
        commentService.postComment(postId, userData.userToken, comment)
            .then(() => setCommentsPosted(commentsPosted + 1));
        e.currentTarget.reset();
    }
    const commentSection = <section className={styles.commentSection}>
        {comments.map(x => <CommentCard key={x.objectId} comment={x}/>)}
    </section>;
    return (
        <>
            <section className={styles.commentSectionWrapper}>
                <h4>Comments:</h4>
                {comments.length > 0
                ? commentSection
                :<h6 className={styles.noCommentLabel}>Be the first one to comment this amazing picture!</h6>}
            </section>
            {userData.userId &&
            <section>
                <form method="POST" onSubmit={onCommentPost}>
                    <article className={styles.commentCard}>
                        <section>
                            <Image publicId={userData.profilePicPublicId}
                                   cloudName={process.env.REACT_APP_CLOUDINARY_CLOUDNAME}>
                                <Transformation gravity="face" height="400" width="400" crop="crop"/>
                                <Transformation/>
                                <Transformation crop="scale" width="70"/>
                            </Image>
                        </section>
                        <section className={styles.commentInputContent}>
                            <h4><Link to={userData.userId}>{userData.username}</Link></h4>
                            <div className={styles.commentInputWrapper}>
                                <input type="text" name="comment" id="comment" placeholder="Add your comment..."/>
                                <button type="submit" className="btn-danger">Post</button>
                            </div>
                        </section>
                    </article>
                </form>
            </section>}
        </>
    )
}