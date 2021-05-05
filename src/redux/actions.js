export function searchMovies(movies) {
    return {
        type: "SEARCH_MOVIE",
        payload: {
            movies: movies,
        }
    }
}

export function fetchMovies(title) {
    return function (dispatch) {
        fetch(`http://www.omdbapi.com/?s=${title}&apikey=5cffeb2`)
        .then((res) => res.json())
        .then((data) => {
            dispatch(searchMovies(data.Search));
        });
    };
}
export function addToFavList (id) {
    return {
        type: "ADD_TO_FAVOURITE_LIST",
        payload: {
            id: id,
        }
    }
}
export function removeFromFavList(id) {
    return {
        type: "REMOVE_FROM_FAVOURITE_LIST",
        payload: {
            id: id,
        }
    }
}

export function saveFavList(title, listID) {
    console.log(title)
    return {
      type: "SAVE_FAVOURITE_LIST",
      payload: {
        title: title,
        listID: listID,
      },
    };
}

export function postList(title, movies) {
    console.log(title, movies)
    return function (dispatch) {
        let savedList = {
        title: title,
        movies: movies,
        };
        fetch(`https://acb-api.algoritmika.org/api/movies/list/`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(savedList),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            dispatch(saveFavList(data.title, data.id));
        });
    };
}

export function getList(title, movies) {
    return {
      type: "GET_LIST",
      payload: {
        title: title,
        listMovies: movies, 
      },
    };
}

export function fetchIdList(id) {
    return function (dispatch) {
        let title;
      fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.title, data.movies);
            title = data.title;
            let newMovieArray = data.movies.map((el) => {
                return fetch(`http://www.omdbapi.com/?i=${el}&apikey=5cffeb2`)
                .then((res) => res.json())
            })
            let allMoviesPromise = Promise.all(newMovieArray)
            return allMoviesPromise 
          
        
        }).then((allMovies) => {
            dispatch(getList(title, allMovies));
        })
    };
}
