const UserUtils = {
    parseRequestURLUser : () => {
        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/")
        let userRequest = {
            resource       : null,
            username       : null,
            verb           : null
        }
        userRequest.resource        = r[1]
        userRequest.username        = r[2]
        userRequest.verb            = r[3]

        return userRequest
    }
    , sleep: (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export default UserUtils;
