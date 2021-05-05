import React, { Component } from 'react';
import { connect } from "react-redux";
import './MovieItem.css';
import { addToFavList } from "../../redux/actions";

class MovieItem extends Component {
    
    render() {
        const { Title, Year, Poster, imdbID } = this.props;
        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title}&nbsp;({Year})</h3>
                    <button 
                        type="button" 
                        className="movie-item__add-button"
                        onClick={() => {
                            this.props.addToFavList(imdbID);
                          }}
                          >
                              Добавить в список
                          </button>
                </div>
            </article>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        favList: state.favList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToFavList: (imdbID) => {
            dispatch(addToFavList(imdbID));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MovieItem);