const URL = "/FormAjax/formAjax.php";
const regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
const regPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

let chkUsername = false;
let chkEmail = false;
let chkPassword = false;
let chkDate = false;

function sendData(event) {
    event.preventDefault();
    let txtUserName = $('#username');
    let txtPassword = $('#password')
    $.ajax({
        url: `${URL}`,
        dataType: "JSON",
        type: "POST",
        data: {
            username: txtUserName.val(),
            password: txtPassword.val()
        },
        success: function (response) {
            let divResultLogin = $('#login-result');
            divResultLogin.html("");
            if (response == true) {
                divResultLogin.html("<h1 class='text-success'>Login Success</h1>");
            } else {
                divResultLogin.html("<h1 class='text-error' style ='display:block'>Login Failed</h1>");
            }
        }
    });
}

function checkUsername() {
    let txtUserName = $("#username");
    txtUserName.removeClass();
    if (txtUserName.val().trim().length < 6) {
        txtUserName.addClass("error");
        $('#button-submit').prop('disabled', true);
        $('#err-username').css("display", "block");
        chkUsername = false;
    } else {
        chkUsername = true;
        $('#err-username').css("display", "none");
        enableButton();
    }
}

function checkEmail() {
    let txtEmail = $("#email");
    txtEmail.removeClass();
    if (!regEmail.test(txtEmail.val())) {
        txtEmail.addClass("error");
        $('#button-submit').prop('disabled', true);
        $('#err-email').css("display", "block");
        chkEmail = false;
    } else {
        chkEmail = true;
        $('#err-email').css("display", "none");
        enableButton();
    }
}

function checkPassword(event) {
    // At least one number, one lowercase and one uppercase letter
    // At least six characters
    let txtPassword = $("#password");
    txtPassword.removeClass();
    if (!regPassword.test(txtPassword.val())) {
        txtPassword.addClass("error");
        $('#button-submit').prop('disabled', true);
        $('#err-password').css("display", "block");
        chkPassword = false;
    } else {
        chkPassword = true;
        $('#err-password').css("display", "none");
        enableButton();
    }

}

function checkDate(event) {

    let txtDate = $("#input-date");
    txtDate.removeClass();
    txtDate.addClass("date");

    let bits = txtDate.val().split('/');
    let d = new Date(bits[2], bits[1] - 1, bits[0]);
    if (!(d && (d.getMonth() + 1) == bits[1])) {
        txtDate.addClass("error");
        $('#button-submit').prop('disabled', true);
        $('#err-date').css("display", "block");
        chkDate = false;
    } else {
        chkDate = true;
        $('#err-date').css("display", "none");
        enableButton();
    }
}

function enableButton() {
    if (chkDate && chkPassword && chkDate) {
        $('#button-submit').prop('disabled', false);
    }
}