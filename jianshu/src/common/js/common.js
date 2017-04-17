let getToken = function() {
    //如果存在token,那就返回
    return sessionStorage.getItem('token');
}
let setToken = function(token) {
    sessionStorage.setItem('token', token);
}
export { getToken, setToken };