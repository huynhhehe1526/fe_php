import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../utils';
import './ListFirm.scss';
import './scss/Cool-Style.scss';
import LikeAndShare from '../HomePage/SocialPlugin/Like&Share';
import Footer from './Footer';
import { getMoviesByGenre } from '../../services/userService';
import * as actions from '../../store/actions';
import moment from 'moment';
import _ from 'lodash';

class ListFirm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listMovie: [],
            statusMovieArr: [],
            isSelect: 0,
            isStatus1: 0,
            sortBy: "asc",
            sortField: "title",
        }
    }

    async componentDidMount() {
        this.props.fetchAllStatusMovieRedux();

        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id1 = this.props.match.params.id;
            console.log('huynh check id params for genre: ', id1)
            let res = await getMoviesByGenre(id1);
            if (res && res.error === 0) {
                this.setState({
                    listMovie: res.data
                })
            }
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.statusMovieRedux !== this.props.statusMovieRedux) {
            let arrStatusMovie = this.props.statusMovieRedux;
            this.setState({
                statusMovieArr: arrStatusMovie,
                //statusId: arrStatusMovie && arrStatusMovie.length > 0 ? arrStatusMovie[0].keyMap : ''
            })
        }
    }

    handleRedirectDetail = (movieId) => {
        if (this.props.history) {
            return this.props.history.push(`/detail-movie/${movieId.id}`)
        }
    }
    handleSort = (sortBy, sortField) => {
        let { listMovie } = this.state;
        this.setState({
            sortBy: sortBy,
            sortField: sortField
        })

        let clonelistStory = _.cloneDeep(listMovie);
        clonelistStory = _.orderBy(clonelistStory, [sortField], [sortBy]);
        //console.log('Check sort by , sort field: ', sortBy, sortField)
        // console.log('Check sort clonelistStory: ', clonelistStory)
        this.setState({
            listMovie: clonelistStory
        })


    }

    render() {
        let currentURL = "https://www.megagscinemas.vn/phim/phim-dien-anh-doraemon-nobita-va-ban-giao-huong-dia-cau/";
        let { listMovie, arrStatusMovie } = this.state;
        let { language } = this.props;
        console.log('Huynh check state: ', this.state)
        return (
            <>
                <div className='title'
                    style={{ color: 'blue' }}
                >
                    List movie
                </div>
                <div class="dropdown"
                    style={{ float: 'right', margin: '20px' }}
                >
                    <button class="dropbtn">Sort</button>
                    <div class="dropdown-content">
                        <a href="#"
                            onClick={() => this.handleSort("asc", "title")}
                        >
                            Sort name by <i class="fa-solid fa-arrow-down-a-z"></i>
                        </a>
                        <a href="#"
                            onClick={() => this.handleSort("desc", "title")}
                        >
                            Sort name by <i class="fa-solid fa-arrow-up-a-z"></i>

                        </a>
                    </div>
                </div>


                {/* List Movie */}
                <div className="contents-page">
                    <div className="movie-title clearfix">
                        <div className="movie-repeat">
                            <div className="tab-movie">

                                <ul className="tab-movie-item nav nav-tabs" style={{ width: '40%' }}>
                                    {/* {arrStatusMovie && arrStatusMovie.length > 0 &&
                                        arrStatusMovie.map((item, index) => {
                                            console.log('Huynh check item, index: ', item, index)
                                            return (
                                                <li>
                                                    {item.valueVi}
                                                </li>
                                                // <ul className="tab-movie-item nav nav-tabs" style={{ width: '40%' }}
                                                //     key={index}
                                                // >
                                                //     <li className="active"
                                                //         onClick={() => this.handleViewStatusMovie()}

                                                //     >
                                                //         <a className="movie-custom-tab li-pdc" data-toggle="tab" href="#movie-dc-all">
                                                //             <img className="als" src="" alt="" />
                                                //             <span className="span-tab-all">{item.valueVi}</span>
                                                //         </a>
                                                //     </li>
                                                // </ul>
                                            )
                                        })
                                    } */}
                                    <li className="active"
                                        onClick={() => this.handleViewStatusMovie()}
                                    >
                                        <a className="movie-custom-tab li-pdc" data-toggle="tab" href="#movie-dc-all">
                                            <img className="als" src="" alt="" />
                                            <span className="span-tab-all">Phim Đang Chiếu</span>
                                        </a>
                                    </li>
                                    <li className='inactive'>
                                        <a className="movie-custom-tab li-psc" data-toggle="tab" href="#movie-sc-all">
                                            <img className="als" src="" alt="" />
                                            <span className="span-tab-all">Phim Sắp Chiếu</span>
                                        </a>
                                    </li>
                                </ul>

                                <div className="tab-content tab-content-custom">
                                    <div id="movie-dc-all-hot" style={{ display: 'block' }} className="movie-hot clearfix">
                                        {listMovie && listMovie.length > 0 && listMovie.map((item, index) => {
                                            return (
                                                <div className="list-items" key={index}>
                                                    <div className="item-left"
                                                        onClick={() => this.handleRedirectDetail(item)}
                                                    >
                                                        <div className="episode-all" style={{ display: 'block' }}>
                                                            {/* <p>24</p> */}
                                                            <p>
                                                                {moment(`${item.premiere_date}`).format('DD')}
                                                            </p>
                                                            <p className="custom-p">
                                                                {moment(`${item.premiere_date}`).format('MM')}
                                                            </p>
                                                        </div>
                                                        <a

                                                        >
                                                            <img
                                                                className="bg-new-only"
                                                                src={`${process.env.REACT_APP_BACKEND_URL}/${item.image}`}
                                                                width="248px"
                                                                height="356px"
                                                            />
                                                        </a>
                                                    </div>
                                                    <div className="item-right">
                                                        <a href="/phim/phim-dien-anh-doraemon-nobita-va-ban-giao-huong-dia-cau/">
                                                            <h4> {item.title}</h4>
                                                        </a>
                                                        <p className="icon-clock">
                                                            <i class="fas fa-clock"></i>&nbsp;&nbsp;Thời lượng: <span>{item.duration}</span>
                                                        </p>
                                                        <p className="icon-type">
                                                            <i class="fas fa-book"></i>&nbsp;&nbsp;Thể loại: <span> {language === LANGUAGES.VI ? `${item.associate_genre.valueVi}` : `${item.associate_genre.valueEn}`} </span>
                                                        </p>
                                                        <p className="icon-calendar">
                                                            <i class="fas fa-calendar-check"></i>&nbsp;&nbsp;Khởi chiếu: <span>{item.premiere_date} </span>
                                                        </p>
                                                        <div className="movie-2d">
                                                            <a href="#">
                                                                <span>2D</span>
                                                            </a>
                                                            <a href="#">
                                                                <span>P</span>
                                                            </a>
                                                        </div>
                                                        <p>Đạo diễn: <span>{item.director} </span></p>
                                                        <p>Diễn viên: <span>{item.actor}</span></p>
                                                        <p>Phụ đề: {item.subtitle}<span></span></p>
                                                        <div className="movie-tool">
                                                            <div className="trailer">
                                                                <a className="open-popup-youtube" href={`${item.video}`}>
                                                                    <div>
                                                                        <i className="fa fa-play"></i>
                                                                    </div>
                                                                    <a className='trailer'
                                                                        style={{ border: 'none' }}
                                                                    >Trailer</a>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="like-face" style={{ zIndex: '999' }}>
                                                            <div className="fb-like">
                                                                <LikeAndShare
                                                                    dataHref={currentURL}
                                                                />
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                        {/* <div class="list-items">
                                            <div class="item-left">
                                                <div class="episode-all" style={{ display: 'block' }}>
                                                    <p>17</p>
                                                    <p class="custom-p">05</p>
                                                </div>
                                                <a href="/phim/an-mang-lau-4/">

                                                    <img class="bg-new-only"
                                                        src="https://cms.megagscinemas.vn//media/77285/700x1000-aml4.jpg?width=248&height=356"
                                                        width="248px" height="356px" />
                                                </a>

                                            </div>
                                            <div class="item-right">
                                                <a href="/phim/an-mang-lau-4/">
                                                    <h4>ÁN MẠNG LẦU 4 </h4>

                                                    <p>AN MANG LAU 4 [NC16]</p>

                                                </a>
                                                <p class="icon-clock">Thời lượng: <span>107 phút</span></p>
                                                <p class="icon-type">Thể loại: <span>Kinh dị </span></p>
                                                <p class="icon-calendar">Khởi chiếu: <span>17/05/2024 </span>
                                                </p>
                                                <div class="movie-2d">
                                                    <a href='#'><span>2D</span></a><a
                                                        href='#'><span>T16</span></a>
                                                </div>
                                                <p>Đạo diễn: <span>Nguyễn Hữu Tuấn </span></p>
                                                <p>Diễn viên: <span>Lương Bích Hữu, Trương Thế Vinh </span></p>
                                                <p>Ngôn ngữ: <span>Tiếng Việt, Phụ đề Tiếng Anh </span></p>
                                                <div class="movie-tool">

                                                    <div class="trailer">
                                                        <a class="open-popup-youtube" href="javascript:void(0)"
                                                            data-youtube-id="AOVoR8ZP6tg">
                                                            <div><i class="fa fa-play"></i></div>
                                                            <div>Trailer</div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="like-face" style={{ zIndex: '999' }}>
                                                    <div className="fb-like">
                                                        <LikeAndShare
                                                            dataHref={currentURL}
                                                        />
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div class="list-items">
                                            <div class="item-left">
                                                <div class="episode-all" style={{ display: 'block' }}>
                                                    <p>17</p>
                                                    <p class="custom-p">05</p>
                                                </div>
                                                <a href="/phim/an-mang-lau-4/">

                                                    <img class="bg-new-only"
                                                        src="https://cms.megagscinemas.vn//media/77285/700x1000-aml4.jpg?width=248&height=356"
                                                        width="248px" height="356px" />
                                                </a>

                                            </div>
                                            <div class="item-right">
                                                <a href="/phim/an-mang-lau-4/">
                                                    <h4>ÁN MẠNG LẦU 4 </h4>

                                                    <p>AN MANG LAU 4 [NC16]</p>

                                                </a>
                                                <p class="icon-clock">Thời lượng: <span>107 phút</span></p>
                                                <p class="icon-type">Thể loại: <span>Kinh dị </span></p>
                                                <p class="icon-calendar">Khởi chiếu: <span>17/05/2024 </span>
                                                </p>
                                                <div class="movie-2d">
                                                    <a href='#'><span>2D</span></a><a
                                                        href='#'><span>T16</span></a>
                                                </div>
                                                <p>Đạo diễn: <span>Nguyễn Hữu Tuấn </span></p>
                                                <p>Diễn viên: <span>Lương Bích Hữu, Trương Thế Vinh </span></p>
                                                <p>Ngôn ngữ: <span>Tiếng Việt, Phụ đề Tiếng Anh </span></p>
                                                <div class="movie-tool">

                                                    <div class="trailer">
                                                        <a class="open-popup-youtube" href="javascript:void(0)"
                                                            data-youtube-id="AOVoR8ZP6tg">
                                                            <div><i class="fa fa-play"></i></div>
                                                            <div>Trailer</div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="like-face" style={{ zIndex: '999' }}>
                                                    <div className="fb-like">
                                                        <LikeAndShare
                                                            dataHref={currentURL}
                                                        />
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div class="list-items">
                                            <div class="item-left">
                                                <div class="episode-all" style={{ display: 'block' }}>
                                                    <p>17</p>
                                                    <p class="custom-p">05</p>
                                                </div>
                                                <a href="/phim/an-mang-lau-4/">

                                                    <img class="bg-new-only"
                                                        src="https://cms.megagscinemas.vn//media/77285/700x1000-aml4.jpg?width=248&height=356"
                                                        width="248px" height="356px" />
                                                </a>

                                            </div>
                                            <div class="item-right">
                                                <a href="/phim/an-mang-lau-4/">
                                                    <h4>ÁN MẠNG LẦU 4 </h4>

                                                    <p>AN MANG LAU 4 [NC16]</p>

                                                </a>
                                                <p class="icon-clock">Thời lượng: <span>107 phút</span></p>
                                                <p class="icon-type">Thể loại: <span>Kinh dị </span></p>
                                                <p class="icon-calendar">Khởi chiếu: <span>17/05/2024 </span>
                                                </p>
                                                <div class="movie-2d">
                                                    <a href='#'><span>2D</span></a><a
                                                        href='#'><span>T16</span></a>
                                                </div>
                                                <p>Đạo diễn: <span>Nguyễn Hữu Tuấn </span></p>
                                                <p>Diễn viên: <span>Lương Bích Hữu, Trương Thế Vinh </span></p>
                                                <p>Ngôn ngữ: <span>Tiếng Việt, Phụ đề Tiếng Anh </span></p>
                                                <div class="movie-tool">

                                                    <div class="trailer">
                                                        <a class="open-popup-youtube" href="javascript:void(0)"
                                                            data-youtube-id="AOVoR8ZP6tg">
                                                            <div><i class="fa fa-play"></i></div>
                                                            <div>Trailer</div>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="like-face" style={{ zIndex: '999' }}>
                                                    <div className="fb-like">
                                                        <LikeAndShare
                                                            dataHref={currentURL}
                                                        />
                                                    </div>

                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <Footer />

            </>


        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        statusMovieRedux: state.admin.statusMovie,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllStatusMovieRedux: () => dispatch(actions.fetchStatusmovieStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListFirm);
