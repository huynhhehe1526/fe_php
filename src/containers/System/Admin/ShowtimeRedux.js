import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS } from '../../../utils';
import * as actions from '../../../store/actions';
import { getAllMovie } from '../../../services/userService';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { toast } from "react-toastify";
import TableManageShowtime from './TableManageShowtime';
import { createShowtime, updateShowtime } from '../../../services/userService';

class ShowtimeRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movieArr: [],
            movieId: '',
            locationArr: [],
            locationId: '',
            date: '',
            time: '',
            action: CRUD_ACTIONS.CREATE,

            showtimeEdit: '',
            arrShowtime: []
        }
    }

    async componentDidMount() {
        this.props.fetchAllShowtimesRedux();

        this.props.fetchAllMoviesRedux();
        this.props.fetchAllMoLocationsRedux();
        // let res = await getAllMovie();
        // this.setState({
        //     storyArr: res.data,
        //     storyId: res.data && res.data.length > 0 ? res.data.id : ''
        // })
        // //console.log('Huynh check mount getAllMovie:  ', res.data);
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listMovies !== this.props.listMovies) {
            let arrMovies = this.props.listMovies;
            this.setState({
                movieArr: arrMovies,
                movieId: arrMovies && arrMovies.length > 0 ? arrMovies[0].id : ''
            })
        }

        if (prevProps.listLocatons !== this.props.listLocatons) {
            let arrLocations = this.props.listLocatons;
            this.setState({
                locationArr: arrLocations,
                locationId: arrLocations && arrLocations.length > 0 ? arrLocations[0].id : ''
            })
        }

        if (prevProps.listShowtimes !== this.props.listShowtimes) {
            this.setState({
                arrShowtime: this.props.listShowtimes
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
        let arrCheck = ['movieId', 'locationId', 'date', 'time']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                toast.info('Missing input is required: ' + arrCheck[i])
                break;
            }
        }
        return isValid
    }

    handleOnchangeDatePicker = (date) => {
        // Use selectedDate and selectedTime to process both date and time
        this.setState({
            date: moment(new Date(date[0])).format('DD/MM/YYYY')
        })
        console.log('Check state tại hàm handleOnchangeDatePicker: ', this.state)
    };


    handleSaveStory = async () => {
        let { movieId, locationId, date, time } = this.state;
        let isValid = this.checkValidateInput();
        if (isValid === false) {
            return;
        }
        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            let res = await createShowtime({
                movie_id: movieId,
                location_id: locationId,
                time: time,
                date: date
            });
            if (res && res.error == 0) {
                this.props.fetchAllShowtimesRedux();
                toast.success('Notice: ' + res.message)
                this.setState({
                    time: '',
                    date: ''
                })
            } else {
                toast.error('Error: ' + res.message)
            }
            //console.log('Huynh check funtion createShowtime: ', res)
            //this.props.fetchAllMoviesRedux();

            // movieArr: [],
            // movieId: '',
            // locationArr: [],
            // locationId: '',
            // date: '',
            // time: '',
            // action: CRUD_ACTIONS.CREATE,

            // showtimeEdit: ''

        } if (action === CRUD_ACTIONS.EDIT) {
            let res = await updateShowtime({
                id: this.state.showtimeEdit,
                movie_id: this.state.movieId,
                location_id: this.state.locationId,
                time: this.state.time,
                date: this.state.date
            })
            console.log('Huynh check function updateShowtime: ', res)
            if (res && res.error == 0) {
                toast.success('Notice: ' + res.message);
                this.setState({
                    movieId: '',
                    locationId: '',
                    time: '',
                    date: '',
                    action: CRUD_ACTIONS.CREATE,

                })
            } else {
                toast.error('Error: ', res.message);
            }

        }

    }
    handleEditShowtimeFromParent = (showtime) => {
        //console.log('Huynh check id edit showtime: ', showtime)
        this.setState({
            showtimeEdit: showtime.id,
            movieId: showtime.movie_id,
            locationId: showtime.location_id,
            time: showtime.time,
            date: showtime.date,
            action: CRUD_ACTIONS.EDIT,
        })
    }
    render() {
        let { language } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        let { movieArr, movieId, locationArr, locationId, date, time } = this.state;
        let date_c = moment(new Date(date[0])).format('DD/MM/YYYY');
        console.log('Huynh check state: ', this.state)
        // console.log('Huynh check this.props.listMovies: ', this.props.listMovies)
        return (
            <>
                ShowtimeRedux
                <div className='user-redux-container'>
                    <div className="title" >CRUD movie by redux</div>
                    <div className='user-redux-body'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-3'>
                                    <label>
                                        List Movie
                                    </label>
                                    <select className="form-control"
                                        onChange={(event) => this.OnChangeInput(event, 'movieId')}
                                        value={movieId}
                                    >

                                        {movieArr && movieArr.length > 0 &&
                                            movieArr.map((item, index) => {
                                                return (

                                                    <option key={index} value={item.id}>
                                                        {item.title}
                                                    </option>
                                                )
                                            })
                                        }

                                    </select>
                                </div>

                                <div className='col-3'>
                                    <label>
                                        Location
                                    </label>
                                    <select className="form-control"
                                        onChange={(event) => this.OnChangeInput(event, 'locationId')}
                                        value={locationId}
                                    >

                                        {locationArr && locationArr.length > 0 &&
                                            locationArr.map((item, index) => {
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
                                        <FormattedMessage id="manage-schedule.choose-date" />
                                    </label>
                                    <DatePicker
                                        className="form-control"
                                        onChange={this.handleOnchangeDatePicker}
                                        value={date}
                                    //lấy ngày hôm qua
                                    //minDate={yesterday}
                                    />
                                </div>

                                <div className='col-3'>
                                    <label>
                                        Time
                                    </label>
                                    <input className='form-control' type='text'
                                        value={time}
                                        onChange={(event) => this.OnChangeInput(event, 'time')}
                                    />
                                </div>

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
                                    <TableManageShowtime
                                        handleEditShowtimeFromParentKey={this.handleEditShowtimeFromParent}
                                        action={this.state.action}
                                    />
                                </div>
                            </div>

                        </div >
                    </div>
                </div>


            </>

        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listMovies: state.admin.allMovies,
        listLocatons: state.admin.allLocations,
        listShowtimes: state.admin.allShowtime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllMoviesRedux: () => dispatch(actions.fetchAllMovies()),
        fetchAllMoLocationsRedux: () => dispatch(actions.fetchAllLocations()),
        createNewShowtime: (data) => dispatch(actions.createShowtimeAction(data)),
        fetchAllShowtimesRedux: () => dispatch(actions.fetchAllShowtimes()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowtimeRedux);
