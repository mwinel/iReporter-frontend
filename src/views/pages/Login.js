let Login = {
    render: async () => {
        let output = /*html*/ `
            <div class="row">
                <form id="userLogin">
                    <div id="message"></div>
                    <h2>Login to iReporter</h2>
                    <input type="text" id="username" placeholder="Enter username" required>
                    <input type="password" id="password" placeholder="Enter password" required>
                    <button type="submit" class="btn-login" id="login_btn">Login</button>
                    <p class="form-footer">Don't have an account <a href="./#/register">Sign Up here</a>.</p>
                </form>
            </div>
        `
        return output
    }
    
    , after_render: async () => {
        document.getElementById("login_btn").addEventListener ('click', (e) => {
            const LOGIN_URL = 'http://localhost:5000/api/v2/auth/login';
            e.preventDefault();;
            let username = document.getElementById('username');
            let password = document.getElementById('password');

            let req_headers = new Headers();
            req_headers.append('Accept', 'application/json', 'charset=utf-8');

            let login_data = {
                username: username.value,
                password: password.value
            };
            localStorage['username'] = username.value;
            
            let req = new Request(LOGIN_URL, {
                method: 'POST',
                headers: req_headers,
                mode: 'cors',
                body: JSON.stringify(login_data)
            });

            fetch(req)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.message) {
                    window.location.replace('./#/incidents');
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('status', data.status);
                }
                else if (data.error) {
                    AlertError.render(`${data.error}`);
                }
            })
            .catch(error => {
                console.log(error);
            });
        })
    }
}

export default Login;
