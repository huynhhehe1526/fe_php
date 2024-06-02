import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../utils';
import { resetpass } from '../../services/userService';
import { toast } from "react-toastify";
import * as actions from "../../store/actions";
import { upperCase, values } from 'lodash';
import Validation from '../Auth/Validation';
import './ResetPass.scss';

class ChangePassWord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            values: {
                email: '',
                new_pass: '',
                confirm_pass: '',
            },
            errors: {},
            isShowPass: false
        }
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'new_pass', 'confirm_pass']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state.values[arrCheck[i]]) {
                isValid = false;
                toast.info('Missing input is required: ' + arrCheck[i])
                break;
            }
        }
        return isValid
    }

    async componentDidMount() {
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
    }
    hanldeShowHidePassWord = () => {
        //chỉnh lại
        this.setState({
            isShowPass: !this.state.isShowPass
        })
    }

    handlechangpass = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) {
            return;
        } else {
            try {
                const validation = new Validation();
                const errors = validation.render(this.state.values);
                console.log('Huynh check errors ', errors)
                console.log('Huynh check errors ', Object.keys(errors).length)
                let { email, new_pass, confirm_pass } = this.state.values;

                if (Object.keys(errors).length === 0 || Object.keys(errors).length === 1 || Object.keys(errors).length === 2
                    || Object.keys(errors).length === 3
                ) {
                    let res = await resetpass({
                        email: email,
                        new_pass: new_pass,
                        confirm_pass: confirm_pass
                    })
                    if (res && res.error == 0) {
                        toast.success('Notice: ' + res.message);
                    } else {
                        toast.error('Error: ' + res.message)
                    }
                    console.log('huynh check res: ', res)
                }


            } catch (error) {
                console.error('Error:', error);
            }
        }


        // console.log('Huynh check changepassword: ', res)
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
    render() {
        let { email, new_pass, confirm_pass } = this.state.values;
        let { errors, isShowPass } = this.state;
        console.log('Huynh check state: ', this.state.values)

        return (
            <React.Fragment>
                <h2 className='title'
                    style={{ color: 'yellow', textTransform: 'upperCase' }}
                >
                    Reset password
                </h2>
                <form
                    onSubmit={(event) => this.handleValidateForm(event)}
                >
                    <div
                        className="col-6 mx-auto mt-4"
                    >
                        <label>Nhập email đã đăng nhập</label>
                        <input
                            className='form-control'
                            type='text'
                            placeholder='Nhập email....'
                            value={email}
                            onChange={(event) => this.OnChangeInput(event, "email")}

                        />
                        {errors.email && <p style={{ color: 'yellow' }}>{errors.email}</p>}


                        <div className="col-12 form-group reset-input">
                            <label>Nhập mật khẩu mới</label>
                            <div className="custom-input-password">
                                <input
                                    className='form-control'
                                    type={this.state.isShowPass ? 'text' : 'password'}
                                    value={new_pass}
                                    onChange={(event) => this.OnChangeInput(event, "new_pass")}
                                />
                                <span
                                    onClick={() => this.hanldeShowHidePassWord()}
                                >
                                    <i class={this.state.isShowPass ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                </span>
                                {errors.new_pass && <p style={{ color: 'yellow' }}>{errors.new_pass}</p>}

                            </div>
                        </div>

                        <div className="col-12 form-group reset-input">
                            <label>Nhập lại mật khẩu</label>
                            <div className="custom-input-password">
                                <input
                                    className='form-control'
                                    type={this.state.isShowPass ? 'text' : 'password'}

                                    value={confirm_pass}
                                    onChange={(event) => this.OnChangeInput(event, "confirm_pass")}
                                />
                                <span
                                    onClick={() => this.hanldeShowHidePassWord()}
                                >
                                    <i class={this.state.isShowPass ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                </span>
                                {errors.confirm_pass && <p style={{ color: 'yellow' }}>{errors.confirm_pass}</p>}

                            </div>
                        </div>


                        <button className="btn btn-success d-block mx-auto"
                            style={{ margin: '6px' }}
                            onClick={() => this.handlechangpass()}
                        >
                            Reset pass
                        </button>
                    </div>
                </form>

            </React.Fragment>


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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassWord);
