import {Link} from "react-router-dom";

export default function ImageCard({imageData}) {
    return (
        <div className="card card-pin">
            <img className="card-img"
                 src={imageData.url}
                 alt="Card image"/>
            <div className="overlay">
                <h2 className="card-title title">{imageData.title}</h2>
                <div className="more">
                    <Link to={`details/${imageData.objectId}`}>
                        <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i> More
                    </Link>
                </div>
            </div>
        </div>
    )
}