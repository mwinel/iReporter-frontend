const LOGIN_URL = 'https://ireporter-1233.herokuapp.com/api/v2/auth/login';

document.addEventListener('DOMContentLoaded', init);
function init(){
  document.getElementById('userLogin').addEventListener('submit', userLogin);
}

// fetch using a Request and a Headers objects
// send user login data to the server
function userLogin(e) {
  e.preventDefault();
  let username = document.getElementById('username');
  let password = document.getElementById('password');

  let req_headers = new Headers();
  req_headers.append('Accept', 'application/json', 'charset=utf-8');

  let login_data = {
    username: username.value,
    password: password.value
  };

  let req = new Request(LOGIN_URL, {
    method: 'POST',
    headers: req_headers,
    mode: 'cors',
    body: JSON.stringify(login_data)
  });
  console.log(req);
  fetch(req)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if (data.message) {
      output = `<p>${data.message}</p>`;
      window.setTimeout(function() {
        window.location.replace('index.html');
      }, 3000);
      localStorage.setItem("access_token", data.access_token);
    }
    else if (data.error) {
      output = `<p>${data.error}</p>`;
    }
    document.getElementById('message').innerHTML = output;
  })
  .catch(error => {
    console.log(error);
  });
}