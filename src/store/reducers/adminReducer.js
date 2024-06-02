import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    statusMovie: [],
    roles: [],
    users: [],
    allStories: [],
    allAuthors: [],
    allCategories: [],
    allMovies: [],
    chapter: [],
    allLocations: [],
    allShowtime: []
}

const adminReducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.FETCH_GENDER_START:
            let copyState = { ...state };
            copyState.isLoadingGender = true;

            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            // let copyState = {...state};
            state.genders = action.data;
            state.isLoadingGender = false;

            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAILED:

            // let copyState = {...state};
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            // let copyState = {...state};
            state.roles = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state
            }

        //Status movie

        case actionTypes.FETCH_STATUS_MOVIE_SUCCESS:
            // let copyState = {...state};
            state.statusMovie = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_STATUS_MOVIE_FAILED:
            state.statusMovie = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            // let copyState = {...state};
            state.users = action.users;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_CATEGORY_SUCCESS:
            state.allCategories = action.dataCat;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_CATEGORY_FAILED:
            state.allCategories = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_STORIES_SUCCESS:
            state.allStories = action.dataStr;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_STORIES_FAILED:
            state.allStories = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_AUTHORS_SUCCESS:
            state.allAuthors = action.dataAuth;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_AUTHORS_FAILED:
            state.allAuthors = [];
            return {
                ...state
            }
        case actionTypes.FETCH_CHAPTER_SUCCESS:
            state.chapter = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_CHAPTER_FAILED:
            state.chapter = [];
            return {
                ...state
            }



        case actionTypes.FETCH_ALL_MOVIES_SUCCESS:
            state.allMovies = action.dataMovie;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_MOVIES_FAILED:
            state.allMovies = [];
            return {
                ...state
            }

        //location
        case actionTypes.FETCH_ALL_LOCATIONS_SUCCESS:
            state.allLocations = action.dataLocation;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_LOCATIONS_FAILED:
            state.allLocations = [];
            return {
                ...state
            }

        //all showtime

        case actionTypes.FETCH_ALL_SHOWTIMES_SUCCESS:
            state.allShowtime = action.dataShowtime;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_MOVIES_FAILED:
            state.allShowtime = [];
            return {
                ...state
            }
        default:
            return state;
    }
}

export default adminReducer;