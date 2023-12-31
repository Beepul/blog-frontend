export const LoginStart = (useCredentials) => ({
    type: "LOGIN_START"
});

export const LoginSucess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user
});

export const LoginFailure = () => ({
    type: "LOGIN_FAILURE"
})

export const LogOut = () => ({
    type: "LOG_OUT"
})  