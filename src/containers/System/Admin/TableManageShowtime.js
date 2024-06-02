import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import './TableManageStory.scss';
import { showAllShowtime, deleteShowtime } from '../../../services/userService';
import { toast } from 'react-toastify';
import * as actions from '../../../store/actions';

class TableManageShowtime extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrShowtime: []
        }
    }

    async componentDidMount() {
        this.props.fetchAllShowtimesRedux();
        let res = await showAllShowtime();
        if (res && res.error == 0) {
            this.setState({
                arrShowtime: res.data
            })
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listShowtimes !== this.props.listShowtimes) {
            this.setState({
                arrShowtime: this.props.listShowtimes
            })
        }
    }
    handleDeleteShowtime = async (item) => {
        let res = await deleteShowtime(item);
        // console.log('Huynh check handleDeleteShowtime: ', res)
        if (res && res.error == 0) {
            toast.success('Notice: ' + res.errMessage)
            this.props.fetchAllShowtimesRedux();
        } else {
            toast.error('Error: ' + res.errMessage)
        }
    }

    handleEditShowtime = (showtime) => {
        console.log('Huynh check props handleEditShowtime: ', showtime);
        this.props.handleEditShowtimeFromParentKey(showtime);
    }
    render() {
        let { arrShowtime } = this.state;
        let { language } = this.props;
        console.log('Huynh check state bên props: ', this.state)
        return (
            <>
                <React.Fragment>
                    <table id="TableManageStory">
                        <tbody>
                            <tr>
                                <th>Tên phim</th>
                                <th>Rạp chiếu</th>
                                <th>Ngày chiếu</th>
                                <th>Thời gian</th>
                                <th>Action</th>
                            </tr>

                            {
                                arrShowtime && arrShowtime.length > 0 &&
                                arrShowtime.map((item, index) => {
                                    return (
                                        <tr>
                                            {item && item.movie &&
                                                <td>{item.movie.title}</td>
                                            }
                                            {item && item.location &&
                                                language === LANGUAGES.VI ?
                                                <td>{item.location.valueVi}</td>
                                                :
                                                <td>{item.location.valueEn}</td>
                                            }
                                            <td>{item.date}</td>
                                            <td>{item.time}</td>
                                            <td>
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => this.handleEditShowtime(item)}
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => this.handleDeleteShowtime(item.id)}
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }



                        </tbody>
                    </table >
                </React.Fragment >
            </>

        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listShowtimes: state.admin.allShowtime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllShowtimesRedux: () => dispatch(actions.fetchAllShowtimes()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageShowtime);
