import { Router } from "express"
const router = Router();
import db from "../database/connection.js"

router.put("/pillTaken", async (req, res) => {
    const user = req.session.user;
    const result = await db.run("UPDATE users SET hasChosen = ?, choice = ? WHERE username = ?", [req.body.hasChosen, req.body.choice, req.session.user.username]);
    if (user) {
        const username = user.username;
        const { hasChosen, choice } = req.body;
        await db.run("UPDATE users SET hasChosen = ?, choice = ? WHERE username = ?", [
          hasChosen,
          choice,
          username
        ]);

        res.send({ message: `User is updated: ${result.lastID}`});
      } else {
        res.status(401).send({ message: "User not authenticated." });
      }

});

export default router;