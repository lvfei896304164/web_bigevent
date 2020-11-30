$(function () {
    gitUserInfo()
    var layer = layui.layer
    $('#btnlogout').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something

            // 清空本地储存中的token
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index)
        });
    })
})
function gitUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            rendAvatar(res.data)
        }
        // complete: function (res) {
        //     console.log(res);
        //     console.log(res.responseJSON);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败!') {
        //         console.log('bb');
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}
function rendAvatar(user) {
    console.log(user);
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avent').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        console.log(first);
        $('.text-avent').html(first).show()
    }
}