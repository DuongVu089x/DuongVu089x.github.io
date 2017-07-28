var txtUserName = document.getElementById('user-name');
var txtPassword = document.getElementById('password');
var txtDate = document.getElementById('input-date');

(function init() {

})();

function sendData() {
    var xhttp;
    if (window.XMLHttpRequest) {
        // code for modern browsers
        xhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        }
    };
    xhttp.open("POST", "formAjax.php", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlenconded");
    xhttp.send("name=" + txtUserName.value + "&pass=" + txtPassword.value + "&birthDay=" + txtDate.value);

    console.log(12221);
}