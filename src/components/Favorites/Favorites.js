import React, { Component } from 'react';
import './Favorites.css';
import { connect } from "react-redux";
import { removeFromFavList, postList } from "../../redux/actions";
import { Link } from "react-router-dom";


class Favorites extends Component {
    state = {
        title: "Новый список",
        isSaved: false

    }
    changeFavListName = (e) => {
         this.setState({ title: e.target.value });
    };

    getIdArray = () => {
        let favIdArray = this.props.favList.map((item) => { 
        return item.imdbID;
        });
        return favIdArray;
    }

    saveList = () => {
        this.setState({ isSaved: true });
        this.props.postList(this.state.title, this.getIdArray());
    };

    render() {
        const { title, isSaved } = this.state;
        return (
            <div className="favorites">
                <input value={title} className="favorites__name" onChange={this.changeFavListName} disabled={this.state.isSaved}/>
                <ul className="favorites__list">
                    {this.props.favList.map((item) => {
                        return <li key={item.imdbID}>{item.Title} ({item.Year})
                        <button className="remove-favorite-movie" onClick={() =>
                          this.props.removeFromFavList(item.imdbID)
                        }>
                        X
                      </button></li>;
                    })}
                </ul>
                {!isSaved ? 
                (<button type="button" className="favorites__save" 
                    onClick={this.saveList} disabled={title.length === 0 || this.props.favList.length === 0}>
                    Сохранить список</button>) :
                (<Link to={"/list/" + this.props.listID} target="_blank">{title}</Link>)
                }
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return { 
        favList: state.favList,
        listID: state.listID,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeFromFavList: (id) => {
        dispatch(removeFromFavList(id));
      },
        postList: (title, movies) => {
            console.log(title)
        dispatch(postList(title, movies));
      },
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);