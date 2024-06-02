import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import './UserRedux.scss';
import * as actions from '../../../store/actions';
import TableManageUser from './TableManageUser';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Validation from '../../Auth/Validation';

import { toast } from "react-toastify";
import { values } from 'lodash';
import { getAllCode, addUser } from '../../../services/userService';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            previewImgUrl: '',
            isOpen: false,
            values: {
                userName: '',
                password: '',
                fullName: '',
                email: '',
                address: '',
                phoneNumber: '',

            },
            gender: '',
            role: '',
            avatar: '',

            action: CRUD_ACTIONS.CREATE,
            userEditId: '',
            errors: {}
        }
    }




    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getGRoleStart();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }

        //Get all user
        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux;
            let arrRoles = this.props.roleRedux;
            this.setState({
                values: {
                    userName: '',
                    password: '',
                    fullName: '',
                    email: '',
                    address: '',
                    phoneNumber: ''
                },

                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgUrl: '',
            })
            // }, () =>{
            //     console.log('Huynh check callback check state: ', this.state)
            // })
        }

    }

    handleOnchangeimage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            // console.log('Huynh check get file base 64', base64)
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectUrl,
                avatar: base64
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgUrl) {
            return;
        }
        this.setState({
            isOpen: true
        })
    }

    // OnChangeInput = (event, id) => {
    //     let copyState = { ...this.state.values }
    //     copyState[id] = event.target.value;
    //     this.setState({
    //         ...copyState
    //     })
    // }
    OnChangeInput = (event, id) => {
        this.setState({
            values: {
                ...this.state.values,
                [id]: event.target.value
            }
        });
    }

    OnChangeSelect = (event, id) => {
        this.setState({
            ...this.state,
            [id]: event.target.value
        });
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
    //Validated form

    handleValidateForm = (event) => {
        event.preventDefault();
        const validation = new Validation();
        const errors = validation.render(this.state.values);
        this.setState({ errors });
    }
    handleSaveUser = () => {
        const { action, values, userEditId, gender, role, position, errors, avatar } = this.state;
        const validation = new Validation();
        const inputErrors = validation.render(values);
        let isValid = this.checkValidateInput()
        if (isValid === false)
            return;
        console.log('Huynh check errors ', inputErrors)
        console.log('Huynh check errors ', Object.keys(inputErrors).length)
        if (action === CRUD_ACTIONS.CREATE) {
            if (Object.keys(inputErrors).length === 0 || Object.keys(inputErrors).length === 1|| Object.keys(inputErrors).length === 3) {

                this.props.createNewUser({
                    userName: values.userName,
                    password: values.password,
                    fullName: values.fullName,
                    email: values.email,
                    address: values.address,
                    phoneNumber: values.phoneNumber,
                    gender: gender,
                    roleId: role
                })
            } else {
                this.setState({
                    errors: inputErrors
                });
            }
        }
        if (action === CRUD_ACTIONS.EDIT) {
            console.log('Huynh check errors ', inputErrors)
            console.log('Huynh check errors ', Object.keys(inputErrors).length)
            if (Object.keys(inputErrors).length === 1 || Object.keys(inputErrors).length === 2 || Object.keys(inputErrors).length === 4) {
                this.props.editUserRedux({
                    id: userEditId,
                    userName: values.userName,
                    password: values.password,
                    fullName: values.fullName,
                    email: values.email,
                    address: values.address,
                    phoneNumber: values.phoneNumber,
                    gender: gender,
                    roleId: role
                })
            }
        }
    }
    handleEdituserFromParent = (user) => {
        // console.log('Huynh check handeleEdit user from parent; ', user)
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        console.log('handleEdituserFromParent: ', user)

        this.setState({
            values: {
                userName: user.userName,
                password: 'Hashcode',
                fullName: user.fullName,
                email: user.email,
                address: user.address,
                phoneNumber: user.phoneNumber,
            },

            gender: user.gender,
            role: user.roleId,
            avatar: '',
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,
            previewImgUrl: imageBase64
        })
    }

    render() {
        console.log('Check state: ', this.state);
        let language = this.props.language;
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let isGetGenders = this.props.isLoadingGender;
        let { userName, fullName, email, password,
            phoneNumber, address } = this.state.values;

        let { errors, avatar, gender, role } = this.state;
        return (
            <div className='user-redux-container'>
                <div className="title" >CRUD user by redux</div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <form
                            onSubmit={(event) => this.handleValidateForm(event)}
                        >
                            <div className='row'>
                                <div className='col-12 my-3'>
                                    <FormattedMessage id="manage-user.add-new-user" />
                                </div>
                                <div className='col-12'>
                                    {isGetGenders === true ? 'Loading genders' : ''}
                                </div>
                                <div className='col-3'>
                                    <label>
                                        <FormattedMessage id="manage-user.userName" />
                                    </label>
                                    <input className='form-control' type='text'
                                        value={userName}
                                        onChange={(event) => this.OnChangeInput(event, 'userName')}

                                    />
                                    {errors.userName && this.state.action === CRUD_ACTIONS.CREATE && <p p style={{ color: 'red' }}>{errors.userName}</p>}

                                </div>
                                <div className='col-3'>
                                    <label>
                                        <FormattedMessage id="manage-user.password" />
                                    </label>
                                    <input className='form-control' type='password'
                                        value={password}
                                        onChange={(event) => this.OnChangeInput(event, 'password')}
                                    // disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                    />
                                    {errors.password && this.state.action === CRUD_ACTIONS.CREATE && <p style={{ color: 'red' }}>{errors.password}</p>}

                                </div>
                                <div className='col-3'>
                                    <label>
                                        <FormattedMessage id="manage-user.email" />
                                    </label>
                                    <input className='form-control' type='email'
                                        value={email}
                                        onChange={(event) => this.OnChangeInput(event, 'email')}
                                        disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                                    />
                                    {errors.email && this.state.action === CRUD_ACTIONS.CREATE && <p p style={{ color: 'red' }}>{errors.email}</p>}

                                </div>

                                <div className='col-3'>
                                    <label>
                                        <FormattedMessage id="manage-user.fullName" />
                                    </label>
                                    <input className='form-control' type='text'
                                        value={fullName}
                                        onChange={(event) => this.OnChangeInput(event, 'fullName')}
                                    />
                                    {errors.fullName && this.state.action === CRUD_ACTIONS.CREATE && <p p style={{ color: 'red' }}>{errors.fullName}</p>}
                                </div>
                                <div className='col-3'>
                                    <label>
                                        <FormattedMessage id="manage-user.phone-number" />
                                    </label>
                                    <input className='form-control' type='text'
                                        value={phoneNumber}
                                        onChange={(event) => this.OnChangeInput(event, 'phoneNumber')}
                                    />
                                    {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber}</p>}

                                </div>
                                <div className='col-9'>
                                    <label>
                                        <FormattedMessage id="manage-user.address" />
                                    </label>
                                    <input className='form-control' type='text'
                                        value={address}
                                        onChange={(event) => this.OnChangeInput(event, 'address')}
                                    />
                                    {errors.address && <p style={{ color: 'red' }}>{errors.address}</p>}

                                </div>
                                <div className='col-3'>
                                    <label>
                                        <FormattedMessage id="manage-user.gender" />
                                    </label>
                                    <select className="form-control"
                                        onChange={(event) => this.OnChangeSelect(event, 'gender')}
                                        value={gender}
                                    >
                                        {genders && genders.length > 0 &&
                                            genders.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }

                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label>
                                        <FormattedMessage id="manage-user.role" />
                                    </label>
                                    <select className="form-control"
                                        onChange={(event) => this.OnChangeSelect(event, 'role')}
                                        value={role}
                                    >
                                        {roles && roles.length > 0 &&
                                            roles.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }

                                    </select>
                                </div>

                                {/* <div className='col-3'>
                                    <label>
                                        <FormattedMessage id="manage-user.image" />
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

                                </div> */}
                                <div className='col-12 my-3'>
                                    <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                        onClick={() => this.handleSaveUser()}
                                    >
                                        {this.state.action === CRUD_ACTIONS.EDIT ?
                                            <FormattedMessage id="manage-user.edit" />
                                            :
                                            <FormattedMessage id="manage-user.save" />
                                        }
                                    </button>
                                </div>
                                <div className='col-12 mb-5'>
                                    <TableManageUser
                                        handleEdituserFromParentKey={this.handleEdituserFromParent}
                                        action={this.state.action}
                                    />
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }

            </div >

        )
    }

}

const mapStateToProps = state => {
    return {
        genderRedux: state.admin.genders,
        language: state.app.language,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getGRoleStart: () => dispatch(actions.fetchRoleStart()),
        fetUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        //thêm , sửa, xóa user
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        editUserRedux: (data) => dispatch(actions.editUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
