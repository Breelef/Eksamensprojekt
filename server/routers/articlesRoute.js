import { Router } from "express";
const router = Router();
import db from "../database/connection.js";

router.get("/articles", async (req, res) => {
    const response = await db.all("SELECT * FROM articles");
    const result = await response.json();
    res.send(result);
});

router.get("/articles/:id", async (req, res) =>{
    const id = req.params.id
    const response = await db.get("SELECT * FROM articles WHERE id=?", [id]);
    const result = await response.json();
    res.send(result);
});

router.post("/articles", async (req, res) => {
    const { title, description, publishedAt, image, publisherID } = req.body;
    const response = await db.run("INSERT INTO articles (title, description, publishedAt, image, publisherID)", [
        title, description, publishedAt, image, publisherID
    ]);
    if(response.ok){
        res.send({mesasge: "Article saved"});
    }else{
        res.send({message: "Article not saved"});
    }
});

router.delete("/articles/:id", async (req, res) => {
    const id = req.params.id;
    const response = db.delete("DELETE * FROM articles WHERE id=?", [id]);
    if(response.ok){
        res.send({message: "Article deleted"}, response);
    }else {
        res.send({message: "Article not deleted"}, response);
    }
});

export default router;