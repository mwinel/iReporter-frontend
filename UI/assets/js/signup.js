const url = 'https://ireporter-1233.herokuapp.com/api/v2/auth/signup';

document.addEventListener('DOMContentLoaded', init);

function init(){
  document.getElementById('addUser').addEventListener('submit', addUser);
}

// fetch using a Request and a Headers objects
// send user signup post data to the server
function addUser(e) {
  e.preventDefault();
  
  let firstname = document.getElementById('firstname');
  let lastname = document.getElementById('lastname');
  let othernames = document.getElementById('othernames');
  let username = document.getElementById('username');
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  let phone_number = document.getElementById('phone_number');
  // create headers
  let h = new Headers();
  h.append('Accept', 'application/json', 'charset=utf-8');
  // create input data
  let input_data = {
    firstname: firstname.value,
    lastname: lastname.value,
    othernames: othernames.value,
    username: username.value,
    email: email.value,
    password: password.value,
    phone_number: phone_number.value
  };

  let req = new Request(url, {
    method: 'POST',
    headers: h,
    mode: 'cors',
    body: JSON.stringify(input_data)
  });
  fetch(req)
  .then(response => response.json())
  .then((data) => {
    console.log(data);
    if (data.message) {
      output = `<p>${data.message}</p>`;
      window.setTimeout(function() {
        window.location.replace('login.html');
      }, 1500);
    }
    else if (data.error) {
      output = `<p>${data.error}</p>`;
    }
    document.getElementById('message').innerHTML = output;
  })
  .catch(function(error) {
    console.log(error);
  });
}
