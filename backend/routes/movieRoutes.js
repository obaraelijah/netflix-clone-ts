import express from 'express';
import Movie from '../models/movieModel.js';
import { isAuth } from '../utilis.js';

const movieRouter = express.Router();


//create
movieRouter.post("/", isAuth,async(req, res) => {
  if( req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    try {
        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (error) {
        res.status(500).json(error);
    }
  }else {
    res.status(403).json("you are not allowed");
  }
});

//updating
movieRouter.put("/:id", isAuth, async (req, res) => {
    if (req.user.isAdmin) {
        try {
           const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,
            {
                $set: req.body,
            },
            {new: true}
           );
           res.status(200).json(updatedMovie);

        } catch (error) {
            res.status(500).json(error);
        }
    }else {
        res.status(403).json("You are not allowed!");
    }
});

//deleting
movieRouter.delete("/:id", isAuth, async (req, res) => {
    if (req.user.isAdmin) {
        try {
           await Movie.findByIdAndDelete(req.params.id);
           res.status(200).json("The movie has been deleted..."); 
        } catch (error) {
          res.status(500).json(error);  
        }
    }else {
        res.status(403).json("You are not allowed");
    }
});


//get
movieRouter.get("/find/:id", isAuth, async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json(error);
    }
});


//gett random movie
movieRouter.get("/random", isAuth, async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
      if (type === "series") {
        movie = await Movie.aggregate([
          { $match: { isSeries: true } },
          { $sample: { size: 1 } },
        ]);
      } else {
        movie = await Movie.aggregate([
          { $match: { isSeries: false } },
          { $sample: { size: 1 } },
        ]);
      }
      res.status(200).json(movie);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //getting all
  movieRouter.get("/", isAuth, async (req, res) => {
    if (req.user.isAdmin) {
        try {
           const movies = await Movie.find();
           res.status(200).json(movies.reverse()); 
        } catch (error) {
           res.status(500).json(error); 
        }
    }
  })

export default movieRouter;