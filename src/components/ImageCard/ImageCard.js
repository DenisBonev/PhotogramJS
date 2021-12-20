import {Link} from "react-router-dom";
import {Image, Placeholder, Transformation} from "cloudinary-react";

export default function ImageCard({imageData}) {
    return (
        <div className="card card-pin">
            <Image className="card-img"
                   cloudName={process.env.REACT_APP_CLOUDINARY_CLOUDNAME}
                   publicId={imageData.publicId}>
                <Transformation width="270" quality="7" loading="lazy"/>
                <Placeholder type="blur"/>
            </Image>
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