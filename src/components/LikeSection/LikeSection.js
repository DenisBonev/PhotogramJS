import {Link, useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";

import styles from "../Details/Details.module.css";
import * as imageService from "../../services/imageService";
import {AuthContext} from "../../contexts/AuthContext";

export default function LikeSection(){

    const navigate = useNavigate();
    const {userData} = useContext(AuthContext);
    const {postId} = useParams();
    const [liked,setLiked]=useState(false);

    useEffect(()=> {
        imageService.getIfUserLikedPost(postId,userData.userId).then(res=>setLiked(res.length>0));
        }, []);

    const onLike = (e) =>{
        e.preventDefault();
        if (!userData.userId){
            navigate("/login");
        }
        if (!liked) {
            imageService.likePost(postId, userData.userId);
        }else {
            imageService.unlikePost(postId,userData.userId);
        }
        setLiked(!liked);
    }

    return(
        <section className={styles.likeSection}>
            {liked
            ?<Link className={styles.likeButton} onClick={onLike} to={`/post/${postId}/like`}><i className="fas fa-heart"></i></Link>
            :<Link className={styles.likeButton} onClick={onLike} to="#"><i className="far fa-heart"></i></Link>}
        </section>
    )
}