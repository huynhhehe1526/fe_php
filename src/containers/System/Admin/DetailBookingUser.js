import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import { getInforBookingUser } from '../../../services/userService';
import './TicketWait.scss';
import moment from 'moment';

class DetailBookingUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDetailBooking: []
        }
    }

    async componentDidMount() {
        let id = this.props.userInfo.id;
        let res = await getInforBookingUser(id);
        //console.log('Huynh check đơn hàng chi tiết: ', res)
        if (res && res.error === 0) {
            this.setState({
                arrDetailBooking: res.data
            })
        }

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        let { arrDetailBooking } = this.state;
        console.log('huynh check state: ', this.state)
        return (
            <div
                style={{ color: 'black', height: '1000px' }}
            >
                <h1>Thông tin chi tiết đơn đặt vé</h1>
                {arrDetailBooking && arrDetailBooking.length > 0 &&
                    arrDetailBooking.map((item, index) => {
                        return (
                            <div key={index}
                                style={{ margin: '20px 50px' }}
                            >
                                <h5 style={{ marginLeft: '20px' }}>Đơn đặt vé:&nbsp;
                                    <span >
                                        {item.id}
                                    </span>
                                </h5>
                                <h5 style={{ marginLeft: '20px' }}>Ngày duyệt:&nbsp;
                                    <span>
                                        {moment(`${item.updated_at}`).format('DD/MM/YYYY')}
                                    </span>
                                </h5>
                                <hr />
                                <div
                                    style={{ gap: '10px', height: 'auto' }}
                                >

                                    <div className='left'
                                        
                                    >
                                    <h3 style={{ textAlign: 'center', paddingLeft: '20px' }}>Thông tin khách hàng</h3>
                                    <h5>Họ và tên:
                                        {item.booking_user &&
                                            <span> {item.booking_user.fullName}</span>
                                        }
                                    </h5>
                                    <h5>Email:
                                        {item.booking_user &&
                                            <span> {item.booking_user.email}</span>
                                        }
                                    </h5>
                                    <h5>SDT:
                                        {item.booking_user &&
                                            <span> {item.booking_user.phoneNumber}</span>
                                        }
                                    </h5>
                                    <h5>Địa chỉ:
                                        {item.booking_user &&
                                            <span> {item.booking_user.address}</span>
                                        }
                                    </h5>

                                </div>
                                <div className='right'
                                >
                                    <h3 style={{ textAlign: 'center', paddingLeft: '20px' }}>Thông tin vé</h3>
                                    <h5>Tên phim:
                                        {item.showtime_booking && item.showtime_booking.movie &&
                                            <span> {item.showtime_booking.movie.title}</span>
                                        }
                                    </h5>
                                    <h5>Thể loại phim:
                                        {item.showtime_booking && item.showtime_booking.movie
                                            &&
                                            item.showtime_booking.movie.associate_genre &&
                                            <span> {item.showtime_booking.movie.associate_genre.nameGenre}</span>
                                        }
                                    </h5>
                                    <h5>Đạo diễn:
                                        {item.showtime_booking && item.showtime_booking.movie &&
                                            <span> {item.showtime_booking.movie.director}</span>
                                        }
                                    </h5>
                                    <h5>Thông tin suất chiếu:
                                        <h5 style={{ marginLeft: '20px' }}>Suất chiếu:
                                            {item.showtime_booking &&
                                                <span> {item.showtime_booking.id}</span>
                                            }
                                        </h5>
                                        <h5 style={{ marginLeft: '20px' }}>Ngày:
                                            {item.showtime_booking &&

                                                <span>{moment(`${item.showtime_booking.date}`).format('DD/MM/YYYY')}</span>
                                            }
                                        </h5>
                                        <h5 style={{ marginLeft: '20px' }}>Thời gian:
                                            {item.showtime_booking &&
                                                <span>{item.showtime_booking.time}</span>
                                            }
                                        </h5>
                                        <h5 style={{ marginLeft: '20px' }}>Địa điểm:
                                            {item.showtime_booking && item.showtime_booking.location &&
                                                <span>{item.showtime_booking.location.valueVi}</span>
                                            }
                                        </h5>
                                    </h5>
                                    <h5>Thông tin chỗ:
                                        <h5 style={{ marginLeft: '20px' }}>Số ghế:
                                            {item.booking_seat &&
                                                <span> {item.booking_seat.id}</span>
                                            }
                                        </h5>
                                        <h5 style={{ marginLeft: '20px' }}>Loại ghế:
                                            {item.booking_seat && item.booking_seat.chair_allcodes &&
                                                <span>{item.booking_seat.chair_allcodes.valueVi}</span>
                                            }
                                        </h5>
                                        <h5 style={{ marginLeft: '20px' }}>Trạng thái:
                                            {item.booking_seat && item.booking_seat.status_seat_allcodes &&
                                                <span>{item.booking_seat.status_seat_allcodes.valueVi}</span>
                                            }
                                        </h5>
                                        <h5 style={{ marginLeft: '20px' }}>Giá:
                                            {item.booking_seat &&

                                                <span> {item.booking_seat.price}</span>
                                            }
                                        </h5>

                                        <h5 style={{ marginLeft: '20px' }}>Địa điểm:
                                            {item.showtime_booking && item.showtime_booking.location &&
                                                <span>{item.showtime_booking.location.valueVi}</span>
                                            }
                                        </h5>
                                    </h5>
                                </div>

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
                                        style={{ backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/${item.image_payment})`, height: '200px', width: '200px' }} >
                                    </div>
                                </center>

                                <h5
                                    style={{ marginLeft: '20px' }}
                                >Ngày thanh toán:&nbsp;
                                    <span>
                                        {moment(`${item.created_at}`).format('DD/MM/YYYY')}
                                    </span>
                                </h5>

                                <h5
                                    style={{ marginLeft: '20px' }}
                                >Tổng tiền:&nbsp;
                                    <span>
                                        {item.totalPrice}
                                    </span>
                                </h5>
                            </div>


                                {/* right */ }



                            </div>



        )
    })
}

            </div >

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailBookingUser);
