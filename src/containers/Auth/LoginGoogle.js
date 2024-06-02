import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../utils';
import GoogleLogin from 'react-google-login';
const clientid = "755876977179-1brhli5uv094fiis2j9hqdufc8j5kp99.apps.googleusercontent.com";
const gapi = window.gapi;

class LoginGoogle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            name: ''
        }
    }

    async componentDidMount() {
        window.gapi.load('auth2', () => {
            window.gapi.auth2.init({
                clientid: clientid,
                scope: ''
            });
        });
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {

    }
    onSuccess = (res) => {
        this.setState({
            name: res.profileObj,
            flag: true
        })
        console.log('Check succcess login: ', res.profileObj)
        return this.props.history.push('/home')
    }
    onFailure = (res) => {
        console.log('Failed: ', res)
        return this.props.history.push('/home')
    }

    render() {

        return (
            <div >
                <GoogleLogin
                    clientId={clientid}
                    onSuccess={this.onSuccess}
                    onFailure={this.onFailure}
                    buttonText='Login with google'
                    cookiePolicy={"single_host_origin"}
                    isSignedIn={false}
                />
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginGoogle);
