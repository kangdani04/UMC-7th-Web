const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500/";

export default function Movie({ title, poster_path }) {
    return (
        <div className='movie-container'>
            <img src={IMG_BASE_URL + poster_path} alt="포스터"/>
            <div className="overlay">
                <div className='movie-info'>
                </div>
            </div>
        </div>
    )
}