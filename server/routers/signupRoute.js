import { Router } from "express";
const router = Router();
import db from "../database/connection.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "cloezfulgaming@gmail.com",
        pass: "zdqfzsummdxctikc"
    }
});
function constructMail(email, name){
    
    let message = {
        from: "emil_vinther@hotmail.com",
        to: email,
        subject: `Welcome to the matrix - ${name}`,
        text: `Dear ${name}, We are thrilled to welcome you to the matrix, a captivating virtual realm where reality merges with imagination. You have successfully signed up for an extraordinary journey that will challenge your perceptions and offer you unparalleled experiences. Prepare yourself for an adventure like no other. Upon your first login, you will be faced with a momentous decision. We present you with two options: the Blue Pill and the Red Pill. Each pill represents a distinct path, ultimately shaping your destiny within the matrix. The Blue Pill represents a tranquil haven, shielding you from the harshness of the world. By choosing this path, you can embrace the allure of consumer culture and immerse yourself in a realm of entertainment, lifestyle, and the pursuit of leisure. Here, you will find solace, happiness, and an existence that feels familiar, yet may not confront the darker realities of our world. On the other hand, the Red Pill unveils the hidden truths and forces you to confront the harsh realities of our world. By selecting this path, you choose not to turn a blind eye to the injustices, the horrors, and the struggles that exist. Prepare yourself for a journey that challenges your beliefs, exposes corruption, and ignites a passion for positive change. Within the Red Pill path, you will encounter thought-provoking content that delves into devastating world events, explores social issues, and sparks conversations on topics that demand our attention. Choosing which pill to take is a decision of utmost importance. We encourage you to reflect upon your values, your thirst for knowledge, and the path you wish to pursue. Remember, the consequences of your choice will reverberate throughout your journey within the matrix. Think carefully, ${name}, as the path you select will determine the course of your experience. The choice is yours alone to make. Welcome to the matrix, ${name}. May your journey be filled with discovery, enlightenment, and the pursuit of a path aligned with your deepest convictions. Sincerely, The matrix Administration Team`,
        html: `<h5>Dear ${name}</h5><br><p>We are thrilled to welcome you to the matrix, a captivating virtual realm where reality merges with imagination. You have successfully signed up for an extraordinary journey that will challenge your perceptions and offer you unparalleled experiences. Prepare yourself for an adventure like no other.</p><br><p>Upon your first login, you will be faced with a momentous decision. We present you with two options: the Blue Pill and the Red Pill. Each pill represents a distinct path, ultimately shaping your destiny within the matrix.</p><br><p>The Blue Pill represents a tranquil haven, shielding you from the harshness of the world. By choosing this path, you can embrace the allure of consumer culture and immerse yourself in a realm of entertainment, lifestyle, and the pursuit of leisure. Here, you will find solace, happiness, and an existence that feels familiar, yet may not confront the darker realities of our world.</p><br><p>On the other hand, the Red Pill unveils the hidden truths and forces you to confront the harsh realities of our world. By selecting this path, you choose not to turn a blind eye to the injustices, the horrors, and the struggles that exist. Prepare yourself for a journey that challenges your beliefs, exposes corruption, and ignites a passion for positive change. Within the Red Pill path, you will encounter thought-provoking content that delves into devastating world events, explores social issues, and sparks conversations on topics that demand our attention.</p><br><p>Choosing which pill to take is a decision of utmost importance. We encourage you to reflect upon your values, your thirst for knowledge, and the path you wish to pursue. Remember, the consequences of your choice will reverberate throughout your journey within the matrix.</p><br><p>Think carefully, ${name}, as the path you select will determine the course of your experience. The choice is yours alone to make.</p><br><p>Welcome to the matrix, ${name}. May your journey be filled with discovery, enlightenment, and the pursuit of a path aligned with your deepest convictions.</p><br><p>Sincerely,</p><br><h5>The matrix Administration Team</h5>`
    };
    return message;
}

router.post("/signup", async (req, res) => {
    const { email, username, password } = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.run("INSERT INTO users (email, username, password, choice, hasChosen) VALUES (?,?,?,?,?)", [email, username, hashedPassword, null, false]);
        const message = constructMail(email, username);
        transporter.sendMail(message, (err, info) => {
            if(err){
                console.log("Error sending mail", err)
            }else{
                console.log("Email sent", info.response)
            }
        })
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