import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../utils';
import './scss/custom-style.scss';
import Footer from './Footer';
import { detailMovie, showAllShowtimeByMovieId } from '../../services/userService';
import Comment from './SocialPlugin/Comment';

class DetailMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            dataShowtime: [],
            groupedData: {},

        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id1 = this.props.match.params.id;
            console.log('huynh check id params for genre: ', id1)
            let res = await detailMovie(id1);
            if (res && res.error === 0) {
                this.setState({
                    detail: res.data
                })
            }
        }
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id1 = this.props.match.params.id;
            console.log('huynh check id params for genre 111111: ', id1)
            let res = await showAllShowtimeByMovieId(id1);
            if (res && res.error === 0) {
                this.setState({
                    dataShowtime: res.data
                })
            }
            //console.log('Huynh check all showtime by id movie', res)
        }

        // this.groupData();

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.userInfo !== this.props.userInfo) {
            this.setState({
                menuApp: this.props.userInfo
            })
        }

        if (this.props.userInfo === null) {
            this.props.history.push('/login');
        }
    }
    handleRedirectBooking = (idUser) => {
        //kiểm tra xem người dùng đã đăng nhập chưa. Nếu chưa thì thông báo vui lòng đăng nhập
        if (this.props.isLoggedIn === true) {
            if (this.props.history) {
                return this.props.history.push(`/booking-ticket/${idUser}`)
            }
        } else {
            alert('Vui lòng đăng nhập để thực hiện đặt vé!!!!')
        }
        //return this.props.history.push(`/booking-ticket/${idUser}`)

    }

    // groupData() {
    //     const { dataShowtime } = this.state;
    //     const groupedData = Object.fromEntries(
    //         dataShowtime.reduce((acc, item) => {
    //             const key = `${item.date}-${item.location_id}`;
    //             if (!acc[key]) {
    //                 acc[key] = [];
    //             }
    //             acc[key].push(item);
    //             return acc;
    //         }, {})
    //     );
    //     this.setState({ dataShowtime: groupedData });
    // }

    render() {
        let { language } = this.props;
        let { isLoggedIn } = this.props;
        let currentURL = "https://www.megagscinemas.vn/phim/phim-dien-anh-doraemon-nobita-va-ban-giao-huong-dia-cau/";
        let { detail, dataShowtime, groupedData } = this.state;
        console.log('Huynh check state: ', this.state)
        return (
            <>
                <div className='title'>
                    Detail Movie
                </div>
                <div id="mega-contents">
                    <div class="contents-page">
                        <div class="dt-title"
                            mvname="">
                            <h1>
                                {detail.title}
                            </h1>

                        </div>
                    </div>

                    <div class="movie-detail-wapper">

                        <div class="contents-page">

                            <div class="dt-contents">
                                <div class="dt-left clearfix">

                                    <div class="img-content">
                                        <div class="box">
                                            <div class="box-left">
                                                <p class="icon-detail-yell">Thời lượng: <span>
                                                    {detail.duration}
                                                </span></p>
                                                <p class="icon-detail-yell-2">Khởi chiếu: <span>
                                                    {detail.premiere_date}
                                                </span></p>
                                            </div>
                                            <div class="box-right">
                                                <p class="icon-detail-yell-1">Thể loại: <span>

                                                    {detail && detail.associate_genre
                                                        && language === LANGUAGES.VI && (
                                                            <span>
                                                                {detail.associate_genre.valueVi}
                                                            </span>
                                                        )}
                                                    {detail && detail.associate_genre
                                                        && language === LANGUAGES.EN && (
                                                            <span>
                                                                {detail.associate_genre.valueEn}
                                                            </span>
                                                        )}



                                                </span></p>
                                            </div>
                                        </div>
                                        <div class="box2">
                                            <p class="p-bold">Đạo diễn: <span>
                                                {detail.director}
                                            </span></p>
                                            <p class="p-bold">Diễn viên: <span>
                                                {detail.actor}
                                            </span></p>
                                        </div>
                                        <div class="clearfix"></div>

                                        <p class="p-bold">Phụ đề: <span>
                                            {detail.subtitle}
                                        </span></p>
                                        <br />
                                        <p class="p-bold"
                                        >Trạng thái:&nbsp;&nbsp;
                                            {detail && detail.status_movie &&
                                                <span>{detail.status_movie.valueVi}</span>
                                            }

                                        </p>
                                        <div class="clearfix"></div>
                                        <div class="dt-film-content scroll-detail clearfix">
                                            <p>
                                                <p><span>
                                                    {detail.preview}
                                                </span></p>

                                            </p>
                                        </div>
                                        <div class="dt-xh">
                                            <div class="addthis_sharing_toolbox"></div>
                                        </div>

                                    </div>
                                </div>
                                <div class="dt-right clearfix">
                                    <div class="vien-dt"></div>
                                    <div class="image">
                                        <a href="#">
                                            <img src={`${process.env.REACT_APP_BACKEND_URL}/${detail.image}`}
                                                alt=""
                                                width={720}
                                                height={405} />
                                            <a class="play-icon"
                                                href={`${detail.video}`}
                                                target='blank'
                                                pla
                                            >Trailer</a>

                                        </a>
                                    </div>


                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='comment'
                    style={{ margin: '40px 10px', backgroundColor: '#ddd', color: 'black' }}
                >
                    <h3>Comment</h3>
                    <hr style={{ width: '8%' }} />
                    <Comment
                        dataHref={currentURL}
                        width={"100%"}
                    />
                </div>
                {/* <div
                    className='showtime'
                >
                    dsadsad
                </div> */}

                {/* Gộp luôn thời gian và id */}
                {/* <div class="movie-schedule">
                    <h1>Lịch chiếu phim:  {detail.title}</h1>
                    {dataShowtime && dataShowtime.length > 0 &&
                        dataShowtime.map((item, index) => {
                            return (
                                <div class="daily-schedule"
                                    key={index}
                                >

                                    <div class="movie-listing">
                                        <h2>{item.date}</h2>
                                        <p>Showtime</p>
                                        <i className="far fa-hand-point-right" style={{ color: '#a703e2', fontSize: '30px' }}></i>&nbsp;
                                        {item.time && item.time.time && item.time.time.length > 0 &&

                                            item.time.time.map((time, idtime) => {
                                                console.log('Huynh check time, idtime: ', time, idtime)
                                                return (
                                                    <button
                                                        className='btn btn-warning time'
                                                        onClick={() => this.handleRedirectBooking(`${item}.${time}`)}
                                                    >
                                                        <span
                                                            key={idtime}
                                                        >
                                                            <p>
                                                                {time}
                                                            </p>

                                                        </span>
                                                    </button>
                                                )
                                            })

                                        }
                                    </div>

                                </div>
                            )
                        })
                    }

                </div> */}
                {/* <div class="daily-schedule">
                        <h2>Tuesday, May 28th</h2>
                        <div class="movie-listing">
                            <h3>Movie Title 3</h3>
                            <p>Showtime: 12:00 PM</p>
                        </div>
                        <div class="movie-listing">
                            <h3>Movie Title 4</h3>
                            <p>Showtime: 3:00 PM</p>
                        </div>
                    </div>

                    <div class="daily-schedule">
                        <h2>Monday, May 27th</h2>
                        <div class="movie-listing">
                            <h3>Movie Title 1</h3>
                            <p>Showtime: 10:00 AM</p>
                            <button
                                className='btn btn-warning time'
                            >
                                12h30 - 14h30
                            </button>
                            <button
                                className='btn btn-warning time'
                            >
                                12h30 - 14h30
                            </button>
                            <button
                                className='btn btn-warning time'
                            >
                                12h30 - 14h30
                            </button>
                            <button
                                className='btn btn-warning time'
                            >
                                12h30 - 14h30
                            </button>
                            <button
                                className='btn btn-warning time'
                            >
                                12h30 - 14h30
                            </button>
                            <button
                                className='btn btn-warning time'
                            >
                                12h30 - 14h30
                            </button>
                            <button
                                className='btn btn-warning time'
                            >
                                12h30 - 14h30
                            </button>
                            <button
                                className='btn btn-warning time'
                            >
                                12h30 - 14h30
                            </button>
                        </div>
                        <div class="movie-listing">
                            <h3>Movie Title 2</h3>
                            <p>Showtime: 1:00 PM</p>
                        </div>
                    </div>

                    <div class="daily-schedule">
                        <h2>Tuesday, May 29th</h2>
                        <div class="movie-listing">
                            <h3>Movie Title 3</h3>
                            <p>Showtime: 12:00 PM</p>
                        </div>
                        <div class="movie-listing">
                            <h3>Movie Title 4</h3>
                            <p>Showtime: 3:00 PM</p>
                        </div>
                    </div> */}

                {/* </div> */}


                <div class="movie-schedule">
                    <h1>Lịch chiếu phim:  {detail.title}</h1>
                    {dataShowtime && dataShowtime.length > 0 ?
                        dataShowtime.map((item, index) => {
                            return (
                                <div class="daily-schedule"
                                    key={index}
                                >

                                    <div class="movie-listing">

                                        <h2>{item.date}</h2>
                                        <p>Showtime</p>
                                        {item.location &&
                                            <p>{item.location.nameLocation}</p>
                                        }

                                        <i className="far fa-hand-point-right" style={{ color: '#a703e2', fontSize: '30px' }}></i>&nbsp;
                                        <button
                                            className='btn btn-warning time'
                                            onClick={() => this.handleRedirectBooking(item.id)}
                                        >
                                            {item.time}


                                        </button>
                                    </div>

                                </div>
                            )
                        })
                        :
                        <span
                            style={{ textAlign: 'center', fontWeight: 'bold', color: 'yellow' }}
                        >
                            Chưa có thông tin lịch chiếu cụ thể
                        </span>
                    }



                </div>
                {/* Footer */}
                <Footer />
            </>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailMovie);
