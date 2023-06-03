import { Router } from "express";
import { guard } from "../middleware/guard.js";
const router = Router();
import dotenv from "dotenv"
dotenv.config();


router.get("/pageGuard", guard, (req, res) => {
    res.send(req.session.user);
});

export default router;