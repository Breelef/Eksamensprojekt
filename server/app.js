import express from "express"
const app = express();
app.use(express.json());
import helmet from "helmet"
app.use(helmet());
import dotenv from "dotenv"
dotenv.config();

import NewsAPI from "newsapi";
function fetchArticlesWithPackage(query){
    const newsapi = new NewsAPI(process.env.APIKEY)
    return newsapi.v2.everything({
        q:`${query}`,
        language: 'en',
        pageSize: 20,
        sortBy: 'relevancy',
        excludeDomains: 'lifehacker.com, cnet.com, 9to5mac.com'
    });
}

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

const bluePillNamespace = io.of("/bluepill");

bluePillNamespace.on("connection", (socket) => {
    if (cachedArticlesbluepill) {
        socket.emit("bluepillarticles", cachedArticlesbluepill);
      } else {
        fetchArticlesWithPackage('sports OR movies OR "TV shows" OR celebrities OR "new record" -strike')
          .then((articles) => {
            cachedArticlesbluepill = articles;
            socket.emit("bluepillarticles", articles);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });

const redpillNamespace = io.of("/redpill");
redpillNamespace.on("connection", (socket) => {
    if(cachedArticlesredpill){
        socket.emit("redpillarticles", cachedArticlesredpill);
      }else{
        fetchArticlesWithPackage('war OR terror OR oppression OR conflict')
        .then((articles) => {
            cachedArticlesredpill = articles;
            socket.emit("redpillarticles", articles);
        })
        .catch((error) => {
            console.error(error);
        });
      }
    socket.on("Send redpill admin chat messages", (data) => {
        const messageData = {
            username: data.username,
            message: data.message
        }
        socket.emit("Redpill admin chat messages", messageData);
        socket.broadcast.emit("Redpill admin chat messages", messageData);
    });
})
//Auth Routes
import authRoute from "./routers/authRouter.js";
app.use(authRoute);

//Pageguard Route
import pageGuard from "./routers/pageGuardRoute.js";
app.use(pageGuard);

//Users API
import usersRoutes from "./routers/usersRoutes.js";
app.use(usersRoutes);

//Articles API
import articlesRoutes from "./routers/articlesRoute.js";
app.use(articlesRoutes);

const PORT = process.env.PORT || 8080;
server.listen(PORT, (error) => {
    if(error){
        console.error(error)
        return;
    }
    console.log("Server is running on:", PORT);
});