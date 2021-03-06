import {Link, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {Image, Placeholder, Transformation} from "cloudinary-react";

import {AuthContext} from "../../contexts/AuthContext";
import styles from "./Details.module.css"
import * as imageService from "../../services/imageService";
import * as userService from "../../services/userService"
import LikeSection from "../LikeSection/LikeSection";
import CommentSection from "../CommentSection/CommentSection";

export default function Details() {

    const {userData} = useContext(AuthContext);
    const {postId} = useParams();
    const [imageData, setImageData] = useState({});
    const [owner, setOwner] = useState({});


    useEffect(() => {
        imageService.getById(postId)
            .then(res => {
                setImageData(res);
                return res;
            }).then(res => {
            return userService.getById(res.ownerId)
                .then(owner => setOwner(owner));
        });

    }, [postId])

    return (
        <section className={styles.mainContainer}>
            <section className={
                imageData.orientation !== 'landscape'
                    ? styles.postContainerLandscape
                    : styles.postContainerPortrait}>
                <article className={
                    imageData.orientation !== 'landscape'
                        ? styles.imgWrapperLandscape
                        : styles.imgWrapperPortrait}>
                    <Image className={
                        imageData.orientation !== 'landscape'
                            ? styles.imageLandscape
                            : styles.imagePortrait}
                           publicId={imageData.publicId}
                           cloudName={process.env.REACT_APP_CLOUDINARY_CLOUDNAME}>
                        <Placeholder type="blur"/>
                        <Transformation background="auto:predominant" width="1280" height="720" crop="pad"/>
                    </Image>
                </article>
                <article className={styles.postText}>
                    <section className={styles.titleSection}>
                        <h1>{imageData.title}</h1>
                        <p>{imageData.description}</p>
                    </section>
                    {userData.userId && <LikeSection postOwnerId={owner.objectId}/>}
                    <section className={styles.creatorSection}>
                        <section>
                            <Image publicId={owner.profilePicPublicId}
                                   cloudName={process.env.REACT_APP_CLOUDINARY_CLOUDNAME}>
                                <Transformation gravity="face" height="700" width="700" crop="crop"/>
                                <Transformation radius="max"/>
                                <Transformation crop="scale" width="100"/>
                            </Image>
                        </section>
                        <Link to={`/profile/${owner.objectId}`}>{owner.username}</Link>
                    </section>
                </article>
            </section>
            <CommentSection postId={postId}/>
        </section>
    );
}