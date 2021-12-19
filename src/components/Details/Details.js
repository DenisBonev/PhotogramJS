import {Link, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Image, Transformation} from "cloudinary-react";

import {AuthContext} from "../../contexts/AuthContext";
import styles from "./Details.module.css"
import CommentCard from "../CommentCard/CommentCard";
import * as imageService from "../../services/imageService";
import * as userService from "../../services/userService"
import LikeSection from "../LikeSection/LikeSection";

export default function Details() {

    const {userData} = useContext(AuthContext);
    const {postId} = useParams();
    const [imageData, setImageData] = useState({});
    const [owner, setOwner] = useState({});

    useEffect(() => {
        imageService.getById(postId)
            .then(res =>{
                setImageData(res)
                return res;
            })
            .then(res =>{
               return userService.getById(res.ownerId)
                    .then(owner=>setOwner(owner));
            });

    }, [postId])

    const determineOrientation = (e) => {
        const landscape = (e.target.width > e.target.height);
        if (landscape) {
            setImageData({
                ...imageData,
                orientation: 'landscape'
            });
        } else {
            setImageData({
                ...imageData,
                orientation: 'portrait'
            });
        }
    }

    return (
        <section className={styles.mainContainer}>
            <section className={
                imageData.orientation === 'landscape'
                    ? styles.postContainerLandscape
                    : styles.postContainerPortrait}>
                <article className={
                    imageData.orientation === 'landscape'
                        ? styles.imgWrapperLandscape
                        : styles.imgWrapperPortrait}>
                    <img
                        onLoad={determineOrientation}
                        className={
                            imageData.orientation === 'landscape'
                                ? styles.imageLandscape
                                : styles.imagePortrait}
                        alt=""
                        src={imageData.url}/>
                </article>
                <article className={styles.postText}>
                    <section className={styles.titleSection}>
                        <h1>{imageData.title}</h1>
                        <p>{imageData.description}</p>
                    </section>
                    <LikeSection postId={postId} userId={userData.userId}/>
                    <section className={styles.creatorSection}>
                        <section>
                            <Image publicId={owner.profilePicPublicId}
                                   cloudName={process.env.REACT_APP_CLOUDINARY_CLOUDNAME}>
                                <Transformation gravity="face" height="400" width="400" crop="crop" />
                                <Transformation radius="max"/>
                                <Transformation crop="scale" width="100"/>
                            </Image>
                        </section>
                        <Link to={`/profile/${owner.objectId}`}>{owner.username}</Link>
                    </section>
                </article>
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
                        <section>
                            <Image publicId={userData.profilePicPublicId} cloudName={process.env.REACT_APP_CLOUDINARY_CLOUDNAME}>
                                <Transformation gravity="face" height="400" width="400" crop="crop" />
                                <Transformation />
                                <Transformation crop="scale" width="70"/>
                            </Image>
                        </section>
                        <section className={styles.commentInputContent}>
                            <h4><Link to={userData.userId}>{userData.username}</Link></h4>
                            <div className={styles.commentInputWrapper}>
                                <input type="text" placeholder="Add your comment..."/>
                                <button className="btn-danger">Post</button>
                            </div>
                        </section>
                    </article>
                </form>
            </section>
        </section>
    );
}