import {useContext, useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import * as userService from "../../services/userService"
import * as imageService from "../../services/imageService"
import {Image, Transformation} from "cloudinary-react";
import ImageCard from "../ImageCard/ImageCard";
import styles from "./Profile.module.css"
import {AuthContext} from "../../contexts/AuthContext";

export default function Profile() {

    const {userId} = useParams();
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const {userData} = useContext(AuthContext);
    // const [banner, setBanner] = useState('');

    useEffect(() => {
        userService.getById(userId)
            .then(res => setUser(res));

        imageService.getPostsByUserId(userId)
            .then(res => setPosts(res));

        // if (posts.length > 0) {
        // setBanner(posts[Math.floor(Math.random() * posts.length)].publicId);
        // }
    }, [])

    return (
        <>
            <div className="jumbotron border-round-0 min-50vh"
                //TODO:Banner load
                 style={{
                     backgroundImage: `url(https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUDNAME}/image/upload/v1640213296/photogramContent/shooting_time_lapses_photography-wallpaper-2560x1080_i5gubk.jpg)`,
                     backgroundRepeat:`no-repeat`,
                     backgroundSize: `cover`
                 }}>
            </div>
            <div className="container mb-4">
                <Image publicId={user.profilePicPublicId} cloudName={process.env.REACT_APP_CLOUDINARY_CLOUDNAME}
                       className="mt-neg100 mb-4 rounded-circle" width="128">
                    <Transformation width="128" height="128" radius="max" crop="thumb"/>
                </Image>

                <h1 className="font-weight-bold title">{user.username}</h1>
                <h3>{user.firstName} {user.lastName}</h3>
                <h5>{user.email}</h5>
                {user.description &&
                <p>
                    {user.description}
                </p>
                }
                {userId === userData.userId &&
                <Link className={styles.editButton} to={`/profile/${userId}/edit`}><i
                    className="far fa-edit"></i></Link>}
            </div>
            <div className="container-fluid mb-5">
                <div className="row">
                    <div className="card-columns">
                        {posts.length === 0
                            ? <h3 className="text-center">No posts yet :(</h3>
                            : posts.map(p => <ImageCard key={p.objectId} imageData={p}/>)}

                    </div>
                </div>
            </div>
        </>
    );
}