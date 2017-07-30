var chkEmail;
var chkPassword;
var chkDate;
const URL ="http://duonganhvu123.000webhostapp.com/formAjax.php";

function sendData(event) {
    event.preventDefault();
    var xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    } else {
        xhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var divResultLogin = document.getElementById('login-result');
            divResultLogin.innerHTML = "";
            if (this.responseText === 'true') {
                divResultLogin.innerHTML += "<h1 class='text-success'>Login Success</h1>";
            } else {
                divResultLogin.innerHTML += "<h1 class='text-error' style ='display:block'>Login Failed</h1>";
            }
        }
    };
    var txtUserName = document.getElementById('username');
    xhttp.open("GET", URL+"?name=" + txtUserName.value, true);
    xhttp.send();
}

function checkEmail(event) {
    event.srcElement.classList = "";
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (!reg.test(event.target.value)) {
        event.srcElement.classList += "error";
        document.getElementById('button-submit').disabled = true;
        document.getElementById('err-username').style.display = "block";
        chkEmail = false;
    } else {
        chkEmail = true;
        document.getElementById('err-username').style.display = "none";
        enableButton();
    }
}

function checkPassword(event) {
    // at least one number, one lowercase and one uppercase letter
    // at least six characters
    var reg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    var value = event.target.value;
    event.srcElement.classList = "";

    if (!reg.test(value)) {
        event.srcElement.classList += " error";
        document.getElementById('button-submit').disabled = true;
        document.getElementById('err-password').style.display = "block";
        chkPassword = false;
    } else {
        chkPassword = true;
        document.getElementById('err-password').style.display = "none";
        enableButton();
    }

}

function checkDate(event) {
    event.srcElement.classList = "date";
    var bits = event.target.value.split('/');
    var d = new Date(bits[2], bits[1] - 1, bits[0]);
    if (!(d && (d.getMonth() + 1) == bits[1])) {
        event.srcElement.classList += " error";
        document.getElementById('button-submit').disabled = true;
        document.getElementById('err-date').style.display = "block";
        chkDate = false;
    } else {
        chkDate = true;
        document.getElementById('err-date').style.display = "none";
        enableButton();
    }
}

function enableButton() {
    if (chkDate && chkPassword && chkDate) {
        document.getElementById('button-submit').disabled = false;
    }
}