import express from "express"
const app = express();
app.use(express.json());
import helmet from "helmet"
app.use(helmet());
import dotenv from "dotenv"
dotenv.config();


import session from "express-session";
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

import cors from "cors";
app.use(cors({
    credentials: true,
    origin: true
}));

import http from "http";
const server = http.createServer(app);

//Signup route
import signUpRoute from "./routers/signupRoute.js";
app.use(signUpRoute);

//Login & Logout Routes
import loginRoute from "./routers/loginRoute.js";
app.use(loginRoute);

//Frontpage Route
import frontPageRoute from "./routers/frontpageRoute.js";
app.use(frontPageRoute);

const PORT = process.env.PORT || 8080;
server.listen(PORT, (error) => {
    if(error){
        console.log(error)
        return;
    }
    console.log("Server is running on:", PORT);
});