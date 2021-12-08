import {useEffect,useState} from "react";

export default function ImageCard(){

    const [imageData,setImageData] = useState({
        id:"#",
        src:"https://images.unsplash.com/photo-1489743342057-3448cc7c3bb9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6d284a2efbca5f89528546307f7e7b87&auto=format&fit=crop&w=500&q=60",
        title:"Cool title",
    });

    // useEffect(
    //TODO:fetch to get image data(ImageService!)...
    //     ,[])

    return(
        <div className="card card-pin">
            <img className="card-img"
                 src={imageData.src}
                 alt="Card image"/>
            <div className="overlay">
                <h2 className="card-title title">{imageData.title}</h2>
                <div className="more">
                    <a href={imageData.id}>
                        <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i> More
                    </a>
                </div>
            </div>
        </div>
    )
}