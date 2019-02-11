const INCIDENTS_URL = 'https://ireporter-1233.herokuapp.com/api/v2/incidents';

// get all incidents
window.onload = function getIncidents() {
  let authorizationHeader = localStorage.getItem('access_token')
  fetch(INCIDENTS_URL, {
    headers: {
      'Authorization': authorizationHeader
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data)
    let output = '<h1>Recently posted Incidents</h1>'
    data.incidents.forEach(function(incident) {
      output += `
        <div class="col span_1_of_3">
          <div class="flag-card">
            <img width="100" height="200" src=${incident.images}>
            <p class="card-title">${incident.comment.substr(0, 60) + '...'}</p>
            <p class="card-desc">${incident.incident_type}</p>
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
}
