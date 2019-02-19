let getIncidents = async () => {
    let authorizationHeader = localStorage.getItem('access_token')
    const req_headers = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorizationHeader
        }
    };
    try {
        const response = await fetch('http://localhost:5000/api/v2/incidents', req_headers)
        const json = await response.json();
        console.log(json.incidents)
        return json.incidents
    } catch (err) {
        console.log(err)
    }
}

let Incidents = {
    render : async () => {
        let incidents = await getIncidents()
        let output = /*html*/ `
            <div class="row">
                <div class="search-bar">
                    <h1 class="hero-h1" style="font-size: 40px;">The time for changing your</br> society is now.</h1>
                    <input type="search" id="searchInput" onkeyup="searchRedflag()" placeholder="Search...">
                    <form style="margin-top: 35px;">
                        <a href="./#/add-incident" class="btn-create">Create Incident</a>
                    </form>
                </div>
                <div class="flag-content">
                    <div class="section group">
                        <h1>Recently posted Incidents</h1>
                        ${incidents.map(incident =>
                        /*html*/`
                        <div class="col span_1_of_3">
                            <div class="flag-card">
                                <img width="100" height="200" src=${incident.images}>
                                <p class="card-title">${incident.comment.substr(0, 60) + '...'}</p>
                                <p class="card-desc">${incident.incident_type}</p>
                                <a href="./#/incidents/${incident.incident_id}" class="btn-readmore">Read More</a>
                            </div>
                        </div>`).join('')}
                    </div>
                </div>
            </div>
        `;
        return output
    }
    , after_render: async () => {}
}

export default Incidents;
