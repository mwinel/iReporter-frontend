const IncidentUtils = { 
    // Parse a url and break it into resource, incident_id and verb
    parseRequestURLIncident : () => {
        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/")
        let incidentRequest = {
            resource       : null,
            incident_id    : null,
            verb           : null
        }
        incidentRequest.resource            = r[1]
        incidentRequest.incident_id         = r[2]
        incidentRequest.verb                = r[3]

        return incidentRequest
    }
    , sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export default IncidentUtils;
