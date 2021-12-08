import {useEffect, useState} from "react";
import styles from "./CommentCard.module.css"

export default function CommentCard(){
    const [comment,setComment] = useState({
        profilePicUrl:"assets/img/av.png",
        username:"denisB",
        comment:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, maiores!"
    });

    return(
        <article className={styles.commentCard}>
            <section className={styles.commentImgWrapper}>
                <img src={comment.profilePicUrl} alt=""/>
            </section>
            <section>
                <h4>{comment.username}</h4>
                <p>{comment.comment}</p>
            </section>
        </article>
    );
}