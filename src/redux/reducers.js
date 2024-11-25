export const AuthReducer = (state = {authToken : null}, action) => {
    switch (action.type) {
        case 'LOGIN' :
            return {
            ...state,
            authToken: action.payload,
        }
        case 'LOGOUT' :
            return {
                authToken : null,
            }
        default :
            return state
    }
}

export const UserReducer = (state = {userDate:null}, action) => {
    switch (action.type) {
            case 'SAVEUSERINFO' :
                return {
                ...state,
                userData:action.payload,
            }
            case 'DELETEUSERINFO':
                return {
                    userData:null
                }
            default:
                    return state;
    }
}