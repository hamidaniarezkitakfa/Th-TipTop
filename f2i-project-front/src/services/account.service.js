
let saveToken = (token) => {
    localStorage.setItem('token', token )
}

let logout = () => {
    localStorage.clear();
}

let isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token
}

export const accountService = {
    saveToken, logout, isLogged
}