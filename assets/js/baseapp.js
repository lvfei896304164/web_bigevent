$.ajaxPrefilter(function (options) {
    if (options.url.startsWith('/my/')) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    options.complete = function (res) {
        // console.log(res);
        if (res.responseJSON.status === 1 || res.responseJSON.message === '身份认证失败!') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }

})