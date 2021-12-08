import CommentCard from "../CommentCard/CommentCard";
import styles from "./DetailsLandscape.module.css"

export default function DetailsLandscape(){
    return(
        <section className={styles.mainContainer}>
            <section className={styles.postContainer}>
                <article className={styles.imgWrapper}>
                    <img className={styles.image} alt=""
                         src="https://photographycourse.net/wp-content/uploads/2014/11/Landscape-Photography-steps.jpg"/>
                </article>
                <article className={styles.postText}>
                    <h1>Title</h1>
                    <p>Some image caption...</p>
                    <a className={styles.likeButton} href="#"><i className="fas fa-heart"></i></a>
                    <a className={styles.likeButton} href="#"><i className="far fa-heart"></i></a>

                    <section className={styles.creatorSection}>
                        <section className={styles.commentImgWrapper}>
                            <img alt="" src="assets/img/av.png"/>
                        </section>
                        <a href="#">username</a>
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
                    </section>
                    <section>
                        <form action="#">
                            <article className={styles.commentCard}>
                                <section className={styles.commentImgWrapper}>
                                    <img src="assets/img/av.png" alt=""/>
                                </section>
                                <section className={styles.commentInputContent}>
                                    <h4>username</h4>
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