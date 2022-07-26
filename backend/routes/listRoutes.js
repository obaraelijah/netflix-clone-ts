import express from 'express';
import { isAuth } from '../utilis.js';
import List from '../models/listMode.js';

const listRouter = express.Router();

//create
listRouter.post("/", isAuth, async (req, res) => {
    if (req.user.isAdmin) {
        const newList = new List(req.body);
        try {
            const savedList = await newList.save();
            res.status(201).json(savedList);
        } catch (error) {
            res.status(500).json(error);
        }
    }else {
        res.status(403).json("You are not allowes");
    }
});

//deleting list
listRouter.delete("/:id", isAuth, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await List.findByIdAndDelete(req.params.id);
            res.status(201).json("The list has been deleted");
        } catch (error) {
           res.status(500).json(error); 
        }
    } else {
        res.status(403).json("You are not allowed");
    }
});

//get
listRouter.get("/",  isAuth, async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];

    try {
        if(typeQuery) {
            if (genreQuery) {
                list = await List.aggregate([
                    { $sample: { size: 10}},
                    { $match: {type: typeQuery, genre: genreQuery}}
                ]);
            } else {
                list = await List.aggregate([
                    { $sample: { size: 10 } },
                    { $match: { type: typeQuery } },
                ]);
            }
        } else {
            list = await List.aggregate([{ $sample: {size: 10 }}])
        }
        
    } catch (error) {
        res.status(500).json(Error);
    }
})





export default listRouter;