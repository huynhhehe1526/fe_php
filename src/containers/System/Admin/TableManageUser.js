import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { register, getAllUser, deleteUser } from '../../../services/userService';
// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);
import instance from '../../../axios';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}


class TableManageUser extends Component {
    //khai báo chuẩn react
    constructor(props) {
        super(props);
        //khởi tạo các biến muốn dùng trong state
        //this này có nghĩa là class
        this.state = {
            usersRedux: []
        }
    }
    async componentDidMount() {
        //this.props.fetUserRedux();
        const response = await getAllUser();
        console.log('Check get user table: ', response)
        this.setState({
            usersRedux: response
        })
        //c2
        // console.log('Huynh check thu data bên php: ', getAllUser().then((res) => {
        //     console.log('huynh check res.data: ', res)
        //     this.setState({
        //         usersRedux: res
        //     })
        //     console.log('Huynh check usersRedux: ', this.state.usersRedux)

        // }))
        // console.log('Huynh check usersRedux: ', this.state.usersRedux)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
        if (prevState.usersRedux !== this.state.usersRedux) {
            this.setState({
                usersRedux: this.state.usersRedux
            })
        }
    }

    handleDeleteUserRedux = async (user) => {
        console.log('Huynh check axios.delete', deleteUser(user))
        const res = await deleteUser(user);

        console.log('Huynh check thử axios.delete: ', res)
        this.props.fetUserRedux();
        //c2
        // let result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/destroy/${user}`, {
        //     method: 'DELETE',
        // })
        // result = await result.json();
        //     getAllUser().then((res) => {
        //         console.log('huynh check res.data: ', res)
        //         this.setState({
        //             usersRedux: res
        //         })
        //         console.log('Huynh check usersRedux: ', this.state.usersRedux)

        //     });

        // console.log(result)

    }

    handleEdituser = (user) => {
        console.log('Huynh check uesr edit: ', user)
        this.props.handleEdituserFromParentKey(user)

    }
    handleGetuser = () => {
        let res = getAllUser();
        console.log('Check get user table: ', res)
        this.setState({
            usersRedux: res
        })
    }
    render() {
        // console.log('Huynh check all user by redux: ', this.props.listUsers)
        // console.log('Huynh check re - render state: ', this.state.usersRedux)
        let arrUsers = this.state.usersRedux;
        console.log('Huynh check state: ', this.state)
        return (
            <React.Fragment>
                <table id="TableManageUser">
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>Full name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone number</th>
                            <th>Action</th>
                        </tr>

                        {arrUsers && arrUsers.length > 0 &&
                            arrUsers.map((item, index) => {
                                console.log('Huynh check thử data user: ', item, index)
                                return (
                                    <tr key={index}>
                                        <td>{item.userName}</td>
                                        <td>{item.fullName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.address}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>
                                            <button
                                                className="btn-edit"
                                                onClick={() => this.handleEdituser(item)}
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={() => this.handleDeleteUserRedux(item.id)}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </React.Fragment>

        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
