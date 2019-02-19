let Register = {
    render: async () => {
        let output = /*html*/ `
            <div class="row">
                <form id="addUser">
                    <div id="output"></div>
                    <h2>Please Sign Up</h2>
                    <input type="text" id="firstname" placeholder="Enter firstname">
                    <input type="text" id="lastname" placeholder="Enter lastname">
                    <input type="text" id="othernames" placeholder=" Enter othernames">
                    <input type="text" id="username" placeholder="Enter username">
                    <input type="text" id="email" placeholder="Enter email">
                    <input type="password" id="password" placeholder="Enter password">
                    <input type="text" id="phone_number" placeholder="Enter phone number">
                    <button type="submit" class="btn-signup" id="register_btn">Sign Up</button>
                    <p class="form-footer">Already have an account <a href="./#/login">Login</a>.</p>
                </form>
            </div>
        `
        return output
    }
    
    , after_render: async () => {
        document.getElementById("register_btn").addEventListener ('click', (e) => {
            const SIGNUP_URL = 'http://localhost:5000/api/v2/auth/signup';
            e.preventDefault();
            let firstname = document.getElementById('firstname');
            let lastname = document.getElementById('lastname');
            let othernames = document.getElementById('othernames');
            let username = document.getElementById('username');
            let email = document.getElementById('email');
            let password = document.getElementById('password');
            let phone_number = document.getElementById('phone_number');
            // create headers
            let req_headers = new Headers();
            req_headers.append('Accept', 'application/json', 'charset=utf-8');
            // create input data
            let input_data = {
                firstname: firstname.value,
                lastname: lastname.value,
                othernames: othernames.value,
                username: username.value,
                email: email.value,
                password: password.value,
                phone_number: phone_number.value
            };
            
            let req = new Request(SIGNUP_URL, {
                method: 'POST',
                headers: req_headers,
                mode: 'cors',
                body: JSON.stringify(input_data)
            });
            fetch(req)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.message) {
                    AlertSuccess.render(`${data.message}`);
                    window.setTimeout(function() {
                        window.location.replace('./#/login');
                        window.location.reload(true);
                    }, 1500);
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

export default Register;
