import cookieParser from 'cookie-parser';
import express from 'express';

const app = express()
const PORT = 3001
const SITE_PASSWORD = "test"
const VALID_AUTH_TOKEN = "1"

app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('hello');
});

app.listen(3001, () => {
    console.log("server is running on port:", PORT)
})

//LOGIN page POST route that allows user to log in 

app.post('/login', (req, res) => {
    if (req.body.password === SITE_PASSWORD) {
        res.cookie('authToken', VALID_AUTH_TOKEN, { maxAge: 900000, httpOnly: true });
        return res.send('you are logged in');
    }
    else {
        return res.send('wrong password');
    }
});

//LOGIN page GET route that shows the dashboard if authed, or redirects to /login 

app.get('/login', (req, res) => {
    if (req.cookies.authToken === VALID_AUTH_TOKEN) {
        return res.redirect('/dashboard');
    }
    return res.sendFile(__dirname + "/login.html")
})

//DASHBOARD page get route that says - welcome to the dasboard if authed or returns to login page if not

app.get('/dashboard', (req, res) => {
    if (req.cookies.authToken === VALID_AUTH_TOKEN) {
        return res.send('welcome to the dashboard');
    }
    return res.redirect('/login');
})

