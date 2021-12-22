import {Link} from "react-router-dom";
import {useContext} from "react";
import {Image, Transformation} from "cloudinary-react";

import {AuthContext} from "../../contexts/AuthContext";

export default function Header() {
    const {userData} = useContext(AuthContext);


    const loggedNav = (
            <>
                <li className="nav-item">
                    <Link className="nav-link" to="/post">Post</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={`/profile/${userData.userId}`}>
                        <Image cloudName={process.env.REACT_APP_CLOUDINARY_CLOUDNAME} publicId={userData.profilePicPublicId}>
                            <Transformation gravity="face" width="700" height="700" crop="thumb" radius="max"/>
                            <Transformation crop="scale" width="35"/>
                        </Image>
                        <span className="align-middle">{userData.username}</span>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/logout">
                        <i className="fas fa-sign-out-alt"></i>
                    </Link>
                </li>
            </>
        )
    ;


    const guestNav = (
        <>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
            </li>
        </>
    )

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
                <Link className="navbar-brand font-weight-bolder mr-3" to="/">
                    <div className="row align-items-center">
                        <img src="/assets/img/logo.png"/>
                        <p className="logo-title">PhotoGram</p>
                    </div>
                </Link>
                <button className="navbar-light navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarsDefault"
                        aria-controls="navbarsDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarsDefault">
                    <ul className="navbar-nav ml-auto align-items-center">

                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Explore</Link>
                        </li>
                        {userData.username
                            ? loggedNav
                            : guestNav
                        }


                    </ul>
                </div>
            </nav>
        </header>
    )
}