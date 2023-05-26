import express from "express"
const app = express();
app.use(express.json());
import helmet from "helmet"
app.use(helmet());
import dotenv from "dotenv"
dotenv.config();
import bodyParser from "body-parser";
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
import fetchArticles from "./util/fetchArticles.js";


import session from "express-session";
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

import cors from "cors";
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

import http from "http";
const server = http.createServer(app);

import { Server } from "socket.io"
const io = new Server (server, {
    cors: {
        origin: "*",
        methods: ["*"]
    }
});

let cachedArticlesbluepill = null;
let cachedArticlesredpill = null;

const bluePillNamespace = io.on("/bluepill");

bluePillNamespace.on("connection", (socket) => {
    if (cachedArticlesbluepill) {
        console.log("Sending cached articles in response to 'requestArticles' event.");
        socket.emit("bluepillarticles", cachedArticles);
      } else {
        console.log("No cached articles. Fetching articles...");
        fetchArticles("entertainment")
          .then((articles) => {
            cachedArticlesbluepill = articles;
            console.log("Articles fetched. Sending articles in response to 'requestArticles' event.");
            socket.emit("bluepillarticles", articles);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
    
const redpillNamespace = io.on("/redpill");
redpillNamespace.on("connection", (socket) => {
    if(cachedArticlesredpill){
        socket.emit("redpillarticles", cachedArticlesredpill);
      }else{
        fetchArticles("terror")
        .then((articles) => {
            cachedArticlesredpill = articles;
            socket.emit("redpillarticles", articles);
        })
        .catch((error) => {
            console.error(error);
        });
      }
})
//Signup route
import signUpRoute from "./routers/signupRoute.js";
app.use(signUpRoute);

//Login & Logout Routes
import loginRoute from "./routers/loginRoute.js";
app.use(loginRoute);

//Frontpage Route
import frontPageRoute from "./routers/frontpageRoute.js";
app.use(frontPageRoute);

//Pill taken API
import updateUser from "./routers/updateUser.js";
app.use(updateUser);


//fetchArticles();

const PORT = process.env.PORT || 8080;
server.listen(PORT, (error) => {
    if(error){
        console.log(error)
        return;
    }
    console.log("Server is running on:", PORT);
});