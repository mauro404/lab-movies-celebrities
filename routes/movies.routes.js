const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

const router = require("express").Router();

//CREATE: new movie
router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
        .then( (celebrityArr) => {
            res.render("movies/new-movie", { castArr: celebrityArr })
        })
});

//CREATE: process form
router.post("/movies/create", (req, res, next) => {
  const movieDetails = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  };

  Movie.create(movieDetails)
    .then( () => res.redirect("/movies"))
    .catch(() => res.redirect("/movies/create"));
});


//READ: List all Movies
router.get("/movies", (req, res, next) => {
    Movie
      .find()
      .then((movies) => {
        res.render("movies/movies", { movies });
      })
      .catch((err) => {
        console.log("Error getting movies...", err);
        next(err);
      });
});


//READ: movie details
router.get("/movies/:movieId", (req, res, next) => {
    const movieId = req.params.movieId

    Movie.findById(movieId)
        .populate("cast")
        .then( (movieDetails) => {
            res.render("movies/movie-details", movieDetails)
        })
        .catch((err) => {
            console.log("Error getting movies...", err);
            next(err);
        })

})
  

module.exports = router;

