let getRedflags = async () => {
    let authorizationHeader = localStorage.getItem('access_token')
    const req_headers = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorizationHeader
        }
    };
    try {
        const response = await fetch('http://localhost:5000/api/v2/red-flags', req_headers)
        const json = await response.json();
        return json.redflags
    } catch (err) {
        console.log(err)
    }
}

let Redflags = {
    render : async () => {
        let redflags = await getRedflags()
        let output = /*html*/ `
            <div class="row">
                <div class="flag-content">
                    <div class="section group">
                        <h1 class="posted-title">Recently posted redflags</h1>
                        ${redflags.map(redflag =>
                        /*html*/`
                        <div class="col span_1_of_3">
                            <div class="flag-card">
                                <img width="100" height="200" src=${redflag.images}>
                                <p class="card-title">${redflag.comment.substr(0, 60) + '...'}</p>
                                <p class="card-desc">${redflag.incident_type}</p>
                                <a href="./#/incidents/${redflag.incident_id}" class="btn-readmore">Read More</a>
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

export default Redflags;
