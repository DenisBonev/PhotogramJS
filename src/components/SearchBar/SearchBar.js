export default function SearchBar(){
    return (
        <div className="container mb-4">
            <div className="row justify-content-between">
                <h1 className="font-weight-bold title">Explore</h1>
                <form className="bd-search hidden-sm-down">
                    <input type="text" className="form-control bg-graylight border-0 font-weight-bold"
                           id="search-input"
                           placeholder="Search..." autoComplete="off"/>
                    <div className="dropdown-menu bd-search-results" id="search-results">
                    </div>
                </form>
            </div>
        </div>
    );
}