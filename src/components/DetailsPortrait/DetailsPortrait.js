import CommentCard from "../CommentCard/CommentCard";
import styles from "./DetailsPortrait.module.css";
import {useEffect,useState} from "react";

export default function DetailsPortrait(){
const [imageData,setImageData] = useState({
title:"Mount",
caption:"Mount Olimp! Greek's Highest Mount!",
imgUrl:"https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZmVtYWxlJTIwcG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80"
});

const [creator, setCreator] = useState({
username:"denisB",
profilePicUrl:"assets/img/av.png"
});

const [currUser,setCurrUser] = useState({
    profilePicUrl:"assets/img/av.png",
    username:"BonevDenis",
    liked:false
})


    return (
        <section className={styles.mainContainer}>
            <section className={styles.postContainer}>
                <article className={styles.imgWrapper}>
                    <img
                        className={styles.image}
                        src={imageData.imgUrl}
                        alt=""/>
                </article>
                <article className={styles.postText}>
                    <h1>{imageData.title}</h1>
                    <p>{imageData.caption}</p>
                    { currUser.liked
                        ?<a href="#" className={styles.likeButton}><i className="fas fa-heart"></i></a>
                        :<a href="#" className={styles.likeButton}><i className="far fa-heart"></i></a>
                    }
                    <section className={styles.creatorSection}>
                        <section className={styles.commentImgWrapper}>
                            <img src={creator.profilePicUrl} alt=""/>
                        </section>
                        <a href="#">{creator.username}</a>
                    </section>
                    <section className={styles.commentSection}>
                        <CommentCard/>
                        <CommentCard/>
                        <CommentCard/>
                        <CommentCard/>
                        <CommentCard/>
                        <CommentCard/>
                        <CommentCard/>
                        <CommentCard/>
                        <CommentCard/>
                    </section>
                    <section>
                        <form action="#">
                            <article className={styles.commentCard}>
                                <section className={styles.commentImgWrapper}>
                                    <img src={currUser.profilePicUrl} alt=""/>
                                </section>
                                <section className={styles.commentInputContent}>
                                    <h4>{currUser.username}</h4>
                                    <div className={styles.commentInputWrapper}>
                                        <input type="text" placeholder="Add your comment..."/>
                                            <button className="btn-danger">Post</button>
                                    </div>
                                </section>
                            </article>
                        </form>
                    </section>
                </article>
            </section>
        </section>
    );
}