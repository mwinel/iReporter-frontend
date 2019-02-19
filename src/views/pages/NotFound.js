let NotFound = {
    render : async () => {
        let output =  /*html*/`
            <div class="error-dialog">
                <h1 class="error-heading">404</h1>
                <p class="error-paragraph">Page not found</p>
            </div>
        `
        return output
    }
    , after_render: async () => {}
}

export default NotFound;
