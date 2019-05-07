const Cookie = {
    getCookie: function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },
    setCookie: function (name, value) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    delCookie: function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
};
const pageTool = {
    formartSubStr: function (val, row) {
        if (val && val.length > 12) {
            return val ? '<a title=\"' + val + '\" style=\"color:#333\">' + val.substring(0, 12) + '...' + '</a>' : '';
        } else {
            return val ? val : '';
        }
    }
};

export { Cookie, pageTool }