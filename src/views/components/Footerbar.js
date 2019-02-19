let Footerbar = {
    render: async () => {
        let username = localStorage.getItem('username');
        if (username == 'admin') {
            let output =  /*html*/`
            <div class="footer">
                <div class="row">
                    <p class="copyright-text">© 2018, iReporter.com <a href="./#/admin_login"> Logged in as Admin</a></p>
                </div>
            </div>
            `
            return output
        } else {
            let output =  /*html*/`
            <div class="footer">
                <div class="row">
                    <p class="copyright-text">© 2018, iReporter.com <a href="./#/admin_login"> Login as Admin</a></p>
                </div>
            </div>
            `
            return output
        }
    },
    after_render: async () => {}
}

export default Footerbar;
