let UpdateIncident = {
    render: () => {
        let output = /*html*/ `
            <div class="row">
                <form id="addIncident" method="POST" enctype="multipart/form-data">
                    <div id="message"></div>
                        <h1>Edit incident</h1>
                        <select id="incident_type">
                            <option value="select">Select incident type</option>
                            <option value="red-flag">red-flag</option>
                            <option value="intervention">Intervention</option>
                        </select>
                        <input type="location" id="location" placeholder="Location">
                        <p class="upload">Upload Image</p>
                        <input type="file" id="images">
                        <p class="upload">Upload Video</p>
                        <input type="location" id="videos" placeholder="Add video link">
                        <textarea name="textarea" id="comment" placeholder="Add comment"></textarea>
                        <p id="out"></p>
                        <button type="submit" class="btn-signup" value="submit">Save Changes</button>
                </form>
            </div>
        `
        return output
    }
    
    , after_render: () => {
        const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dvvclttae/upload';
        const CLOUDINARY_UPLOAD_PRESET = 'tz6no9pl';
        // upload image to cloud storage
        function UploadImage() {
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
                }).then(res => {
                    let image_url = res.data.secure_url;
                    console.log(image_url);
                    localStorage['image_url'] = image_url;
                    return image_url;
                }).catch(error => {
                    console.error(error);
                });
            });
        }
        UploadImage();

        document.getElementById("addIncident").addEventListener ('submit', addIncident) 
        function addIncident(e) {
            e.preventDefault();
            const ADD_INCIDENT_URL = 'http://localhost:5000/api/v2/red-flags';
            let authorizationHeader = localStorage.getItem('access_token')
            let incident_type = document.getElementById('incident_type');
            let location = document.getElementById('location');
            let videos = document.getElementById('videos');
            let comment = document.getElementById('comment');

            // Temporary work around on how to post an image url.
            // Still working out on how use callback functions for a 
            // solid result.
            let new_url = localStorage.getItem('image_url');
            
            let incident_data = {
                incident_type: incident_type.value,
                location: location.value,
                images: new_url,
                videos: videos.value,
                comment: comment.value
            }

            let req = new Request(ADD_INCIDENT_URL, {
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
                    AlertSuccess.render(`${data.message}`);
                        window.setTimeout(function() {
                        localStorage.removeItem('image_url');
                        window.location.replace('./#/incidents');
                        window.location.reload(true);
                    }, 2000);
                }
                else if (data.error) {
                    AlertError.render(`${data.error}`);
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
}

export default UpdateIncident;
