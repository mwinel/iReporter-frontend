import IncidentUtils        from '../../services/IncidentUtils.js'

let getIncident = async (incident_id) => {
    let authorizationHeader = localStorage.getItem('access_token')
    const req_headers = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorizationHeader
        }
    };
    try {
        const response = await fetch(`http://localhost:5000/api/v2/incidents/` + incident_id, req_headers)
        const json = await response.json();
        console.log(json)
        return json.incident
    } catch (err) {
        console.log(err)
    }
}

let Incident = {
    render : async () => {
        let request = IncidentUtils.parseRequestURLIncident()
        let incident = await getIncident(request.incident_id)
        let output = /*html*/`
        ${incident.map(item =>
            /*html*/`
            <div class="flag-content">
                <div class="intervene group">
                    <div class="column span_1_of_2">
                        <h1></h1>
                        <img width="200" height="340" src=${item.images}>
                        <p><strong>Created by:</strong> <a href="#">${item.created_by}</a></p>
                        <p><strong>Created on:</strong> ${item.created_on.substring(0, 16)}</p>
                        <p><strong>Incident type:</strong> ${item.incident_type}</p>
                        <p><strong>Location:</strong> ${item.location}</p>
                        <p><strong>Status:</strong> ${item.status}</p>
                        <p><strong>Comment:</strong> ${item.comment}</p>
                    </div>`).join('')}
                    <div class="column span_2_of_2">
                    <h3>1652 peope have called for intervention on this matter.</h3>
                    <div class="form-intervention">
                        <form action="#">
                            <input type="fname" placeholder="First name" required>
                            <input type="lname" placeholder="Last name" required>
                            <input type="email" placeholder="Email" required>
                            <button type="submit" class="btn-intervention">Call for Intervention</button>
                        </form>
                    </div>
                </div>
                </div>
            </div>
        `
        return output
    }
    , after_render: async () => {}
}

export default Incident;
