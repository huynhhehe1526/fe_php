import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import './TicketWait.scss';
import { getAllInfoUserConfirm, getDetailBookingById } from '../../../services/userService';
import moment from 'moment';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { toast } from 'react-toastify';


class TicketConfirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrConfirm: [],
            detailBooking: {},
            isOpenModal: false,

        }
    }

    async componentDidMount() {
        let res = await getAllInfoUserConfirm();
        console.log('Huynh check state hàm confirm: ', res)
        if (res && res.error === 0) {
            this.setState({
                arrConfirm: res.data
            })
        }

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleDetailBooking = async (item) => {
        this.setState({
            isOpenModal: !this.state.isOpenModal
        })
        let detail = await getDetailBookingById(item);
        console.log('check detail booking wait: ', detail)
        if (detail && detail.eror == 0) {
            //console.log('Huynh check data from function handleDetailBooking:  ', detail.data);
            this.setState({
                detailBooking: detail.data
            })
            await getAllInfoUserConfirm();
        } else {
            toast.error('Error: ' + detail.message)
        }
    }

    handleOpenModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        })
    }

    handleCloseModal = () => {
        let { isOpenModal } = this.state;
        if (isOpenModal === true) {
            this.setState({
                isOpenModal: false,
            })
        }
    }

    render() {
        let { userInfo } = this.props;
        let { arrConfirm, detailBooking } = this.state;
        console.log('Huynh check state page confirm: ', this.state)

        return (
            <div
                style={{ color: 'black', height: '1000px' }}
            >
                <h1>Thông tin các vé đã xác nhận</h1>
                <table id="TableManageUser">
                    <tbody>
                        <tr>
                            <th>Full Name</th>
                            <th>Movie name</th>
                            <th colSpan={2}
                            >
                                <th>Information showtime</th>

                            </th>
                            <th>Image Payment</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>

                        {arrConfirm && arrConfirm.length > 0 &&
                            arrConfirm.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        {item && item.booking_user &&
                                            <td>{item.booking_user.fullName}</td>
                                        }
                                        {item && item.showtime_booking && item.showtime_booking.movie
                                            &&
                                            <td
                                            >{item.showtime_booking.movie.title}
                                            </td>
                                        }
                                        {item && item.showtime_booking &&
                                            <td>{moment(`${item.showtime_booking.date}`).format('DD/MM/YYYY')}</td>

                                        }
                                        <td>{item.showtime_booking.time}</td>


                                        <td
                                            className='preview-image'
                                            style={{
                                                backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/${item.image_payment})`
                                            }}
                                        ></td>
                                        <td>
                                            {moment(`${item.created_at}`).format('DD/MM/YYYY')}

                                        </td>
                                        {item.booking_allcode &&
                                            <td>
                                                {item.booking_allcode.valueVi}
                                            </td>
                                        }


                                        <td>
                                            <td
                                            >
                                                <i className="fas fa-check-circle" style={{ color: '#63E6BE' }}></i>{item.booking_allcode.valueVi}
                                            </td>
                                            &nbsp; &nbsp;
                                            <button
                                                className="btn btn-warning"
                                                style={{ width: '60px' }}

                                                onClick={() => this.handleDetailBooking(`${item.id}`)}
                                            >
                                                Detail
                                            </button>

                                        </td>
                                    </tr>
                                )

                            })
                        }


                    </tbody>
                </table>
                < Modal
                    //onClick={() => this.handleOpenModal()}
                    isOpen={this.state.isOpenModal}
                    // isOpen={this.handleOpenModal}
                    toggle={this.handleOpenModal}
                    // className={'modal-user-container'}
                    size="lg"
                    style={{ color: 'black' }}
                >
                    <ModalHeader toggle={() => { this.toggle() }}>Detail booking</ModalHeader>
                    <h3>Thông tin nhân viên duyệt đơn</h3>
                    {userInfo.roleId === 'R1' &&
                        <>
                            <h5 style={{ marginLeft: '20px' }}>ID:
                                <span>{userInfo.id}</span>
                            </h5>
                            <h5 style={{ marginLeft: '20px' }}>Họ và tên:
                                <span>{userInfo.fullName}</span>
                            </h5>

                        </>

                    }
                    <h5 style={{ marginLeft: '20px' }}>Ngày duyệt:
                        <span>
                            {moment(`${detailBooking.updated_at}`).format('DD/MM/YYYY')}
                        </span>
                    </h5>
                    <hr />
                    <ModalBody
                        style={{ display: 'flex', width: '100%', gap: '8px', fontFamily: 'sans-serif' }}
                    >



                        <div className='left'

                        >
                            <h3 style={{ textAlign: 'center' }}>Thông tin khách hàng</h3>
                            <h5>Họ và tên:
                                {detailBooking.booking_user &&
                                    <span> {detailBooking.booking_user.fullName}</span>
                                }
                            </h5>
                            <h5>Email:
                                {detailBooking.booking_user &&
                                    <span> {detailBooking.booking_user.email}</span>
                                }
                            </h5>
                            <h5>SDT:
                                {detailBooking.booking_user &&
                                    <span> {detailBooking.booking_user.phoneNumber}</span>
                                }
                            </h5>
                            <h5>Địa chỉ:
                                {detailBooking.booking_user &&
                                    <span> {detailBooking.booking_user.address}</span>
                                }
                            </h5>

                        </div>
                        <div className='right'
                        >
                            <h3 style={{ textAlign: 'center' }}>Thông tin vé</h3>
                            <h5>Tên phim:
                                {detailBooking.showtime_booking && detailBooking.showtime_booking.movie &&
                                    <span> {detailBooking.showtime_booking.movie.title}</span>
                                }
                            </h5>
                            <h5>Thể loại phim:
                                {detailBooking.showtime_booking && detailBooking.showtime_booking.movie
                                    &&
                                    detailBooking.showtime_booking.movie.associate_genre &&
                                    <span> {detailBooking.showtime_booking.movie.associate_genre.nameGenre}</span>
                                }
                            </h5>
                            <h5>Đạo diễn:
                                {detailBooking.showtime_booking && detailBooking.showtime_booking.movie &&
                                    <span> {detailBooking.showtime_booking.movie.director}</span>
                                }
                            </h5>
                            <h5>Thông tin suất chiếu:
                                <h5 style={{ marginLeft: '20px' }}>Suất chiếu:
                                    {detailBooking.showtime_booking &&
                                        <span> {detailBooking.showtime_booking.id}</span>
                                    }
                                </h5>
                                <h5 style={{ marginLeft: '20px' }}>Ngày:
                                    {detailBooking.showtime_booking &&

                                        <span>{moment(`${detailBooking.showtime_booking.date}`).format('DD/MM/YYYY')}</span>
                                    }
                                </h5>
                                <h5 style={{ marginLeft: '20px' }}>Thời gian:
                                    {detailBooking.showtime_booking &&
                                        <span>{detailBooking.showtime_booking.time}</span>
                                    }
                                </h5>
                                <h5 style={{ marginLeft: '20px' }}>Địa điểm:
                                    {detailBooking.showtime_booking && detailBooking.showtime_booking.location &&
                                        <span>{detailBooking.showtime_booking.location.valueVi}</span>
                                    }
                                </h5>
                            </h5>
                            <h5>Thông tin chỗ:
                                <h5 style={{ marginLeft: '20px' }}>Số ghế:
                                    {detailBooking.booking_seat &&
                                        <span> {detailBooking.booking_seat.id}</span>
                                    }
                                </h5>
                                <h5 style={{ marginLeft: '20px' }}>Loại ghế:
                                    {detailBooking.booking_seat && detailBooking.booking_seat.chair_allcodes &&
                                        <span>{detailBooking.booking_seat.chair_allcodes.valueVi}</span>
                                    }
                                </h5>
                                <h5 style={{ marginLeft: '20px' }}>Trạng thái:
                                    {detailBooking.booking_seat && detailBooking.booking_seat.status_seat_allcodes &&
                                        <span>{detailBooking.booking_seat.status_seat_allcodes.valueVi}</span>
                                    }
                                </h5>
                                <h5 style={{ marginLeft: '20px' }}>Giá:
                                    {detailBooking.booking_seat &&

                                        <span> {detailBooking.booking_seat.price}</span>
                                    }
                                </h5>

                                <h5 style={{ marginLeft: '20px' }}>Địa điểm:
                                    {detailBooking.showtime_booking && detailBooking.showtime_booking.location &&
                                        <span>{detailBooking.showtime_booking.location.valueVi}</span>
                                    }
                                </h5>
                            </h5>

                        </div>
                        <br />
                    </ModalBody>
                    <hr />
                    <h5
                        style={{ fontWeight: 'bold' }}
                    >Thông tin thanh toán</h5>
                    <h5
                        style={{ marginLeft: '20px' }}
                    >Hình ảnh thanh toán</h5>
                    <center
                    >
                        <div
                            className='preview-image'
                            style={{ backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/${detailBooking.image_payment})`, height: '200px', width: '200px' }} >
                        </div>
                    </center>

                    <h5
                        style={{ marginLeft: '20px' }}
                    >Ngày thanh toán:&nbsp;
                        <span>
                            {moment(`${detailBooking.created_at}`).format('DD/MM/YYYY')}
                        </span>
                    </h5>

                    <h5
                        style={{ marginLeft: '20px' }}
                    >Tổng tiền:&nbsp;
                        <span>
                            {detailBooking.totalPrice}
                        </span>
                    </h5>


                    <ModalFooter>
                        <Button

                            className='px-3' color="secondary" onClick={() => { this.handleOpenModal() }}>Close</Button>
                    </ModalFooter>
                </ Modal>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketConfirm);
