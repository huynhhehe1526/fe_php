import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import userIcon from '../../../src/assets/images/user.svg';
import passIcon from '../../../src/assets/images/pass.svg';
import './Register.scss';
import { FormattedMessage } from 'react-intl';
import adminService from '../../services/adminService';
import { method, values } from 'lodash';
import Validation from './Validation';
import { toast } from "react-toastify";
import { register } from '../../services/userService';
import storage from 'redux-persist/lib/storage';
const url = require('url');

class Register extends Component {
    constructor(props) {//đây là một hàm tạo (constructor)
        super(props);//khi khai báo như thế này thì khi có đường truyền props xuống thì nó sẽ chạy được
        //cần khai báo
        //props
        this.state = {
            values: {
                userName: '',
                password: '',
                fullName: '',
                email: '',
                address: '',
                phoneNumber: '',
                roleId: 'R3'

            },
            roleId: '',
            isShowPassword: false,
            errMessage: '',
            errors: {}
        }
    }
    componentDidMount() {
        console.log('Check thử data: ', localStorage.getItem("user_info"))
        console.log('Huynh check storage: ', storage.getItem('persist:user'))

        if (localStorage.getItem('user_info')) {
            console.log('Check thử data: ', localStorage.getItem("user_info"))
            this.props.history.push('/login')

        }

    }

    handleKeyDown = (event) => {
        console.log('huynh check key down: ', event);
        if (event.key === 'Enter' || event.keyCode === 13) {
            this.handleRegister();
        }
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['userName', 'password', 'fullName', 'email', 'address', 'phoneNumber']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state.values[arrCheck[i]]) {
                isValid = false;
                toast.info('Missing input is required: ' + arrCheck[i])
                break;
            }
        }
        return isValid
    }

    handleRegister = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) {
            return;
        } else {
            const validation = new Validation();
            const errors = validation.render(this.state.values);
            console.log('Huynh check errors ', errors)
            console.log('Huynh check errors ', Object.keys(errors).length)
            if (Object.keys(errors).length === 1 || Object.keys(errors).length === 0) {
                let { userName, password, fullName, email, address, phoneNumber, roleId } = this.state.values;
                console.warn('Huynh check state values nè: ', this.state.values)

                // let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/register`, {
                //     method: 'POST',
                //     body: JSON.stringify(this.state.values),
                //     headers: {
                //         "Content-Type": 'application/json',
                //         "Accept": 'application/json'
                //     }
                // })
                // //console.log('huynh check result đợt 1: ', result)

                // result = await result.json();
                // localStorage.setItem("user_info", JSON.stringify(result))
                let res = await register({
                    userName: this.state.values.userName,
                    password: this.state.values.password,
                    fullName: this.state.values.fullName,
                    email: this.state.values.email,
                    address: this.state.values.address,
                    phoneNumber: this.state.values.phoneNumber,
                    roleId: 'R3'
                })
                console.log('Check thử data nhập nè: ', res)

                this.props.history.push('/login');
            } else {
                this.setState({ errors });
            }
        }

        // let endpoint = fetch(register()).then(response => {
        //     console.log('Huynh check response: ', response)
        //     return response.json();

        // }).then(data => {
        //     // Xử lý dữ liệu JSON ở đây
        //     localStorage.setItem("user_info", JSON.stringify(data));
        //     // Điều hướng đến '/login'
        //     this.props.history.push('/login');
        // });

        // fetch(register())

        //     .then(response => response.json())

        //     .then(() => {
        //         console.log('check thử urL: ', register().url)
        //         let url = `${register().baseURL}${register().url}`; // Tạo URL mới từ hàm register()
        //         console.log('check thử url neffffff: ', url)
        //         fetch(url, {
        //             method: 'POST',
        //             body: JSON.stringify(this.state.values),
        //             headers: {
        //                 "Content-Type": 'application/json',
        //                 "Accept": 'application/json'
        //             }
        //         })
        //             .then(result => {
        //                 console.log('huynh check result đợt 1: ', result); // Xử lý kết quả fetch ở đây
        //                 return result.json();
        //             })
        //             .then(result => {
        //                 localStorage.setItem("user_info", JSON.stringify(result));
        //                 this.props.history.push('/login'); // Điều hướng đến '/login' khi hoàn thành
        //             });
        //     });



        // console.warn('result: ', result)
        // console.log('huynh check result: ', result)
    }


    OnChangeInput = (event, id) => {
        this.setState({
            values: {
                ...this.state.values,
                [id]: event.target.value
            }
        });
    }



    handleValidateForm = (event) => {
        event.preventDefault();
        const validation = new Validation();
        const errors = validation.render(this.state.values); // Pass the form values for validation
        this.setState({ errors }); // Update the errors in the state


    }

    hanldeShowHidePassWord = () => {
        //chỉnh lại
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }


    render() {
        console.log('Huynh check state: ', this.state);
        console.log('Huynh check props: isRegister ', this.props.isRegister)
        let { errors } = this.state;
        let { email, password, phoneNumber, address, userName, fullName, roleId, loginError } = this.state.values;
        const { lang } = this.props;

        return (
            <div className="register-background">
                <div className="register-container">
                    <form
                        onSubmit={(event) => this.handleValidateForm(event)}
                    >
                        <div className="register-content">
                            <div className="col-12 text-register">Register</div>
                            <div className='col-12' style={{ display: 'flex', marginRight: '40px' }}>
                                <div className="col-6 form-group register-input">
                                    <label>Username</label>
                                    <input type="text"
                                        className="form-control"
                                        placeholder="Enter your user name"
                                        value={userName}
                                        onChange={(event) => this.OnChangeInput(event, 'userName')} />
                                    {errors.userName && <p style={{ color: 'red' }}>{errors.userName}</p>}
                                </div>
                                <div className="col-6 form-group register-input">
                                    <label>Password</label>
                                    <div className="custom-input-password">
                                        <input
                                            type={this.state.isShowPassword ? 'text' : 'password'}
                                            className="form-control"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(event) => this.OnChangeInput(event, 'password')}

                                        />
                                        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
                                        <span
                                            onClick={() => this.hanldeShowHidePassWord()}
                                        >
                                            <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                        </span>

                                    </div>
                                </div>
                            </div>

                            <div className="col-12 form-group register-input">
                                <label>Full name</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder="Enter your full name"
                                    value={fullName}
                                    onChange={(event) => this.OnChangeInput(event, 'fullName')} />
                                {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName}</p>}
                            </div>
                            <div className="col-12 form-group register-input">
                                <label>Email</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(event) => this.OnChangeInput(event, 'email')}
                                />
                                {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                            </div>

                            <div className="col-12 form-group register-input">
                                <label>Address</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder="Enter your address"
                                    value={address}
                                    onChange={(event) => this.OnChangeInput(event, 'address')}
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                />
                                {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}
                            </div>

                            <div className="col-12 form-group register-input">
                                <label>Phone number</label>
                                <input type="number"
                                    className="form-control"
                                    placeholder="Enter your phone number"
                                    value={phoneNumber}
                                    onChange={(event) => this.OnChangeInput(event, 'phoneNumber')}
                                />
                                {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber}</p>}
                            </div>



                            <div className='col-12' style={{ color: 'red' }}>
                                {this.state.errMessage}
                            </div>
                            <div className="col-12 ">
                                <button
                                    className="btn-register"
                                    onClick={() => this.handleRegister()}
                                >Register</button>
                            </div>

                            <div className="col-12 social-register">
                                <i className="fab fa-google-plus-g google"></i>
                                <i className="fab fa-facebook-f facebook"></i>
                                <i className="fab fa-instagram instagram"></i>
                                <i className="fab fa-twitter twitter"></i>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language,
        isRegister: state.user.isRegister
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
