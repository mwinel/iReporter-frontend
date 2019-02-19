let getInterventions = async () => {
    let authorizationHeader = localStorage.getItem('access_token')
    const req_headers = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorizationHeader
        }
    };
    try {
        const response = await fetch('http://localhost:5000/api/v2/interventions', req_headers)
        const json = await response.json();
        return json.interventions
    } catch (err) {
        console.log(err)
    }
}

let Interventions = {
    render : async () => {
        let interventions = await getInterventions()
        let output = /*html*/ `
            <div class="row">
                <div class="flag-content">
                    <div class="section group">
                        <h1 class="posted-title">Recently posted interventions</h1>
                        ${interventions.map(intervention =>
                        /*html*/`
                        <div class="col span_1_of_3">
                            <div class="flag-card">
                                <img width="100" height="200" src=${intervention.images}>
                                <p class="card-title">${intervention.comment.substr(0, 60) + '...'}</p>
                                <p class="card-desc">${intervention.incident_type}</p>
                                <a href="./#/incidents/${intervention.incident_id}" class="btn-readmore">Read More</a>
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

export default Interventions;
