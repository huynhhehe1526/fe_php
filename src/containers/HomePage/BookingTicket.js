import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../utils';
import './BookingTicket.scss';
import { getAllSeat, paymentBooking, showDetailShowtimeById } from '../../services/userService';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import momo from '../../assets/images/image_bank/bank_momo.jpg';
import mb from '../../assets/images/image_bank/bank_mb.jpg';
import agri from '../../assets/images/image_bank/bank_agri.jpg';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import '../System/Admin/MovieRedux.scss';
import { toast } from 'react-toastify';
import Footer from './Footer';
class BookingTicket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showtimeId: '',
            seatArr: [],
            isChoose: false,
            price: '',
            seatId: '',
            detailShowtime: {},
            isOpenModal: false,
            time: 600,
            isChoosebank: 0,
            namebank: '',
            image: '',
            preview: '',
            previewImgUrl: '',
            isOpen: false,
            image: '',
            userId: ''
        }
    }

    async componentDidMount() {
        let res = await getAllSeat();
        console.log('Huynh check hàm getAllSeat: ', res)
        if (res && res.error === 0) {
            this.setState({
                seatArr: res.data
            })
        }
        //get showtime by id
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id1 = this.props.match.params.id;
            //let userId = this.props.userInfo.id;
            let showtime = await showDetailShowtimeById(id1);
            console.log('lay id showtime: ', showtime)
            if (showtime && showtime.error === 0) {
                this.setState({
                    showtimeId: showtime.data.id,
                    userId: this.props.userInfo.id,
                    detailShowtime: showtime.data
                })
            }
        }

        //thời gian đếm ngược
        this.countdown = setInterval(() => {
            this.setState(prevState => ({
                time: prevState.time - 1
            }));
        }, 1000);




    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.time === 0) {
            return this.props.history.push('/home') // Thay đổi đường dẫn đến trang khác ở đây
        }
    }
    componentWillUnmount() {
        clearInterval(this.countdown);
    }

    handleChooseSeat = (item) => {

        this.setState({
            isChoose: true,
            seatId: item.id,
            price: item.price
        })
    }

    handleOpenModal = (iconNumber) => {
        console.log('check icon number:', iconNumber)
        this.setState({
            isOpenModal: !this.state.isOpenModal,
            isChoosebank: iconNumber
        })
    }

    handleCloseModal = () => {
        let { isOpenModal } = this.state;
        if (isOpenModal === true) {
            this.setState({
                isOpenModal: false,
                isChoosebank: 0
            })
        }
    }

    handleClickBank = (iconNumber) => {
        this.setState({ isChoosebank: iconNumber });
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

    handlePaymentBooking = async () => {
        let { userId, showtimeId, seatId, image } = this.state;

        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('showtimeId', showtimeId);
        formData.append('seatId', seatId);
        formData.append('image_payment', image);
        let res1 = await paymentBooking(formData);
        console.log('huynh check res 1 paymentboooking: ', res1)
        // return;

        if (res1 && res1.error == 0) {
            toast.success('' + res1.message)
            this.setState({
                seatId: '',
                image: '',
                price: '',
                isChoose: false,
                previewImgUrl: ''
            })
            await getAllSeat();

        } else {
            toast.error('' + res1.message)
        }
    }

    render() {
        const minutes = Math.floor(this.state.time / 60);
        const seconds = this.state.time % 60;
        let { userInfo, language } = this.props;
        let { seatArr, isChoose, seatId, price, detailShowtime, isChoosebank } = this.state;
        console.log('huynh check state bên booking ticket: ', this.state);
        return (
            <>
                <button
                    className='btn btn-primary'
                    onClick={() => this.handleOpenModal()}
                >
                    click xem thay đổi
                </button>
                <h2>Props user: {userInfo.id}</h2>
                <h1>Chọn vị trí</h1>
                <div class="containers">


                    <div class="time-remaining">
                        <h1 className='title-movie'>
                            {detailShowtime && detailShowtime.movie &&
                                <span>Phim: {detailShowtime.movie.title}</span>
                            }
                        </h1>


                        <span className="time-remaining-value">
                            <span>Thời gian đặt vé còn lại</span>
                            <p>{`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}</p>
                        </span>
                        <span className='detail-ticket'>
                            <h4>Thông tin chi tiết vé</h4>
                            <span className='detail'>
                                {/* Thể loại*/}
                                {detailShowtime && detailShowtime.movie &&
                                    detailShowtime.movie.associate_genre && language === LANGUAGES.VI &&
                                    <span>Thể loại: {detailShowtime.movie.associate_genre.valueVi}</span>
                                }
                                {detailShowtime && detailShowtime.movie &&
                                    detailShowtime.movie.associate_genre && language === LANGUAGES.EN &&
                                    <span>Thể loại: {detailShowtime.movie.associate_genre.valueEn}</span>
                                }
                                {/* Địa điểm */}
                                {detailShowtime && detailShowtime.location && language === LANGUAGES.VI &&
                                    <span>Địa điểm: {detailShowtime.location.valueVi}</span>
                                }

                                {detailShowtime && detailShowtime.location && language === LANGUAGES.EN &&
                                    <span>Địa điểm: {detailShowtime.location.valueEn}</span>
                                }
                                <span>Khung giờ chiếu: {detailShowtime.time}</span>
                                <span>Ngày chiếu: {detailShowtime.date}</span>
                            </span>
                            <h4>Số ghế chọn: {seatId}</h4>
                            <h4>Tổng tiền: {price}</h4>

                        </span>


                        <span>
                            Chọn ngân hàng thanh toán&nbsp;&nbsp;<i className="far fa-hand-point-down" style={{ color: '#b80000' }}></i>
                        </span>

                        <div
                            className='icon-payment'
                        >
                            <div className='icon-momo'
                                // onClick={() => this.handleClickBank(1)}
                                onClick={() => this.handleOpenModal(1)}
                            >
                                <span className='name-bank'>Momo</span>
                            </div>
                            <div className='icon-mb'
                                onClick={() => this.handleOpenModal(2)}
                            >
                                <span className='name-bank'>Mb bank</span>
                            </div>
                            <div className='icon-agri'
                                onClick={() => this.handleOpenModal(3)}
                            >
                                <span className='name-bank'>Agribank</span>
                            </div>
                        </div>
                    </div>
                    <div class="seats">
                        <div class="row">
                            {seatArr && seatArr.length > 0 &&
                                seatArr.map((item, index) => {
                                    return (

                                        <>
                                            {item.chairId === 'G1' && item.statusSeat === 'SC1' &&
                                                < div class="seat" key={index}
                                                    style={{ backgroundColor: '#ff9b00' }}
                                                    onClick={() => this.handleChooseSeat(item)}
                                                >
                                                    {item.id}
                                                </ div>

                                            }
                                            {item.chairId === 'G2' && item.statusSeat === 'SC1' &&
                                                < div class="seat" key={index}
                                                    style={{ backgroundColor: '#00ffd2c2' }}
                                                    onClick={() => this.handleChooseSeat(item)}
                                                >
                                                    {item.id}
                                                </div>

                                            }

                                        </>

                                    )

                                })
                            }

                            {isChoose === true ?
                                <div class="seat"
                                    style={{ backgroundColor: 'gray' }}
                                >
                                    {seatId}
                                </div>
                                :
                                ''
                            }
                        </div>

                        <div className='note'>
                            <h3>Vui lòng chọn vị trí ghế</h3>
                            <div className='left'>
                                <span >
                                    <i className="fa-solid fa-square" style={{ color: '#ff9b00' }}></i>
                                    Ghế Vip
                                </span>
                                <span >
                                    <i className="fa-solid fa-square" style={{ color: '#00ffd2c2' }}></i>
                                    Ghế Thường
                                </span>
                                <span >
                                    <i className="fa-solid fa-square" style={{ color: 'gray' }}></i>
                                    Ghế của bạn
                                </span>
                            </div>
                        </div>
                    </div >
                </div >


                {/* modal */}

                {isChoosebank === 1 ?
                    // momo
                    < Modal
                        //onClick={() => this.handleOpenModal()}
                        isOpen={this.state.isOpenModal}
                        // isOpen={this.handleOpenModal}
                        toggle={this.handleOpenModal}
                        // className={'modal-user-container'}
                        size="lg"
                        style={{ color: 'black' }}
                    >
                        <ModalHeader toggle={() => { this.toggle() }}>Payment</ModalHeader>
                        <ModalBody

                        >
                            <h1>Thanh toán bằng tài khoản Momo</h1>
                            <span style={{ color: 'red', fontSize: '16px' }}>
                                Vui lòng quét mã bên dưới để thanh toán
                            </span>
                            <div className='image_bank'>
                                <img src={momo} />
                            </div>

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
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                        onClick={() => this.openPreviewImage()}
                                    >

                                    </div>
                                </div>

                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                className='px-3'
                                color="primary"
                                onClick={() => { this.handlePaymentBooking() }}
                            > Payment
                            </Button>
                            <Button className='px-3' color="secondary" onClick={() => { this.handleCloseModal() }}>Close</Button>
                        </ModalFooter>
                    </ Modal>
                    :
                    isChoosebank === 2 ?
                        //mb
                        < Modal
                            //onClick={() => this.handleOpenModal()}
                            isOpen={this.state.isOpenModal}
                            // isOpen={this.handleOpenModal}
                            toggle={this.handleOpenModal}
                            // className={'modal-user-container'}
                            size="lg"
                            style={{ color: 'black' }}
                        >
                            <ModalHeader toggle={() => { this.toggle() }}>Payment</ModalHeader>
                            <ModalBody

                            >
                                <h1>Thanh toán bằng tài khoản Mb</h1>
                                <span style={{ color: 'red', fontSize: '16px' }}>
                                    Vui lòng quét mã bên dưới để thanh toán
                                </span>
                                <div className='image_bank'>
                                    <img src={mb} />
                                </div>

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
                                        <div className='preview-image'
                                            style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                            onClick={() => this.openPreviewImage()}
                                        >

                                        </div>
                                    </div>

                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    className='px-3'
                                    color="primary"
                                    onClick={() => { this.handlePaymentBooking() }}
                                > Payment
                                </Button>
                                <Button className='px-3' color="secondary" onClick={() => { this.handleOpenModal() }}>Close</Button>
                            </ModalFooter>
                        </ Modal>
                        : isChoosebank === 3 &&
                        //agri
                        < Modal
                            //onClick={() => this.handleOpenModal()}
                            isOpen={this.state.isOpenModal}
                            // isOpen={this.handleOpenModal}
                            toggle={this.handleOpenModal}
                            // className={'modal-user-container'}
                            size="lg"
                            style={{ color: 'black' }}
                        >
                            <ModalHeader toggle={() => { this.toggle() }}>Payment</ModalHeader>
                            <ModalBody

                            >
                                <h1>Thanh toán bằng tài khoản Agribank</h1>
                                <span style={{ color: 'red', fontSize: '16px' }}>
                                    Vui lòng quét mã bên dưới để thanh toán
                                </span>
                                <div className='image_bank'>
                                    <img src={agri} />
                                </div>

                                <div className='col-6'>
                                    <label>
                                        Image payment
                                    </label>
                                    <div className='preview-img-container'>
                                        <input id="previewImg" type='file' hidden
                                            onChange={(event) => this.handleOnchangeimage(event)}

                                        />
                                        <label className='label-upload' htmlFor='previewImg'>
                                            <FormattedMessage id="manage-user.upload-image" /> <i className="fas fa-upload"></i>
                                        </label>
                                        <div className='preview-image'
                                            style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                            onClick={() => this.openPreviewImage()}
                                        >

                                        </div>
                                    </div>

                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    className='px-3'
                                    color="primary"
                                    onClick={() => { this.handlePaymentBooking() }}
                                > Payment
                                </Button>
                                <Button

                                    className='px-3' color="secondary" onClick={() => { this.handleOpenModal() }}>Close</Button>
                            </ModalFooter>
                        </ Modal>

                }
                {/* {this.state.isOpen === true &&
                    <Lightbox
                        style={{ zIndex: '100000' }}
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                } */}
                <Footer />
            </>



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

export default connect(mapStateToProps, mapDispatchToProps)(BookingTicket);
