let initialState = {
    movies: [],
    favList: [],
    listID: '',
    listMovies: [],
}

export default function reducer(state = initialState, action) {
    if (action.type === "SEARCH_MOVIE") {
        return {
            ...state,
            movies: action.payload.movies,
        }
        
    }

    if (action.type === "ADD_TO_FAVOURITE_LIST") {
        const favListState = { ...state };
        const match = favListState.movies.find((item) => item.imdbID === action.payload.id);
        const favListMatch = favListState.favList.find((item) => item.imdbID === action.payload.id);

        if (match && !favListMatch) {
            favListState.favList = [...favListState.favList, { ...match }];
        }
        return favListState;
    }

    if (action.type === "REMOVE_FROM_FAVOURITE_LIST") {
        const updatedList = state.favList.filter((item) => {
            return item.imdbID !== action.payload.id
        })
        return {...state, favList: updatedList}
    };

    if (action.type === "SAVE_FAVOURITE_LIST") {
        return {
            ...state,
            title: action.payload.title,
            listID: action.payload.listID
        };
    };
    
    if (action.type === "GET_LIST") { 
      return {
        ...state,
        title: action.payload.title,
        listMovies: action.payload.listMovies,
      };
    };
    
    return state;
}
