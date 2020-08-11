const TvSeriesModel = require("../models/TvSeriesModel");

class TvSeriesController {
//   static findAll(req, res) {
//     res.status(200).json({ test: 'ini data series' });
//   }

  static async findAll(req, res) {
    const Tv_Series = await TvSeriesModel.findAll();
    return res.status(200).json(Tv_Series);
  }

  static async findTvSeries(req, res) {
    const TvSeries = await TvSeriesModel.findTvSeries(req.params.TvSeriesId);
    return res.status(200).json(TvSeries);
  }

  static async addTvSeries(req, res) {
   
    const { title, overview, poster_path, popularity, tags } = req.body;
    const data = { title, overview, poster_path, popularity, tags };
    const TvSeries = await TvSeriesModel.addTvSeries(data);
    // console.log(TvSeries)
    return res.status(201).json(TvSeries);
  }

  static async deleteTvSeries(req, res) {
    const TvSeries = await TvSeriesModel.deleteTvSeries(req.params.TvSeriesId);
    return res.status(200).json(TvSeries);
  }

  static async updateTvSeries(req, res) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    const data = { title, overview, poster_path, popularity, tags };
    const TvSeries = await TvSeriesModel.updateTvSeries(req.params.TvSeriesId, data);
    return res.status(200).json(TvSeries);
  }
}

module.exports = TvSeriesController;
