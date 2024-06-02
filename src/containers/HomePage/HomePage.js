import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomePage.scss';
import HomeHeader from './HomeHeader';
import Footer from './Footer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { hienthi } from '../../services/userService';


class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hi: ''
        }
    }
    componentDidMount() {

    }
    handleHienthi = () => {
        if (this.props.history.push) {
            return this.props.history.push('/list-movie');
        }

    }

    render() {
        let settings = {
            dots: false,
            infinite: false,//vô hạn
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            // slickGoTo: this.handleAfterChange
        };
        let { hi } = this.state;
        console.log('Huynh check state: ', this.state)


        return (
            <React.Fragment>
                {/* <button className='btn btn-danger'
                    onClick={() => this.handleHienthi()}
                >
                    Hiển thị
                </button>
                {hi &&
                    <span
                        style={{ display: 'block' }}
                    >
                        {hi}
                    </span>} */}
                <HomeHeader
                    settings={settings}
                />
                <Footer />
                <div style={{ height: '500px' }}>

                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
