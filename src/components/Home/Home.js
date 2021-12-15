import ImageCard from "../ImageCard/ImageCard";
import * as imageService from "../../services/imageService";
import {useEffect, useState} from "react";

export default function Home() {

    const [allPosts, setAllPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        imageService.getAll()
            .then(res => {
                setAllPosts(res);
                setFilteredPosts(res);
            });
    }, [])

    const filterPosts = (e) => {
        const search = e.currentTarget.value;
        console.log(search);
        if (search) {
            setFilteredPosts(allPosts.filter(p => p.title.toLowerCase().includes(search.toLowerCase())));
        }else {
            setFilteredPosts(allPosts.map(x=>x));
        }
    }

    return (
        <section className="mt-4 mb-5">
            <div className="container mb-4">
                <div className="row justify-content-between">
                    <h1 className="font-weight-bold title">Explore</h1>
                    <form className="bd-search hidden-sm-down" action="#">
                        <input type="text" className="form-control bg-graylight border-0 font-weight-bold"
                               id="search-input"
                               placeholder="Search..." autoComplete="off"
                               onChange={filterPosts}/>
                        <div className="dropdown-menu bd-search-results" id="search-results">
                        </div>
                    </form>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="card-columns">
                        {filteredPosts.map(p => <ImageCard key={p.objectId} imageData={p}/>)}
                    </div>
                </div>
            </div>
        </section>
    );
}