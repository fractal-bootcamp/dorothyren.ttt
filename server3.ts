import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 3002
const SITE_PASSWORD = "pw"
const AUTH_TOKEN = "1"

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('hello');
});

app.listen(3002, () => {
    console.log('server is running on:', PORT)
})

//LOGIN page POST request  - if pw matches, log in, if not - 'wrong password'
app.post('/login', (req, res) => {
    if (req.body.password === SITE_PASSWORD) {
        res.cookie('authToken', AUTH_TOKEN, { maxAge: 90000, httpOnly: true });
        return res.send('you are logged in');
    }
    else {
        return res.send('wrong password');
    }
}
);

//LOGIN Get route , if you log in and the authtoken generated == auth_token, then show dashboard. otherwise return to login page

app.get('/login', (req, res) => {
    if (req.cookies.authToken === AUTH_TOKEN) {
        return res.redirect('/dashboard');
    }
    return res.sendFile(__dirname + '/login.html');
})

//Dashboard GET route, if you successful match the tokens, send welcome to the dashboard , otherwise 

app.get('/dashboard', (req, res) => {
    if (req.cookies.authToken === AUTH_TOKEN) {
        return res.send('welcome to the dashboard')
    }
    return res.redirect('/login');
})