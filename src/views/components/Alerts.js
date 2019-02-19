function CustomAlertError() {
    this.render = (error) => {
        let winH = window.innerHeight;
        let dialogoverlay = document.getElementById('dialogoverlay');
        let dialogbox = document.getElementById('dialogboxerror');
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winH+"px";
        dialogbox.style.left = "34.5%";
        dialogbox.style.top = "100px";
        dialogbox.style.display = "block";
        document.getElementById('dialogboxbody-error').innerHTML = error;
        document.getElementById('dialogboxfooter-error').innerHTML = `<button id="alert-ok" onclick="AlertError.ok()">OK</button>`;
    }
    this.ok = () => {
        document.getElementById('dialogoverlay').style.display = "none";
        document.getElementById('dialogboxerror').style.display = "none";
    }
}
const AlertError = new CustomAlertError();

function CustomAlertSuccess() {
    this.render = (message) => {
        let winH = window.innerHeight;
        let dialogoverlay = document.getElementById('dialogoverlay');
        let dialogbox = document.getElementById('dialogboxsuccess');
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winH+"px";
        dialogbox.style.left = "34.5%";
        dialogbox.style.top = "100px";
        dialogbox.style.display = "block";
        document.getElementById('dialogboxbody-success').innerHTML = message;
        document.getElementById('dialogboxfooter-success').innerHTML = `<button id="alert-ok" onclick="AlertSuccess.ok()">OK</button>`;
    }
    this.ok = () => {
        document.getElementById('dialogoverlay').style.display = "none";
        document.getElementById('dialogboxsuccess').style.display = "none";
    }
}
const AlertSuccess = new CustomAlertSuccess();
