import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import './MovieRedux.scss';
import * as actions from '../../../store/actions';
import TableManageStory from './TableManageStory';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { toast } from "react-toastify";
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { createMovie, updateMovie } from '../../../services/userService';


class MovieRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authorArr: [],
            categoryArr: [],
            statusMovieArr: [],
            previewImgUrl: '',
            isOpen: false,

            title: '',
            image: '',
            genreId: '',
            director: '',
            statusId: '',
            preview: '',
            duration: '',
            premiere_date: '',
            subtitle: '',
            action: CRUD_ACTIONS.CREATE,
            storyEditId: '',
            date: '',
            video: ''
        }
    }




    async componentDidMount() {
        this.props.fetchAllCategoriesRedux();
        this.props.fetchAllStatusMovieRedux();
        this.props.fetchAllAuthorRedux();
        this.props.fetchAllMoviesRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.categoryRedux !== this.props.categoryRedux) {
            let arrCategories = this.props.categoryRedux;
            this.setState({
                categoryArr: arrCategories,
                genreId: arrCategories && arrCategories.length > 0 ? arrCategories[0].id : ''
            })
        }

        if (prevProps.statusMovieRedux !== this.props.statusMovieRedux) {
            let arrStatusMovie = this.props.statusMovieRedux;
            this.setState({
                statusMovieArr: arrStatusMovie,
                statusId: arrStatusMovie && arrStatusMovie.length > 0 ? arrStatusMovie[0].keyMap : ''
            })
        }

        if (prevProps.listStories !== this.props.listStories) {
            let arrCategories = this.props.categoryRedux;
            let arrStatusMovie = this.props.statusMovieRedux;

            this.setState({
                title: '',
                genreId: arrCategories && arrCategories.length > 0 ? arrCategories[0].id : '',
                director: '',
                statusId: arrStatusMovie && arrStatusMovie.length > 0 ? arrStatusMovie[0].keyMap : '',
                preview: '',
                duration: '',
                premiere_date: '',
                subtitle: '',
                image: '',
                video: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgUrl: '',
            })
        }
    }




    OnChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }


    checkValidateInput = () => {

        let isValid = true;
        let arrCheck = ['title', 'genreId', 'director', 'statusId', 'preview', 'duration',
            'actor', 'premiere_date', 'subtitle'
        ]
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                toast.info('Missing input is required: ' + arrCheck[i])
                break;
            }
        }
        return isValid
    }

    handleOnchangeimage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
                image: file,
            })
        }
        // this.setState({
        //     image: event.target.files[0]
        // })
    }


    openPreviewImage = () => {
        if (!this.state.previewImgUrl) {
            return;
        }
        this.setState({
            isOpen: true
        })
    }

    handleSaveStory = async () => {
        let { title, image, genreId, director, statusId, preview,
            duration, actor, premiere_date, subtitle, video } = this.state;
        let isValid = this.checkValidateInput();
        if (isValid === false) {
            return;
        }
        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);
        formData.append('genreId', genreId);
        formData.append('director', director);
        formData.append('statusId', statusId);
        formData.append('preview', preview);
        formData.append('duration', duration);
        formData.append('actor', actor);
        formData.append('premiere_date', premiere_date);
        formData.append('subtitle', subtitle);
        formData.append('video', video);
        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewMovie(formData);
            this.setState({
                title: '',
                previewImgUrl: '',
                image: '',
                director: '',
                preview: '',
                duration: '',
                actor: '',
                premiere_date: '',
                subtitle: '',
                video: '',
            })
            //this.props.fetchAllMoviesRedux();
        } if (action === CRUD_ACTIONS.EDIT) {
            let res = await updateMovie({
                id: this.state.storyEditId,
                title: this.state.title,
                image: this.state.image,
                genreId: this.state.genreId,
                director: this.state.director,
                statusId: this.state.statusId,
                preview: this.state.preview,
                duration: this.state.duration,
                actor: this.state.actor,
                premiere_date: this.state.premiere_date,
                subtitle: this.state.subtitle,
                video: this.state.video,
            })
            //console.log('Huynh check function updateMovie: ', res)
            if (res && res.errCode === 0) {
                this.props.fetchAllMoviesRedux();
                toast.success('Notice: ' + res.message);
            } else {
                toast.error('Error: ', res.message);
            }

        }
    }


    handleEditstoryFromParent = (movie) => {
        let imageBase64 = '';
        console.log('Huynh check movie handleEditstoryFromParent: ', movie)
        this.setState({

            title: movie.title,
            image: movie.image,
            genreId: movie.genreId,
            director: movie.director,
            statusId: movie.statusId,
            preview: movie.preview,
            duration: movie.duration,
            premiere_date: movie.premiere_date,
            subtitle: movie.subtitle,
            actor: movie.actor,
            action: movie.action,
            video: movie.video,
            avatar: '',
            action: CRUD_ACTIONS.EDIT,
            storyEditId: movie.id,
            previewImgUrl: imageBase64
        })

    }

    handleOnchangeDatePicker = (date) => {
        // Use selectedDate and selectedTime to process both date and time
        this.setState({
            //premiere_date: moment(date[0]).format('YYYY-MM-DD'),
            premiere_date: moment(new Date(date[0])).format('DD/MM/YYYY'),
            date: moment(new Date(date[0])).format('DD')
        })
        console.log('Check state tại hàm handleOnchangeDatePicker: ', this.state)
    };
    render() {
        // let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        //console.log('Check props cho file MovieReudx: ', this.props);
        let language = this.props.language;
        let categories = this.state.categoryArr;
        let authors = this.state.authorArr;
        let statusMovies = this.state.statusMovieArr;
        let { title, image, genreId, director, statusId, preview, duration, actor, premiere_date, subtitle, video } = this.state;
        //let select = new Date(new Date().setDate(new Date(premiere_date).getDate()));
        //premiere_date = moment(new Date(premiere_date)).format('DD/MM/YYYY');
        console.log('Check state premiere_date: ', premiere_date);
        console.log('Check state: ', this.state);

        //date = moment(new Date(premiere_date)).format('DD')
        return (
            <div className='user-redux-container'>
                <div className="title" >CRUD movie by redux</div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'>
                                Thêm movie
                            </div>
                            <div className='col-3'>
                                <label>
                                    Title
                                </label>
                                <input className='form-control' type='text'
                                    value={title}
                                    onChange={(event) => this.OnChangeInput(event, 'title')}
                                />
                            </div>
                            {/* image */}

                            <div className='col-6'>
                                <label>
                                    Image movie
                                </label>
                                <div className='preview-img-container'>
                                    <input id="previewImg" type='file' hidden
                                        onChange={(event) => this.handleOnchangeimage(event)}

                                    />
                                    <label className='label-upload' htmlFor='previewImg'>
                                        <FormattedMessage id="manage-user.upload-image" /> <i className="fas fa-upload"></i>
                                    </label>
                                    {/* <div className='preview-image'
                                        //style={{ backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/${this.state.image})` }}
                                        style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                        onClick={() => this.openPreviewImage()}
                                    >

                                    </div> */}
                                    <div className='preview-image'
                                        style={{
                                            backgroundImage: this.state.action === CRUD_ACTIONS.EDIT
                                                ? `url(${process.env.REACT_APP_BACKEND_URL}/${this.state.image})`
                                                : `url(${this.state.previewImgUrl})`
                                        }}
                                        onClick={() => this.openPreviewImage()}
                                    >
                                    </div>

                                </div>

                            </div>


                            <div className='col-3'>
                                <label>
                                    Genre Movie
                                </label>
                                <select className="form-control"
                                    onChange={(event) => this.OnChangeInput(event, 'genreId')}
                                    value={genreId}
                                >
                                    {categories && categories.length > 0 &&
                                        categories.map((item, index) => {
                                            return (

                                                <option key={index} value={item.id}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }

                                </select>
                            </div>

                            <div className='col-3'>
                                <label>
                                    Director
                                </label>
                                <input className='form-control' type='text'
                                    value={director}
                                    onChange={(event) => this.OnChangeInput(event, 'director')}
                                />
                            </div>

                            <div className='col-3'>
                                <label>
                                    Status Movie
                                </label>
                                <select className="form-control"
                                    onChange={(event) => this.OnChangeInput(event, 'statusId')}
                                    value={statusId}
                                >
                                    {statusMovies && statusMovies.length > 0 &&
                                        statusMovies.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>
                                                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                </option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div className='col-3'>
                                <label>
                                    Preview
                                </label>
                                <input className='form-control' type='text'
                                    value={preview}
                                    onChange={(event) => this.OnChangeInput(event, 'preview')}
                                />
                            </div>

                            <div className='col-3'>
                                <label>
                                    Duration
                                </label>
                                <input className='form-control' type='text'
                                    value={duration}
                                    onChange={(event) => this.OnChangeInput(event, 'duration')}
                                />
                            </div>

                            <div className='col-3'>
                                <label>
                                    Actor
                                </label>
                                <input className='form-control' type='text'
                                    value={actor}
                                    onChange={(event) => this.OnChangeInput(event, 'actor')}
                                />
                            </div>

                            <div className='col-6'>
                                <label>
                                    <FormattedMessage id="manage-schedule.choose-date" />
                                </label>
                                <DatePicker

                                    className="form-control"
                                    onChange={this.handleOnchangeDatePicker}
                                    value={moment(`${premiere_date}`).format('DD/MM/YYYY')}
                                //lấy ngày hôm qua
                                //minDate={yesterday}
                                />
                            </div>

                            <div className='col-3'>
                                <label>
                                    Subtitle
                                </label>
                                <input className='form-control' type='text'
                                    value={subtitle}
                                    onChange={(event) => this.OnChangeInput(event, 'subtitle')}
                                />
                            </div>

                            <div className='col-3'>
                                <label>
                                    Video
                                </label>
                                <input className='form-control' type='text'
                                    value={video}
                                    onChange={(event) => this.OnChangeInput(event, 'video')}
                                />
                            </div>
                            {/* lấy ngày
                            <div className='col-6'>
                                {premiere_date &&
                                    <span>
                                        {date}
                                    </span>
                                }
                            </div> */}
                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                    onClick={() => this.handleSaveStory()}
                                >
                                    {this.state.action === CRUD_ACTIONS.EDIT ?
                                        <FormattedMessage id="manage-user.edit" />
                                        :
                                        <FormattedMessage id="manage-user.save" />
                                    }
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageStory
                                    handleEditstoryFromParentKey={this.handleEditstoryFromParent}
                                    action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }

            </div >

        )
    }
}




const mapStateToProps = state => {
    return {
        genderRedux: state.admin.genders,
        language: state.app.language,
        statusMovieRedux: state.admin.statusMovie,
        authorRedux: state.admin.allAuthors,
        isLoadingGender: state.admin.isLoadingGender,
        listStories: state.admin.allStories,
        categoryRedux: state.admin.allCategories,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllAuthorRedux: () => dispatch(actions.fetchAllAuthor()),
        fetchAllStoriesRedux: () => dispatch(actions.fetchAllStories()),
        fetchAllStatusMovieRedux: () => dispatch(actions.fetchStatusmovieStart()),
        //thêm , sửa, xóa story
        createNewMovie: (data) => dispatch(actions.createNewMovie(data)),
        editMovieRedux: (data) => dispatch(actions.editStory(data)),
        fetchAllCategoriesRedux: () => dispatch(actions.fetchAllCategories()),
        fetchAllMoviesRedux: () => dispatch(actions.fetchAllMovies()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieRedux);
