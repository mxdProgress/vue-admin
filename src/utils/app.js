import cookie from "cookie_js";

export function getToken() {
    return cookie.get('token');
}

export function setToken(value) {
    return cookie.set('token', value)
}
export function removeToken() {
    return cookie.remove('token')
}

export function getUsername() {
    return cookie.get('username');
}
export function setUsername(value) {
    return cookie.set('username', value);
}

export function removeUsername() {
    return cookie.remove('username');
}