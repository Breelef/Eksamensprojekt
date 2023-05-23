import { Router } from "express";
const router = Router();
import db from "../database/connection.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "cloezfulgaming@gmail.com",
        pass: "zdqfzsummdxctikc"
    }
});

router.post("/signup", async (req, res) => {
    const { email, username, password } = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.run("INSERT INTO users (email, username, password, choice, hasChosen) VALUES (?,?,?,?,?)", [email, username, hashedPassword, null, false]);
        //const message = constructMail(email);
        res.send({
            id: result.lastID,
            email: email,
            username: username
        });

    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'An error occured' });
    }
});


export default router;