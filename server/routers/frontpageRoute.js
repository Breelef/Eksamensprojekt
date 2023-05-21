import { Router } from "express";
const router = Router();
import dotenv from "dotenv"
dotenv.config();

router.get("/frontpage", (req, res) => {
    if(!req.session.user){
        return res.status(404).send({ message: "User has no session"});
    }
    res.send({ message: "User is logged in" });
});

export default router;