import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import {searchPopularMovies} from "../utils/searchQuery";

const SearchBar = ({ onSearch }) => {
    const [movieOptions, setMovieOptions] = React.useState([]);

    // const fetchPopularMovies = async () => {
    //     const data = await searchPopularMovies();
    //     if (data.results) {
    //         setMovieOptions(data.results.map(movie => ({
    //             title: movie.title,
    //             year: movie.release_date ? movie.release_date.split('-')[0] : 'Unknown',
    //         })));
    //     } else {
    //         setMovieOptions([]);
    //     }
    // };

    // Funkcja pobierająca popularne filmy i przekształcająca je do formatu Autocomplete jako opcja wyboru
    const fetchPopularMovies = async () => {
        const data = await searchPopularMovies();

        if (!data || !data.results) {
            setMovieOptions([]);
            return;
        }

        setMovieOptions(data.results.map(movie => ({
            title: movie.title,
            year: movie.release_date ? movie.release_date.split('-')[0] : 'Unknown',
        })));
    };

    // Wywołanie pobierania filmów po załadowaniu komponentu
    React.useEffect(() => {
        fetchPopularMovies();
    }, []);
    // Obsługa wpisywania tekstu – uruchamia wyszukiwanie po przekroczeniu 2 znaków
    const handleInputChange = (event, value) => {
         const query = event.target.value || '';
        if (value === "") {
            onSearch("");
            return;
        }
        if (query.length > 2) {
            fetchPopularMovies();
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSearch(event.target.value);
        }
    };
    // Obsługa kliknięcia w opcję z listy – wykonuje wyszukiwanie
    const handleOptionSelect = (event, value) => {
        if (value) {
            onSearch(value);
        }
    };

    return (
        <Stack spacing={2} sx={{ width: 400, marginBottom: "20px" }}>
            <Autocomplete
                id="search-bar"
                freeSolo
                options={movieOptions.map((option) => option.title)}
                onInputChange={handleInputChange}
                onChange={handleOptionSelect}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="type a movie"
                        onKeyDown={handleKeyPress}
                        sx={{
                            "& .MuiInputBase-input": { color: "white" },
                            "& label": { color: "grey" },
                            "& label.Mui-focused": { color: "white" },
                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: "white" },
                                "&:hover fieldset": { borderColor: "grey" },
                                "&.Mui-focused fieldset": { borderColor: "white" }
                            },
                            "& .MuiAutocomplete-clearIndicator": {
                                color: "white",
                            },
                        }}
                    />
                )}
            />
        </Stack>
    );
};

export default SearchBar;
