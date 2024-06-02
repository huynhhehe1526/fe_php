import axios from "../axios"

const handleLoginApi = (userEmail, userPassword) => {
    //gọi server nodejs
    //email và password là một cái object
    return axios.post('/api/login', { email: userEmail, password: userPassword });
    //có biến object emil còn value là userEmail
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}

const getAlCategories = () => {
    return axios.get(`/api/get-all-stories`)
}

const getAllStoriesByCategory = (inputId) => {
    return axios.get(`api/get-all-stories-by-category?categoryId=${inputId}`)
}

//CRUD users by redux

const getAllCodeService = (typeInput) => {
    return axios.get(`/api/allcode?type=${typeInput}`)
}


const getContentByStory = (inputId, chapId) => {
    return axios.get(`/api/get-content-by-stories?id=${inputId}&chapId=${chapId}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    // return axios.delete('/api/delete-user', {id: userId})
    return axios.delete('/api/delete-user', {
        // headers: {
        //     Authorization: authorizationToken
        // },
        data: {
            id: userId
        }
    });
}

const editUserService = (inputdata) => {
    return axios.put('/api/edit-user', inputdata);
}

//thêm, sửa, xóa story
const createNewStoryService = (data) => {
    return axios.post('/api/create-new-story', data)
}

const deleteUStoryService = (storyId) => {
    return axios.delete('/api/delete-story', {
        // headers: {
        //     Authorization: authorizationToken
        // },
        data: {
            id: storyId
        }
    });
}

const editStoryService = (inputdata) => {
    return axios.put('/api/edit-story', inputdata);
}



const getAllStories = () => {
    return axios.get(`/api/get-all-stories-all`)
}

const getAllAuthor = (authorId) => {
    return axios.get(`/api/all-author?authorId=${authorId}`)
}

//Lưu thông tin nhập cho story

const saveDetailStory = (data) => {
    return axios.post(`/api/save-infor-stories`, data)
}

const getChapByStory = (storyId) => {
    return axios.get(`/api/get-chap-story?storyId=${storyId}`)
}

//get 10 data story
const getAllStory = (limit) => {
    return axios.get(`api/get-all-story?limit=${limit}`)
}


const changepassword = (data) => {
    return axios.post(`/api/change-password`, data)
}

const changePasswordVerifyEmail = (data) => {
    return axios.post(`/api/verify-change-password`, data)
}

const hienthi = () => {
    return axios.get(`/api/hienthi`)
}

const getAllUser = async () => {

    const response = await axios.get(`/api/show`);
    //console.log('Huynh check thử get all usser: ', response)
    return response;
}


const deleteUser = async (userId) => {
    try {
        // Sử dụng template literal để tạo URL chứa id của user
        const url = `/api/destroy/${userId}`;
        const response = await axios.delete(url);
        //console.log('Kết quả xóa:', response);
        return response;
    } catch (error) {
        //console.error('Lỗi khi xóa:', error);
        throw error;
    }
}

const getAllCode = async (type) => {
    try {
        const response = await axios.get(`/api/getAllCode?type=${type}`);
        //console.log('Check response: ', response)
        return response;
    } catch (error) {
        //console.error('Error:', error);
        throw error;
    }
}
const register = async (data) => {
    // return axios.post(`/api/register`, data)
    const response = await axios.post(`/api/register`, data);
    //console.log('Huynh check thử register: ', response)
    return response;
}
const addUser = async (data) => {
    // return axios.post(`/api/register`, data)
    const response = await axios.post(`/api/addUser`, data);
    //console.log('Huynh check thử addUser: ', response)
    return response;
}

const updateUser = async (inputdata) => {
    const response = axios.put('/api/updateData', inputdata);
    console.log('Huynh check log cho hàm updateUser: ', response);
    return response;
}

//get genre
const getAllGenre = async () => {
    const response = axios.get(`/api/getAllGenre`);
    return response;
}


//crud movie
// const createMovie = async (formData) => {
//     // return axios.post(`/api/register`, data)
//     const response = await axios.post(`/api/createMovie`, {
//         body: formData
//     });
//     console.log('Huynh check thử createMovie: ', response)
//     return response;
// }

const createMovie = async (formData) => {
    try {
        const response = await axios.post(`/api/createMovie`, formData);
        console.log('Huynh check thử createMovie: ', response);
        return response;
    } catch (error) {
        console.error('There was a problem with the createMovie operation:', error);
        throw error;
    }
}
//get10Movie
const get10Movie = async () => {
    const response = axios.get(`/api/listMovie`);
    return response;
}
//getAllMovie
const getAllMovie = async () => {
    const response = axios.get(`/api/getAllMovie`);
    return response
}




//delete movie 
const deleteMovie = async (movieId) => {
    try {
        const response = axios.delete(`/api/deleteMovie?id=${movieId}`);
        console.log('Huynh check respone hàm deleteMovie: ', response)
        return response;
    }
    catch (error) {
        throw error;
    }
}

const updateMovie = async (data) => {
    // return axios.post(`/api/register`, data)
    const response = await axios.put(`/api/updateMovie`, data);
    console.log('Huynh check thử updateMovie: ', response)
    return response;
}

//getMovieByGenre
const getMoviesByGenre = async (inputId) => {
    try {
        const response = await axios.get(`/api/getMoviesByGenre?id=${inputId}`);
        //console.log('Check response: ', response)
        return response;
    } catch (error) {
        //console.error('Error:', error);
        throw error;
    }
}

const detailMovie = async (id) => {
    try {
        const response = await axios.get(`/api/detailMovie?id=${id}`);
        //console.log('Check response: ', response)
        return response;
    } catch (error) {
        //console.error('Error:', error);
        throw error;
    }

}

//location
const getAlllocation = async () => {
    const response = axios.get(`/api/getAllLocation`);
    return response
}
const createShowtime = async (data) => {
    const response = await axios.post(`/api/createShowtime`, data);
    //console.log('Huynh check thử updateMovie: ', response)
    return response;
}

const showAllShowtime = async () => {
    const response = axios.get(`/api/showAllShowtime`);
    return response
}

//edit showtime
const updateShowtime = async (data) => {
    // return axios.post(`/api/register`, data)
    const response = await axios.put(`/api/editShowtime`, data);
    //console.log('Huynh check thử updateShowtime: ', response)
    return response;
}

//delete showtime
const deleteShowtime = async (showtimeId) => {
    try {
        const response = axios.delete(`/api/deleteShowtime?id=${showtimeId}`);
        console.log('Huynh check respone hàm deleteShowtime: ', response)
        return response;
    }
    catch (error) {
        throw error;
    }
}

//forgot and reset password
const resetpass = async (data) => {
    const response = await axios.post(`/api/forgotPassword`, data);
    //console.log('Huynh check thử updateMovie: ', response)
    return response;
}

const verifyresetpass = async (data) => {
    const response = await axios.post(`/api/verifyChangePass`, data);
    //console.log('Huynh check thử updateMovie: ', response)
    return response;
}


const showAllShowtimeByMovieId = async (idInput) => {
    const response = await axios.get(`/api/showAllShowtimeByMovieId?id=${idInput}`);
    return response;
}

const getAllSeat = async () => {
    const response = await axios.get(`/api/GetAllSeat`);
    return response;
}
//payment booking
const paymentBooking = async (formData) => {

    try {
        const response = await axios.post(`/api/paymentBooking`, formData);
        return response;
    } catch (error) {
        console.error('There was a problem with the paymentBooking:', error);
        throw error;
    }
}


const showDetailShowtimeById = async (idInput) => {
    const response = await axios.get(`/api/showDetailShowtimeById?id=${idInput}`);
    return response;
}



const getAllInfoUserBooking = async () => {
    const response = await axios.get(`/api/getAllInfoUserBooking`);
    return response;
}

//get confirm booking
const getConfirmBooking = async (inputId) => {
    const respone = await axios.get(`/api/getConfirmBooking?id=${inputId}`);
    return respone;
}
//get detail booking by id

const getDetailBookingById = async (inputId) => {
    const respone = await axios.get(`/api/getDetailBookingById?id=${inputId}`);
    return respone;
}

//get all booking confirmed 
const getAllInfoUserConfirm = async () => {
    const response = await axios.get(`/api/getAllInfoUserConfirm`);
    return response;
}

//get detail booking for 1 user
const getInforBookingUser = async (idInput) => {
    const response = await axios.get(`/api/getInforBookingUser?userId=${idInput}`);
    return response;
}

export {
    handleLoginApi,
    getAlCategories,
    getAllStoriesByCategory,
    getAllUsers,
    getAllCodeService,
    getContentByStory,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllStories,
    getAllAuthor,
    createNewStoryService,
    deleteUStoryService,
    editStoryService,
    saveDetailStory,
    getChapByStory, getAllStory,
    changepassword, changePasswordVerifyEmail,
    hienthi, register,
    getAllUser, deleteUser, getAllCode, addUser, updateUser,
    getAllGenre,
    createMovie, get10Movie, deleteMovie, getAllMovie, updateMovie,
    getMoviesByGenre, detailMovie,
    //location
    getAlllocation,
    //showtime
    createShowtime, showAllShowtime, updateShowtime, deleteShowtime,

    resetpass, verifyresetpass,
    showAllShowtimeByMovieId,
    getAllSeat, paymentBooking, showDetailShowtimeById,

    //handle booking
    getAllInfoUserBooking, getConfirmBooking, getDetailBookingById,
    //get all booking confirmed
    getAllInfoUserConfirm, getInforBookingUser
}


