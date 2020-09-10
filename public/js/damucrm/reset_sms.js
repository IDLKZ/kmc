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


if (getURLParameter("successRegister")=="1"){
    jQuery("#sf2successRegister").show();
    }
jQuery('#IINForm').on('submit',function (ev) {
    ev.preventDefault();

    var login = jQuery("#sf2iin").val();
    var mobile = jQuery("#sf2mobile").val();
    $("#IINForm").find('.success.sf2').html('');
    jQuery.ajax({
        url: '/restapi/services/run/ksk_kmc_reset_password',
        type: 'POST',
        dataType : "json",
        data: JSON.stringify({
            'iin' : login,
            'mobile' : mobile,
        }),
        contentType: 'application/json; charset=UTF-8',
        success: function (auth) {

            if(auth.error_code === "OK") {
                location.href = 'login?resetPassword=1';
            } else {//if(auth.Result === 'incorrect') {
		$("#IINForm").find('.failed.sf2').html(auth.error_text);
                $("#IINForm").find('.failed.sf2').delay(500).fadeIn(1000);
                $("#IINForm").find('.success.sf2').fadeOut(500);
            }

        },
        error: function () {
	    $("#IINForm").find('.failed.sf2').html('Ошибка при сбросе пароля');
            $("#IINForm").find('.failed.sf2').delay(500).fadeIn(1000);
            $("#IINForm").find('.success.sf2').fadeOut(500);
        }
    });

    return false;
});
