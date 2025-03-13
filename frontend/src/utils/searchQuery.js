const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export const searchMoviesBySearchTerm = async (searchTerm) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${API_KEY}`);
        return await response.json();
    } catch (error) {
        console.error("Error fetching data: ", error);
        return null;
    }
};

export const searchTopRankedMovies = async () => {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
        return await response.json();
    }catch(error){
        console.error("Error fetching data: ", error);
        return null;
    }
}

export const searchPopularMovies = async () => {
    try{
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
        return await response.json();
    }catch (error) {
        console.error("Error fetching data: ", error);
        return null;
    }
}
