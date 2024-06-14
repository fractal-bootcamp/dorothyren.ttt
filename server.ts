import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
//adding middleware that interprets request bodies and forms 
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


const PORT = 3000

const VALID_AUTH_TOKEN = "1"
const SITE_PASSWORD = "password"

app.get('/', (req, res) => {
    res.send('Hello');
});

//LOGIN POST which allows the user to log in
app.post('/login', (req, res) => {
    if (req.body.password === SITE_PASSWORD) {
        res.cookie('authToken', VALID_AUTH_TOKEN, { maxAge: 900000, httpOnly: true });
        return res.redirect('/dashboard');
    }
    else {
        return res.send('wrong password');
    }
});


app.listen(3000, () => {
    console.log("Server listening on PORT", PORT);
});

//LOGIN GET that shows the password form or redirects to dashboard
app.get('/login', (req, res) => {
    if (req.cookies.authToken === VALID_AUTH_TOKEN) {
        return res.redirect('/dashboard');
    }
    return res.sendFile(__dirname + '/login.html');
});

//DASHBOARD GET that shows the dashboard if authed, or redirects to log in
app.get('/dashboard', (req, res) => {
    console.log(req.cookies.authToken, req.cookies)
    if (req.cookies.authToken === VALID_AUTH_TOKEN) {
        return res.send('welcome to dashboard');
    }
    return res.redirect('/login');
})
