import { createContext, useReducer } from 'react';

const MovieContext = createContext();

// Define your initial state
const initialState = { movies: [], movie: null, loading: false, error: null };

// Create a movieReducer function to handle the different action types
const movieReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_START':
            return { ...state, loading: true, error: null };
        case 'SEARCH_SUCCESS':
            return { ...state, movies: action.payload, loading: false };
        case 'MOVIE_SUCCESS':
            return { ...state, movie: action.payload, loading: false };
        case 'FETCH_ERROR':
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
};
// Create a MovieProvider function that uses your reducer
const MovieProvider = ({ children }) => {
    const [state, dispatch] = useReducer(movieReducer, initialState);

    return (
        <MovieContext.Provider value={{ state, dispatch }}>
            {children}
        </MovieContext.Provider>
    );
};
// Export the Movie Context and the Movie Provider
export { MovieContext, MovieProvider };