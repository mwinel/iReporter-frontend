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

let AdminIncidents = {
    render : async () => {
        let incidents = await getIncidents()

        let output = /*html*/ `
            <div class="row">
                <div class="flag-content">
                    <div class="redflags">
                        <h2>All Incidents</h2>
                        <table>
                            <tr>
                                <th>Incident</th>
                                <th>Created on</th>
                                <th>Incident Type</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                            ${incidents.map(incident =>
                            /*html*/`
                            <tr>
                                <td><a href="./#/incidents/${incident.incident_id}">${incident.comment.substr(0, 60) + '...'}</a></td>
                                <td>${incident.created_on.substr(0, 16)}</td>
                                <td>${incident.incident_type}</td>
                                <td>${incident.status}</td>
                                <td style="float: right;">
                                    <a href="./#/edit/${incident.incident_id}">
                                        <button type="submit" class="btn-edit-redflag"> 
                                            <i class="fa fa-edit" aria-hidden="true"></i>
                                        </button>
                                    </a>
                                    <a href="#">
                                        <button type="submit" class="btn-delete-redflag"> 
                                            <i class="fa fa-times" aria-hidden="true"></i>
                                        </button>
                                    </a>
                                </td>
                            </tr>
                            `
                            ).join('')}
                        </table>
                    </div>
                </div>
            </div>
        `;
        return output
    }
    , after_render: async () => {}

}

export default AdminIncidents;
