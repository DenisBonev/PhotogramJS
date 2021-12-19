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
                            <Transformation gravity="face" width="450" crop="thumb" radius="max"/>
                            <Transformation crop="scale" width="35"/>
                        </Image>
                        <span className="align-middle">{userData.username}</span>
                    </Link>
                </li>
                <li className="nav-item dropdown">
                    <Link className="nav-link" to="#" id="dropdown02" data-toggle="dropdown" aria-haspopup="true"
                          aria-expanded="false">
                        <svg style={{marginTop: 10}} className="_3DJPT" version="1.1" viewBox="0 0 32 32"
                             width="21"
                             height="21" aria-hidden="false" data-reactid="71">
                            <path
                                d="M7 15.5c0 1.9-1.6 3.5-3.5 3.5s-3.5-1.6-3.5-3.5 1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5zm21.5-3.5c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5-1.6-3.5-3.5-3.5zm-12.5 0c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5-1.6-3.5-3.5-3.5z"
                                data-reactid="22"></path>
                        </svg>
                    </Link>
                    <div className="dropdown-menu dropdown-menu-right shadow-lg" aria-labelledby="dropdown02">
                        <h4 className="dropdown-header display-4">
                            Menu
                        </h4>
                        <div className="dropdown-divider"></div>
                        <ul className="toggle-menu">
                            <li className="dropdown-item">
                                <Link to="#" className="btn btn-primary d-block">
                                    My Profile
                                </Link>
                            </li>

                            <li className="dropdown-item">
                                <Link to="#" className="btn btn-primary d-block">
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
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
                            <Link className="nav-link active" to="/">Home</Link>
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