const movieModel = require("../models/movieModel");

class MovieController {
//   static findAll(req, res) {
//     res.status(200).json({ test: 'ini data movies' });
//   }

  static async findAll(req, res) {
    //   console.log('masuk fid all movie controller')
    const movies = await movieModel.findAll();
    return res.status(200).json(movies);
  }

  static async findMovie(req, res) {
    //   console.log(req.params.movieId)
    const movie = await movieModel.findMovie(req.params.movieId);
    return res.status(200).json({
        movies: movie || 'test data movienya'
    });
  }

  static async addMovie(req, res) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    const data = { title, overview, poster_path, popularity, tags };
    const movie = await movieModel.addMovie(data);
    return res.status(200).json(movie);
  }

  static async deleteMovie(req, res) {
    const movie = await movieModel.deleteMovie(req.params.movieId);
    return res.status(200).json(movie);
  }

  static async updateMovie(req, res) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    const data = { title, overview, poster_path, popularity, tags };
    const movie = await movieModel.updateMovie(req.params.movieId, data);
    return res.status(200).json(movie);
  }
}

module.exports = MovieController;
