let Navbar = {
    render: async () => {
        let username = localStorage.getItem('username');
        let status = localStorage.getItem('status');
        if (status != 200 || status == 401) {
            let view =  /*html*/`
                <div class="nav">
                    <div class="container">
                        <div class="brand">
                            <a href="./#/login">iReporter</a>
                        </div>
                        <label for="toggle">&#9776;</label>
                        <input type="checkbox" id="toggle"/>
                        <div class="menu">
                            <a href="./#/register">signup</a>
                            <a href="./#/login">login</a>
                        </div>
                    </div>
                </div>
            `
            return view
        } else if (status == 200) {
            let view =  /*html*/`
                <div class="nav">
                    <div class="container">
                        <div class="brand">
                            <a href="./#/incidents">iReporter</a>
                        </div>
                        <label for="toggle">&#9776;</label>
                        <input type="checkbox" id="toggle"/>
                        <div class="menu">
                            <a href="./#/redflags">redflags</a>
                            <a href="./#/interventions">interventions</a>
                            <a href="./#/profile/${username}">@${username}</>
                            <a href="./#/login" onClick="localStorage.clear()">logout</a>
                        </div>
                    </div>
                </div>
            `
            return view
        }
    },
    after_render: async () => {}
}

export default Navbar;


