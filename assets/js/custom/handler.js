let isRecaptchaInit = false;
let appSent = false;

function showDialog(msg, callback) {
	$('#askModalContent').text(msg);
	$('#askModal').modal('show');

	if (callback == null) return;

	$('#askModalOKButton').off('click');
	$('#askModalOKButton').click(function () {
			$('#askModal').modal('hide');
			callback();
	});
}


function showPrivacyDialog() {	
	$('#modal_title_content').text("APLY 개인정보처리방침");
    $('#modal_body_content').load("privacy_for_email.html");
    $('#modal-3').modal('show');
}

const showPrivacy = () => {
    $('#modal_title_content').text("APLY 개인정보처리방침");
    $('#modal_body_content').load("privacy.html");
    $('#modal-3').modal({"show" : true});
};

function sendApplicationData(form_id)
{
	let min_type = "";
	if ($(form_id).find('input[name="min_type_1"]').is(":checked")) {
		min_type = "/SW개발";
	}

	if ($(form_id).find('input[name="min_type_2"]').is(":checked")) {
		min_type = min_type + "/제휴 및 협업";
	}

	if ($(form_id).find('input[name="min_type_3"]').is(":checked")) {
		min_type = min_type + "/서비스 적용";
	}

	if ($(form_id).find('input[name="min_type_4"]').is(":checked")) {
		min_type = min_type + "/기타 문의";
	}

	if (min_type == "") {
		showDialog("문의 종류를 선택해 주세요.", null);
		return false;
	}	

	let form_content = $("#form_content").val();
	if (form_content == "") {
		showDialog("문의 내용을 입력해 주세요.", null);
		return false;
	}

	let form_phone = $(form_id).find('input[name="form_phone"]').val();
	if (form_phone == "") {
		showDialog("전화번호를 입력해 주세요.", null);
		return false;
	}

	let form_email = $(form_id).find('input[name="form_email"]').val();
	if (form_email == "") {
		showDialog("이메일을 입력해 주세요.", null);
		return false;
	}

	if ($(form_id).find("#agree_1").length > 0 && $(form_id).find("#agree_1").is(":checked") == false) {
		showDialog("개인정보 처리방침에 동의해주세요.", null);
		return false;
	}

	$('.page-loader').show();
	
	let ref = $('<input type="hidden" value="' + document.referrer + '" name="ref">');	
	$(form_id).append(ref);	
	ref = $('<input type="hidden" value="' + min_type + '" name="min_type">');	
	$(form_id).append(ref);	
	ref = $('<input type="hidden" value="aqr_m_contact" name="form_kind">');	
	$(form_id).append(ref);

	if (isRecaptchaInit == true) {
		grecaptcha.execute('6LfPn_UUAAAAAN-EHnm2kRY9dUT8aTvIcfrvxGy7', {action: 'homepage'}).then(function(token) {
			$(form_id).find('input[name="form_token"]').val(token);
			let fed = new FormData($(form_id)[0]);
			   ajaxRequest(fed, form_id);
		});
	}
	else {
		grecaptcha.ready(function() {
			isRecaptchaInit = true;
			grecaptcha.execute('6LfPn_UUAAAAAN-EHnm2kRY9dUT8aTvIcfrvxGy7', {action: 'homepage'}).then(function(token) {
				$(form_id).find('input[name="form_token"]').val(token);
				let fed = new FormData($(form_id)[0]);
				   ajaxRequest(fed, form_id);
			});
		});
	}
}

function ajaxRequest(fed, form_id) {
	$.ajax({
		type: "POST",
		url: 'https://aply.biz/contact/handler.php',
		crossDomain: true,
		dataType: "json",
		data:fed,
		enctype: 'multipart/form-data', // 필수
		processData: false,
    	contentType: false,
    	cache: false,
		success: function (data) {
			if ($('div').is('.page-loader')) {
				$('.page-loader').delay(200).fadeOut(800);
			}

			if (data.result == "success") {				
				showDialog("전송이 완료되었습니다. APLY가 연락 드리겠습니다.", function(){
					location.href="/index.html";
				});
				return;
			}
			else {
				showDialog("오류가 발생하였습니다. 잠시 후 다시 시도해 주세요. : " + data.message , null);
			}

			$(form_id + " input").last().remove();			
		},
		error: function(jqXHR, text, error){
			showDialog("죄송합니다, 일시적인 오류가 발생하였습니다. 다시 시도 부탁드립니다.", null);
			if ($('div').is('.page-loader')) {
				$('.page-loader').delay(200).fadeOut(800);
			}
		}
	});
}


function setSubmitHandler(form_p_id) {
	var form_id = "#" + form_p_id;

	$(form_id + "_send").on("click", function(e) {
		e.preventDefault();

		if (appSent == true) {
			if (confirm('이미 전송한 내용이 있습니다. 다시 진행 하시겠습니까?')) {	}
			else {
			  return;
			}
		}		
				
	    sendApplicationData(form_id);	    
	});

	$('[name^=form_phone]').keypress(validateNumber);
}

function setPage() {
	grecaptcha.ready(function() {
		isRecaptchaInit = true;		
	});
	
	setSubmitHandler("email_up");
}

function validateNumber(event) {
    var key = window.event ? event.keyCode : event.which;
    if (event.keyCode === 8 || event.keyCode === 46) {
        return true;
    } else if ( key < 48 || key > 57 ) {
        return false;
    } else {
        return true;
    }
}

function isSet(value) {
  if (value == "" || value == null || value == "undefined") return false;

  return true;
}