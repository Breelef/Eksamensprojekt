import { Router } from "express";
const router = Router();
import db from "../database/connection.js";

router.get("/articles", async (req, res) => {
    const response = await db.all("SELECT * FROM articles");
    res.send(response);
});

router.get("/articles/:id", async (req, res) =>{
    const id = req.params.id
    const response = await db.get("SELECT * FROM articles WHERE id=?", [id]);
    res.send(response);
});

router.post("/articles", async (req, res) => {
    const { title, description, publishedAt, image, publisherID } = req.body;
    const response = await db.run("INSERT INTO articles (title, description, publishedAt, image, publisherID) VALUES (?, ?, ?, ?, ?)", [
        title, description, publishedAt, image, publisherID
    ]);
    if(response.changes > 0){
        res.status(200).send({message: "Article saved"});
    }else{
        res.status(400).send({ message: "Article not saved" });
    }
});

router.delete("/articles/:id", async (req, res) => {
    const id = req.params.id;
    const response = db.delete("DELETE * FROM articles WHERE id=?", [id]);
    if(response.ok){
        res.status(200).send({message: "Article deleted"}, response);
    }else {
        res.status(400).send({ message: "Article not deleted" });
    }
});

export default router;