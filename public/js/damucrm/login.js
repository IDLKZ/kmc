function getURLParameter(paramName) {
            var searchString = window.location.search.substring(1),
                i, val, params = searchString.split("&");

            for (i = 0; i < params.length; i++) {
                val = params[i].split("=");
                if (val[0] == paramName) {
                    return unescape(val[1]);
                }
            }
            return null;
        };


if (getURLParameter("resetPassword")=="1"){
    jQuery("#sf2successResetPassword").show();
    }

if (getURLParameter("successRegister")=="1"){
    jQuery("#sf2successRegister").show();
    }
jQuery('#LoginForm').on('submit',function (ev) {
    ev.preventDefault();

    var login = $("#sf2Email").val();
    var pass = $('#sf2Password').val();

    jQuery.ajax({
        url: '/restapi/login',
        type: 'POST',
        dataType : "json",
        data: JSON.stringify({
            'login' : login,
            'password' : pass,
            'system' : "browser"
        }),
        contentType: 'application/json; charset=UTF-8',
        success: function (auth) {

            if(auth.Result === 'ok') {
                location.href = '/' + 'static/#' + auth.RedirectURL;
            } else {//if(auth.Result === 'incorrect') {
                $("#LoginForm").find('.failed.sf2').delay(500).fadeIn(1000);
                $("#LoginForm").find('.success.sf2').fadeOut(500);
            }

        },
        error: function () {
            $("#LoginForm").find('.failed.sf2').delay(500).fadeIn(1000);
            $("#LoginForm").find('.success.sf2').fadeOut(500);
        }
    });

    return false;
});
