const REDFLAGS_URL = 'https://ireporter-1233.herokuapp.com/api/v2/red-flags';
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dvvclttae/upload';
const CLOUDINARY_UPLOAD_PRESET = 'tz6no9pl';

// upload image to cloud storage
function upload() {
  let fileUpload = document.getElementById('images');
  fileUpload.addEventListener('change', function(event) {
    let file = event.target.files[0];
    let formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    axios({
      url: CLOUDINARY_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      mode: 'cors',
      data: formData
    }).then(function(res) {
      image_url = res.data.secure_url;
      return image_url;
    }).catch(function(e) {
      console.error(e);
    });
  });
}
upload();

document.addEventListener('DOMContentLoaded', init);
function init(){
  document.getElementById('addIncident').addEventListener('submit', addIncident);
}
// send post data to the server
function addIncident(e) {
  e.preventDefault();
  let authorizationHeader = localStorage.getItem('access_token')
  let incident_type = document.getElementById('incident_type');
  let location = document.getElementById('location');
  let videos = document.getElementById('videos');
  let comment = document.getElementById('comment');

  let image = function upload() {
    return image_url;
  };

  let incident_data = {
    incident_type: incident_type.value,
    location: location.value,
    images: image(image_url),
    videos: videos.value,
    comment: comment.value
  }

  let req = new Request(REDFLAGS_URL, {
    method: 'POST',
    headers: {
      'content_type': 'application/json',
      'Authorization': authorizationHeader
    },
    mode: 'cors',
    body: JSON.stringify(incident_data)
  });
  fetch(req)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if (data.message) {
      output = `<p>${data.message}</p>`;
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
