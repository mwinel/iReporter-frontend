const GET_INTERVENTIONS_URL = 'https://ireporter-1233.herokuapp.com/api/v2/interventions';

// get all redflags
let authorizationHeader = localStorage.getItem('access_token')
  fetch(GET_INTERVENTIONS_URL, {
    headers: {
      'Authorization': authorizationHeader
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
    let output = '<h1>Recently posted interventions</h1>'
    data.interventions.forEach(function(intervention) {
      output += `
        <div class="col span_1_of_3">
          <div class="flag-card">
            <img width="100" height="200" src=${intervention.images}>
            <p class="card-title">${intervention.comment.substr(0, 60) + '...'}</p>
            <p class="card-desc">${intervention.incident_type}</p>
            <a href="add_intervention.html">
              <button type="submit" class="btn-readmore">Read more</button>
            </a>
          </div>
        </div>
      `;
    });
    document.getElementById('output').innerHTML = output;
    if (data.error) {
      window.setTimeout(function() {
        window.location.replace('login.html');
      });
    }
  });
