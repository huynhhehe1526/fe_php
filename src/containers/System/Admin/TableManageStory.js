import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageStory.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
// deleteMovie
import { deleteMovie } from '../../../services/userService';
import { toast } from "react-toastify";
import { LANGUAGES } from '../../../utils';
import { lang } from 'moment';
// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}


class TableManageStory extends Component {
    //khai báo chuẩn react
    constructor(props) {
        super(props);
        //khởi tạo các biến muốn dùng trong state
        //this này có nghĩa là class
        this.state = {
            movieRedux: []
        }
    }
    componentDidMount() {
        this.props.fetchAllMoviesRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listMovies !== this.props.listMovies) {
            this.setState({
                movieRedux: this.props.listMovies
            })
        }
    }

    handleDeleteMovieRedux = async (movie) => {
        console.log('Huynh chech thử hàm delete: ', movie.id)
        let res = await deleteMovie(movie.id);
        // console.log('Huynh check thử hàm: ', this.props.deleteMovieRedux(movie.id))
        if (res && res.error === 0) {
            toast.success("Delete movie suceed!");
            this.props.fetchAllMoviesRedux();
        } else {
            toast.error('Delete movie failed!!');
        }
    }

    handleEditstory = (movie) => {
        console.log('Huynh check story edit: ', movie);
        this.props.handleEditstoryFromParentKey(movie);
        this.props.fetchAllMovies();
    }

    render() {
        let { movieRedux } = this.state;
        let { language } = this.props;
        console.log('huynh check state listMovies: ', this.state)
        return (
            <React.Fragment>
                <table id="TableManageStory">
                    <tbody>
                        <tr>
                            <th>Title</th>
                            <th>Genre</th>
                            <th>Director</th>
                            <th>Status</th>
                            <th>Preview</th>
                            <th>Actor</th>
                            <th>premiere_date</th>
                            <th>Action</th>
                        </tr>

                        {movieRedux && movieRedux.length > 0 &&
                            movieRedux.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.title}</td>
                                        <td>
                                            {item && item.associate_genre
                                                && language === LANGUAGES.VI ?

                                                <span>
                                                    {item.associate_genre.valueVi}
                                                </span>
                                                :
                                                <span>
                                                    {item.associate_genre.valueEn}
                                                </span>
                                            }
                                        </td>

                                        <td>{item.director}</td>
                                        <td>
                                            {language === LANGUAGES.VI ? item.status_movie.valueVi : item.status_movie.valueEn}

                                        </td>

                                        <td>{item.preview}</td>
                                        <td>{item.actor}</td>
                                        <td>{item.premiere_date}</td>
                                        <td>
                                            <button
                                                className="btn-edit"
                                                onClick={() => this.handleEditstory(item)}
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={() => this.handleDeleteMovieRedux(item)}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        listStories: state.admin.allStories,
        listMovies: state.admin.allMovies,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
        fetchAllStoriesRedux: () => dispatch(actions.fetchAllStories()),
        fetchAllMoviesRedux: () => dispatch(actions.fetchAllMovies()),
        deleteStoryRedux: (id) => dispatch(actions.deleteStory(id)),
        deleteMovieRedux: (id) => dispatch(actions.deleteMovieStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageStory);
