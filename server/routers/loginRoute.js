import { Router } from "express";
const router = Router();
import db from "../database/connection.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv"
dotenv.config();

router.post("/login", async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await db.get("SELECT * FROM users WHERE username=?", [username]);
        const isSame = await bcrypt.compare(password, user.password);
        if(user && isSame){
            req.session.user = {username};
            res.status(200).send({ message: "User logged in", username: user.username });
        }else {
            res.status(401).json({ error: "Invalid Credentials" });
        }

    }catch(error){
        console.error(error);
        res.status(500).json({ error: "An error occured"})
    }
});

router.get("/logout", (req, res) => {
    if (req.session.user) {
        delete req.session.user;
        res.send({ message: "User is logged out" });
      } else {
        res.send({ message: "No user session found" });
      }
});

export default router;
