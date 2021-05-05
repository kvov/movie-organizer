import React, { Component } from 'react';
import './ListPage.css';
import { connect } from "react-redux";
import Header from "../../components/Header/Header";
import { fetchIdList } from "../../redux/actions";

class ListPage extends Component {
    
    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);
        this.props.fetchIdList(id);
        // TODO: запрос к сервер на получение списка
        // TODO: запросы к серверу по всем imdbID
    }
    render() { 
        console.log(this.props);
        return (
            <div> 
                <Header />
                <div className="list-page">
                    
                    <h1 className="list-page__title">{this.props.title}</h1>
                    <ul>
                        {this.props.listMovies.map((item) => {
                            return (
                                <li key={item.imdbID} className="list-page__single-movie">
                                    <img src={item.Poster} className="single-movie__poster" alt={item.Title} /><a
                                href={`https://www.imdb.com/title/${item.imdbID}/`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="list-page__link-imdb"
                            ><h3 className="movie-item__title">{item.Title} ({item.Year})</h3></a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
      title: state.title,
      listMovies: state.listMovies,
    };
  };

  const mapDispatchToProps = (dispatch) => ({
    fetchIdList: (id) => dispatch(fetchIdList(id)),
    
    
  });

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);