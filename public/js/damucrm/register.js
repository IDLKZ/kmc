jQuery('#RegisterForm').on('submit',function (ev) {
    ev.preventDefault();

    var email = $("#sf2email").val();
    var iin = $('#sf2iin').val();
    var phone = $('#sf2phone').val();
    var contract_date = $('#sf2contract_date').val();
    var pwd = $('#sf2pwd').val();

   jQuery("#RegisterForm").find('.failed.sf2').val("");
    jQuery.ajax({
        url: '/restapi/bpms/start',
        type: 'POST',
        dataType : "json",
        data: JSON.stringify(

{processCode:"ksk_citizen_register",input:{email:email,iin:iin,phone:phone,contract_date:contract_date,pwd:pwd}}

),
        contentType: 'application/json; charset=UTF-8',
        success: function (auth) {

            if (auth.task && auth.output.last_error=="") {
                location.href = 'confirm-phone?task='+auth.task;
            } else {//if(auth.Result === 'incorrect') {
		jQuery("#RegisterForm").find('.failed.sf2').html(auth.errorText);
		if (auth.output && auth.output.last_error) {
		    jQuery("#RegisterForm").find('.failed.sf2').html(auth.output.last_error);
		}
                jQuery("#RegisterForm").find('.failed.sf2').delay(500).fadeIn(1000);
                jQuery("#RegisterForm").find('.success.sf2').fadeOut(500);
            }

        },
        error: function () {
            jQuery("#RegisterForm").find('.failed.sf2').delay(500).fadeIn(1000);
            jQuery("#RegisterForm").find('.success.sf2').fadeOut(500);
        }
    });

    return false;
});
