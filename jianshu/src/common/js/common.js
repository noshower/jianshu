let getToken = function() {
    //如果存在token,那就返回
    return sessionStorage.getItem('token');
}
let setToken = function(token) {
    sessionStorage.setItem('token', token);
}
let getLocalTime = function(time) {
    function add0(m) {
        return m < 10 ? '0' + m : m;
    }
    let t = new Date(new Date(time).getTime());
    let y = t.getFullYear();
    let m = t.getMonth() + 1;
    let d = t.getDate();
    let h = t.getHours();
    let mm = t.getMinutes();
    let s = t.getSeconds();
    return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}
export { getToken, setToken, getLocalTime };