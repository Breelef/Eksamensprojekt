import { Router } from "express";
import { guard } from "../util/guard.js";
const router = Router();
import dotenv from "dotenv"
dotenv.config();


router.get("/frontpage", guard, (req, res) => {
    res.send({message: `Welcome ${req.session.user}.`});
});

export default router;