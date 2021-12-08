export default function Header(){
    return(
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
                <a className="navbar-brand font-weight-bolder mr-3" href="index.html">
                    <div className="row align-items-center">
                        <img src="assets/img/logo.png"/>
                        <p className="logo-title">PhotoGram</p>
                    </div>
                </a>
                <button className="navbar-light navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarsDefault"
                        aria-controls="navbarsDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarsDefault">
                    <ul className="navbar-nav ml-auto align-items-center">
                        <li className="nav-item">
                            <a className="nav-link active" href="index.html">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="post-portrait.html">Post</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="author.html"><img className="rounded-circle mr-2"
                                                                            src="assets/img/av.png"
                                                                            width="30"/><span
                                className="align-middle">Author</span></a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link" href="#" id="dropdown02" data-toggle="dropdown" aria-haspopup="true"
                               aria-expanded="false">
                                <svg style={{marginTop:10}} className="_3DJPT" version="1.1" viewBox="0 0 32 32"
                                     width="21"
                                     height="21" aria-hidden="false" data-reactid="71">
                                    <path
                                        d="M7 15.5c0 1.9-1.6 3.5-3.5 3.5s-3.5-1.6-3.5-3.5 1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5zm21.5-3.5c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5-1.6-3.5-3.5-3.5zm-12.5 0c-1.9 0-3.5 1.6-3.5 3.5s1.6 3.5 3.5 3.5 3.5-1.6 3.5-3.5-1.6-3.5-3.5-3.5z"
                                        data-reactid="22"></path>
                                </svg>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right shadow-lg" aria-labelledby="dropdown02">
                                <h4 className="dropdown-header display-4">
                                    Menu
                                </h4>
                                <div className="dropdown-divider"></div>
                                <ul className="toggle-menu">
                                    <li className="dropdown-item">
                                        <a href="#" className="btn btn-primary d-block">
                                            My Profile
                                        </a>
                                    </li>

                                    <li className="dropdown-item">
                                        <a href="#" className="btn btn-primary d-block">
                                            Logout
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}