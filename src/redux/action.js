export const LoginAction = (token) => {
    //console.log("token",token)
    return (dispatch) => {
        dispatch ({
            type : 'LOGIN',
            payload : token
        })
    }
}

export const LogoutAction = () => {
    return (dispatch) => {
        dispatch({
            type : 'LOGOUT',
            payload : ''
        })
    }
}

export const  SaveUserInfoAction = (res) => {
    return (dispatch) => {
        dispatch({
            type : "SAVEUSERINFO",
            payload : res
        })
    }
}

export const DeleteUserInfoAction = (res) => {
    return (dispatch) => {
        dispatch ({
            type : "DELETEUSERINFO",
            payload : ""
        })
    }
}